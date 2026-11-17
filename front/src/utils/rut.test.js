import { describe, it, expect } from 'vitest'
import { limpiarRun, validarRutChileno } from './rut'

describe('validarRutChileno', () => {
  it('Acepta un RUN válido', () => {
    expect(validarRutChileno('12345678-5')).toBe(true)
    expect(validarRutChileno('11111111-1')).toBe(true)
  })

  it('Acepta un RUN válido con dígito verificador K', () => {
    expect(validarRutChileno('10000013-K')).toBe(true)
  })

  it('RUN con dígito verificador incorrecto', () => {
    expect(validarRutChileno('19876543-4')).toBe(false)
    expect(validarRutChileno('12345678-9')).toBe(false)
  })

  it('Rechaza un RUN demasiado corto', () => {
    expect(validarRutChileno('1234')).toBe(false)
  })
})

describe('limpiarRun', () => {
  it('Deja solo numeros, K y guion', () => {
    expect(limpiarRun('12.345.678-5abc')).toBe('12345678-5')
  })

  it('pasa la K a mayúscula', () => {
    expect(limpiarRun('10000013-k')).toBe('10000013-K')
  })

  it('Limita el largo a 10 caracteres', () => {
    expect(limpiarRun('123456789012')).toHaveLength(10)
  })
})