import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'

const tarjeta = {
  backgroundColor: '#ffffff',
  padding: '2rem',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
}

const tituloTarjeta = {
  fontSize: '1.25rem',
  color: '#0f172a',
  marginBottom: '1.5rem',
  borderBottom: '2px solid #f1f5f9',
  paddingBottom: '0.5rem',
}

const etiqueta = {
  display: 'block',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: '#334155',
  marginBottom: '0.3rem',
}

const campo = {
  width: '100%',
  padding: '0.7rem',
  border: '1px solid #cbd5e1',
  borderRadius: '6px',
  fontSize: '0.95rem',
}

const etiquetaInfo = { color: '#0f172a', display: 'block', fontSize: '0.9rem' }
const valorInfo = { color: '#475569', fontSize: '0.95rem' }

export default function Contacto() {
  const navigate = useNavigate()
  const [enviado, setEnviado] = useState(false)

  const enviar = (e) => {
    e.preventDefault()
    setEnviado(true)
  }

  return (
    <main
      className="shop-section-container"
      style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}
    >
      <div
        className="shop-header-intro"
        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
      >
        <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '0.5rem' }}>
          Contáctanos
        </h2>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          ¿Tienes dudas con algún instrumento o pedido? Escríbenos y te responderemos a la
          brevedad a tu correo electrónico.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start',
        }}
      >
        <section style={tarjeta}>
          <h3 style={tituloTarjeta}>Información de Atención</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <strong style={etiquetaInfo}>📍 Dirección Showroom:</strong>
              <span style={valorInfo}>Viña del Mar, Región de Valparaíso</span>
            </div>
            <div>
              <strong style={etiquetaInfo}>📞 Teléfono & WhatsApp:</strong>
              <span style={valorInfo}>+56 9 1234 5678</span>
            </div>
            <div>
              <strong style={etiquetaInfo}>✉️ Correo Electrónico:</strong>
              <span style={valorInfo}>contacto@sonidovivo.cl</span>
            </div>
            <div>
              <strong style={etiquetaInfo}>⏰ Horarios de Atención:</strong>
              <span style={valorInfo}>
                Lun a Vie: 10:00 a 19:30 hrs
                <br />
                Sábados: 10:30 a 14:30 hrs
              </span>
            </div>
          </div>
        </section>

        <section style={tarjeta}>
          <h3 style={tituloTarjeta}>Envíanos un Mensaje</h3>

          <form
            onSubmit={enviar}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div>
              <label htmlFor="nombre" style={etiqueta}>
                Nombre Completo *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                placeholder="Ej: Juan Pérez"
                style={campo}
              />
            </div>

            <div>
              <label htmlFor="email" style={etiqueta}>
                Correo Electrónico *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="ejemplo@correo.com"
                style={campo}
              />
            </div>

            <div>
              <label htmlFor="asunto" style={etiqueta}>
                Asunto *
              </label>
              <select
                id="asunto"
                name="asunto"
                required
                defaultValue=""
                style={{ ...campo, backgroundColor: '#fff' }}
              >
                <option value="" disabled>
                  Selecciona un motivo
                </option>
                <option value="consulta">Consulta sobre un Producto</option>
                <option value="despacho">Estado de mi Pedido / Despacho</option>
                <option value="garantia">Garantía o Soporte Técnico</option>
                <option value="otro">Otro Motivo</option>
              </select>
            </div>

            <div>
              <label htmlFor="mensaje" style={etiqueta}>
                Mensaje *
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                required
                placeholder="Escribe tus dudas o comentarios aquí..."
                style={{ ...campo, resize: 'vertical' }}
              ></textarea>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '0.8rem',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '1rem',
                marginTop: '0.5rem',
              }}
            >
              Enviar Mensaje
            </button>
          </form>
        </section>
      </div>

      {enviado && (
        <Modal
          emoji="🎉"
          titulo="¡Mensaje Enviado!"
          botones={[{ texto: 'Volver al Inicio', onClick: () => navigate('/') }]}
        >
          Gracias por contactarnos. Tu mensaje ha sido enviado correctamente. Te responderemos
          al correo proporcionado a la brevedad.
        </Modal>
      )}
    </main>
  )
}
