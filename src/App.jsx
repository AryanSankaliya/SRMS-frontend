import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

// Layout
import MainLayout from "./pages/MainLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

// Roles
import User from "./pages/roles/User";
import Hod from "./pages/roles/Hod";
import Tech from "./pages/roles/Tech";

// Admin
import ServiceDepartmentMaster from "./pages/admin/ServiceDepartmentMaster";
import ServiceTypeMaster from "./pages/admin/ServiceTypeMaster";
import StatusMaster from "./pages/admin/StatusMaster";
import ServiceDepartmentPersonMaster from "./pages/admin/ServiceDepartmentPersonMaster";
import ServiceRequestTypeMaster from "./pages/admin/ServiceRequestTypeMaster";
import ServiceRequestTypeWisePerson from "./pages/admin/ServiceRequestTypeWisePerson";

// Components
import AddRequestForm from "./components/AddRequestForm";
import EditRequestForm from "./components/EditRequestForm";
import Notfound from "./pages/Notfound";
import Requestlist from "./components/Requestlist";
import DashboardRedirect from "./pages/DashboardRedirect";
import AssignToTech from "./components/AssignToTech";
import MasterPages from "./pages/MasterPages";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth (NO sidebar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Layout Routes (WITH sidebar/header/footer) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />

          {/* Roles */}
          <Route path="/dashboard" element={<DashboardRedirect />} />
          <Route path="/technician/dashboard" element={<Dashboard />} />

          {/* Sidebar */}

          {/* hod */}
          <Route path="/hod/dashboard" element={<Dashboard />} />
          <Route path="/hod/assign" element={<AssignToTech role="hod" />} />
          <Route path="/hod/requestlist" element={<Requestlist />} />
          <Route path="/hod/masterPages" element={<MasterPages />} />



          {/* user */}
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/request/add" element={<AddRequestForm />} />
          <Route path="/user/requestlist" element={<AssignToTech role="user" />} />

          {/* technician */}
          <Route path="/technician/dashboard" element={<Dashboard />} />
          <Route path="/technician/requests" element={<AssignToTech role="technician" />} />


          {/* Admin */}
          <Route path="/hod/masterPages/*" element={<MasterPages />}>
            <Route index element={<ServiceDepartmentMaster />} /> {/* default tab */}
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
          <Route path="requestlist" element={<Requestlist />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Notfound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
