import axios from 'axios';

const API_URL = String(import.meta.env.VITE_API_URL ?? 'http://localhost:8081').trim();

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para añadir el token JWT automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de forma centralizada y limpia
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      (axios.isAxiosError<{ message?: string }>(error) && error.response?.data?.message) ||
      (error instanceof Error ? error.message : null) ||
      'Error desconocido en el servidor';

    console.error('[API Error]', {
      url: axios.isAxiosError(error) ? error.config?.url : undefined,
      status: axios.isAxiosError(error) ? error.response?.status : undefined,
      message: errorMessage,
    });

    return Promise.reject(error);
  }
);

export default api;