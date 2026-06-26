import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../api/client';
import { useAuth } from './AuthContext';

export type CartLine = {
  id: string;
  name: string;
  code: string;
  price: number;
  image: string;
  qty: number;
};

type CartResponse = {
  items: CartLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
};

const EMPTY_CART: CartResponse = { items: [], subtotal: 0, deliveryFee: 0, total: 0 };

const CartContext = createContext<{
  items: CartLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  totalCount: number;
  loading: boolean;
  addItem: (foodId: string, qty?: number) => Promise<void>;
  removeItem: (foodId: string) => Promise<void>;
  updateQty: (foodId: string, delta: number) => Promise<void>;
  clear: () => Promise<void>;
  reload: () => Promise<void>;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartResponse>(EMPTY_CART);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    if (!user) {
      setCart(EMPTY_CART);
      return;
    }
    setLoading(true);
    try {
      const data = await apiFetch<CartResponse>('/api/cart');
      setCart(data);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    reload();
  }, [reload]);

  const addItem = async (foodId: string, qty = 1) => {
    const data = await apiFetch<CartResponse>('/api/cart', { method: 'POST', body: { foodId, qty } });
    setCart(data);
  };

  const removeItem = async (foodId: string) => {
    const data = await apiFetch<CartResponse>(`/api/cart/${foodId}`, { method: 'DELETE' });
    setCart(data);
  };

  const updateQty = async (foodId: string, delta: number) => {
    const data = await apiFetch<CartResponse>(`/api/cart/${foodId}`, {
      method: 'PATCH',
      body: { delta },
    });
    setCart(data);
  };

  const clear = async () => {
    const data = await apiFetch<CartResponse>('/api/cart', { method: 'DELETE' });
    setCart(data);
  };

  const totalCount = cart.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items: cart.items,
        subtotal: cart.subtotal,
        deliveryFee: cart.deliveryFee,
        total: cart.total,
        totalCount,
        loading,
        addItem,
        removeItem,
        updateQty,
        clear,
        reload,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
