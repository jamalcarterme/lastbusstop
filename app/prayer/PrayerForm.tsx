"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { HeartHandshake, Send } from "lucide-react";

export default function PrayerForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [request, setRequest] = useState("");
  const [confidential, setConfidential] = useState(false);
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No dedicated prayer-request endpoint exists on the backend yet —
    // this routes the request to the church over WhatsApp so it reaches the team immediately.
    const text = encodeURIComponent(
      `Prayer Request${confidential ? " (Confidential)" : ""}\nName: ${name || "Anonymous"}\nContact: ${contact || "—"}\n\n${request}`
    );
    window.open(`https://wa.me/2348055515723?text=${text}`, "_blank");
    setSent(true);
  }

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-elevated p-10 text-center">
        <HeartHandshake className="mx-auto text-accent mb-4" size={44} />
        <h3 className="text-2xl font-display font-bold text-primary mb-2">We&apos;re praying with you</h3>
        <p className="text-gray-600">
          Your request has been prepared for our prayer team on WhatsApp. If a new tab didn&apos;t open,{" "}
          <button onClick={() => setSent(false)} className="text-secondary font-semibold hover:underline">
            try again
          </button>
          .
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-3xl shadow-elevated p-8 sm:p-10 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-gray-700 mb-1.5 font-semibold text-sm">Name (optional)</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary" placeholder="Anonymous is fine" />
        </div>
        <div>
          <label className="block text-gray-700 mb-1.5 font-semibold text-sm">Phone or Email (optional)</label>
          <input value={contact} onChange={(e) => setContact(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary" placeholder="So we can follow up" />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 mb-1.5 font-semibold text-sm">Your Prayer Request</label>
        <textarea
          required
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
          placeholder="Share what's on your heart..."
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" checked={confidential} onChange={(e) => setConfidential(e.target.checked)} className="accent-secondary w-4 h-4" />
        Keep this confidential — for the prayer team only
      </label>
      <button type="submit" className="btn-shine w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-full font-bold shadow-elevated hover:shadow-glow transition">
        <Send size={18} /> Send Prayer Request
      </button>
    </form>
  );
}
