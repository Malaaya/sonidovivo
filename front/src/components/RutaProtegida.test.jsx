import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import RutaProtegida from './RutaProtegida'

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

describe('RutaProtegida', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  function mostrarRuta(sesion, roles) {
    useAuth.mockReturnValue({ sesion, authReady: true })
    vi.spyOn(window, 'alert').mockImplementation(() => {})

    return render(
      <MemoryRouter initialEntries={['/privada']}>
        <Routes>
          <Route
            path="/privada"
            element={(
              <RutaProtegida roles={roles} mensaje="Acceso denegado">
                <h1>Contenido protegido</h1>
              </RutaProtegida>
            )}
          />
          <Route path="/admin" element={<h1>Panel Admin</h1>} />
          <Route path="/vendedor" element={<h1>Panel Vendedor</h1>} />
          <Route path="/" element={<h1>Tienda</h1>} />
        </Routes>
      </MemoryRouter>,
    )
  }

  it.each(['admin', 'vendedor'])('permite a %s acceder con una lista de roles', (rol) => {
    mostrarRuta({ rol }, ['admin', 'vendedor'])

    expect(screen.getByRole('heading', { name: 'Contenido protegido' })).toBeInTheDocument()
  })

  it('redirige al vendedor a su panel al denegarle otra ruta', () => {
    mostrarRuta({ rol: 'vendedor' }, ['cliente'])

    expect(screen.getByRole('heading', { name: 'Panel Vendedor' })).toBeInTheDocument()
    expect(window.alert).toHaveBeenCalledWith('Acceso denegado')
  })

  it('redirige al administrador al panel admin si su rol no está permitido', () => {
    mostrarRuta({ rol: 'admin' }, ['cliente'])

    expect(screen.getByRole('heading', { name: 'Panel Admin' })).toBeInTheDocument()
  })
})
