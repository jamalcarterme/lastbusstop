import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container, Reveal } from "./ui";

export default function CtaBand({ title = "We'd love to see you this Sunday", text = "Service holds every Sunday, 9:00 AM – 12:00 PM.", href = "/visit", label = "Plan your visit" }: { title?: string; text?: string; href?: string; label?: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gold-dark via-gold to-gold-light py-16 text-ink">
      <div className="grain absolute inset-0" />
      <Container className="relative">
        <Reveal className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div><h2 className="balance font-display text-[30px] font-semibold leading-tight sm:text-[38px]">{title}</h2><p className="mt-1 text-ink/75">{text}</p></div>
          <Link href={href} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-8 py-4 text-[13px] font-semibold uppercase tracking-wide text-gold transition hover:scale-105">{label} <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
      </Container>
    </section>
  );
}
