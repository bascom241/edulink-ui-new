
import Header from '../../pages/dashboard/student/header'
import CurrentClass from '../../pages/dashboard/student/CurrentClass'
import Introduction from '../../pages/dashboard/student/Introduction'

import Sessions from '../../pages/dashboard/student/Sessions'
import QuickActions from '../../pages/dashboard/student/QuickActions'

import RecentResources from '../../pages/dashboard/student/RecentsResources'
import { useEffect } from 'react'
import { useSessionStore } from "../../store/useSessionStore"
import { useAuthStore } from "../../store/useAuthStore"
const StudentDashboard = () => {

      const {  getCurrentSession } = useSessionStore()
    const { user } = useAuthStore();
    useEffect(() => {
        if (user?.email) {
            getCurrentSession(user.email);
        }
    }, [user?.email, getCurrentSession]);
  return (
      <main className=''>
      <Header />
      <Introduction />
      <CurrentClass />

      <Sessions/>
      <QuickActions/>
      <RecentResources/>
  

    </main >
  )
}

export default StudentDashboard
