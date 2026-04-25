import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import EmptyState from '../../Components/EmptyState';
import SkeletonCard from '../../Components/SkeletonCard';
import { useProductsLoader } from '../../hooks/useProductsLoader';

const MyProducts = () => {
  const navigate = useNavigate();
  const { products, loading } = useProductsLoader('/api/products/my-products', 'Error al cargar tus productos');

  return (
    <div className="min-h-[calc(100vh-72px)] bg-light dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="mb-8 text-4xl font-bold text-dark dark:text-white">Mis Productos</h1>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            title="Aún no tienes productos"
            message="Empieza a publicar tus artículos de segunda mano"
            icon="📦"
            actionLabel="Publicar producto"
            onAction={() => navigate('/create-product')}
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;