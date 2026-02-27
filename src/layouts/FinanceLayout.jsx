import React from 'react'
import { Outlet } from 'react-router-dom'

function FinanceLayout() {
  return (
     <div className='p-6' >
        <main>
            <Outlet />
        </main> 
    </div>
  )
}

export default FinanceLayout