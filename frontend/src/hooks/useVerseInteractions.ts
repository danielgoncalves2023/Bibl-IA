import { useState, useCallback } from 'react';
import { verseInteractionService } from '../services/verseInteractionService';
import { useAuthenticatedUser } from './useAuth';
import type { VerseInteraction } from '../types';

export const useVerseInteractions = () => {
  const { user, getToken } = useAuthenticatedUser();
  const [interactions, setInteractions] = useState<VerseInteraction[]>([]);
  const [favorites, setFavorites] = useState<VerseInteraction[]>([]);
  const [readVerses, setReadVerses] = useState<VerseInteraction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUserInteractions = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);
      const token = await getToken();

      const [allInteractions, userFavorites, userReadVerses] = await Promise.all([
        verseInteractionService.getInteractionsByUser(user.id, token),
        verseInteractionService.getUserFavorites(user.id, token),
        verseInteractionService.getUserReadVerses(user.id, token),
      ]);

      setInteractions(allInteractions);
      setFavorites(userFavorites);
      setReadVerses(userReadVerses);
    } catch (err) {
      console.error('Failed to load user interactions:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar interações');
    } finally {
      setIsLoading(false);
    }
  }, [user, getToken]);

  const markAsRead = useCallback(async (verseId: number) => {
    if (!user) return;

    try {
      const token = await getToken();
      
      // Check if already read
      const alreadyRead = readVerses.some(i => i.verseId === verseId);
      if (alreadyRead) return; // Don't mark as read if already read
      
      const interaction = await verseInteractionService.markVerseAsRead(verseId, user.id, token);
      
      setReadVerses(prev => [...prev, interaction]);
      setInteractions(prev => [...prev, interaction]);
    } catch (err) {
      console.error('Failed to mark verse as read:', err);
      setError(err instanceof Error ? err.message : 'Erro ao marcar como lido');
    }
  }, [user, getToken, readVerses]);

  const toggleFavorite = useCallback(async (verseId: number) => {
    if (!user) return;

    try {
      const token = await getToken();
      
      // Check if already favorited
      const existingFavorite = favorites.find(i => i.verseId === verseId);
      
      if (existingFavorite) {
        // Remove from favorites
        await verseInteractionService.deleteInteraction(existingFavorite.id, token);
        setFavorites(prev => prev.filter(i => i.verseId !== verseId));
        setInteractions(prev => prev.filter(i => !(i.verseId === verseId && i.interactionType === 'favorite')));
      } else {
        // Add to favorites
        const interaction = await verseInteractionService.toggleVerseAsFavorite(verseId, user.id, token);
        setFavorites(prev => [...prev, interaction]);
        setInteractions(prev => [...prev, interaction]);
      }
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
      setError(err instanceof Error ? err.message : 'Erro ao favoritar');
    }
  }, [user, getToken, favorites]);

  const addComment = useCallback(async (verseId: number, comment: string) => {
    if (!user) return;

    try {
      const token = await getToken();
      
      // Check if there's already a comment interaction for this verse
      const existingComment = interactions.find(i => i.verseId === verseId && i.comment);
      
      if (existingComment) {
        // Update existing comment
        const updatedInteraction = await verseInteractionService.updateComment(existingComment.id, comment, token);
        setInteractions(prev => 
          prev.map(i => i.id === existingComment.id ? updatedInteraction : i)
        );
      } else {
        // Create new comment interaction
        const interaction = await verseInteractionService.addComment(verseId, user.id, comment, token);
        setInteractions(prev => [...prev, interaction]);
      }
    } catch (err) {
      console.error('Failed to add comment:', err);
      setError(err instanceof Error ? err.message : 'Erro ao adicionar comentário');
    }
  }, [user, getToken, interactions]);

  const addObservation = useCallback(async (verseId: number, observation: string) => {
    if (!user) return;

    try {
      const token = await getToken();
      
      // Check if there's already an observation interaction for this verse
      const existingObservation = interactions.find(i => i.verseId === verseId && i.observation);
      
      if (existingObservation) {
        // Update existing observation
        const updatedInteraction = await verseInteractionService.updateObservation(existingObservation.id, observation, token);
        setInteractions(prev => 
          prev.map(i => i.id === existingObservation.id ? updatedInteraction : i)
        );
      } else {
        // Create new observation interaction
        const interaction = await verseInteractionService.addObservation(verseId, user.id, observation, token);
        setInteractions(prev => [...prev, interaction]);
      }
    } catch (err) {
      console.error('Failed to add observation:', err);
      setError(err instanceof Error ? err.message : 'Erro ao adicionar observação');
    }
  }, [user, getToken, interactions]);

  const updateComment = useCallback(async (interactionId: number, comment: string) => {
    try {
      const token = await getToken();
      const updatedInteraction = await verseInteractionService.updateComment(interactionId, comment, token);
      
      setInteractions(prev => 
        prev.map(i => i.id === interactionId ? updatedInteraction : i)
      );
    } catch (err) {
      console.error('Failed to update comment:', err);
      setError(err instanceof Error ? err.message : 'Erro ao atualizar comentário');
    }
  }, [getToken]);

  const deleteInteraction = useCallback(async (interactionId: number) => {
    try {
      const token = await getToken();
      await verseInteractionService.deleteInteraction(interactionId, token);
      
      setInteractions(prev => prev.filter(i => i.id !== interactionId));
      setFavorites(prev => prev.filter(i => i.id !== interactionId));
      setReadVerses(prev => prev.filter(i => i.id !== interactionId));
    } catch (err) {
      console.error('Failed to delete interaction:', err);
      setError(err instanceof Error ? err.message : 'Erro ao deletar interação');
    }
  }, [getToken]);

  const isVerseRead = useCallback((verseId: number) => {
    return readVerses.some(i => i.verseId === verseId);
  }, [readVerses]);

  const isVerseFavorite = useCallback((verseId: number) => {
    return favorites.some(i => i.verseId === verseId);
  }, [favorites]);

  const getVerseInteractions = useCallback((verseId: number) => {
    return interactions.filter(i => i.verseId === verseId);
  }, [interactions]);

  return {
    interactions,
    favorites,
    readVerses,
    isLoading,
    error,
    loadUserInteractions,
    markAsRead,
    toggleFavorite,
    addComment,
    addObservation,
    updateComment,
    deleteInteraction,
    isVerseRead,
    isVerseFavorite,
    getVerseInteractions,
  };
};