"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Bell, LogOut } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { api } from "@/lib/api";

export default function DashboardClient() {
  const { user, loading, openAuthModal, logout } = useAuth();
  const [profile, setProfile] = useState(user);

  useEffect(() => {
    if (!user) return;
    api.auth
      .me()
      .then((data) => data?.user && setProfile(data.user))
      .catch(() => {});
  }, [user]);

  if (loading) return null;

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-display font-bold text-primary mb-4">Member area</h1>
        <p className="text-gray-600 mb-8">Please log in to view your member dashboard.</p>
        <button onClick={() => openAuthModal("login")} className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3.5 rounded-full font-semibold">
          Login / Register
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-32 pb-24">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-elevated p-8 sm:p-10">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <User size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-primary">Hi, {profile?.name}</h1>
            <p className="text-gray-500 text-sm">{profile?.email}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <InfoRow label="Department" value={String(profile?.department || "—")} />
          <InfoRow label="Role" value={String(profile?.role || "Member")} />
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <p className="text-gray-500 text-sm flex items-center gap-2">
            <Bell size={16} className="text-secondary" /> Full giving history, receipt uploads, and notifications live on the ministry&apos;s member
            portal — this quick view keeps your account connected here.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="bg-primary text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-accent transition">
            Go to Give
          </Link>
          <button onClick={logout} className="flex items-center gap-2 border border-gray-300 text-gray-600 px-6 py-3 rounded-full font-semibold text-sm hover:border-red-400 hover:text-red-500 transition">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">{label}</p>
      <p className="text-primary font-bold capitalize">{value}</p>
    </div>
  );
}
