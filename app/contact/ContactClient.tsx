"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Landmark, MapPin, Phone, Mail } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";

type Account = { _id?: string; bankName: string; accountNumber: string; accountName: string };

export default function ContactClient() {
  const { user, openAuthModal } = useAuth();
  const [accounts, setAccounts] = useState<Account[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!user) return;
    api.paymentAccounts
      .active()
      .then((data) => setAccounts(data?.accounts || []))
      .catch(() => setError(true));
  }, [user]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-3xl shadow-[0_8px_32px_rgba(10,46,92,0.08)]">
        <h2 className="text-2xl font-display font-bold text-primary mb-6">Visit / Reach Us</h2>
        <ul className="space-y-4 text-gray-700">
          <li className="flex gap-3">
            <MapPin className="text-secondary shrink-0" size={20} />
            212, Old Ojo Road, Agboju, Amuwo-Odofin, Lagos, Nigeria
          </li>
          <li className="flex gap-3">
            <Phone className="text-secondary shrink-0" size={20} />
            +234-805-551-5723
          </li>
          <li className="flex gap-3">
            <Mail className="text-secondary shrink-0" size={20} />
            info@lastbusstopministry.org
          </li>
        </ul>
        <p className="text-gray-500 mt-6 text-sm">We&apos;d love to see you this Sunday at 9:00 AM!</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-[0_8px_32px_rgba(10,46,92,0.08)]">
        <h2 className="text-2xl font-display font-bold text-primary mb-3 flex items-center gap-2">
          <Landmark className="text-secondary" size={22} /> Give Online
        </h2>
        <p className="text-gray-500 mb-5 text-sm">
          Make a payment to any account below, then{" "}
          {user ? (
            <a href="#" className="text-secondary font-semibold hover:underline">
              upload your receipt from your member dashboard
            </a>
          ) : (
            <button onClick={() => openAuthModal("login")} className="text-secondary font-semibold hover:underline">
              log in to your member account
            </button>
          )}{" "}
          to upload your receipt for verification.
        </p>

        {!user && (
          <p className="text-gray-500 text-sm bg-gray-50 rounded-xl p-4">
            Please log in as a member to view our official payment accounts and give securely.
          </p>
        )}

        {user && !accounts && !error && (
          <div className="space-y-3">
            {[0, 1].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        )}
        {user && error && <p className="text-gray-500 text-sm">Could not load payment accounts.</p>}
        {user && accounts && !accounts.length && <p className="text-gray-500 text-sm">No active accounts at the moment.</p>}
        {user && accounts && !!accounts.length && (
          <div className="grid grid-cols-1 gap-4">
            {accounts.map((acc, i) => (
              <motion.div
                key={acc._id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="border border-gray-200 rounded-xl p-4"
              >
                <p className="text-xs font-bold text-secondary uppercase tracking-wide">{acc.bankName}</p>
                <p className="text-xl font-display font-bold text-primary">{acc.accountNumber}</p>
                <p className="text-sm text-gray-600">{acc.accountName}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
