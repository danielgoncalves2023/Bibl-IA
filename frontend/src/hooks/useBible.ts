import { useState, useEffect, useCallback } from 'react';
import { bibleService } from '../services/bibleService';
import type { Testament, Book, Chapter, Verse, ReadingFilters } from '../types';

export const useBible = () => {
  const [testaments, setTestaments] = useState<Testament[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const [testamentData, bookData] = await Promise.all([
          bibleService.getTestaments(),
          bibleService.getBooks(),
        ]);
        
        setTestaments(testamentData);
        setBooks(bookData);
      } catch (err) {
        console.error('Failed to load initial bible data:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados da Bíblia');
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const loadChaptersByBook = useCallback(async (bookId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const chapterData = await bibleService.getChaptersByBook(bookId);
      setChapters(chapterData);
    } catch (err) {
      console.error('Failed to load chapters:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar capítulos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadVersesByChapter = useCallback(async (chapterId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const verseData = await bibleService.getVersesByChapter(chapterId);
      setVerses(verseData);
    } catch (err) {
      console.error('Failed to load verses:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar versículos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadChapterWithVerses = useCallback(async (chapterId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { chapter, verses: verseData } = await bibleService.getChapterWithVerses(chapterId);
      setVerses(verseData);
      
      // Update chapters if this chapter isn't already loaded
      setChapters(prev => {
        const existing = prev.find(c => c.id === chapter.id);
        if (existing) return prev;
        return [...prev, chapter];
      });
      
      return { chapter, verses: verseData };
    } catch (err) {
      console.error('Failed to load chapter with verses:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar capítulo');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getBooksByTestament = useCallback((testamentId: number) => {
    return books.filter(book => book.testamentId === testamentId);
  }, [books]);

  const getBookById = useCallback((bookId: number) => {
    return books.find(book => book.id === bookId);
  }, [books]);

  const getChapterById = useCallback((chapterId: number) => {
    return chapters.find(chapter => chapter.id === chapterId);
  }, [chapters]);

  const getTestamentById = useCallback((testamentId: number) => {
    return testaments.find(testament => testament.id === testamentId);
  }, [testaments]);

  // Filter verses based on search criteria
  const filterVerses = useCallback((filters: ReadingFilters) => {
    let filteredVerses = verses;

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredVerses = filteredVerses.filter(verse =>
        verse.text.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.version && filters.version !== 'NVI') {
      filteredVerses = filteredVerses.filter(verse =>
        verse.version === filters.version
      );
    }

    return filteredVerses;
  }, [verses]);

  const getCurrentChapterInfo = useCallback(() => {
    if (verses.length === 0) return null;

    const firstVerse = verses[0];
    const chapter = chapters.find(c => c.id === firstVerse.chapterId);
    const book = chapter ? books.find(b => b.id === chapter.bookId) : null;
    const testament = book ? testaments.find(t => t.id === book.testamentId) : null;

    return {
      chapter,
      book,
      testament,
      verseCount: verses.length,
    };
  }, [verses, chapters, books, testaments]);

  return {
    testaments,
    books,
    chapters,
    verses,
    isLoading,
    error,
    loadChaptersByBook,
    loadVersesByChapter,
    loadChapterWithVerses,
    getBooksByTestament,
    getBookById,
    getChapterById,
    getTestamentById,
    filterVerses,
    getCurrentChapterInfo,
  };
};