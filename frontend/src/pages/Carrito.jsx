import React from 'react';
import { useCart } from '../component/CartComponent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Carrito.css';

function Carrito() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const handleRemoverDelCarrito = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const handleComprar = async () => {
    try {
      const data = {
        rolId: 2, 
        items: state.map(item => ({
          dulceId: item.id,
          cantidad: item.cantidad,
          precioUnitario: item.precio
        }))
      };

      const response = await axios.post('http://localhost:4000/api/compras', data);

      dispatch({ type: 'CLEAR_CART' });

      navigate('/factura', {
        state: {
          compra: response.data.compra,
          detalles: response.data.detalles
        }
      });

    } catch (error) {
      console.error('Error al realizar la compra:', error);
      alert(error.response?.data?.message || 'Error al realizar la compra. Intenta nuevamente.');
    }
  };

  return (
    <div className="container py-5 carrito-container">
      <div className="carrito-box p-4 rounded-4 shadow-lg">
        <h2 className="text-center mb-5 text-gradient">🛒 Carrito de Compras</h2>

        {state.length === 0 ? (
          <p className="text-center fs-5 text-muted">Tu carrito está vacío.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-primary text-center">
                <tr>
                  <th>Dulce</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Total</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {state.map(item => (
                  <tr key={item.id}>
                    <td className="fw-semibold text-center">{item.nombre}</td>
                    <td className="text-center">{item.cantidad}</td>
                    <td className="text-center">${item.precio}</td>
                    <td className="text-center">${(item.precio * item.cantidad).toFixed(2)}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleRemoverDelCarrito(item.id)}
                      >
                        ❌ Quitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-end mt-4">
              <h5 className="fw-bold">
                Total: $
                {state.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2)}
              </h5>
              <button className="btn btn-success btn-lg mt-3" onClick={handleComprar}>
                ✅ Realizar Compra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carrito;