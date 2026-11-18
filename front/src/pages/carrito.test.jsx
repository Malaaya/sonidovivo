import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'
import { useProductos } from '../context/ProductosContext'
import { crearBoleta } from '../services/boletasService'
import { ApiError } from '../services/api'
import Carrito from './carrito'

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('../context/CarritoContext', () => ({
  useCarrito: vi.fn(),
}))

vi.mock('../context/ProductosContext', () => ({
  useProductos: vi.fn(),
}))

vi.mock('../services/boletasService', () => ({
  crearBoleta: vi.fn(),
}))

const carrito = [{
  productoId: 17,
  codigo: 'GTR-17',
  nombre: 'Guitarra',
  marca: 'Yamaha',
  precio: 120000,
  cantidad: 2,
}]

const vaciarCarrito = vi.fn()
const recargarProductos = vi.fn()

function renderCarrito() {
  return render(
    <MemoryRouter>
      <Carrito />
    </MemoryRouter>,
  )
}

describe('compra desde el carrito', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuth.mockReturnValue({ sesion: { rol: 'cliente' } })
    useCarrito.mockReturnValue({
      carrito,
      total: 240000,
      cambiarCantidad: vi.fn(),
      eliminarDelCarrito: vi.fn(),
      vaciarCarrito,
    })
    useProductos.mockReturnValue({ recargar: recargarProductos })
    crearBoleta.mockResolvedValue({
      numero: 'BOL-2026-001',
      total: 240000,
    })
    recargarProductos.mockResolvedValue()
  })

  it('envía productoId y cantidad, limpia el carrito y actualiza el catálogo', async () => {
    const user = userEvent.setup()
    renderCarrito()

    await user.click(screen.getByRole('button', { name: 'Confirmar compra' }))

    expect(crearBoleta).toHaveBeenCalledWith({
      items: [{ productoId: 17, cantidad: 2 }],
    })
    expect(vaciarCarrito).toHaveBeenCalledOnce()
    expect(recargarProductos).toHaveBeenCalledOnce()
    const titulo = await screen.findByRole('heading', { name: '¡Compra realizada!' })
    const resumenBoleta = titulo.parentElement.querySelector('p')
    expect(resumenBoleta).toHaveTextContent('BOL-2026-001')
    expect(resumenBoleta).toHaveTextContent('$240.000')
  })

  it('impide pagar con un rol que no sea cliente', async () => {
    const user = userEvent.setup()
    useAuth.mockReturnValue({ sesion: { rol: 'vendedor' } })
    renderCarrito()

    await user.click(screen.getByRole('button', { name: 'Confirmar compra' }))

    expect(crearBoleta).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Para comprar debes iniciar sesión con una cuenta de cliente.',
    )
  })

  it('muestra el mensaje de error devuelto por la API', async () => {
    const user = userEvent.setup()
    crearBoleta.mockRejectedValueOnce(new ApiError('Stock insuficiente para GTR-17', 409))
    renderCarrito()

    await user.click(screen.getByRole('button', { name: 'Confirmar compra' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Stock insuficiente para GTR-17')
    expect(vaciarCarrito).not.toHaveBeenCalled()
  })
})
