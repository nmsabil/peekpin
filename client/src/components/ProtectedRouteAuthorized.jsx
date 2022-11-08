import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRouteAuthorized = ({ children }) => {
  const { state } = useLocation();
  const { auth } = state || {};
  if (!auth || state === null || auth === null) {
    return <Navigate to='/' />;
  }
  return children;
};

export default ProtectedRouteAuthorized;
