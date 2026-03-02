import React from 'react'
import { Outlet } from 'react-router-dom'
import FinanceSidebar from '../components/sidebar/FinanceSidebar'

function FinanceLayout() {
  return (
     <div className='flex min-h-screen' >
        <aside className='w-64 bg-gray-800 text-white p-4' >
          <FinanceSidebar /> 
        </aside>

        <main className=''>
            <Outlet />
        </main> 
    </div>
  )
}

export default FinanceLayout