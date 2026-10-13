export default function Espacio({ id, label, error, margen = '1rem', ...inputProps }) {
  return (
    <div style={{ marginBottom: margen }}>
      <label htmlFor={id} className="form-label fw-semibold">
        {label}
      </label>
      <input
        id={id}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        {...inputProps}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}
