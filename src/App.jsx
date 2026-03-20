import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfirmProvider } from "./components/ui/ConfirmProvider";

/* Auth */
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

/* Layout */
import MainLayout from "./pages/MainLayout";

/* Pages */
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import DashboardRedirect from "./pages/DashboardRedirect";
import Notfound from "./pages/Notfound";
import ProtectedRoute from "./components/ProtectedRoute";
import MasterPages from "./pages/MasterPages";
import RequestDetails from "./pages/RequestDetails"

/* Admin */
import ServiceDepartmentMaster from "./pages/admin/ServiceDepartmentMaster";
import ServiceTypeMaster from "./pages/admin/ServiceTypeMaster";
import StatusMaster from "./pages/admin/StatusMaster";
import ServiceDepartmentPersonMaster from "./pages/admin/ServiceDepartmentPersonMaster";
import ServiceRequestTypeMaster from "./pages/admin/ServiceRequestTypeMaster";
import ServiceRequestTypeWisePerson from "./pages/admin/ServiceRequestTypeWisePerson";
import TechnicianManagement from "./pages/admin/TechnicianManagement";

/* Components */
import AddRequestForm from "./components/AddRequestForm";
import EditRequestForm from "./components/EditRequestForm";
import Requestlist from "./components/Requestlist";
import AssignToTech from "./components/AssignToTech";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <ConfirmProvider>
        <Toaster 
          position="top-center" 
          reverseOrder={false} 
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937',
              color: '#f9fafb',
              padding: '16px 24px',
              borderRadius: '12px',
              fontWeight: '500',
              fontSize: '14px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
          }}
        />
        <Routes>

          {/*  Open → Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/*  Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/*  Layout (NO auth for now) */}
        {/*  Layout (NO auth for now) */}
        <Route element={<MainLayout />}>
          <Route index element={<DashboardRedirect />} />
          <Route path="profile" element={<Profile />} />

          {/* User */}
          <Route element={<ProtectedRoute allowedRoles={["User"]} />}>
            <Route path="user/dashboard" element={<Dashboard />} />
            <Route path="user/request/add" element={<AddRequestForm />} />
            <Route path="user/requestlist" element={<Requestlist />} />
          </Route>

          {/* HOD */}
          <Route element={<ProtectedRoute allowedRoles={["Hod"]} />}>
            <Route path="hod/dashboard" element={<Dashboard />} />
            <Route path="hod/assign" element={<AssignToTech role="hod" />} />
            <Route path="hod/requestlist" element={<Requestlist />} />
            <Route path="hod/technician-management" element={<TechnicianManagement />} />

            {/* Admin / Master Pages (HOD Only for now) */}
            <Route path="hod/masterPages" element={<MasterPages />}>
              <Route index element={<ServiceDepartmentMaster />} />
              <Route path="service-department" element={<ServiceDepartmentMaster />} />
              <Route path="technician-management" element={<TechnicianManagement />} />
              <Route path="service-request-type" element={<ServiceRequestTypeMaster />} />
              <Route path="service-type" element={<ServiceTypeMaster />} />
              <Route path="status-master" element={<StatusMaster />} />
            </Route>
          </Route>

          {/* Technician */}
          <Route element={<ProtectedRoute allowedRoles={["Technician"]} />}>
            <Route path="technician/dashboard" element={<Dashboard />} />
            <Route path="technician/requests" element={<AssignToTech role="technician" />} />
          </Route>

          {/* Forms */}
          <Route path="request/add" element={<AddRequestForm />} />
          <Route path="request/edit" element={<EditRequestForm />} />
          <Route path="/request-details/:id" element={<RequestDetails />} />
        </Route>

        {/*  404 */}
        <Route path="*" element={<Notfound />} />

        </Routes>
      </ConfirmProvider>
    </BrowserRouter>
  );
}

export default App;
