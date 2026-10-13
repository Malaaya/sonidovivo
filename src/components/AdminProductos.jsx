import { useState } from 'react'
import { useProductos } from '../context/ProductosContext'
import { clp } from '../utils/formato'

const FORM_VACIO = {
  codigo: '',
  nombre: '',
  marca: '',
  catSlug: '',
  precio: '',
  stock: '',
  imagen: '',
}

export default function AdminProductos() {
  const { productos, agregarProducto, eliminarProducto } = useProductos()
  const [form, setForm] = useState(FORM_VACIO)

  const categorias = [...new Map(productos.map((p) => [p.catSlug, p.categoria])).entries()].filter(
    ([slug]) => slug,
  )

  const cambiar = (campo) => (e) => setForm((prev) => ({ ...prev, [campo]: e.target.value }))

  const guardarProducto = (e) => {
    e.preventDefault()

    const codigo = form.codigo.trim().toUpperCase()
    if (productos.some((p) => p.codigo.toUpperCase() === codigo)) {
      alert('El código SKU ingresado ya existe.')
      return
    }

    const [, categoria] = categorias.find(([slug]) => slug === form.catSlug)

    agregarProducto({
      codigo,
      nombre: form.nombre.trim(),
      marca: form.marca.trim(),
      categoria,
      catSlug: form.catSlug,
      precio: parseInt(form.precio, 10),
      stock: parseInt(form.stock, 10),
      imagen: form.imagen.trim(),
    })

    setForm(FORM_VACIO)
    alert(`Producto "${form.nombre.trim()}" agregado con éxito.`)
  }

  const borrarProducto = (codigo) => {
    if (confirm(`¿Estás seguro de que deseas eliminar el producto ${codigo}?`)) {
      eliminarProducto(codigo)
    }
  }

  return (
    <div className="row g-4 mb-4">
      <section className="col-12 col-lg-4">
       <div className="card shadow-sm">
        <div className="card-body">
        <h3 className="h5 fw-bold mb-3">Agregar Producto</h3>
        <form onSubmit={guardarProducto}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Código (SKU)</label>
            <input
              className="form-control"
              type="text"
              required
              placeholder="Ej: GUIT-001"
              value={form.codigo}
              onChange={cambiar('codigo')}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Nombre del Producto</label>
            <input
              className="form-control"
              type="text"
              required
              placeholder="Ej: Guitarra Eléctrica"
              value={form.nombre}
              onChange={cambiar('nombre')}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Marca</label>
            <input
              className="form-control"
              type="text"
              required
              placeholder="Ej: Fender"
              value={form.marca}
              onChange={cambiar('marca')}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Categoría</label>
            <select className="form-select" required value={form.catSlug} onChange={cambiar('catSlug')}>
              <option value="" disabled>
                Selecciona una categoría
              </option>
              {categorias.map(([slug, nombre]) => (
                <option key={slug} value={slug}>
                  {nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Precio ($ CLP)</label>
            <input
              className="form-control"
              type="number"
              min="0"
              required
              placeholder="199990"
              value={form.precio}
              onChange={cambiar('precio')}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Stock Disponible</label>
            <input
              className="form-control"
              type="number"
              min="1"
              required
              placeholder="5"
              value={form.stock}
              onChange={cambiar('stock')}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">URL de Imagen</label>
            <input
              className="form-control"
              type="url"
              required
              placeholder="https://ejemplo.com/foto.jpg"
              value={form.imagen}
              onChange={cambiar('imagen')}
            />
          </div>
          <button type="submit" className="btn btn-dark w-100 fw-bold">
            Guardar en Inventario
          </button>
        </form>
        </div>
       </div>
      </section>

      <section className="col-12 col-lg-8">
       <div className="card shadow-sm">
        <div className="card-body">
        <h3 className="h5 fw-bold mb-3">Productos Registrados</h3>
        <div className="table-responsive" style={{ maxHeight: '480px' }}>
          <table className="table table-striped table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-secondary">
                    No hay productos en inventario.
                  </td>
                </tr>
              ) : (
                productos.map((prod) => (
                  <tr key={prod.codigo}>
                    <td>
                      <strong>{prod.codigo}</strong>
                    </td>
                    <td>
                      <div>
                        <strong>{prod.nombre}</strong>
                      </div>
                      <small style={{ color: '#e91e63' }}>{prod.marca}</small>
                    </td>
                    <td>{prod.categoria || 'Sin categoría'}</td>
                    <td>{clp(prod.precio)}</td>
                    <td>{prod.stock} u.</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => borrarProducto(prod.codigo)}
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        </div>
       </div>
      </section>
    </div>
  )
}
