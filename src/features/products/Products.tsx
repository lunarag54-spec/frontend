import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import EmptyState from '../../Components/EmptyState';
import SkeletonCard from '../../Components/SkeletonCard';
import { useProductsLoader } from '../../hooks/useProductsLoader';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { products, loading } = useProductsLoader('/api/products', 'Error al cargar los productos');

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase().trim()),
      ),
    [products, searchTerm],
  );

  return (
    <div className="min-h-[calc(100vh-72px)] bg-light dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold text-dark dark:text-white">Catálogo de Productos</h1>
          
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 p-4 border rounded-3xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-green-100"
            aria-label="Buscar productos"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            title="No se encontraron productos"
            message="Prueba con otros términos de búsqueda"
            icon="🔎"
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;