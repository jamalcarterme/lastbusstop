"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";
import { api, type R } from "@/lib/api";
import { InlineLoader } from "./Loader";

type Ann = { _id?: string; title: string; content: string; createdAt: string };

/** Live announcements from the backend (GET /api/announcements/homepage). */
export default function Announcements({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [items, setItems] = useState<Ann[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    api.announcements.homepage()
      .then((d: R) => alive && setItems(d?.announcements || []))
      .catch(() => alive && setError(true));
    return () => { alive = false; };
  }, []);

  const card = tone === "dark" ? "glass text-paper" : "border border-navy/10 bg-white text-navy shadow-sm";
  const muted = tone === "dark" ? "text-paper/45" : "text-navy/45";
  const body = tone === "dark" ? "text-paper/70" : "text-navy/70";

  if (error) return <p className={`text-center ${muted}`}>Unable to load announcements right now.</p>;
  if (!items) return <div className={tone === "dark" ? "text-paper" : "text-navy"}><InlineLoader text="Loading announcements..." /></div>;
  if (!items.length) return <p className={`text-center ${muted}`}>No announcements at this time. Please check back soon.</p>;

  return (
    <div className="mx-auto grid max-w-3xl gap-5">
      {items.map((a, idx) => (
        <motion.div key={a._id || idx} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08, duration: 0.55 }}
          whileHover={{ y: -4 }} className={`flex gap-4 rounded-2xl p-6 ${card}`}>
          <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold"><Megaphone className="h-5 w-5" /></span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="text-[18px] font-bold">{a.title}</h3>
              <span className={`text-[12px] font-semibold ${muted}`}>{new Date(a.createdAt).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
            <p className={`mt-2 whitespace-pre-line leading-relaxed ${body}`}>{a.content}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
