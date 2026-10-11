import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { limpiarRun } from '../utils/rut'
import { primerNombre } from '../utils/formato'
import Espacio from '../components/Espacio'
import Modal from '../components/Modal'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [run, setRun] = useState('')
  const [password, setPassword] = useState('')
  const [errores, setErrores] = useState({})
  const [sesionIniciada, setSesionIniciada] = useState(null)

  const manejarSubmit = (e) => {
    e.preventDefault()
    setErrores({})

    if (!run.trim()) {
      setErrores({ run: 'Debe ingresar su RUN.' })
      return
    }
    if (!password) {
      setErrores({ password: 'Debe ingresar su contraseña.' })
      return
    }

    const sesion = login(run, password)
    if (sesion) {
      setSesionIniciada(sesion)
    } else {
      setErrores({ password: 'RUN o contraseña incorrectos.' })
    }
  }

  const esAdmin = sesionIniciada?.rol === 'admin'

  return (
    <main style={{ maxWidth: '480px', margin: '3.5rem auto', padding: '0 1.5rem' }}>
      <div
        style={{
          background: '#ffffff',
          padding: '2.5rem',
          borderRadius: '10px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        }}
      >
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#0f172a' }}>
          Iniciar Sesión
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Accede con tu cuenta para gestionar tus pedidos y compras.
        </p>

        <form onSubmit={manejarSubmit} noValidate>
          <Espacio
            id="login-run"
            label="RUN de Cliente"
            type="text"
            maxLength={10}
            placeholder="Ej: 12345678-5"
            value={run}
            onChange={(e) => setRun(limpiarRun(e.target.value))}
            error={errores.run}
          />

          <Espacio
            id="login-password"
            label="Contraseña"
            type="password"
            maxLength={30}
            margen="1.5rem"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errores.password}
          />

          <button
            type="submit"
            className="btn-slide-cta"
            style={{
              width: '100%',
              padding: '0.9rem',
              border: 'none',
              fontSize: '1rem',
              cursor: 'pointer',
              textAlign: 'center',
              marginBottom: '1.2rem',
            }}
          >
            Entrar a Mi Cuenta
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#64748b' }}>
            ¿No tienes una cuenta aún?{' '}
            <Link
              to="/registro"
              style={{
                color: 'var(--accent-pink)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>

      {sesionIniciada && (
        <Modal
          emoji="👋"
          titulo={`¡Hola, ${primerNombre(sesionIniciada.nombre)}!`}
          botones={[
            {
              texto: esAdmin ? 'Ir al Panel Admin' : 'Ir a la Tienda',
              onClick: () => navigate(esAdmin ? '/admin' : '/'),
            },
          ]}
        >Has iniciado sesión correctamente.
        </Modal>
      )}
    </main>
  )
}