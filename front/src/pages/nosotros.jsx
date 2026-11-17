import { Link } from 'react-router-dom'

const tarjeta = {
  background: '#ffffff',
  padding: '2rem',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  textAlign: 'center',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
}

const PILARES = [
  {
    emoji: '🎸',
    titulo: 'Catálogo Seleccionado',
    texto:
      'Ofrecemos más de 300 referencias de las marcas más reconocidas a nivel mundial, garantizando calidad y durabilidad en cada producto.',
  },
  {
    emoji: '🤝',
    titulo: 'Asesoría Especializada',
    texto:
      'Nuestro equipo está formado por músicos experimentados listos para orientarte en la elección del instrumento o equipo ideal para tu proyecto.',
  },
  {
    emoji: '🚚',
    titulo: 'Envíos Seguros',
    texto:
      'Despachamos de manera rápida y protegida, asegurando que tu equipamiento llegue en perfectas condiciones.',
  },
]

export default function Nosotros() {
  return (
    <main
      className="shop-section-container"
      style={{ maxWidth: '1100px', margin: '2.5rem auto', padding: '0 1rem' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '2.2rem',
            color: '#0f172a',
            marginBottom: '0.8rem',
            fontWeight: 800,
          }}
        >
          Pasión por la Música y el Sonido
        </h2>
        <p
          style={{
            color: '#64748b',
            fontSize: '1.1rem',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          En <strong>Sonido Vivo</strong> nos dedicamos a equipar a músicos, productores y
          entusiastas del audio con los mejores instrumentos.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.8rem',
          marginBottom: '3.5rem',
        }}
      >
        {PILARES.map(({ emoji, titulo, texto }) => (
          <div key={titulo} style={tarjeta}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>{emoji}</div>
            <h3
              style={{
                fontSize: '1.2rem',
                color: '#0f172a',
                marginBottom: '0.5rem',
                fontWeight: 700,
              }}
            >
              {titulo}
            </h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5 }}>{texto}</p>
          </div>
        ))}
      </div>

      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          alignItems: 'center',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
        }}
      >
        <div>
          <h3
            style={{
              fontSize: '1.5rem',
              color: '#0f172a',
              marginBottom: '1rem',
              fontWeight: 800,
            }}
          >
            Nuestra Casa Matriz
          </h3>
          <p
            style={{
              color: '#475569',
              lineHeight: 1.6,
              marginBottom: '1.2rem',
              fontSize: '0.95rem',
            }}
          >
            Ubicados en el corazón de <strong>Viña del Mar, Región de Valparaíso</strong>,
            contamos con un espacio acondicionado para que puedas probar instrumentos, recibir
            soporte técnico o gestionar tus compras directamente.
          </p>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              color: '#334155',
              fontSize: '0.9rem',
            }}
          >
            <li>
              📍 <strong>Ubicación:</strong> Viña del Mar, Región de Valparaíso
            </li>
            <li>
              ⏰ <strong>Lun a Vie:</strong> 10:00 a 19:30 hrs
            </li>
            <li>
              ⏰ <strong>Sábados:</strong> 10:30 a 14:30 hrs
            </li>
            <li>
              ✉️ <strong>Contacto:</strong> contacto@sonidovivo.cl
            </li>
          </ul>
        </div>

        <div
          style={{
            textAlign: 'center',
            background: '#f8fafc',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px dashed #cbd5e1',
          }}
        >
          <h4 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.8rem' }}>
            ¿Buscas algún producto en específico?
          </h4>
          <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.2rem' }}>
            Revisa nuestro catálogo dinámico con stock actualizado en tiempo real.
          </p>
          <Link
            to="/productos"
            style={{
              display: 'inline-block',
              background: '#0f172a',
              color: '#ffffff',
              padding: '0.7rem 1.5rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
            }}
          >
            Explorar Catálogo
          </Link>
        </div>
      </div>
    </main>
  )
}
