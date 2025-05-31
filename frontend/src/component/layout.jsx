import React from 'react';
import Navbar from './NavbarUsuario';
import '../assets/css/Layout.css'; // Assuming you have some CSS for layout

const Layout = ({ children }) => {
  return (
    <>
    <div className="layout-wrapper">
      <Navbar />
      <main className="container" style={{ padding: '2rem' }}>
        {children}
      </main>
      </div>
    </>
  );
};



export default Layout;