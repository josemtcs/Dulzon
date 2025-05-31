import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import Dulces from "./pages/Dulces";
import ProtectedRoute from "./component/ProtectedRoute";
import Login from "./pages/login";
import Layout from './component/layout';
import LayoutAdmin from './component/layoutAdmin';
import AdminPage from "./pages/AdminPanel";
import AdminRoute from "./component/AdminRoute";
import GestionDulces from "./pages/GestionDulces";
import Inventario from "./pages/Inventario";
import Factura from './pages/Factura';
import Carrito from './pages/Carrito';
import { CartProvider } from './component/CartComponent'


function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <CartProvider> {/* Envuelve todas las rutas con CartProvider */}
        <Routes>
          <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
          <Route path="/login" element={<Login />} />

          <Route path="/home" element={
            <ProtectedRoute>
              <Layout>
                <HomePage />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/dulces" element={
            <ProtectedRoute>
              <Layout>
                <Dulces />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/carrito" element={
            <ProtectedRoute>
              <Layout>
                <Carrito />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/factura" element={
            <ProtectedRoute>
              <Layout>
                <Factura />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/gestiondulce" element={
            <ProtectedRoute adminOnly={true}>
              <LayoutAdmin>
                <GestionDulces />
              </LayoutAdmin>
            </ProtectedRoute>
          } />
          <Route path="/inventario" element={
            <ProtectedRoute adminOnly={true}>
              <LayoutAdmin>
                <Inventario />
              </LayoutAdmin>
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly={true}>
              <LayoutAdmin>
                <AdminPage />
              </LayoutAdmin>
            </ProtectedRoute>
          } />
        </Routes>
      </CartProvider> {/* Cierra CartProvider aquí */}
    </BrowserRouter>
  );
}

export default App;