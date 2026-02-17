import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import webhookRoutes from './routes/webhook.js'
import callRoutes from './routes/calls.js'
import billingRoutes from './routes/billing.js'
import settingsRoutes from './routes/settings.js'
import voiceRoutes from './routes/voice.js'

const app = express()
const PORT = process.env.PORT || 3001

// Stripe webhook needs raw body
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }))

// CORS
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean)

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
}

// Handle preflight OPTIONS requests explicitly
app.options('*', cors(corsOptions))
app.use(cors(corsOptions))

// JSON parsing for everything else
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/webhooks', webhookRoutes)
app.use('/api/calls', callRoutes)
app.use('/api/billing', billingRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/voice', voiceRoutes)

// Dashboard stats route (reuses calls router)
app.use('/api', callRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
