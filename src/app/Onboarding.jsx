import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { api } from '../lib/api'

const industries = [
  'Plumbing', 'Electrical', 'HVAC', 'Dental', 'Medical',
  'Legal', 'Real Estate', 'Automotive', 'Landscaping', 'Cleaning', 'Other',
]

export default function Onboarding() {
  const { user } = useUser()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    businessName: '',
    industry: '',
    phone: '',
    greeting: "Hi, thanks for calling! How can I help you today?",
    businessInfo: '',
  })

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleComplete = async () => {
    setLoading(true)
    try {
      await api.completeOnboarding(form)
      navigate('/app')
    } catch (err) {
      console.error('Onboarding failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-white font-black text-xl mx-auto mb-3">
            A
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome{user?.firstName ? `, ${user.firstName}` : ''}!
          </h1>
          <p className="text-gray-500 mt-1">Let's set up Andy for your business.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1.5 rounded-full transition-colors ${
                s <= step ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {/* Step 1: Business Details */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Business Details</h2>
              <p className="text-sm text-gray-500 mb-6">Tell us about your business.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={form.businessName}
                    onChange={(e) => updateField('businessName', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                    placeholder="e.g. Smith Plumbing"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {industries.map((ind) => (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => updateField('industry', ind.toLowerCase())}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          form.industry === ind.toLowerCase()
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!form.businessName}
                className="w-full mt-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Configure Andy */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Configure Andy</h2>
              <p className="text-sm text-gray-500 mb-6">
                Customize how Andy answers your calls.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Greeting Message
                  </label>
                  <textarea
                    value={form.greeting}
                    onChange={(e) => updateField('greeting', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    What Andy says when picking up a call.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Context
                  </label>
                  <textarea
                    value={form.businessInfo}
                    onChange={(e) => updateField('businessInfo', e.target.value)}
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm resize-none"
                    placeholder="Describe your services, business hours, booking rules, pricing info, etc. The more detail, the better Andy handles calls."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Start */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">You're All Set!</h2>
              <p className="text-sm text-gray-500 mb-6">
                Review your setup and start your free trial.
              </p>

              <div className="space-y-3 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Business</p>
                  <p className="text-sm font-medium text-gray-900">{form.businessName}</p>
                  <p className="text-sm text-gray-500 capitalize">{form.industry || 'Not set'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Andy's Greeting</p>
                  <p className="text-sm text-gray-600 italic">"{form.greeting}"</p>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-900">Free Trial Included</p>
                  <p className="text-sm text-gray-500">
                    14 days free with 10 calls included. No credit card required.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Setting up...' : 'Start Free Trial'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
