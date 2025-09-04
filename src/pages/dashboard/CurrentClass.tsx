
import { Timer,  Clock, Calendar } from "lucide-react"
import { useSessionStore } from "../../store/useSessionStore"
import { useAuthStore } from "../../store/useAuthStore"
import { useEffect } from "react"
const CurrentClass = () => {

    const { currentSession, getCurrentSession, fetchingCurrentSession } = useSessionStore()
    const { user } = useAuthStore();
    useEffect(() => {
        if (user?.email) {
            getCurrentSession(user.email);
        }
    }, [user?.email, getCurrentSession]);

    console.log(currentSession)

    if (fetchingCurrentSession) {
        return (
            <div className='bg-gradient-to-r from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-100 w-full mt-4 animate-pulse'>
                <div className='h-6 bg-gray-200 rounded w-1/3 mb-4'></div>
                <div className='h-4 bg-gray-200 rounded w-1/2 mb-2'></div>
                <div className='h-4 bg-gray-200 rounded w-1/4'></div>
            </div>
        )
    }

    const mostRecentSession = currentSession && currentSession.reduce((prev, curr) => {
        return new Date(curr.startTime) > new Date(prev.startTime) ? curr : prev;
    });

    const onGoingSession = currentSession && currentSession.find(
        (session) => session.status === 'ONGOING'
    );

    // Decide which one to display
    const sessionToDisplay = onGoingSession || mostRecentSession;
    console.log(sessionToDisplay)
    return (
        <section className='bg-gradient-to-r from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-100 w-full mt-4 transition-all hover:shadow-xl'>

            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>

                {/* Left Section */}
                <div className='flex items-center gap-6'>
                    <div className="relative">
                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                            <Timer className="text-green-600" size={28} />
                        </div>
                        <div className="absolute -top-2 -right-2">
                            <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                                {sessionToDisplay ? sessionToDisplay.durationInMinutes : 0} mins
                            </span>
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                            <p className='text-amber-500 font-medium'>
                                {sessionToDisplay ? sessionToDisplay.status === "ONGOING" ? "Ongoing" : "Last Session Ended" : "No Upcoming Class"}
                            </p>
                        </div>

                        <h2 className='font-bold text-xl text-gray-800'>
                            {sessionToDisplay ? sessionToDisplay.topic : "No Class Scheduled"}
                        </h2>

                        <div className='flex flex-wrap gap-4 text-sm text-gray-600'>
                            <div className='flex items-center gap-1'>
                                <Clock size={16} />
                                <span>
                                    {sessionToDisplay
                                        ? `${new Date(sessionToDisplay.startTime).toLocaleString([], {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })} - ${new Date(sessionToDisplay.endTime).toLocaleString([], {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}`
                                        : "No Class Scheduled"}
                                </span>

                            </div>
                            <div className='flex items-center gap-1'>
                                <Calendar size={16} />
                                <span>{sessionToDisplay ? new Date(sessionToDisplay.startTime).toLocaleDateString() : "No Class Scheduled"}</span>
                            </div>
                            {/* <div className='flex items-center gap-1'>
                                <User size={16} />
                                <span>{}</span>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className='flex flex-col items-end gap-4'>
                    <button className='bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:from-green-700 hover:to-green-800 transition-all hover:shadow-lg flex items-center gap-2'>
                        <span>Join Session</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </button>

                    <div className='text-right'>
                        <p className='text-gray-500 text-sm'>Instructor</p>
                        <p className='font-medium text-gray-800'>{sessionToDisplay ? `${sessionToDisplay.creatorFirstName} ${sessionToDisplay.creatorLastName}` : "Unknown"}</p>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default CurrentClass