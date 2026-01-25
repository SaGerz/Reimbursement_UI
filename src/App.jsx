import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login/login'
import Unauthorized from './pages/Unauthorized'
import ProtectedRoute from './auth/ProtectedRoute'
import RoleRoute from './auth/RoleRoute'
import EmployeeLayout from './layouts/EmployeeLayout'
import FinanceLayout from './layouts/FinanceLayout'
import Rootredirect from './routes/Rootredirect'

function App() {
  return (
    <Routes>
      {/* Root */}
      <Route path='/' element={<Rootredirect />} />

      {/* Public */}
      <Route path='/login' element={ <Login /> } />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Employee */}
      <Route
        path='/employee/dashboard'
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="Employee" >
              <EmployeeLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      
      {/* Finance */}
      <Route
        path='/finance/dashboard'
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="Finance" >
              <FinanceLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* default */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
