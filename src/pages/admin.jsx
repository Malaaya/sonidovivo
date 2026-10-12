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
        <h2 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '1rem' }}>
          Panel de Control y Operaciones
        </h2>

        <div className="stats-bar">
          <div className="stat-pill">
            <span>Productos en Catálogo</span>
            <strong>{productos.length}</strong>
          </div>
          <div className="stat-pill">
            <span>Clientes Registrados</span>
            <strong>{usuarios.length}</strong>
          </div>
          <div className="stat-pill">
            <span>Total Ventas Realizadas</span>
            <strong>{ventas}</strong>
          </div>
        </div>

        <AdminProductos />
      </main>
    </>
  )
}
