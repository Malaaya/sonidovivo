import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { useProductos } from '../context/ProductosContext'
import Header from './Header'

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ sesion: null }),
}))

vi.mock('../context/CarritoContext', () => ({
  useCarrito: () => ({ totalItems: 0 }),
}))

vi.mock('../context/ProductosContext', () => ({
  useProductos: vi.fn(),
}))

describe('categorías del Header', () => {
  beforeEach(() => {
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
})
