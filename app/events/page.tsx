import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import AnnouncementFeed from "@/components/AnnouncementFeed";

export const metadata = { title: "Events - Last Bus Stop Ministry" };

const PROGRAMS = [
  { title: "Sunday Worship Service", tag: "Sundays", time: "9:00 AM – 12:00 PM", location: "Main Sanctuary", text: "Experience powerful worship and life-changing messages from God's Word." },
  { title: "Midweek Prayer Meeting", tag: "Wednesdays", time: "6:00 PM – 8:00 PM", location: "Prayer Hall", text: "Join us for fervent prayer and spiritual breakthrough." },
  { title: "Youth Fellowship Night", tag: "Fridays", time: "7:00 PM – 9:00 PM", location: "Youth Center", text: "Dynamic programs for young people to grow in faith and fellowship." },
  { title: "Women's Ministry Meeting", tag: "Monthly", time: "9:00 AM – 1:00 PM", location: "Main Sanctuary", text: "Empowering women of God for greater impact in their homes and communities." },
];

export default function Events() {
  return (
    <>
      <PageHero eyebrow="What's on" title="Weekly Programs & Events" subtitle="There's always a reason to gather at Last Bus Stop Ministry" />

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="bg-white p-8 rounded-3xl shadow-[0_8px_32px_rgba(10,46,92,0.08)] border border-primary/5 hover:shadow-elevated hover:-translate-y-1 transition-all h-full">
                <div className="flex justify-between items-start mb-3 gap-2 flex-wrap">
                  <h3 className="text-xl font-display font-bold text-primary">{p.title}</h3>
                  <span className="bg-secondary text-primary px-3 py-1 rounded-full text-xs font-bold">{p.tag}</span>
                </div>
                <p className="text-gray-500 text-sm mb-1">
                  <strong className="text-gray-700">Time:</strong> {p.time}
                </p>
                <p className="text-gray-500 text-sm mb-3">
                  <strong className="text-gray-700">Location:</strong> {p.location}
                </p>
                <p className="text-gray-600 leading-relaxed">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading eyebrow="Stay in the loop" title="Church Announcements" />
          <AnnouncementFeed />
        </div>
      </section>
    </>
  );
}
