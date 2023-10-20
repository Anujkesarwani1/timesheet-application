import './style.css'
import EmployeeDashboard from 'components/organisms/EmployeeDashboard'
import ManagerDashboard from 'components/organisms/ManagerDashboard'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from 'components/organisms/AdminDashboard'
import AuthComponent from 'components/organisms/AuthComponent'
import TimesheetForm from 'components/organisms/TimesheetForm'
import NewEmployeeForm from 'components/organisms/NewEmployeeForm'
import NewManagerForm from 'components/organisms/NewManager'
import SignUp from 'components/organisms/SignUp'

export const App = () => {
  return (
    <Routes>
      <Route path="/employee" element={<EmployeeDashboard />} />
      <Route path="/timesheet" element={<TimesheetForm />} />
      <Route path="/manager" element={<ManagerDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/" element={<AuthComponent />} />
      <Route path="/new-employee" element={<NewEmployeeForm />} />
      <Route path="/new-manager" element={<NewManagerForm />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}
