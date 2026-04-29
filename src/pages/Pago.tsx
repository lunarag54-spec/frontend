import { useNavigate } from 'react-router-dom';

const Pago = () => {
  const navigate = useNavigate();

  const handleConfirmarPago = () => {
    navigate('/pedido-finalizado');
  };

  return (
    <div className="min-h-screen bg-light">
      <div className="max-w-md mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-dark mb-8 text-center">Datos de la tarjeta</h1>
        
        <div className="bg-white p-8 rounded-3xl shadow space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre en la tarjeta</label>
            <input type="text" className="w-full p-4 border rounded-3xl" placeholder="Juan Pérez" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Número de tarjeta</label>
            <input type="text" className="w-full p-4 border rounded-3xl" placeholder="4242 4242 4242 4242" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Fecha de expiración</label>
              <input type="text" className="w-full p-4 border rounded-3xl" placeholder="MM/AA" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">CVV</label>
              <input type="text" className="w-full p-4 border rounded-3xl" placeholder="123" />
            </div>
          </div>

          <button
            onClick={handleConfirmarPago}
            className="w-full bg-primary hover:bg-green-600 text-white py-5 rounded-3xl text-xl font-semibold mt-8"
          >
            Confirmar Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pago;