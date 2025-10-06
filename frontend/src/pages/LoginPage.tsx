import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center max-w-md mx-auto p-6">
        <h1 className="text-4xl font-bold text-white mb-4">Bibl-IA</h1>
        <p className="text-slate-300 mb-8 text-lg">
          Sua jornada bíblica com notas inteligentes
        </p>
        <p className="text-slate-400 mb-6">
          Filtre livros, capítulos e versículos, organize comentários, destaque favoritos e acompanhe o
          que já foi lido em uma experiência responsiva e profissional.
        </p>
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors text-lg"
        >
          Fazer Login
        </button>
      </div>
    </div>
  );
};