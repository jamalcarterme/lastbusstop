"use client";
import { AuthProvider } from "@/lib/AuthContext";
import { ToastProvider } from "@/lib/Toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AuthModal from "./AuthModal";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <AuthModal />
      </AuthProvider>
    </ToastProvider>
  );
}
