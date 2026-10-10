import { validarRutChileno } from './utils/rut'
import { clp, primerNombre } from './utils/formato'
import { guardar, leer, eliminar } from './utils/storage'

console.log(validarRutChileno('12345678-5'), validarRutChileno('19876543-4'))
console.log(clp(129990), primerNombre('Ángel Martín'))

guardar('prueba', { a: 1 })
console.log(leer('prueba', null), leer('no_existe', 'por defecto'))
eliminar('prueba')

export default function App() {
  return <h1>Prueba utilidades</h1>
}