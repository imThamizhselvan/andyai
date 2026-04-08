import { useEffect, useState } from 'react'
import { api } from '../lib/api'

const plans = [
  {
    name: 'Free Trial',
    key: 'free',
    price: '$0',
    period: '14 days',
    calls: 10,
    features: ['10 calls included', 'Basic call summaries', 'Email notifications'],
  },
  {
    name: 'Starter',
    key: 'starter',
    price: '$49',
    period: '/month',
    calls: 100,
    features: [
      '100 calls/month',
      'Full transcripts & summaries',
      'Appointment booking',
      'SMS & email notifications',
      'Business hours routing',
    ],
  },
  {
    name: 'Pro',
    key: 'pro',
    price: '$149',
    period: '/month',
    calls: 500,
    features: [
      '500 calls/month',
      'Everything in Starter',
      'Custom voice & greeting',
      'CRM integrations',
      'Priority support',
      'Advanced analytics',
    ],
    popular: true,
  },
]

export default function Billing() {
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchSubscription() {
      try {
        const data = await api.getSubscription()
        setSubscription(data)
      } catch (err) {
        console.error('Failed to fetch subscription:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSubscription()
  }, [])

  const handleSelectPlan = async (planKey) => {
    setActionLoading(true)
    setError(null)
    try {
      const { url } = await api.createCheckout(planKey)
      window.location.href = url
    } catch (err) {
      console.error('Failed to create checkout:', err)
      setError(err.message || 'Failed to create checkout session. Please try again.')
    } finally {
      setActionLoading(false)
    }
  }

  const handleManageBilling = async () => {
    setActionLoading(true)
    try {
      const { url } = await api.createPortal()
      window.location.href = url
    } catch (err) {
      console.error('Failed to open billing portal:', err)
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const usagePercent = subscription
    ? Math.min(100, Math.round((subscription.callsUsed / subscription.callsLimit) * 100))
    : 0

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your subscription and view usage.
        </p>
      </div>

      {/* Current Plan */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Current Plan</h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                {subscription?.plan || 'Free'}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  subscription?.status === 'active'
                    ? 'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400'
                    : subscription?.status === 'trialing'
                    ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                {subscription?.status || 'inactive'}
              </span>
            </div>
            {subscription?.currentPeriodEnd && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {subscription.status === 'trialing' ? 'Trial ends' : 'Renews'}{' '}
                {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
              </p>
            )}
          </div>
          {subscription?.stripeSubId && (
            <button
              onClick={handleManageBilling}
              disabled={actionLoading}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              Manage Billing
            </button>
          )}
        </div>

        {/* Usage */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {subscription?.callsUsed || 0} of {subscription?.callsLimit || 10} calls used
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{usagePercent}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ${
                usagePercent > 80
                  ? 'bg-red-500'
                  : usagePercent > 60
                  ? 'bg-yellow-500'
                  : 'bg-primary'
              }`}
              style={{ width: `${usagePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Plans */}
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Available Plans</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const isCurrent = subscription?.plan === plan.key
          return (
            <div
              key={plan.key}
              className={`bg-white dark:bg-gray-900 rounded-xl border-2 p-6 relative ${
                plan.popular
                  ? 'border-primary'
                  : isCurrent
                  ? 'border-gray-300 dark:border-gray-600'
                  : 'border-gray-200 dark:border-gray-800'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-medium bg-primary text-white">
                  Most Popular
                </span>
              )}
              <h4 className="font-semibold text-gray-900 dark:text-white">{plan.name}</h4>
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              {isCurrent ? (
                <button
                  disabled
                  className="w-full py-2.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500 cursor-not-allowed"
                >
                  Current Plan
                </button>
              ) : plan.key === 'free' ? (
                <div />
              ) : (
                <button
                  onClick={() => handleSelectPlan(plan.key)}
                  disabled={actionLoading}
                  className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                    plan.popular
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600'
                  }`}
                >
                  {subscription?.plan === 'free' ? 'Start Plan' : 'Switch Plan'}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
