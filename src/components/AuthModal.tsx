"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import type { ApiError } from "@/lib/api";

const input = "w-full rounded-xl border border-paper/15 bg-paper/5 px-4 py-3 text-[15px] text-paper placeholder:text-paper/35 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";
const label = "mb-1.5 block text-[13px] font-semibold text-paper/75";

export default function AuthModal() {
  const { authOpen, authMode, setAuthMode, closeAuth, login, register, toast, showLoader, hideLoader } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true); showLoader("Logging you in...");
    try {
      await login(String(f.get("email")).trim(), String(f.get("password")));
      closeAuth(); router.push("/dashboard");
    } catch (err) { toast((err as Error).message || "Login failed", "error"); }
    finally { setBusy(false); hideLoader(); }
  }

  async function onRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const department = String(f.get("department") || "");
    if (!department) return toast("Please select your department", "error");
    setBusy(true); showLoader("Creating your account...");
    try {
      await register({
        name: String(f.get("name")).trim(), email: String(f.get("email")).trim(),
        phone: String(f.get("phone")).trim(), password: String(f.get("password")), department,
      });
      closeAuth(); router.push("/dashboard");
    } catch (err) {
      const e2 = err as ApiError;
      toast(e2.errors?.[0]?.msg || e2.message || "Registration failed", "error");
    } finally { setBusy(false); hideLoader(); }
  }

  const login_ = authMode === "login";
  return (
    <AnimatePresence>
      {authOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeAuth}
          className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-ink/80 p-4 backdrop-blur-md">
          <motion.div initial={{ opacity: 0, y: 40, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }} onClick={(e) => e.stopPropagation()}
            className="relative my-auto w-full max-w-md overflow-hidden rounded-3xl border border-paper/12 bg-charcoal p-8 shadow-2xl sm:p-10">
            <div className="glow-bg pointer-events-none absolute inset-0 opacity-70" />
            <button onClick={closeAuth} aria-label="Close" className="absolute right-5 top-5 rounded-full p-2 text-paper/60 transition hover:bg-paper/10 hover:text-paper"><X className="h-5 w-5" /></button>
            <div className="relative">
              <AnimatePresence mode="wait" initial={false}>
                {login_ ? (
                  <motion.div key="login" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }} transition={{ duration: 0.25 }}>
                    <h2 className="font-display text-[28px] font-semibold">Welcome back</h2>
                    <p className="mt-1 text-[14px] text-paper/60">Log in to your member account.</p>
                    <form onSubmit={onLogin} className="mt-6 space-y-4">
                      <div><label className={label} htmlFor="loginEmail">Email</label><input id="loginEmail" name="email" type="email" required className={input} /></div>
                      <div><label className={label} htmlFor="loginPassword">Password</label><input id="loginPassword" name="password" type="password" required className={input} /></div>
                      <button disabled={busy} className="w-full rounded-full bg-gold py-3.5 text-[13px] font-semibold uppercase tracking-wide text-ink transition hover:bg-gold-light disabled:opacity-60">{busy ? "Logging in..." : "Login"}</button>
                    </form>
                    <p className="mt-6 text-center text-[14px] text-paper/60">New here? <button onClick={() => setAuthMode("register")} className="font-semibold text-gold hover:underline">Register</button></p>
                  </motion.div>
                ) : (
                  <motion.div key="register" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
                    <h2 className="font-display text-[28px] font-semibold">Create an account</h2>
                    <p className="mt-1 text-[14px] text-paper/60">Join the Last Bus Stop family.</p>
                    <form onSubmit={onRegister} className="mt-6 space-y-3.5">
                      <div><label className={label} htmlFor="registerName">Full Name</label><input id="registerName" name="name" required className={input} /></div>
                      <div><label className={label} htmlFor="registerEmail">Email</label><input id="registerEmail" name="email" type="email" required className={input} /></div>
                      <div><label className={label} htmlFor="registerPhone">Phone</label><input id="registerPhone" name="phone" type="tel" className={input} /></div>
                      <div>
                        <label className={label} htmlFor="registerDepartment">Department</label>
                        <select id="registerDepartment" name="department" required defaultValue="" className={input}>
                          <option value="" className="text-ink">Select your department</option>
                          <option value="men" className="text-ink">Men&apos;s Ministry</option>
                          <option value="women" className="text-ink">Women&apos;s Ministry</option>
                          <option value="youth" className="text-ink">Youth Fellowship</option>
                        </select>
                      </div>
                      <div><label className={label} htmlFor="registerPassword">Password</label><input id="registerPassword" name="password" type="password" required className={input} /></div>
                      <button disabled={busy} className="w-full rounded-full bg-gold py-3.5 text-[13px] font-semibold uppercase tracking-wide text-ink transition hover:bg-gold-light disabled:opacity-60">{busy ? "Creating account..." : "Register"}</button>
                    </form>
                    <p className="mt-5 text-center text-[14px] text-paper/60">Already have an account? <button onClick={() => setAuthMode("login")} className="font-semibold text-gold hover:underline">Login</button></p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
