"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingActions from "./FloatingActions";

/** Public site chrome; the member dashboard renders its own shell. */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const inDashboard = usePathname().startsWith("/dashboard");
  if (inDashboard) return <>{children}</>;
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}
