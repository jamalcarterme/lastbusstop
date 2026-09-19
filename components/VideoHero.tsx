"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

// Background video for the hero — plays immediately, muted, looped, no controls.
const YOUTUBE_ID = "gTJ1bFapnhY";

export default function VideoHero() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center text-white overflow-hidden pt-20">
      {/* Background video layer */}
      <div className="absolute inset-0 z-0 bg-ink">
        {ready && (
          <div className="absolute top-1/2 left-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_ID}&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&disablekb=1`}
              title="Last Bus Stop Ministry background worship video"
              allow="autoplay; encrypted-media"
              frameBorder={0}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-primary/70 to-ink/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,168,38,0.15),transparent_60%)]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 z-10 text-center py-20">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block section-eyebrow mb-6"
        >
          Agboju · Amuwo-Odofin · Lagos
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.05] tracking-tight"
        >
          Where Lives Are<br />
          <span className="bg-gradient-to-r from-secondary to-yellow-300 bg-clip-text text-transparent">Transformed</span> Through Christ
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-lg md:text-2xl mb-10 text-white/85 font-light max-w-2xl mx-auto"
        >
          Welcome to Last Bus Stop Ministry — powerful worship, dynamic preaching, and warm Nigerian hospitality.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/events" className="btn-shine bg-secondary text-primary px-8 py-4 rounded-full font-bold shadow-glow hover:scale-105 transition-transform">
            Join Us Sunday
          </Link>
          <Link href="/prayer" className="btn-shine border-2 border-white/70 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition">
            Submit Prayer Request
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-white/60">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="w-[1px] h-8 bg-white/50" />
      </motion.div>
    </section>
  );
}
