import axios from 'axios'

const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1'

const elevenlabs = axios.create({
  baseURL: ELEVENLABS_API_URL,
  headers: {
    'xi-api-key': process.env.ELEVENLABS_API_KEY,
    'Content-Type': 'application/json',
  },
})

export async function createAgent({ name, greeting, businessInfo, voiceId }) {
  const response = await elevenlabs.post('/convai/agents/create', {
    name,
    conversation_config: {
      agent: {
        prompt: {
          prompt: `You are Andy, an AI receptionist for ${name}. ${businessInfo || ''}

Your job is to:
1. Greet the caller warmly
2. Understand what they need (service type, issue, urgency)
3. Capture their name, phone number, and address
4. Book an appointment by offering available time slots
5. Confirm the appointment and let them know what to expect

Be friendly, professional, and efficient. If the caller has an emergency, flag it as urgent.`,
        },
        first_message: greeting,
        language: 'en',
      },
      tts: {
        voice_id: voiceId,
      },
    },
  })

  return response.data
}

export async function updateAgent(agentId, { name, greeting, businessInfo, voiceId }) {
  const response = await elevenlabs.patch(`/convai/agents/${agentId}`, {
    conversation_config: {
      agent: {
        prompt: {
          prompt: `You are Andy, an AI receptionist for ${name}. ${businessInfo || ''}

Your job is to:
1. Greet the caller warmly
2. Understand what they need (service type, issue, urgency)
3. Capture their name, phone number, and address
4. Book an appointment by offering available time slots
5. Confirm the appointment and let them know what to expect

Be friendly, professional, and efficient. If the caller has an emergency, flag it as urgent.`,
        },
        first_message: greeting,
      },
      tts: {
        voice_id: voiceId,
      },
    },
  })

  return response.data
}

export async function getAgent(agentId) {
  const response = await elevenlabs.get(`/convai/agents/${agentId}`)
  return response.data
}

export async function initiateOutboundCall({ agentId, toNumber }) {
  const response = await elevenlabs.post('/convai/twilio/outbound-call', {
    agent_id: agentId,
    to_number: toNumber,
    from_number: process.env.TWILIO_PHONE_NUMBER,
    twilio_account_sid: process.env.TWILIO_ACCOUNT_SID,
    twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
  })
  return response.data
}

export default elevenlabs
