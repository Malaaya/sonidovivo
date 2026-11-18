import { apiRequest } from './api'

export function crearBoleta(boleta) {
  return apiRequest('/boletas', {
    method: 'POST',
    body: boleta,
  })
}

export function misCompras() {
  return apiRequest('/boletas/mis-compras')
}

export function listarBoletas() {
  return apiRequest('/boletas')
}

export function obtenerBoleta(id) {
  return apiRequest(`/boletas/${id}`)
}
