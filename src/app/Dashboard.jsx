import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { api } from '../lib/api'

export default function Dashboard() {
  const { user } = useUser()
  const [stats, setStats] = useState(null)
  const [recentCalls, setRecentCalls] = useState([])
  const [loading, setLoading] = useState(true)
  const [testPhone, setTestPhone] = useState('')
  const [testStatus, setTestStatus] = useState('idle')
  const [testError, setTestError] = useState('')

  async function handleTestCall(e) {
    e.preventDefault()
    setTestStatus('loading')
    setTestError('')
    try {
      await api.requestDemoCall(testPhone)
      setTestStatus('success')
    } catch (err) {
      setTestError(err.message)
      setTestStatus('error')
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, callsData] = await Promise.all([
          api.getDashboardStats(),
          api.getCalls({ limit: 5 }),
        ])
        setStats(statsData)
        setRecentCalls(callsData.calls)
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const statCards = [
    {
      label: 'Total Calls',
      value: stats?.totalCalls || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'This Month',
      value: stats?.callsThisMonth || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'text-primary bg-primary/10',
    },
    {
      label: 'Appointments',
      value: stats?.appointmentsBooked || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      label: 'Avg Duration',
      value: `${stats?.avgCallDuration || 0}s`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-purple-600 bg-purple-50',
    },
  ]

  const usagePercent = stats
    ? Math.min(100, Math.round((stats.callsUsed / stats.callsLimit) * 100))
    : 0

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back{user?.firstName ? `, ${user.firstName}` : ''}
        </h1>
        <p className="text-gray-500 mt-1">
          Here's what's happening with your calls.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">
                {card.label}
              </span>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                {card.icon}
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Usage Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">Plan Usage</h3>
            <p className="text-sm text-gray-500">
              {stats?.callsUsed || 0} of {stats?.callsLimit || 10} calls used
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {stats?.plan || 'Free'} Plan
              </span>
            </p>
          </div>
          <Link
            to="/app/billing"
            className="text-sm font-medium text-primary hover:underline"
          >
            Upgrade
          </Link>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              usagePercent > 80
                ? 'bg-red-500'
                : usagePercent > 60
                ? 'bg-yellow-500'
                : 'bg-gradient-to-r from-primary to-emerald-400'
            }`}
            style={{ width: `${usagePercent}%` }}
          />
        </div>
      </div>

      {/* Test a Call */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Test a Call</h3>
            <p className="text-sm text-gray-500">Have Andy call your phone so you can hear it live.</p>
          </div>
        </div>

        {testStatus === 'success' ? (
          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 rounded-lg px-4 py-3 text-sm">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Andy is calling you now! Pick up your phone.
          </div>
        ) : (
          <form onSubmit={handleTestCall} className="flex gap-3">
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={testPhone}
              onChange={(e) => setTestPhone(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
              required
            />
            <button
              type="submit"
              disabled={testStatus === 'loading'}
              className="px-5 py-2.5 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {testStatus === 'loading' ? 'Calling...' : 'Call Me'}
            </button>
          </form>
        )}

        {testStatus === 'error' && (
          <p className="text-red-600 text-sm mt-2">{testError}</p>
        )}
      </div>

      {/* Recent Calls */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Recent Calls</h3>
          <Link
            to="/app/calls"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        {recentCalls.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <p className="text-gray-500 font-medium">No calls yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Once Andy starts answering calls, they'll appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentCalls.map((call) => (
              <Link
                key={call.id}
                to={`/app/calls/${call.id}`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    call.urgency === 'high'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {call.callerName || 'Unknown Caller'}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {call.summary || 'No summary'}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm text-gray-500">
                    {new Date(call.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {call.duration ? `${Math.round(call.duration / 60)}m ${call.duration % 60}s` : '--'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
