import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/ProtectedRoute';
import ToastContainer from './Components/ToastContainer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Pago from './pages/Pago.tsx';
import PedidoFinalizado from './pages/PedidoFinalizado.tsx';

import Products from './features/products/Products';
import ProductDetail from './features/products/ProductDetail';
import MyProducts from './features/products/MyProducts';
import Favorites from './features/products/Favorites';
import CreateProduct from './features/products/CreateProduct';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-light dark:bg-gray-900 text-dark dark:text-gray-100">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/my-products" element={<ProtectedRoute><MyProducts /></ProtectedRoute>} />
                <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
                <Route path="/create-product" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
                
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/pago" element={<ProtectedRoute><Pago /></ProtectedRoute>} />
                <Route path="/pedido-finalizado" element={<ProtectedRoute><PedidoFinalizado /></ProtectedRoute>} />
              </Routes>
              <ToastContainer />
            </div>
          </Router>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;