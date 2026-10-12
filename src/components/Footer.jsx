import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-col">
          <h3>Sonido<span>Vivo</span></h3>
          <p>Tu tienda de instrumentos musicales, audio profesional y accesorios en Chile.</p>
        </div>

        <div className="footer-col">
          <h4>Navegación</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Catálogo</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Atención al Cliente</h4>
          <ul>
            <li><Link to="/contacto">Soporte y Consultas</Link></li>
            <li><Link to="/carrito">Ver Carrito de Compras</Link></li>
            <li><Link to="/perfil">Mi Cuenta</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contacto</h4>
          <p>Email: contacto@sonidovivo.cl</p>
          <p>Teléfono: +56 2 2345 6789</p>
          <p>Santiago, Chile</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Sonido Vivo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}