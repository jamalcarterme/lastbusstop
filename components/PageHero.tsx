import Reveal from "./Reveal";

export default function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="relative pt-40 pb-24 bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(249,168,38,0.18),transparent_55%)]" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float" />
      <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
        <Reveal>
          <span className="section-eyebrow">{eyebrow}</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white mt-3 mb-5">{title}</h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.1}>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">{subtitle}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
