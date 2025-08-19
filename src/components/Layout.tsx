import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardNavBar from './dashoard/DasboardNavBar'
import SideBar from './SideBar'
const Layout = () => {
    return (
        <div className='flex '>
            <SideBar />
            <main className='flex-1 p-4 w-full bg-gray-300'>
                <div className='h-[10%] mb-4'>
                    <DashboardNavBar />
                </div>
                <div className='h-[90%] '>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default Layout
