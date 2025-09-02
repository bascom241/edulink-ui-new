
import RecentSessions from './RecentSessions'
import TodaySession from './TodaySession'
const Sessions = () => {
    return (
        <div className='flex w-full gap-3 mt-10 '>
            <TodaySession />
            <RecentSessions />
        </div>
    )
}

export default Sessions
