import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CLAVES } from '../utils/storage'
import { useProductos } from './ProductosContext'
import { CarritoProvider, useCarrito } from './CarritoContext'

vi.mock('./ProductosContext', () => ({
  useProductos: vi.fn(),
}))

const productosApi = [{
  id: 17,
  codigo: 'GTR-17',
  nombre: 'Guitarra',
  marca: 'Yamaha',
  precio: 120000,
  stock: 5,
  imagen: '/guitarra.png',
}]

function wrapper({ children }) {
  return <CarritoProvider>{children}</CarritoProvider>
}

describe('contexto del carrito', () => {
  beforeEach(() => {
    localStorage.clear()
    useProductos.mockReturnValue({ productos: productosApi })
  })

  it('guarda el id del producto al agregarlo al carrito', () => {
    const { result } = renderHook(() => useCarrito(), { wrapper })

    act(() => result.current.agregarAlCarrito('GTR-17'))

    expect(result.current.carrito[0]).toMatchObject({
      productoId: 17,
      codigo: 'GTR-17',
      cantidad: 1,
    })
    expect(JSON.parse(localStorage.getItem(CLAVES.carrito))[0].productoId).toBe(17)
  })

  it('agrega el id real a los artículos antiguos guardados en localStorage', async () => {
    localStorage.setItem(CLAVES.carrito, JSON.stringify([{
      codigo: 'GTR-17',
      nombre: 'Guitarra',
      precio: 120000,
      cantidad: 1,
    }]))

    const { result } = renderHook(() => useCarrito(), { wrapper })

    expect(result.current.carrito[0].productoId).toBe(17)
    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem(CLAVES.carrito))[0].productoId).toBe(17)
    })
  })
})
