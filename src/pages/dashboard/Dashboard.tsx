
import Header from './header'
import CurrentClass from './CurrentClass'
import Introduction from './Introduction'

import Sessions from './Sessions'
import QuickActions from './QuickActions'
import RecentResources from './RecentsResources'
const Dashboard = () => {
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
