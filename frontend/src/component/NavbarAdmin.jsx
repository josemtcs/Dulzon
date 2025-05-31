import React from "react";
import { Link } from "react-router-dom";

function NavbarAdmin() {
  const token = localStorage.getItem('token');
  const handleLogout = () => {
  sessionStorage.removeItem('token');
  window.location.href = "/login"; // Fuerza redirección al login
};

return (
  <nav className="navbar navbar-expand-lg dulzon-navbar shadow dulzon-rounded">
    <div className="container-fluid">
      <Link className="navbar-brand text-white fw-bold" to="/admin">
        🍭 Admin Dulzón
      </Link>
      <button
        className="navbar-toggler bg-light"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {!token && (
            <li className="nav-item">
              <Link className="nav-link text-white" to="/login">Iniciar sesión</Link>
            </li>
          )}
          {token && (
            <>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/inventario">📦 Inventario</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/gestiondulce">🍬 Gestión de dulces</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link text-white" onClick={handleLogout}>
                  🚪 Cerrar sesión
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  </nav>
);
}

export default NavbarAdmin;