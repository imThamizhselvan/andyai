import 'dotenv/config'
import { createAgent } from '../lib/elevenlabs.js'

async function main() {
  console.log('Creating demo agent on ElevenLabs...\n')

  const agent = await createAgent({
    name: 'Smith Plumbing',
    greeting:
      "Good morning! Thanks for calling Smith Plumbing. This is Andy, your AI receptionist. How can I help you today?",
    businessInfo: `Smith Plumbing is a full-service plumbing company serving the greater metro area.

Services offered:
- Emergency plumbing repairs (burst pipes, leaks, flooding)
- Drain cleaning and unclogging
- Water heater installation and repair
- Bathroom and kitchen remodeling
- Sewer line repair and replacement

Business hours: Monday-Friday 7 AM to 6 PM, Saturday 8 AM to 2 PM
Emergency service available 24/7 with additional after-hours fee

Pricing:
- Standard service call: $89
- Emergency after-hours: $149
- Free estimates for large projects

Available appointment slots:
- Today at 2 PM and 4 PM
- Tomorrow at 9 AM, 11 AM, and 3 PM
- Day after tomorrow at 10 AM and 1 PM`,
    voiceId: '21m00Tcm4TlvDq8ikWAM',
  })

  console.log('Demo agent created successfully!\n')
  console.log('Agent ID:', agent.agent_id)
  console.log('\nAdd this to your server/.env:')
  console.log(`DEMO_AGENT_ID=${agent.agent_id}`)
}

main().catch((err) => {
  console.error('Failed to create demo agent:', err.response?.data || err.message)
  process.exit(1)
})
