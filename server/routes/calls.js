import { Router } from 'express'
import prisma from '../lib/prisma.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Get dashboard stats
router.get('/dashboard/stats', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const [totalCalls, monthCalls, appointments, subscription] =
      await Promise.all([
        prisma.call.count({ where: { userId } }),
        prisma.call.count({
          where: { userId, createdAt: { gte: startOfMonth } },
        }),
        prisma.call.count({
          where: { userId, appointmentAt: { not: null } },
        }),
        prisma.subscription.findUnique({ where: { userId } }),
      ])

    const avgDuration = await prisma.call.aggregate({
      where: { userId },
      _avg: { duration: true },
    })

    res.json({
      totalCalls,
      callsThisMonth: monthCalls,
      appointmentsBooked: appointments,
      avgCallDuration: Math.round(avgDuration._avg.duration || 0),
      callsUsed: subscription?.callsUsed || 0,
      callsLimit: subscription?.callsLimit || 10,
      plan: subscription?.plan || 'free',
      subscriptionStatus: subscription?.status || 'trialing',
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

// List calls (paginated)
router.get('/', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const status = req.query.status
    const search = req.query.search

    const where = { userId }
    if (status && status !== 'all') where.status = status
    if (search) {
      where.OR = [
        { callerName: { contains: search, mode: 'insensitive' } },
        { callerPhone: { contains: search } },
        { summary: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [calls, total] = await Promise.all([
      prisma.call.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.call.count({ where }),
    ])

    res.json({
      calls,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('List calls error:', error)
    res.status(500).json({ error: 'Failed to fetch calls' })
  }
})

// Get single call
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const call = await prisma.call.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    })

    if (!call) return res.status(404).json({ error: 'Call not found' })

    res.json(call)
  } catch (error) {
    console.error('Get call error:', error)
    res.status(500).json({ error: 'Failed to fetch call' })
  }
})

export default router
