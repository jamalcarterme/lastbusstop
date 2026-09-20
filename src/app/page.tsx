import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Target, Telescope } from "lucide-react";
import Hero from "@/components/Hero";
import FeatureCarousel from "@/components/FeatureCarousel";
import Testimonials from "@/components/Testimonials";
import Announcements from "@/components/Announcements";
import { Marquee, MinistryCard, PostCard } from "@/components/cards";
import { ButtonLink, Container, Eyebrow, Item, Reveal, SectionHeading, Stagger } from "@/components/ui";
import { foundation, leaders, ministries, posts } from "@/lib/site";

const icons = { Target, Telescope, Heart } as const;

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee words={["Worship", "Prayer", "Fellowship", "Evangelism", "Discipleship"]} />

      {/* About */}
      <section className="bg-paper py-24 text-navy">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <Reveal><Eyebrow light>About our church</Eyebrow></Reveal>
              <Reveal delay={0.05}><h2 className="balance mt-4 font-display text-[36px] font-semibold leading-tight sm:text-[46px]">A Spirit-filled family in the heart of Lagos</h2></Reveal>
              <Reveal delay={0.1}><p className="mt-6 text-[17px] leading-relaxed text-navy/75">Last Bus Stop Ministry is a vibrant, Spirit-filled church located in Agboju, Amuwo-Odofin, Lagos. We are dedicated to spreading the unadulterated Word of God and making disciples of all nations, starting from our community.</p></Reveal>
              <Reveal delay={0.15}><p className="mt-5 text-[17px] leading-relaxed text-navy/75">Our services are filled with powerful worship, dynamic preaching, and a warm Nigerian hospitality that makes every visitor feel like family. We believe in the transformative power of Christ and are committed to equipping believers for effective Christian living.</p></Reveal>
              <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-4"><ButtonLink href="/about">Learn More</ButtonLink><ButtonLink href="/visit" variant="ghost" className="!border-navy !text-navy hover:!bg-navy/5">Plan Your Visit</ButtonLink></Reveal>
            </div>
            <Reveal delay={0.1} className="relative">
              <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-tr from-gold/40 to-transparent blur-2xl" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] shadow-2xl">
                <Image src="/assets/images/blog/spirit.jpg" alt="Spirit-filled worship and spiritual growth at Last Bus Stop Ministry" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Foundation */}
      <section className="glow-bg bg-charcoal py-24">
        <Container>
          <SectionHeading eyebrow="Our foundation" title="The core principles that guide our ministry" />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {foundation.map((f) => {
              const Icon = icons[f.icon as keyof typeof icons];
              return (
                <Item key={f.title}>
                  <div className="group h-full rounded-3xl border border-paper/10 bg-ink/50 p-9 text-center transition duration-300 hover:-translate-y-2 hover:border-gold/50">
                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/15 text-gold transition group-hover:bg-gold group-hover:text-ink"><Icon className="h-8 w-8" /></span>
                    <h3 className="mt-6 font-display text-[24px] font-semibold">{f.title}</h3>
                    <p className="mt-3 leading-relaxed text-paper/65">{f.text}</p>
                  </div>
                </Item>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* Carousel */}
      <section className="overflow-hidden bg-ink py-24">
        <Container className="mb-14"><SectionHeading eyebrow="Life at Last Bus Stop" title="Worship, the Word and a family that welcomes you" text="Swipe, drag or use the arrows to explore what happens at our church." /></Container>
        <FeatureCarousel />
      </section>

      {/* Leadership */}
      <section className="bg-paper py-24 text-navy">
        <Container>
          <SectionHeading light eyebrow="Our leadership" title="Dedicated servants leading with wisdom and compassion" />
          <Stagger className="mt-14 grid gap-12 md:grid-cols-3">
            {leaders.map((l) => (
              <Item key={l.name}>
                <div className="group text-center">
                  <div className="relative mx-auto h-56 w-56">
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-gold to-transparent opacity-70 blur-md transition group-hover:opacity-100" />
                    <Image src={l.image} alt={`${l.name} - ${l.role}`} fill sizes="224px" className="relative rounded-full border-4 border-gold object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.04]" />
                  </div>
                  <h3 className="mt-7 font-display text-[22px] font-semibold">{l.name}</h3>
                  <p className="mt-1 font-semibold text-gold-dark">{l.role}</p>
                  <p className="mx-auto mt-2 max-w-xs text-navy/65">{l.text}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Ministries */}
      <section className="bg-charcoal py-24">
        <Container>
          <SectionHeading eyebrow="Our ministries" title="Serving different seasons and stages of life" />
          <Stagger className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {ministries.slice(0, 4).map((m) => <Item key={m.slug}><MinistryCard m={m} /></Item>)}
          </Stagger>
          <Reveal className="mt-12 text-center"><ButtonLink href="/ministries" variant="ghost">All ministries <ArrowRight className="h-4 w-4" /></ButtonLink></Reveal>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-[#064d33] py-24">
        <div className="absolute left-10 top-16 h-72 w-72 animate-float rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 animate-float-slow rounded-full bg-grace/25 blur-3xl" />
        <Container className="relative">
          <SectionHeading eyebrow="Testimonies" title="What our members say" text="Real testimonies of God's transformative power." />
          <div className="mt-14"><Testimonials /></div>
        </Container>
      </section>

      {/* Blog */}
      <section className="bg-paper py-24 text-navy">
        <Container>
          <SectionHeading light eyebrow="From our blog" title="Insights, teachings and church updates" />
          <Stagger className="mt-14 grid gap-8 md:grid-cols-3">
            {posts.map((p) => <Item key={p.slug}><PostCard p={p} light /></Item>)}
          </Stagger>
          <Reveal className="mt-12 text-center"><ButtonLink href="/blog">View All Articles</ButtonLink></Reveal>
        </Container>
      </section>

      {/* Announcements (live from backend) */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHeading eyebrow="Church announcements" title="Stay up to date with what's happening" text="Fresh from our church office — updated live." />
          <div className="mt-12"><Announcements /></div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gold-dark via-gold to-gold-light py-20 text-ink">
        <div className="grain absolute inset-0" />
        <Container className="relative flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <div>
            <h2 className="balance font-display text-[34px] font-semibold leading-tight sm:text-[42px]">There&apos;s a seat waiting for you this Sunday</h2>
            <p className="mt-2 text-[17px] text-ink/75">Service holds every Sunday, 9:00 AM – 12:00 PM at 212, Old Ojo Road, Agboju.</p>
          </div>
          <Link href="/visit" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-8 py-4 text-[13px] font-semibold uppercase tracking-wide text-gold transition hover:scale-105">Plan your visit <ArrowRight className="h-4 w-4" /></Link>
        </Container>
      </section>
    </>
  );
}
