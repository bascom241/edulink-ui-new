import React, { useEffect, useState } from 'react';
import { useSessionStore } from '../../store/useSessionStore';
import { useAuthStore } from '../../store/useAuthStore';

interface SessionDetailProps {
  id: number;
  goBack: () => void;
}

const SessionDetail: React.FC<SessionDetailProps> = ({ id, goBack }) => {
  const { user } = useAuthStore();
  const { fetchinSingleInstructorSession, fetchSingleSession, singleSessionContainer } = useSessionStore();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    if (user && id) {
      fetchSingleSession(user.email, id);
    }
  }, [id, user, fetchSingleSession]);

  useEffect(() => {
    if (singleSessionContainer) {
      setSession(singleSessionContainer);
    }
  }, [singleSessionContainer]);

  if (fetchinSingleInstructorSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading session details...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="bg-purple-100 p-4 rounded-full inline-flex mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Session not found</h3>
          <p className="text-gray-600 mb-6">The requested session could not be loaded.</p>
          <button
            onClick={goBack}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200"
          >
            Back to Sessions
          </button>
        </div>
      </div>
    );
  }

  // Format date and time for better display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateProgress = () => {
    if (session.status !== "ONGOING" && session.status !== "STARTED") return 0;
    if (!session.startTime) return 0;

    const start = new Date(session.startTime).getTime();
    const now = Date.now();
    const elapsed = (now - start) / (1000 * 60); // elapsed time in minutes

    return Math.min(100, (elapsed / session.durationInMinutes) * 100);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ONGOING':
        return 'bg-green-100 text-green-800';
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800';
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <button
            onClick={goBack}
            className="flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Sessions
          </button>
        </div>

        {/* Session Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          {/* Session Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{session.topic}</h1>
                <div className="flex items-center flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(session.status)} mr-3 mb-2`}>
                    {session.status.charAt(0) + session.status.slice(1).toLowerCase()}
                  </span>
                  <span className="text-gray-600 text-sm mb-2">
                    {session.durationInMinutes} minutes
                  </span>
                </div>
              </div>
              {session.status === 'ONGOING' && (
                <button className="mt-4 md:mt-0 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 flex items-center shadow-md hover:shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Join Live Session
                </button>
              )}
            </div>
          </div>

          {/* Session Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Time Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Time Information</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start:</span>
                    <span className="font-medium">
                      {session.startTime ? `${formatDate(session.startTime)} at ${formatTime(session.startTime)}` : 'Not scheduled'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End:</span>
                    <span className="font-medium">
                      {session.endTime ? `${formatDate(session.endTime)} at ${formatTime(session.endTime)}` : 'Not ended'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Session Settings */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Session Settings</h2>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Open to anyone:</span>
                    {session.allowAnyOneToJoin ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-red-600 font-medium">No</span>
                    )}
                  </div>
                  {session.classroomName && (
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">Classroom:</span>
                      <span className="font-medium">{session.classroomName}</span>
                    </div>
                  )}
                  {session.creatorFirstName && (
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">Created by:</span>
                      <span className="font-medium">{session.creatorFirstName} {session.creatorLastName}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Progress bar for ongoing sessions */}
            {(session.status === 'ONGOING' || session.status === 'STARTED') && session.startTime && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Session Progress</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{formatTime(session.startTime)}</span>
                    <span>{session.endTime ? formatTime(session.endTime) : 'In progress'}</span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500"
                      style={{ width: `${calculateProgress()}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Start</span>
                    <span>{Math.round(calculateProgress())}% complete</span>
                    <span>End</span>
                  </div>
                </div>
              </div>
            )}

            {/* Session ID */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Session Information</h2>
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Session ID:</span>
                <span className="font-mono font-medium bg-gray-200 px-2 py-1 rounded">{session.sessionId}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-gray-100 flex flex-wrap gap-3">
            {session.status === 'ONGOING' ? (
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 flex items-center shadow-md hover:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Join Live Session
              </button>
            ) : session.status === 'STARTED' && !session.endTime ? (
              <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Continue Session
              </button>
            ) : null}

            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-5 rounded-lg transition-all duration-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Session
            </button>

            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-5 rounded-lg transition-all duration-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Delete Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetail;