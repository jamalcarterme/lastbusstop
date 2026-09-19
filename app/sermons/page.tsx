import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Play, Clock } from "lucide-react";

export const metadata = { title: "Sermons - Last Bus Stop Ministry" };

const SERMONS = [
  { title: "Living in Divine Purpose", speaker: "Pastor Chinyere Amaechi", date: "September 14, 2026", length: "48 min", series: "Purpose Series" },
  { title: "The Anatomy of Faith", speaker: "Pastor Chinyere Amaechi", date: "September 7, 2026", length: "52 min", series: "Faith Foundations" },
  { title: "Raising Kingdom Sons & Daughters", speaker: "Evangelist Solomon Amaechi", date: "August 31, 2026", length: "41 min", series: "Family Life" },
  { title: "Unshakable in Seasons of Change", speaker: "Pastor Chinyere Amaechi", date: "August 24, 2026", length: "55 min", series: "Purpose Series" },
  { title: "Prayer That Moves Mountains", speaker: "Pastor Chinyere Amaechi", date: "August 17, 2026", length: "46 min", series: "Faith Foundations" },
  { title: "Walking in the Spirit", speaker: "Youth Leader", date: "August 10, 2026", length: "38 min", series: "Youth Encounter" },
];

export default function Sermons() {
  return (
    <>
      <PageHero eyebrow="Feed your spirit" title="Sermons & Messages" subtitle="Catch up on recent teachings from Last Bus Stop Ministry" />
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERMONS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="bg-white rounded-3xl shadow-[0_8px_32px_rgba(10,46,92,0.08)] overflow-hidden group hover:shadow-elevated hover:-translate-y-1.5 transition-all h-full flex flex-col">
                <div className="relative aspect-video bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="absolute top-3 left-3 bg-secondary text-primary text-xs font-bold px-3 py-1 rounded-full">{s.series}</span>
                  <button aria-label={`Play ${s.title}`} className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all">
                    <Play className="text-white group-hover:text-primary ml-1" size={26} fill="currentColor" />
                  </button>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display font-bold text-primary text-lg mb-1">{s.title}</h3>
                  <p className="text-secondary text-sm font-semibold mb-3">{s.speaker}</p>
                  <div className="mt-auto flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <span>{s.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {s.length}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm mt-12">Full sermon archive and livestream coming soon.</p>
      </section>
    </>
  );
}
