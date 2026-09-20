import type { Metadata } from "next";
import { PageHero, Container } from "@/components/ui";
import { PrayerForm } from "@/components/forms";

export const metadata: Metadata = { title: "Prayer Request", description: "Send your prayer request to the Last Bus Stop Ministry prayer team." };

export default function Prayer() {
  return (
    <>
      <PageHero eyebrow="Prayer request" title="We'd love to stand with you in prayer" text="Share what's on your heart and our prayer team will pray with you." />
      <section className="glow-bg bg-ink py-24"><Container className="max-w-3xl"><PrayerForm /></Container></section>
    </>
  );
}
