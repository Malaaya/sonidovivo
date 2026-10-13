import { useAuth } from '../context/AuthContext'
import { useProductos } from '../context/ProductosContext'
import { obtenerHistorial } from '../utils/historial'
import { HeaderAdmin } from '../components/Header'
import AdminProductos from '../components/AdminProductos'

export default function Admin() {
  const { usuarios } = useAuth()
  const { productos } = useProductos()
  const ventas = usuarios.reduce((acc, u) => acc + obtenerHistorial(u.run).length, 0)

  return (
    <>
      <HeaderAdmin />
      <main className="admin-container">
        <h2 className="h2 fw-bold mb-3">
          Panel de Control y Operaciones
        </h2>

        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="stat-pill h-100">
              <span>Productos en Catálogo</span>
              <strong>{productos.length}</strong>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="stat-pill h-100">
              <span>Clientes Registrados</span>
              <strong>{usuarios.length}</strong>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="stat-pill h-100">
              <span>Total Ventas Realizadas</span>
              <strong>{ventas}</strong>
            </div>
          </div>
        </div>

        <AdminProductos />
      </main>
    </>
  )
}
