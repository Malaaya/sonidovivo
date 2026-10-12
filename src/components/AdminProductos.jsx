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
    <div className="admin-grid">
      <section className="admin-card">
        <h3>Agregar Producto</h3>
        <form onSubmit={guardarProducto}>
          <div className="form-group">
            <label>Código (SKU)</label>
            <input
              type="text"
              required
              placeholder="Ej: GUIT-001"
              value={form.codigo}
              onChange={cambiar('codigo')}
            />
          </div>
          <div className="form-group">
            <label>Nombre del Producto</label>
            <input
              type="text"
              required
              placeholder="Ej: Guitarra Eléctrica"
              value={form.nombre}
              onChange={cambiar('nombre')}
            />
          </div>
          <div className="form-group">
            <label>Marca</label>
            <input
              type="text"
              required
              placeholder="Ej: Fender"
              value={form.marca}
              onChange={cambiar('marca')}
            />
          </div>
          <div className="form-group">
            <label>Categoría</label>
            <select required value={form.catSlug} onChange={cambiar('catSlug')}>
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
          <div className="form-group">
            <label>Precio ($ CLP)</label>
            <input
              type="number"
              min="0"
              required
              placeholder="199990"
              value={form.precio}
              onChange={cambiar('precio')}
            />
          </div>
          <div className="form-group">
            <label>Stock Disponible</label>
            <input
              type="number"
              min="1"
              required
              placeholder="5"
              value={form.stock}
              onChange={cambiar('stock')}
            />
          </div>
          <div className="form-group">
            <label>URL de Imagen</label>
            <input
              type="url"
              required
              placeholder="https://ejemplo.com/foto.jpg"
              value={form.imagen}
              onChange={cambiar('imagen')}
            />
          </div>
          <button type="submit" className="btn-save">
            Guardar en Inventario
          </button>
        </form>
      </section>

      <section className="admin-card">
        <h3>Productos Registrados</h3>
        <div style={{ overflowX: 'auto', maxHeight: '480px' }}>
          <table className="admin-table">
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
                  <td colSpan={6} style={{ textAlign: 'center', color: '#64748b' }}>
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
                        className="btn-delete-item"
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
      </section>
    </div>
  )
}
