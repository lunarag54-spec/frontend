import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import type { Product } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../context/ToastContext';
import { getErrorMessage } from '../../utils/errors';
import LoadingSpinner from '../../Components/LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        const message = getErrorMessage(error, 'No se pudo cargar el producto');
        setError(message);
        showToast(message, 'error');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id, showToast]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-72px)] bg-light dark:bg-gray-900">
        <div className="flex items-center justify-center h-[70vh]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[calc(100vh-72px)] bg-light dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center h-[70vh] text-center px-6">
          <p className="text-red-500 text-xl mb-6">{error || 'Producto no encontrado'}</p>
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="bg-primary text-white px-8 py-4 rounded-3xl hover:bg-green-600 transition"
          >
            Volver al catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-light dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-primary hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-primary rounded-xl px-4 py-2"
          aria-label="Volver al catálogo"
        >
          ← Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Imagen */}
          <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-xl">
            <img 
              src={product.imageUrl || 'https://via.placeholder.com/800x800?text=Sin+imagen'} 
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Información */}
          <div>
            <h1 className="text-4xl font-bold text-dark leading-tight">{product.title}</h1>
            <p className="text-4xl font-semibold text-primary mt-4">
              {product.price.toFixed(2)} €
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <span className="px-5 py-2 bg-gray-100 rounded-3xl text-sm font-medium">{product.category}</span>
              <span className="px-5 py-2 bg-gray-100 rounded-3xl text-sm font-medium">{product.condition}</span>
            </div>

            <p className="mt-8 text-gray-500">
              Publicado por <span className="font-semibold text-dark">{product.username}</span>
            </p>

            <div className="my-10 border-t border-b py-8">
              <h2 className="font-semibold mb-4 text-lg">Descripción</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {isAuthenticated && (
              <button
                type="button"
                className="w-full bg-primary hover:bg-green-600 text-white py-5 rounded-3xl text-xl font-semibold transition focus:outline-none focus:ring-4 focus:ring-green-300 mb-4"
              >
                Contactar con el vendedor
              </button>
            )}

            <button
              type="button"
              className="w-full border-2 border-gray-300 hover:border-gray-400 py-5 rounded-3xl text-xl font-medium transition focus:outline-none focus:ring-4 focus:ring-gray-200"
            >
              ❤️ Añadir a favoritos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;