import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata = { title: "Blog - Last Bus Stop Ministry" };

const POSTS = [
  { title: "The Power of Persistent Prayer", author: "Pastor Chinyere Amaechi", image: "/assets/images/blog/prayer.jpg", excerpt: "Discover how consistent prayer can transform your spiritual life and bring breakthrough." },
  { title: "Raising Godly Children in Modern Nigeria", author: "Evangelist Solomon Amaechi", image: "/assets/images/blog/children.jpg", excerpt: "Practical biblical wisdom for parents navigating today's world." },
  { title: "The Holy Spirit and Spiritual Gifts", author: "Pastor Chinyere Amaechi", image: "/assets/images/blog/spirit.jpg", excerpt: "Understanding the manifestations of the Holy Spirit and your spiritual gifts." },
];

export default function Blog() {
  return (
    <>
      <PageHero eyebrow="Grow with us" title="From Our Blog" subtitle="Insights, teachings, and church updates" />
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {POSTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <article className="rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(10,46,92,0.08)] bg-white group hover:shadow-elevated transition-shadow h-full flex flex-col">
                  <div className="h-52 overflow-hidden relative">
                    <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-110 transition duration-500" />
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <p className="text-secondary text-xs font-bold uppercase tracking-wide">By {p.author}</p>
                    <h3 className="text-lg font-display font-bold text-primary mt-2 mb-3">{p.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">{p.excerpt}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-14">More articles coming soon.</p>
        </div>
      </section>
    </>
  );
}
