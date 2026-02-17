import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import prisma from '../lib/prisma.js'

// Extract the Clerk frontend API from the publishable key
// pk_test_xxx encodes the frontend API domain in base64
function getClerkDomain() {
  // Fallback: use CLERK_SECRET_KEY to derive the issuer isn't reliable,
  // so we use the CLERK_ISSUER env or construct from the publishable key
  if (process.env.CLERK_ISSUER) {
    return process.env.CLERK_ISSUER
  }
  // Default Clerk issuer pattern
  return null
}

let client = null

function getJwksClient(issuer) {
  if (!client) {
    client = jwksClient({
      jwksUri: `${issuer}/.well-known/jwks.json`,
      cache: true,
      rateLimit: true,
    })
  }
  return client
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
      return res.status(401).json({ error: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]

    // Decode without verifying to get the issuer
    const decoded = jwt.decode(token, { complete: true })
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    const issuer = decoded.payload.iss

    // Verify the JWT using Clerk's JWKS
    const payload = await new Promise((resolve, reject) => {
      jwt.verify(token, getKey(issuer), {
        algorithms: ['RS256'],
        issuer,
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
      // Use Clerk Backend API to get user details
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
    console.error('Auth error:', error.message)
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
