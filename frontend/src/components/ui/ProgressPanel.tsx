import React from 'react';
import { BookOpen, Heart, MessageCircle, TrendingUp } from 'lucide-react';
import type { UserStatistics } from '../../types';

interface ProgressPanelProps {
  statistics: UserStatistics;
  currentChapter?: string;
  progress?: number;
}

export const ProgressPanel: React.FC<ProgressPanelProps> = ({
  statistics,
  currentChapter = '1ª Coríntios 1',
  progress = 3,
}) => {
  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Painel de progresso
        </h3>
      </div>

      {/* Current Chapter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-300 mb-2 uppercase tracking-wide">
          Capítulo Atual
        </h4>
        <div className="bg-slate-700 rounded-lg p-4">
          <h5 className="text-xl font-bold text-white mb-1">{progress}% concluído</h5>
          <p className="text-slate-400 text-sm mb-3">{currentChapter}</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-slate-600 rounded-full h-2 mb-3">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="text-xs text-slate-400 space-y-1">
            <p>{statistics.versesRead} versículos lidos no total.</p>
            <p>{statistics.favorites} favoritos ajudam você a revisitar as passagens mais importantes.</p>
            <p>{statistics.annotations} anotações tornam sua leitura realmente personalizada.</p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-300 uppercase tracking-wide">
          Estatísticas Pessoais
        </h4>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Verses Read */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <BookOpen className="h-4 w-4 text-green-500" />
              </div>
              <span className="text-slate-300 text-sm">Versículos lidos</span>
            </div>
            <span className="text-white font-semibold">{statistics.versesRead}</span>
          </div>

          {/* Favorites */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Heart className="h-4 w-4 text-red-500" />
              </div>
              <span className="text-slate-300 text-sm">Favoritos salvos</span>
            </div>
            <span className="text-white font-semibold">{statistics.favorites}</span>
          </div>

          {/* Annotations */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <MessageCircle className="h-4 w-4 text-blue-500" />
              </div>
              <span className="text-slate-300 text-sm">Anotações registradas</span>
            </div>
            <span className="text-white font-semibold">{statistics.annotations}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-slate-700">
        <h4 className="text-sm font-medium text-slate-300 mb-3 uppercase tracking-wide">
          Biblioteca Pessoal
        </h4>
        
        <div className="space-y-2">
          <button className="w-full text-left px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-blue-400 text-sm">📝 Anotações</span>
              <span className="text-blue-300 text-xs">{statistics.annotations}</span>
            </div>
          </button>
          
          <button className="w-full text-left px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-red-400 text-sm">💖 Favoritos</span>
              <span className="text-red-300 text-xs">{statistics.favorites}</span>
            </div>
          </button>
          
          <button className="w-full text-left px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-green-400 text-sm">📚 Lidos</span>
              <span className="text-green-300 text-xs">{statistics.versesRead}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-6 pt-4 border-t border-slate-700">
        <button className="w-full text-center py-2 text-slate-400 hover:text-blue-400 transition-colors text-sm">
          Ver todas as anotações →
        </button>
        <p className="text-xs text-slate-500 text-center mt-1">
          Acesse sua biblioteca pessoal completa
        </p>
      </div>
    </div>
  );
};