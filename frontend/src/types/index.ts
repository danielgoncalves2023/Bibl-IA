// Tipos utilitários comuns
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export type Theme = 'light' | 'dark' | 'system';

export type Status = 'idle' | 'loading' | 'success' | 'error';

// Tipos para formulários
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number';
  required?: boolean;
  placeholder?: string;
}