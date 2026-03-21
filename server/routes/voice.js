import { Router } from 'express'
import prisma from '../lib/prisma.js'
import { createAgent, updateAgent, getSignedUrl, initiateOutboundCall } from '../lib/elevenlabs.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Set up or update voice agent
router.post('/setup', requireAuth, async (req, res) => {
  try {
    const { greeting, businessInfo, voiceId } = req.body
    const userId = req.user.id

    let voiceAgent = await prisma.voiceAgent.findUnique({
      where: { userId },
    })

    const agentConfig = {
      name: req.user.businessName || 'My Business',
      greeting: greeting || voiceAgent?.greeting || 'Hi, thanks for calling! How can I help you today?',
      businessInfo: businessInfo || voiceAgent?.businessInfo || '',
      voiceId: voiceId || voiceAgent?.voiceId || '21m00Tcm4TlvDq8ikWAM',
    }

    if (voiceAgent?.elevenLabsAgentId) {
      // Update existing agent
      await updateAgent(voiceAgent.elevenLabsAgentId, agentConfig)

      voiceAgent = await prisma.voiceAgent.update({
        where: { userId },
        data: {
          greeting: agentConfig.greeting,
          businessInfo: agentConfig.businessInfo,
          voiceId: agentConfig.voiceId,
        },
      })
    } else {
      // Create new agent
      const agent = await createAgent(agentConfig)

      voiceAgent = await prisma.voiceAgent.upsert({
        where: { userId },
        update: {
          elevenLabsAgentId: agent.agent_id,
          greeting: agentConfig.greeting,
          businessInfo: agentConfig.businessInfo,
          voiceId: agentConfig.voiceId,
        },
        create: {
          userId,
          elevenLabsAgentId: agent.agent_id,
          greeting: agentConfig.greeting,
          businessInfo: agentConfig.businessInfo,
          voiceId: agentConfig.voiceId,
        },
      })
    }

    res.json(voiceAgent)
  } catch (error) {
    console.error('Voice setup error:', error)
    res.status(500).json({ error: 'Failed to set up voice agent' })
  }
})

// Test call — calls the authenticated user's own phone using their agent
router.post('/test-call', requireAuth, async (req, res) => {
  try {
    const { phone } = req.body

    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' })
    }

    const cleaned = phone.replace(/[\s\-()]/g, '')
    if (!/^\+\d{10,15}$/.test(cleaned)) {
      return res.status(400).json({
        error: 'Please enter a valid phone number with country code (e.g. +61412345678)',
      })
    }

    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
      return res.status(503).json({ error: 'Outbound calling is not configured yet' })
    }

    const voiceAgent = await prisma.voiceAgent.findUnique({
      where: { userId: req.user.id },
    })

    if (!voiceAgent?.elevenLabsAgentId) {
      return res.status(404).json({ error: 'Voice agent not set up yet. Please activate it in Settings first.' })
    }

    await initiateOutboundCall({ agentId: voiceAgent.elevenLabsAgentId, toNumber: cleaned })

    res.json({ success: true, message: 'Andy is calling you now! Pick up your phone.' })
  } catch (error) {
    console.error('Test call error:', error.response?.data || error.message)
    res.status(500).json({ error: 'Failed to initiate call. Please try again.' })
  }
})

// Get signed URL for browser-based ConvAI session
router.get('/signed-url', requireAuth, async (req, res) => {
  try {
    if (!process.env.ELEVENLABS_API_KEY) {
      return res.status(503).json({ error: 'ElevenLabs is not configured' })
    }

    const voiceAgent = await prisma.voiceAgent.findUnique({
      where: { userId: req.user.id },
    })

    if (!voiceAgent?.elevenLabsAgentId) {
      return res.status(404).json({ error: 'Voice agent not set up yet. Please activate it in Settings.' })
    }

    const data = await getSignedUrl(voiceAgent.elevenLabsAgentId)
    res.json({ signedUrl: data.signed_url })
  } catch (error) {
    console.error('Signed URL error:', error)
    res.status(500).json({ error: 'Failed to get signed URL' })
  }
})

// Get voice agent config
router.get('/', requireAuth, async (req, res) => {
  try {
    const voiceAgent = await prisma.voiceAgent.findUnique({
      where: { userId: req.user.id },
    })

    res.json(
      voiceAgent || {
        greeting: 'Hi, thanks for calling! How can I help you today?',
        businessInfo: '',
        voiceId: '21m00Tcm4TlvDq8ikWAM',
        phoneNumber: null,
      }
    )
  } catch (error) {
    console.error('Get voice error:', error)
    res.status(500).json({ error: 'Failed to fetch voice agent' })
  }
})

export default router
