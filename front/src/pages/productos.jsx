import { useSearchParams } from 'react-router-dom'
import { useProductos } from '../context/ProductosContext'
import ProductoCard from '../components/ProductoCard'

const CODIGOS_EN_OFERTA = ['GA001', 'GA002', 'GA003', 'GA004']
const TITULOS_CATEGORIA = { guitarras: 'Guitarras' }

export default function Productos() {
  const { productos } = useProductos()
  const [params] = useSearchParams()
  const cat = params.get('cat')
  const buscar = params.get('buscar')

  let productosAMostrar = productos
  let titulo = 'Catálogo Completo'

  if (cat) {
    productosAMostrar = productos.filter((p) => p.catSlug === cat.toLowerCase())
      if (productosAMostrar.length > 0) {
        titulo = TITULOS_CATEGORIA[cat.toLowerCase()] || productosAMostrar[0].categoria
    }
  } else if (buscar) {
    const q = buscar.toLowerCase()
    productosAMostrar = productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(q) ||
        p.marca.toLowerCase().includes(q) ||
        (p.categoria && p.categoria.toLowerCase().includes(q)),
    )
    titulo = `Resultados para: "${buscar}"`
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
            <div key={producto.codigo} className="col-12 col-sm-6 col-lg-4 col-xl-3">
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
