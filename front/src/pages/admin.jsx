import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useProductos } from '../context/ProductosContext'
import { listarBoletas } from '../services/boletasService'
import { HeaderAdmin } from '../components/Header'
import AdminProductos from '../components/AdminProductos'

export default function Admin() {
  const { usuarios, authError } = useAuth()
  const { productos, cargando: cargandoProductos } = useProductos()
  const [boletas, setBoletas] = useState([])
  const [cargandoBoletas, setCargandoBoletas] = useState(true)
  const [errorBoletas, setErrorBoletas] = useState('')

  useEffect(() => {
    let activo = true

    listarBoletas()
      .then((boletasApi) => {
        if (activo) setBoletas(boletasApi)
      })
      .catch((errorCarga) => {
        if (activo) {
          setErrorBoletas(
            errorCarga instanceof Error
              ? errorCarga.message
              : 'No se pudieron cargar las boletas.',
          )
        }
      })
      .finally(() => {
        if (activo) setCargandoBoletas(false)
      })

    return () => {
      activo = false
    }
  }, [])

  return (
    <>
      <HeaderAdmin />
      <main className="admin-container">
        <h2 className="h2 fw-bold mb-3">
          Panel de Control y Operaciones
        </h2>

        {authError && <div className="alert alert-danger" role="alert">{authError}</div>}
        {errorBoletas && <div className="alert alert-danger" role="alert">{errorBoletas}</div>}

        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="stat-pill h-100">
              <span>Productos en Catálogo</span>
              <strong>{cargandoProductos ? '...' : productos.length}</strong>
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
              <strong>{cargandoBoletas ? '...' : errorBoletas ? '—' : boletas.length}</strong>
            </div>
          </div>
        </div>

        <AdminProductos />
      </main>
    </>
  )
}
