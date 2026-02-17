import AnimatedSection from './AnimatedSection'

const steps = [
  {
    step: '01',
    title: 'Forward Your Calls',
    description:
      'Simply forward your business phone line to Andy when you\'re busy, after hours, or all the time. Setup takes under 2 minutes.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Andy Answers & Books',
    description:
      'Andy picks up instantly, understands what the caller needs, captures their details, and books an appointment into your calendar.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'You Get Notified',
    description:
      'Receive an instant SMS and email summary with the caller\'s name, issue, and booked appointment. You\'re always in the loop.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section className="section-padding bg-gray-50" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Up and Running in{' '}
              <span className="gradient-text">2 Minutes</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No technical setup needed. Just forward your calls and Andy takes
              care of the rest.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          {steps.map((step, i) => (
            <AnimatedSection key={step.step} delay={i * 0.15}>
              <div className="relative text-center">
                <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-emerald-400 text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/25">
                  {step.icon}
                </div>
                <span className="text-6xl font-black text-gray-100 absolute -top-4 left-1/2 -translate-x-1/2">
                  {step.step}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
