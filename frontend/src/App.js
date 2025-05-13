import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App(){
  const [Productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));    
}, []);
  return (
    <div className="App">
      <h1>Lista de Productos</h1>
      <ul>
        {Productos.map(producto => (
          <li key={producto.id}>
            {producto.nombre} - ${producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;

