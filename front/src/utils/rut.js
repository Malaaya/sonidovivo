export function limpiarRun(valor) {
  let run = valor.toUpperCase().replace(/[^0-9K-]/g, '')
  if (run.length > 10) run = run.slice(0, 10)
  return run
}

export function validarRutChileno(rut) {
  const limpio = rut.replace(/[^0-9kK]/g, '').toUpperCase()
  if (limpio.length < 8) return false

  const cuerpo = limpio.slice(0, -1)
  const digitoIngresado = limpio.slice(-1)

  let suma = 0
  let factor = 2
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * factor
    factor = factor === 7 ? 2 : factor + 1
  }

  const resto = 11 - (suma % 11)
  let digitoEsperado
  if (resto === 11) digitoEsperado = '0'
  else if (resto === 10) digitoEsperado = 'K'
  else digitoEsperado = String(resto)

  return digitoIngresado === digitoEsperado
}