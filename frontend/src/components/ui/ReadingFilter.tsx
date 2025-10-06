import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import type { FilterProps } from '../../types';

export const ReadingFilter: React.FC<FilterProps> = ({
  filters,
  onFiltersChange,
  testaments,
  books,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  const handleTestamentChange = (testamentId: string) => {
    const id = testamentId === '' ? undefined : Number(testamentId);
    onFiltersChange({
      ...filters,
      testamentId: id,
      bookId: undefined, // Reset book when testament changes
    });
  };

  const handleBookChange = (bookId: string) => {
    const id = bookId === '' ? undefined : Number(bookId);
    onFiltersChange({
      ...filters,
      bookId: id,
    });
  };

  const handleVersionChange = (version: string) => {
    onFiltersChange({
      ...filters,
      version,
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFiltersChange({
      ...filters,
      search: searchTerm || undefined,
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    onFiltersChange({
      version: 'NVI',
    });
  };

  const availableBooks = filters.testamentId
    ? books.filter(book => book.testamentId === filters.testamentId)
    : books;

  const hasActiveFilters = filters.testamentId || filters.bookId || filters.search;

  return (
    <div className="bg-slate-800 border-b border-slate-700">
      {/* Main Filter Bar */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filtrar leitura
          </h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            {isExpanded ? 'Recolher' : 'Expandir'}
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex space-x-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Palavra-chave"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Buscar
          </button>
        </form>

        {/* Quick Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Testament */}
          <div>
            <label htmlFor="testament" className="block text-sm font-medium text-slate-300 mb-1">
              Livro
            </label>
            <select
              id="testament"
              value={filters.testamentId || ''}
              onChange={(e) => handleTestamentChange(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">1ª Coríntios 1</option>
              {testaments.map(testament => (
                <option key={testament.id} value={testament.id}>
                  {testament.name}
                </option>
              ))}
            </select>
          </div>

          {/* Book */}
          <div>
            <label htmlFor="book" className="block text-sm font-medium text-slate-300 mb-1">
              Capítulo
            </label>
            <select
              id="book"
              value={filters.bookId || ''}
              onChange={(e) => handleBookChange(e.target.value)}
              disabled={!filters.testamentId}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <option value="">1</option>
              {availableBooks.map(book => (
                <option key={book.id} value={book.id}>
                  {book.name}
                </option>
              ))}
            </select>
          </div>

          {/* Version */}
          <div>
            <label htmlFor="version" className="block text-sm font-medium text-slate-300 mb-1">
              Versão
            </label>
            <select
              id="version"
              value={filters.version}
              onChange={(e) => handleVersionChange(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="NVI">NVI</option>
              <option value="ARA">ARA</option>
              <option value="ACF">ACF</option>
              <option value="NAA">NAA</option>
            </select>
          </div>

          {/* Verse Filter */}
          <div>
            <label htmlFor="verse" className="block text-sm font-medium text-slate-300 mb-1">
              Versículo
            </label>
            <select
              id="verse"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos os versículos</option>
              {/* This would be populated based on selected chapter */}
            </select>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="mt-4">
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
              <span>Limpar filtros</span>
            </button>
          </div>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="px-6 py-4 bg-slate-750 border-t border-slate-600">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-2">Resumo do capítulo</h3>
              <p className="text-xs text-slate-400">
                31 versículos exibidos (fora do capítulo atual)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};