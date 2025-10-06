import createApiClient from './api';
import type { Testament, Book, Chapter, Verse } from '../types';

export class BibleService {
  private getApiClient(token?: string) {
    return createApiClient(token);
  }

  // Testament methods
  async getTestaments(): Promise<Testament[]> {
    const api = this.getApiClient();
    const response = await api.get<Testament[]>('/testaments');
    return response.data;
  }

  async getTestamentById(id: number): Promise<Testament> {
    const api = this.getApiClient();
    const response = await api.get<Testament>(`/testaments/${id}`);
    return response.data;
  }

  // Book methods
  async getBooks(): Promise<Book[]> {
    const api = this.getApiClient();
    const response = await api.get<Book[]>('/books');
    return response.data;
  }

  async getBookById(id: number): Promise<Book> {
    const api = this.getApiClient();
    const response = await api.get<Book>(`/books/${id}`);
    return response.data;
  }

  async getBooksByTestament(testamentId: number): Promise<Book[]> {
    const api = this.getApiClient();
    const response = await api.get<Book[]>(`/books/testament/${testamentId}`);
    return response.data;
  }

  // Chapter methods
  async getChapters(): Promise<Chapter[]> {
    const api = this.getApiClient();
    const response = await api.get<Chapter[]>('/chapters');
    return response.data;
  }

  async getChapterById(id: number): Promise<Chapter> {
    const api = this.getApiClient();
    const response = await api.get<Chapter>(`/chapters/${id}`);
    return response.data;
  }

  async getChaptersByBook(bookId: number): Promise<Chapter[]> {
    const api = this.getApiClient();
    const response = await api.get<Chapter[]>(`/chapters/book/${bookId}`);
    return response.data;
  }

  // Verse methods
  async getVerses(): Promise<Verse[]> {
    const api = this.getApiClient();
    const response = await api.get<Verse[]>('/verses');
    return response.data;
  }

  async getVerseById(id: number): Promise<Verse> {
    const api = this.getApiClient();
    const response = await api.get<Verse>(`/verses/${id}`);
    return response.data;
  }

  async getVersesByChapter(chapterId: number): Promise<Verse[]> {
    const api = this.getApiClient();
    const response = await api.get<Verse[]>(`/verses/chapter/${chapterId}`);
    return response.data;
  }

  async getVersesByVersion(version: string): Promise<Verse[]> {
    const api = this.getApiClient();
    const response = await api.get<Verse[]>(`/verses/version/${version}`);
    return response.data;
  }

  // Combined methods for better UX
  async getChapterWithVerses(chapterId: number): Promise<{ chapter: Chapter; verses: Verse[] }> {
    const [chapter, verses] = await Promise.all([
      this.getChapterById(chapterId),
      this.getVersesByChapter(chapterId)
    ]);
    return { chapter, verses };
  }

  async getBookWithChapters(bookId: number): Promise<{ book: Book; chapters: Chapter[] }> {
    const [book, chapters] = await Promise.all([
      this.getBookById(bookId),
      this.getChaptersByBook(bookId)
    ]);
    return { book, chapters };
  }
}

export const bibleService = new BibleService();