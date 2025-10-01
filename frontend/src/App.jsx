import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import AddEmployee from './components/AddEmployee';
import EditUser from './components/EditUser';
import EditEmployee from './components/EditEmployee';
import ModernDashboard from './components/ModernDashboard';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import AdminDashboard from './components/AdminDashboard';
import CompaniesList from './components/CompaniesList';
import AddCompany from './components/AddCompany';
import UsersList from './components/UsersList';
import AddUser from './components/AddUser';
import EmployeesList from './components/EmployeesList';
import EmployeeDetails from './components/EmployeeDetails';
import SalaryPayment from './components/SalaryPayment';

const Dashboard = () => {
  return <RoleBasedDashboard />;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const RoleBasedDashboard = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (user.role === 'super-admin') {
    return <SuperAdminDashboard />;
  } else if (user.role === 'admin') {
    return <AdminDashboard />;
  } else {
    return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/companies"
            element={
              <ProtectedRoute>
                <CompaniesList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-company"
            element={
              <ProtectedRoute>
                <AddCompany />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-user"
            element={
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-user/:userId"
            element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-employee"
            element={
              <ProtectedRoute>
                <AddEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-employee/:companyId"
            element={
              <ProtectedRoute>
                <AddEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-employee/:employeeId"
            element={
              <ProtectedRoute>
                <EditEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <EmployeesList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee-details/:employeeId"
            element={
              <ProtectedRoute>
                <EmployeeDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/salary-payment"
            element={
              <ProtectedRoute>
                <SalaryPayment />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
