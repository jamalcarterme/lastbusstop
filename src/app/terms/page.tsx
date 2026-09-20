import type { Metadata } from "next";
import { PageHero, Container } from "@/components/ui";

export const metadata: Metadata = { title: "Terms of Service" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" />
      <section className="bg-paper py-20 text-navy"><Container className="max-w-3xl"><p className="text-[17px] leading-[1.8] text-navy/80">By using this website and member portal you agree to use them lawfully and respectfully. Members are responsible for keeping their login details private and for the accuracy of receipts they upload. Giving receipts are subject to verification by church administrators. Last Bus Stop Ministry may suspend accounts that misuse the portal. Content on this site is provided for spiritual encouragement and information. For any questions, contact info@lastbusstopministry.org.</p></Container></section>
    </>
  );
}
