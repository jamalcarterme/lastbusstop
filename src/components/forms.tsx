"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Copy, Landmark, LogIn, Send } from "lucide-react";
import { api, isLoggedIn, type R } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { waLink } from "@/lib/site";
import { InlineLoader } from "./Loader";

const field = "w-full rounded-xl border border-paper/15 bg-paper/5 px-4 py-3 text-[15px] text-paper placeholder:text-paper/35 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";
const lab = "mb-1.5 block text-[13px] font-semibold text-paper/75";

/** Prayer request → straight to the prayer team on WhatsApp. */
export function PrayerForm() {
  const { toast } = useAuth();
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const anon = f.get("anon") === "on";
    const msg = `Prayer request${anon ? " (please keep my name private)" : ""}\n\nName: ${anon ? "Anonymous" : f.get("name")}\nCategory: ${f.get("category")}\n\n${f.get("request")}`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    toast("Opening WhatsApp to send your request. God bless you.", "success");
    e.currentTarget.reset();
  }
  return (
    <form onSubmit={submit} className="glass space-y-5 rounded-3xl p-7 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className={lab} htmlFor="pname">Your name</label><input id="pname" name="name" className={field} placeholder="Full name" /></div>
        <div><label className={lab} htmlFor="pcat">Category</label>
          <select id="pcat" name="category" className={field} defaultValue="General">
            {["General", "Healing", "Family", "Finances & Work", "Salvation", "Thanksgiving"].map((c) => <option key={c} className="text-ink">{c}</option>)}
          </select></div>
      </div>
      <div><label className={lab} htmlFor="preq">Prayer request</label><textarea id="preq" name="request" required rows={6} className={field} placeholder="Share what you'd like us to stand with you in prayer for..." /></div>
      <label className="flex items-center gap-2.5 text-[14px] text-paper/70"><input type="checkbox" name="anon" className="h-4 w-4 accent-[#f9a826]" /> Keep my name private</label>
      <button className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-[13px] font-semibold uppercase tracking-wide text-ink transition hover:bg-gold-light sm:w-auto">
        Send prayer request <Send className="h-4 w-4 transition group-hover:translate-x-1" />
      </button>
    </form>
  );
}

export function MessageForm() {
  const { toast } = useAuth();
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    window.open(waLink(`Hello Last Bus Stop Ministry, my name is ${f.get("name")}${f.get("phone") ? ` (${f.get("phone")})` : ""}.\n\n${f.get("message")}`), "_blank", "noopener,noreferrer");
    toast("Opening WhatsApp to send your message.", "success");
    e.currentTarget.reset();
  }
  return (
    <form onSubmit={submit} className="glass space-y-5 rounded-3xl p-7 sm:p-9">
      <h3 className="font-display text-[26px] font-semibold">Send us a message</h3>
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className={lab} htmlFor="mname">Name</label><input id="mname" name="name" required className={field} /></div>
        <div><label className={lab} htmlFor="mphone">Phone (optional)</label><input id="mphone" name="phone" type="tel" className={field} /></div>
      </div>
      <div><label className={lab} htmlFor="mmsg">Message</label><textarea id="mmsg" name="message" required rows={5} className={field} /></div>
      <button className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-[13px] font-semibold uppercase tracking-wide text-ink transition hover:bg-gold-light">Send on WhatsApp <Send className="h-4 w-4 transition group-hover:translate-x-1" /></button>
    </form>
  );
}

/** Official payment accounts (GET /api/payment-accounts/active — members only on the backend). */
export function GiveAccounts() {
  const { user, ready, openAuth, toast } = useAuth();
  const [accounts, setAccounts] = useState<R[] | null>(null);
  const [error, setError] = useState(false);
  const logged = ready && !!user && isLoggedIn();

  useEffect(() => {
    if (!logged) return;
    api.paymentAccounts.active().then((d: R) => setAccounts(d?.accounts || [])).catch(() => setError(true));
  }, [logged]);

  if (!ready) return <InlineLoader />;
  if (!logged)
    return (
      <div className="rounded-2xl border border-gold/30 bg-gold/10 p-8 text-center">
        <LogIn className="mx-auto h-8 w-8 text-gold" />
        <p className="mt-3 text-paper/80">Please log in as a member to view our official payment accounts and give securely.</p>
        <button onClick={() => openAuth("login")} className="mt-5 rounded-full bg-gold px-7 py-3 text-[13px] font-semibold uppercase tracking-wide text-ink hover:bg-gold-light">Login / Register</button>
      </div>
    );
  if (error) return <p className="text-paper/60">Could not load payment accounts.</p>;
  if (!accounts) return <InlineLoader text="Loading accounts..." />;
  if (!accounts.length) return <p className="text-paper/60">No active accounts at the moment.</p>;
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {accounts.map((a, i) => (
        <motion.div key={a._id || i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
          className="relative overflow-hidden rounded-2xl border border-paper/12 bg-gradient-to-br from-navy to-charcoal p-6">
          <Landmark className="absolute right-4 top-4 h-10 w-10 text-gold/20" />
          <p className="text-[12px] font-bold uppercase tracking-widest text-gold">{a.bankName}</p>
          <p className="mt-2 font-mono text-[28px] font-semibold tracking-wider">{a.accountNumber}</p>
          <p className="mt-1 text-[15px] text-paper/70">{a.accountName}</p>
          {a.branchInfo && <p className="text-[13px] text-paper/45">{a.branchInfo}</p>}
          <button onClick={() => { navigator.clipboard?.writeText(a.accountNumber); toast("Account number copied", "success"); }}
            className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold hover:underline"><Copy className="h-3.5 w-3.5" />Copy number</button>
        </motion.div>
      ))}
    </div>
  );
}
