import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { PageHero, Container, SectionHeading, Stagger, Item, ButtonLink } from "@/components/ui";
import { EventCard } from "@/components/cards";
import Faq from "@/components/Faq";
import { faqs, services, site } from "@/lib/site";

export const metadata: Metadata = { title: "Plan Your Visit", description: "Service times, directions and answers to common questions for first-time visitors at Last Bus Stop Ministry, Agboju, Lagos." };

export default function Visit() {
  const map = `https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`;
  return (
    <>
      <PageHero eyebrow="Plan your visit" title="We'd love to see you this Sunday" text="Come as you are — you'll be welcomed like family." />
      <section className="bg-paper py-24 text-navy"><Container>
        <Stagger className="grid gap-7 md:grid-cols-2">{services.map((e) => <Item key={e.title}><EventCard e={e} light /></Item>)}</Stagger>
      </Container></section>
      <section className="bg-ink py-24"><Container>
        <div className="grid items-stretch gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <SectionHeading center={false} eyebrow="Find us" title="212, Old Ojo Road, Agboju" text="Amuwo-Odofin, Lagos, Nigeria" />
            <div className="mt-8 flex flex-wrap gap-4"><ButtonLink external href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.address)}`}><MapPin className="h-4 w-4" />Get directions</ButtonLink><ButtonLink href="/contact" variant="ghost">Contact us</ButtonLink></div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-paper/12 shadow-2xl"><iframe title="Map to Last Bus Stop Ministry" src={map} loading="lazy" className="h-[380px] w-full border-0" /></div>
        </div>
      </Container></section>
      <section className="bg-charcoal py-24"><Container><SectionHeading eyebrow="First-time visitors" title="Frequently asked questions" /><div className="mt-12"><Faq items={faqs} /></div></Container></section>
    </>
  );
}
