import { Link } from 'react-router-dom'

const tarjeta = {
  background: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  padding: '2rem',
}

export default function Nosotros() {
  return (
    <main style={{ maxWidth: '1100px', margin: '2.5rem auto', padding: '0 1rem' }}>
      {/* Banner / Encabezado */}
      <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '1rem' }}>
          Sobre <span style={{ color: '#e91e63' }}>Sonido Vivo</span>
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '700px', margin: '0 auto' }}>
          Pasión por la música, compromiso con la calidad y los mejores instrumentos musicales de Chile al alcance de todos.
        </p>
      </section>

      {/* Historia y Propósito */}
      <section style={{ ...tarjeta, marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1rem' }}>
          Nuestra Historia
        </h3>
        <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '1rem' }}>
          Sonido Vivo nació con la idea de brindar a músicos principiantes, aficionados y profesionales una experiencia de compra transparente, rápida y confiable. Desde nuestras primeras guitarras y baterías hasta incorporar las marcas más prestigiosas de audio en el mundo, nos hemos posicionado como una tienda de referencia nacional.
        </p>
        <p style={{ color: '#475569', lineHeight: '1.7' }}>
          Creemos firmemente que la música transforma vidas, por lo que trabajamos día a día para mantener un catálogo diverso con precios accesibles y envíos a todo Chile.
        </p>
      </section>

      {/* Grid de Valores */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        <div style={tarjeta}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎸</div>
          <h4 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '0.5rem' }}>
            Calidad Garantizada
          </h4>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Todos nuestros instrumentos y equipos de audio pasan por revisión e inspección previa para asegurar el estándar técnico.
          </p>
        </div>

        <div style={tarjeta}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚚</div>
          <h4 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '0.5rem' }}>
            Envíos a Todo Chile
          </h4>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Llegamos a cada rincón del país con empaques especiales de máxima protección para tus equipos.
          </p>
        </div>

        <div style={tarjeta}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🤝</div>
          <h4 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '0.5rem' }}>
            Asesoría Personalizada
          </h4>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Nuestro equipo está compuesto por músicos experimentados listos para guiarte en tu elección.
          </p>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section style={{ ...tarjeta, textAlign: 'center', backgroundColor: '#0f172a', color: '#ffffff' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ffffff' }}>
          ¿Listo para encontrar tu próximo instrumento?
        </h3>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
          Explora nuestro catálogo completo de guitarras, baterías, teclados y audio profesional.
        </p>
        <Link
          to="/productos"
          style={{
            display: 'inline-block',
            padding: '0.8rem 2rem',
            backgroundColor: '#e91e63',
            color: '#ffffff',
            fontWeight: 'bold',
            borderRadius: '6px',
            textDecoration: 'none',
          }}
        >
          Ver Catálogo Completo
        </Link>
      </section>
    </main>
  )
}