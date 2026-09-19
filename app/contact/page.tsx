import PageHero from "@/components/PageHero";
import ContactClient from "./ContactClient";

export const metadata = { title: "Contact & Give - Last Bus Stop Ministry" };

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="We're here for you" title="Contact & Give" subtitle="Reach out, plan a visit, or give securely online" />
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <ContactClient />
        </div>
      </section>
    </>
  );
}
