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
import FinanceDashboard from './pages/finance/FinanceDashboard'
import PaymentQueue from './pages/finance/PaymentQueue'
import ReportsFinance from './pages/finance/ReportsFinance'
import ManagerLayout from './layouts/ManagerLayout'
import ManagerDashboard from './pages/manager/ManagerDashboard'
import PendingReiburstment from './pages/manager/PendingReiburstment'
import { ApprovalHistory } from './pages/manager/ApprovalHistory'

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
      >
        <Route path="dashboard" element={<FinanceDashboard />} />
        <Route path="payment-queue" element={<PaymentQueue />} />
        <Route path="reports" element={<ReportsFinance />} />
      </Route>

      {/* Manager */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="Manager">
              <ManagerLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<ManagerDashboard />} />
        <Route path="reimburstment" element={<PendingReiburstment />} />
        <Route path="approval-history" element={<ApprovalHistory />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
