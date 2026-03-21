import { useState, useCallback } from 'react'
import { useConversation } from '@elevenlabs/react'
import { api } from '../lib/api'

export default function VoiceWidget() {
  const [isStarting, setIsStarting] = useState(false)
  const [error, setError] = useState('')
  const [agentSpeaking, setAgentSpeaking] = useState(false)

  const conversation = useConversation({
    onConnect: () => {
      setIsStarting(false)
      setError('')
    },
    onDisconnect: () => {
      setAgentSpeaking(false)
    },
    onError: (err) => {
      setIsStarting(false)
      setError(typeof err === 'string' ? err : 'Connection error. Please try again.')
    },
    onMessage: ({ source }) => {
      setAgentSpeaking(source === 'ai')
    },
  })

  const isConnected = conversation.status === 'connected'

  const handleStart = useCallback(async () => {
    setIsStarting(true)
    setError('')
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      const { signedUrl } = await api.getVoiceSignedUrl()
      await conversation.startSession({ signedUrl })
    } catch (err) {
      setIsStarting(false)
      if (err.name === 'NotAllowedError') {
        setError('Microphone permission denied. Please allow microphone access and try again.')
      } else {
        setError(err.message || 'Failed to start conversation.')
      }
    }
  }, [conversation])

  const handleStop = useCallback(async () => {
    await conversation.endSession()
  }, [conversation])

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Talk to Andy</h3>
          <p className="text-sm text-gray-500">Have a live voice conversation with your AI receptionist in the browser.</p>
        </div>
      </div>

      {isConnected ? (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${agentSpeaking ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`} />
            <span className="text-sm text-gray-600">
              {agentSpeaking ? 'Andy is speaking...' : 'Listening...'}
            </span>
          </div>
          <button
            onClick={handleStop}
            className="ml-auto px-4 py-2 rounded-lg bg-red-50 text-red-600 border border-red-200 text-sm font-medium hover:bg-red-100 transition-colors"
          >
            End Call
          </button>
        </div>
      ) : (
        <button
          onClick={handleStart}
          disabled={isStarting}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-medium text-sm hover:bg-emerald-700 transition-colors disabled:opacity-60"
        >
          {isStarting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              Start Voice Call
            </>
          )}
        </button>
      )}

      {error && (
        <p className="text-red-600 text-sm mt-3">{error}</p>
      )}
    </div>
  )
}
