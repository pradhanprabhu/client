import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Protects admin routes by checking if the user is authenticated and an admin
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    // Clear any existing error messages when accessing protected routes
    if (!userInfo || !userInfo.isAdmin) {
      localStorage.removeItem('error');
    }
  }, [userInfo]);

  if (!userInfo || !userInfo.isAdmin) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; // If the user is an admin, render the protected route
};

export default ProtectedRoute;