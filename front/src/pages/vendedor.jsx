import { useEffect, useState } from 'react'
import { HeaderVendedor } from '../components/Header'
import { listarProductos, obtenerProducto } from '../services/productosService'
import { listarBoletas, obtenerBoleta } from '../services/boletasService'
import { clp } from '../utils/formato'

function mensajeDeError(error) {
  return error instanceof Error ? error.message : 'No se pudo completar la solicitud.'
}

function fechaLegible(fecha) {
  return new Date(fecha).toLocaleString('es-CL')
}

export default function Vendedor() {
  const [productos, setProductos] = useState([])
  const [boletas, setBoletas] = useState([])
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [boletaSeleccionada, setBoletaSeleccionada] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [cargandoDetalle, setCargandoDetalle] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let activo = true

    Promise.all([listarProductos(), listarBoletas()])
      .then(([productosApi, boletasApi]) => {
        if (!activo) return
        setProductos(productosApi)
        setBoletas(boletasApi)
      })
      .catch((errorCarga) => {
        if (activo) setError(mensajeDeError(errorCarga))
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
    }
  }, [])

  const verProducto = async (id) => {
    setError('')
    setBoletaSeleccionada(null)
    setProductoSeleccionado(null)
    setCargandoDetalle(true)
    try {
      setProductoSeleccionado(await obtenerProducto(id))
    } catch (errorCarga) {
      setError(mensajeDeError(errorCarga))
    } finally {
      setCargandoDetalle(false)
    }
  }

  const verBoleta = async (id) => {
    setError('')
    setProductoSeleccionado(null)
    setBoletaSeleccionada(null)
    setCargandoDetalle(true)
    try {
      setBoletaSeleccionada(await obtenerBoleta(id))
    } catch (errorCarga) {
      setError(mensajeDeError(errorCarga))
    } finally {
      setCargandoDetalle(false)
    }
  }

  return (
    <>
      <HeaderVendedor />
      <main className="admin-container">
        <h1 className="h2 fw-bold mb-4">Panel de Vendedor</h1>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {cargando && <p role="status">Cargando productos y boletas...</p>}
        {cargandoDetalle && <p role="status">Cargando detalle...</p>}

        <div className="row g-4">
          <section className="col-12">
            <h2 className="h4 fw-bold">Productos</h2>
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Stock</th>
                    <th>Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {!cargando && productos.length === 0 ? (
                    <tr><td colSpan={5}>No hay productos disponibles.</td></tr>
                  ) : productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.codigo}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.categoriaNombre}</td>
                      <td>{producto.stock}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => verProducto(producto.id)}
                        >
                          Ver detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="col-12">
            <h2 className="h4 fw-bold">Boletas</h2>
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead>
                  <tr>
                    <th>Número</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {!cargando && boletas.length === 0 ? (
                    <tr><td colSpan={5}>No hay boletas disponibles.</td></tr>
                  ) : boletas.map((boleta) => (
                    <tr key={boleta.id}>
                      <td>{boleta.numero}</td>
                      <td>{boleta.usuarioNombre}</td>
                      <td>{fechaLegible(boleta.fecha)}</td>
                      <td>{clp(boleta.total)}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => verBoleta(boleta.id)}
                        >
                          Ver detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {productoSeleccionado && (
          <section className="card mt-4" aria-labelledby="detalle-producto">
            <div className="card-body">
              <h2 id="detalle-producto" className="h4">Detalle de producto</h2>
              <p><strong>Código:</strong> {productoSeleccionado.codigo}</p>
              <p><strong>Nombre:</strong> {productoSeleccionado.nombre}</p>
              <p><strong>Marca:</strong> {productoSeleccionado.marca}</p>
              <p><strong>Modelo:</strong> {productoSeleccionado.modelo || 'Sin modelo'}</p>
              <p><strong>Categoría:</strong> {productoSeleccionado.categoriaNombre}</p>
              <p><strong>Descripción:</strong> {productoSeleccionado.descripcion || 'Sin descripción'}</p>
              <p><strong>Precio:</strong> {clp(productoSeleccionado.precio)}</p>
              <p><strong>Stock:</strong> {productoSeleccionado.stock}</p>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setProductoSeleccionado(null)}
              >
                Cerrar detalle
              </button>
            </div>
          </section>
        )}

        {boletaSeleccionada && (
          <section className="card mt-4" aria-labelledby="detalle-boleta">
            <div className="card-body">
              <h2 id="detalle-boleta" className="h4">Detalle de boleta #{boletaSeleccionada.numero}</h2>
              <p><strong>Cliente:</strong> {boletaSeleccionada.usuarioNombre}</p>
              <p><strong>Fecha:</strong> {fechaLegible(boletaSeleccionada.fecha)}</p>
              <ul>
                {boletaSeleccionada.items.map((item) => (
                  <li key={item.id}>
                    {item.cantidad} × {item.productoNombre} — {clp(item.subtotal)}
                  </li>
                ))}
              </ul>
              <p><strong>Total:</strong> {clp(boletaSeleccionada.total)}</p>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setBoletaSeleccionada(null)}
              >
                Cerrar detalle
              </button>
            </div>
          </section>
        )}
      </main>
    </>
  )
}
