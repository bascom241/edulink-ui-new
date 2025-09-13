import { useEffect, useState } from 'react'
import { useClassRoomStore } from '../../store/useClassRoom'
import { useAuthStore } from '../../store/useAuthStore'
import {
  ArrowLeft, Users, Clock, Calendar, DollarSign,
  MapPin, Target, Tag, FileText, BookOpen,
  AlertCircle, CheckCircle, BarChart3,
  FolderPlus
} from 'lucide-react'
import { Link } from 'react-router-dom'
import ClassResourceModel from '../../models/ClassResourceModel'

interface Props {
  id: number
  goBack: () => void
}

const ClassroomDetail = ({ id, goBack }: Props) => {
  const { singleClassroom, fetchingSingleClassroom, fetchSingleClassroom, generateInviteLink, fetchingInviteLink } = useClassRoomStore()
  const { user } = useAuthStore()
  const [linkCopied, setLinkCopied] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [studyResourcesModal, setStudyResourcesModal] = useState(false)



  useEffect(() => {
    if (user && fetchSingleClassroom) {
      fetchSingleClassroom(user.email, Number(id))
    }
  }, [user, fetchSingleClassroom, id])



  const [studentInviteLink, setStudentInviteLink] = useState<string>("");

  useEffect(() => {
    const fetchLink = async () => {
      if (singleClassroom?.classId && generateInviteLink) {
        const link = await generateInviteLink(singleClassroom.classId);
        setStudentInviteLink(link || "");
      }
    };
    fetchLink();
  }, [singleClassroom?.classId, generateInviteLink]);

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

  // Generate invite link based on class ID

  const copyToClipboard = () => {
    navigator.clipboard.writeText(studentInviteLink || '')
      .then(() => {
        setLinkCopied(true);
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          setTimeout(() => setLinkCopied(false), 300);
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

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
            </div>

          </div>

          {
            studyResourcesModal && (
              <ClassResourceModel 
              setStudyResourcesModal={setStudyResourcesModal}
              classId={singleClassroom?.classId}
              />
            )
          }
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
              {/* Student Invite Link Section */}
              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Student Invite Link</h3>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Share with Students
                  </h4>
                  <div className="flex items-center">
                    {
                      fetchingInviteLink ? (
                        <div>

                          <div className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-l-lg bg-gray-100">
                            <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                          </div>

                        </div>
                      ) : (
                        <></>
                      )
                    }
                    <input
                      type="text"
                      readOnly
                      value={studentInviteLink}
                      className="flex-1 border border-gray-300 rounded-l-lg py-2 px-3 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <button
                      onClick={copyToClipboard}
                      className={`py-2 px-4 rounded-r-lg text-sm font-medium flex items-center bg-indigo-600 text-white hover:bg-indigo-700 transition`}
                    >
                      {linkCopied ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          Copy Link
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">
                    Share this link with students so they can join your "{className}" class
                  </p>
                </div>
              </div>

              {/* Notification */}
              {showNotification && (
                <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center animate-fadeIn">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Invite link copied to clipboard!</span>
                </div>
              )}

              {/* Quick actions */}
              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {/* <button className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Upload Assignment
                  </button> */}
                  <button className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                    <FileText className="h-5 w-5 mr-2" />
                    Upload Schedule for class
                  </button>
                  <button className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition" onClick={() => setStudyResourcesModal(true)}>
                    <FolderPlus className="h-5 w-5 mr-2" />
                    Upload Class Resources
                  </button>
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
