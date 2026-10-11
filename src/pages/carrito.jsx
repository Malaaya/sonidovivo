import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { clp } from '../utils/formato'

const tarjeta = {
  background: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  padding: '1.5rem',
}

const botonCantidad = { padding: '0.2rem 0.6rem', cursor: 'pointer' }

export default function Carrito() {
  const { carrito, total, cambiarCantidad, eliminarDelCarrito, vaciarCarrito } = useCarrito()

  const confirmarVaciar = () => {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) vaciarCarrito()
  }

  const procesarPago = () => {}

  return (
    <main style={{ maxWidth: '1100px', margin: '2.5rem auto', padding: '0 1rem' }}>
      <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '1.5rem' }}>
        Tu Carrito de Compras
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        <section style={{ ...tarjeta, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr
                style={{
                  borderBottom: '2px solid #f1f5f9',
                  color: '#475569',
                  fontSize: '0.85rem',
                }}
              >
                <th style={{ padding: '0.8rem' }}>Producto</th>
                <th style={{ padding: '0.8rem' }}>Precio</th>
                <th style={{ padding: '0.8rem' }}>Cantidad</th>
                <th style={{ padding: '0.8rem' }}>Subtotal</th>
                <th style={{ padding: '0.8rem', textAlign: 'center' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {carrito.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}
                  >
                    Tu carrito está vacío.
                    <br />
                    <br />
                    <Link to="/productos" style={{ color: '#0f172a', fontWeight: 'bold' }}>
                      Explorar el catálogo
                    </Link>
                  </td>
                </tr>
              ) : (
                carrito.map((item) => (
                  <tr key={item.codigo} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td
                      style={{
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                        }}
                      />
                      <div>
                        <strong
                          style={{ color: '#000000', display: 'block', fontSize: '0.95rem' }}
                        >
                          {item.nombre}
                        </strong>
                        <span style={{ color: '#e91e63', fontSize: '0.8rem', fontWeight: 600 }}>
                          {item.marca}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: '#000000', fontWeight: 600 }}>
                      {clp(item.precio)}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button
                          style={botonCantidad}
                          onClick={() => cambiarCantidad(item.codigo, -1)}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: 700, color: '#000000' }}>
                          {item.cantidad}
                        </span>
                        <button
                          style={botonCantidad}
                          onClick={() => cambiarCantidad(item.codigo, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: '#000000', fontWeight: 800 }}>
                      {clp(item.precio * item.cantidad)}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button
                        onClick={() => eliminarDelCarrito(item.codigo)}
                        title="Eliminar"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          fontSize: '1.2rem',
                        }}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
            <button
              onClick={confirmarVaciar}
              style={{
                background: 'none',
                border: '1px solid #ef4444',
                color: '#ef4444',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Vaciar Carrito
            </button>
          </div>
        </section>

        <section style={{ ...tarjeta, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3
            style={{
              fontSize: '1.25rem',
              color: '#0f172a',
              marginBottom: '1.2rem',
              borderBottom: '2px solid #f1f5f9',
              paddingBottom: '0.5rem',
            }}
          >
            Resumen del Pedido
          </h3>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.8rem',
              color: '#475569',
            }}
          >
            <span>Subtotal:</span>
            <strong style={{ color: '#000000' }}>{clp(total)}</strong>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1.2rem',
              color: '#475569',
            }}
          >
            <span>Envío:</span>
            <span style={{ color: '#10b981', fontWeight: 600 }}>Calculado en el checkout</span>
          </div>

          <hr style={{ border: 0, borderTop: '1px solid #e2e8f0', marginBottom: '1.2rem' }} />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              fontSize: '1.2rem',
            }}
          >
            <strong style={{ color: '#0f172a' }}>Total:</strong>
            <strong style={{ color: '#000000', fontSize: '1.3rem' }}>{clp(total)}</strong>
          </div>

          <button onClick={procesarPago} className="btn-primary-block">
            Pagar con Webpay
          </button>
        </section>
      </div>
    </main>
  )
}import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { clp } from '../utils/formato'

const tarjeta = {
  background: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  padding: '1.5rem',
}

const botonCantidad = { padding: '0.2rem 0.6rem', cursor: 'pointer' }

export default function Carrito() {
  const { carrito, total, cambiarCantidad, eliminarDelCarrito, vaciarCarrito } = useCarrito()

  const confirmarVaciar = () => {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) vaciarCarrito()
  }

  const procesarPago = () => {}

  return (
    <main style={{ maxWidth: '1100px', margin: '2.5rem auto', padding: '0 1rem' }}>
      <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '1.5rem' }}>
        Tu Carrito de Compras
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        <section style={{ ...tarjeta, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr
                style={{
                  borderBottom: '2px solid #f1f5f9',
                  color: '#475569',
                  fontSize: '0.85rem',
                }}
              >
                <th style={{ padding: '0.8rem' }}>Producto</th>
                <th style={{ padding: '0.8rem' }}>Precio</th>
                <th style={{ padding: '0.8rem' }}>Cantidad</th>
                <th style={{ padding: '0.8rem' }}>Subtotal</th>
                <th style={{ padding: '0.8rem', textAlign: 'center' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {carrito.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}
                  >
                    Tu carrito está vacío.
                    <br />
                    <br />
                    <Link to="/productos" style={{ color: '#0f172a', fontWeight: 'bold' }}>
                      Explorar el catálogo
                    </Link>
                  </td>
                </tr>
              ) : (
                carrito.map((item) => (
                  <tr key={item.codigo} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td
                      style={{
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                        }}
                      />
                      <div>
                        <strong
                          style={{ color: '#000000', display: 'block', fontSize: '0.95rem' }}
                        >
                          {item.nombre}
                        </strong>
                        <span style={{ color: '#e91e63', fontSize: '0.8rem', fontWeight: 600 }}>
                          {item.marca}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: '#000000', fontWeight: 600 }}>
                      {clp(item.precio)}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button
                          style={botonCantidad}
                          onClick={() => cambiarCantidad(item.codigo, -1)}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: 700, color: '#000000' }}>
                          {item.cantidad}
                        </span>
                        <button
                          style={botonCantidad}
                          onClick={() => cambiarCantidad(item.codigo, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: '#000000', fontWeight: 800 }}>
                      {clp(item.precio * item.cantidad)}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button
                        onClick={() => eliminarDelCarrito(item.codigo)}
                        title="Eliminar"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          fontSize: '1.2rem',
                        }}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
            <button
              onClick={confirmarVaciar}
              style={{
                background: 'none',
                border: '1px solid #ef4444',
                color: '#ef4444',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Vaciar Carrito
            </button>
          </div>
        </section>

        <section style={{ ...tarjeta, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3
            style={{
              fontSize: '1.25rem',
              color: '#0f172a',
              marginBottom: '1.2rem',
              borderBottom: '2px solid #f1f5f9',
              paddingBottom: '0.5rem',
            }}
          >
            Resumen del Pedido
          </h3>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.8rem',
              color: '#475569',
            }}
          >
            <span>Subtotal:</span>
            <strong style={{ color: '#000000' }}>{clp(total)}</strong>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1.2rem',
              color: '#475569',
            }}
          >
            <span>Envío:</span>
            <span style={{ color: '#10b981', fontWeight: 600 }}>Calculado en el checkout</span>
          </div>

          <hr style={{ border: 0, borderTop: '1px solid #e2e8f0', marginBottom: '1.2rem' }} />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              fontSize: '1.2rem',
            }}
          >
            <strong style={{ color: '#0f172a' }}>Total:</strong>
            <strong style={{ color: '#000000', fontSize: '1.3rem' }}>{clp(total)}</strong>
          </div>

          <button onClick={procesarPago} className="btn-primary-block">
            Pagar con Webpay
          </button>
        </section>
      </div>
    </main>
  )
}