import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { ReadingFilter } from '../components/ui/ReadingFilter';
import { VerseCard } from '../components/ui/VerseCard';
import { ProgressPanel } from '../components/ui/ProgressPanel';
import { AnnotationBlock } from '../components/ui/AnnotationBlock';
import { useBible } from '../hooks/useBible';
import { useVerseInteractions } from '../hooks/useVerseInteractions';
import { useAuthenticatedUser } from '../hooks/useAuth';
import type { ReadingFilters, UserStatistics } from '../types';

export const BibleReaderPage: React.FC = () => {
  const { chapterId } = useParams();
  const { user } = useAuthenticatedUser();
  const {
    testaments,
    books,
    verses,
    isLoading: bibleLoading,
    error: bibleError,
    loadChapterWithVerses,
    getCurrentChapterInfo,
  } = useBible();

  const {
    interactions,
    favorites,
    readVerses,
    isLoading: interactionsLoading,
    error: interactionsError,
    loadUserInteractions,
    markAsRead,
    toggleFavorite,
    addComment,
    addObservation,
    getVerseInteractions,
  } = useVerseInteractions();

  const [filters, setFilters] = useState<ReadingFilters>({
    version: 'NVI',
  });

  const [selectedVerse] = useState<number | null>(null);

  // Load initial data
  useEffect(() => {
    if (user) {
      loadUserInteractions();
    }
  }, [user, loadUserInteractions]);

  // Load chapter when URL changes
  useEffect(() => {
    if (chapterId) {
      const numericChapterId = parseInt(chapterId, 10);
      if (!isNaN(numericChapterId)) {
        loadChapterWithVerses(numericChapterId);
      }
    } else {
      // Load default chapter (1 Corinthians 1)
      loadChapterWithVerses(1); // Assuming chapter ID 1 exists
    }
  }, [chapterId, loadChapterWithVerses]);

  const handleVerseAction = async (verseId: number, action: string, value?: string) => {
    switch (action) {
      case 'read':
        await markAsRead(verseId);
        break;
      case 'favorite':
        await toggleFavorite(verseId);
        break;
      case 'comment':
        if (value) await addComment(verseId, value);
        break;
      case 'observation':
        if (value) await addObservation(verseId, value);
        break;
    }
  };

  const handleAnnotationSave = (comment: string, observation: string) => {
    if (selectedVerse) {
      if (comment) handleVerseAction(selectedVerse, 'comment', comment);
      if (observation) handleVerseAction(selectedVerse, 'observation', observation);
    }
  };

  // Calculate user statistics
  const userStatistics: UserStatistics = {
    versesRead: readVerses.length,
    favorites: favorites.length,
    annotations: interactions.filter(i => i.comment || i.observation).length,
  };

  const currentChapterInfo = getCurrentChapterInfo();
  const isLoading = bibleLoading || interactionsLoading;
  const error = bibleError || interactionsError;

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-400 mb-4">Erro ao carregar dados</p>
            <p className="text-slate-400 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      {/* Reading Filter - Below Header */}
      <ReadingFilter
        filters={filters}
        onFiltersChange={setFilters}
        testaments={testaments}
        books={books}
      />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chapter Header */}
            {currentChapterInfo && (
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-bold text-white">
                    {currentChapterInfo.book?.name} {currentChapterInfo.chapter?.number}
                  </h1>
                  <button className="text-slate-400 hover:text-white text-sm">
                    LIMPAR FILTROS
                  </button>
                </div>
                <p className="text-slate-400 text-sm">
                  Versão {filters.version} • {currentChapterInfo.verseCount} versículos exibidos
                </p>
              </div>
            )}

            {/* Verses List */}
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-slate-800 rounded-lg h-32 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {verses.map((verse) => {
                  const verseInteractions = getVerseInteractions(verse.id);
                  
                  return (
                    <VerseCard
                      key={verse.id}
                      verse={verse}
                      interaction={verseInteractions} // Pass all interactions, not just the first one
                      onToggleFavorite={(verseId) => handleVerseAction(verseId, 'favorite')}
                      onMarkAsRead={(verseId) => handleVerseAction(verseId, 'read')}
                      onAddComment={(verseId, comment) => handleVerseAction(verseId, 'comment', comment)}
                      onAddObservation={(verseId, observation) => handleVerseAction(verseId, 'observation', observation)}
                      className={selectedVerse === verse.id ? 'ring-2 ring-blue-500' : ''}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Panel */}
            <ProgressPanel
              statistics={userStatistics}
              currentChapter={currentChapterInfo ? `${currentChapterInfo.book?.name} ${currentChapterInfo.chapter?.number}` : '1ª Coríntios 1'}
              progress={Math.round((userStatistics.versesRead / Math.max(verses.length, 1)) * 100)}
            />

            {/* Annotation Block */}
            <AnnotationBlock
              currentVerse={selectedVerse ? verses.find(v => v.id === selectedVerse)?.text : undefined}
              onSaveAnnotation={handleAnnotationSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
};