import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { useProductos } from '../context/ProductosContext'
import Productos from './productos'

vi.mock('../context/CarritoContext', () => ({
  useCarrito: () => ({ agregarAlCarrito: vi.fn() }),
}))

vi.mock('../context/ProductosContext', () => ({
  useProductos: vi.fn(),
}))

const productos = [
  {
    id: 1,
    codigo: 'GTR-01',
    nombre: 'Guitarra de prueba',
    marca: 'Marca',
    precio: 10000,
    stock: 3,
    categoriaId: 10,
    categoriaNombre: 'Guitarras acústicas',
  },
  {
    id: 2,
    codigo: 'BAS-01',
    nombre: 'Bajo de prueba',
    marca: 'Marca',
    precio: 20000,
    stock: 2,
    categoriaId: 20,
    categoriaNombre: 'Bajos eléctricos',
  },
]

function renderCatalogo(url = '/productos') {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path="/productos" element={<Productos />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('catálogo de productos', () => {
  beforeEach(() => {
    useProductos.mockReturnValue({
      productos,
      categorias: [
        { id: 10, nombre: 'Guitarras acústicas', slug: 'guitarras' },
        { id: 20, nombre: 'Bajos eléctricos', slug: 'bajos' },
      ],
      cargando: false,
      error: null,
    })
  })

  it('filtra por el id real de categoría de la API', () => {
    renderCatalogo('/productos?categoriaId=20')

    expect(screen.getByRole('heading', { name: 'Bajos eléctricos' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Bajo de prueba' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Guitarra de prueba' })).not.toBeInTheDocument()
  })

  it('muestra el estado de carga y el error del contexto', () => {
    useProductos.mockReturnValueOnce({
      productos: [],
      categorias: [],
      cargando: true,
      error: null,
    })
    const { rerender } = renderCatalogo()

    expect(screen.getByRole('status')).toHaveTextContent('Cargando productos...')

    useProductos.mockReturnValue({
      productos: [],
      categorias: [],
      cargando: false,
      error: 'Backend no disponible',
    })
    rerender(
      <MemoryRouter initialEntries={['/productos']}>
        <Routes>
          <Route path="/productos" element={<Productos />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Backend no disponible')
  })
})
