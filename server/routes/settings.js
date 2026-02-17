import { Router } from 'express'
import prisma from '../lib/prisma.js'
import { requireAuth } from '../middleware/auth.js'

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
    const { name, businessName, industry, phone } = req.body

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(name !== undefined && { name }),
        ...(businessName !== undefined && { businessName }),
        ...(industry !== undefined && { industry }),
        ...(phone !== undefined && { phone }),
      },
    })

    res.json(user)
  } catch (error) {
    console.error('Update settings error:', error)
    res.status(500).json({ error: 'Failed to update settings' })
  }
})

// Complete onboarding
router.post('/onboard', requireAuth, async (req, res) => {
  try {
    const { businessName, industry, greeting } = req.body

    // Update user
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        businessName,
        industry,
        onboarded: true,
      },
    })

    // Create voice agent config
    await prisma.voiceAgent.upsert({
      where: { userId: req.user.id },
      update: {
        greeting: greeting || undefined,
        businessInfo: `${businessName} - ${industry}`,
      },
      create: {
        userId: req.user.id,
        greeting: greeting || `Hi, thanks for calling ${businessName}! How can I help you today?`,
        businessInfo: `${businessName} - ${industry}`,
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
