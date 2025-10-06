import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';

// Create axios instance with base configuration
const createApiClient = (token?: string): AxiosInstance => {
  const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add auth token if provided
  if (token) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        console.error('Unauthorized access - redirecting to login');
        // You can add redirect logic here
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export default createApiClient;