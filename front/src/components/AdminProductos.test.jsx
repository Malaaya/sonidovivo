import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiError } from '../services/api'
import { useProductos } from '../context/ProductosContext'
import AdminProductos from './AdminProductos'

vi.mock('../context/ProductosContext', () => ({
  useProductos: vi.fn(),
}))

const operaciones = {
  agregarProducto: vi.fn(),
  actualizarProducto: vi.fn(),
  eliminarProducto: vi.fn(),
}

const productoExistente = {
  id: 1,
  codigo: 'GA001',
  nombre: 'Guitarra acústica',
  marca: 'Yamaha',
  modelo: 'F310',
  descripcion: 'Descripción',
  precio: 129990,
  stock: 8,
  imagen: '',
  categoriaId: 1,
  categoriaNombre: 'Guitarras acústicas',
}

const categorias = [
  { id: 1, nombre: 'Guitarras acústicas', slug: 'guitarras' },
  { id: 2, nombre: 'Bajos eléctricos', slug: 'bajos' },
]

async function llenarProducto(user, codigo = 'GTR-002') {
  await user.type(screen.getByPlaceholderText('Ej: GUIT-001'), codigo)
  await user.type(screen.getByPlaceholderText('Ej: Guitarra Eléctrica'), 'Guitarra nueva')
  await user.type(screen.getByPlaceholderText('Ej: Fender'), 'Yamaha')
  await user.selectOptions(screen.getByRole('combobox'), '2')
  await user.type(screen.getByPlaceholderText('199990'), '120000')
  await user.type(screen.getByPlaceholderText('5'), '0')
}

describe('administración de productos', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    operaciones.agregarProducto.mockResolvedValue({})
    operaciones.actualizarProducto.mockResolvedValue({})
    operaciones.eliminarProducto.mockResolvedValue(null)
    useProductos.mockReturnValue({
      productos: [productoExistente],
      categorias,
      cargando: false,
      error: null,
      ...operaciones,
    })
  })

  it('crea productos con los campos que espera la API', async () => {
    const user = userEvent.setup()
    render(<AdminProductos />)

    await llenarProducto(user)
    await user.click(screen.getByRole('button', { name: 'Guardar en Inventario' }))

    await waitFor(() => expect(operaciones.agregarProducto).toHaveBeenCalledWith({
      codigo: 'GTR-002',
      nombre: 'Guitarra nueva',
      marca: 'Yamaha',
      modelo: null,
      descripcion: null,
      precio: 120000,
      stock: 0,
      imagen: null,
      categoriaId: 2,
    }))
  })

  it('actualiza productos por id y presenta el mensaje y los detalles de la API', async () => {
    const user = userEvent.setup()
    operaciones.actualizarProducto.mockRejectedValueOnce(
      new ApiError('Datos inválidos', 400, { precio: 'El precio debe ser mayor a 0' }),
    )
    render(<AdminProductos />)

    await user.click(screen.getByRole('button', { name: 'Editar' }))
    const inputNombre = screen.getByPlaceholderText('Ej: Guitarra Eléctrica')
    await user.clear(inputNombre)
    await user.type(inputNombre, 'Guitarra renovada')
    await user.click(screen.getByRole('button', { name: 'Guardar cambios' }))

    await waitFor(() => expect(operaciones.actualizarProducto).toHaveBeenCalledWith(
      1,
      expect.objectContaining({ nombre: 'Guitarra renovada', categoriaId: 1 }),
    ))
    expect(await screen.findByRole('alert')).toHaveTextContent('Datos inválidos')
    expect(screen.getByRole('alert')).toHaveTextContent('precio: El precio debe ser mayor a 0')
  })

  it('pide confirmación y elimina usando el id de la API', async () => {
    const user = userEvent.setup()
    const confirmacion = vi.spyOn(window, 'confirm')
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
    render(<AdminProductos />)

    await user.click(screen.getByRole('button', { name: /Eliminar/ }))
    expect(operaciones.eliminarProducto).not.toHaveBeenCalled()

    await user.click(screen.getByRole('button', { name: /Eliminar/ }))

    expect(confirmacion).toHaveBeenCalledTimes(2)
    expect(operaciones.eliminarProducto).toHaveBeenCalledWith(1)
  })
})
