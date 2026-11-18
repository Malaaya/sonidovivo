import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  listarCategorias,
  listarProductos,
} from '../services/productosService'
import { ProductosProvider, useProductos } from './ProductosContext'

vi.mock('../services/productosService', () => ({
  actualizarProducto: vi.fn(),
  crearProducto: vi.fn(),
  eliminarProducto: vi.fn(),
  listarCategorias: vi.fn(),
  listarProductos: vi.fn(),
}))

const productosApi = [{ id: 1, codigo: 'GTR-01', nombre: 'Guitarra' }]
const categoriasApi = [{ id: 2, nombre: 'Cuerdas', slug: 'cuerdas' }]
const wrapper = ({ children }) => <ProductosProvider>{children}</ProductosProvider>

describe('contexto de productos', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    listarProductos.mockResolvedValue(productosApi)
    listarCategorias.mockResolvedValue(categoriasApi)
    crearProducto.mockResolvedValue({ id: 3 })
    actualizarProducto.mockResolvedValue({ id: 1 })
    eliminarProducto.mockResolvedValue(null)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('carga productos y categorías al montar', async () => {
    const { result } = renderHook(() => useProductos(), { wrapper })

    await waitFor(() => expect(result.current.cargando).toBe(false))

    expect(result.current.productos).toEqual(productosApi)
    expect(result.current.categorias).toEqual(categoriasApi)
    expect(result.current.error).toBeNull()
    expect(listarProductos).toHaveBeenCalledOnce()
    expect(listarCategorias).toHaveBeenCalledOnce()
  })

  it('registra operaciones y vuelve a cargar las listas', async () => {
    const { result } = renderHook(() => useProductos(), { wrapper })
    const nuevoProducto = { codigo: 'GTR-02' }
    await waitFor(() => expect(result.current.cargando).toBe(false))

    await act(async () => {
      await result.current.agregarProducto(nuevoProducto)
      await result.current.actualizarProducto(1, nuevoProducto)
      await result.current.eliminarProducto(1)
    })

    expect(crearProducto).toHaveBeenCalledWith(nuevoProducto)
    expect(actualizarProducto).toHaveBeenCalledWith(1, nuevoProducto)
    expect(eliminarProducto).toHaveBeenCalledWith(1)
    expect(listarProductos).toHaveBeenCalledTimes(4)
    expect(listarCategorias).toHaveBeenCalledTimes(4)
  })

  it('expone el error al fallar la carga inicial', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    listarProductos.mockRejectedValueOnce(new Error('Backend no disponible'))
    const { result } = renderHook(() => useProductos(), { wrapper })

    await waitFor(() => expect(result.current.error).toBe('Backend no disponible'))

    expect(result.current.productos).toEqual([])
    expect(result.current.cargando).toBe(false)
  })
})
