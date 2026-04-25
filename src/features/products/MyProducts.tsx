import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import EmptyState from '../../Components/EmptyState';
import SkeletonCard from '../../Components/SkeletonCard';
import api from '../../services/api';
import type { Product } from '../../types';
import { useToast } from '../../context/ToastContext';

const MyProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const controller = new AbortController();

    const fetchMyProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/products/my-products', {
          signal: controller.signal
        });

        console.log('✅ Mis productos recibidos:', response.data);
        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'CanceledError') return;
        console.error(error);
        showToast('Error al cargar tus productos', 'error');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();

    return () => controller.abort();
  }, [showToast]);

  return (
    <div className="min-h-screen bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-4xl font-bold text-dark mb-8">Mis Productos</h1>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            title="Aún no tienes productos"
            message="Empieza a publicar tus artículos de segunda mano"
            icon="📦"
            actionLabel="Publicar producto"
            onAction={() => window.location.href = '/create-product'}
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
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