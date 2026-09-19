import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://lastbusstopministry.org"),
  title: "Last Bus Stop Ministry - Best Church in Lagos",
  description:
    "Last Bus Stop Ministry - Best church in Lagos. Experience powerful worship and life-changing messages at Last Bus Stop Ministry, Agboju, Amuwo-Odofin, Lagos.",
  keywords: ["Best church in Lagos", "Top churches in Nigeria", "Church in Amuwo Odofin", "Church near Agboju Lagos", "Last Bus Stop Ministry Lagos"],
  icons: { icon: "/assets/images/favicon.ico" },
  openGraph: {
    type: "website",
    title: "Last Bus Stop Ministry - Best Church in Lagos",
    description: "Experience powerful worship and life-changing messages at Last Bus Stop Ministry, Lagos.",
    images: ["/assets/images/logo.png"],
    url: "https://lastbusstopministry.org",
    siteName: "Last Bus Stop Ministry",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans text-ink antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
