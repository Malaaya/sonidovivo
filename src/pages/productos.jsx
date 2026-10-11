import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductos } from '../context/ProductosContext';
import ProductoCard from '../components/ProductoCard';
import EnlaceAdmin from '../components/EnlaceAdmin';

export default function ProductosPage() {
  const { productos, categorias } = useProductos();
  const [searchParams, setSearchParams] = useSearchParams();

  // Obtener parámetros de la URL
  const categoriaUrl = searchParams.get('categoria') || 'todas';
  const busquedaUrl = searchParams.get('q') || '';

  const [categoriaSel, setCategoriaSel] = useState(categoriaUrl);
  const [busquedaText, setBusquedaText] = useState(busquedaUrl);
  const [orden, setOrden] = useState('relevancia');

  // Actualizar estados si la URL cambia dinámicamente
  React.useEffect(() => {
    setCategoriaSel(categoriaUrl);
    setBusquedaText(busquedaUrl);
  }, [categoriaUrl, busquedaUrl]);

  // Filtrar y ordenar productos según la base de datos
  const productosFiltrados = useMemo(() => {
    return productos.filter(producto => {
      // Filtro por Categoría (Soporta catSlug o nombre)
      const coincideCategoria = 
        categoriaSel === 'todas' || 
        producto.catSlug === categoriaSel ||
        producto.categoria?.toLowerCase() === categoriaSel.toLowerCase();

      // Filtro por Búsqueda (Nombre, Marca, Modelo o Descripción)
      const busquedaClean = busquedaText.toLowerCase().trim();
      const coincideBusqueda = !busquedaClean || 
        producto.nombre?.toLowerCase().includes(busquedaClean) ||
        producto.marca?.toLowerCase().includes(busquedaClean) ||
        producto.modelo?.toLowerCase().includes(busquedaClean) ||
        producto.descripcion?.toLowerCase().includes(busquedaClean);

      return coincideCategoria && coincideBusqueda;
    }).sort((a, b) => {
      if (orden === 'precio-asc') return a.precio - b.precio;
      if (orden === 'precio-desc') return b.precio - a.precio;
      if (orden === 'nombre') return a.nombre.localeCompare(b.nombre);
      return 0; // Relevancia / Orden original
    });
  }, [productos, categoriaSel, busquedaText, orden]);

  // Manejadores de cambios
  const handleCategoriaChange = (cat) => {
    setCategoriaSel(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'todas') newParams.delete('categoria');
    else newParams.set('categoria', cat);
    setSearchParams(newParams);
  };

  const handleBusquedaSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (busquedaText.trim()) newParams.set('q', busquedaText.trim());
    else newParams.delete('q');
    setSearchParams(newParams);
  };

  return (
    <div className="container catalog-page">
      <div className="catalog-header">
        <div>
          <h2>Catálogo de Instrumentos</h2>
          <p>Mostrando {productosFiltrados.length} de {productos.length} productos disponibles</p>
        </div>
        <EnlaceAdmin />
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="filters-bar">
        <form onSubmit={handleBusquedaSubmit} className="filter-search-form">
          <input 
            type="text" 
            placeholder="Buscar por marca, modelo..." 
            value={busquedaText}
            onChange={(e) => setBusquedaText(e.target.value)}
          />
          <button type="submit" className="btn btn-primary-sm">Buscar</button>
        </form>

        <div className="filter-controls">
          {/* Selector de Categorías */}
          <select 
            value={categoriaSel} 
            onChange={(e) => handleCategoriaChange(e.target.value)}
            className="select-filter"
          >
            <option value="todas">Todas las categorías</option>
            {categorias && categorias.map(cat => (
              <option key={cat.slug || cat.id} value={cat.slug || cat.nombre}>
                {cat.nombre}
              </option>
            ))}
          </select>

          {/* Selector de Orden */}
          <select 
            value={orden} 
            onChange={(e) => setOrden(e.target.value)}
            className="select-filter"
          >
            <option value="relevancia">Ordenar por: Relevancia</option>
            <option value="precio-asc">Precio: Menor a Mayor</option>
            <option value="precio-desc">Precio: Mayor a Menor</option>
            <option value="nombre">Nombre (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Rejilla de Productos */}
      {productosFiltrados.length > 0 ? (
        <div className="productos-grid">
          {productosFiltrados.map(producto => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h3>No se encontraron productos</h3>
          <p>Intenta cambiar los filtros de búsqueda o categoría.</p>
          <button 
            onClick={() => { handleCategoriaChange('todas'); setBusquedaText(''); setSearchParams({}); }}
            className="btn btn-secondary"
          >
            Limpiar Filtros
          </button>
        </div>
      )}
    </div>
  );
}