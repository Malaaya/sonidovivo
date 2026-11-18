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
import Vendedor from './pages/vendedor'

export default function App() {
  return (
    <Routes>
      <Route
        element={(
          <RutaProtegida
            roles={['cliente', 'admin']}
            permitirAnonimo
            redirigirA="/vendedor"
            mensaje="Acceso denegado: los vendedores solo pueden acceder a su panel."
          >
            <Layout />
          </RutaProtegida>
        )}
      >
        <Route index element={<Index />} />
        <Route path="productos" element={<Productos />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route
          path="carrito"
          element={(
            <RutaProtegida
              roles={['cliente']}
              permitirAnonimo
              mensaje="Acceso denegado: solo los clientes pueden acceder al carrito."
            >
              <Carrito />
            </RutaProtegida>
          )}
        />
        <Route
          path="perfil"
          element={
            <RutaProtegida
              roles={['cliente']}
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
            roles={['admin']}
            redirigirA="/"
            mensaje="Acceso denegado: Se requieren credenciales de Administrador."
          >
            <Admin />
          </RutaProtegida>
        }
      />
      <Route
        path="vendedor"
        element={(
          <RutaProtegida
            roles={['vendedor', 'admin']}
            redirigirA="/"
            mensaje="Acceso denegado: se requieren credenciales de Vendedor."
          >
            <Vendedor />
          </RutaProtegida>
        )}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}