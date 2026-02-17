import { Router } from 'express'
import Stripe from 'stripe'
import prisma from '../lib/prisma.js'
import stripe, { PLANS } from '../lib/stripe.js'

const router = Router()

// Clerk webhook — sync new users
router.post('/clerk', async (req, res) => {
  try {
    const event = req.body

    if (event.type === 'user.created') {
      const { id, email_addresses, first_name, last_name } = event.data
      const email = email_addresses?.[0]?.email_address

      if (!email) return res.status(400).json({ error: 'No email found' })

      await prisma.user.upsert({
        where: { clerkId: id },
        update: {},
        create: {
          clerkId: id,
          email,
          name: [first_name, last_name].filter(Boolean).join(' ') || null,
        },
      })
    }

    if (event.type === 'user.deleted') {
      const { id } = event.data
      await prisma.user.deleteMany({ where: { clerkId: id } })
    }

    res.json({ received: true })
  } catch (error) {
    console.error('Clerk webhook error:', error)
    res.status(500).json({ error: 'Webhook error' })
  }
})

// Stripe webhook — handle subscription events
router.post('/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Stripe webhook signature error:', err.message)
    return res.status(400).json({ error: 'Invalid signature' })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const { userId, plan } = session.metadata
        const planConfig = PLANS[plan]

        await prisma.subscription.upsert({
          where: { stripeCustomerId: session.customer },
          update: {
            stripeSubId: session.subscription,
            plan,
            status: 'active',
            callsLimit: planConfig?.callsLimit || 100,
            currentPeriodEnd: new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000
            ),
          },
          create: {
            userId,
            stripeCustomerId: session.customer,
            stripeSubId: session.subscription,
            plan,
            status: 'active',
            callsLimit: planConfig?.callsLimit || 100,
            callsUsed: 0,
            currentPeriodEnd: new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000
            ),
          },
        })
        break
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object
        await prisma.subscription.updateMany({
          where: { stripeSubId: sub.id },
          data: {
            status: sub.status,
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
          },
        })
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object
        await prisma.subscription.updateMany({
          where: { stripeSubId: sub.id },
          data: {
            status: 'canceled',
            plan: 'free',
            callsLimit: 10,
          },
        })
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object
        await prisma.subscription.updateMany({
          where: { stripeCustomerId: invoice.customer },
          data: { status: 'past_due' },
        })
        break
      }
    }

    res.json({ received: true })
  } catch (error) {
    console.error('Stripe webhook error:', error)
    res.status(500).json({ error: 'Webhook error' })
  }
})

// ElevenLabs webhook — call completed
router.post('/elevenlabs', async (req, res) => {
  try {
    const data = req.body

    // Find user by agent ID
    const voiceAgent = await prisma.voiceAgent.findFirst({
      where: { elevenLabsAgentId: data.agent_id },
      include: { user: true },
    })

    if (!voiceAgent) {
      return res.status(404).json({ error: 'Agent not found' })
    }

    // Extract call data from ElevenLabs payload
    const transcript = data.transcript || []
    const callerName = extractCallerName(transcript)
    const callerPhone = data.caller_phone || null
    const summary = data.summary || generateSummary(transcript)
    const duration = data.duration_seconds || 0
    const urgency = detectUrgency(transcript)

    // Save call to database
    await prisma.call.create({
      data: {
        userId: voiceAgent.userId,
        callerName,
        callerPhone,
        duration,
        summary,
        transcript: JSON.stringify(transcript),
        status: 'completed',
        urgency,
      },
    })

    // Increment calls used
    await prisma.subscription.updateMany({
      where: { userId: voiceAgent.userId },
      data: { callsUsed: { increment: 1 } },
    })

    res.json({ received: true })
  } catch (error) {
    console.error('ElevenLabs webhook error:', error)
    res.status(500).json({ error: 'Webhook error' })
  }
})

function extractCallerName(transcript) {
  // Simple extraction — look for name mentions
  for (const msg of transcript) {
    if (msg.role === 'user') {
      const nameMatch = msg.content?.match(
        /(?:my name is|i'm|this is|it's)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i
      )
      if (nameMatch) return nameMatch[1]
    }
  }
  return null
}

function generateSummary(transcript) {
  const userMessages = transcript
    .filter((m) => m.role === 'user')
    .map((m) => m.content)
    .join(' ')
  return userMessages.substring(0, 200) || 'No summary available'
}

function detectUrgency(transcript) {
  const text = transcript.map((m) => m.content).join(' ').toLowerCase()
  const urgentWords = ['emergency', 'urgent', 'asap', 'right away', 'flooding', 'burst', 'fire', 'leak']
  return urgentWords.some((w) => text.includes(w)) ? 'high' : 'low'
}

export default router
