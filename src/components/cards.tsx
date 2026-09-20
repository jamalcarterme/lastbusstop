"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin, Users } from "lucide-react";
import type { Ministry, Post } from "@/lib/site";

export function MinistryCard({ m }: { m: Ministry }) {
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="h-full">
      <Link href={`/ministries/${m.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-paper/10 bg-charcoal shadow-xl transition-colors hover:border-gold/50">
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-navy to-navy-2">
          {m.image ? (
            <Image src={m.image} alt={m.title} fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
          ) : (
            <div className="flex h-full items-center justify-center"><Users className="h-16 w-16 text-gold/70" /></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
        </div>
        <div className="flex flex-1 flex-col p-7">
          <h3 className="font-display text-[22px] font-semibold text-paper">{m.title}</h3>
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-paper/65">{m.text}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-gold transition-all group-hover:gap-3">Explore <ArrowRight className="h-4 w-4" /></span>
        </div>
      </Link>
    </motion.div>
  );
}

export function PostCard({ p, light = false }: { p: Post; light?: boolean }) {
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="h-full">
      <Link href={`/blog/${p.slug}`} className={`group flex h-full flex-col overflow-hidden rounded-3xl border shadow-xl ${light ? "border-navy/10 bg-white" : "border-paper/10 bg-charcoal"}`}>
        <div className="relative h-52 overflow-hidden">
          <Image src={p.image} alt={p.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
        </div>
        <div className="flex flex-1 flex-col p-7">
          <p className="text-[13px] font-semibold text-gold-dark">{p.date} · By {p.author}</p>
          <h3 className={`mt-2 font-display text-[21px] font-semibold leading-snug ${light ? "text-navy" : "text-paper"}`}>{p.title}</h3>
          <p className={`mt-3 flex-1 text-[15px] leading-relaxed ${light ? "text-navy/65" : "text-paper/65"}`}>{p.excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-gold-dark transition-all group-hover:gap-3">Read more <ArrowRight className="h-4 w-4" /></span>
        </div>
      </Link>
    </motion.div>
  );
}

export function EventCard({ e, light = false }: { e: { title: string; day: string; time: string; place: string; text: string }; light?: boolean }) {
  return (
    <motion.div whileHover={{ y: -6 }} className={`h-full rounded-3xl border p-7 ${light ? "border-navy/10 bg-white shadow-lg" : "border-paper/10 bg-charcoal"}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className={`font-display text-[22px] font-semibold ${light ? "text-navy" : "text-paper"}`}>{e.title}</h3>
        <span className="rounded-full bg-gold px-3 py-1 text-[12px] font-bold uppercase tracking-wide text-ink">{e.day}</span>
      </div>
      <div className={`mt-4 space-y-2 text-[15px] ${light ? "text-navy/70" : "text-paper/70"}`}>
        <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-gold" />{e.time}</p>
        <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" />{e.place}</p>
      </div>
      <p className={`mt-4 leading-relaxed ${light ? "text-navy/70" : "text-paper/65"}`}>{e.text}</p>
    </motion.div>
  );
}

/** Endless scrolling word band */
export function Marquee({ words }: { words: string[] }) {
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-paper/10 bg-gold py-4 text-ink">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-[22px] font-semibold uppercase tracking-wider">{w}<span className="text-[14px]">✦</span></span>
        ))}
      </div>
    </div>
  );
}
