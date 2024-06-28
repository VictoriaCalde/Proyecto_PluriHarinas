import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await axios.post('http://localhost:4000/verifyAdminToken', { token });
        setIsAuthenticated(response.data.valid);
      } catch (error) {
        console.error('Error al verificar el token:', error);
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return <div>Cargando...</div>; // O un componente de carga
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/loginadmi" />;
};

export default ProtectedRoute;

