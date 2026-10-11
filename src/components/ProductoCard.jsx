import React from 'react';
import { useCarrito } from '../context/CarritoContext';
import { formatearCLP } from '../utils/formato';

export default function ProductoCard({ producto }) {
  const { agregarAlCarrito } = useCarrito();

  const {
    id,
    nombre,
    marca,
    modelo,
    precio,
    imagen,
    stock,
    esOferta,
    descripcion
  } = producto;

  const handleAgregar = () => {
    if (stock > 0) {
      agregarAlCarrito(producto, 1);
    }
  };

  return (
    <div className="card-producto" data-id={id}>
      {esOferta && <span className="badge-oferta">¡OFERTA!</span>}
      <div className="card-img-container">
        <img 
          src={imagen || '/assets/hero.png'} 
          alt={nombre} 
          loading="lazy" 
        />
      </div>
      <div className="card-body">
        <span className="card-marca">{marca}</span>
        <h3 className="card-titulo">{nombre}</h3>
        {modelo && <p className="card-modelo">Modelo: {modelo}</p>}
        {descripcion && <p className="card-descripcion">{descripcion}</p>}
        
        <div className="card-footer-info">
          <p className="card-precio">{formatearCLP(precio)}</p>
          <span className={`card-stock ${stock > 0 ? 'con-stock' : 'sin-stock'}`}>
            {stock > 0 ? `Stock: ${stock}` : 'Agotado'}
          </span>
        </div>

        <button 
          className="btn btn-primary btn-block btn-agregar"
          onClick={handleAgregar}
          disabled={stock <= 0}
        >
          {stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
        </button>
      </div>
    </div>
  );
}