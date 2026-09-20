"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/site";

export default function Testimonials() {
  const [[i, dir], set] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  const go = (d: number) => set(([c]) => [(c + d + n) % n, d]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [paused]); // eslint-disable-line react-hooks/exhaustive-deps

  const t = testimonials[i];
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="relative mx-auto max-w-4xl">
      <div className="relative min-h-[330px] overflow-hidden sm:min-h-[290px]">
        <AnimatePresence mode="popLayout" custom={dir} initial={false}>
          <motion.div key={i} custom={dir}
            variants={{ enter: (d: number) => ({ opacity: 0, x: d * 90 }), center: { opacity: 1, x: 0 }, exit: (d: number) => ({ opacity: 0, x: d * -90 }) }}
            initial="enter" animate="center" exit="exit" transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-3xl p-8 text-center sm:p-12">
            <Quote className="mx-auto h-10 w-10 text-gold" />
            <p className="mt-6 font-display text-[21px] italic leading-relaxed text-paper sm:text-[26px]">“{t.text}”</p>
            <h4 className="mt-7 text-[16px] font-bold text-gold">{t.name}</h4>
            <p className="text-[14px] text-paper/60">{t.role}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <button onClick={() => go(-1)} aria-label="Previous testimonial" className="absolute -left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full glass text-paper hover:text-gold lg:flex"><ChevronLeft /></button>
      <button onClick={() => go(1)} aria-label="Next testimonial" className="absolute -right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full glass text-paper hover:text-gold lg:flex"><ChevronRight /></button>
      <div className="mt-8 flex justify-center gap-3">
        {testimonials.map((_, idx) => (
          <button key={idx} onClick={() => set([idx, idx > i ? 1 : -1])} aria-label={`Testimonial ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all ${idx === i ? "w-8 bg-gold" : "w-2.5 bg-paper/30"}`} />
        ))}
      </div>
    </div>
  );
}
