
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/GestionDulces.css'

const API_BASE = 'http://localhost:4000/api';

const GestionDulces = () => {
  const [dulces, setDulces] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: '', descripcion: '', categoriaId: '' });
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  // Función para obtener el token y headers
  const getAuthHeaders = () => {
    const token = sessionStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  };

  const obtenerDulces = async () => {
    try {
      const res = await axios.get(`${API_BASE}/dulces`);
      setDulces(res.data);
    } catch (error) {
      console.error('Error al obtener dulces:', error);
    }
  };

  const crearDulce = async () => {
    try {
      console.log('Datos a enviar:', form);
      console.log('Token:', sessionStorage.getItem('token'));
      
      const res = await axios.post(`${API_BASE}/dulces`, form, getAuthHeaders());
      
      // Crear entrada en inventario
      await axios.post(`${API_BASE}/inventario`, {
        dulceId: res.data.id,
        cantidad: 0
      }, getAuthHeaders());

      obtenerDulces();
      setForm({ nombre: '', precio: '', descripcion: '', categoriaId: '' });
      mostrarToast('Dulce creado correctamente.');
    } catch (error) {
      console.error('Error al crear dulce:', error);
      console.error('Respuesta del servidor:', error.response?.data);
    }
  };

  const actualizarDulce = async () => {
    try {
      await axios.put(`${API_BASE}/dulces/${editandoId}`, form, getAuthHeaders());
      obtenerDulces();
      setForm({ nombre: '', precio: '', descripcion: '', categoriaId: '' });
      setEditandoId(null);
      mostrarToast('Dulce actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar dulce:', error);
    }
  };

  const eliminarDulce = async (id) => {
    try {
      // Eliminar dulce (esto también debería eliminar las referencias en inventario si tienes CASCADE)
      await axios.delete(`${API_BASE}/dulces/${id}`, getAuthHeaders());
      obtenerDulces();
      mostrarToast('Dulce eliminado correctamente.');      
    } catch (error) {
      console.error('Error al eliminar dulce:', error);
    }
  };

  const cargarDulceEnFormulario = (dulce) => {
    setForm({ 
      nombre: dulce.nombre, 
      precio: dulce.precio, 
      descripcion: dulce.descripcion,
      categoriaId: dulce.categoriaId || ''
    });
    setEditandoId(dulce.id);
  };

  useEffect(() => {
    obtenerDulces();
  }, []);



  const mostrarToast = (texto, tipo = 'success') => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 3000);

   

// Después de actualizar
   

// Después de eliminar
    
};

return (
  <div className="gestion-dulces-container">
    <div className="gestion-dulces-box">
      {mensaje && (
        <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
          <div className={`toast align-items-center text-white bg-${mensaje.tipo} border-0 show`} role="alert">
            <div className="d-flex">
              <div className="toast-body">
                {mensaje.texto}
              </div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setMensaje(null)}></button>
            </div>
          </div>
        </div>
      )}

      <h2>Gestión de Dulces</h2>

      <div className="row">
        {/* Formulario */}
        <div className="col-md-6 mb-4">
          <div className="card gestion-card shadow-sm border-0">
            <div className="card-header gestion-header-formulario text-white text-center">
              <h4 className="mb-0">{editandoId ? 'Actualizar Dulce' : 'Crear Dulce'}</h4>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-12">
                  <input
                    className="form-control"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={e => setForm({ ...form, nombre: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <input
                    className="form-control"
                    placeholder="Precio"
                    type="number"
                    value={form.precio}
                    onChange={e => setForm({ ...form, precio: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <input
                    className="form-control"
                    placeholder="Descripción"
                    value={form.descripcion}
                    onChange={e => setForm({ ...form, descripcion: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <select
                    className="form-select"
                    value={form.categoriaId}
                    onChange={e => setForm({ ...form, categoriaId: e.target.value })}
                  >
                    <option value="">Selecciona una categoría</option>
                    <option value="1">Dulce</option>
                    <option value="2">Salado</option>
                  </select>
                </div>
              </div>

              <div className="text-end mt-4">
                {editandoId ? (
                  <button className="btn btn-success" onClick={actualizarDulce}>Actualizar Dulce</button>
                ) : (
                  <button className="btn btn-primary" onClick={crearDulce}>Crear Dulce</button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Dulces */}
        <div className="col-md-6">
          <div className="card gestion-card shadow-sm border-0">
            <div className="card-header gestion-header-listado text-white text-center">
              <h5 className="mb-0">Lista de Dulces</h5>
            </div>
            <ul className="list-group list-group-flush">
              {dulces.map(d => (
                <li className="list-group-item d-flex justify-content-between align-items-start" key={d.id}>
                  <div>
                    <h6 className="fw-bold mb-1">{d.nombre} - ${d.precio}</h6>
                    <p className="mb-1">{d.descripcion}</p>
                    <span className="badge bg-secondary">{d.categoriaId === 1 ? 'Dulce' : 'Salado'}</span>
                  </div>
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-primary" onClick={() => cargarDulceEnFormulario(d)}>Editar</button>
                    <button className="btn btn-outline-danger" onClick={() => eliminarDulce(d.id)}>Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default GestionDulces;