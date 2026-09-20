import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Target, Telescope } from "lucide-react";
import { PageHero, Container, Reveal, Stagger, Item, SectionHeading, ButtonLink } from "@/components/ui";
import CtaBand from "@/components/CtaBand";
import { foundation, site } from "@/lib/site";

export const metadata: Metadata = { title: "About Us", description: "Learn about Last Bus Stop Ministry — a vibrant, Spirit-filled church in Agboju, Amuwo-Odofin, Lagos." };
const icons = { Target, Telescope, Heart } as const;

export default function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="About Last Bus Stop Ministry" text="A vibrant, Spirit-filled church dedicated to spreading the unadulterated Word of God." />
      <section className="bg-paper py-24 text-navy">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="space-y-5 text-[17px] leading-relaxed text-navy/75">
              <Reveal><p>Last Bus Stop Ministry is a vibrant, Spirit-filled church located at {site.address}. We are dedicated to spreading the unadulterated Word of God and making disciples of all nations, starting from our community.</p></Reveal>
              <Reveal delay={0.1}><p>Our services are filled with powerful worship, dynamic preaching, and warm Nigerian hospitality that makes every visitor feel like family. We believe in the transformative power of Christ and are committed to equipping believers for effective Christian living through our Men&apos;s, Women&apos;s, and Youth ministries.</p></Reveal>
              <Reveal delay={0.2} className="flex flex-wrap gap-4 pt-2"><ButtonLink href="/ministries">Our ministries</ButtonLink><ButtonLink href="/leadership" variant="ghost" className="!border-navy !text-navy hover:!bg-navy/5">Meet our leaders</ButtonLink></Reveal>
            </div>
            <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[32px] shadow-2xl"><Image src="/assets/images/blog/prayer.jpg" alt="Prayer at Last Bus Stop Ministry" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" /></Reveal>
          </div>
        </Container>
      </section>
      <section className="glow-bg bg-charcoal py-24">
        <Container>
          <SectionHeading eyebrow="What we believe" title="Mission, vision and values" />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {foundation.map((f) => { const Icon = icons[f.icon as keyof typeof icons]; return (
              <Item key={f.title}><div className="h-full rounded-3xl border border-paper/10 bg-ink/50 p-9 text-center transition hover:-translate-y-2 hover:border-gold/50"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/15 text-gold"><Icon className="h-8 w-8" /></span><h3 className="mt-6 font-display text-[24px] font-semibold">{f.title}</h3><p className="mt-3 text-paper/65">{f.text}</p></div></Item>); })}
          </Stagger>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
