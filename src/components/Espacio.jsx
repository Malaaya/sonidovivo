export default function Espacio({ id, label, error, margen = '1.2rem', ...inputProps }) {
  return (
    <div style={{ marginBottom: margen }}>
      <label htmlFor={id} style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
        {label}
      </label>
      <input
        id={id}
        style={{
          width: '100%',
          padding: '0.7rem',
          border: '1px solid var(--border-color)',
          borderRadius: '6px',
          outline: 'none',
          fontSize: '0.95rem',
        }}
        {...inputProps}
      />
      {error && (
        <span style={{ display: 'block', color: '#ef4444', fontSize: '0.8rem', marginTop: '0.3rem' }}>
          {error}
        </span>
      )}
    </div>
  )
}