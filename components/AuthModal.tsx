"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/lib/Toast";

export default function AuthModal() {
  const { authModalOpen, authModalView, closeAuthModal, login, register } = useAuth();
  const { toast } = useToast();
  const [view, setView] = useState<"login" | "register">(authModalView);
  const [loading, setLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");

  if (!authModalOpen) return null;
  const currentView = authModalOpen ? view : authModalView;

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginEmail, loginPassword);
      toast("Login successful — welcome back!", "success");
      closeAuthModal();
    } catch (err: any) {
      toast(err.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  }

  async function onRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!department) {
      toast("Please select your department", "error");
      return;
    }
    setLoading(true);
    try {
      await register({ name, email, phone, department, password });
      toast("Registration successful — welcome to the family!", "success");
      closeAuthModal();
    } catch (err: any) {
      const detail = err.errors && err.errors.length ? err.errors[0].msg : null;
      toast(detail || err.message || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[90] flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && closeAuthModal()}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ type: "spring", damping: 22, stiffness: 260 }}
          className="glass rounded-3xl p-8 sm:p-10 max-w-md w-full relative shadow-elevated"
        >
          <button onClick={closeAuthModal} className="absolute top-5 right-5 text-gray-500 hover:text-primary transition" aria-label="Close">
            <X size={22} />
          </button>

          {currentView === "login" ? (
            <>
              <h2 className="text-3xl font-display font-bold text-primary mb-1">Welcome back</h2>
              <p className="text-gray-500 mb-7 text-sm">Log in to your member account</p>
              <form onSubmit={onLogin} className="space-y-4">
                <Field label="Email" type="email" value={loginEmail} onChange={setLoginEmail} required />
                <Field label="Password" type="password" value={loginPassword} onChange={setLoginPassword} required />
                <SubmitBtn loading={loading}>Login</SubmitBtn>
              </form>
              <p className="mt-6 text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <button className="text-secondary font-bold hover:underline" onClick={() => setView("register")}>
                  Register
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-display font-bold text-primary mb-1">Join the family</h2>
              <p className="text-gray-500 mb-7 text-sm">Create your member account</p>
              <form onSubmit={onRegister} className="space-y-4">
                <Field label="Full Name" value={name} onChange={setName} required />
                <Field label="Email" type="email" value={email} onChange={setEmail} required />
                <Field label="Phone" type="tel" value={phone} onChange={setPhone} />
                <div>
                  <label className="block text-gray-700 mb-1.5 font-semibold text-sm">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary bg-white/60"
                  >
                    <option value="">Select your department</option>
                    <option value="men">Men&apos;s Ministry</option>
                    <option value="women">Women&apos;s Ministry</option>
                    <option value="youth">Youth Fellowship</option>
                  </select>
                </div>
                <Field label="Password" type="password" value={password} onChange={setPassword} required />
                <SubmitBtn loading={loading}>Register</SubmitBtn>
              </form>
              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button className="text-secondary font-bold hover:underline" onClick={() => setView("login")}>
                  Login
                </button>
              </p>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-gray-700 mb-1.5 font-semibold text-sm">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary bg-white/60"
      />
    </div>
  );
}

function SubmitBtn({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="btn-shine w-full bg-gradient-to-r from-primary to-accent text-white py-3.5 rounded-xl font-bold shadow-elevated hover:shadow-glow transition disabled:opacity-60"
    >
      {loading ? "Please wait…" : children}
    </button>
  );
}
