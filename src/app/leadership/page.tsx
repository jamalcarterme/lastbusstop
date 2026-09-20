import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, Container, Stagger, Item } from "@/components/ui";
import CtaBand from "@/components/CtaBand";
import { leaders } from "@/lib/site";

export const metadata: Metadata = { title: "Our Leadership", description: "Meet the pastors and leaders of Last Bus Stop Ministry." };

export default function Leadership() {
  return (
    <>
      <PageHero eyebrow="Our leadership" title="Dedicated servants leading with wisdom and compassion" />
      <section className="bg-paper py-24 text-navy"><Container>
        <Stagger className="grid gap-12 md:grid-cols-3">{leaders.map((l) => (
          <Item key={l.name}><div className="group rounded-3xl bg-white p-8 text-center shadow-xl transition hover:-translate-y-2">
            <div className="relative mx-auto h-52 w-52"><Image src={l.image} alt={`${l.name} - ${l.role}`} fill sizes="208px" className="rounded-full border-4 border-gold object-cover" /></div>
            <h3 className="mt-6 font-display text-[22px] font-semibold">{l.name}</h3><p className="mt-1 font-semibold text-gold-dark">{l.role}</p><p className="mt-2 text-navy/65">{l.text}</p>
          </div></Item>))}</Stagger>
      </Container></section>
      <CtaBand />
    </>
  );
}
