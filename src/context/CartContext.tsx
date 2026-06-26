import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { FoodItem } from '../data/food';

export type CartLine = {
  id: string;
  name: string;
  code: string;
  price: number;
  image: string;
  qty: number;
};

type State = { items: CartLine[] };

type Action =
  | { type: 'ADD'; item: FoodItem; qty: number }
  | { type: 'REMOVE'; id: string }
  | { type: 'UPDATE_QTY'; id: string; delta: number }
  | { type: 'CLEAR' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, qty: i.qty + action.qty } : i,
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            id: action.item.id,
            name: action.item.name,
            code: action.item.code,
            price: action.item.price,
            image: action.item.image,
            qty: action.qty,
          },
        ],
      };
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.id !== action.id) };
    case 'UPDATE_QTY':
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: Math.max(1, i.qty + action.delta) } : i,
        ),
      };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

const DELIVERY_FEE = 2.5;

const CartContext = createContext<{
  items: CartLine[];
  addItem: (item: FoodItem, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  clear: () => void;
  totalCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  const value = useMemo(() => {
    const subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const totalCount = state.items.reduce((sum, i) => sum + i.qty, 0);
    const deliveryFee = state.items.length ? DELIVERY_FEE : 0;
    return {
      items: state.items,
      addItem: (item: FoodItem, qty = 1) => dispatch({ type: 'ADD', item, qty }),
      removeItem: (id: string) => dispatch({ type: 'REMOVE', id }),
      updateQty: (id: string, delta: number) => dispatch({ type: 'UPDATE_QTY', id, delta }),
      clear: () => dispatch({ type: 'CLEAR' }),
      totalCount,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
