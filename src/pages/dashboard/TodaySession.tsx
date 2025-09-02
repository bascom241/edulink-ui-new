import React from 'react'

const TodaySession = () => {
    const sessions = [
        { id: 1, title: "Math 101", time: "10:00 AM - 11:00 AM", progress: 75 },
        { id: 2, title: "Science 101", time: "12:00 PM - 1:00 PM", progress: 30 }
    ];

    return (
        <div className='w-full  p-6 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all hover:shadow-xl'>
            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-bold text-gray-800'>Today's Sessions</h2>
                <span className='text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-full'>
                    {sessions.length} sessions
                </span>
            </div>

            <div className='space-y-4'>
                {sessions.map(session => (
                    <div key={session.id} className='p-4 rounded-xl border border-gray-100 bg-gradient-to-r from-white to-gray-50 transition-all hover:border-blue-100 hover:shadow-sm'>
                        <div className='flex justify-between items-start'>
                            <h3 className='font-semibold text-gray-800'>{session.title}</h3>
                            <div className='w-2 h-2 bg-blue-500 rounded-full mt-2'></div>
                        </div>
                        
                        <div className='flex items-center mt-2 text-sm text-gray-500'>
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            {session.time}
                        </div>
                        
                        <div className='mt-3'>
                            <div className='w-full bg-gray-200 rounded-full h-1.5'>
                                <div 
                                    className='bg-blue-500 h-1.5 rounded-full transition-all duration-500' 
                                    style={{ width: `${session.progress}%` }}
                                ></div>
                            </div>
                            <div className='flex justify-between text-xs text-gray-500 mt-1'>
                                <span>Progress</span>
                                <span>{session.progress}%</span>
                            </div>
                        </div>
                        
                        <button className='mt-3 text-xs text-blue-600 font-medium hover:text-blue-800 transition-colors'>
                            View details →
                        </button>
                    </div>
                ))}
            </div>
            
            <button className='w-full mt-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium transition-all hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg'>
                Join Next Session
            </button>
        </div>
    )
}

export default TodaySession