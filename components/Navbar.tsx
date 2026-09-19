"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/ministries", label: "Ministries" },
  { href: "/events", label: "Events" },
  { href: "/sermons", label: "Sermons" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact & Give" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user, openAuthModal, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const solid = scrolled || !isHome || open;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        solid ? "bg-white/90 backdrop-blur-md shadow-[0_8px_32px_rgba(10,46,92,0.08)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/assets/images/logo.png" alt="Last Bus Stop Ministry" width={44} height={44} className="rounded-full h-11 w-11 object-cover" />
            <span className={`hidden sm:inline font-display font-bold text-lg transition-colors ${solid ? "gradient-text" : "text-white"}`}>
              Last Bus Stop Ministry
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-sm font-semibold tracking-wide transition-colors after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:bg-secondary after:transition-all after:duration-300 ${
                  pathname === l.href ? "after:w-full" : "after:w-0 hover:after:w-full"
                } ${solid ? "text-primary/90 hover:text-primary" : "text-white hover:text-secondary"}`}
              >
                {l.label}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard" className={`text-sm font-bold ${solid ? "text-primary" : "text-white"}`}>
                  Hi, {user.name?.split(" ")[0]}
                </Link>
                <button onClick={logout} className="text-xs font-semibold px-4 py-2 rounded-full border border-secondary text-secondary hover:bg-secondary hover:text-primary transition">
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal("login")}
                className="btn-shine bg-gradient-to-r from-primary to-accent text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-elevated hover:shadow-glow transition"
              >
                Login / Register
              </button>
            )}
          </div>

          <button className={`lg:hidden ${solid ? "text-primary" : "text-white"}`} onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 font-semibold text-primary/90">
                  {l.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="py-2 font-bold text-primary">
                    Hi, {user.name?.split(" ")[0]}
                  </Link>
                  <button onClick={logout} className="text-left py-2 font-semibold text-red-500">
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                    openAuthModal("login");
                  }}
                  className="bg-primary text-white px-5 py-3 rounded-full font-semibold text-center"
                >
                  Login / Register
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
