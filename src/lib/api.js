const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

let getTokenFn = null

export function setGetToken(fn) {
  getTokenFn = fn
}

async function request(path, options = {}) {
  let token = null
  if (getTokenFn) {
    token = await getTokenFn()
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(error.error || 'Request failed')
  }

  return res.json()
}

export const api = {
  // Dashboard
  getDashboardStats: () => request('/api/dashboard/stats'),

  // Calls
  getCalls: (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return request(`/api/calls${query ? `?${query}` : ''}`)
  },
  getCall: (id) => request(`/api/calls/${id}`),

  // Billing
  createCheckout: (plan) =>
    request('/api/billing/checkout', {
      method: 'POST',
      body: JSON.stringify({ plan }),
    }),
  createPortal: () =>
    request('/api/billing/portal', { method: 'POST' }),
  getSubscription: () => request('/api/billing/subscription'),

  // Settings
  getSettings: () => request('/api/settings'),
  updateSettings: (data) =>
    request('/api/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  completeOnboarding: (data) =>
    request('/api/settings/onboard', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Voice
  getVoiceAgent: () => request('/api/voice'),
  setupVoiceAgent: (data) =>
    request('/api/voice/setup', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}
