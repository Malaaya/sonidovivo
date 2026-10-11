import { createContext, useContext, useState } from 'react'
import { CLAVES, leer, guardar, eliminar } from '../utils/storage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuarios, setUsuarios] = useState(() => leer(CLAVES.usuarios, []))
  const [sesion, setSesion] = useState(() => leer(CLAVES.sesion, null))

  const registrar = (usuario) => {
    if (usuarios.some((u) => u.run === usuario.run)) return false
    const nuevaLista = [...usuarios, usuario]
    guardar(CLAVES.usuarios, nuevaLista)
    setUsuarios(nuevaLista)
    return true
  }

  const login = (runIngresado, password) => {
    const run = runIngresado.trim().toUpperCase()
    const usuario = usuarios.find(
      (u) => u.run.toUpperCase() === run && u.password === password,
    )
    if (!usuario) return null

    const esAdmin =
      usuario.email === 'admin@sonidovivo.cl' || usuario.run === '11111111-1'

    const nuevaSesion = {
      run: usuario.run,
      nombre: usuario.nombre,
      email: usuario.email,
      telefono: usuario.telefono,
      rol: esAdmin ? 'admin' : 'cliente',
    }
    guardar(CLAVES.sesion, nuevaSesion)
    setSesion(nuevaSesion)
    return nuevaSesion
  }

  const logout = () => {
    eliminar(CLAVES.sesion)
    setSesion(null)
  }

  return (
    <AuthContext.Provider value={{ usuarios, sesion, registrar, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}