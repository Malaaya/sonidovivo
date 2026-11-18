import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiRequest } from './api'
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  listarCategorias,
  listarProductos,
  obtenerProducto,
} from './productosService'

vi.mock('./api', () => ({ apiRequest: vi.fn() }))

describe('servicio de productos', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    apiRequest.mockResolvedValue([])
  })

  it('consulta productos y categorías como recursos públicos', async () => {
    await listarProductos()
    await listarProductos(4)
    await obtenerProducto(12)
    await listarCategorias()

    expect(apiRequest).toHaveBeenNthCalledWith(1, '/productos', { authenticated: false })
    expect(apiRequest).toHaveBeenNthCalledWith(2, '/productos?categoriaId=4', { authenticated: false })
    expect(apiRequest).toHaveBeenNthCalledWith(3, '/productos/12', { authenticated: false })
    expect(apiRequest).toHaveBeenNthCalledWith(4, '/categorias', { authenticated: false })
  })

  it('envía las operaciones de administración con método y datos correctos', async () => {
    const producto = { codigo: 'GTR-01', categoriaId: 2 }

    await crearProducto(producto)
    await actualizarProducto(8, producto)
    await eliminarProducto(8)

    expect(apiRequest).toHaveBeenNthCalledWith(1, '/productos', {
      method: 'POST',
      body: producto,
    })
    expect(apiRequest).toHaveBeenNthCalledWith(2, '/productos/8', {
      method: 'PUT',
      body: producto,
    })
    expect(apiRequest).toHaveBeenNthCalledWith(3, '/productos/8', { method: 'DELETE' })
  })
})
