"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  { name: "Adeola Adeyemi", role: "Mother & Business Owner", text: "Last Bus Stop Ministry has transformed my family. The teachings have brought healing and prosperity into our home." },
  { name: "Chinedu Okafor", role: "University Student", text: "I found purpose and direction here. The youth fellowship has been a strong support system for me in school." },
  { name: "Grace Johnson", role: "Retired Teacher", text: "After years of searching, I've finally found a church that feeds my soul. The worship is powerful and authentic." },
];

export default function TestimonialCarousel() {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current]);
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback((i: number) => emblaApi && emblaApi.scrollTo(i), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="min-w-full px-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-dark rounded-3xl p-10 md:p-14 text-center relative"
              >
                <Quote className="mx-auto mb-6 text-secondary" size={36} />
                <p className="text-lg md:text-xl mb-8 italic text-white/90 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <h4 className="font-display font-bold text-secondary text-lg">{t.name}</h4>
                <p className="text-sm text-white/60">{t.role}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        aria-label="Previous testimonial"
        className="absolute top-1/2 -left-2 md:-left-6 -translate-y-1/2 bg-white/10 hover:bg-secondary hover:text-primary text-white p-3 rounded-full backdrop-blur transition"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next testimonial"
        className="absolute top-1/2 -right-2 md:-right-6 -translate-y-1/2 bg-white/10 hover:bg-secondary hover:text-primary text-white p-3 rounded-full backdrop-blur transition"
      >
        <ChevronRight size={20} />
      </button>
      <div className="flex justify-center mt-8 gap-3">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${selected === i ? "w-8 bg-secondary" : "w-2.5 bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
