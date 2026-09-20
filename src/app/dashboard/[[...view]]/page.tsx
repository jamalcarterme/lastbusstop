import type { Metadata } from "next";
import DashboardApp from "@/components/dashboard/DashboardApp";

export const metadata: Metadata = { title: "Member Dashboard", robots: { index: false } };

export default async function Page({ params }: { params: Promise<{ view?: string[] }> }) {
  const { view } = await params;
  return <DashboardApp view={view?.[0] || ""} />;
}
