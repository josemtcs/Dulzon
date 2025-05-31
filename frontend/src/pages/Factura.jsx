import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../assets/css/Factura.css'; 

function Factura() {
  const location = useLocation();
  const { compra, detalles: initialDetalles } = location.state || {};
  const [detalles, setDetalles] = useState(initialDetalles || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFactura = async () => {
      try {
        if (compra) {
          const response = await axios.get(`http://localhost:4000/api/detallecompra/${compra.id}`);
          setDetalles(response.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFactura();
  }, [compra]);

  const calcularTotal = () =>
    detalles.reduce((acc, item) => acc + item.cantidad * item.precioUnitario, 0).toFixed(2);

  if (loading) return <div className="text-center mt-5 fs-4">🧾 Cargando factura...</div>;
  if (error) return <div className="text-center mt-5 text-danger">Error al cargar la factura: {error.message}</div>;

  return (
    <div className="factura-container">
      <div className="factura-box">
        <h2 className="text-center">🍬 Factura de Compra 🍬</h2>

        <div className="factura-info text-center">
          <p><strong>ID Compra:</strong> {compra?.id}</p>
          <p><strong>Fecha:</strong> {new Date(compra?.fecha).toLocaleString()}</p>
        </div>

        <div className="table-responsive mt-4">
          <table className="table table-bordered text-center align-middle">
            <thead className="table-pink">
              <tr>
                <th>🍭 Producto</th>
                <th>📦 Cantidad</th>
                <th>💵 Precio Unitario</th>
                <th>💰 Total</th>
              </tr>
            </thead>
            <tbody>
              {detalles.map((item) => (
                <tr key={item.id}>
                  <td>{item.Dulce?.nombre || 'Nombre no disponible'}</td>
                  <td>{item.cantidad}</td>
                  <td>${item.precioUnitario.toFixed(2)}</td>
                  <td>${(item.cantidad * item.precioUnitario).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-end mt-4 fs-5 fw-bold">
          Total a pagar: <span className="text-success">💵 ${calcularTotal()}</span>
        </div>
      </div>
    </div>
  );
}

export default Factura;