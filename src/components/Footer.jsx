import { Link } from 'react-router-dom'
import EnlaceAdmin from './EnlaceAdmin'

export default function Footer() {
  return (
    <footer className="deep-footer">
      <div className="footer-inner">
        <div className="footer-col-about">
          <div className="footer-logo">
            SONIDO <span>VIVO</span>
          </div>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>
            Tienda especializada en instrumentos y audio profesional con 11 años de
            trayectoria en la Región de Valparaíso.
          </p>
          <div className="footer-payment-badges">
            <span className="badge-payment">Compra Segura</span>
            <span className="badge-payment">Webpay Plus</span>
            <span className="badge-payment">Transbank</span>
            <span className="badge-payment">Visa / Redcompra</span>
          </div>
        </div>

        <div>
          <h4 className="footer-col-title">Links Importantes</h4>
          <ul className="footer-links-list">
            <li>
              <Link to="/productos">Catálogo Completo</Link>
            </li>
            <li>
              <Link to="/nosotros">Quiénes Somos</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Atención al Cliente</h4>
          <ul className="footer-links-list">
            <li>
              <Link to="/contacto">Formulario de Contacto</Link>
            </li>
            <li>
              <EnlaceAdmin>Panel de Vendedores</EnlaceAdmin>
            </li>
          </ul>
        </div>

        <div className="footer-contact-items">
          <h4 className="footer-col-title">Contacto Tienda</h4>
          <p>📱 +56 9 1234 5678</p>
          <p>✉️ contacto@sonidovivo.cl</p>
          <p>🕒 Lun a Vie: 10:00 a 19:30 hrs</p>
          <p>🕒 Sábados: 10:30 a 14:30 hrs</p>
          <p>📍 Viña del Mar, Región de Valparaíso</p>
        </div>
      </div>

      <div className="deep-footer-bottom">
        <p>&copy; 2026 Sonido Vivo Ltda. - VRK.</p>
      </div>
    </footer>
  )
}
