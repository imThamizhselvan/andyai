import { Router } from 'express'
import prisma from '../lib/prisma.js'
import stripe, { PLANS } from '../lib/stripe.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Create Stripe Checkout session
router.post('/checkout', requireAuth, async (req, res) => {
  try {
    const { plan } = req.body
    const planConfig = PLANS[plan]

    if (!planConfig) {
      return res.status(400).json({ error: 'Invalid plan' })
    }

    // Get or create Stripe customer
    let subscription = await prisma.subscription.findUnique({
      where: { userId: req.user.id },
    })

    let customerId = subscription?.stripeCustomerId

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: req.user.email,
        name: req.user.name || undefined,
        metadata: { userId: req.user.id },
      })
      customerId = customer.id

      // Create subscription record
      await prisma.subscription.upsert({
        where: { userId: req.user.id },
        update: { stripeCustomerId: customerId },
        create: {
          userId: req.user.id,
          stripeCustomerId: customerId,
          plan: 'free',
          status: 'trialing',
          callsUsed: 0,
          callsLimit: 10,
        },
      })
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: planConfig.priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: req.user.id,
        plan,
      },
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/app?checkout=success`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/app/billing?checkout=canceled`,
    })

    res.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    res.status(500).json({ error: 'Failed to create checkout session' })
  }
})

// Create Stripe Customer Portal session
router.post('/portal', requireAuth, async (req, res) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.user.id },
    })

    if (!subscription?.stripeCustomerId) {
      return res.status(400).json({ error: 'No subscription found' })
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/app/billing`,
    })

    res.json({ url: session.url })
  } catch (error) {
    console.error('Portal error:', error)
    res.status(500).json({ error: 'Failed to create portal session' })
  }
})

// Get current subscription
router.get('/subscription', requireAuth, async (req, res) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.user.id },
    })

    res.json(
      subscription || {
        plan: 'free',
        status: 'trialing',
        callsUsed: 0,
        callsLimit: 10,
      }
    )
  } catch (error) {
    console.error('Get subscription error:', error)
    res.status(500).json({ error: 'Failed to fetch subscription' })
  }
})

export default router
