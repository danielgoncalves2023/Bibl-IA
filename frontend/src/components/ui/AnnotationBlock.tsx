import React, { useState } from 'react';
import { MessageCircle, Eye, Save } from 'lucide-react';

interface AnnotationBlockProps {
  currentVerse?: string;
  onSaveAnnotation?: (comment: string, observation: string) => void;
}

export const AnnotationBlock: React.FC<AnnotationBlockProps> = ({
  currentVerse = '"Paulo, chamado para ser apóstolo de Cristo Jesus pela vontade de Deus, e o irmão Sóstenes,"',
  onSaveAnnotation,
}) => {
  const [comment, setComment] = useState('Paulo é autor');
  const [observation, setObservation] = useState('Quem é Sóstenes?');

  const handleSave = () => {
    if (onSaveAnnotation) {
      onSaveAnnotation(comment, observation);
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" />
          Bloco de anotações
        </h3>
        <span className="text-sm text-slate-400">1ª Coríntios 1:1</span>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm mb-6">
        Comentários e observações são salvos por versículo para que você retome a leitura com contexto.
      </p>

      {/* Current Verse Quote */}
      <div className="bg-slate-700 rounded-lg p-4 mb-6 border-l-4 border-blue-500">
        <p className="text-slate-200 italic text-sm leading-relaxed">
          {currentVerse}
        </p>
      </div>

      {/* Annotation Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Comment Section */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <MessageCircle className="h-4 w-4 text-blue-500" />
            <label htmlFor="comment" className="text-sm font-medium text-slate-300">
              Comentário
            </label>
          </div>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Paulo é autor"
            className="w-full h-32 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Observation Section */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Eye className="h-4 w-4 text-purple-500" />
            <label htmlFor="observation" className="text-sm font-medium text-slate-300">
              Observação
            </label>
          </div>
          <textarea
            id="observation"
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="Quem é Sóstenes?"
            className="w-full h-32 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>
      </div>

      {/* Auto-save Notice */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-700">
        <div className="flex items-center space-x-2 text-slate-500 text-sm">
          <span>🔗</span>
          <span>Mudanças não salvas são indicadas automaticamente.</span>
        </div>
        
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg transition-colors"
        >
          <Save className="h-4 w-4" />
          <span>Nada para salvar</span>
        </button>
      </div>
    </div>
  );
};