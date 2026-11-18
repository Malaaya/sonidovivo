import { useState } from 'react'
import { useProductos } from '../context/ProductosContext'
import { clp } from '../utils/formato'

const FORM_VACIO = {
  codigo: '',
  nombre: '',
  marca: '',
  modelo: '',
  descripcion: '',
  categoriaId: '',
  precio: '',
  stock: '',
  imagen: '',
}

export default function AdminProductos() {
  const {
    productos,
    categorias,
    cargando,
    error: errorCarga,
    agregarProducto,
    actualizarProducto,
    eliminarProducto,
  } = useProductos()
  const [form, setForm] = useState(FORM_VACIO)
  const [productoEditando, setProductoEditando] = useState(null)
  const [errorOperacion, setErrorOperacion] = useState(null)
  const [mensaje, setMensaje] = useState('')

  const cambiar = (campo) => (e) => setForm((prev) => ({ ...prev, [campo]: e.target.value }))

  const limpiarFormulario = () => {
    setForm(FORM_VACIO)
    setProductoEditando(null)
  }

  const editarProducto = (producto) => {
    setForm({
      codigo: producto.codigo,
      nombre: producto.nombre,
      marca: producto.marca,
      modelo: producto.modelo || '',
      descripcion: producto.descripcion || '',
      categoriaId: String(producto.categoriaId),
      precio: String(producto.precio),
      stock: String(producto.stock),
      imagen: producto.imagen || '',
    })
    setProductoEditando(producto)
    setErrorOperacion(null)
    setMensaje('')
  }

  const guardarProducto = async (e) => {
    e.preventDefault()

    const codigo = form.codigo.trim().toUpperCase()
    if (productos.some(
      (producto) =>
        producto.codigo.toUpperCase() === codigo && producto.id !== productoEditando?.id,
    )) {
      setErrorOperacion(new Error('Ya existe un producto con ese código SKU.'))
      return
    }

    const producto = {
      codigo,
      nombre: form.nombre.trim(),
      marca: form.marca.trim(),
      modelo: form.modelo.trim() || null,
      descripcion: form.descripcion.trim() || null,
      precio: Number(form.precio),
      stock: Number(form.stock),
      imagen: form.imagen.trim() || null,
      categoriaId: Number(form.categoriaId),
    }

    setErrorOperacion(null)
    setMensaje('')

    try {
      if (productoEditando) {
        await actualizarProducto(productoEditando.id, producto)
        setMensaje(`Producto "${producto.nombre}" actualizado correctamente.`)
      } else {
        await agregarProducto(producto)
        setMensaje(`Producto "${producto.nombre}" agregado correctamente.`)
      }

      limpiarFormulario()
    } catch (error) {
      setErrorOperacion(
        error instanceof Error ? error : new Error('No se pudo guardar el producto.'),
      )
    }
  }

  const borrarProducto = async (id, codigo) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar el producto ${codigo}?`)) return

    setErrorOperacion(null)
    setMensaje('')

    try {
      await eliminarProducto(id)
      setMensaje(`Producto "${codigo}" eliminado correctamente.`)
      if (productoEditando?.id === id) limpiarFormulario()
    } catch (error) {
      setErrorOperacion(
        error instanceof Error ? error : new Error('No se pudo eliminar el producto.'),
      )
    }
  }

  const detallesError = errorOperacion?.details && typeof errorOperacion.details === 'object'
    ? Object.entries(errorOperacion.details)
    : []

  return (
    <>
      {errorCarga && (
        <div className="alert alert-danger" role="alert">
          {errorCarga}
        </div>
      )}
      {errorOperacion && (
        <div className="alert alert-danger" role="alert">
          <strong>{errorOperacion.message}</strong>
          {detallesError.map(([campo, detalle]) => (
            <div key={campo}>{campo}: {detalle}</div>
          ))}
        </div>
      )}
      {mensaje && (
        <div className="alert alert-success" role="status">
          {mensaje}
        </div>
      )}

      <div className="row g-4 mb-4">
      <section className="col-12 col-lg-4">
       <div className="card shadow-sm">
        <div className="card-body">
        <h3 className="h5 fw-bold mb-3">
          {productoEditando ? 'Editar Producto' : 'Agregar Producto'}
        </h3>
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
            <label className="form-label fw-semibold">Modelo</label>
            <input
              className="form-control"
              type="text"
              placeholder="Modelo del producto"
              value={form.modelo}
              onChange={cambiar('modelo')}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Descripción</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Descripción del producto"
              value={form.descripcion}
              onChange={cambiar('descripcion')}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Categoría</label>
            <select
              className="form-select"
              required
              value={form.categoriaId}
              onChange={cambiar('categoriaId')}
            >
              <option value="" disabled>
                Selecciona una categoría
              </option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Precio ($ CLP)</label>
            <input
              className="form-control"
              type="number"
              min="1"
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
              min="0"
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
              placeholder="https://ejemplo.com/foto.jpg"
              value={form.imagen}
              onChange={cambiar('imagen')}
            />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-dark w-100 fw-bold" disabled={cargando}>
              {productoEditando ? 'Guardar cambios' : 'Guardar en Inventario'}
            </button>
            {productoEditando && (
              <button type="button" className="btn btn-outline-secondary" onClick={limpiarFormulario}>
                Cancelar
              </button>
            )}
          </div>
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
              {cargando ? (
                <tr>
                  <td colSpan={6} className="text-center text-secondary" role="status">
                    Cargando productos...
                  </td>
                </tr>
              ) : productos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-secondary">
                    No hay productos en inventario.
                  </td>
                </tr>
              ) : (
                productos.map((prod) => (
                  <tr key={prod.id}>
                    <td>
                      <strong>{prod.codigo}</strong>
                    </td>
                    <td>
                      <div>
                        <strong>{prod.nombre}</strong>
                      </div>
                      <small style={{ color: '#e91e63' }}>{prod.marca}</small>
                    </td>
                    <td>{prod.categoriaNombre || 'Sin categoría'}</td>
                    <td>{clp(prod.precio)}</td>
                    <td>{prod.stock} u.</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => editarProducto(prod)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => borrarProducto(prod.id, prod.codigo)}
                        >
                          🗑️ Eliminar
                        </button>
                      </div>
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
    </>
  )
}
