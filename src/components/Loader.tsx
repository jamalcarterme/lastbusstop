"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/** Bouncing-logo loader (port of the original loader.css). */
export function LogoLoader({ text }: { text?: string }) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative h-24 w-24">
        <motion.div className="absolute inset-0 rounded-full border-2 border-gold/60"
          animate={{ scale: [1, 1.5], opacity: [0.7, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }} />
        <motion.div className="absolute inset-0 overflow-hidden rounded-full bg-paper shadow-[0_0_40px_rgba(249,168,38,0.35)]"
          animate={{ y: [0, -18, 0] }} transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}>
          <Image src="/assets/images/logo.png" alt="Loading" width={96} height={96} priority />
        </motion.div>
      </div>
      <motion.div className="h-1.5 w-14 rounded-full bg-black/40 blur-[2px]"
        animate={{ scaleX: [1, 0.6, 1], opacity: [0.6, 0.25, 0.6] }} transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }} />
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <motion.span key={i} className="h-2 w-2 rounded-full bg-gold"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12 }} />
        ))}
      </div>
      {text && <p className="text-[14px] font-medium text-paper/80">{text}</p>}
    </div>
  );
}

export function InlineLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-10 text-[14px] text-current opacity-70">
      <motion.span className="block h-5 w-5 rounded-full border-2 border-current border-t-transparent"
        animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
      {text}
    </div>
  );
}
