import React from 'react'
import { Outlet } from 'react-router-dom'
import ManagerSidebar from '../components/sidebar/ManagerSidebar'

function ManagerLayout() {
  return (
     <div className='flex min-h-screen' >
        <aside className="w-64 bg-gray-800 text-white p-6 border-r border-gray-700">          
          <ManagerSidebar /> 
        </aside>

        <main className="flex-1 p-6 bg-gray-100">
            <Outlet />
        </main> 
    </div>
  )
}

export default ManagerLayout