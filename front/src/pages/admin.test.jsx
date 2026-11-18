import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProductos } from '../context/ProductosContext'
import { listarBoletas } from '../services/boletasService'
import Admin from './admin'

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('../context/ProductosContext', () => ({
  useProductos: vi.fn(),
}))

vi.mock('../services/boletasService', () => ({
  listarBoletas: vi.fn(),
}))

vi.mock('../components/Header', () => ({
  HeaderAdmin: () => <header>Panel administrador</header>,
}))

vi.mock('../components/AdminProductos', () => ({
  default: () => <div>Administración de productos</div>,
}))

function renderAdmin() {
  return render(
    <MemoryRouter>
      <Admin />
    </MemoryRouter>,
  )
}

describe('contadores del panel administrador', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuth.mockReturnValue({
      usuarios: [{ id: 1 }, { id: 2 }],
      authError: '',
    })
    useProductos.mockReturnValue({
      productos: [{ id: 1 }, { id: 2 }, { id: 3 }],
      cargando: false,
    })
    listarBoletas.mockResolvedValue([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }])
  })

  it('cuenta boletas de la API y usa los productos y clientes cargados', async () => {
    renderAdmin()

    await waitFor(() => {
      expect(screen.getByText('Total Ventas Realizadas').parentElement).toHaveTextContent('4')
    })

    expect(screen.getByText('Productos en Catálogo').parentElement).toHaveTextContent('3')
    expect(screen.getByText('Clientes Registrados').parentElement).toHaveTextContent('2')
    expect(listarBoletas).toHaveBeenCalledOnce()
  })

  it('muestra el error de la API al fallar la consulta de boletas', async () => {
    listarBoletas.mockRejectedValueOnce(new Error('No se pudieron cargar las boletas'))
    renderAdmin()

    expect(await screen.findByRole('alert')).toHaveTextContent('No se pudieron cargar las boletas')
    expect(screen.getByText('Total Ventas Realizadas').parentElement).toHaveTextContent('—')
  })
})
