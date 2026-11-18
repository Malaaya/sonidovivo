import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  listarBoletas,
  obtenerBoleta,
} from '../services/boletasService'
import {
  listarProductos,
  obtenerProducto,
} from '../services/productosService'
import Vendedor from './vendedor'

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('../services/boletasService', () => ({
  listarBoletas: vi.fn(),
  obtenerBoleta: vi.fn(),
}))

vi.mock('../services/productosService', () => ({
  listarProductos: vi.fn(),
  obtenerProducto: vi.fn(),
}))

describe('Panel de Vendedor', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ logout: vi.fn() })
    listarProductos.mockResolvedValue([{
      id: 4,
      codigo: 'GTR-4',
      nombre: 'Guitarra',
      categoriaNombre: 'Cuerdas',
      stock: 5,
    }])
    listarBoletas.mockResolvedValue([{
      id: 9,
      numero: 'B-009',
      usuarioNombre: 'Cliente',
      fecha: '2025-01-01T10:00:00',
      total: 25000,
    }])
    obtenerProducto.mockResolvedValue({
      id: 4,
      codigo: 'GTR-4',
      nombre: 'Guitarra',
      marca: 'Marca',
      modelo: 'Modelo',
      categoriaNombre: 'Cuerdas',
      descripcion: 'Descripción',
      precio: 25000,
      stock: 5,
    })
    obtenerBoleta.mockResolvedValue({
      id: 9,
      numero: 'B-009',
      usuarioNombre: 'Cliente',
      fecha: '2025-01-01T10:00:00',
      items: [{ id: 1, cantidad: 1, productoNombre: 'Guitarra', subtotal: 25000 }],
      total: 25000,
    })
  })

  it('permite consultar detalles de productos y boletas sin acciones de edición', async () => {
    render(
      <MemoryRouter>
        <Vendedor />
      </MemoryRouter>,
    )

    await screen.findByText('Guitarra')
    await screen.findByText('B-009')

    const botonesDetalle = screen.getAllByRole('button', { name: 'Ver detalle' })
    fireEvent.click(botonesDetalle[0])

    expect(await screen.findByRole('heading', { name: 'Detalle de producto' })).toBeInTheDocument()
    expect(obtenerProducto).toHaveBeenCalledWith(4)
    expect(screen.queryByRole('button', { name: /crear|editar|eliminar/i })).not.toBeInTheDocument()

    fireEvent.click(screen.getAllByRole('button', { name: 'Ver detalle' })[1])

    await waitFor(() => expect(obtenerBoleta).toHaveBeenCalledWith(9))
    expect(await screen.findByRole('heading', { name: 'Detalle de boleta #B-009' })).toBeInTheDocument()
  })
})
