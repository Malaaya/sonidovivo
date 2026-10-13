import { useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RutaProtegida({ rol, mensaje, redirigirA, children }) {
  const { sesion } = useAuth()
  const permitido = Boolean(sesion) && (!rol || sesion.rol === rol)
  const avisado = useRef(false)

  useEffect(() => {
    if (!permitido && !avisado.current) {
      avisado.current = true
      alert(mensaje)
    }
  }, [permitido, mensaje])

  if (!permitido) return <Navigate to={redirigirA} replace />
  return children
}