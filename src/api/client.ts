import { Platform } from 'react-native';

// Android emulator can't reach the host machine via localhost, it uses 10.0.2.2 instead.
// For a physical device, set EXPO_PUBLIC_API_URL to your machine's LAN IP, e.g. http://192.168.1.20:4000
const DEFAULT_BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:4000' : 'http://localhost:4000';

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || DEFAULT_BASE_URL;

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export async function apiFetch<T>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new ApiError(data?.error || 'Something went wrong', res.status);
  }
  return data as T;
}
