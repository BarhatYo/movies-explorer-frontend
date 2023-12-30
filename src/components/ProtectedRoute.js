import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element: children, ...props }) {
  return props.isLoggedIn ? (
    children
  ) : (
    <Navigate to="/signin" replace />
  );
}