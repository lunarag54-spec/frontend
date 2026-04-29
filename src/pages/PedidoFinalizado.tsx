import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const PedidoFinalizado = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const handleVolverInicio = () => {
    clearCart();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-light flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        <div className="text-8xl mb-8">🎉</div>
        <h1 className="text-5xl font-bold text-dark mb-4">¡Pedido realizado con éxito!</h1>
        <p className="text-xl text-gray-600 mb-12">
          Los productos han sido eliminados de la base de datos.<br />
          Gracias por tu compra en EcoSwap.
        </p>
        
        <button
          onClick={handleVolverInicio}
          className="bg-primary hover:bg-green-600 text-white px-10 py-5 rounded-3xl text-xl font-semibold transition"
        >
          Volver a la página principal
        </button>
      </div>
    </div>
  );
};

export default PedidoFinalizado;