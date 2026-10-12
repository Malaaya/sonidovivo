import { useState } from 'react'
import Modal from '../components/Modal'

const tarjeta = {
  background: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  padding: '2rem',
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '6px',
  border: '1px solid #cbd5e1',
  fontSize: '0.95rem',
  marginTop: '0.3rem',
  marginBottom: '1rem',
  boxSizing: 'border-box',
}

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: '',
  })

  const [errores, setErrores] = useState({})
  const [mensajeEnviado, setMensajeEnviado] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' })
    }
  }

  const validarFormulario = () => {
    const nuevosErrores = {}
    if (!formData.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio'
    if (!formData.correo.trim()) {
      nuevosErrores.correo = 'El correo es obligatorio'
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      nuevosErrores.correo = 'Ingresa un correo electrónico válido'
    }
    if (!formData.asunto.trim()) nuevosErrores.asunto = 'El asunto es obligatorio'
    if (!formData.mensaje.trim()) nuevosErrores.mensaje = 'El mensaje no puede estar vacío'

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validarFormulario()) {
      // Guardar mensaje enviado en localStorage para simulación/persistencia
      const contactosPrevios = JSON.parse(localStorage.getItem('sonido_vivo_contactos') || '[]')
      const nuevoContacto = {
        id: Date.now(),
        ...formData,
        fecha: new Date().toLocaleDateString('es-CL'),
      }
      localStorage.setItem('sonido_vivo_contactos', JSON.stringify([...contactosPrevios, nuevoContacto]))

      setMensajeEnviado(true)
      setFormData({ nombre: '', correo: '', asunto: '', mensaje: '' })
    }
  }

  return (
    <main style={{ maxWidth: '1100px', margin: '2.5rem auto', padding: '0 1rem' }}>
      <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '0.5rem' }}>
        Contacto & Soporte
      </h2>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        ¿Tienes dudas con algún instrumento, tu pedido o quieres asesoría? Escríbenos y te responderemos a la brevedad.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        {/* Formulario de Contacto */}
        <section style={tarjeta}>
          <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '1.5rem' }}>
            Envíanos un Mensaje
          </h3>

          <form onSubmit={handleSubmit}>
            <div>
              <label style={{ fontWeight: '600', color: '#334155', fontSize: '0.9rem' }}>
                Nombre Completo *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej. Juan Pérez"
                style={inputStyle}
              />
              {errores.nombre && (
                <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '-0.8rem', display: 'block', marginBottom: '0.8rem' }}>
                  {errores.nombre}
                </span>
              )}
            </div>

            <div>
              <label style={{ fontWeight: '600', color: '#334155', fontSize: '0.9rem' }}>
                Correo Electrónico *
              </label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                placeholder="nombre@ejemplo.com"
                style={inputStyle}
              />
              {errores.correo && (
                <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '-0.8rem', display: 'block', marginBottom: '0.8rem' }}>
                  {errores.correo}
                </span>
              )}
            </div>

            <div>
              <label style={{ fontWeight: '600', color: '#334155', fontSize: '0.9rem' }}>
                Asunto *
              </label>
              <input
                type="text"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                placeholder="Consulta sobre producto, envíos, etc."
                style={inputStyle}
              />
              {errores.asunto && (
                <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '-0.8rem', display: 'block', marginBottom: '0.8rem' }}>
                  {errores.asunto}
                </span>
              )}
            </div>

            <div>
              <label style={{ fontWeight: '600', color: '#334155', fontSize: '0.9rem' }}>
                Mensaje *
              </label>
              <textarea
                name="mensaje"
                rows="4"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Escribe tu consulta detalladamente..."
                style={{ ...inputStyle, resize: 'vertical' }}
              ></textarea>
              {errores.mensaje && (
                <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '-0.8rem', display: 'block', marginBottom: '0.8rem' }}>
                  {errores.mensaje}
                </span>
              )}
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.8rem',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              Enviar Mensaje
            </button>
          </form>
        </section>

        {/* Información de Contacto Adicional */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={tarjeta}>
            <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '1rem' }}>
              📍 Información de la Tienda
            </h3>
            <p style={{ color: '#475569', margin: '0.5rem 0' }}>
              <strong>Dirección:</strong> Av. Providencia 1234, Local 45, Santiago, Chile
            </p>
            <p style={{ color: '#475569', margin: '0.5rem 0' }}>
              <strong>Horario de Atención:</strong> Lunes a Viernes de 10:00 a 19:00 hrs. Sábados de 10:00 a 14:00 hrs.
            </p>
            <p style={{ color: '#475569', margin: '0.5rem 0' }}>
              <strong>Teléfono:</strong> +56 2 2345 6789
            </p>
            <p style={{ color: '#475569', margin: '0.5rem 0' }}>
              <strong>Email:</strong> contacto@sonidovivo.cl
            </p>
          </div>

          <div style={{ ...tarjeta, backgroundColor: '#f8fafc' }}>
            <h4 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>⚡ Respuesta Rápida</h4>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
              Nuestro equipo revisa los mensajes diariamente. Si tienes consultas sobre compras recientes, no olvides incluir tu código de orden.
            </p>
          </div>
        </section>
      </div>

      {/* Modal de Confirmación tras enviar mensaje */}
      {mensajeEnviado && (
        <Modal titulo="¡Mensaje Enviado!" onClose={() => setMensajeEnviado(false)}>
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ fontSize: '3rem', color: '#10b981', marginBottom: '0.5rem' }}>✓</div>
            <h3>Gracias por contactarnos</h3>
            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
              Hemos recibido tu mensaje correctamente. Te responderemos a la brevedad.
            </p>
            <button
              onClick={() => setMensajeEnviado(false)}
              style={{
                width: '100%',
                padding: '0.8rem',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '1.5rem',
              }}
            >
              Cerrar
            </button>
          </div>
        </Modal>
      )}
    </main>
  )
}