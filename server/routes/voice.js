import { Router } from 'express'
import prisma from '../lib/prisma.js'
import { createAgent, updateAgent } from '../lib/elevenlabs.js'
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
