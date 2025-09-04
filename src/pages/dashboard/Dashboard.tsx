
import Header from './header'
import CurrentClass from './CurrentClass'
import Introduction from './Introduction'

import Sessions from './Sessions'
import QuickActions from './QuickActions'
import RecentResources from './RecentsResources'
import { useEffect } from 'react'
import { useSessionStore } from "../../store/useSessionStore"
import { useAuthStore } from "../../store/useAuthStore"
const Dashboard = () => {

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

export default Dashboard
