import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { ministries, site } from "@/lib/site";
import { Container } from "./ui";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./Icons";

const quick = [
  { label: "Home", href: "/" }, { label: "About Us", href: "/about" }, { label: "Leadership", href: "/leadership" },
  { label: "Events", href: "/events" }, { label: "Blog", href: "/blog" }, { label: "Plan Your Visit", href: "/visit" },
  { label: "Prayer Request", href: "/prayer" }, { label: "Give", href: "/give" },
];

export default function Footer() {
  const h = "mb-6 flex items-center gap-3 font-display text-[18px] font-semibold text-paper";
  return (
    <footer className="relative overflow-hidden border-t border-paper/10 bg-ink">
      <div className="glow-bg absolute inset-0 opacity-80" />
      <Container className="relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image src="/assets/images/logo.png" alt={site.name} width={64} height={64} className="rounded-full ring-2 ring-gold/50" />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-paper/60">A vibrant Nigerian church committed to spreading the gospel and transforming lives through Christ.</p>
            <div className="mt-6 flex gap-3">
              {[{ Icon: FacebookIcon, href: site.social.facebook, l: "Facebook" }, { Icon: InstagramIcon, href: site.social.instagram, l: "Instagram" }, { Icon: YoutubeIcon, href: site.social.youtube, l: "YouTube" }].map(({ Icon, href, l }) => (
                <a key={l} href={href} target="_blank" rel="noopener noreferrer" aria-label={l} className="flex h-10 w-10 items-center justify-center rounded-full bg-paper/8 text-paper transition hover:-translate-y-1 hover:bg-gold hover:text-ink"><Icon className="h-4 w-4" /></a>
              ))}
            </div>
          </div>
          <div>
            <h3 className={h}><span className="h-6 w-1 rounded bg-gold" />Quick Links</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1">
              {quick.map((q) => <li key={q.href}><Link href={q.href} className="text-[15px] text-paper/60 transition hover:text-gold">{q.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className={h}><span className="h-6 w-1 rounded bg-gold" />Ministries</h3>
            <ul className="space-y-3">
              {ministries.map((m) => <li key={m.slug}><Link href={`/ministries/${m.slug}`} className="text-[15px] text-paper/60 transition hover:text-gold">{m.title}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className={h}><span className="h-6 w-1 rounded bg-gold" />Contact Info</h3>
            <ul className="space-y-4 text-[15px] text-paper/60">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{site.address}</li>
              <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={`tel:${site.phone.href}`} className="hover:text-gold">{site.phone.display}</a></li>
              <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-paper/10 pt-8 text-[14px] text-paper/45 md:flex-row">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="flex gap-4"><Link href="/privacy" className="hover:text-gold">Privacy Policy</Link><Link href="/terms" className="hover:text-gold">Terms of Service</Link></p>
        </div>
      </Container>
    </footer>
  );
}
