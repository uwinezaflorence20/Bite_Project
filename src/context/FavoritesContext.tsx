import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../api/client';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext<{
  favoriteIds: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => Promise<void>;
} | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const reload = useCallback(async () => {
    if (!user) {
      setFavoriteIds([]);
      return;
    }
    const data = await apiFetch<string[]>('/api/favorites');
    setFavoriteIds(data);
  }, [user]);

  useEffect(() => {
    reload();
  }, [reload]);

  const toggleFavorite = async (id: string) => {
    const data = await apiFetch<string[]>(`/api/favorites/${id}`, { method: 'POST' });
    setFavoriteIds(data);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        isFavorite: (id: string) => favoriteIds.includes(id),
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
