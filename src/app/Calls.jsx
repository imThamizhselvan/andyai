import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'

export default function Calls() {
  const [calls, setCalls] = useState([])
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  async function fetchCalls(page = 1) {
    setLoading(true)
    try {
      const data = await api.getCalls({
        page,
        limit: 20,
        status: statusFilter,
        search: search || undefined,
      })
      setCalls(data.calls)
      setPagination(data.pagination)
    } catch (err) {
      console.error('Failed to fetch calls:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCalls()
  }, [statusFilter])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchCalls(1)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Call History</h1>
        <p className="text-gray-500 mt-1">
          View all calls handled by Andy AI.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, or summary..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
            />
          </div>
        </form>

        <div className="flex gap-2">
          {['all', 'completed', 'missed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : calls.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <p className="text-gray-500 font-medium text-lg">No calls found</p>
            <p className="text-sm text-gray-400 mt-1">
              Calls will appear here once Andy starts answering your phone.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Caller
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Summary
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Duration
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {calls.map((call) => (
                    <tr
                      key={call.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <Link to={`/app/calls/${call.id}`} className="block">
                          <p className="font-medium text-gray-900">
                            {call.callerName || 'Unknown'}
                          </p>
                          <p className="text-sm text-gray-400">
                            {call.callerPhone || '--'}
                          </p>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 truncate max-w-xs">
                          {call.summary || 'No summary'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
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
                          <span className="ml-2 inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            Urgent
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {call.duration
                          ? `${Math.floor(call.duration / 60)}:${String(call.duration % 60).padStart(2, '0')}`
                          : '--'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(call.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Page {pagination.page} of {pagination.pages} ({pagination.total} calls)
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => fetchCalls(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => fetchCalls(pagination.page + 1)}
                    disabled={pagination.page >= pagination.pages}
                    className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
