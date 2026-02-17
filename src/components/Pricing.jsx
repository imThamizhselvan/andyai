import { Link } from 'react-router-dom'
import AnimatedSection from './AnimatedSection'

const plans = [
  {
    name: 'Starter',
    price: '49',
    period: '/month',
    description: 'Perfect for solo operators and small businesses.',
    features: [
      '100 calls/month',
      '1 phone line',
      'Appointment booking',
      'Call summaries via SMS & email',
      'Google Calendar sync',
      'Business hours coverage',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Pro',
    price: '149',
    period: '/month',
    description: 'For growing businesses that need 24/7 coverage.',
    features: [
      '500 calls/month',
      '3 phone lines',
      'Appointment booking',
      'Call summaries & transcripts',
      'All calendar integrations',
      '24/7 coverage',
      'Job management sync',
      'Custom greeting & scripts',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large teams with multiple locations.',
    features: [
      'Unlimited calls',
      'Unlimited phone lines',
      'Priority answering',
      'Full CRM integration',
      'Custom AI training',
      'Multi-location support',
      'Dedicated account manager',
      'SLA guarantee',
    ],
    cta: 'Contact Us',
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section className="section-padding bg-gray-50" id="pricing">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Simple, Transparent{' '}
              <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A fraction of the cost of a full-time receptionist. Start free,
              scale as you grow.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={i * 0.1}>
              <div
                className={`relative rounded-2xl p-8 h-full flex flex-col transition-all duration-300 ${
                  plan.popular
                    ? 'bg-navy text-white shadow-2xl shadow-navy/50 scale-105 border-2 border-primary/30'
                    : 'bg-white border border-gray-200 hover:border-primary/20 hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-emerald-400 text-white text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <h3
                  className={`text-xl font-bold mb-2 ${
                    plan.popular ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mb-6 ${
                    plan.popular ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mb-8">
                  <span
                    className={`text-5xl font-black ${
                      plan.popular ? 'gradient-text' : 'text-gray-900'
                    }`}
                  >
                    {plan.price === 'Custom' ? '' : '$'}
                    {plan.price}
                  </span>
                  <span
                    className={
                      plan.popular ? 'text-gray-400' : 'text-gray-500'
                    }
                  >
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
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
                      <span
                        className={`text-sm ${
                          plan.popular ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`text-center py-4 rounded-full font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'btn-primary w-full'
                      : 'bg-gray-900 text-white hover:bg-gray-800 w-full inline-block'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
