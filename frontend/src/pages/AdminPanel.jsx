import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/AdminPanel.css'; // Asegúrate de crear este archivo

function AdminPanel() {
  const navigate = useNavigate();

  return (
    <div className="admin-panel-container">
      <div className="admin-panel-box">
        <h2 className="text-center">🍭 Panel de Administración</h2>
        <p className="text-center mb-4">Bienvenido, Admin. Selecciona una opción para comenzar:</p>

        <div className="admin-buttons">
          <button className="btn btn-admin" onClick={() => navigate('/gestiondulce')}>
            🍬 Gestionar Dulces
          </button>
          <button className="btn btn-admin" onClick={() => navigate('/inventario')}>
            📦 Inventario
          </button>
          <button className="btn btn-admin" onClick={() => navigate('/admin/compras')}>
            🧾 Historial de Compras
          </button>
          <button className="btn btn-admin" onClick={() => navigate('/admin/usuarios')}>
            👤 Usuarios
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;