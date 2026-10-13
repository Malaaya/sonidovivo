import { createContext, useContext, useState } from 'react'
import { CLAVES, leer, guardar, eliminar } from '../utils/storage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuarios, setUsuarios] = useState(() => leer(CLAVES.usuarios, []))
  const [sesion, setSesion] = useState(() => leer(CLAVES.sesion, null))

  const registrar = (usuario) => {
    if (usuarios.some((u) => u.run === usuario.run)) return false
    
  
    const nuevoUsuario = {
      ...usuario,
      password: btoa(usuario.password),
    }

    const nuevaLista = [...usuarios, nuevoUsuario]
    guardar(CLAVES.usuarios, nuevaLista)
    setUsuarios(nuevaLista)
    return true
  }

  const login = (run, password) => {

    const listaUsuarios = leer(CLAVES.usuarios, usuarios)
    
    const usuarioEncontrado = listaUsuarios.find(
      (u) => u.run === run && u.password === btoa(password)
    )

    if (usuarioEncontrado) {
      const sesionUsuario = {
        run: usuarioEncontrado.run,
        nombre: usuarioEncontrado.nombre,
        email: usuarioEncontrado.email,
        telefono: usuarioEncontrado.telefono || '', 
        rol: usuarioEncontrado.rol,
      }
      setSesion(sesionUsuario)
      guardar(CLAVES.sesion, sesionUsuario) 
      return true
    }
    return false
  }

  const logout = () => {
    eliminar(CLAVES.sesion)
    setSesion(null)
  }

  return (
    <AuthContext.Provider
      value={{
        usuarios,
        sesion,
        usuario: sesion,
        esAdmin: sesion?.rol === 'admin',
        registrar,
        login,
        logout,
        cerrarSesion: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}