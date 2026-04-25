import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { getErrorMessage } from '../../utils/errors';

const createProductSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'El precio debe ser un número mayor a 0'
  }),
  category: z.enum(['videogames', 'music', 'collectibles', 'clothing']),
  condition: z.enum(['NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR']),
  imageUrl: z.string().url('La URL debe ser válida').optional().or(z.literal('')),
});

type CreateProductForm = z.infer<typeof createProductSchema>;

const CreateProduct = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateProductForm>({
    resolver: zodResolver(createProductSchema)
  });

  const onSubmit = async (data: CreateProductForm) => {
    try {
      await api.post('/api/products', {
        ...data,
        price: Number.parseFloat(data.price),
        imageUrl: data.imageUrl || undefined,
      });
      showToast('¡Producto publicado con éxito!', 'success');
      navigate('/my-products');
    } catch (error) {
      showToast(getErrorMessage(error, 'Error al publicar el producto'), 'error');
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-light dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <h1 className="mb-8 text-center text-4xl font-bold text-dark dark:text-white md:text-left">Publicar nuevo producto</h1>

        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="bg-white p-6 md:p-8 rounded-3xl shadow-lg space-y-6"
          aria-label="Formulario para publicar producto"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Título *</label>
            <input
              {...register('title')}
              className="w-full p-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-green-100"
              placeholder="Ej: PS5 Slim edición God of War"
              aria-label="Título del producto"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1" role="alert">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción *</label>
            <textarea
              {...register('description')}
              rows={5}
              className="w-full p-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-green-100"
              placeholder="Describe el producto con detalle..."
              aria-label="Descripción del producto"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1" role="alert">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio (€) *</label>
              <input
                {...register('price')}
                type="number"
                step="0.01"
                className="w-full p-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-green-100"
                aria-label="Precio del producto"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1" role="alert">{errors.price.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría *</label>
              <select 
                {...register('category')} 
                className="w-full p-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-green-100"
                aria-label="Categoría"
              >
                <option value="videogames">Videojuegos</option>
                <option value="music">Música</option>
                <option value="collectibles">Coleccionables</option>
                <option value="clothing">Ropa</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estado *</label>
            <select 
              {...register('condition')} 
              className="w-full p-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-green-100"
              aria-label="Estado del producto"
            >
              <option value="NEW">Nuevo</option>
              <option value="LIKE_NEW">Como nuevo</option>
              <option value="GOOD">Bueno</option>
              <option value="FAIR">Aceptable</option>
              <option value="POOR">Regular</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL de imagen (opcional)</label>
            <input
              {...register('imageUrl')}
              className="w-full p-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-green-100"
              placeholder="https://..."
              aria-label="URL de la imagen"
            />
            {errors.imageUrl && <p className="text-red-500 text-sm mt-1" role="alert">{errors.imageUrl.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-5 rounded-3xl text-xl font-semibold hover:bg-green-600 transition focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-70"
          >
            {isSubmitting ? 'Publicando producto...' : 'Publicar producto'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;