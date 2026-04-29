import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <nav className="bg-dark text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="EcoSwap Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold tracking-tight">EcoSwap</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/products" className="hover:text-primary transition">Catálogo</Link>
            {isAuthenticated && (
              <>
                <Link to="/my-products" className="hover:text-primary transition">Mis productos</Link>
                <Link to="/favorites" className="hover:text-primary transition">Favoritos</Link>
              </>
            )}
          </div>

          {/* Acciones del usuario */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-300">Hola, {user?.username}</span>

                {/* Botón Carrito */}
                <Link
                  to="/cart"
                  className="relative flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-5 py-2.5 rounded-2xl transition"
                >
                  🛒
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>

                {/* Botón Publicar producto */}
                <Link
                  to="/create-product"
                  className="bg-primary hover:bg-green-600 px-6 py-2.5 rounded-2xl text-sm font-semibold transition flex items-center gap-2"
                >
                  <span className="text-lg">＋</span>
                  Publicar producto
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl text-sm transition"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-primary transition">Iniciar sesión</Link>
                <Link to="/register" className="bg-primary hover:bg-green-600 px-6 py-2 rounded-xl transition">
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 bg-dark border-t border-gray-700 py-4 flex flex-col gap-4">
            <Link to="/products" className="px-4 py-3 hover:bg-gray-700 rounded-xl" onClick={() => setMenuOpen(false)}>Catálogo</Link>
            {isAuthenticated && (
              <>
                <Link to="/my-products" className="px-4 py-3 hover:bg-gray-700 rounded-xl" onClick={() => setMenuOpen(false)}>Mis productos</Link>
                <Link to="/favorites" className="px-4 py-3 hover:bg-gray-700 rounded-xl" onClick={() => setMenuOpen(false)}>Favoritos</Link>
                <Link to="/cart" className="px-4 py-3 hover:bg-gray-700 rounded-xl" onClick={() => setMenuOpen(false)}>🛒 Carrito ({getTotalItems()})</Link>
                <Link to="/create-product" className="mx-4 bg-primary text-white py-3 text-center rounded-2xl font-semibold" onClick={() => setMenuOpen(false)}>Publicar producto</Link>
              </>
            )}
            {isAuthenticated ? (
              <button onClick={handleLogout} className="mx-4 bg-red-600 text-white py-3 rounded-xl">Cerrar sesión</button>
            ) : (
              <div className="flex flex-col gap-3 px-4">
                <Link to="/login" className="py-3 text-center border border-gray-400 rounded-xl" onClick={() => setMenuOpen(false)}>Iniciar sesión</Link>
                <Link to="/register" className="py-3 text-center bg-primary rounded-xl" onClick={() => setMenuOpen(false)}>Registrarse</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;