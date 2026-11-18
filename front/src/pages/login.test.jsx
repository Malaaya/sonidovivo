import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Login from './login'

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

describe('redirección después del inicio de sesión', () => {
  it.each([
    ['admin', 'Panel Admin'],
    ['vendedor', 'Panel Vendedor'],
    ['cliente', 'Tienda'],
  ])('redirige a %s a su destino correspondiente', async (rol, destino) => {
    const login = vi.fn().mockResolvedValue({ rol })
    useAuth.mockReturnValue({ login })

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<h1>Panel Admin</h1>} />
          <Route path="/vendedor" element={<h1>Panel Vendedor</h1>} />
          <Route path="/" element={<h1>Tienda</h1>} />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('Correo Electrónico'), {
      target: { value: 'persona@sonidovivo.cl' },
    })
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'password-seguro' },
    })
    fireEvent.click(screen.getByRole('button', { name: /entrar a mi cuenta/i }))

    expect(await screen.findByRole('heading', { name: destino })).toBeInTheDocument()
    expect(login).toHaveBeenCalledWith('persona@sonidovivo.cl', 'password-seguro')
  })
})
