import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import type { Product } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../context/ToastContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const isOwner = user?.username === product?.username;

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) return;

    try {
      await api.delete(`/api/products/${id}`);
      showToast('Producto eliminado correctamente', 'success');
      navigate('/my-products');
    } catch {
      showToast('Error al eliminar el producto', 'error');
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      showToast('Producto añadido al carrito', 'success');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-light">Cargando...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center bg-light">Producto no encontrado</div>;

  return (
    <div className="min-h-screen bg-light">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-primary hover:underline font-medium">
          ← Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <img 
              src={product.imageUrl || 'https://picsum.photos/id/1015/600/600'} 
              alt={product.title}
              className="w-full rounded-3xl shadow-xl"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-dark">{product.title}</h1>
            <p className="text-3xl font-semibold text-primary mt-3">{product.price.toFixed(2)} €</p>
            
            <div className="flex gap-3 mt-6">
              <span className="px-5 py-2 bg-gray-100 rounded-3xl text-sm">{product.category}</span>
              <span className="px-5 py-2 bg-gray-100 rounded-3xl text-sm">{product.condition}</span>
            </div>

            <p className="mt-8">Publicado por <span className="font-semibold">{product.username}</span></p>

            <div className="my-10 border-t border-b py-8">
              <h3 className="font-semibold mb-4">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-green-600 text-white py-5 rounded-3xl text-xl font-semibold transition"
              >
                🛒 Añadir al carrito
              </button>

              {isOwner && (
                <button
                  onClick={handleDelete}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-3xl text-xl font-semibold transition"
                >
                  🗑 Eliminar producto
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;