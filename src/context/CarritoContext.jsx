import { createContext, useContext, useState } from 'react'
import { useProductos } from './ProductosContext'
import { CLAVES, leer, guardar } from '../utils/storage'

const CarritoContext = createContext(null)

export function CarritoProvider({ children }) {
  const { productos } = useProductos()
  const [carrito, setCarrito] = useState(() => leer(CLAVES.carrito, []))
  const [productoAgregado, setProductoAgregado] = useState(null)

  const actualizar = (nuevoCarrito) => {
    guardar(CLAVES.carrito, nuevoCarrito)
    setCarrito(nuevoCarrito)
  }

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0)
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  const agregarAlCarrito = (codigo) => {
    const producto = productos.find((p) => p.codigo === codigo)
    if (!producto) {
      alert('Producto no encontrado.')
      return
    }

    const existente = carrito.find((p) => p.codigo === codigo)

    if (existente) {
      if (existente.cantidad >= producto.stock) {
        alert(`Stock máximo disponible (${producto.stock} unidades).`)
        return
      }
      actualizar(
        carrito.map((p) => (p.codigo === codigo ? { ...p, cantidad: p.cantidad + 1 } : p)),
      )
    } else {
      actualizar([
        ...carrito,
        {
          codigo: producto.codigo,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          marca: producto.marca,
          cantidad: 1,
        },
      ])
    }

    setProductoAgregado(producto)
  }

  const cambiarCantidad = (codigo, delta) => {
    actualizar(
      carrito
        .map((p) => (p.codigo === codigo ? { ...p, cantidad: p.cantidad + delta } : p))
        .filter((p) => p.cantidad > 0),
    )
  }

  const eliminarDelCarrito = (codigo) => {
    actualizar(carrito.filter((p) => p.codigo !== codigo))
  }

  const vaciarCarrito = () => actualizar([])

  const cerrarModalAgregado = () => setProductoAgregado(null)

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        totalItems,
        total,
        productoAgregado,
        agregarAlCarrito,
        cambiarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        cerrarModalAgregado,
      }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  const ctx = useContext(CarritoContext)
  if (!ctx) throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  return ctx
}