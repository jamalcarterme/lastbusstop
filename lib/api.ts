// Last Bus Stop Ministry - API client (ported from the original js/api.js)
// Talks to the same live backend the existing dashboard uses.
const BASE_URL = "https://backend-lastbusstopministry.onrender.com";
const API_URL = `${BASE_URL}/api`;
const TOKEN_KEY = "lbsm_token";
const USER_KEY = "lbsm_user";

export type LbsmUser = {
  name: string;
  email: string;
  role?: string;
  department?: string;
  [key: string]: unknown;
};

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}
export function setToken(token: string) {
  if (typeof window === "undefined" || !token) return;
  window.localStorage.setItem(TOKEN_KEY, token);
}
export function getUser(): LbsmUser | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(window.localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
}
export function setUser(user: LbsmUser) {
  if (typeof window === "undefined" || !user) return;
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}
export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
}
export function isLoggedIn(): boolean {
  return !!getToken();
}

export class ApiError extends Error {
  status?: number;
  errors?: { msg: string }[];
  isNetworkError?: boolean;
}

async function request<T = any>(
  path: string,
  opts: { method?: string; body?: any; isForm?: boolean; params?: Record<string, any> } = {}
): Promise<T> {
  const { method = "GET", body, isForm = false, params } = opts;
  let url = API_URL + path;
  if (params && Object.keys(params).length) {
    const qs = Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null && v !== "")
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
      .join("&");
    if (qs) url += `?${qs}`;
  }

  const headers: Record<string, string> = {};
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let fetchBody: any;
  if (isForm) {
    fetchBody = body;
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    fetchBody = JSON.stringify(body);
  }

  let res: Response;
  try {
    res = await fetch(url, { method, headers, body: fetchBody });
  } catch {
    const err = new ApiError("Could not reach the server. Please check your internet connection and try again.");
    err.isNetworkError = true;
    throw err;
  }

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const err = new ApiError((data && data.message) || `Request failed with status ${res.status}`);
    err.status = res.status;
    err.errors = data && data.errors;
    if (res.status === 401) clearSession();
    throw err;
  }
  return data as T;
}

export const api = {
  BASE_URL,
  API_URL,
  getToken,
  setToken,
  getUser,
  setUser,
  clearSession,
  isLoggedIn,
  get: (path: string, params?: any) => request(path, { method: "GET", params }),
  post: (path: string, body?: any) => request(path, { method: "POST", body }),
  put: (path: string, body?: any) => request(path, { method: "PUT", body }),
  del: (path: string) => request(path, { method: "DELETE" }),

  auth: {
    login: (email: string, password: string) => request<{ token: string; user: LbsmUser; message?: string }>("/auth/login", { method: "POST", body: { email, password } }),
    register: (payload: any) => request<{ token: string; user: LbsmUser; message?: string }>("/auth/register", { method: "POST", body: payload }),
    me: () => request<{ user: LbsmUser }>("/auth/me"),
  },
  announcements: {
    homepage: () => request<{ announcements: any[] }>("/announcements/homepage"),
  },
  paymentAccounts: {
    active: () => request<{ accounts: any[] }>("/payment-accounts/active"),
  },
};
