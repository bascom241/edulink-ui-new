

const QuickActions = () => {
    const actions = [
        { 
            id: 1, 
            title: "Schedule Session", 
            description: "Create a new learning session", 
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
            ),
            color: "bg-blue-100 text-blue-600"
        },
        { 
            id: 2, 
            title: "Add Resources", 
            description: "Upload study materials", 
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
            ),
            color: "bg-green-100 text-green-600"
        },
        { 
            id: 3, 
            title: "Message Tutor", 
            description: "Contact your instructor", 
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
            ),
            color: "bg-purple-100 text-purple-600"
        },
        { 
            id: 4, 
            title: "View Progress", 
            description: "Check your performance", 
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
            ),
            color: "bg-amber-100 text-amber-600"
        }
    ];

    return (
        <div className='w-full p-6 mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all hover:shadow-xl'>
            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-bold text-gray-800'>Quick Actions</h2>
                <span className='text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full'>
                    Shortcuts
                </span>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {actions.map(action => (
                    <button 
                        key={action.id} 
                        className='p-4 rounded-xl border border-gray-100 bg-gradient-to-r from-white to-gray-50 transition-all hover:border-blue-100 hover:shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    >
                        <div className='flex items-start space-x-3'>
                            <div className={`p-2 rounded-lg ${action.color}`}>
                                {action.icon}
                            </div>
                            <div>
                                <h3 className='font-semibold text-gray-800'>{action.title}</h3>
                                <p className='text-sm text-gray-500 mt-1'>{action.description}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
            
            <button className='w-full mt-6 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg font-medium transition-all hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg border border-gray-200'>
                View All Actions
            </button>
        </div>
    )
}

export default QuickActions