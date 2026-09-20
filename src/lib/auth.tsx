"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, XCircle } from "lucide-react";
import { api, clearSession, getToken, getUser, setToken, setUser as persistUser, type User } from "./api";
import AuthModal from "@/components/AuthModal";
import { LogoLoader } from "@/components/Loader";

type ToastType = "success" | "error" | "info";
type Toast = { id: number; message: string; type: ToastType };

type Ctx = {
  user: User | null;
  ready: boolean;
  isAdmin: boolean;
  toast: (message: string, type?: ToastType) => void;
  showLoader: (text?: string) => void;
  hideLoader: () => void;
  openAuth: (mode?: "login" | "register") => void;
  closeAuth: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: Record<string, unknown>) => Promise<void>;
  logout: () => void;
  updateUser: (u: User) => void;
  authOpen: boolean;
  authMode: "login" | "register";
  setAuthMode: (m: "login" | "register") => void;
};

const AuthContext = createContext<Ctx | null>(null);
export const useAuth = () => {
  const c = useContext(AuthContext);
  if (!c) throw new Error("useAuth must be used inside <AuthProvider>");
  return c;
};

const toastStyle: Record<ToastType, string> = {
  success: "border-emerald-400/40 bg-emerald-950/90 text-emerald-100",
  error: "border-red-400/40 bg-red-950/90 text-red-100",
  info: "border-gold/40 bg-charcoal/95 text-paper",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [loader, setLoader] = useState<{ count: number; text: string }>({ count: 0, text: "Loading..." });
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  useEffect(() => {
    if (getToken()) setUserState(getUser());
    setReady(true);
  }, []);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  const showLoader = useCallback((text = "Loading...") => setLoader((l) => ({ count: l.count + 1, text })), []);
  const hideLoader = useCallback(() => setLoader((l) => ({ ...l, count: Math.max(0, l.count - 1) })), []);
  const openAuth = useCallback((mode: "login" | "register" = "login") => { setAuthMode(mode); setAuthOpen(true); }, []);
  const closeAuth = useCallback(() => setAuthOpen(false), []);

  const updateUser = useCallback((u: User) => { persistUser(u); setUserState(u); }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await api.auth.login(email, password);
    setToken(data.token);
    updateUser(data.user);
    toast(data.message || "Login successful", "success");
  }, [toast, updateUser]);

  const register = useCallback(async (payload: Record<string, unknown>) => {
    const data = await api.auth.register(payload);
    setToken(data.token);
    updateUser(data.user);
    toast(data.message || "Registration successful", "success");
  }, [toast, updateUser]);

  const logout = useCallback(() => {
    clearSession();
    setUserState(null);
    window.location.href = "/";
  }, []);

  const value = useMemo<Ctx>(() => ({
    user, ready, isAdmin: user?.role === "admin", toast, showLoader, hideLoader, openAuth, closeAuth,
    login, register, logout, updateUser, authOpen, authMode, setAuthMode,
  }), [user, ready, toast, showLoader, hideLoader, openAuth, closeAuth, login, register, logout, updateUser, authOpen, authMode]);

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal />
      <AnimatePresence>
        {loader.count > 0 && (
          <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/80 backdrop-blur-md">
            <LogoLoader text={loader.text} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="pointer-events-none fixed right-4 top-24 z-[130] flex max-w-[92vw] flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div key={t.id} layout initial={{ opacity: 0, x: 40, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40 }} transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className={`pointer-events-auto flex max-w-sm items-start gap-2.5 rounded-xl border px-4 py-3 text-[14px] font-medium shadow-2xl backdrop-blur ${toastStyle[t.type]}`}>
              {t.type === "success" ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : t.type === "error" ? <XCircle className="mt-0.5 h-4 w-4 shrink-0" /> : <Info className="mt-0.5 h-4 w-4 shrink-0" />}
              <span>{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AuthContext.Provider>
  );
}
