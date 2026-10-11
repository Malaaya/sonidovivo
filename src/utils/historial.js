import { CLAVES, leer, guardar } from './storage'

export function obtenerHistorial(run) {
  return leer(CLAVES.historial(run), [])
}

export function registrarCompra(run, items) {
  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  const ahora = new Date()

  const orden = {
    id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
    fecha: ahora.toLocaleDateString('es-CL'),
    hora: ahora.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
    items,
    total,
  }

  guardar(CLAVES.historial(run), [orden, ...obtenerHistorial(run)])
  return orden
}