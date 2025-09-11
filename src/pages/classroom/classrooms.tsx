import React, { useEffect } from 'react'
import { Plus, Users, FileText, Calendar, ArrowRight, Eye } from 'lucide-react'
import { useClassRoomStore } from '../../store/useClassRoom'
import { useAuthStore } from '../../store/useAuthStore'
import ClassroomSkeleton from '../../components/skeletons/ClassroomSkeleton'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ClassroomDetail from './classroomDetail'
const Classrooms = () => {
    const { fetchingClassrooms, instructorClassrooms, fetchInstructorClassrooms } = useClassRoomStore()
    const { user } = useAuthStore()
    const navigate = useNavigate();

    const [selectedClassroomId, setSelectedClassroomId] = React.useState<number | null>(null);
    useEffect(() => {
        if(user && fetchInstructorClassrooms) {
            fetchInstructorClassrooms(user.email)
        }
    }, [user])

    // Skeleton Loader Component
 

    if (fetchingClassrooms) {
        return <ClassroomSkeleton />
    }

    if(selectedClassroomId) {
           return (
      <ClassroomDetail 
        id={selectedClassroomId} 
        goBack={() => setSelectedClassroomId(null)} 
      />
    )
    }

    return (
        <main className="pt-20 px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 pb-10 bg-gray-50 min-h-screen">
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-6 md:mb-0">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Classrooms</h1>
                    <p className="text-gray-600 text-lg">Manage and organize your learning spaces</p>
                </div>
                
                <button className="flex items-center px-5 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:from-green-600 hover:to-teal-600">
                    <Plus className="mr-2" size={20} />
                    Create Classroom
                </button>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {instructorClassrooms && instructorClassrooms.length > 0 ? (
                    instructorClassrooms.map((classroom) => (
                        <div key={classroom.classId} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-bold text-gray-800 truncate">{classroom.className}</h2>
                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${classroom.classroomFull ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                    {classroom.classroomFull ? 'Full' : 'Open'}
                                </span>
                            </div>
                            
                            <p className="text-gray-500 mb-6 text-sm">{classroom.classCategory}</p>
                            
                            <div className="flex justify-between mb-6">
                                <div className="flex items-center text-gray-600">
                                    <Users size={18} className="mr-2 text-blue-500" />
                                    <span className="text-sm font-medium">{classroom.numberOfStudents} Students</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FileText size={18} className="mr-2 text-purple-500" />
                                    <span className="text-sm font-medium">{classroom.numberOfQuestions} Questions</span>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center text-gray-500 text-sm">
                                    <Calendar size={16} className="mr-2 text-amber-500" />
                                    <span>Expires: {new Date(classroom.expiresAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            
                            <div className="flex space-x-3">
                                <button className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex-1 hover:bg-gray-200 transition-colors" 
                                onClick={() => setSelectedClassroomId(classroom.classId)}
                                >
                                    <Eye size={16} className="mr-2" />
                                    Details
                                </button>
                                <button className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg flex-1 hover:from-blue-600 hover:to-indigo-600 transition-all">
                                    Update
                                    <ArrowRight size={16} className="ml-2" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <Plus size={40} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No classrooms yet</h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">Create your first classroom to start organizing your students and questions</p>
                        <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all">
                            Create Your First Classroom
                        </button>
                    </div>
                )}
            </section>
        </main>
    )
}

export default Classrooms