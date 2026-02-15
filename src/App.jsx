import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
      <Toaster position="top-center" reverseOrder={false} />
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
          <Route path="user/dashboard" element={<Dashboard />} />
          <Route path="user/request/add" element={<AddRequestForm />} />
          <Route path="user/requestlist" element={<Requestlist />} />



          {/* HOD */}
          <Route path="hod/dashboard" element={<Dashboard />} />
          <Route path="hod/assign" element={<AssignToTech role="hod" />} />
          <Route path="hod/requestlist" element={<Requestlist />} />
          <Route path="hod/technician-management" element={<TechnicianManagement />} />

          {/* Technician */}
          <Route path="technician/dashboard" element={<Dashboard />} />
          <Route path="technician/requests" element={<AssignToTech role="technician" />} />

          {/* Admin */}
          <Route path="hod/masterPages" element={<MasterPages />}>
            <Route index element={<ServiceDepartmentMaster />} />
            <Route path="service-department" element={<ServiceDepartmentMaster />} />
            <Route path="service-department-person" element={<ServiceDepartmentPersonMaster />} />
            <Route path="service-request-type" element={<ServiceRequestTypeMaster />} />
            <Route path="service-request-type-wise-person" element={<ServiceRequestTypeWisePerson />} />
            <Route path="service-type" element={<ServiceTypeMaster />} />
            <Route path="status-master" element={<StatusMaster />} />
          </Route>

          {/* Forms */}
          <Route path="request/add" element={<AddRequestForm />} />
          <Route path="request/edit" element={<EditRequestForm />} />
          <Route path="/request-details/:id" element={<RequestDetails />} />
        </Route>

        {/*  404 */}
        <Route path="*" element={<Notfound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
