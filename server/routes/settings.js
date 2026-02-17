import { Router } from 'express'
import prisma from '../lib/prisma.js'
import { requireAuth } from '../middleware/auth.js'
import { createAgent, updateAgent } from '../lib/elevenlabs.js'

const router = Router()

// Get user settings
router.get('/', requireAuth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { voiceAgent: true },
    })

    res.json({
      name: user.name,
      email: user.email,
      businessName: user.businessName,
      industry: user.industry,
      phone: user.phone,
      onboarded: user.onboarded,
      voiceAgent: user.voiceAgent,
    })
  } catch (error) {
    console.error('Get settings error:', error)
    res.status(500).json({ error: 'Failed to fetch settings' })
  }
})

// Update user settings
router.put('/', requireAuth, async (req, res) => {
  try {
    const { name, businessName, industry, phone, greeting, businessInfo } = req.body

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(name !== undefined && { name }),
        ...(businessName !== undefined && { businessName }),
        ...(industry !== undefined && { industry }),
        ...(phone !== undefined && { phone }),
      },
      include: { voiceAgent: true },
    })

    // Update voice agent if greeting or businessInfo provided
    if (greeting !== undefined || businessInfo !== undefined) {
      const voiceAgent = await prisma.voiceAgent.upsert({
        where: { userId: req.user.id },
        update: {
          ...(greeting !== undefined && { greeting }),
          ...(businessInfo !== undefined && { businessInfo }),
        },
        create: {
          userId: req.user.id,
          greeting: greeting || 'Hi, thanks for calling! How can I help you today?',
          businessInfo: businessInfo || '',
        },
      })

      // Sync with ElevenLabs if agent exists
      if (voiceAgent.elevenLabsAgentId) {
        try {
          await updateAgent(voiceAgent.elevenLabsAgentId, {
            name: user.businessName || 'My Business',
            greeting: voiceAgent.greeting,
            businessInfo: voiceAgent.businessInfo,
            voiceId: voiceAgent.voiceId,
          })
        } catch (err) {
          console.error('ElevenLabs agent update failed:', err.message)
        }
      }
    }

    res.json(user)
  } catch (error) {
    console.error('Update settings error:', error)
    res.status(500).json({ error: 'Failed to update settings' })
  }
})

// Complete onboarding
router.post('/onboard', requireAuth, async (req, res) => {
  try {
    const { businessName, industry, greeting, businessInfo } = req.body

    const agentGreeting = greeting || `Hi, thanks for calling ${businessName}! How can I help you today?`
    const agentBusinessInfo = businessInfo || `${businessName} - ${industry}`

    // Update user
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        businessName,
        industry,
        onboarded: true,
      },
    })

    // Create ElevenLabs voice agent
    let elevenLabsAgentId = null
    try {
      const agent = await createAgent({
        name: businessName,
        greeting: agentGreeting,
        businessInfo: agentBusinessInfo,
        voiceId: '21m00Tcm4TlvDq8ikWAM',
      })
      elevenLabsAgentId = agent.agent_id
    } catch (err) {
      console.error('ElevenLabs agent creation failed (continuing onboarding):', err.message)
    }

    // Create voice agent config
    await prisma.voiceAgent.upsert({
      where: { userId: req.user.id },
      update: {
        greeting: agentGreeting,
        businessInfo: agentBusinessInfo,
        ...(elevenLabsAgentId && { elevenLabsAgentId }),
      },
      create: {
        userId: req.user.id,
        greeting: agentGreeting,
        businessInfo: agentBusinessInfo,
        ...(elevenLabsAgentId && { elevenLabsAgentId }),
      },
    })

    // Create free subscription if none exists
    await prisma.subscription.upsert({
      where: { userId: req.user.id },
      update: {},
      create: {
        userId: req.user.id,
        stripeCustomerId: `pending_${req.user.id}`,
        plan: 'free',
        status: 'trialing',
        callsUsed: 0,
        callsLimit: 10,
      },
    })

    res.json(user)
  } catch (error) {
    console.error('Onboarding error:', error)
    res.status(500).json({ error: 'Failed to complete onboarding' })
  }
})

export default router
