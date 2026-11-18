import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import {
  actualizarProducto as actualizarProductoApi,
  crearProducto,
  eliminarProducto as eliminarProductoApi,
  listarCategorias,
  listarProductos,
} from '../services/productosService'

const ProductosContext = createContext(null)

function obtenerListas() {
  return Promise.all([listarProductos(), listarCategorias()])
}

function mensajeDeError(error) {
  return error instanceof Error
    ? error.message
    : 'No se pudieron cargar los productos y las categorías.'
}

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const recargar = useCallback(async () => {
    setCargando(true)
    setError(null)

    try {
      const [productosApi, categoriasApi] = await obtenerListas()
      setProductos(productosApi)
      setCategorias(categoriasApi)
    } catch (errorCarga) {
      setError(mensajeDeError(errorCarga))
      throw errorCarga
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => {
    let activo = true

    obtenerListas()
      .then(([productosApi, categoriasApi]) => {
        if (!activo) return
        setProductos(productosApi)
        setCategorias(categoriasApi)
      })
      .catch((errorCarga) => {
        if (!activo) return
        setError(mensajeDeError(errorCarga))
        console.error('No se pudieron cargar los productos y las categorías.', errorCarga)
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
    }
  }, [])

  const agregarProducto = useCallback(async (producto) => {
    const creado = await crearProducto(producto)
    await recargar()
    return creado
  }, [recargar])

  const actualizarProducto = useCallback(async (id, producto) => {
    const actualizado = await actualizarProductoApi(id, producto)
    await recargar()
    return actualizado
  }, [recargar])

  const eliminarProducto = useCallback(async (id) => {
    await eliminarProductoApi(id)
    await recargar()
  }, [recargar])

  return (
    <ProductosContext.Provider
      value={{
        productos,
        categorias,
        cargando,
        error,
        agregarProducto,
        actualizarProducto,
        eliminarProducto,
        recargar,
      }}
    >
      {children}
    </ProductosContext.Provider>
  )
}

export function useProductos() {
  const ctx = useContext(ProductosContext)
  if (!ctx) throw new Error('useProductos debe usarse dentro de <ProductosProvider>')
  return ctx
}