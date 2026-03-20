import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * ProtectedRoute Wrapper
 * Validates whether the currently logged-in user matches the `allowedRoles`.
 * Defaults to redirecting to "/login" if not authenticated, and "/404" if unauthorized.
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  // 1. If user is not logged in at all, kick to login
  if (!user || user.isLoggedIn !== true) {
    return <Navigate to="/login" replace />;
  }

  // 2. If user is logged in, but their role is NOT in the allowedRoles array...
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Kick them to 404
    return <Navigate to="/404" replace />;
  }

  // 3. Otherwise, they are allowed. Render the child routes.
  return <Outlet />;
};

export default ProtectedRoute;
