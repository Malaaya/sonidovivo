import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { obtenerHistorial } from '../utils/historial'
import { clp } from '../utils/formato'

export default function Perfil() {
  const { sesion, logout } = useAuth()
  const navigate = useNavigate()
  const [historial] = useState(() => obtenerHistorial(sesion.run))

  const cerrarSesion = () => {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      logout()
      navigate('/')
    }
  }

  return (
    <main className="profile-container">
      <section className="profile-card">
        <h2>Mi Información</h2>

        <div className="info-group">
          <label>Nombre Completo</label>
          <span>{sesion.nombre || 'No especificado'}</span>
        </div>

        <div className="info-group">
          <label>RUN / Identificación</label>
          <span>{sesion.run || 'No especificado'}</span>
        </div>

        <div className="info-group">
          <label>Correo Electrónico</label>
          <span>{sesion.email || 'No especificado'}</span>
        </div>

        <div className="info-group">
          <label>Teléfono</label>
          <span>{sesion.telefono || 'No especificado'}</span>
        </div>

        <button className="btn-logout" onClick={cerrarSesion}>
          Cerrar Sesión
        </button>
      </section>

      <section className="profile-card">
        <h2>Historial de Compras</h2>

        {historial.length === 0 ? (
          <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem 0' }}>
            Aún no has realizado ninguna compra en Sonido Vivo.
            <br />
            <br />
            <Link
              to="/productos"
              style={{
                color: 'var(--accent-pink)',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              ¡Explora nuestro catálogo!
            </Link>
          </p>
        ) : (
          historial.map((orden) => (
            <div className="order-card" key={orden.id}>
              <div className="order-header">
                <span className="order-id">Orden #{orden.id}</span>
                <span className="order-date">
                  📅 {orden.fecha} - {orden.hora}
                </span>
              </div>
              <ul className="order-items">
                {orden.items.map((item) => (
                  <li key={item.codigo}>
                    <span>
                      {item.cantidad}x {item.nombre}
                    </span>
                    <strong>{clp(item.precio * item.cantidad)}</strong>
                  </li>
                ))}
              </ul>
              <div className="order-total">Total: {clp(orden.total)}</div>
            </div>
          ))
        )}
      </section>
    </main>
  )
}