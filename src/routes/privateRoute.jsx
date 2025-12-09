import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { LoaderOverlay } from "../common/loader/LoderOverley";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoaderOverlay />;
  }

  if (user && user?.admin_status == "active" && user?.admin_phone) {
    return children;
  }

  return <Navigate to="/sign-in" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
