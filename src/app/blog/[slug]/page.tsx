import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { PageHero, Container, Reveal, Stagger, Item } from "@/components/ui";
import { PostCard } from "@/components/cards";
import { posts } from "@/lib/site";

export function generateStaticParams() { return posts.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();
  const more = posts.filter((x) => x.slug !== p.slug);
  return (
    <>
      <PageHero eyebrow={p.date} title={p.title}><p className="mt-5 flex items-center justify-center gap-3 text-[14px] text-paper/60">By {p.author} <span>·</span><span className="flex items-center gap-1"><Clock className="h-4 w-4" />{p.readTime}</span></p></PageHero>
      <article className="bg-paper py-20 text-navy"><Container className="max-w-3xl">
        <Reveal className="relative -mt-40 mb-12 aspect-[16/9] overflow-hidden rounded-[28px] shadow-2xl"><Image src={p.image} alt={p.title} fill priority sizes="768px" className="object-cover" /></Reveal>
        <div className="space-y-6 text-[18px] leading-[1.8] text-navy/80">{p.body.map((t, i) => <Reveal key={i}><p>{t}</p></Reveal>)}</div>
        <Link href="/blog" className="mt-12 inline-flex items-center gap-2 font-semibold text-gold-dark transition-all hover:gap-3"><ArrowLeft className="h-4 w-4" />Back to all articles</Link>
      </Container></article>
      <section className="bg-charcoal py-20"><Container>
        <h2 className="mb-10 text-center font-display text-[30px] font-semibold">Keep reading</h2>
        <Stagger className="mx-auto grid max-w-3xl gap-8 md:grid-cols-2">{more.map((x) => <Item key={x.slug}><PostCard p={x} /></Item>)}</Stagger>
      </Container></section>
    </>
  );
}
