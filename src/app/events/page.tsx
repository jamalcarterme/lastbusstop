import type { Metadata } from "next";
import { PageHero, Container, SectionHeading, Stagger, Item } from "@/components/ui";
import { EventCard } from "@/components/cards";
import Announcements from "@/components/Announcements";
import CtaBand from "@/components/CtaBand";
import { services } from "@/lib/site";

export const metadata: Metadata = { title: "Weekly Programs & Events", description: "Sunday worship, midweek prayer, youth fellowship and women's ministry meetings at Last Bus Stop Ministry." };

export default function Events() {
  return (
    <>
      <PageHero eyebrow="Programs & events" title="Weekly Programs & Events" text="Come and be part of what God is doing." />
      <section className="bg-paper py-24 text-navy"><Container>
        <Stagger className="grid gap-7 md:grid-cols-2">{services.map((e) => <Item key={e.title}><EventCard e={e} light /></Item>)}</Stagger>
      </Container></section>
      <section className="bg-ink py-24"><Container>
        <SectionHeading eyebrow="Announcements" title="Church announcements" />
        <div className="mt-12"><Announcements /></div>
      </Container></section>
      <CtaBand />
    </>
  );
}
