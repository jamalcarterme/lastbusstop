"use client";

import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-6 md:px-10 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] ${light ? "text-navy" : "text-gold"}`}>
      <span className="h-[6px] w-[6px] rounded-full bg-gold" />
      {children}
    </span>
  );
}

/** Scroll-reveal wrapper (fade + rise) driven by framer-motion. */
export function Reveal({ children, className = "", delay = 0, y = 26, ...rest }: { children: ReactNode; className?: string; delay?: number; y?: number } & Omit<HTMLMotionProps<"div">, "children">) {
  return (
    <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease }} className={className} {...rest}>
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className = "", gap = 0.09 }: { children: ReactNode; className?: string; gap?: number }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: gap } } }} className={className}>
      {children}
    </motion.div>
  );
}

export function Item({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } }} className={className}>
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, text, center = true, light = false }: { eyebrow: string; title: string; text?: string; center?: boolean; light?: boolean }) {
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-2xl`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={`balance mt-4 font-display text-[32px] font-semibold leading-tight sm:text-[42px] ${light ? "text-navy" : "text-paper"}`}>{title}</h2>
      {text && <p className={`mt-4 text-[16px] leading-relaxed ${light ? "text-navy/70" : "text-paper/65"}`}>{text}</p>}
    </Reveal>
  );
}

type BtnProps = { href: string; children: ReactNode; variant?: "gold" | "outline" | "ghost"; className?: string; external?: boolean };
export function ButtonLink({ href, children, variant = "gold", className = "", external }: BtnProps) {
  const base = "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-wide transition-all duration-300";
  const styles = {
    gold: "bg-gold text-ink hover:bg-gold-light hover:shadow-[0_0_30px_rgba(249,168,38,0.45)]",
    outline: "border border-paper/40 text-paper hover:border-gold hover:text-gold",
    ghost: "border border-gold text-gold hover:bg-gold/10",
  }[variant];
  const inner = (
    <>
      {variant === "gold" && <span className="pointer-events-none absolute inset-y-0 left-0 w-10 animate-shine bg-white/40 blur-md" />}
      <span className="relative flex items-center gap-2">{children}</span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles} ${className}`}>{inner}</a>
  ) : (
    <Link href={href} className={`${base} ${styles} ${className}`}>{inner}</Link>
  );
}

export function PageHero({ eyebrow, title, text, children }: { eyebrow: string; title: string; text?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-charcoal pb-24 pt-32 hero-chevron-cut md:pb-32 md:pt-40">
      <div className="glow-bg absolute inset-0" />
      <div className="grain absolute inset-0 opacity-60" />
      <div className="absolute -left-20 top-10 h-72 w-72 animate-float rounded-full bg-gold/15 blur-3xl" />
      <div className="absolute -right-16 bottom-0 h-80 w-80 animate-float-slow rounded-full bg-navy-2/60 blur-3xl" />
      <Container className="relative text-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="balance mx-auto mt-4 max-w-3xl font-display text-[38px] font-semibold leading-[1.1] text-paper sm:text-[52px]">{title}</h1>
          {text && <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-paper/70">{text}</p>}
          {children}
        </motion.div>
      </Container>
    </section>
  );
}
