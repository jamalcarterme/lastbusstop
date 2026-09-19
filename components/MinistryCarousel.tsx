"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export type MinistryItem = { title: string; text: string; image: string };

export default function MinistryCarousel({ items }: { items: MinistryItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {items.map((m, i) => (
            <div key={i} className="min-w-[85%] sm:min-w-[45%] lg:min-w-[30%]">
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-3xl overflow-hidden shadow-elevated bg-white group h-full"
              >
                <div className="h-64 overflow-hidden relative">
                  <Image src={m.image} alt={m.title} fill className="object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-display font-bold text-primary mb-2">{m.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{m.text}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-8">
        <button onClick={scrollPrev} className="bg-primary/5 hover:bg-secondary hover:text-primary text-primary p-3 rounded-full transition" aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <button onClick={scrollNext} className="bg-primary/5 hover:bg-secondary hover:text-primary text-primary p-3 rounded-full transition" aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
