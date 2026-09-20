import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageHero, Container, Reveal, ButtonLink } from "@/components/ui";
import { ministries } from "@/lib/site";

export function generateStaticParams() { return ministries.map((m) => ({ slug: m.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = ministries.find((x) => x.slug === slug);
  return m ? { title: m.title, description: m.text } : {};
}

export default async function MinistryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = ministries.find((x) => x.slug === slug);
  if (!m) notFound();
  return (
    <>
      <PageHero eyebrow="Ministry" title={m.title} text={m.short} />
      <section className="bg-paper py-24 text-navy"><Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal><p className="text-[18px] leading-relaxed text-navy/75">{m.text}</p></Reveal>
            <ul className="mt-8 space-y-4">{m.points.map((p, i) => (
              <Reveal key={p} delay={i * 0.08}><li className="flex items-start gap-3 text-[16px] text-navy/80"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" />{p}</li></Reveal>))}</ul>
            <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-4"><ButtonLink href="/events">See programs</ButtonLink><ButtonLink href="/ministries" variant="ghost" className="!border-navy !text-navy hover:!bg-navy/5">All ministries</ButtonLink></Reveal>
          </div>
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[32px] bg-gradient-to-br from-navy to-navy-2 shadow-2xl">
            {m.image && <Image src={m.image} alt={m.title} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />}
          </Reveal>
        </div>
      </Container></section>
    </>
  );
}
