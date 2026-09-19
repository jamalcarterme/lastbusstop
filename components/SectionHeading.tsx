import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <div className="text-center mb-16">
      <Reveal>
        <span className="section-eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className={`text-4xl md:text-5xl font-display font-extrabold mt-3 mb-4 ${dark ? "text-white" : "text-primary"}`}>{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className={`text-lg max-w-2xl mx-auto ${dark ? "text-white/70" : "text-gray-600"}`}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
