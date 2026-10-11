import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { limpiarRun, validarRutChileno } from '../utils/rut'
import Espacio from '../components/Espacio'
import Modal from '../components/Modal'

const VALORES_INICIALES = {
  run: '',
  nombre: '',
  email: '',
  telefono: '',
  password: '',
  confirm: '',
}

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Registro() {
  const { registrar } = useAuth()
  const navigate = useNavigate()

  const [valores, setValores] = useState(VALORES_INICIALES)
  const [errores, setErrores] = useState({})
  const [registrado, setRegistrado] = useState(false)

  const cambiar = (campo) => (e) => {
    const valor = campo === 'run' ? limpiarRun(e.target.value) : e.target.value
    setValores((prev) => ({ ...prev, [campo]: valor }))
  }

  const manejarSubmit = (e) => {
    e.preventDefault()

    const run = valores.run.trim()
    const nombre = valores.nombre.trim()
    const email = valores.email.trim()
    const telefono = valores.telefono.trim()
    const { password, confirm } = valores

    const nuevosErrores = {}

    if (!validarRutChileno(run)) {
      nuevosErrores.run = 'El RUN ingresado no es válido (ej: 12345678-5).'
    }
    if (nombre.length < 3) {
      nuevosErrores.nombre = 'Ingrese un nombre y apellido válido.'
    }
    if (!REGEX_EMAIL.test(email)) {
      nuevosErrores.email = 'Ingrese un correo electrónico válido.'
    }
    if (telefono.length < 9) {
      nuevosErrores.telefono = 'Ingrese un teléfono de contacto válido.'
    }
    if (password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres.'
    } else if (password !== confirm) {
      nuevosErrores.confirm = 'Las contraseñas no coinciden.'
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    if (!registrar({ run, nombre, email, telefono, password })) {
      setErrores({ run: 'RUN ya registrado.' })
      return
    }

    setErrores({})
    setRegistrado(true)
  }

  return (
    <main style={{ maxWidth: '600px', margin: '3rem auto', padding: '0 1.5rem' }}>
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
          Crear Cuenta de Cliente
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Regístrate para comprar instrumentos y gestionar tus despachos.
        </p>

        <form onSubmit={manejarSubmit} noValidate>
          <Espacio
            id="run"
            label="RUN (Sin puntos y con guion)"
            type="text"
            maxLength={10}
            placeholder="Ej: 12345678-5"
            value={valores.run}
            onChange={cambiar('run')}
            error={errores.run}
          />
          <Espacio
            id="nombre"
            label="Nombre Completo"
            type="text"
            placeholder="Nombre y Apellido"
            value={valores.nombre}
            onChange={cambiar('nombre')}
            error={errores.nombre}
          />
          <Espacio
            id="email"
            label="Correo Electrónico"
            type="email"
            placeholder="usuario@correo.cl"
            value={valores.email}
            onChange={cambiar('email')}
            error={errores.email}
          />
          <Espacio
            id="telefono"
            label="Teléfono de Contacto"
            type="tel"
            maxLength={12}
            placeholder="+56 9 1234 5678"
            value={valores.telefono}
            onChange={cambiar('telefono')}
            error={errores.telefono}
          />
          <Espacio
            id="password"
            label="Contraseña (Mínimo 6 caracteres)"
            type="password"
            maxLength={30}
            value={valores.password}
            onChange={cambiar('password')}
            error={errores.password}
          />
          <Espacio
            id="confirm-password"
            label="Confirmar Contraseña"
            type="password"
            maxLength={30}
            margen="1.8rem"
            value={valores.confirm}
            onChange={cambiar('confirm')}
            error={errores.confirm}
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
            }}
          >
            Registrarme
          </button>
        </form>
      </div>

      {registrado && (
        <Modal
          emoji="🎸"
          titulo="¡Cuenta Creada con Éxito!"
          botones={[{ texto: 'Ir a Iniciar Sesión', onClick: () => navigate('/login') }]}
        > Bienvenido a Sonido Vivo. Ya puedes iniciar sesión para gestionar tus pedidos.
        </Modal>
      )}
    </main>
  )
}