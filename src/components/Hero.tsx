"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, ChevronDown, Clock, MapPin } from "lucide-react";
import { ButtonLink } from "./ui";
import HeroVideo from "./HeroVideo";

const ease = [0.22, 1, 0.36, 1] as const;
const rise = (i: number) => ({ initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.15 + i * 0.12, duration: 0.8, ease } });

const strip = [
  { icon: CalendarDays, top: "Sunday Worship", bottom: "9:00 AM – 12:00 PM" },
  { icon: Clock, top: "Prayer Meeting", bottom: "Wednesdays, 6:00 PM" },
  { icon: MapPin, top: "Find Us", bottom: "Old Ojo Road, Agboju" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-20 text-paper">
      <HeroVideo />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-navy/45 to-ink/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,12,25,0.65)_100%)]" />
      <div className="grain absolute inset-0 opacity-50" />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 pb-40 pt-16 text-center md:px-10">
        <motion.span {...rise(0)} className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-gold">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" /> Lagos · Amuwo-Odofin
        </motion.span>
        <motion.h1 {...rise(1)} className="balance mx-auto mt-6 max-w-4xl font-display text-[44px] font-semibold leading-[1.05] sm:text-[64px] lg:text-[80px]">
          Welcome to <span className="gold-text">Last Bus Stop</span> Ministry
        </motion.h1>
        <motion.p {...rise(2)} className="mx-auto mt-6 max-w-2xl text-[18px] font-light leading-relaxed text-paper/85 sm:text-[22px]">
          Where Lives Are Transformed Through Christ
        </motion.p>
        <motion.div {...rise(3)} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink href="/visit">Join Us Sunday</ButtonLink>
          <ButtonLink href="/prayer" variant="outline">Submit Prayer Request</ButtonLink>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8, ease }}
        className="absolute inset-x-0 bottom-0 z-10 hidden md:block">
        <div className="mx-auto grid max-w-[1240px] grid-cols-3 gap-4 px-10 pb-8">
          {strip.map(({ icon: Icon, top, bottom }) => (
            <Link key={top} href="/visit" className="glass group flex items-center gap-4 rounded-2xl px-5 py-4 transition hover:border-gold/60 hover:bg-white/10">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold transition group-hover:bg-gold group-hover:text-ink"><Icon className="h-5 w-5" /></span>
              <span><span className="block text-[12px] font-semibold uppercase tracking-wider text-paper/55">{top}</span><span className="block text-[16px] font-medium">{bottom}</span></span>
            </Link>
          ))}
        </div>
      </motion.div>
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-paper/60 md:hidden">
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
