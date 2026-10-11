import { createContext, useContext, useState } from 'react'
import { CLAVES, leer, guardar } from '../utils/storage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuarios, setUsuarios] = useState(() => leer(CLAVES.usuarios, []))

  const registrar = (usuario) => {
    if (usuarios.some((u) => u.run === usuario.run)) return false
    const nuevaLista = [...usuarios, usuario]
    guardar(CLAVES.usuarios, nuevaLista)
    setUsuarios(nuevaLista)
    return true
  }

  return (
    <AuthContext.Provider value={{ usuarios, registrar }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}