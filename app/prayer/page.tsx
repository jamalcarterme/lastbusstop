import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import PrayerForm from "./PrayerForm";

export const metadata = { title: "Prayer Requests - Last Bus Stop Ministry" };

export default function Prayer() {
  return (
    <>
      <PageHero eyebrow="You are not alone" title="Submit a Prayer Request" subtitle="Our prayer team stands with you. Share what's on your heart below." />
      <section className="py-24 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <Reveal>
            <PrayerForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
