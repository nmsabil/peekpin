import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/Context";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();
  console.log(user);
  if (!user) {
    return <Navigate to='/' />;
  }
  return children;
};

export default ProtectedRoute;
