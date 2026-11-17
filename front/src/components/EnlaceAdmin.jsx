import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function EnlaceAdmin({ children }) {
  const { sesion } = useAuth()
  const navigate = useNavigate()

  const manejarClick = (e) => {
    e.preventDefault()
    if (sesion?.rol === 'admin') {
      navigate('/admin')
    } else {
      alert('Debes iniciar sesión con una cuenta de Administrador para acceder.')
      navigate('/login')
    }
  }

  return (
    <a href="/admin" className="link-panel-admin" onClick={manejarClick}>
      {children}
    </a>
  )
}
