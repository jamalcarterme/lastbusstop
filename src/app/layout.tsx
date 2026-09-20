import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/playfair-display";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import SiteChrome from "@/components/SiteChrome";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: { default: "Last Bus Stop Ministry - Best Church in Lagos", template: "%s | Last Bus Stop Ministry" },
  description: "Last Bus Stop Ministry - Best church in Lagos. Top churches in Nigeria. Church in Amuwo Odofin. Church near Agboju Lagos.",
  keywords: ["Best church in Lagos", "Top churches in Nigeria", "Church in Amuwo Odofin", "Church near Agboju Lagos", "Last Bus Stop Ministry Lagos"],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website", url: site.domain, siteName: site.name,
    title: "Last Bus Stop Ministry - Best Church in Lagos",
    description: "Experience powerful worship and life-changing messages at Last Bus Stop Ministry, Lagos.",
    images: ["/assets/images/logo.png"],
  },
  twitter: { card: "summary_large_image", title: "Last Bus Stop Ministry - Best Church in Lagos", description: "Experience powerful worship and life-changing messages at Last Bus Stop Ministry, Lagos.", images: ["/assets/images/logo.png"] },
  icons: { icon: "/assets/images/favicon.ico" },
};

export const viewport: Viewport = { themeColor: "#050c19" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ReligiousOrganization",
  name: site.name,
  url: site.domain,
  logo: `${site.domain}/assets/images/logo.png`,
  description: "A vibrant Nigerian church committed to spreading the gospel and transforming lives through Christ.",
  address: { "@type": "PostalAddress", streetAddress: "212, Old Ojo Road", addressLocality: "Agboju, Amuwo-Odofin", addressRegion: "Lagos", postalCode: "102102", addressCountry: "NG" },
  telephone: site.phone.href,
  email: site.email,
  sameAs: Object.values(site.social),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Warm up the connections the hero video needs so it starts the instant the page loads */}
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <AuthProvider>
          <SiteChrome>{children}</SiteChrome>
        </AuthProvider>
      </body>
    </html>
  );
}
