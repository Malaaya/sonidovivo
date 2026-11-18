import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function EnlaceAdmin({ children }) {
  const { sesion } = useAuth()

  if (sesion?.rol !== 'admin') return null

  return (
    <Link to="/admin" className="link-panel-admin">
      {children}
    </Link>
  )
}
