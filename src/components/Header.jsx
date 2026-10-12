import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCarrito } from '../context/CarritoContext';

export default function Header() {
  const { usuario, esAdmin, cerrarSesion } = useAuth();
  const { cantidadTotal } = useCarrito();
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const handleBuscar = (e) => {
    e.preventDefault();
    if (busqueda.trim()) {
      navigate(`/productos?q=${encodeURIComponent(busqueda.trim())}`);
    } else {
      navigate('/productos');
    }
  };

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="container header-top-content">
          <Link to="/" className="logo">
            <h1>Sonido<span>Vivo</span></h1>
          </Link>

          {/* Buscador */}
          <form className="search-form" onSubmit={handleBuscar}>
            <input 
              type="text" 
              placeholder="Buscar guitarras, baterías, micrófonos..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button type="submit" aria-label="Buscar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>

          {/* Menú Usuario & Carrito */}
          <div className="header-actions">
            {usuario ? (
              <div className="user-menu">
                <span className="user-greeting">Hola, <strong>{usuario.nombre || 'Cliente'}</strong></span>
                <div className="user-links">
                  <Link to="/perfil" className="btn-link">Mi Perfil</Link>
                  {esAdmin && (
                    <Link to="/admin" className="btn-admin-link">
                      Admin
                    </Link>
                  )}
                  <button onClick={cerrarSesion} className="btn-logout">Salir</button>
                </div>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="btn-secondary-sm">Ingresar</Link>
                <Link to="/registro" className="btn-primary-sm">Registrarse</Link>
              </div>
            )}

            {/* Carrito Icono */}
            <Link to="/carrito" className="cart-button" aria-label="Ver Carrito">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cantidadTotal > 0 && (
                <span className="cart-badge">{cantidadTotal}</span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Navegación por Categorías/Secciones */}
      <nav className="site-nav">
        <div className="container nav-content">
          <ul className="nav-list">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Catálogo Completo</Link></li>
            <li><Link to="/productos?categoria=guitarras">Guitarras</Link></li>
            <li><Link to="/productos?categoria=baterias">Baterías</Link></li>
            <li><Link to="/productos?categoria=audio">Audio & Microfonos</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}