import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer id="footer" className="bg-gradient-to-b from-ink to-black text-white pt-20 pb-10 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Image src="/assets/images/logo.png" alt="Logo" width={48} height={48} className="rounded-full h-12 w-12 object-cover" />
              <span className="font-display font-bold">Last Bus Stop Ministry</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">
              A vibrant Nigerian church committed to spreading the gospel and transforming lives through Christ.
            </p>
            <div className="flex gap-3">
              {["f", "IG", "▶"].map((s) => (
                <a key={s} href="#" className="bg-white/10 hover:bg-secondary hover:text-primary text-white w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition">
                  {s}
                </a>
              ))}
            </div>
          </div>
          <FooterCol title="Quick Links" links={[["Home", "/"], ["About", "/about"], ["Ministries", "/ministries"], ["Events", "/events"], ["Sermons", "/sermons"], ["Blog", "/blog"]]} />
          <FooterCol title="Get Involved" links={[["Leadership", "/leadership"], ["Prayer Wall", "/prayer"], ["Contact & Give", "/contact"]]} />
          <div>
            <h3 className="text-lg font-display font-bold mb-6 flex items-center">
              <span className="w-1 h-6 bg-secondary mr-3 rounded" />Contact Info
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>212, Old Ojo Road, Agboju, Amuwo-Odofin, Lagos, Nigeria</li>
              <li>+234-805-551-5723</li>
              <li>info@lastbusstopministry.org</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Last Bus Stop Ministry. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 className="text-lg font-display font-bold mb-6 flex items-center">
        <span className="w-1 h-6 bg-secondary mr-3 rounded" />
        {title}
      </h3>
      <ul className="space-y-4 text-sm">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className="text-gray-400 hover:text-secondary transition">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
