import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'

export default function Contacto() {
  const navigate = useNavigate()
  const [enviado, setEnviado] = useState(false)

  const enviar = (e) => {
    e.preventDefault()
    setEnviado(true)
  }

  return (
    <main className="container my-4">
      <div className="text-center mb-4">
        <h2 className="h1 fw-bold">Contáctanos</h2>
        <p className="text-secondary">
          ¿Tienes dudas con algún instrumento o pedido? Escríbenos y te responderemos a la
          brevedad a tu correo electrónico.
        </p>
      </div>

      <div className="row g-4">
        <section className="col-12 col-md-5">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h3 className="h5 fw-bold border-bottom pb-2 mb-3">Información de Atención</h3>
              <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                <li>
                  <strong className="d-block small">📍 Dirección Showroom:</strong>
                  <span className="text-secondary">Viña del Mar, Región de Valparaíso</span>
                </li>
                <li>
                  <strong className="d-block small">📞 Teléfono & WhatsApp:</strong>
                  <span className="text-secondary">+56 9 1234 5678</span>
                </li>
                <li>
                  <strong className="d-block small">✉️ Correo Electrónico:</strong>
                  <span className="text-secondary">contacto@sonidovivo.cl</span>
                </li>
                <li>
                  <strong className="d-block small">⏰ Horarios de Atención:</strong>
                  <span className="text-secondary">
                    Lun a Vie: 10:00 a 19:30 hrs
                    <br />
                    Sábados: 10:30 a 14:30 hrs
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="col-12 col-md-7">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h3 className="h5 fw-bold border-bottom pb-2 mb-3">Envíanos un Mensaje</h3>

              <form onSubmit={enviar}>
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <label htmlFor="nombre" className="form-label fw-semibold">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      required
                      placeholder="Ej: Juan Pérez"
                      className="form-control"
                    />
                  </div>

                  <div className="col-12 col-sm-6">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="ejemplo@correo.com"
                      className="form-control"
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="asunto" className="form-label fw-semibold">
                      Asunto *
                    </label>
                    <select
                      id="asunto"
                      name="asunto"
                      required
                      defaultValue=""
                      className="form-select"
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

                  <div className="col-12">
                    <label htmlFor="mensaje" className="form-label fw-semibold">
                      Mensaje *
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={4}
                      required
                      placeholder="Escribe tus dudas o comentarios aquí..."
                      className="form-control"
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-dark w-100 fw-bold py-2">
                      Enviar Mensaje
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
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
