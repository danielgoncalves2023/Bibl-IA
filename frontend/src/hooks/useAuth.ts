import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { userService } from '../services/userService';
import type { User } from '../types';

export const useAuthenticatedUser = () => {
  const { user: auth0User, isAuthenticated, getAccessTokenSilently, isLoading: auth0Loading } = useAuth0();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      if (!isAuthenticated || !auth0User) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Get access token
        const token = await getAccessTokenSilently();

        // Persist user in backend and get the user data
        const user = await userService.persistUser(token);
        setUser(user);

      } catch (err) {
        console.error('Failed to initialize user:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar usuário');
      } finally {
        setIsLoading(false);
      }
    };

    if (!auth0Loading) {
      initializeUser();
    }
  }, [isAuthenticated, auth0User, getAccessTokenSilently, auth0Loading]);

  const getToken = async (): Promise<string> => {
    return await getAccessTokenSilently();
  };

  return {
    user,
    isAuthenticated,
    isLoading: auth0Loading || isLoading,
    error,
    getToken,
    auth0User,
  };
};