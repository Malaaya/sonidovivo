export const CLAVES = {
  PRODUCTOS: 'sonido_vivo_productos',
  CARRITO: 'sonido_vivo_carrito',
  USUARIOS: 'sonido_vivo_usuarios',
  SESION: 'sonido_vivo_sesion',
}

export function leer(clave, porDefecto = null) {
  return JSON.parse(localStorage.getItem(clave)) || porDefecto
}

export function guardar(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor))
}

export function eliminar(clave) {
  localStorage.removeItem(clave)
}