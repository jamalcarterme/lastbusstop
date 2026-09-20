import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero, Container, Stagger, Item, Reveal, ButtonLink } from "@/components/ui";
import { MessageForm } from "@/components/forms";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact & Give", description: "Visit, call or message Last Bus Stop Ministry in Agboju, Lagos." };

export default function Contact() {
  const cards = [
    { Icon: MapPin, t: "Address", v: site.address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}` },
    { Icon: Phone, t: "Phone", v: site.phone.display, href: `tel:${site.phone.href}` },
    { Icon: Mail, t: "Email", v: site.email, href: `mailto:${site.email}` },
  ];
  return (
    <>
      <PageHero eyebrow="Contact & give" title="Visit or reach us" text="We'd love to see you this Sunday at 9:00 AM!" />
      <section className="bg-ink py-24"><Container>
        <Stagger className="grid gap-6 md:grid-cols-3">{cards.map(({ Icon, t, v, href }) => (
          <Item key={t}><a href={href} className="group flex h-full flex-col items-center rounded-3xl border border-paper/10 bg-charcoal p-8 text-center transition hover:-translate-y-2 hover:border-gold/50">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold transition group-hover:bg-gold group-hover:text-ink"><Icon className="h-6 w-6" /></span>
            <h3 className="mt-5 text-[13px] font-semibold uppercase tracking-widest text-paper/50">{t}</h3><p className="mt-2 break-words text-[16px] font-medium">{v}</p></a></Item>))}</Stagger>
        <div className="mt-14 grid items-start gap-10 lg:grid-cols-2">
          <Reveal><MessageForm /></Reveal>
          <Reveal delay={0.1} className="glass rounded-3xl p-8 sm:p-10">
            <h3 className="font-display text-[26px] font-semibold">Give online</h3>
            <p className="mt-3 leading-relaxed text-paper/70">Make a payment to any official account, then log in to your member account to upload your receipt for verification.</p>
            <div className="mt-6 flex flex-wrap gap-3"><ButtonLink href="/give">Give now</ButtonLink><ButtonLink href="/prayer" variant="ghost">Prayer request</ButtonLink></div>
          </Reveal>
        </div>
      </Container></section>
    </>
  );
}
