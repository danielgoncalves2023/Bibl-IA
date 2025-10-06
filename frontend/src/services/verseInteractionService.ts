import createApiClient from './api';
import type { VerseInteraction, InteractionType } from '../types';

export class VerseInteractionService {
  private getApiClient(token: string) {
    return createApiClient(token);
  }

  async getAllInteractions(token: string): Promise<VerseInteraction[]> {
    const api = this.getApiClient(token);
    const response = await api.get<VerseInteraction[]>('/verse-interactions');
    return response.data;
  }

  async getInteractionById(id: number, token: string): Promise<VerseInteraction> {
    const api = this.getApiClient(token);
    const response = await api.get<VerseInteraction>(`/verse-interactions/${id}`);
    return response.data;
  }

  async getInteractionsByUser(userId: string, token: string): Promise<VerseInteraction[]> {
    const api = this.getApiClient(token);
    const response = await api.get<VerseInteraction[]>(`/verse-interactions/user/${userId}`);
    return response.data;
  }

  async getInteractionsByVerse(verseId: number, token: string): Promise<VerseInteraction[]> {
    const api = this.getApiClient(token);
    const response = await api.get<VerseInteraction[]>(`/verse-interactions/verse/${verseId}`);
    return response.data;
  }

  async getUserFavorites(userId: string, token: string): Promise<VerseInteraction[]> {
    const api = this.getApiClient(token);
    const response = await api.get<VerseInteraction[]>(`/verse-interactions/user/${userId}/favorites`);
    return response.data;
  }

  async getUserReadVerses(userId: string, token: string): Promise<VerseInteraction[]> {
    const api = this.getApiClient(token);
    const response = await api.get<VerseInteraction[]>(`/verse-interactions/user/${userId}/read`);
    return response.data;
  }

  async markVerseAsRead(verseId: number, userId: string, token: string): Promise<VerseInteraction> {
    const api = this.getApiClient(token);
    const response = await api.post<VerseInteraction>(`/verse-interactions/verse/${verseId}/user/${userId}/read`);
    return response.data;
  }

  async toggleVerseAsFavorite(verseId: number, userId: string, token: string): Promise<VerseInteraction> {
    const api = this.getApiClient(token);
    const response = await api.post<VerseInteraction>(`/verse-interactions/verse/${verseId}/user/${userId}/favorite`);
    return response.data;
  }

  async addComment(verseId: number, userId: string, comment: string, token: string): Promise<VerseInteraction> {
    const api = this.getApiClient(token);
    const response = await api.post<VerseInteraction>(`/verse-interactions/verse/${verseId}/user/${userId}/comment`, {
      comment,
    });
    return response.data;
  }

  async addObservation(verseId: number, userId: string, observation: string, token: string): Promise<VerseInteraction> {
    const api = this.getApiClient(token);
    const response = await api.post<VerseInteraction>(`/verse-interactions/verse/${verseId}/user/${userId}/observation`, {
      observation,
    });
    return response.data;
  }

  async updateInteraction(
    id: number,
    updates: Partial<{
      comment: string;
      observation: string;
      interactionType: InteractionType;
    }>,
    token: string
  ): Promise<VerseInteraction> {
    const api = this.getApiClient(token);
    const response = await api.patch<VerseInteraction>(`/verse-interactions/${id}`, updates);
    return response.data;
  }

  async deleteInteraction(id: number, token: string): Promise<void> {
    const api = this.getApiClient(token);
    await api.delete(`/verse-interactions/${id}`);
  }

  async updateComment(id: number, comment: string, token: string): Promise<VerseInteraction> {
    return this.updateInteraction(id, { comment }, token);
  }

  async updateObservation(id: number, observation: string, token: string): Promise<VerseInteraction> {
    return this.updateInteraction(id, { observation }, token);
  }
}

export const verseInteractionService = new VerseInteractionService();