import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'
import { primerNombre } from '../utils/formato'
import EnlaceAdmin from './EnlaceAdmin'

const CATEGORIAS = [
  { slug: 'guitarras', nombre: 'Guitarras' },
  { slug: 'bajos', nombre: 'Bajos Eléctricos' },
  { slug: 'amplis', nombre: 'Amplificadores' },
  { slug: 'pedales', nombre: 'Pedales de Efectos' },
  { slug: 'baterias', nombre: 'Baterías & Percusión' },
  { slug: 'teclados', nombre: 'Teclados y Pianos' },
]

function BotonAuth() {
  const { sesion } = useAuth()
  const { pathname } = useLocation()

  if (sesion?.nombre) {
    const nombre = primerNombre(sesion.nombre)
    return sesion.rol === 'admin' ? (
      <Link to="/admin" className="btn-auth-pill">
        Admin: {nombre}
      </Link>
    ) : (
      <Link to="/perfil" className="btn-auth-pill">
        👋 Hola, {nombre}
      </Link>
    )
  }

  return pathname === '/login' ? (
    <Link to="/registro" className="btn-auth-pill">
      Crear Cuenta
    </Link>
  ) : (
    <Link to="/login" className="btn-auth-pill">
      Acceder / Registro
    </Link>
  )
}

export default function Header({ variante = 'completo' }) {
  const [busqueda, setBusqueda] = useState('')
  const { totalItems } = useCarrito()
  const navigate = useNavigate()
  const location = useLocation()

  const buscar = () => {
    const query = busqueda.trim()
    if (query.length > 0) navigate(`/productos?buscar=${encodeURIComponent(query)}`)
  }

  if (variante === 'simple') {
    return (
      <header className="site-header">
        <div
          className="top-bar"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          <div className="brand-logo">
            <Link to="/">
              SONIDO <span>VIVO</span>
            </Link>
          </div>

          <div
            className="user-center"
            style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
          >
            <BotonAuth />
          </div>

          <div className="user-actions">
            <Link to="/productos" className="btn-catalog-link">
              ← Volver al Catálogo
            </Link>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="site-header">
      <div className="top-bar">
        <div className="brand-logo">
          <Link to="/">
            SONIDO <span>VIVO</span>
          </Link>
        </div>

        <div className="header-search-bar">
          <input
            type="text"
            placeholder="Buscar en catálogo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && buscar()}
          />
          <button type="button" onClick={buscar}>
            Buscar
          </button>
        </div>

        <div className="user-actions">
          <BotonAuth />
          <Link to="/carrito" className="cart-icon-btn" title="Ver Carrito">
            🛒
            <span className="cart-badge-count">{totalItems}</span>
          </Link>
        </div>
      </div>

      <nav className="sub-nav-bar" aria-label="Navegación principal">
        <div className="sub-nav-container">
          <details className="hamburger-menu" key={location.key}>
            <summary className="hamburger-btn">
              <span>☰</span> Categorías
            </summary>
            <ul className="hamburger-dropdown">
              <li>
                <Link to="/productos">Todos los productos</Link>
              </li>
              {CATEGORIAS.map(({ slug, nombre }) => (
                <li key={slug}>
                  <Link to={`/productos?cat=${slug}`}>{nombre}</Link>
                </li>
              ))}
            </ul>
          </details>

          <ul className="main-nav-links">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/productos">Ver Catálogo</Link>
            </li>
            <li>
              <Link to="/nosotros">Sobre Nosotros</Link>
            </li>
            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
            <li>
              <EnlaceAdmin>Portal Admin</EnlaceAdmin>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export function HeaderAdmin() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const cerrarSesion = () => {
    if (confirm('¿Estás seguro de que deseas cerrar la sesión de administrador?')) {
      logout()
      navigate('/')
    }
  }

  return (
    <header className="site-header">
      <div
        className="top-bar"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div className="brand-logo">
          <Link to="/">
            SONIDO <span>VIVO</span> (PANEL ADMIN)
          </Link>
        </div>
        <div
          className="user-actions"
          style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
        >
          <Link to="/productos" className="btn-catalog-link">
            ← Ver Tienda
          </Link>
          <button
            onClick={cerrarSesion}
            style={{
              backgroundColor: '#ef4444',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  )
}
