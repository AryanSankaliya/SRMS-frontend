import { Navigate } from "react-router-dom";

const DashboardRedirect = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case "Hod":
      return <Navigate to="/hod/dashboard" replace />;
    case "User":
      return <Navigate to="/user/dashboard" replace />;
    case "Technician":
      return <Navigate to="/technician/dashboard" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default DashboardRedirect;
