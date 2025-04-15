import React from 'react';
import { Navigate } from 'react-router-dom';

// Protects admin routes by checking if the user is authenticated and an admin
const ProtectedRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (!userInfo || !userInfo.isAdmin) {
    // If user is not an admin or not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  return children; // If the user is an admin, render the protected route
};

export default ProtectedRoute;