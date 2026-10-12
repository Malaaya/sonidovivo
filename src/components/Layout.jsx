import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import Header from './Header'
import Footer from './Footer'
import Modal from './Modal'

export default function Layout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { productoAgregado, cerrarModalAgregado } = useCarrito()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Header variante={pathname === '/carrito' ? 'simple' : 'completo'} />
      <Outlet />
      <Footer />

      {productoAgregado && (
        <Modal
          emoji="🛒"
          titulo="¡Agregado al Carrito!"
          botones={[
            { texto: 'Seguir Comprando', variante: 'secundario', onClick: cerrarModalAgregado },
            {
              texto: 'Ver Carrito',
              onClick: () => {
                cerrarModalAgregado()
                navigate('/carrito')
              },
            },
          ]}
        >
          Has añadido <strong>{productoAgregado.nombre}</strong> ({productoAgregado.marca}) a tu
          pedido con éxito.
        </Modal>
      )}
    </>
  )
}
