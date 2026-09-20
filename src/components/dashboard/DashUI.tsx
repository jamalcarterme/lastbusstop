"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { InlineLoader } from "../Loader";

export const DEPT_LABELS: Record<string, string> = { men: "Men's Ministry", women: "Women's Ministry", youth: "Youth Fellowship" };
export const AUDIENCE_LABELS: Record<string, string> = { general: "Everyone", men: "Men's Ministry", women: "Women's Ministry", youth: "Youth Fellowship", children: "Children's Dept (Men & Women)" };

export const money = (n: unknown) => "₦" + Number(n || 0).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const fdate = (d?: string) => (d ? new Date(d).toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" }) : "—");
export const fdatetime = (d?: string) => (d ? new Date(d).toLocaleString("en-NG", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "—");

export const inputCls = "w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-[14px] text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30 disabled:bg-navy/5";
export const labelCls = "mb-1.5 block text-[12px] font-semibold uppercase tracking-wide text-navy/60";
export const btnPrimary = "rounded-full bg-navy px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-navy-2 disabled:opacity-60";
export const btnGold = "rounded-full bg-gold px-5 py-2.5 text-[13px] font-semibold text-ink transition hover:bg-gold-light disabled:opacity-60";
export const btnGhost = "rounded-full border border-navy/20 px-5 py-2.5 text-[13px] font-semibold text-navy transition hover:bg-navy/5";
export const btnDanger = "rounded-full bg-red-600 px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-red-700 disabled:opacity-60";
export const smBtn = "rounded-full px-3 py-1 text-[12px] font-semibold transition";

export function useLoad<T = any>(fn: () => Promise<T>, deps: unknown[] = []) {
  const ref = useRef(fn); ref.current = fn;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const reload = useCallback(() => {
    setLoading(true); setError(null);
    ref.current().then(setData).catch(setError).finally(() => setLoading(false));
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(reload, deps);
  return { data, loading, error, reload };
}

export function Async({ loading, error, children, text }: { loading: boolean; error: Error | null; children: ReactNode; text?: string }) {
  if (loading) return <div className="text-navy"><InlineLoader text={text} /></div>;
  if (error) return <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-[14px] text-red-700">{error.message || "Something went wrong."}</div>;
  return <>{children}</>;
}

const badgeCls: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800", approved: "bg-emerald-100 text-emerald-800", rejected: "bg-red-100 text-red-700",
  active: "bg-emerald-100 text-emerald-800", inactive: "bg-slate-200 text-slate-600",
};
export const Badge = ({ status }: { status: string }) => <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${badgeCls[status] || "bg-slate-100"}`}>{status}</span>;

export function StatCard({ label, value, icon, delay = 0 }: { label: string; value: ReactNode; icon: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: delay * 0.07 }} whileHover={{ y: -4 }}
      className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
      <span className="text-2xl">{icon}</span>
      <p className="mt-3 text-[26px] font-bold leading-none text-navy">{value}</p>
      <p className="mt-1.5 text-[13px] text-navy/55">{label}</p>
    </motion.div>
  );
}

export const Panel = ({ title, action, children }: { title?: string; action?: ReactNode; children: ReactNode }) => (
  <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm sm:p-6">
    {(title || action) && <div className="mb-4 flex items-center justify-between gap-3">{title && <h3 className="text-[17px] font-bold text-navy">{title}</h3>}{action}</div>}
    {children}
  </div>
);

export const Table = ({ head, children }: { head: string[]; children: ReactNode }) => (
  <div className="overflow-x-auto rounded-2xl border border-navy/10 bg-white shadow-sm">
    <table className="w-full min-w-[640px] text-left text-[14px] text-navy">
      <thead className="bg-navy/[0.04] text-[12px] uppercase tracking-wide text-navy/55"><tr>{head.map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
      <tbody className="divide-y divide-navy/8 [&_td]:px-4 [&_td]:py-3">{children}</tbody>
    </table>
  </div>
);

export const Empty = ({ children }: { children: ReactNode }) => <div className="rounded-2xl border border-dashed border-navy/20 bg-white p-10 text-center text-[14px] text-navy/50">{children}</div>;

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-ink/60 p-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }} onClick={(e) => e.stopPropagation()} className="my-auto w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">
            <div className="mb-5 flex items-center justify-between"><h3 className="text-[20px] font-bold text-navy">{title}</h3><button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-navy/50 hover:bg-navy/5"><X className="h-5 w-5" /></button></div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
