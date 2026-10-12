import React from 'react';
import { Link } from 'react-router-dom';
import { useProductos } from '../context/ProductosContext';
import ProductoCard from '../components/ProductoCard';
import EnlaceAdmin from '../components/EnlaceAdmin';

export default function IndexPage() {
  const { productos } = useProductos();

  // Filtrar productos destacados o etiquetados en oferta
  const ofertasDestacadas = productos.filter(p => p.esOferta || p.destacado).slice(0, 8);

  return (
    <div className="home-page">
      {/* Banner Principal / Hero */}
      <section className="hero-banner">
        <div className="container hero-content">
          <div className="hero-text">
            <h2>Siente el Ritmo, Vive la Música</h2>
            <p>Descubre nuestra selección de guitarras, baterías, teclados y audio profesional con los mejores precios de Chile.</p>
            <div className="hero-actions">
              <Link to="/productos" className="btn btn-primary">Ver Catálogo</Link>
              <EnlaceAdmin className="btn-hero-admin" />
            </div>
          </div>
          <div className="hero-image">
            <img src="/src/assets/hero.png" alt="Instrumentos Sonido Vivo" />
          </div>
        </div>
      </section>

      {/* Sección de Productos en Oferta */}
      <section className="container section-destacados">
        <div className="section-header">
          <h2>¡OFERTAS DESTACADAS!</h2>
          <p>Aprovecha los mejores descuentos en instrumentos de alta calidad</p>
        </div>

        <div className="productos-grid">
          {ofertasDestacadas.map(producto => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>

        <div className="text-center margin-top-lg">
          <Link to="/productos" className="btn btn-secondary">Ver todos los productos ({productos.length})</Link>
        </div>
      </section>

      {/* Categorías Rápidas */}
      <section className="categories-section">
        <div className="container">
          <h2>Explora por Categoría</h2>
          <div className="categories-grid">
            <Link to="/productos?categoria=guitarras" className="category-card">
              <h3>Guitarras y Bajos</h3>
            </Link>
            <Link to="/productos?categoria=baterias" className="category-card">
              <h3>Baterías y Percusión</h3>
            </Link>
            <Link to="/productos?categoria=teclados" className="category-card">
              <h3>Teclados y Pianos</h3>
            </Link>
            <Link to="/productos?categoria=audio" className="category-card">
              <h3>Audio y Micrófonos</h3>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}