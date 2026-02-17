import AnimatedSection from './AnimatedSection'

const integrations = [
  { name: 'ServiceM8', color: '#00B4D8' },
  { name: 'Jobber', color: '#7C3AED' },
  { name: 'Housecall Pro', color: '#2563EB' },
  { name: 'ServiceTitan', color: '#EF4444' },
  { name: 'Simpro', color: '#F59E0B' },
  { name: 'Google Calendar', color: '#4285F4' },
  { name: 'Outlook', color: '#0078D4' },
  { name: 'Calendly', color: '#006BFF' },
  { name: 'HubSpot', color: '#FF7A59' },
  { name: 'Zapier', color: '#FF4F00' },
  { name: 'Slack', color: '#4A154B' },
  { name: 'Zoho', color: '#E42527' },
]

export default function Integrations() {
  return (
    <section className="section-padding bg-dark" id="integrations">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Integrations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Connects With Your{' '}
              <span className="gradient-text">Existing Tools</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Andy syncs with your calendar, booking software, and job
              management tools so appointments land right where you need them.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="glass p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: integration.color + '30' }}
                >
                  <span style={{ color: integration.color }}>
                    {integration.name[0]}
                  </span>
                </div>
                <span className="text-gray-400 text-xs font-medium text-center group-hover:text-white transition-colors">
                  {integration.name}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <p className="text-center text-gray-500 mt-8 text-sm">
            + 40 more integrations available
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
