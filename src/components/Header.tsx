"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { useAuth } from "@/lib/auth";

export default function Header() {
  const pathname = usePathname();
  const { user, ready, openAuth } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const cta = ready && user ? (
    <Link href="/dashboard" className="rounded-full bg-gold px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-ink transition hover:bg-gold-light">Hi, {user.name.split(" ")[0]}</Link>
  ) : (
    <button onClick={() => openAuth("login")} className="rounded-full bg-gold px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-ink transition hover:bg-gold-light">Login / Register</button>
  );

  return (
    <motion.header initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-paper/10 bg-ink/80 shadow-2xl backdrop-blur-xl" : "bg-gradient-to-b from-ink/70 to-transparent"}`}>
      <div className={`mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 transition-all duration-500 md:px-10 ${scrolled ? "h-[68px]" : "h-20"}`}>
        <Link href="/" className="flex items-center gap-3">
          <Image src="/assets/images/logo.png" alt={`${site.name} logo`} width={44} height={44} priority className="rounded-full ring-2 ring-gold/60" />
          <span className="hidden font-display text-[18px] font-semibold leading-tight text-paper sm:block">{site.name}</span>
        </Link>
        <nav className="hidden items-center gap-1 xl:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className={`relative px-3 py-2 text-[14px] font-medium transition-colors ${isActive(n.href) ? "text-gold" : "text-paper/75 hover:text-paper"}`}>
              {n.label}
              {isActive(n.href) && <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded bg-gold" />}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 xl:flex">
          <a href={`tel:${site.phone.href}`} className="flex items-center gap-2 text-[14px] font-medium text-paper/80 hover:text-gold"><Phone className="h-4 w-4 text-gold" />{site.phone.display}</a>
          {cta}
        </div>
        <button onClick={() => setOpen((o) => !o)} aria-label="Menu" className="rounded-full p-2 text-paper xl:hidden">{open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-paper/10 bg-ink/95 backdrop-blur-xl xl:hidden">
            <div className="flex flex-col gap-1 px-6 py-5">
              {nav.map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <Link href={n.href} className={`block rounded-lg px-3 py-3 text-[16px] font-medium ${isActive(n.href) ? "bg-gold/10 text-gold" : "text-paper/80"}`}>{n.label}</Link>
                </motion.div>
              ))}
              <div className="mt-3 flex flex-col gap-3">
                <a href={`tel:${site.phone.href}`} className="flex items-center gap-2 px-3 text-[15px] text-paper/80"><Phone className="h-4 w-4 text-gold" />{site.phone.display}</a>
                <div className="[&>*]:w-full [&>*]:text-center">{cta}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
