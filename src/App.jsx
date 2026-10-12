import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import RutaProtegida from './components/RutaProtegida'
import Index from './pages/index'
import Productos from './pages/productos'
import Nosotros from './pages/nosotros'
import Contacto from './pages/contacto'
import Login from './pages/login'
import Registro from './pages/registro'
import Carrito from './pages/carrito'
import Perfil from './pages/perfil'
import Admin from './pages/admin'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="productos" element={<Productos />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="carrito" element={<Carrito />} />
        <Route
          path="perfil"
          element={
            <RutaProtegida
              redirigirA="/login"
              mensaje="Debes iniciar sesión para acceder a tu perfil."
            >
              <Perfil />
            </RutaProtegida>
          }
        />
      </Route>
      <Route
        path="admin"
        element={
          <RutaProtegida
            rol="admin"
            redirigirA="/"
            mensaje="Acceso denegado: Se requieren credenciales de Administrador."
          >
            <Admin />
          </RutaProtegida>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}