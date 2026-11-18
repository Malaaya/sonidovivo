import { useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const RUTAS_POR_ROL = {
  admin: '/admin',
  vendedor: '/vendedor',
}

export default function RutaProtegida({
  roles,
  mensaje,
  redirigirA,
  redirigirSiNoAutenticado = '/login',
  permitirAnonimo = false,
  children,
}) {
  const { sesion, authReady } = useAuth()
  const permitido = authReady
    && ((!sesion && permitirAnonimo) || (Boolean(sesion) && (!roles || roles.includes(sesion.rol))))
  const avisado = useRef(false)

  useEffect(() => {
    if (authReady && !permitido && !avisado.current) {
      avisado.current = true
      alert(mensaje)
    }
  }, [authReady, permitido, mensaje])

  if (!authReady) return <p role="status">Verificando sesión...</p>
  if (!permitido) {
    const destino = sesion
      ? RUTAS_POR_ROL[sesion.rol] || redirigirA || '/'
      : redirigirSiNoAutenticado
    return <Navigate to={destino} replace />
  }
  return children
}