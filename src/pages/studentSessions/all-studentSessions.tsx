import { useEffect, useState } from 'react'
import { useSessionStore } from '../../store/useSessionStore'
import { useAuthStore } from '../../store/useAuthStore'
import SessionDetail from '../sessions/sessionDetail'
const AllstudentSessions = () => {

  const { getAllStudentSessions, fetchingStudentSessions, allStudentSessionsContainer } = useSessionStore()
  const { user } = useAuthStore()
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState('all');
  useEffect(() => {
    if (user && getAllStudentSessions) {
      const studentEmail = user?.email
      getAllStudentSessions(studentEmail)
    }
  }, [user]);


  const filteredSessions = allStudentSessionsContainer?.filter(s => {
    if (activeTab === "all") return true
    if (activeTab === "live") return s.status === "ONGOING"
    if (activeTab === "upcoming") return !s.startTime
    if (activeTab === "completed") return s.endTime && s.status !== "ONGOING"

    return true
  }) || [];



  const formatTime = (timeString: string) => {
    if (!timeString) return "NOT STARTED"

    const date = new Date(timeString);
    return date.toLocaleDateString([], { hour: "2-digit", minute: "2-digit" })
  }


  const calculateProgress = (session: any) => {
    if (session.status !== "ONGOING" && session.status !== "STARTED") return 0;
    if (!session.startTime) return 0
    const start = new Date(session.startTime).getTime()
    const now = Date.now();
    const elapsed = (now - start) * (1000 / 60)
    return Math.min(100, (elapsed / session.durationInMinutes) * 100);
  }

  if (selectedSessionId) {
    return (
      <SessionDetail 
      id={selectedSessionId}
      goBack={() => setSelectedSessionId(null)}
      />
    )
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Classroom Sessions</h1>
            <p className="text-gray-600 mt-2">Track and Monitor Sessions to have Maximum Points</p>
          </div>

        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl p-1.5 shadow-sm mb-8 flex flex-wrap">
          {['all', 'live', 'upcoming', 'completed'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg mx-1 transition-all ${activeTab === tab
                ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Sessions
            </button>
          ))}
        </div>

        {/* Loading State */}
        {fetchingStudentSessions && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
            <p className="text-gray-600">Loading your sessions...</p>
          </div>
        )}

        {/* Sessions Grid */}
        {!fetchingStudentSessions && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm">
                <div className="bg-purple-100 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No sessions found</h3>
                <p className="text-gray-600 text-center max-w-md">Join your first session to get started with your classrooms</p>
              </div>
            ) : (
              filteredSessions.map((session) => (
                <div
                  key={session.sessionId}
                  className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md border ${session.status === 'ONGOING' ? 'border-l-4 border-l-green-500' : 'border-gray-200'
                    }`}
                >
                  {/* Session Header */}
                  <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${session.status === 'ONGOING'
                          ? 'bg-green-500 animate-pulse'
                          : session.status === 'STARTED'
                            ? 'bg-yellow-500'
                            : 'bg-gray-400'
                          }`}
                      ></div>
                      <span className="text-sm font-medium text-gray-700">
                        {session.status === 'ONGOING'
                          ? 'Live Now'
                          : session.status.charAt(0) + session.status.slice(1).toLowerCase()}
                      </span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                  </div>

                  {/* Session Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{session.topic}</h3>
                    <p className="text-gray-600 text-sm mb-4">{session.classroomName}</p>

                    <div className="space-y-3 mb-5">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{session.durationInMinutes} minutes</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>{session.allowAnyOneToJoin ? 'Open to all' : 'Invite only'}</span>
                      </div>
                    </div>

                    {/* Progress bar for ongoing sessions */}
                    {(session.status === 'ONGOING' || session.status === 'STARTED') && session.startTime && (
                      <div className="mb-5">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>{formatTime(session.startTime)}</span>
                          <span>{session.endTime ? formatTime(session.endTime) : 'In progress'}</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500"
                            style={{ width: `${calculateProgress(session)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Status-specific information */}

                    {session.endTime && session.status !== 'ONGOING' && (
                      <div className="bg-gray-100 text-gray-700 text-sm p-3 rounded-lg mb-5">
                        Completed on {new Date(session.endTime).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  {/* Session Footer */}
                  <div className="px-5 pb-5">
                    {session.status === 'ONGOING' ? (
                      <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Join Live Session
                      </button>
                    ) : session.status === 'STARTED' && !session.endTime ? (
                      <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Continue Session
                      </button>
                    ) : (
                      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                        onClick={() => setSelectedSessionId(session.sessionId)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AllstudentSessions
