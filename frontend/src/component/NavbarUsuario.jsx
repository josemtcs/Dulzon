import React from "react";
import { Link } from "react-router-dom";

function NavbarUsuario() {
  const token = sessionStorage.getItem('token');
  const handleLogout = () => {
  sessionStorage.removeItem('token');
  window.location.href = "/login"; // Fuerza redirección al login
};

   return (
    <nav className="navbar navbar-expand-lg dulzon-navbar shadow dulzon-rounded">
      <div className="container-fluid">
        <Link className="navbar-brand text-white fw-bold" to="/">
          🧁 Dulzón
        </Link>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavUsuario"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavUsuario">
          <ul className="navbar-nav ms-auto">
            {!token && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">
                  🔐 Iniciar sesión
                </Link>
              </li>
            )}
            {token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dulces">
                    🍬 Comprar dulces
                  </Link>
                </li>

                 <li className="nav-item">
                  <Link className="nav-link text-white" to="/carrito">
                   🛒 Carrito
                  </Link>
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

export default NavbarUsuario;