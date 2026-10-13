import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'
import { registrarCompra } from '../utils/historial'
import { clp } from '../utils/formato'
import Modal from '../components/Modal'

export default function Carrito() {
  const { sesion } = useAuth()
  const { carrito, total, cambiarCantidad, eliminarDelCarrito, vaciarCarrito } = useCarrito()
  const navigate = useNavigate()
  const [ordenExitosa, setOrdenExitosa] = useState(null)

  const confirmarVaciar = () => {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) vaciarCarrito()
  }

  const procesarPago = () => {
    if (!sesion) {
      alert('Debes iniciar sesión para realizar una compra.')
      navigate('/login')
      return
    }

    if (carrito.length === 0) {
      alert('Tu carrito está vacío.')
      return
    }

    const orden = registrarCompra(sesion.run, carrito)
    vaciarCarrito()
    setOrdenExitosa(orden)
  }

  return (
    <main className="container my-4">
      <h2 className="h1 fw-bold mb-4">Tu Carrito de Compras</h2>

      <div className="row g-4 align-items-start">
        <section className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead>
                    <tr className="small text-secondary">
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                      <th className="text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center text-secondary py-5">
                          Tu carrito está vacío.
                          <br />
                          <Link to="/productos" className="fw-bold">
                            Explorar el catálogo
                          </Link>
                        </td>
                      </tr>
                    ) : (
                      carrito.map((item) => (
                        <tr key={item.codigo}>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <img
                                src={item.imagen}
                                alt={item.nombre}
                                width="50"
                                height="50"
                                className="rounded object-fit-cover"
                              />
                              <div>
                                <strong className="d-block small">{item.nombre}</strong>
                                <span className="small fw-semibold" style={{ color: '#e91e63' }}>
                                  {item.marca}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="fw-semibold">{clp(item.precio)}</td>
                          <td>
                            <div className="btn-group btn-group-sm" role="group" aria-label="Cantidad">
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => cambiarCantidad(item.codigo, -1)}
                              >
                                -
                              </button>
                              <span className="btn btn-light disabled fw-bold">{item.cantidad}</span>
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => cambiarCantidad(item.codigo, 1)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="fw-bold">{clp(item.precio * item.cantidad)}</td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              title="Eliminar"
                              onClick={() => eliminarDelCarrito(item.codigo)}
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="text-end mt-3">
                <button type="button" className="btn btn-outline-danger" onClick={confirmarVaciar}>
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="col-12 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="h5 fw-bold border-bottom pb-2 mb-3">Resumen del Pedido</h3>

              <div className="d-flex justify-content-between mb-2 text-secondary">
                <span>Subtotal:</span>
                <strong className="text-dark">{clp(total)}</strong>
              </div>

              <div className="d-flex justify-content-between mb-3 text-secondary">
                <span>Envío:</span>
                <span className="text-success fw-semibold">Calculado en el checkout</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fs-5 mb-4">
                <strong>Total:</strong>
                <strong>{clp(total)}</strong>
              </div>

              <button type="button" className="btn btn-warning w-100 fw-bold py-2" onClick={procesarPago}>
                Pagar con Webpay
              </button>
            </div>
          </div>
        </section>
      </div>

      {ordenExitosa && (
        <Modal
          emoji="🎉"
          titulo="¡Pago Aprobado!"
          botones={[
            { texto: 'Ver en Mi Historial de Compras', onClick: () => navigate('/perfil') },
          ]}
        >
          Transacción Webpay Plus exitosa. Tu orden <strong>#{ordenExitosa.id}</strong> por un total de{' '}
          <strong>{clp(ordenExitosa.total)}</strong> fue procesada correctamente.
        </Modal>
      )}
    </main>
  )
}
