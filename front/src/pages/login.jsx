import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Espacio from '../components/Espacio'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)

  const manejarSubmit = async (e) => {
    e.preventDefault()
    setErrores({})

    if (!email.trim()) {
      setErrores({ email: 'Debe ingresar su correo.' })
      return
    }
    if (!password) {
      setErrores({ password: 'Debe ingresar su contraseña.' })
      return
    }

    setEnviando(true)
    try {
      const usuario = await login(email, password)
      const destino = usuario.rol === 'admin'
        ? '/admin'
        : usuario.rol === 'vendedor'
          ? '/vendedor'
          : '/'
      navigate(destino, { replace: true })
    } catch (error) {
      setErrores({ ...error.details, formulario: error.message })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="container my-5">
      <div className="row justify-content-center">
      <div className="col-12 col-sm-10 col-md-7 col-lg-5">
      <div className="card shadow-sm">
      <div className="card-body p-4 p-md-5">
        <h2 className="h3 fw-bold mb-1">
          Iniciar Sesión
        </h2>
        <p className="text-secondary small mb-4">
          Accede con tu cuenta para gestionar tus pedidos y compras.
        </p>

        <form onSubmit={manejarSubmit} noValidate>
          {errores.formulario && (
            <div className="alert alert-danger" role="alert">{errores.formulario}</div>
          )}
          <Espacio
            id="login-email"
            label="Correo Electrónico"
            type="email"
            maxLength={120}
            autoComplete="email"
            placeholder="usuario@correo.cl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errores.email}
          />

          <Espacio
            id="login-password"
            label="Contraseña"
            type="password"
            maxLength={72}
            autoComplete="current-password"
            margen="1.5rem"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errores.password}
          />

          <button
            type="submit"
            className="btn btn-warning w-100 fw-bold py-2 mb-3"
            disabled={enviando}
          >
            {enviando ? 'Ingresando...' : 'Entrar a Mi Cuenta'}
          </button>

          <p className="text-center small text-secondary mb-0">
            ¿No tienes una cuenta aún?{' '}
            <Link to="/registro" className="fw-semibold text-decoration-none">
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>
      </div>
      </div>
      </div>

    </main>
  )
}