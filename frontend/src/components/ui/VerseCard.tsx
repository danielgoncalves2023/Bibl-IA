import React, { useState } from 'react';
import { Heart, BookOpen, MessageCircle, Eye, Edit3, Save, X } from 'lucide-react';
import type { VerseCardProps } from '../../types';

export const VerseCard: React.FC<VerseCardProps> = ({
  verse,
  interaction,
  onToggleFavorite,
  onMarkAsRead,
  onAddComment,
  onAddObservation,
  className = '',
}) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [isObserving, setIsObserving] = useState(false);
  const [comment, setComment] = useState('');
  const [observation, setObservation] = useState('');

  // Helper functions to get specific interaction data
  const getInteractionData = () => {
    if (!interaction) return { isFavorite: false, isRead: false, comment: '', observation: '' };
    
    const interactions = Array.isArray(interaction) ? interaction : [interaction];
    
    return {
      isFavorite: interactions.some(i => i.interactionType === 'favorite'),
      isRead: interactions.some(i => i.interactionType === 'read'),
      comment: interactions.find(i => i.comment)?.comment || '',
      observation: interactions.find(i => i.observation)?.observation || ''
    };
  };

  const { isFavorite, isRead, comment: currentComment, observation: currentObservation } = getInteractionData();
  const hasComment = !!currentComment;
  const hasObservation = !!currentObservation;

  // Update local state when interaction prop changes
  React.useEffect(() => {
    setComment(currentComment);
    setObservation(currentObservation);
  }, [currentComment, currentObservation]);

  const handleSaveComment = () => {
    if (comment.trim()) {
      onAddComment(verse.id, comment.trim());
      setIsCommenting(false);
    }
  };

  const handleSaveObservation = () => {
    if (observation.trim()) {
      onAddObservation(verse.id, observation.trim());
      setIsObserving(false);
    }
  };

  const handleCancelComment = () => {
    setComment(currentComment);
    setIsCommenting(false);
  };

  const handleCancelObservation = () => {
    setObservation(currentObservation);
    setIsObserving(false);
  };

  return (
    <div className={`bg-slate-800 rounded-lg border border-slate-700 p-4 hover:border-slate-600 transition-colors ${className}`}>
      {/* Verse Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-blue-400 font-medium text-sm">
            {verse.number}
          </span>
          {isRead && (
            <Eye className="h-4 w-4 text-green-500" />
          )}
          {isFavorite && (
            <Heart className="h-4 w-4 text-red-500 fill-current" />
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onMarkAsRead(verse.id)}
            className={`p-1.5 rounded-md transition-colors ${
              isRead 
                ? 'text-green-500 bg-green-500/20' 
                : 'text-slate-400 hover:text-green-500 hover:bg-green-500/20'
            }`}
            title={isRead ? 'Marcado como lido' : 'Marcar como lido'}
          >
            <BookOpen className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => onToggleFavorite(verse.id)}
            className={`p-1.5 rounded-md transition-colors ${
              isFavorite 
                ? 'text-red-500 bg-red-500/20' 
                : 'text-slate-400 hover:text-red-500 hover:bg-red-500/20'
            }`}
            title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={() => setIsCommenting(!isCommenting)}
            className={`p-1.5 rounded-md transition-colors ${
              hasComment || isCommenting
                ? 'text-blue-500 bg-blue-500/20' 
                : 'text-slate-400 hover:text-blue-500 hover:bg-blue-500/20'
            }`}
            title="Comentário"
          >
            <MessageCircle className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => setIsObserving(!isObserving)}
            className={`p-1.5 rounded-md transition-colors ${
              hasObservation || isObserving
                ? 'text-purple-500 bg-purple-500/20' 
                : 'text-slate-400 hover:text-purple-500 hover:bg-purple-500/20'
            }`}
            title="Observação"
          >
            <Edit3 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Verse Text */}
      <p className="text-slate-200 text-sm leading-relaxed mb-4">
        {verse.text}
      </p>

      {/* Existing Comment */}
      {hasComment && !isCommenting && (
        <div className="mb-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-blue-400 font-medium">Comentário</span>
            <button
              onClick={() => setIsCommenting(true)}
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Edit3 className="h-3 w-3" />
            </button>
          </div>
          <p className="text-slate-300 text-xs">{currentComment}</p>
        </div>
      )}

      {/* Existing Observation */}
      {hasObservation && !isObserving && (
        <div className="mb-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-md">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-purple-400 font-medium">Observação</span>
            <button
              onClick={() => setIsObserving(true)}
              className="text-slate-400 hover:text-purple-400 transition-colors"
            >
              <Edit3 className="h-3 w-3" />
            </button>
          </div>
          <p className="text-slate-300 text-xs">{currentObservation}</p>
        </div>
      )}

      {/* Comment Input */}
      {isCommenting && (
        <div className="mb-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-blue-400 font-medium">Comentário</label>
            <div className="flex items-center space-x-1">
              <button
                onClick={handleSaveComment}
                className="text-green-500 hover:text-green-400 transition-colors"
                title="Salvar"
              >
                <Save className="h-3 w-3" />
              </button>
              <button
                onClick={handleCancelComment}
                className="text-slate-400 hover:text-slate-300 transition-colors"
                title="Cancelar"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Paulo é autor"
            className="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            rows={2}
          />
        </div>
      )}

      {/* Observation Input */}
      {isObserving && (
        <div className="mb-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-md">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-purple-400 font-medium">Observação</label>
            <div className="flex items-center space-x-1">
              <button
                onClick={handleSaveObservation}
                className="text-green-500 hover:text-green-400 transition-colors"
                title="Salvar"
              >
                <Save className="h-3 w-3" />
              </button>
              <button
                onClick={handleCancelObservation}
                className="text-slate-400 hover:text-slate-300 transition-colors"
                title="Cancelar"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
          <textarea
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="Quem é Sóstenes?"
            className="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
            rows={2}
          />
        </div>
      )}

      {/* Auto-save notice */}
      <div className="text-xs text-slate-500 flex items-center">
        <span>Mudanças não salvas são indicadas automaticamente.</span>
      </div>
    </div>
  );
};