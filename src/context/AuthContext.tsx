import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiFetch, setAuthToken } from '../api/client';

export type User = { id: number; name: string; email: string };

const TOKEN_KEY = 'foodgo:token';
const USER_KEY = 'foodgo:user';

const AuthContext = createContext<{
  user: User | null;
  restoring: boolean;
  signup: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [restoring, setRestoring] = useState(true);

  useEffect(() => {
    (async () => {
      const [token, storedUser] = await Promise.all([
        AsyncStorage.getItem(TOKEN_KEY),
        AsyncStorage.getItem(USER_KEY),
      ]);
      if (token && storedUser) {
        setAuthToken(token);
        setUser(JSON.parse(storedUser));
      }
      setRestoring(false);
    })();
  }, []);

  const persist = async (token: string, nextUser: User) => {
    setAuthToken(token);
    setUser(nextUser);
    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(nextUser));
  };

  const signup = async (name: string, email: string, password: string) => {
    const data = await apiFetch<{ token: string; user: User }>('/api/auth/signup', {
      method: 'POST',
      body: { name, email, password },
    });
    await persist(data.token, data.user);
  };

  const login = async (email: string, password: string) => {
    const data = await apiFetch<{ token: string; user: User }>('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    await persist(data.token, data.user);
  };

  const logout = async () => {
    setAuthToken(null);
    setUser(null);
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
  };

  return (
    <AuthContext.Provider value={{ user, restoring, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
