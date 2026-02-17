import { useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedSection from '../components/AnimatedSection'

const steps = [
  {
    step: '01',
    title: 'Forward Your Calls',
    description:
      'Set up call forwarding from your business line to Andy AI. Works with any phone system — landline, mobile, or VoIP. Takes less than 2 minutes to configure.',
    details: [
      'Works with any phone provider',
      'Forward all calls or just overflow/after-hours',
      'Instant activation — no hardware needed',
      'Keep your existing business number',
    ],
  },
  {
    step: '02',
    title: 'Andy Answers & Books',
    description:
      'When a call comes in, Andy picks up instantly with your custom greeting. It listens to the caller, understands their needs, captures their details, and books an appointment directly into your calendar.',
    details: [
      'Custom greeting with your business name',
      'Asks smart follow-up questions',
      'Captures name, phone, issue, and address',
      'Books appointments into your live calendar',
    ],
  },
  {
    step: '03',
    title: 'You Get Notified Instantly',
    description:
      'After every call, Andy sends you a full summary via SMS and email. You\'ll know who called, what they need, and when they\'re booked — even if you\'re on a job or sleeping.',
    details: [
      'Real-time SMS and email notifications',
      'Full call transcript available',
      'Caller details synced to your CRM',
      'Emergency calls flagged as urgent',
    ],
  },
]

const faqs = [
  {
    q: 'How long does it take to set up Andy AI?',
    a: 'Less than 2 minutes. Just forward your business calls to your Andy AI number. No apps to install, no hardware needed.',
  },
  {
    q: 'Will callers know they\'re talking to AI?',
    a: 'Andy sounds remarkably natural. Most callers don\'t realize they\'re talking to AI. You can customize the greeting, tone, and conversation style to match your brand.',
  },
  {
    q: 'What happens if someone calls with an emergency?',
    a: 'Andy can detect urgency and immediately flag the call, sending you a priority notification with all the caller\'s details so you can call back right away.',
  },
  {
    q: 'Can Andy handle calls for different types of businesses?',
    a: 'Yes! Andy is trained for dozens of industries including plumbing, electrical, HVAC, dental, legal, cleaning, and more. It understands industry-specific terminology and workflows.',
  },
  {
    q: 'What if I want to answer some calls myself?',
    a: 'You have full control. Forward all calls, or only forward when you\'re busy, after hours, or on weekends. You can change your settings anytime.',
  },
  {
    q: 'Does Andy integrate with my booking software?',
    a: 'Andy integrates with 50+ tools including Google Calendar, ServiceM8, Jobber, Housecall Pro, Calendly, and more. If your tool has an API, we can connect it.',
  },
]

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div>
      {/* Header */}
      <section className="bg-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              How It Works
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              Set Up in{' '}
              <span className="gradient-text">Under 2 Minutes</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              No apps. No hardware. No technical skills. Just forward your
              calls and Andy takes care of the rest.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Steps Detail */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto space-y-20">
          {steps.map((step, i) => (
            <AnimatedSection key={step.step}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl font-black gradient-text">
                      {step.step}
                    </span>
                    <div className="h-px flex-grow bg-gradient-to-r from-primary/50 to-transparent" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                  <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 aspect-square flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-white text-4xl font-black mb-4 shadow-lg shadow-primary/25">
                        {step.step}
                      </div>
                      <p className="text-gray-400 font-medium">
                        {step.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Got questions? We've got answers.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900">
                      {faq.q}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === i ? 'max-h-48' : 'max-h-0'
                    }`}
                  >
                    <p className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
              Ready to Never Miss a Call?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Set up Andy AI in under 2 minutes and start capturing every lead
              today.
            </p>
            <Link to="/contact" className="btn-primary text-lg">
              Get Started Free
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
