import React from 'react';
import { Navigate } from 'react-router-dom';

const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
};

function AdminRoute({ children }) {
  const user = getUserFromToken();

  if (!user || user.rol !== 1) {
    return <Navigate to="/home" />;
  }

  return children;
}

export default AdminRoute;