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
            className="btn btn-warning w-100 fw-bold py-2 mb-3"
          >
            Entrar a Mi Cuenta
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