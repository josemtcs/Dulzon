import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/HomePage.css'; 

const HomePage = () => {
  const [score, setScore] = useState(0);
  const [dulcePos, setDulcePos] = useState({ top: '50%', left: '50%' });

  
  const moverDulce = () => {
    const top = Math.floor(Math.random() * 80) + 10;
    const left = Math.floor(Math.random() * 80) + 10;
    setDulcePos({ top: `${top}%`, left: `${left}%` });
  };

 
  const atraparDulce = () => {
    setScore(score + 1);
    moverDulce();
  };

  
  useEffect(() => {
    const intervalo = setInterval(moverDulce, 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="home-container d-flex flex-column align-items-center justify-content-center position-relative">
      <div className="home-box text-center p-5">
        <h1 className="mb-4 fw-bold">🍬 ¡Bienvenido a Dulces Delicias! 🍭</h1>
        <p className="lead mb-4">
          Descubre un mundo lleno de sabor y diversión. <br />
          Compra tus dulces favoritos o juega con nosotros.
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link to="/dulces" className="btn btn-lg btn-primary rounded-pill shadow">
            Ver Catálogo
          </Link>
          <Link to="/carrito" className="btn btn-lg btn-outline-secondary rounded-pill shadow">
            Ir al Carrito
          </Link>
        </div>
      </div>

      <div className="game-container position-relative mt-5">
        <h3 className="text-center fw-semibold text-dark mb-3">🎮 Mini Juego: Atrapa el Dulce</h3>
        <p className="text-center">Puntaje: <strong>{score}</strong></p>

        <img
          src="https://www.gifsanimados.org/data/media/468/pastel-y-postre-imagen-animada-0014.gif" 
          alt="Dulce"
          className="dulce-icon"
          onClick={atraparDulce}
          style={{ top: dulcePos.top, left: dulcePos.left }}
        />
      </div>
    </div>
  );
};

export default HomePage;