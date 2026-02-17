import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import prisma from '../lib/prisma.js'

const jwksClients = new Map()

function getJwksClient(issuer) {
  if (!jwksClients.has(issuer)) {
    jwksClients.set(
      issuer,
      jwksClient({
        jwksUri: `${issuer}/.well-known/jwks.json`,
        cache: true,
        rateLimit: true,
      })
    )
  }
  return jwksClients.get(issuer)
}

function getKey(issuer) {
  return (header, callback) => {
    getJwksClient(issuer).getSigningKey(header.kid, (err, key) => {
      if (err) return callback(err)
      callback(null, key.getPublicKey())
    })
  }
}

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('Auth: No bearer token in request')
      return res.status(401).json({ error: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]

    // Decode without verifying to get the issuer
    const decoded = jwt.decode(token, { complete: true })
    if (!decoded) {
      console.error('Auth: Could not decode JWT')
      return res.status(401).json({ error: 'Invalid token' })
    }

    const issuer = decoded.payload.iss
    if (!issuer) {
      console.error('Auth: No issuer in token')
      return res.status(401).json({ error: 'Invalid token - no issuer' })
    }

    // Verify the JWT using Clerk's JWKS
    const payload = await new Promise((resolve, reject) => {
      jwt.verify(token, getKey(issuer), {
        algorithms: ['RS256'],
        issuer,
        clockTolerance: 30,
      }, (err, decoded) => {
        if (err) reject(err)
        else resolve(decoded)
      })
    })

    const clerkId = payload.sub
    if (!clerkId) {
      return res.status(401).json({ error: 'Invalid token payload' })
    }

    // Find or create user in our database
    let user = await prisma.user.findUnique({
      where: { clerkId },
      include: { subscription: true, voiceAgent: true },
    })

    if (!user) {
      // Auto-create user from Clerk data
      const clerkRes = await fetch(`https://api.clerk.com/v1/users/${clerkId}`, {
        headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` },
      })
      const clerkUser = clerkRes.ok ? await clerkRes.json() : null

      user = await prisma.user.create({
        data: {
          clerkId,
          email: clerkUser?.email_addresses?.[0]?.email_address || '',
          name: [clerkUser?.first_name, clerkUser?.last_name].filter(Boolean).join(' ') || null,
        },
        include: { subscription: true, voiceAgent: true },
      })
    }

    req.user = user
    next()
  } catch (error) {
    console.error('Auth error:', error.message, error.name)
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
