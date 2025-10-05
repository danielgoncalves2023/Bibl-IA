import { useState, useEffect } from 'react';

interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T) => void;
  removeValue: () => void;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> {
  // Função para ler do localStorage
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [value, setValue] = useState<T>(readValue);

  // Função para salvar no localStorage
  const setStoredValue = (newValue: T) => {
    try {
      setValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Função para remover do localStorage
  const removeValue = () => {
    try {
      setValue(initialValue);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  };

  // Sincronizar com mudanças no localStorage de outras abas
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        setValue(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return {
    value,
    setValue: setStoredValue,
    removeValue,
  };
}