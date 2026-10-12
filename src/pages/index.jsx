import { Link } from 'react-router-dom'
import { useProductos } from '../context/ProductosContext'
import ProductoCard from '../components/ProductoCard'

const MARCAS = ['YAMAHA', 'FENDER', 'MARSHALL', 'ROLAND', 'BOSS', 'SHURE']

export default function Index() {
  const { productos } = useProductos()
  const destacados = productos.slice(0, 4)

  return (
    <main>
      <section
        className="hero-static-banner"
        style={{
          minHeight: '200px',
          padding: '1.2rem 3rem',
          display: 'flex',
          alignItems: 'center',
          background:
            "linear-gradient(90deg, rgba(11,15,25,0.92) 0%, rgba(11,15,25,0.65) 55%, rgba(233,30,99,0.3) 100%), url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1400&auto=format&fit=crop&q=80') center/cover no-repeat",
        }}
      >
        <div className="hero-static-content">
          <h1
            className="hero-static-title"
            style={{ color: '#ffffff', fontSize: '2.8rem', marginBottom: '1rem' }}
          >
            ¡Equípate con el Mejor Tono!
          </h1>
          <p
            className="hero-static-desc"
            style={{ color: '#e2e8f0', fontSize: '1.2rem', marginBottom: '1.5rem' }}
          >
            Guitarras, bajos, amplificadores y accesorios seleccionados con garantía directa.
          </p>
          <div className="hero-static-actions">
            <Link to="/productos" className="btn-slide-cta">
              Explorar Catálogo
            </Link>
          </div>
        </div>
      </section>

      <section className="shop-section-container">
        <div className="shop-header-intro">
          <h2>Productos Destacados</h2>
          <p>Nuestra selección de instrumentos más pedidos con disponibilidad inmediata</p>
        </div>
        <div className="shop-layout">
          <div className="products-shelf-grid">
            {destacados.map((producto) => (
              <ProductoCard key={producto.codigo} producto={producto} oferta />
            ))}
          </div>
        </div>
      </section>

      <section className="brands-section">
        <div className="brands-header">
          <h3>Nuestras Marcas Oficiales</h3>
          <p>Marcas líderes con garantía directa de fábrica</p>
        </div>
        <div className="brands-showcase">
          {MARCAS.map((marca) => (
            <span key={marca} className="brand-name-tag">
              {marca}
            </span>
          ))}
        </div>
      </section>
    </main>
  )
}
