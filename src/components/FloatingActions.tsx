"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";

export default function FloatingActions() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
        <AnimatePresence>
          {show && (
            <motion.button initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/15 bg-charcoal/90 text-paper shadow-xl backdrop-blur hover:border-gold hover:text-gold">
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
        <motion.a href={waLink("Hello Last Bus Stop Ministry, I'd like to make an enquiry.")} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: "spring" }} whileHover={{ scale: 1.1 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
          <MessageCircle className="relative h-7 w-7" fill="currentColor" strokeWidth={1.5} />
        </motion.a>
      </div>
    </>
  );
}
