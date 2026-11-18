import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiRequest } from './api'
import { crearBoleta, listarBoletas, misCompras, obtenerBoleta } from './boletasService'

vi.mock('./api', () => ({ apiRequest: vi.fn() }))

describe('servicio de boletas', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    apiRequest.mockResolvedValue([])
  })

  it('envía el formato de compra y consulta las rutas autenticadas', async () => {
    const boleta = { items: [{ productoId: 6, cantidad: 2 }] }

    await crearBoleta(boleta)
    await misCompras()
    await listarBoletas()
    await obtenerBoleta(15)

    expect(apiRequest).toHaveBeenNthCalledWith(1, '/boletas', {
      method: 'POST',
      body: boleta,
    })
    expect(apiRequest).toHaveBeenNthCalledWith(2, '/boletas/mis-compras')
    expect(apiRequest).toHaveBeenNthCalledWith(3, '/boletas')
    expect(apiRequest).toHaveBeenNthCalledWith(4, '/boletas/15')
  })
})
