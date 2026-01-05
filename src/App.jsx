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
          <Route path="user" element={<User />} />
          <Route path="hod" element={<Hod />} />
          <Route path="tech" element={<Tech />} />

          {/* Admin */}
          <Route path="admin/service-department" element={<ServiceDepartmentMaster />} />
          <Route path="admin/service-type" element={<ServiceTypeMaster />} />
          <Route path="admin/status-master" element={<StatusMaster />} />
          <Route path="admin/service-department-person" element={<ServiceDepartmentPersonMaster />} />
          <Route path="admin/service-request-type" element={<ServiceRequestTypeMaster />} />
          <Route path="admin/service-request-type-wise-person" element={<ServiceRequestTypeWisePerson />} />

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
