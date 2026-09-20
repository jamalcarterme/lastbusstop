/* eslint-disable @typescript-eslint/no-explicit-any */
// Last Bus Stop Ministry — API client (typed port of js/api.js). Same backend, same endpoints.
export const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "https://backend-lastbusstopministry.onrender.com").replace(/\/$/, "");
export const API_URL = BASE_URL + "/api";
const TOKEN_KEY = "lbsm_token";
const USER_KEY = "lbsm_user";

export type User = { _id?: string; name: string; email: string; phone?: string; role?: string; department?: string };
export type R = any; // backend response payloads

const ls = () => (typeof window === "undefined" ? null : window.localStorage);
export const getToken = () => ls()?.getItem(TOKEN_KEY) ?? null;
export const setToken = (t?: string) => { if (t) ls()?.setItem(TOKEN_KEY, t); };
export const getUser = (): User | null => {
  try { return JSON.parse(ls()?.getItem(USER_KEY) || "null"); } catch { return null; }
};
export const setUser = (u?: User | null) => { if (u) ls()?.setItem(USER_KEY, JSON.stringify(u)); };
export const clearSession = () => { ls()?.removeItem(TOKEN_KEY); ls()?.removeItem(USER_KEY); };
export const isLoggedIn = () => !!getToken();

export class ApiError extends Error {
  status?: number;
  errors?: { msg: string }[];
  isNetworkError?: boolean;
}

type Opts = { method?: string; body?: unknown; isForm?: boolean; params?: Record<string, unknown> };

async function request(path: string, { method = "GET", body, isForm = false, params }: Opts = {}): Promise<R> {
  let url = API_URL + path;
  if (params) {
    const qs = Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null && v !== "")
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
      .join("&");
    if (qs) url += "?" + qs;
  }
  const headers: Record<string, string> = {};
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  let fetchBody: BodyInit | undefined;
  if (isForm) fetchBody = body as FormData;
  else if (body !== undefined) { headers["Content-Type"] = "application/json"; fetchBody = JSON.stringify(body); }

  let res: Response;
  try {
    res = await fetch(url, { method, headers, body: fetchBody });
  } catch {
    const err = new ApiError("Could not reach the server. Please check your internet connection and try again.");
    err.isNetworkError = true;
    throw err;
  }
  let data: any = null;
  try { data = await res.json(); } catch { data = null; }
  if (!res.ok) {
    const err = new ApiError((data && data.message) || `Request failed with status ${res.status}`);
    err.status = res.status;
    err.errors = data && data.errors;
    if (res.status === 401) clearSession();
    throw err;
  }
  return data;
}

const send = (method: string) => (path: string, body?: unknown) => request(path, { method, body });

export const api = {
  auth: {
    login: (email: string, password: string) => send("POST")("/auth/login", { email, password }),
    register: (payload: Record<string, unknown>) => send("POST")("/auth/register", payload),
    me: () => request("/auth/me"),
    updateMe: (payload: Record<string, unknown>) => send("PUT")("/auth/me", payload),
    changePassword: (currentPassword: string, newPassword: string) => send("PUT")("/auth/me/password", { currentPassword, newPassword }),
  },
  announcements: {
    homepage: () => request("/announcements/homepage"),
    visible: () => request("/announcements/visible"),
    all: (params?: Record<string, unknown>) => request("/announcements", { params }),
    create: (p: Record<string, unknown>) => send("POST")("/announcements", p),
    update: (id: string, p: Record<string, unknown>) => send("PUT")(`/announcements/${id}`, p),
    remove: (id: string) => request(`/announcements/${id}`, { method: "DELETE" }),
  },
  receipts: {
    upload: (formData: FormData) => request("/receipts", { method: "POST", body: formData, isForm: true }),
    mine: (params?: Record<string, unknown>) => request("/receipts/my", { params }),
    all: (params?: Record<string, unknown>) => request("/receipts", { params }),
    approve: (id: string, adminNotes = "") => send("PUT")(`/receipts/${id}/approve`, { adminNotes }),
    reject: (id: string, adminNotes: string) => send("PUT")(`/receipts/${id}/reject`, { adminNotes }),
  },
  paymentAccounts: {
    active: () => request("/payment-accounts/active"),
    all: () => request("/payment-accounts"),
    create: (p: Record<string, unknown>) => send("POST")("/payment-accounts", p),
    update: (id: string, p: Record<string, unknown>) => send("PUT")(`/payment-accounts/${id}`, p),
    remove: (id: string) => request(`/payment-accounts/${id}`, { method: "DELETE" }),
    toggle: (id: string) => send("PUT")(`/payment-accounts/${id}/toggle`),
  },
  notifications: {
    list: (params?: Record<string, unknown>) => request("/notifications", { params }),
    unreadCount: () => request("/notifications/unread-count"),
    markRead: (id: string) => send("PUT")(`/notifications/${id}/read`),
    markAllRead: () => send("PUT")("/notifications/read-all"),
  },
  admin: {
    members: (params?: Record<string, unknown>) => request("/admin/members", { params }),
    toggleMemberStatus: (id: string) => send("PUT")(`/admin/members/${id}/status`),
    deleteMember: (id: string) => request(`/admin/members/${id}`, { method: "DELETE" }),
    auditLogs: (params?: Record<string, unknown>) => request("/admin/audit-logs", { params }),
  },
  analytics: {
    overview: () => request("/analytics"),
    department: () => request("/analytics/department"),
    monthly: (year: number) => request("/analytics/monthly", { params: { year } }),
  },
};
