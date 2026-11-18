import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useProductos } from './ProductosContext'
import { CLAVES, leer, guardar } from '../utils/storage'

const CarritoContext = createContext(null)

export function CarritoProvider({ children }) {
  const { productos } = useProductos()
  const [carrito, setCarrito] = useState(() => leer(CLAVES.carrito, []))
  const [productoAgregado, setProductoAgregado] = useState(null)

  const carritoConProductoId = useMemo(
    () => carrito.map((item) => {
      const producto = productos.find((actual) => actual.codigo === item.codigo)
      if (!producto || item.productoId === producto.id) return item
      return { ...item, productoId: producto.id }
    }),
    [carrito, productos],
  )

  useEffect(() => {
    if (carritoConProductoId.some((item, index) => item !== carrito[index])) {
      guardar(CLAVES.carrito, carritoConProductoId)
    }
  }, [carrito, carritoConProductoId])

  const actualizar = (nuevoCarrito) => {
    guardar(CLAVES.carrito, nuevoCarrito)
    setCarrito(nuevoCarrito)
  }

  const totalItems = carritoConProductoId.reduce((acc, item) => acc + item.cantidad, 0)
  const total = carritoConProductoId.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  const agregarAlCarrito = (codigo) => {
    const producto = productos.find((p) => p.codigo === codigo)
    if (!producto) {
      alert('Producto no encontrado.')
      return
    }

    const existente = carritoConProductoId.find((p) => p.codigo === codigo)

    if (existente) {
      if (existente.cantidad >= producto.stock) {
        alert(`Stock máximo disponible (${producto.stock} unidades).`)
        return
      }
      actualizar(
        carritoConProductoId.map((p) =>
          p.codigo === codigo ? { ...p, productoId: producto.id, cantidad: p.cantidad + 1 } : p,
        ),
      )
    } else {
      actualizar([
        ...carritoConProductoId,
        {
          productoId: producto.id,
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
      carritoConProductoId
        .map((p) => (p.codigo === codigo ? { ...p, cantidad: p.cantidad + delta } : p))
        .filter((p) => p.cantidad > 0),
    )
  }

  const eliminarDelCarrito = (codigo) => {
    actualizar(carritoConProductoId.filter((p) => p.codigo !== codigo))
  }

  const vaciarCarrito = () => actualizar([])

  const cerrarModalAgregado = () => setProductoAgregado(null)

  return (
    <CarritoContext.Provider
      value={{
        carrito: carritoConProductoId,
        totalItems,
        cantidadTotal: totalItems,
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