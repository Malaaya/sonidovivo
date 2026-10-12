import { useCarrito } from '../context/CarritoContext'
import { clp } from '../utils/formato'

export default function ProductoCard({ producto, oferta = false }) {
  const { agregarAlCarrito } = useCarrito()
  const precioOriginal = Math.round(producto.precio * 1.15)

  return (
    <article className="shelf-product-card">
      {oferta && <span className="badge-offer">¡OFERTA!</span>}

      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="shelf-product-img"
        loading="lazy"
      />

      <div
        className="shelf-product-body"
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
          {producto.codigo} | {producto.categoria || 'Audio & Cuerdas'}
        </span>

        <h3
          className="shelf-product-title"
          style={{ fontWeight: 700, color: '#000000', margin: '0.3rem 0' }}
        >
          {producto.nombre}
        </h3>

        <span
          style={{
            fontSize: '0.85rem',
            color: '#e91e63',
            fontWeight: 600,
            marginBottom: '0.4rem',
          }}
        >
          {producto.marca} {producto.modelo || ''}
        </span>

        <p
          style={{
            fontSize: '0.85rem',
            color: '#475569',
            lineHeight: 1.4,
            marginBottom: '0.8rem',
            flexGrow: 1,
          }}
        >
          {producto.descripcion}
        </p>

        <div style={{ marginBottom: '0.8rem' }}>
          {oferta && (
            <p
              className="shelf-product-old-price"
              style={{
                margin: 0,
                textDecoration: 'line-through',
                color: '#94a3b8',
                fontSize: '0.85rem',
              }}
            >
              {clp(precioOriginal)}
            </p>
          )}
          <p
            className="shelf-product-price"
            style={{ color: '#0b0f19', fontWeight: 800, fontSize: '1.25rem', margin: 0 }}
          >
            {clp(producto.precio)}
          </p>
        </div>

        <div
          style={{
            marginTop: 'auto',
            paddingTop: '0.6rem',
            borderTop: '1px solid #f1f5f9',
          }}
        >
          <button
            type="button"
            className="btn-slide-cta"
            style={{
              width: '100%',
              padding: '0.6rem',
              fontSize: '0.9rem',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'center',
              background: '#ffc107',
              color: '#000',
              fontWeight: 'bold',
              borderRadius: '6px',
            }}
            onClick={() => agregarAlCarrito(producto.codigo)}
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </article>
  )
}
