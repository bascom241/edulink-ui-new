import React, { useEffect } from 'react'
import { useClassRoomStore } from '../../store/useClassRoom'
import { useAuthStore } from '../../store/useAuthStore'
import { 
  ArrowLeft, Users, Clock, Calendar, DollarSign, 
  MapPin, Target, Tag, FileText, BookOpen, 
  AlertCircle, CheckCircle, BarChart3 
} from 'lucide-react'

interface Props {
  id: number
  goBack: () => void
}

const ClassroomDetail = ({ id, goBack }: Props) => {
  const { singleClassroom, fetchingSingleClassroom, fetchSingleClassroom } = useClassRoomStore()
  const { user } = useAuthStore()

  useEffect(() => {
    if (user && fetchSingleClassroom) {
      fetchSingleClassroom(user.email, Number(id))
    }
  }, [user, fetchSingleClassroom, id])

  if (fetchingSingleClassroom) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-6 w-40 bg-gray-200 rounded mb-8"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
                
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="h-64 bg-gray-200 rounded-lg"></div>
                <div className="h-40 bg-gray-200 rounded-lg"></div>
                <div className="h-40 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!singleClassroom) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Classroom Not Found</h2>
          <p className="mt-2 text-gray-600">The classroom you're looking for doesn't exist or you don't have access to it.</p>
          <button
            onClick={goBack}
            className="mt-6 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Classrooms
          </button>
        </div>
      </div>
    )
  }

  const {
    className,
    classDescription,
    classroomPrice,
    classroomFull,
    classDurationInDays,
    createdAt,
    expiresAt,
    classDeliveryModel,
    classLocation,
    targetAudience,
    classCategory,
    resources,
    assignments,
    tasks,
    numberOfStudents,
    numberOfSessions,
    numberOfQuestions
  } = singleClassroom

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const statusColor = classroomFull ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
  const statusIcon = classroomFull ? <AlertCircle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6">
          <button
            onClick={goBack}
            className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 transition shadow-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Classrooms
          </button>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Classroom header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{className}</h1>
                <p className="mt-2 opacity-90">{classDescription}</p>
              </div>
              <div className={`mt-4 md:mt-0 inline-flex items-center px-4 py-2 rounded-full ${statusColor}`}>
                {statusIcon}
                <span className="ml-2 font-medium">{classroomFull ? 'Class Full' : 'Enrolling'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Left column - Main info */}
            <div className="lg:col-span-2">
              {/* Key metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-indigo-600" />
                    <span className="ml-2 text-sm font-medium text-gray-600">Students</span>
                  </div>
                  <p className="mt-1 text-2xl font-semibold">{numberOfStudents}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 text-indigo-600" />
                    <span className="ml-2 text-sm font-medium text-gray-600">Sessions</span>
                  </div>
                  <p className="mt-1 text-2xl font-semibold">{numberOfSessions}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-indigo-600" />
                    <span className="ml-2 text-sm font-medium text-gray-600">Questions</span>
                  </div>
                  <p className="mt-1 text-2xl font-semibold">{numberOfQuestions}</p>
                </div>
              </div>

              {/* Classroom details */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Class Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Price</p>
                      <p className="font-semibold">${classroomPrice.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Duration</p>
                      <p className="font-semibold">{classDurationInDays} days</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Created</p>
                      <p className="font-semibold">{formatDate(createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Expires</p>
                      <p className="font-semibold">{formatDate(expiresAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Delivery</p>
                      <p className="font-semibold">{classDeliveryModel} · {classLocation}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Target className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Audience</p>
                      <p className="font-semibold">{targetAudience}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Tag className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Category</p>
                      <p className="font-semibold">{classCategory}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resources */}
              {resources && resources.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Resources</h2>
                  <div className="space-y-3">
                    {resources.map((resource, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <FileText className="h-5 w-5 text-indigo-600 mr-3" />
                        <span className="font-medium">{resource.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Assignments */}
              {assignments && assignments.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Assignments</h2>
                  <div className="space-y-3">
                    {assignments.map((assignment, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <BookOpen className="h-5 w-5 text-indigo-600 mr-3" />
                        <span className="font-medium">{assignment.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasks */}
              {tasks && tasks.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Tasks</h2>
                  <div className="space-y-3">
                    {tasks.map((task, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <FileText className="h-5 w-5 text-indigo-600 mr-3" />
                        <span className="font-medium">{task.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right column - Actions and additional info */}
            <div className="space-y-6">
              {/* Enrollment status */}
              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Enrollment Status</h3>
                <div className={`inline-flex items-center px-4 py-2 rounded-full ${statusColor} mb-4`}>
                  {statusIcon}
                  <span className="ml-2 font-medium">{classroomFull ? 'Class Full' : 'Available'}</span>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  {classroomFull 
                    ? 'This class has reached maximum capacity.' 
                    : 'Spots are available for enrollment.'}
                </p>
                <button
                  className={`mt-4 w-full py-2.5 rounded-lg font-medium ${
                    classroomFull
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 transition'
                  }`}
                  disabled={classroomFull}
                >
                  {classroomFull ? 'Class Full' : 'Enroll Now'}
                </button>
              </div>

              {/* Quick actions */}
              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                    <FileText className="h-5 w-5 mr-2" />
                    View Syllabus
                  </button>
                  <button className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                    <Users className="h-5 w-5 mr-2" />
                    View Student Roster
                  </button>
                  <button className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Create Assignment
                  </button>
                </div>
              </div>

              {/* Important dates */}
              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Important Dates</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Class Start</p>
                    <p className="font-medium">{formatDate(createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Class End</p>
                    <p className="font-medium">{formatDate(expiresAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-medium">{classDurationInDays} days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassroomDetail