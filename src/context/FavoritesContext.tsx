import React, { createContext, useContext, useMemo, useState } from 'react';

const FavoritesContext = createContext<{
  favoriteIds: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
} | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const value = useMemo(
    () => ({
      favoriteIds,
      isFavorite: (id: string) => favoriteIds.includes(id),
      toggleFavorite: (id: string) =>
        setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id])),
    }),
    [favoriteIds],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
