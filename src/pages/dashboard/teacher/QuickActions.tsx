const TeacherQuickActions = () => {
    const actions = [
        { 
            id: 1, 
            title: "Class Management", 
            description: "View and manage all your classes", 
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
            ),
            color: "bg-blue-100 text-blue-600",
            badge: "8 Classes"
        },
        { 
            id: 2, 
            title: "Resource Library", 
            description: "Upload and organize teaching materials", 
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
            ),
            color: "bg-green-100 text-green-600",
            badge: "32 Files"
        },
        { 
            id: 3, 
            title: "Student Messages", 
            description: "Communicate with your students", 
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
            ),
            color: "bg-purple-100 text-purple-600",
            badge: "5 Unread"
        },
        { 
            id: 4, 
            title: "Grade Assignments", 
            description: "Review and evaluate student work", 
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
            ),
            color: "bg-amber-100 text-amber-600",
            badge: "12 Pending"
        },
        { 
            id: 5, 
            title: "Attendance", 
            description: "Take and manage class attendance", 
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
            ),
            color: "bg-red-100 text-red-600",
            badge: "Today: 92%"
        },
        { 
            id: 6, 
            title: "Lesson Planner", 
            description: "Create and schedule lessons", 
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
            ),
            color: "bg-indigo-100 text-indigo-600",
            badge: "3 Upcoming"
        }
    ];

    return (
        <div className='w-full p-6 mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all hover:shadow-xl'>
            <div className='flex items-center justify-between mb-6'>
                <div>
                    <h2 className='text-2xl font-bold text-gray-800'>Quick Actions</h2>
                    <p className='text-sm text-gray-500 mt-1'>Quick access to frequently used actions</p>
                </div>
                <span className='text-xs font-medium px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full'>
                    Educator Tools
                </span>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {actions.map(action => (
                    <button 
                        key={action.id} 
                        className='p-5 rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 transition-all hover:border-blue-200 hover:shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 group'
                    >
                        <div className='flex items-start space-x-4'>
                            <div className={`p-3 rounded-xl ${action.color} group-hover:scale-105 transition-transform`}>
                                {action.icon}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className='font-semibold text-gray-800'>{action.title}</h3>
                                    <span className='text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full'>
                                        {action.badge}
                                    </span>
                                </div>
                                <p className='text-sm text-gray-500 mt-2'>{action.description}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
            
            <div className="flex justify-between items-center mt-8 pt-5 border-t border-gray-100">
                <p className="text-sm text-gray-500">Need access to more features?</p>
                <button className='px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium transition-all hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg flex items-center space-x-2'>
                    <span>Full Dashboard</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default TeacherQuickActions;