import type { Metadata } from "next";
import { PageHero, Container } from "@/components/ui";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="bg-paper py-20 text-navy"><Container className="max-w-3xl"><p className="text-[17px] leading-[1.8] text-navy/80">We collect only the information you provide when you create an account, upload a receipt, or contact us (such as name, email, phone number and department). We use it to run your member account, verify giving receipts and communicate with you. We do not sell your information. Receipts and account data are stored on our secured backend and are accessible only to you and authorised church administrators. To request changes or deletion of your data, contact info@lastbusstopministry.org.</p></Container></section>
    </>
  );
}
