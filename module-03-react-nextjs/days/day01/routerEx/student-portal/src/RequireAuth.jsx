import { Navigate, useLocation } from "react-router-dom";
function RequireAuth({ user, children }) {
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return (
    <>
      <h2>{user.name}</h2>
      {children}
    </>
  );
}

export default RequireAuth;
