import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export const metadata = { title: "About Us - Last Bus Stop Ministry" };

export default function About() {
  return (
    <>
      <PageHero eyebrow="Our story" title="About Last Bus Stop Ministry" subtitle="A vibrant, Spirit-filled church family in the heart of Lagos" />

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Last Bus Stop Ministry is a vibrant, Spirit-filled church located at 212, Old Ojo Road, Agboju, Amuwo-Odofin, Lagos. We are
              dedicated to spreading the unadulterated Word of God and making disciples of all nations, starting from our community.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our services are filled with powerful worship, dynamic preaching, and warm Nigerian hospitality that makes every visitor feel
              like family. We believe in the transformative power of Christ and are committed to equipping believers for effective
              Christian living through our Men&apos;s, Women&apos;s, and Youth ministries.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="relative rounded-[2rem] overflow-hidden shadow-elevated aspect-[4/5]">
            <Image src="/assets/images/blog/spirit.jpg" alt="Worship at Last Bus Stop Ministry" fill className="object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading eyebrow="What drives us" title="Our Foundation" />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              ["🎯", "Mission", "To preach the unadulterated Word of God and make disciples of all nations."],
              ["🔭", "Vision", "To see lives transformed, families restored, and communities impacted for Christ."],
              ["❤️", "Values", "Worship, Prayer, Fellowship, Evangelism and Discipleship."],
            ].map(([icon, title, text], i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="bg-white p-10 rounded-3xl shadow-[0_8px_32px_rgba(10,46,92,0.08)] text-center h-full border-t-4 border-secondary hover:-translate-y-2 transition-transform">
                  <div className="text-5xl mb-5">{icon}</div>
                  <h3 className="text-xl font-display font-bold text-primary mb-2">{title}</h3>
                  <p className="text-gray-600">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading eyebrow="Our journey" title="How We Got Here" subtitle="Two decades of faithfulness in Agboju, Amuwo-Odofin" />
          <div className="relative border-l-2 border-secondary/40 ml-4 space-y-12">
            {[
              ["A Humble Beginning", "Last Bus Stop Ministry began as a small prayer fellowship, gathering believers who were hungry for the presence of God."],
              ["Planting Roots in Agboju", "The ministry established its permanent home on Old Ojo Road, becoming a spiritual anchor for the growing community."],
              ["Raising Ministries", "Children's, Youth, Women's and Music ministries were launched to disciple every generation of the church family."],
              ["Reaching Beyond Our Walls", "Missions outreach extended the gospel to unreached communities across Nigeria."],
            ].map(([title, text], i) => (
              <Reveal key={title} delay={i * 0.08} className="pl-8 relative">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-secondary shadow-glow" />
                <h3 className="text-xl font-display font-bold text-primary mb-2">{title}</h3>
                <p className="text-gray-600 leading-relaxed max-w-2xl">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
