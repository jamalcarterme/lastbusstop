import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata = { title: "Ministries - Last Bus Stop Ministry" };

const MINISTRIES = [
  { title: "Children's Church", image: "/assets/images/departments/children.jpg", text: "We teach the next generation the Word of God through fun, interactive, and culturally relevant programs designed for every age group, from toddlers to pre-teens.", meets: "Sundays, 9:00 AM · Children's Wing" },
  { title: "Women Department", image: "/assets/images/departments/women.jpg", text: "Empowering women to transform families and communities with the Word of God — through mentorship, prayer circles, and monthly conferences.", meets: "Monthly, 9:00 AM · Main Sanctuary" },
  { title: "Music Ministry", image: "/assets/images/departments/music.jpg", text: "Leading powerful worship through Nigerian gospel music, choirs, and instrumental excellence, training musicians and singers to minister with excellence.", meets: "Thursdays, 6:00 PM · Rehearsal Hall" },
  { title: "Missions", image: "/assets/images/departments/missions.jpg", text: "Taking the gospel beyond our walls — outreach programs, church plants, and community support reaching unreached communities in Nigeria and beyond.", meets: "Quarterly outreach trips" },
];

export default function Ministries() {
  return (
    <>
      <PageHero eyebrow="Get plugged in" title="Our Ministries" subtitle="Serving different seasons and stages of life — find where you belong" />
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 space-y-16">
          {MINISTRIES.map((m, i) => (
            <Reveal key={m.title}>
              <div className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-elevated">
                  <Image src={m.image} alt={m.title} fill className="object-cover" />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-bold text-primary mb-4">{m.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-4 text-lg">{m.text}</p>
                  <p className="inline-block bg-secondary/15 text-secondary font-bold text-sm px-4 py-2 rounded-full">{m.meets}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link href="/contact" className="btn-shine inline-block bg-gradient-to-r from-primary to-accent text-white px-10 py-4 rounded-full font-semibold hover:shadow-elevated transition">
            Get Connected
          </Link>
        </div>
      </section>
    </>
  );
}
