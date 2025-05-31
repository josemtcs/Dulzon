import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import '../assets/css/Login.css'; 
import api from '../api/api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMensaje('');

        try {
            const response = await axios.post('http://localhost:4000/api/login', {
                email,
                password
            });

            const token = response.data.token;
            sessionStorage.setItem('token', response.data.token);

            const decoded = jwtDecode(token);
            console.log('Token decodificado:', decoded);
            const rol = decoded.rol;

            setMensaje('Login exitoso. Redirigiendo...');

            // Redirigir según el rol
                  if (rol === 1) {
                    navigate('/admin');
                } else if (parseInt(rol) === 2) {
                    navigate('/home');
                }   
        } catch (err) {
            console.error('Error en el login:', err);
            setError('Credenciales incorrectas');
        } finally {
            setLoading(false);
        }
    };

return (
  <div className="login-container">
    <div className="login-box">
      <h2 className="text-center mb-4">🍭 Inicia Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            placeholder="ejemplo@correo.com"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            placeholder="********"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-light d-flex justify-content-center align-items-center gap-2"
        >
          <i className="bi bi-box-arrow-in-right"></i>
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>

        {mensaje && <p className="success">{mensaje}</p>}
      </form>
    </div>
  </div>
);
}

export default Login;