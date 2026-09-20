import type { Metadata } from "next";
import { PageHero, Container, Stagger, Item } from "@/components/ui";
import { PostCard } from "@/components/cards";
import { posts } from "@/lib/site";

export const metadata: Metadata = { title: "Blog", description: "Insights, teachings and church updates from Last Bus Stop Ministry." };

export default function Blog() {
  return (
    <>
      <PageHero eyebrow="Blog" title="From Our Blog" text="Insights, teachings, and church updates." />
      <section className="bg-paper py-24 text-navy"><Container>
        <Stagger className="grid gap-8 md:grid-cols-3">{posts.map((p) => <Item key={p.slug}><PostCard p={p} light /></Item>)}</Stagger>
        <p className="mt-14 text-center text-navy/50">More articles coming soon.</p>
      </Container></section>
    </>
  );
}
