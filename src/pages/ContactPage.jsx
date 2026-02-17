import { useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedSection from '../components/AnimatedSection'

const contactInfo = [
  {
    title: 'Email Us',
    value: 'hello@andyai.com',
    description: 'We usually respond within 2 hours.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Call Us',
    value: '+1 (555) 123-4567',
    description: 'Mon-Fri, 9am-6pm EST.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: 'Visit Us',
    value: 'San Francisco, CA',
    description: '100 Market Street, Suite 300.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    industry: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Get Started
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              Let Andy Start{' '}
              <span className="gradient-text">Answering Your Calls</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Tell us about your business and we'll have Andy set up and
              answering calls in under 2 minutes.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Get in Touch
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Ready to stop missing calls? Fill out the form and our team
                  will set up your AI receptionist and have it live within
                  minutes.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {info.title}
                        </h3>
                        <p className="text-primary font-medium">
                          {info.value}
                        </p>
                        <p className="text-sm text-gray-500">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Why Andy */}
                <div className="mt-10 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Why businesses choose Andy:
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {[
                      'Answers every call instantly, 24/7',
                      'Costs 90% less than a human receptionist',
                      'Books appointments directly into your calendar',
                      'Set up in under 2 minutes — no tech skills needed',
                      '14-day free trial, no credit card required',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection delay={0.1}>
                {submitted ? (
                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <svg
                        className="w-10 h-10 text-primary"
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
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      You're All Set!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Thanks for reaching out. Our team will contact you
                      shortly to get Andy answering your calls.
                    </p>
                    <Link to="/" className="btn-primary">
                      Back to Home
                    </Link>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      Start Your Free Trial
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 bg-white"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 bg-white"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Business Name
                        </label>
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              businessName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 bg-white"
                          placeholder="Smith Plumbing"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Industry
                        </label>
                        <select
                          value={formData.industry}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              industry: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 bg-white"
                        >
                          <option value="">Select your industry</option>
                          <option value="plumbing">Plumbing</option>
                          <option value="electrical">Electrical</option>
                          <option value="hvac">HVAC</option>
                          <option value="cleaning">Cleaning</option>
                          <option value="landscaping">Landscaping</option>
                          <option value="roofing">Roofing</option>
                          <option value="pest-control">Pest Control</option>
                          <option value="auto-repair">Auto Repair</option>
                          <option value="dental">Dental</option>
                          <option value="medical">Medical</option>
                          <option value="legal">Legal</option>
                          <option value="real-estate">Real Estate</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tell us about your business
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            message: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900 bg-white resize-none"
                        placeholder="How many calls do you get per day? What's your biggest challenge with missed calls?"
                      />
                    </div>

                    <button type="submit" className="btn-primary w-full text-lg">
                      Start Free Trial
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>

                    <p className="text-sm text-gray-500 text-center mt-4">
                      14-day free trial. No credit card required. Cancel anytime.
                    </p>
                  </form>
                )}
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
