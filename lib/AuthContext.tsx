"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api, LbsmUser } from "./api";

type AuthCtx = {
  user: LbsmUser | null;
  loading: boolean;
  authModalOpen: boolean;
  authModalView: "login" | "register";
  openAuthModal: (view?: "login" | "register") => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: any) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<LbsmUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<"login" | "register">("login");

  useEffect(() => {
    setUserState(api.getUser());
    setLoading(false);
  }, []);

  const openAuthModal = useCallback((view: "login" | "register" = "login") => {
    setAuthModalView(view);
    setAuthModalOpen(true);
  }, []);
  const closeAuthModal = useCallback(() => setAuthModalOpen(false), []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await api.auth.login(email, password);
    api.setToken(data.token);
    api.setUser(data.user);
    setUserState(data.user);
  }, []);

  const register = useCallback(async (payload: any) => {
    const data = await api.auth.register(payload);
    api.setToken(data.token);
    api.setUser(data.user);
    setUserState(data.user);
  }, []);

  const logout = useCallback(() => {
    api.clearSession();
    setUserState(null);
  }, []);

  return (
    <Ctx.Provider value={{ user, loading, authModalOpen, authModalView, openAuthModal, closeAuthModal, login, register, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
