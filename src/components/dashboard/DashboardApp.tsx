"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, LogOut, Menu, X } from "lucide-react";
import { api, clearSession, getToken, type R } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { InlineLoader } from "../Loader";
import { fdate, DEPT_LABELS } from "./DashUI";
import { MemberAnnouncements, Give, Overview, Profile, Receipts } from "./MemberViews";
import { AdminAnnouncements, AdminReceipts, Analytics, Audit, Members, Payments } from "./AdminViews";

const member = [["", "Overview", "🏠"], ["receipts", "My Receipts", "🧾"], ["give", "Give", "💝"], ["announcements", "Announcements", "📢"], ["profile", "Profile", "👤"]];
const admin = [["", "Overview", "🏠"], ["admin-receipts", "Receipts", "🧾"], ["admin-members", "Members", "👥"], ["admin-payments", "Payment Accounts", "🏦"], ["admin-announcements", "Announcements", "📢"], ["admin-analytics", "Analytics", "📊"], ["admin-audit", "Audit Logs", "📜"], ["profile", "Profile", "👤"]];
const views: Record<string, () => ReactNode> = {
  "": () => <Overview />, receipts: () => <Receipts />, give: () => <Give />, announcements: () => <MemberAnnouncements />, profile: () => <Profile />,
  "admin-receipts": () => <AdminReceipts />, "admin-members": () => <Members />, "admin-payments": () => <Payments />,
  "admin-announcements": () => <AdminAnnouncements />, "admin-analytics": () => <Analytics />, "admin-audit": () => <Audit />,
};

export default function DashboardApp({ view }: { view: string }) {
  const { user, ready, isAdmin, updateUser, openAuth, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [notes, setNotes] = useState<R[]>([]);
  const [unread, setUnread] = useState(0);
  const [bell, setBell] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (!getToken()) { router.replace("/"); openAuth("login"); return; }
    api.auth.me().then((d: R) => updateUser(d.user)).catch(() => { clearSession(); router.replace("/"); openAuth("login"); });
    api.notifications.unreadCount().then((d: R) => setUnread(d.count ?? d.unreadCount ?? 0)).catch(() => {});
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => setMenu(false), [pathname]);

  async function openBell() {
    setBell((b) => !b);
    if (!bell) { try { const d: R = await api.notifications.list({ limit: 10 }); setNotes(d.notifications || []); } catch {} }
  }
  async function readAll() { try { await api.notifications.markAllRead(); setUnread(0); setNotes((n) => n.map((x) => ({ ...x, isRead: true }))); } catch {} }

  if (!ready || !user) return <div className="flex min-h-screen items-center justify-center bg-ink text-paper"><InlineLoader text="Loading your dashboard..." /></div>;
  const items = isAdmin ? admin : member;
  const current = items.find(([s]) => s === view) || items[0];
  const render = views[current[0]];

  const side = (
    <nav className="flex h-full flex-col bg-ink p-5 text-paper">
      <Link href="/" className="mb-8 flex items-center gap-3"><Image src="/assets/images/logo.png" alt="Home" width={40} height={40} className="rounded-full ring-2 ring-gold/60" /><span className="font-display text-[16px] font-semibold leading-tight">Last Bus Stop<br />Ministry</span></Link>
      <div className="space-y-1">{items.map(([slug, label, icon]) => {
        const active = current[0] === slug;
        return <Link key={slug} href={slug ? `/dashboard/${slug}` : "/dashboard"} className={`relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-[14px] font-medium transition ${active ? "text-ink" : "text-paper/70 hover:bg-paper/8 hover:text-paper"}`}>
          {active && <motion.span layoutId="dash-active" className="absolute inset-0 rounded-xl bg-gold" />}<span className="relative">{icon}</span><span className="relative">{label}</span></Link>; })}</div>
      <button onClick={logout} className="mt-auto flex items-center gap-3 rounded-xl px-4 py-2.5 text-[14px] text-paper/70 hover:bg-paper/8"><LogOut className="h-4 w-4" />Logout</button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-paper-2 text-navy lg:pl-64">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">{side}</aside>
      <AnimatePresence>{menu && (<><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenu(false)} className="fixed inset-0 z-40 bg-ink/60 lg:hidden" />
        <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 28, stiffness: 260 }} className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden">{side}</motion.aside></>)}</AnimatePresence>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-navy/10 bg-paper-2/90 px-5 py-4 backdrop-blur sm:px-8">
        <div className="flex items-center gap-3"><button onClick={() => setMenu(true)} className="lg:hidden" aria-label="Menu"><Menu className="h-6 w-6" /></button><h1 className="font-display text-[24px] font-semibold">{current[1]}</h1></div>
        <div className="relative flex items-center gap-4">
          <button onClick={openBell} aria-label="Notifications" className="relative rounded-full p-2 hover:bg-navy/5"><Bell className="h-5 w-5" />{unread > 0 && <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">{unread}</span>}</button>
          <div className="hidden text-right sm:block"><p className="text-[14px] font-semibold leading-tight">{user.name}</p><p className="text-[12px] capitalize text-navy/50">{isAdmin ? "Administrator" : DEPT_LABELS[user.department || ""] || "Member"}</p></div>
          <AnimatePresence>{bell && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute right-0 top-12 w-80 max-w-[85vw] overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-navy/10 px-4 py-3"><b>Notifications</b><div className="flex gap-3"><button onClick={readAll} className="text-[12px] font-semibold text-gold-dark">Mark all read</button><button onClick={() => setBell(false)}><X className="h-4 w-4" /></button></div></div>
              <div className="max-h-80 overflow-y-auto">{notes.length ? notes.map((n) => <button key={n._id} onClick={() => api.notifications.markRead(n._id).then(() => { setNotes((l) => l.map((x) => x._id === n._id ? { ...x, isRead: true } : x)); setUnread((u) => Math.max(0, u - (n.isRead ? 0 : 1))); }).catch(() => {})} className={`block w-full border-b border-navy/8 px-4 py-3 text-left text-[13px] ${n.isRead ? "" : "bg-gold/10"}`}><p className="font-semibold">{n.title}</p><p className="text-navy/60">{n.message}</p><p className="mt-1 text-[11px] text-navy/40">{fdate(n.createdAt)}</p></button>) : <p className="p-6 text-center text-[13px] text-navy/50">No notifications.</p>}</div>
            </motion.div>)}</AnimatePresence>
        </div>
      </header>
      <AnimatePresence mode="wait">
        <motion.div key={current[0]} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="p-5 sm:p-8">{render()}</motion.div>
      </AnimatePresence>
    </div>
  );
}
