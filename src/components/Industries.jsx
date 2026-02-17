import AnimatedSection from './AnimatedSection'

const industries = [
  { name: 'Plumbing', icon: '🔧' },
  { name: 'Electrical', icon: '⚡' },
  { name: 'HVAC', icon: '❄️' },
  { name: 'Landscaping', icon: '🌿' },
  { name: 'Cleaning', icon: '✨' },
  { name: 'Roofing', icon: '🏠' },
  { name: 'Pest Control', icon: '🛡️' },
  { name: 'Auto Repair', icon: '🚗' },
  { name: 'Dental', icon: '🦷' },
  { name: 'Medical', icon: '🏥' },
  { name: 'Legal', icon: '⚖️' },
  { name: 'Real Estate', icon: '🏢' },
]

export default function Industries() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Industries
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Built for{' '}
              <span className="gradient-text">Every Service Business</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From trades to healthcare to professional services — Andy is
              trained to handle calls for your specific industry.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="group bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
              >
                <div className="text-3xl mb-3">{industry.icon}</div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors">
                  {industry.name}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="text-center text-gray-500 mt-8 text-sm">
            + many more industries supported
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
