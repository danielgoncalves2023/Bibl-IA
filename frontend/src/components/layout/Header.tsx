import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LogOut, User } from 'lucide-react';
import { useAuthenticatedUser } from '../../hooks/useAuth';

export const Header: React.FC = () => {
  const { logout } = useAuth0();
  const { user } = useAuthenticatedUser();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white">Bibl-IA</h1>
          <p className="text-slate-400">Sua jornada bíblica com notas inteligentes</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {user && (
            <div className="flex items-center space-x-2 text-slate-300">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">{user.name}</span>
              <span className="text-xs text-slate-500">#{user.id}</span>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            title="Sair"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
};