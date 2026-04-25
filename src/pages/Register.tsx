import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { getErrorMessage } from '../utils/errors';

const registerSchema = z.object({
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await api.post('/api/auth/register', data);
      login(response.data.token, { username: response.data.username, role: response.data.role });
      showToast('¡Cuenta creada con éxito!', 'success');
      navigate('/');
    } catch (error) {
      showToast(getErrorMessage(error, 'Error al registrarse'), 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8" aria-label="Crear cuenta en EcoSwap">Crear Cuenta</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label="Formulario de registro">
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
              {...register('email')}
              type="email"
              placeholder="Correo electrónico"
              className="w-full p-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-green-100"
              aria-label="Correo electrónico"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1" role="alert">{errors.email.message}</p>}
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
            {isSubmitting ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;