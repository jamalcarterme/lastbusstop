import type { Metadata } from "next";
import { PageHero, Container, Stagger, Item } from "@/components/ui";
import { MinistryCard } from "@/components/cards";
import CtaBand from "@/components/CtaBand";
import { ministries } from "@/lib/site";

export const metadata: Metadata = { title: "Ministries", description: "Children's Church, Women, Youth, Men, Music and Missions — find your place to serve and grow at Last Bus Stop Ministry." };

export default function Ministries() {
  return (
    <>
      <PageHero eyebrow="Our ministries" title="Serving different seasons and stages of life" text="Find your place to belong, grow and serve." />
      <section className="bg-ink py-24"><Container>
        <Stagger className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{ministries.map((m) => <Item key={m.slug}><MinistryCard m={m} /></Item>)}</Stagger>
      </Container></section>
      <CtaBand title="Ready to join a department?" text="Create a member account and choose your department." href="/contact" label="Get in touch" />
    </>
  );
}
