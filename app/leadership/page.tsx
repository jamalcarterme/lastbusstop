import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata = { title: "Leadership - Last Bus Stop Ministry" };

const LEADERS = [
  { name: "Pastor Chinyere Amaechi", role: "Senior Pastor", image: "/assets/images/leaders/pastor.jpg", text: "Spiritual leader with a passion for equipping believers to walk in their God-given purpose." },
  { name: "Evangelist Solomon Amaechi", role: "Associate Minister", image: "/assets/images/leaders/pastor.jpg", text: "Devoted to family discipleship and raising the next generation in godly wisdom." },
  { name: "Youth Leader", role: "Youth & Young Adults", image: "/assets/images/leaders/youth.jpg", text: "Inspiring the next generation in faith through relevant, Spirit-led programs." },
  { name: "Women Ministry Leader", role: "Women's Ministry", image: "/assets/images/leaders/women.jpg", text: "Empowering women in their faith journey, careers, and homes." },
];

export default function Leadership() {
  return (
    <>
      <PageHero eyebrow="Meet the team" title="Our Leadership" subtitle="Dedicated servants leading with wisdom and compassion" />
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          {LEADERS.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.08}>
              <div className="flex gap-6 items-center bg-gray-50 p-6 rounded-3xl hover:shadow-elevated transition-shadow">
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0">
                  <Image src={l.image} alt={l.name} fill className="rounded-2xl object-cover border-4 border-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-primary">{l.name}</h3>
                  <p className="text-secondary font-semibold text-sm mb-2">{l.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{l.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
