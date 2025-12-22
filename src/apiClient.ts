// Centralized API client using fetch, attaches JWT, handles base URL and errors
// Uses types from types.ts

import { AuthLoginRequest, AuthLoginResponse, User } from "./types";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "/api/v1";

let token: string | null = null;

export function setAuthToken(newToken: string | null) {
  token = newToken;
}

function getHeaders(isJson = true): HeadersInit {
  const headers: HeadersInit = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (isJson) headers["Content-Type"] = "application/json";
  return headers;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  isJson = true
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...getHeaders(isJson),
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    let error: any = { status: res.status };
    try {
      error.body = await res.json();
    } catch {}
    throw error;
  }
  if (res.status === 204) return undefined as any;
  return isJson ? res.json() : (res as any);
}
