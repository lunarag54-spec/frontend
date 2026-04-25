import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/ProtectedRoute';
import ToastContainer from './Components/ToastContainer';
import { Suspense, lazy } from 'react';
import LoadingSpinner from './Components/LoadingSpinner';
import ErrorBoundary from './Components/ErrorBoundary';
import EmptyState from './Components/EmptyState';

// Lazy loading de páginas pesadas
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

const Products = lazy(() => import('./features/products/Products'));
const ProductDetail = lazy(() => import('./features/products/ProductDetail'));
const MyProducts = lazy(() => import('./features/products/MyProducts'));
const Favorites = lazy(() => import('./features/products/Favorites'));
const CreateProduct = lazy(() => import('./features/products/CreateProduct'));

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ErrorBoundary>
          <Router>
            <div className="min-h-screen bg-light text-dark dark:bg-gray-900 dark:text-gray-100">
              <Navbar />
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/my-products" element={<ProtectedRoute><MyProducts /></ProtectedRoute>} />
                  <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
                  <Route path="/create-product" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
                  <Route
                    path="*"
                    element={
                      <EmptyState
                        title="Pagina no encontrada"
                        message="La ruta que buscas no existe."
                        icon="404"
                      />
                    }
                  />
                </Routes>
              </Suspense>
              <ToastContainer />
            </div>
          </Router>
        </ErrorBoundary>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;