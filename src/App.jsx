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
import CreateReimbursement from './pages/employee/CreateReimburstment'
import EmployeeDashboard from './pages/employee/EmployeeDashboard'
import ReimbursementList from './pages/employee/ReimburstmentList'
import ReimburstmentListDetail from './pages/employee/ReimburstmentListDetail'

function App() {
  return (
    <Routes>
      {/* Root */}
      <Route path="/" element={<Rootredirect />} />

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Employee */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="Employee">
              <EmployeeLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        {/* 🔥 NESTED DI SINI */}
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="reimburstment" element={<ReimbursementList />} />
        <Route path="reimburstment/:id" element={<ReimburstmentListDetail />} />
        <Route path="reimburstment/new" element={<CreateReimbursement />} />
      </Route>

      {/* Finance */}
      <Route
        path="/finance"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="Finance">
              <FinanceLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
