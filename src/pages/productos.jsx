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
    <main
      className="shop-section-container"
      style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}
    >
      <div
        className="shop-header-intro"
        style={{ textAlign: 'center', marginBottom: '2rem' }}
      >
        <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '0.5rem' }}>
          {titulo}
        </h2>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          Explora todos nuestros instrumentos y equipos con garantía directa.
        </p>
      </div>

      <div className="products-shelf-grid">
        {productosAMostrar.length === 0 ? (
          <p
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '3rem',
              color: '#64748b',
            }}
          >
            No se encontraron productos disponibles en esta sección.
          </p>
        ) : (
          productosAMostrar.map((producto) => (
            <ProductoCard
              key={producto.codigo}
              producto={producto}
              oferta={CODIGOS_EN_OFERTA.includes(producto.codigo)}
            />
          ))
        )}
      </div>
    </main>
  )
}
