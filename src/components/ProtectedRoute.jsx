import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

/**
 * ProtectedRoute - Restricts access to authenticated users.
 * @param {object} props
 * @param {JSX.Element} props.children
 * @returns {JSX.Element}
 */
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
