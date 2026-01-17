import { Navigate } from "react-router-dom";

const DashboardRedirect = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.isLoggedIn) {
    return <Navigate to="/login"  />;
  }

  switch (user.role) {
    case "Hod":
      return <Navigate to="/hod/dashboard"  />;
    case "User":
      return <Navigate to="/user/dashboard"  />;
    case "Technician":
      return <Navigate to="/technician/dashboard"  />;
    default:
      return <Navigate to="/login" relace />;
  }
};

export default DashboardRedirect;
