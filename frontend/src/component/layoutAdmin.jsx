import React from 'react';
import Navbar from './NavbarAdmin';
import '../assets/css/Layout.css'; 

const LayoutAdmin = ({ children }) => {
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



export default LayoutAdmin;