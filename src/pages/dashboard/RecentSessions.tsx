

const RecentSessions = () => {
    const sessions = [
        { 
            id: 1, 
            title: "History 101", 
            time: "9:00 AM - 10:00 AM", 
            status: "completed",
            rating: 4.5
        },
        { 
            id: 2, 
            title: "Geography 101", 
            time: "11:00 AM - 12:00 PM", 
            status: "completed",
            rating: 4.2
        },
        { 
            id: 3, 
            title: "Literature 201", 
            time: "2:00 PM - 3:00 PM", 
            status: "completed",
            rating: 4.8
        }
    ];

    return (
        <div className='w-full max-w-md p-6 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all hover:shadow-xl'>
            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-bold text-gray-800'>Recent Sessions</h2>
                <span className='text-xs font-medium px-2 py-1 bg-purple-50 text-purple-600 rounded-full'>
                    {sessions.length} completed
                </span>
            </div>

            <div className='space-y-4'>
                {sessions.map(session => (
                    <div key={session.id} className='p-4 rounded-xl border border-gray-100 bg-gradient-to-r from-white to-gray-50 transition-all hover:border-purple-100 hover:shadow-sm'>
                        <div className='flex justify-between items-start'>
                            <h3 className='font-semibold text-gray-800'>{session.title}</h3>
                            <div className='flex items-center'>
                                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className='text-xs font-medium text-gray-600'>{session.rating}</span>
                            </div>
                        </div>
                        
                        <div className='flex items-center mt-2 text-sm text-gray-500'>
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            {session.time}
                        </div>
                        
                        <div className='flex items-center mt-3'>
                            <span className='text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium'>
                                Completed
                            </span>
                            <button className='ml-auto text-xs text-purple-600 font-medium hover:text-purple-800 transition-colors'>
                                View details →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            <button className='w-full mt-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium transition-all hover:border-purple-400 hover:text-purple-700 hover:shadow-sm'>
                View All Sessions
            </button>
        </div>
    )
}

export default RecentSessions