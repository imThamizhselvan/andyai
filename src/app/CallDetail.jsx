import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../lib/api'

export default function CallDetail() {
  const { id } = useParams()
  const [call, setCall] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCall() {
      try {
        const data = await api.getCall(id)
        setCall(data)
      } catch (err) {
        console.error('Failed to fetch call:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCall()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!call) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg font-medium">Call not found</p>
        <Link to="/app/calls" className="text-primary hover:underline text-sm mt-2 inline-block">
          Back to calls
        </Link>
      </div>
    )
  }

  const transcript = (() => {
    try {
      return typeof call.transcript === 'string' ? JSON.parse(call.transcript) : call.transcript
    } catch {
      return null
    }
  })()

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/app/calls"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-3"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to calls
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {call.callerName || 'Unknown Caller'}
            </h1>
            <p className="text-gray-500 mt-1">{call.callerPhone || 'No phone number'}</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                call.status === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : call.status === 'missed'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {call.status}
            </span>
            {call.urgency === 'high' && (
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                Urgent
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Call Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Call Details</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase">Date & Time</dt>
                <dd className="text-sm text-gray-900 mt-1">
                  {new Date(call.createdAt).toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase">Duration</dt>
                <dd className="text-sm text-gray-900 mt-1">
                  {call.duration
                    ? `${Math.floor(call.duration / 60)}m ${call.duration % 60}s`
                    : '--'}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase">Urgency</dt>
                <dd className="text-sm text-gray-900 mt-1 capitalize">
                  {call.urgency || 'Normal'}
                </dd>
              </div>
              {call.appointmentAt && (
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase">Appointment Booked</dt>
                  <dd className="text-sm text-gray-900 mt-1">
                    {new Date(call.appointmentAt).toLocaleString()}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Summary */}
          {call.summary && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Summary</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{call.summary}</p>
            </div>
          )}
        </div>

        {/* Transcript */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Transcript</h3>
            </div>
            <div className="p-6">
              {transcript && transcript.length > 0 ? (
                <div className="space-y-4">
                  {transcript.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === 'agent' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.role === 'agent'
                            ? 'bg-gray-100 text-gray-800 rounded-bl-md'
                            : 'bg-primary text-white rounded-br-md'
                        }`}
                      >
                        <p className="text-xs font-medium mb-1 opacity-70">
                          {msg.role === 'agent' ? 'Andy AI' : 'Caller'}
                        </p>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="w-12 h-12 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-gray-500 font-medium">No transcript available</p>
                  <p className="text-sm text-gray-400 mt-1">
                    The transcript will appear here after the call is processed.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
