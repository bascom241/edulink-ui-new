import Header from "../../pages/dashboard/teacher/Header"

import CurrentSession from "../../pages/dashboard/teacher/CurrentSession"
import Card from "../../pages/dashboard/teacher/Card"
import QuickActions from "../../pages/dashboard/teacher/QuickActions"
const TeacherDashboard = () => {
  return (
  <main className=''>
    <Header />
    {/* <Introduction/> */}
    <Card />
    <CurrentSession />
    <QuickActions />
  </main>
)

}

export default TeacherDashboard
