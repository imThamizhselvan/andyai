import { Router } from 'express'
import { initiateOutboundCall } from '../lib/elevenlabs.js'

const router = Router()

// In-memory rate limit: 1 call per phone per hour
const callLog = new Map()
const RATE_LIMIT_MS = 60 * 60 * 1000 // 1 hour

function isRateLimited(phone) {
  const lastCall = callLog.get(phone)
  if (lastCall && Date.now() - lastCall < RATE_LIMIT_MS) {
    return true
  }
  return false
}

function validatePhone(phone) {
  // Must start with + and have at least 10 digits
  const cleaned = phone.replace(/[\s\-()]/g, '')
  return /^\+\d{10,15}$/.test(cleaned) ? cleaned : null
}

// Request a demo call (public — no auth required)
router.post('/call', async (req, res) => {
  try {
    const { phone } = req.body

    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' })
    }

    const cleanPhone = validatePhone(phone)
    if (!cleanPhone) {
      return res.status(400).json({
        error: 'Please enter a valid phone number with country code (e.g. +1234567890)',
      })
    }

    if (isRateLimited(cleanPhone)) {
      return res.status(429).json({
        error: 'A demo call was already sent to this number recently. Please try again later.',
      })
    }

    const agentId = process.env.DEMO_AGENT_ID
    if (!agentId) {
      return res.status(503).json({ error: 'Demo calling is not configured yet' })
    }

    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
      return res.status(503).json({ error: 'Outbound calling is not configured yet' })
    }

    await initiateOutboundCall({
      agentId,
      toNumber: cleanPhone,
    })

    // Record the call for rate limiting
    callLog.set(cleanPhone, Date.now())

    res.json({
      success: true,
      message: 'Andy is calling you now! Pick up your phone.',
    })
  } catch (error) {
    console.error('Demo call error:', error.response?.data || error.message)
    res.status(500).json({ error: 'Failed to initiate demo call. Please try again.' })
  }
})

export default router
