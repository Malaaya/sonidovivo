import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProductos } from '../context/ProductosContext'
import Header from './Header'

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('../context/CarritoContext', () => ({
  useCarrito: () => ({ totalItems: 0 }),
}))

vi.mock('../context/ProductosContext', () => ({
  useProductos: vi.fn(),
}))

describe('categorías del Header', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ sesion: null })
    useProductos.mockReturnValue({
      categorias: [{ id: 42, nombre: 'Pianos digitales', slug: 'teclados' }],
      cargando: false,
      error: null,
    })
  })

  it('muestra categorías de la API y enlaza por su id', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'Pianos digitales' })).toHaveAttribute(
      'href',
      '/productos?categoriaId=42',
    )
    expect(screen.queryByRole('link', { name: 'Bajos Eléctricos' })).not.toBeInTheDocument()
  })

  it.each([
    ['admin', 'Panel Admin: Ana', '/admin'],
    ['vendedor', 'Panel Vendedor: Ana', '/vendedor'],
  ])('oculta el perfil y el carrito para %s', (rol, nombrePanel, rutaPanel) => {
    useAuth.mockReturnValue({ sesion: { nombre: 'Ana Pérez', rol } })

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: nombrePanel })).toHaveAttribute('href', rutaPanel)
    expect(screen.queryByRole('link', { name: '👋 Hola, Ana' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '🛒 0' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Ver Carrito' })).not.toBeInTheDocument()
  })

  it('muestra perfil y carrito para clientes', () => {
    useAuth.mockReturnValue({ sesion: { nombre: 'Ana Pérez', rol: 'cliente' } })

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: '👋 Hola, Ana' })).toHaveAttribute('href', '/perfil')
    expect(screen.getByTitle('Ver Carrito')).toHaveAttribute('href', '/carrito')
    expect(screen.queryByRole('link', { name: 'Portal Admin' })).not.toBeInTheDocument()
  })
})
