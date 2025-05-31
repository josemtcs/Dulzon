import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/Inventario.css'; // Asegúrate de tener este archivo CSS

const API_BASE = 'http://localhost:4000/api';

const Inventario = () => {
  const [inventario, setInventario] = useState([]);

  const getAuthHeaders = () => {
    const token = sessionStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const obtenerInventario = async () => {
    try {
      const res = await axios.get(`${API_BASE}/inventario`, getAuthHeaders());
      setInventario(res.data);
    } catch (error) {
      console.error('Error al obtener inventario:', error);
    }
  };

  const actualizarCantidad = async (dulceId, nuevaCantidad) => {
    try {
      await axios.put(`${API_BASE}/inventario/${dulceId}`, {
        cantidad: nuevaCantidad
      }, getAuthHeaders());
      obtenerInventario(); // Refresca la lista
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
    }
  };

  const manejarCambioCantidad = (e, inventarioId) => {
    const nuevaCantidad = parseInt(e.target.value, 10);
    setInventario(inventario.map(item =>
      item.id === inventarioId
        ? { ...item, cantidad: nuevaCantidad }
        : item
    ));
  };

  const guardarCambio = (dulceId, cantidad) => {
    actualizarCantidad(dulceId, cantidad);
  };

  useEffect(() => {
    obtenerInventario();
  }, []);

return (
  <div className="inventario-container">
    <div className="inventario-box">
      <h2 className="text-center mb-4">🍬 Inventario de Dulces</h2>

      <div className="row">
        {/* Sección para actualizar cantidad */}
        <div className="col-md-6 mb-4">
          <div className="card inventario-card border-0 shadow-sm">
            <div className="card-header text-white text-center inventario-header-actualizar">
              <h5>Actualizar Cantidad</h5>
            </div>
            <div className="card-body">
              {inventario.map(item => (
                <div key={item.id} className="mb-3">
                  <label className="form-label fw-bold">{item.Dulce?.nombre}</label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      value={item.cantidad || 0}
                      onChange={(e) => manejarCambioCantidad(e, item.id)}
                    />
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => guardarCambio(item.dulceId, item.cantidad)}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sección para ver lista de inventario */}
        <div className="col-md-6">
          <div className="card inventario-card border-0 shadow-sm">
            <div className="card-header text-white text-center inventario-header-lista">
              <h5>Lista de Inventario</h5>
            </div>
            <div className="card-body table-responsive">
              <table className="table table-bordered table-hover text-center">
                <thead className="table-light">
                  <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Descripción</th>
                    <th>Cantidad</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {inventario.map(item => (
                    <tr key={item.id}>
                      <td>{item.Dulce?.nombre}</td>
                      <td>${item.Dulce?.precio}</td>
                      <td>{item.Dulce?.descripcion}</td>
                      <td>{item.cantidad}</td>
                      <td>
                        <span className={`badge ${item.cantidad > 0 ? 'bg-success' : 'bg-danger'}`}>
                          {item.cantidad > 0 ? 'Disponible' : 'Agotado'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
export default Inventario;