import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { getErrorMessage } from '../utils/errors';

const loginSchema = z.object({
  username: z.string().min(1, 'El nombre de usuario es obligatorio'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await api.post('/api/auth/login', data);
      login(response.data.token, { username: response.data.username, role: response.data.role });
      showToast('¡Inicio de sesión exitoso!', 'success');

      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      showToast(getErrorMessage(error, 'Usuario o contraseña incorrectos'), 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8" aria-label="Iniciar sesión en EcoSwap">Iniciar Sesión</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label="Formulario de inicio de sesión">
          <div>
            <input
              {...register('username')}
              placeholder="Nombre de usuario"
              className="w-full p-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-green-100"
              aria-label="Nombre de usuario"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1" role="alert">{errors.username.message}</p>}
          </div>

          <div>
            <input
              {...register('password')}
              type="password"
              placeholder="Contraseña"
              className="w-full p-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-green-100"
              aria-label="Contraseña"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1" role="alert">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-4 rounded-3xl text-xl font-semibold hover:bg-green-600 transition focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-70"
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-primary hover:underline font-medium">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;