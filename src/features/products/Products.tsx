import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import EmptyState from '../../Components/EmptyState';
import SkeletonCard from '../../Components/SkeletonCard';
import api from '../../services/api';
import type { Product } from '../../types';
import { useToast } from '../../context/ToastContext';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/products', {
          signal: controller.signal
        });

        // El backend devuelve un Page → extraemos .content
        const data = response.data.content || response.data;
        console.log('✅ Productos recibidos del backend:', data);

        setProducts(Array.isArray(data) ? data : []);
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'CanceledError') return;
        console.error(error);
        showToast('Error al cargar los productos', 'error');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [showToast]);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold text-dark">Catálogo de Productos</h1>
          
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 p-4 border rounded-3xl focus:outline-none focus:border-primary"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            title="No se encontraron productos"
            message="Aún no hay productos publicados"
            icon="📦"
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