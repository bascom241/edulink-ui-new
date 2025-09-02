
import { Outlet } from 'react-router-dom'

import SideBar from './SideBar'
const Layout = () => {
    return (
        <div className='flex '>
            <SideBar />
            <main className='flex-1 p-4 w-full bg-[#ededed]'>
              
                <div className='h-[90%] '>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default Layout
