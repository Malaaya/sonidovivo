import { createContext, useContext, useState } from 'react'
import { PRODUCTOS_INICIALES } from '../data/datos'
import { CLAVES, leer, guardar } from '../utils/storage'

const ProductosContext = createContext(null)

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState(() =>
    leer(CLAVES.productos, PRODUCTOS_INICIALES),
  )

  const guardarProductos = (lista) => {
    guardar(CLAVES.productos, lista)
    setProductos(lista)
  }

  const agregarProducto = (producto) => guardarProductos([...productos, producto])

  const eliminarProducto = (codigo) =>
    guardarProductos(productos.filter((p) => p.codigo !== codigo))

  return (
    <ProductosContext.Provider value={{ productos, agregarProducto, eliminarProducto }}>
      {children}
    </ProductosContext.Provider>
  )
}

export function useProductos() {
  const ctx = useContext(ProductosContext)
  if (!ctx) throw new Error('useProductos debe usarse dentro de <ProductosProvider>')
  return ctx
}