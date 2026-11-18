import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { misCompras } from '../services/boletasService'
import Perfil from './perfil'

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('../services/boletasService', () => ({
  listarBoletas: vi.fn(),
  misCompras: vi.fn(),
  obtenerBoleta: vi.fn(),
  crearBoleta: vi.fn(),
}))

const boleta = {
  id: 8,
  numero: 'BOL-2026-008',
  fecha: '2026-11-18T02:30:00',
  total: 240000,
  items: [{
    id: 15,
    productoId: 17,
    productoNombre: 'Guitarra de prueba',
    cantidad: 2,
    precioUnitario: 120000,
    subtotal: 240000,
  }],
}

function renderPerfil() {
  return render(
    <MemoryRouter>
      <Perfil />
    </MemoryRouter>,
  )
}

describe('perfil e historial de compras', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuth.mockReturnValue({
      sesion: {
        nombre: 'Cliente',
        run: '12345678-5',
        email: 'cliente@sonidovivo.cl',
        telefono: null,
      },
      logout: vi.fn(),
    })
    misCompras.mockResolvedValue([boleta])
  })

  it('carga y presenta las boletas y detalles recibidos de la API', async () => {
    renderPerfil()

    expect(await screen.findByText('Boleta #BOL-2026-008')).toBeInTheDocument()
    expect(screen.getByText('2x Guitarra de prueba')).toBeInTheDocument()
    expect(screen.getByText('Total: $240.000')).toBeInTheDocument()
    expect(misCompras).toHaveBeenCalledOnce()
  })

  it('muestra carga y error al consultar las compras', async () => {
    let resolver
    misCompras.mockReturnValueOnce(new Promise((resolve) => {
      resolver = resolve
    }))
    const { unmount } = renderPerfil()

    expect(screen.getByRole('status')).toHaveTextContent('Cargando tus compras...')

    resolver([])
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument())
    unmount()

    misCompras.mockRejectedValueOnce(new Error('No autorizado'))
    renderPerfil()

    expect(await screen.findByRole('alert')).toHaveTextContent('No autorizado')
  })
})
