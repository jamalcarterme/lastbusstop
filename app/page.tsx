import Image from "next/image";
import Link from "next/link";
import VideoHero from "@/components/VideoHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import MinistryCarousel from "@/components/MinistryCarousel";
import AnnouncementFeed from "@/components/AnnouncementFeed";

const MINISTRIES = [
  { title: "Children's Church", text: "We teach the next generation the Word of God through fun, interactive, and culturally relevant programs.", image: "/assets/images/departments/children.jpg" },
  { title: "Women Department", text: "Empowering women to transform families and communities with the Word of God in today's challenging world.", image: "/assets/images/departments/women.jpg" },
  { title: "Music Ministry", text: "Leading powerful worship through Nigerian gospel music, choirs, and instrumental excellence.", image: "/assets/images/departments/music.jpg" },
  { title: "Missions", text: "Taking the gospel beyond our walls to unreached communities in Nigeria and beyond.", image: "/assets/images/departments/missions.jpg" },
];

const LEADERS = [
  { name: "Pastor Chinyere Amaechi", role: "Senior Pastor", text: "Spiritual leader with a passion for equipping believers", image: "/assets/images/leaders/pastor.jpg" },
  { name: "Youth Leader", role: "Youth & Young Adults", text: "Inspiring the next generation in faith", image: "/assets/images/leaders/youth.jpg" },
  { name: "Women Ministry Leader", role: "Women's Ministry", text: "Empowering women in their faith journey", image: "/assets/images/leaders/women.jpg" },
];

const BLOG = [
  { title: "The Power of Persistent Prayer", author: "Pastor Chinyere Amaechi", image: "/assets/images/blog/prayer.jpg", excerpt: "Discover how consistent prayer can transform your spiritual life and bring breakthrough." },
  { title: "Raising Godly Children in Modern Nigeria", author: "Evangelist Solomon Amaechi", image: "/assets/images/blog/children.jpg", excerpt: "Practical biblical wisdom for parents navigating today's world." },
  { title: "The Holy Spirit and Spiritual Gifts", author: "Pastor Chinyere Amaechi", image: "/assets/images/blog/spirit.jpg", excerpt: "Understanding the manifestations of the Holy Spirit and your spiritual gifts." },
];

const STATS = [
  { n: "20+", l: "Years of Ministry" },
  { n: "1,200+", l: "Active Members" },
  { n: "4", l: "Weekly Programs" },
  { n: "15+", l: "Community Missions" },
];

export default function Home() {
  return (
    <>
      <VideoHero />

      {/* Stats strip */}
      <section className="bg-primary relative py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-extrabold text-secondary">{s.n}</div>
              <div className="text-white/70 text-sm mt-1">{s.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <span className="section-eyebrow">Who we are</span>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-primary mt-3 mb-6 leading-tight">About Our Church</h2>
            <p className="text-gray-600 mb-5 text-lg leading-relaxed">
              Last Bus Stop Ministry is a vibrant, Spirit-filled church located in Agboju, Amuwo-Odofin, Lagos. We are dedicated to spreading
              the unadulterated Word of God and making disciples of all nations, starting from our community.
            </p>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Our services are filled with powerful worship, dynamic preaching, and warm Nigerian hospitality that makes every visitor feel
              like family.
            </p>
            <Link href="/about" className="btn-shine inline-block bg-primary text-white px-8 py-3.5 rounded-full font-semibold hover:bg-accent hover:shadow-elevated transition">
              Learn More
            </Link>
          </Reveal>
          <Reveal delay={0.15} className="relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-elevated aspect-[4/5]">
              <Image src="/assets/images/blog/spirit.jpg" alt="Spirit-filled worship at Last Bus Stop Ministry" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-secondary text-primary rounded-2xl px-6 py-4 shadow-glow font-display font-bold hidden sm:block">
              20+ Years Serving Lagos
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading eyebrow="Our foundation" title="Mission, Vision & Values" subtitle="The core principles that guide our ministry and mission" />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              ["🎯", "Mission", "To preach the unadulterated Word of God and make disciples of all nations, starting from our community in Lagos."],
              ["🔭", "Vision", "To see lives transformed by the power of the Holy Spirit, families restored, and communities impacted for Christ."],
              ["❤️", "Core Values", "Worship, Prayer, Fellowship, Evangelism, and Discipleship rooted in African Christian excellence."],
            ].map(([icon, title, text], i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="bg-white p-10 rounded-3xl shadow-[0_8px_32px_rgba(10,46,92,0.08)] text-center h-full hover:-translate-y-2 hover:shadow-elevated transition-all duration-300 border-t-4 border-secondary">
                  <div className="text-6xl mb-6">{icon}</div>
                  <h3 className="text-2xl font-display font-bold text-primary mb-3">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading eyebrow="Meet the team" title="Our Leadership" subtitle="Dedicated servants leading with wisdom and compassion" />
          <div className="grid md:grid-cols-3 gap-12">
            {LEADERS.map((l, i) => (
              <Reveal key={l.name} delay={i * 0.1} className="text-center group">
                <div className="relative w-56 h-56 mx-auto mb-7">
                  <Image src={l.image} alt={l.name} fill className="rounded-full object-cover border-4 border-secondary shadow-elevated group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-display font-bold text-primary">{l.name}</h3>
                <p className="text-secondary font-semibold mt-1">{l.role}</p>
                <p className="text-gray-500 mt-2 text-sm">{l.text}</p>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/leadership" className="text-primary font-bold hover:text-accent transition inline-flex items-center gap-1">
              Meet the full team →
            </Link>
          </div>
        </div>
      </section>

      {/* Ministries carousel */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading eyebrow="Get plugged in" title="Our Ministries" subtitle="Serving different seasons and stages of life" />
          <MinistryCarousel items={MINISTRIES} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-float" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionHeading eyebrow="Life change" title="What Our Members Say" subtitle="Real testimonies of God's transformative power" dark />
          <TestimonialCarousel />
        </div>
      </section>

      {/* Blog preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading eyebrow="Grow with us" title="From Our Blog" subtitle="Insights, teachings, and church updates" />
          <div className="grid md:grid-cols-3 gap-8">
            {BLOG.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.1}>
                <div className="rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(10,46,92,0.08)] bg-white group hover:shadow-elevated transition-shadow h-full flex flex-col">
                  <div className="h-52 overflow-hidden relative">
                    <Image src={b.image} alt={b.title} fill className="object-cover group-hover:scale-110 transition duration-500" />
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <p className="text-secondary text-xs font-bold uppercase tracking-wide">By {b.author}</p>
                    <h3 className="text-lg font-display font-bold text-primary mt-2 mb-3">{b.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">{b.excerpt}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link href="/blog" className="btn-shine inline-block bg-gradient-to-r from-primary to-accent text-white px-10 py-4 rounded-full font-semibold hover:shadow-elevated transition">
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading eyebrow="Stay informed" title="Church Announcements" subtitle="Stay up to date with what's happening at Last Bus Stop Ministry" />
          <AnnouncementFeed />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,168,38,0.15),transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-6">We&apos;d love to see you this Sunday</h2>
            <p className="text-white/70 text-lg mb-10">9:00 AM – 12:00 PM · Main Sanctuary, Agboju, Amuwo-Odofin</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/events" className="btn-shine bg-secondary text-primary px-8 py-4 rounded-full font-bold shadow-glow hover:scale-105 transition-transform">
                Plan Your Visit
              </Link>
              <Link href="/contact" className="btn-shine border-2 border-white/60 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition">
                Give Online
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
