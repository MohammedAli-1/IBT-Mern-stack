import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth({ isAuthenticated }) {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
