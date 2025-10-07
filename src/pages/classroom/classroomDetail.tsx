

import { useEffect, useState } from "react";
import { UploadModal } from "../../components/UploadModal";
import { ContentTab } from "../../components/ContentTab";
import toast from "react-hot-toast";
import ClassroomChart from "../../../charts/ClassroomChart"
import {
  Users,
  Video,
  BookOpen,
  
  Settings,
  Copy,
  Check,

  Clock,
  Calendar,
  User,
  UserPlus,
  Download,
  Search,
  Mail,
  CheckCircle,
  MessageSquare,
  Eye,
  UserX,
  
} from "lucide-react";
import { useClassRoomStore } from "../../store/useClassRoom";
import { useAuthStore } from "../../store/useAuthStore";
import { ArrowLeft } from "lucide-react";

interface Props {
  id: number;
  goBack: () => void;
}

const ClassroomDetail = ({ id, goBack }: Props) => {
  const {
    singleClassroom,
    fetchingSingleClassroom,
    fetchSingleClassroom,
    generateInviteLink,
    fetchingInviteLink,
    uploadClassResources,
    uploadTasks
  } = useClassRoomStore();
  const { user } = useAuthStore();

  const [activeTab, setActiveTab] = useState("overview");
  const [linkCopied, setLinkCopied] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [studentInviteLink, setStudentInviteLink] = useState<string>("");


  // Add these state variables to your component
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const handleResourceUpload = async (files: File[], titles: string[], descriptions: string[]) => {
    try {
      const formData = new FormData();

      // Append each file individually
      files.forEach(file => {
        formData.append('resourcesFiles', file);
      });

      // Append each title and description as separate parts
      titles.forEach(title => {
        formData.append('resourcesTitle[]', title);
      });

      descriptions.forEach(description => {
        formData.append('resourcesDescription[]', description);
      });

      const success = await uploadClassResources(formData, singleClassroom?.classId);

      if (success) {
        console.log("Files uploaded successfully");
        // Refresh your classroom data to get the updated resources
        if (user && fetchSingleClassroom) {
          fetchSingleClassroom(user.email, Number(id));
        }
      } else {
        console.error("Failed to upload files");
      }

    } catch (error) {
      console.error('Error uploading resources:', error);
    }
  };
  const handleTaskUpload = async (files: File[], titles: string[], descriptions: string[]) => {
    try {



      const formData = new FormData();

      files.forEach(file => {
        formData.append("taskFiles", file)
      })

      titles.forEach(title => {
        formData.append("taskTitle[]", title)
      })

      descriptions.forEach(description => {
        formData.append("taskDescription[]", description)
      })

      const success = await uploadTasks(formData, singleClassroom?.classId)

      if (success) {
        toast.success("Tasks Files Uploaded Successfully")

        if (user && fetchSingleClassroom) {
          fetchSingleClassroom(user?.email, Number(id))

        } else {
          console.log("Failed to Upload Files")
        }
      }





    } catch (error) {
      console.error('Error uploading tasks:', error);
    }
  };
  // Fetch classroom details
  useEffect(() => {
    if (user && fetchSingleClassroom) {
      fetchSingleClassroom(user.email, Number(id));
    }
  }, [user, fetchSingleClassroom, id]);

  // Fetch invite link
  useEffect(() => {
    const fetchLink = async () => {
      if (singleClassroom?.classId && generateInviteLink) {
        const link = await generateInviteLink(singleClassroom.classId);
        setStudentInviteLink(link || "");
      }
    };
    fetchLink();
  }, [singleClassroom?.classId, generateInviteLink]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(studentInviteLink || "");
      setLinkCopied(true);
      setShowNotification(true);
      setTimeout(() => {
        setLinkCopied(false);
        setShowNotification(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (fetchingSingleClassroom) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading classroom...
      </div>
    );
  }

  if (!singleClassroom) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <p className="mb-4">Classroom not found.</p>
        <button
          onClick={goBack}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Classrooms
        </button>
      </div>
    );
  }

  const {
    className,
    classDescription,
    numberOfStudents,
    numberOfSessions,
    resources,
    
    tasks,
    sessions,
    students

  } = singleClassroom;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with back */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{className}</h1>
            <p className="text-gray-600 mt-2">{classDescription}</p>
          </div>
          <button
            onClick={goBack}
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl p-1.5 shadow-sm mb-8 flex flex-wrap">
          {[
            "overview",
            "students",
            "sessions",
            "content",
            "analytics",
            "settings",
          ].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg mx-1 transition-all ${activeTab === tab
                ? "bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Class Information</h2>
              <p className="text-gray-700">{classDescription}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Users className="h-6 w-6 mx-auto text-indigo-600" />
                  <p className="mt-2 text-lg font-bold">{numberOfStudents}</p>
                  <p className="text-sm text-gray-600">Students</p>
                </div>
                <div className="text-center">
                  <Video className="h-6 w-6 mx-auto text-indigo-600" />
                  <p className="mt-2 text-lg font-bold">{numberOfSessions}</p>
                  <p className="text-sm text-gray-600">Sessions</p>
                </div>
                <div className="text-center">
                  <BookOpen className="h-6 w-6 mx-auto text-indigo-600" />
                  <p className="mt-2 text-lg font-bold">
                    {resources?.length || 0}
                  </p>
                  <p className="text-sm text-gray-600">Resources</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === "students" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Enrolled Students</h2>
                <p className="text-gray-500 text-sm mt-1">
                  {numberOfStudents} student{numberOfStudents !== 1 ? 's' : ''} enrolled in this classroom
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Student
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students by name or email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">All Students</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Students Table */}
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      A/R
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students?.map((student) => (
                    <tr key={student.studentId} className="hover:bg-gray-50 transition-colors">
                      {/* Student Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {student.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {student.fullName}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {student.studentId}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{student.email}</div>
                        <div className="text-sm text-gray-500">
                          <Mail className="h-4 w-4 inline mr-1" />
                          {student.email}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${student.status === "active"
                              ? "bg-green-100 text-green-800"
                              : student.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {student.status
                            ? student.status.charAt(0).toUpperCase() +
                            student.status.slice(1)
                            : "Unknown"}
                        </span>
                      </td>

                      {/* Joined Date */}
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {student.joinDate
                          ? new Date(student.joinDate).toLocaleDateString()
                          : "N/A"}
                      </td>

                      {/* Attendance Rate */}
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {student.attendanceRate != null
                          ? `${student.attendanceRate.toFixed(2)}%`
                          : "0%"}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="text-indigo-600 hover:text-indigo-900 transition">
                            <MessageSquare className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 transition">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 transition">
                            <UserX className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* Pagination (if you have many students) */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                Showing {students?.length} of {numberOfStudents} students
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{numberOfStudents}</div>
                <div className="text-sm text-blue-800">Total Students</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{numberOfStudents}</div>
                <div className="text-sm text-green-800">Active Students</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">0</div>
                <div className="text-sm text-yellow-800">Pending</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">0</div>
                <div className="text-sm text-red-800">Inactive</div>
              </div>
            </div>
          </div>
        )}

        {/* Sessions Tab */}
        {activeTab === "sessions" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Class Sessions</h2>
              <span className="text-sm text-gray-500">
                {sessions?.length || 0} session(s)
              </span>
            </div>

            {sessions && sessions.length > 0 ? (
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div
                    key={session.sessionId}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">
                          {session.topic}
                        </h3>
                        <p className="text-sm text-gray-600">
                          By {session.creatorFirstName} {session.creatorLastName}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${session.status === 'PROCESSED'
                        ? 'bg-blue-100 text-blue-800'
                        : session.status === 'ONGOING'
                          ? 'bg-green-100 text-green-800'
                          : session.status === 'COMPLETED'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {session.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                        <span>{session.durationInMinutes} minutes</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                        <span>
                          {session.startTime
                            ? new Date(session.startTime).toLocaleDateString()
                            : 'Not started'
                          }
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2 text-indigo-500" />
                        <span>ID: {session.sessionId}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        {session.startTime && !session.endTime && (
                          <button className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition">
                            Join Session
                          </button>
                        )}
                        <button className="px-3 py-1 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600 transition">
                          View Details
                        </button>
                      </div>

                      {session.endTime && (
                        <span className="text-xs text-gray-500">
                          Ended: {new Date(session.endTime).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Video className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <p>No sessions created yet</p>
                <p className="text-sm">Create your first session to get started</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "content" && (
          <ContentTab
            resources={resources || []}
            tasks={tasks || []}
            onAddResource={() => setShowResourceModal(true)}
            onAddTask={() => setShowTaskModal(true)}
          />
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (



          <div className="grid-cols-1 sm:grid-cols-2">

            <h2 className="text-xl font-semibold mb-4">Class Performance</h2>

            <ClassroomChart
              classroom={singleClassroom}
            />
          </div>



        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Settings className="h-5 w-5 mr-2 text-indigo-600" />
              Classroom Settings
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class Name
                </label>
                <input
                  type="text"
                  defaultValue={className}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  defaultValue={classDescription}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Invite Link
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    readOnly
                    value={studentInviteLink}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg bg-gray-50"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition"
                  >
                    {linkCopied ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {fetchingInviteLink && (
                  <p className="text-sm text-gray-500 mt-2">Generating link...</p>
                )}
                {showNotification && (
                  <p className="text-sm text-green-600 mt-2">
                    Link copied to clipboard!
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <>
        <UploadModal
          isOpen={showResourceModal}
          onClose={() => setShowResourceModal(false)}
          onUpload={handleResourceUpload}
          type="resource"
        />
        <UploadModal
          isOpen={showTaskModal}
          onClose={() => setShowTaskModal(false)}
          onUpload={handleTaskUpload}
          type="task"
        />
      </>
    </div>


  );
};

export default ClassroomDetail;

