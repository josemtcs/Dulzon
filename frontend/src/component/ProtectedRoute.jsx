import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const rol = decoded.rol;

    // Si esta ruta es solo para admin, pero el rol no es 1 => redirige a /home
    if (adminOnly && rol !== 1) {
      return <Navigate to="/home" replace />;
    }

    return children;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;