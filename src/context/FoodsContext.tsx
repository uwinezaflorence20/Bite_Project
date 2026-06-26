import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../api/client';
import { FoodItem } from '../data/food';

const FoodsContext = createContext<{
  foods: FoodItem[];
  loading: boolean;
  error: string | null;
  reload: () => void;
} | null>(null);

export function FoodsProvider({ children }: { children: React.ReactNode }) {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<FoodItem[]>('/api/foods');
      setFoods(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load menu');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <FoodsContext.Provider value={{ foods, loading, error, reload: load }}>
      {children}
    </FoodsContext.Provider>
  );
}

export function useFoods() {
  const ctx = useContext(FoodsContext);
  if (!ctx) throw new Error('useFoods must be used within FoodsProvider');
  return ctx;
}
