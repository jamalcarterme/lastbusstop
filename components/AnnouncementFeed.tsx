"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";

type Announcement = { _id?: string; title: string; content: string; createdAt: string };

export default function AnnouncementFeed() {
  const [items, setItems] = useState<Announcement[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.announcements
      .homepage()
      .then((data) => setItems(data?.announcements || []))
      .catch(() => setError(true));
  }, []);

  if (error) {
    return <p className="text-center text-gray-500">Unable to load announcements right now.</p>;
  }
  if (!items) {
    return (
      <div className="space-y-4 max-w-3xl mx-auto">
        {[0, 1].map((i) => (
          <div key={i} className="h-24 rounded-2xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }
  if (!items.length) {
    return <p className="text-center text-gray-500">No announcements at this time. Please check back soon.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-5">
      {items.map((a, i) => (
        <motion.div
          key={a._id || i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="bg-white p-6 rounded-2xl shadow-[0_8px_32px_rgba(10,46,92,0.08)] border border-primary/5 flex gap-4 hover:shadow-elevated transition-shadow"
        >
          <div className="shrink-0 w-11 h-11 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
            <Megaphone size={20} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start gap-2 flex-wrap mb-1">
              <h3 className="text-lg font-bold text-primary">{a.title}</h3>
              <span className="text-xs text-gray-400 font-semibold whitespace-nowrap">
                {new Date(a.createdAt).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">{a.content}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
