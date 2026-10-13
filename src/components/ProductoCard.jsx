import { useCarrito } from '../context/CarritoContext'
import { clp } from '../utils/formato'

export default function ProductoCard({ producto, oferta = false }) {
  const { agregarAlCarrito } = useCarrito()
  const precioOriginal = Math.round(producto.precio * 1.15)

  return (
    <article className="card h-100 shadow-sm position-relative">
      {oferta && (
        <span className="badge bg-danger position-absolute top-0 start-0 m-2">¡OFERTA!</span>
      )}

      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="card-img-top object-fit-cover"
        style={{ height: '200px' }}
        loading="lazy"
      />

      <div className="card-body d-flex flex-column">
        <small className="text-muted fw-semibold">
          {producto.codigo} | {producto.categoria || 'Audio & Cuerdas'}
        </small>

        <h3 className="card-title h6 fw-bold my-1">{producto.nombre}</h3>

        <small className="fw-semibold mb-2" style={{ color: '#e91e63' }}>
          {producto.marca} {producto.modelo || ''}
        </small>

        <p className="card-text small text-secondary flex-grow-1">{producto.descripcion}</p>

        <div className="mb-3">
          {oferta && (
            <p className="mb-0 text-decoration-line-through text-muted small">
              {clp(precioOriginal)}
            </p>
          )}
          <p className="mb-0 fs-5 fw-bold">{clp(producto.precio)}</p>
        </div>

        <button
          type="button"
          className="btn btn-warning w-100 fw-bold mt-auto"
          onClick={() => agregarAlCarrito(producto.codigo)}
        >
          Agregar al Carrito
        </button>
      </div>
    </article>
  )
}
