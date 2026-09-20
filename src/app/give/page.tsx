import type { Metadata } from "next";
import { PageHero, Container, SectionHeading, Stagger, Item } from "@/components/ui";
import { GiveAccounts } from "@/components/forms";

export const metadata: Metadata = { title: "Give", description: "Give your tithes, offerings and seeds to Last Bus Stop Ministry." };
const steps = [["1", "Make your payment", "Pay your tithe, offering or seed into any official account below."], ["2", "Log in", "Sign in to your member account."], ["3", "Upload your receipt", "Upload the receipt from your dashboard so it can be verified and recorded."]];

export default function Give() {
  return (
    <>
      <PageHero eyebrow="Give" title="Give cheerfully, give faithfully" text="Your giving powers worship, outreach and the work of the ministry." />
      <section className="bg-charcoal py-20"><Container>
        <Stagger className="grid gap-6 md:grid-cols-3">{steps.map(([n, t, d]) => (
          <Item key={n}><div className="h-full rounded-3xl border border-paper/10 bg-ink/50 p-8"><span className="gold-text font-display text-[44px] font-semibold">{n}</span><h3 className="mt-2 text-[18px] font-bold">{t}</h3><p className="mt-2 text-paper/65">{d}</p></div></Item>))}</Stagger>
      </Container></section>
      <section className="bg-ink py-24"><Container className="max-w-4xl"><SectionHeading eyebrow="Official accounts" title="Where to give" /><div className="mt-12"><GiveAccounts /></div></Container></section>
    </>
  );
}
