import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/Dulces.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../component/CartComponent'; 
import Swal from 'sweetalert2';

function Dulces() {
  const [dulces, setDulces] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [inventario, setInventario] = useState({});
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const rolId = 2; 

  const obtenerDulces = async (filtro = '') => {
    try {
      const response = await axios.get('http://localhost:4000/api/dulces', {
        params: { nombre: filtro }
      });
      setDulces(response.data);
    } catch (error) {
      console.error('Error al obtener los dulces:', error);
    }
  };

  const obtenerInventario = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/inventario');
      const inventarioData = response.data.reduce((acc, item) => {
        acc[item.dulceId] = item.cantidad;
        return acc;
      }, {});
      setInventario(inventarioData);
    } catch (error) {
      console.error('Error al obtener el inventario:', error);
    }
  };

  useEffect(() => {
    obtenerDulces();
    obtenerInventario();
  }, []);

  const handleBuscar = (e) => {
    e.preventDefault();
    obtenerDulces(busqueda);
  };

  const handleAgregarAlCarrito = (dulce, cantidad) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...dulce, cantidad } });
    Swal.fire({
      title: '¡Agregado!',
      text: `${dulce.nombre} se añadió al carrito.`,
      icon: 'success',
      confirmButtonColor: '#198754',
      confirmButtonText: 'Aceptar',
      timer: 2000,
      timerProgressBar: true
    });
  };

return (
<div className="dulces-container container py-5">
  <div className="dulces-box p-4 rounded-4 shadow-lg bg-light">
    <h2 className="text-center mb-5 fw-bold text-gradient">🍭 Catálogo de Dulces 🍬</h2>

    <form className="input-group mb-4 justify-content-center" onSubmit={handleBuscar}>
      <input
        type="text"
        className="form-control w-50 rounded-start"
        placeholder="Buscar dulce por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button className="btn btn-primary px-4 rounded-end" type="submit">Buscar</button>
    </form>

    <div className="catalogo-container">
      {dulces.length > 0 ? (
        dulces.map(dulce => (
          <div key={dulce.id} className="card-dulce">
            <h3>{dulce.nombre}</h3>
            <p>💵 Precio: ${dulce.precio}</p>
            <p>📦 En inventario: {inventario[dulce.id] || 0}</p>
            <input
              type="number"
              min="1"
              max={inventario[dulce.id] || 1}
              defaultValue="1"
              id={`cantidad-${dulce.id}`}
            />
            <button
              onClick={() => {
                const cantidad = parseInt(document.getElementById(`cantidad-${dulce.id}`).value);
                if (cantidad > 0 && cantidad <= (inventario[dulce.id] || 0)) {
                  handleAgregarAlCarrito(dulce, cantidad);
                } else {
                  alert('Cantidad inválida o insuficiente en inventario.');
                }
              }}
            >
              🛒 Agregar al Carrito
            </button>
          </div>
        ))
      ) : (
        <p className="text-center">No se encontraron dulces.</p>
      )}
    </div>
  </div>
</div>
);
}

export default Dulces;