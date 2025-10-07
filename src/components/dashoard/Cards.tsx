import React from 'react'
import {  House, BookOpen, Award, TrendingUp, Users, Calendar, } from 'lucide-react'
import { useClassRoomStore } from '../../store/useClassRoom'
import { useAuthStore } from '../../store/useAuthStore'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'


const Cards = () => {
    const { classRoomsLength, studentClassRoomsLength } = useClassRoomStore()
    const { user } = useAuthStore()

    const val = classRoomsLength ? classRoomsLength : 0
    const studentVal = studentClassRoomsLength ? studentClassRoomsLength : 0
    
    
    React.useEffect(() => {
        if (user?.email) {
            useClassRoomStore.getState().fetchInstructorClassroomsLength(user.email)
            useClassRoomStore.getState().fetchStudentClassroomsLength(user.email)
        }
    }, [user?.email])

    const sctaPoint = user?.sctaPoints ? user.sctaPoints : 0

    const sessionLength = user?.noOfSessions ? user.noOfSessions : 0; // Placeholder for active sessions, replace with actual data if available
    const cards = [
        {
            title: "Total Classrooms",
            value: val,
            icon: <House className="w-6 h-6" />,
            bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
            textColor: "text-white",
            accentColor: "bg-blue-400",
            trend: "+12% this month",
            description: "Active learning spaces",
            action: "Create new",
            iconBg: "bg-blue-700"
        },
        {
            title: "Total Students",
            value: studentVal,
            icon: <Users className="w-6 h-6" />,
            bgColor: "bg-gradient-to-br from-green-500 to-emerald-600",
            textColor: "text-white",
            accentColor: "bg-green-400",
            trend: "+24 enrolled",
            description: "Active learners",
            action: "View all",
            iconBg: "bg-emerald-700"
        },
        {
            title: "Active Sessions",
            value: sessionLength,
            icon: <BookOpen className="w-6 h-6" />,
            bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
            textColor: "text-white",
            accentColor: "bg-purple-400",
            trend: "3 sessions today",
            description: "Ongoing classes",
            action: "Schedule",
            iconBg: "bg-purple-700"
        },
        {
            title: "SCTA Points",
            value: `${sctaPoint} pts`,
            icon: <Award className="w-6 h-6" />,
            bgColor: "bg-gradient-to-br from-amber-500 to-amber-600",
            textColor: "text-white",
            accentColor: "bg-amber-400",
            trend: "+15 this week",
            description: "Teaching excellence",
            action: "Earn more",
            iconBg: "bg-amber-700"
        }
    ]

    // Properly typed variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const cardVariants: Variants = {
        hidden: { 
            y: 20, 
            opacity: 0 
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                    <p className="text-gray-600">Welcome back, {user?.firstName || 'Educator'}! Here's your teaching summary.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}</span>
                </div>
            </div>

            {/* Cards Grid */}
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        className="relative group"
                    >
                        <div className={`relative overflow-hidden rounded-2xl p-6 ${card.bgColor} ${card.textColor} shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
                            
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white opacity-20"></div>
                                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white opacity-20"></div>
                            </div>

                            {/* Main Content */}
                            <div className="relative z-10">
                                {/* Icon and Title */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-xl ${card.iconBg} shadow-inner`}>
                                        {card.icon}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold drop-shadow-sm">
                                            {card.value}
                                        </div>
                                        <div className="text-sm opacity-90 mt-1">
                                            {card.title}
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-sm opacity-90 mb-3">
                                    {card.description}
                                </p>

                                {/* Trend Indicator */}
                                <div className="flex items-center gap-2 text-xs opacity-90 mb-4">
                                    <TrendingUp className="w-3 h-3" />
                                    <span>{card.trend}</span>
                                </div>

                                {/* Action Button */}
                                <button className="w-full py-2 bg-white text-black bg-opacity-20 hover:bg-opacity-30 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20">
                                    {card.action}
                                </button>
                            </div>

                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                        </div>

                        {/* Glow Effect */}
                        <div className={`absolute inset-0 ${card.accentColor} opacity-0 group-hover:opacity-20 blur-xl rounded-2xl transition-opacity duration-300 -z-10`}></div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Stats Summary */}
            
        </div>
    )
}

export default Cards