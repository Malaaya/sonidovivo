import { apiRequest } from './api'

export function listarProductos(categoriaId) {
  const filtro = categoriaId == null ? '' : `?categoriaId=${encodeURIComponent(categoriaId)}`
  return apiRequest(`/productos${filtro}`, { authenticated: false })
}

export function obtenerProducto(id) {
  return apiRequest(`/productos/${id}`, { authenticated: false })
}

export function crearProducto(producto) {
  return apiRequest('/productos', {
    method: 'POST',
    body: producto,
  })
}

export function actualizarProducto(id, producto) {
  return apiRequest(`/productos/${id}`, {
    method: 'PUT',
    body: producto,
  })
}

export function eliminarProducto(id) {
  return apiRequest(`/productos/${id}`, { method: 'DELETE' })
}

export function listarCategorias() {
  return apiRequest('/categorias', { authenticated: false })
}
