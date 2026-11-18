import { useSearchParams } from 'react-router-dom'
import { useProductos } from '../context/ProductosContext'
import ProductoCard from '../components/ProductoCard'

const CODIGOS_EN_OFERTA = ['GA001', 'GA002', 'GA003', 'GA004']

export default function Productos() {
  const { productos, categorias, cargando, error } = useProductos()
  const [params] = useSearchParams()
  const categoriaId = params.get('categoriaId')
  const cat = params.get('cat')
  const buscar = params.get('buscar')

  let productosAMostrar = productos
  let titulo = 'Catálogo Completo'

  if (categoriaId !== null) {
    const categoria = categorias.find((item) => String(item.id) === categoriaId)
    productosAMostrar = productos.filter((producto) => String(producto.categoriaId) === categoriaId)
    titulo = categoria?.nombre || 'Categoría no encontrada'
  } else if (cat) {
    const categoriasCoincidentes = categorias.filter(
      (categoria) => categoria.slug === cat.toLowerCase(),
    )
    const idsCategoria = new Set(categoriasCoincidentes.map((categoria) => categoria.id))
    productosAMostrar = productos.filter((producto) => idsCategoria.has(producto.categoriaId))
    titulo = categoriasCoincidentes.length > 1
      ? categoriasCoincidentes.map((categoria) => categoria.nombre).join(' y ')
      : categoriasCoincidentes[0]?.nombre || 'Categoría no encontrada'
  } else if (buscar) {
    const q = buscar.toLowerCase()
    productosAMostrar = productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(q) ||
        p.marca.toLowerCase().includes(q) ||
        (p.categoriaNombre && p.categoriaNombre.toLowerCase().includes(q)),
    )
    titulo = `Resultados para: "${buscar}"`
  }

  if (cargando) {
    return (
      <main className="container my-4">
        <p className="text-center text-secondary py-5" role="status">
          Cargando productos...
        </p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="container my-4">
        <p className="text-center text-danger py-5" role="alert">
          {error}
        </p>
      </main>
    )
  }

  return (
    <main className="container my-4">
      <div className="text-center mb-4">
        <h2 className="h1 fw-bold">{titulo}</h2>
        <p className="text-secondary">
          Explora todos nuestros instrumentos y equipos con garantía directa.
        </p>
      </div>

      <div className="row g-4">
        {productosAMostrar.length === 0 ? (
          <p className="col-12 text-center text-secondary py-5">
            No se encontraron productos disponibles en esta sección.
          </p>
        ) : (
          productosAMostrar.map((producto) => (
            <div key={producto.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <ProductoCard
                producto={producto}
                oferta={CODIGOS_EN_OFERTA.includes(producto.codigo)}
              />
            </div>
          ))
        )}
      </div>
    </main>
  )
}
