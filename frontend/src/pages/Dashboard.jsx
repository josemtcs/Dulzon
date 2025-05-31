import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


function Dashboard() {
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            
        } else {
            try{

 const decoded = jwtDecode(token); // Decodifica el token
        setUsuario(decoded); // Guarda los datos del usuario
      } catch (error) {
        console.error('Token inválido');
        localStorage.removeItem('token');
        navigate('/');
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (!usuario) return <p>Cargando...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Bienvenido, {usuario.id ? `Usuario ID ${usuario.id}` : 'Usuario'}</h2>
      <p>Rol: {usuario.rol}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default Dashboard;