
import {motion} from "framer-motion"
import { BookOpen, MessageSquare , Eye, Users , FileText , Calendar , TrendingUp} from 'lucide-react'
import ComingSoon from '../components/skeletons/ComingSoon'
import { StatCard } from './StudentStartCard'

import type { ClassroomResponseDto } from '../store/useClassRoom'
const MyClassroomCard = ({ classroom , onChat }: { classroom: ClassroomResponseDto , onChat: (inst: any) => void}) => {
    return (
        <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500"
    >

    
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-3xl p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{classroom.className}</h2>
          
            </div>
            <p className="text-blue-600 font-medium">{classroom.classCategory}</p>
          </div>
       

        
        </div>

        {/* Instructor */}
        <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <img
              src={``}
              alt="Instructor"
              className="w-10 h-10 rounded-full border-2 border-blue-200"
            />
            <div>
              <p className="font-semibold text-gray-900">Dr. {classroom.classroomOwnerFirstName || "Sarah"}</p>
              <p className="text-sm text-gray-500">Instructor</p>
            </div>
          </div>
          <button
            onClick={() => onChat(classroom)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
          >
            <MessageSquare size={16} />
            Chat
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<Users size={18} className="text-white" />} label="Students" value={classroom.numberOfStudents} color="blue" />
          <StatCard icon={<FileText size={18} className="text-white" />} label="Questions" value={classroom.numberOfQuestions} color="purple" />
          <StatCard icon={<Calendar size={16} className="text-white" />} label="Expires" value={new Date(classroom.expiresAt).toLocaleDateString()} color="amber" />
          <StatCard icon={<TrendingUp size={16} className="text-white" />} label="Progress" value={`${classroom.progress || 0}%`} color="green" />
        </div>

        {/* Live Activity */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">Live Activity</span>
            <span className="">Coming soon</span>
          </div>
          <ComingSoon
            title="Live Activity Coming Soon"
            subtitle="You'll soon see real-time updates from your classroom here!"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border rounded-xl flex-1 hover:bg-gray-50"
            
          >
            <Eye size={18} /> View Details
          </button>
          <button
           
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl flex-1 hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50"
            disabled={true}
          >
            <BookOpen size={18} /> 
            Joined 
          </button>
        </div>
      </div>
    </motion.div>
    )
}

export default MyClassroomCard
