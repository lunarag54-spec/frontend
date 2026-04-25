import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { getErrorMessage } from '../../utils/errors';

const ProductCard = ({ product }: { product: Product }) => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const addToFavorites = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await api.post(`/api/favorites/${product.id}`);
      showToast('¡Añadido a favoritos!', 'success');
    } catch (error) {
      showToast(getErrorMessage(error, 'No se pudo añadir a favoritos'), 'error');
    }
  };

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md overflow-hidden 
                      hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        <div className="relative">
          <img 
            src={product.imageUrl || 'https://via.placeholder.com/300x200?text=Sin+imagen'} 
            alt={product.title}
            className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {isAuthenticated && (
            <button
              type="button"
              onClick={addToFavorites}
              aria-label={`Añadir ${product.title} a favoritos`}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white dark:bg-gray-700 dark:hover:bg-gray-600 
                         text-3xl w-10 h-10 flex items-center justify-center rounded-2xl shadow 
                         transition-all hover:scale-110 active:scale-95"
            >
              ❤️
            </button>
          )}
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <span className="text-primary font-bold text-2xl ml-4">
              {product.price.toFixed(2)} €
            </span>
          </div>
          
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{product.category} • {product.condition}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">por {product.username}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;