"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { highlights } from "@/lib/site";

const AUTOPLAY_MS = 5500;
const n = highlights.length;

/** Cover-flow style carousel: swipe/drag, arrows, keyboard, click side cards, auto-advancing progress bar. */
export default function FeatureCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (to: number) => setI(((to % n) + n) % n);
  const active = highlights[i];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} tabIndex={0}
      onKeyDown={(e) => { if (e.key === "ArrowRight") go(i + 1); if (e.key === "ArrowLeft") go(i - 1); }}
      className="relative outline-none" aria-roledescription="carousel">
      <motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.18} dragSnapToOrigin
        onDragEnd={(_, info) => { if (info.offset.x < -70) go(i + 1); else if (info.offset.x > 70) go(i - 1); }}
        className="relative mx-auto h-[340px] max-w-[1240px] cursor-grab select-none active:cursor-grabbing sm:h-[440px] lg:h-[520px]"
        style={{ perspective: 1400 }}>
        {highlights.map((h, idx) => {
          let d = idx - i;
          if (d > n / 2) d -= n;
          if (d < -n / 2) d += n;
          const abs = Math.abs(d);
          return (
            <div key={h.title} className="absolute left-1/2 top-0 h-full w-[80%] -translate-x-1/2 sm:w-[60%] lg:w-[46%]" style={{ zIndex: 10 - abs, pointerEvents: abs > 2 ? "none" : "auto" }}>
              <motion.div initial={false} onClick={() => d !== 0 && go(idx)}
                animate={{ x: `${d * 62}%`, scale: 1 - abs * 0.14, rotateY: d * -16, opacity: abs > 2 ? 0 : 1 - abs * 0.32 }}
                transition={{ type: "spring", stiffness: 140, damping: 22, mass: 0.9 }}
                className="relative h-full w-full overflow-hidden rounded-[28px] border border-paper/15 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                <Image src={h.image} alt={h.title} fill sizes="(max-width:640px) 80vw, (max-width:1024px) 60vw, 46vw" draggable={false} className="object-cover" priority={idx < 2} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-ink">{h.kicker}</span>
                <span className="absolute bottom-4 right-6 font-display text-[64px] font-semibold leading-none text-paper/15">{String(idx + 1).padStart(2, "0")}</span>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
            <h3 className="balance font-display text-[26px] font-semibold sm:text-[32px]">{active.title}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-paper/65">{active.text}</p>
            <Link href={active.href} className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-gold hover:gap-3 transition-all">Learn more <ArrowRight className="h-4 w-4" /></Link>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center gap-5">
          <button onClick={() => go(i - 1)} aria-label="Previous" className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 text-paper transition hover:border-gold hover:text-gold"><ChevronLeft className="h-5 w-5" /></button>
          <div className="flex items-center gap-2">
            {highlights.map((_, idx) => (
              <button key={idx} onClick={() => go(idx)} aria-label={`Slide ${idx + 1}`} className="relative h-1.5 w-8 overflow-hidden rounded-full bg-paper/20">
                {idx === i && (paused ? <span className="absolute inset-0 bg-gold" /> : (
                  <motion.span key={`${i}-p`} className="absolute inset-y-0 left-0 bg-gold" initial={{ width: "0%" }} animate={{ width: "100%" }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }} onAnimationComplete={() => go(i + 1)} />
                ))}
                {idx < i && <span className="absolute inset-0 bg-gold/50" />}
              </button>
            ))}
          </div>
          <button onClick={() => go(i + 1)} aria-label="Next" className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 text-paper transition hover:border-gold hover:text-gold"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
    </div>
  );
}
