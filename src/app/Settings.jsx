import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Settings() {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activating, setActivating] = useState(false)
  const [activateError, setActivateError] = useState(null)

  const [form, setForm] = useState({
    businessName: '',
    industry: '',
    phone: '',
    greeting: '',
    businessInfo: '',
  })

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await api.getSettings()
        setSettings(data)
        setForm({
          businessName: data.businessName || '',
          industry: data.industry || '',
          phone: data.phone || '',
          greeting: data.voiceAgent?.greeting || '',
          businessInfo: data.voiceAgent?.businessInfo || '',
        })
      } catch (err) {
        console.error('Failed to fetch settings:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    try {
      await api.updateSettings(form)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      console.error('Failed to save settings:', err)
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleActivateAgent = async () => {
    setActivating(true)
    setActivateError(null)
    try {
      const result = await api.setupVoiceAgent({
        greeting: form.greeting,
        businessInfo: form.businessInfo,
      })
      setSettings((prev) => ({
        ...prev,
        voiceAgent: result,
      }))
    } catch (err) {
      console.error('Failed to activate voice agent:', err)
      setActivateError(err.message || 'Failed to activate voice agent')
    } finally {
      setActivating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">
          Configure your business details and Andy's behavior.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {/* Business Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Business Information</h3>
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
              <select
                value={form.industry}
                onChange={(e) => updateField('industry', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
              >
                <option value="">Select industry</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="hvac">HVAC</option>
                <option value="dental">Dental</option>
                <option value="medical">Medical</option>
                <option value="legal">Legal</option>
                <option value="real-estate">Real Estate</option>
                <option value="automotive">Automotive</option>
                <option value="landscaping">Landscaping</option>
                <option value="cleaning">Cleaning</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Phone Number
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
        </div>

        {/* Voice Agent */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Voice Agent Configuration</h3>
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
                placeholder="Hi, thanks for calling! How can I help you today?"
              />
              <p className="text-xs text-gray-400 mt-1">
                This is what Andy says when answering a call.
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
                placeholder="Describe your business, services, hours, booking rules, etc. Andy will use this information to answer questions and book appointments."
              />
              <p className="text-xs text-gray-400 mt-1">
                The more detail you provide, the better Andy will handle your calls.
              </p>
            </div>
          </div>
        </div>

        {/* Voice Agent Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Voice Agent Status</h3>
          {settings?.voiceAgent?.elevenLabsAgentId ? (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-green-700">Agent Active</span>
              </div>
              <p className="text-sm text-gray-500">
                Your AI receptionist is set up and ready to handle calls.
              </p>
              {settings.voiceAgent.phoneNumber && (
                <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Your Andy Phone Number</p>
                  <p className="text-xl font-mono font-bold text-primary">
                    {settings.voiceAgent.phoneNumber}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Forward your business calls to this number so Andy can answer them.
                  </p>
                </div>
              )}
              <button
                type="button"
                onClick={handleActivateAgent}
                disabled={activating}
                className="mt-4 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {activating ? 'Updating...' : 'Re-sync Agent with ElevenLabs'}
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                <span className="text-sm font-medium text-gray-500">Agent Not Activated</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Activate your AI receptionist to start handling calls. Make sure you've configured your greeting and business context above first.
              </p>
              {activateError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-red-700">{activateError}</p>
                </div>
              )}
              <button
                type="button"
                onClick={handleActivateAgent}
                disabled={activating}
                className="px-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {activating ? 'Activating...' : 'Activate Voice Agent'}
              </button>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {saved && (
            <span className="text-sm text-green-600 font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Settings saved
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
