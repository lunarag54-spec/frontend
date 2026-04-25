import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-72px)] bg-light dark:bg-gray-900">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-dark to-gray-800 text-white py-16 md:py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Compra, vende y <span className="text-primary">reutiliza</span>
          </h1>
          <p className="text-xl md:text-3xl max-w-2xl mx-auto mb-10 text-gray-200">
            Tu marketplace ecológico de segunda mano.<br />
            Videojuegos • Música • Coleccionables • Ropa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products"
              className="bg-primary hover:bg-green-600 text-white text-xl px-10 py-5 rounded-3xl font-semibold transition focus:outline-none focus:ring-4 focus:ring-green-300"
              aria-label="Explorar todos los productos disponibles"
            >
              Explorar productos
            </Link>
            <Link 
              to="/register"
              className="border-2 border-white text-white hover:bg-white hover:text-dark text-xl px-10 py-5 rounded-3xl font-semibold transition focus:outline-none focus:ring-4 focus:ring-white"
              aria-label="Crear una cuenta gratis en EcoSwap"
            >
              Unirme gratis
            </Link>
          </div>
        </div>
      </header>

      {/* Categorías */}
      <section className="max-w-7xl mx-auto px-6 py-16" aria-labelledby="categorias-titulo">
        <h2 id="categorias-titulo" className="text-4xl font-semibold text-center mb-12">Categorías populares</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'videogames', label: 'Videojuegos', emoji: '🎮' },
            { name: 'music', label: 'Música', emoji: '🎵' },
            { name: 'collectibles', label: 'Coleccionables', emoji: '🏆' },
            { name: 'clothing', label: 'Ropa', emoji: '👕' },
          ].map((cat) => (
            <Link 
              key={cat.name}
              to="/products"
              className="bg-white p-8 rounded-3xl shadow hover:shadow-2xl transition-all hover:-translate-y-1 flex flex-col items-center text-center focus:outline-none focus:ring-4 focus:ring-primary"
              aria-label={`Ver productos de categoría ${cat.label}`}
            >
              <div className="text-7xl mb-6">{cat.emoji}</div>
              <p className="font-medium text-xl capitalize">{cat.label}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="bg-dark text-white py-12 text-center">
        <p className="text-gray-400">© 2026 EcoSwap • Consumo responsable y sostenible</p>
      </footer>
    </div>
  );
};

export default Home;