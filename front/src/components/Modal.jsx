const overlay = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(15, 23, 42, 0.75)',
    backdropFilter: 'blur(4px)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

const caja = {
    background: '#ffffff',
    padding: '2.5rem',
    borderRadius: '16px',
    maxWidth: '450px',
    width: '90%',
    textAlign: 'center',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
}

const estiloBoton = {
    primario: { background: '#e91e63', color: '#ffffff', border: 'none' },
    secundario: { background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1' },
}

export default function Modal({ emoji, titulo, children, botones = [] }) {
  return (
    <div style={overlay}>
        <div style={caja}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{emoji}</div>
        <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.8rem', fontWeight: 800 }}>
            {titulo}
        </h3>
        <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.8rem' }}>
            {children}
        </p>
        <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
            {botones.map(({ texto, onClick, variante = 'primario' }) => (
            <button
                key={texto}
                type="button"
                onClick={onClick}
                style={{
                ...estiloBoton[variante],
                fontWeight: 700,
                padding: '0.8rem 1.8rem',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                flex: botones.length === 1 ? 1 : 'initial',
            }}
            >{texto}</button>
            ))}
        </div>
        </div>
    </div>
    )
}