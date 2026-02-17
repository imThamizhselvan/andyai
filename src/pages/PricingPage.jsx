import { useState } from 'react'
import Pricing from '../components/Pricing'
import AnimatedSection from '../components/AnimatedSection'

const comparisonFeatures = [
  { feature: 'Monthly Calls', starter: '100', pro: '500', enterprise: 'Unlimited' },
  { feature: 'Phone Lines', starter: '1', pro: '3', enterprise: 'Unlimited' },
  { feature: 'Appointment Booking', starter: true, pro: true, enterprise: true },
  { feature: 'Call Summaries (SMS & Email)', starter: true, pro: true, enterprise: true },
  { feature: 'Full Call Transcripts', starter: false, pro: true, enterprise: true },
  { feature: '24/7 Coverage', starter: false, pro: true, enterprise: true },
  { feature: 'Custom Greeting & Scripts', starter: false, pro: true, enterprise: true },
  { feature: 'Google Calendar Sync', starter: true, pro: true, enterprise: true },
  { feature: 'Job Management Integration', starter: false, pro: true, enterprise: true },
  { feature: 'CRM Integration', starter: false, pro: true, enterprise: 'All + Custom' },
  { feature: 'Multi-Location Support', starter: false, pro: false, enterprise: true },
  { feature: 'Custom AI Training', starter: false, pro: false, enterprise: true },
  { feature: 'Dedicated Account Manager', starter: false, pro: false, enterprise: true },
  { feature: 'SLA Guarantee', starter: false, pro: false, enterprise: true },
  { feature: 'Support', starter: 'Email', pro: 'Priority', enterprise: '24/7 Phone' },
]

const faqs = [
  {
    q: 'Can I switch plans anytime?',
    a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Absolutely! Every plan comes with a 14-day free trial. No credit card required to get started.',
  },
  {
    q: 'What happens if I exceed my call limit?',
    a: "We'll notify you when you're approaching your limit. You can upgrade mid-cycle or purchase additional calls as a top-up.",
  },
  {
    q: 'How does Andy compare to a human receptionist?',
    a: 'Andy costs a fraction of a full-time receptionist ($3,500+/month), never takes sick days, answers instantly 24/7, and can handle multiple calls simultaneously. Most callers can\'t tell the difference.',
  },
  {
    q: 'Do you offer annual billing?',
    a: 'Yes! Save 20% with annual billing on Starter and Pro plans. Contact us for Enterprise annual pricing.',
  },
]

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div>
      {/* Header */}
      <section className="bg-navy pt-32 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Pricing
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              A Receptionist for a{' '}
              <span className="gradient-text">Fraction of the Cost</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Start free, upgrade when you're ready. All plans include a 14-day
              trial — no credit card required.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Cards */}
      <Pricing />

      {/* Comparison Table */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                Compare Plans
              </h2>
              <p className="text-lg text-gray-600">
                Detailed feature comparison across all plans.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">
                      Feature
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">
                      Starter
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-primary">
                      Pro
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row) => (
                    <tr
                      key={row.feature}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 text-gray-700 font-medium">
                        {row.feature}
                      </td>
                      {['starter', 'pro', 'enterprise'].map((plan) => (
                        <td key={plan} className="text-center py-4 px-4">
                          {typeof row[plan] === 'boolean' ? (
                            row[plan] ? (
                              <svg
                                className="w-5 h-5 text-primary mx-auto"
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
                            ) : (
                              <svg
                                className="w-5 h-5 text-gray-300 mx-auto"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            )
                          ) : (
                            <span className="text-sm text-gray-600">
                              {row[plan]}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-4">
                Pricing FAQ
              </h2>
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
    </div>
  )
}
