"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { api, BASE_URL, type R } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { AUDIENCE_LABELS, Async, Badge, DEPT_LABELS, Empty, Modal, Panel, StatCard, Table, btnGhost, btnGold, btnPrimary, fdate, inputCls, labelCls, money, useLoad } from "./DashUI";

const Row = ({ r }: { r: R }) => (
  <div className="flex items-center justify-between gap-3 border-b border-navy/8 py-3 last:border-0">
    <div><p className="font-semibold text-navy">{money(r.amount)} <span className="text-[12px] font-normal capitalize text-navy/50">• {r.paymentType}</span></p><p className="text-[12px] text-navy/45">{fdate(r.uploadDate)}</p></div>
    <Badge status={r.approvalStatus} />
  </div>
);
const AnnCard = ({ a }: { a: R }) => (
  <div className="border-b border-navy/8 py-3 last:border-0"><div className="flex justify-between gap-2"><p className="font-semibold text-navy">{a.title}</p><span className="text-[12px] text-navy/40">{fdate(a.createdAt)}</span></div><p className="mt-1 text-[14px] text-navy/65">{a.content}</p></div>
);

export function Overview() {
  const { user, isAdmin } = useAuth();
  const { data, loading, error } = useLoad<R>(async () => {
    if (isAdmin) { const [a, d] = await Promise.all([api.analytics.overview(), api.analytics.department()]); return { a: a.analytics, d: d.departments }; }
    const [r, n] = await Promise.all([api.receipts.mine({ limit: 5 }), api.announcements.visible()]);
    return { receipts: r.receipts || [], ann: n.announcements || [] };
  }, [isAdmin]);
  return (
    <Async loading={loading} error={error} text="Loading your overview...">
      {data && isAdmin && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard delay={0} icon="🧾" label="Total Receipts" value={data.a.receipts.total} /><StatCard delay={1} icon="⏳" label="Pending Review" value={data.a.receipts.pending} />
            <StatCard delay={2} icon="✅" label="Approved" value={data.a.receipts.approved} /><StatCard delay={3} icon="❌" label="Rejected" value={data.a.receipts.rejected} />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard delay={4} icon="💰" label="Total Approved Giving" value={money(data.a.amounts.totalApproved)} /><StatCard delay={5} icon="📅" label="Today's Giving" value={money(data.a.amounts.today)} />
            <StatCard delay={6} icon="🗓️" label="This Week" value={money(data.a.amounts.thisWeek)} /><StatCard delay={7} icon="📈" label="This Month" value={money(data.a.amounts.thisMonth)} />
          </div>
          <Panel title="Giving by Department"><DeptTable rows={data.d} /></Panel>
        </div>
      )}
      {data && !isAdmin && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard icon="🙏" label="Welcome" value={user?.name.split(" ")[0]} />
            <StatCard delay={1} icon="⏳" label="Pending Receipts" value={data.receipts.filter((r: R) => r.approvalStatus === "pending").length} />
            <StatCard delay={2} icon="💝" label="Recent Approved Total" value={money(data.receipts.filter((r: R) => r.approvalStatus === "approved").reduce((s: number, r: R) => s + r.amount, 0))} />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title="Recent Receipts" action={<Link href="/dashboard/receipts" className="text-[13px] font-semibold text-gold-dark">View all →</Link>}>{data.receipts.length ? data.receipts.map((r: R) => <Row key={r._id} r={r} />) : <p className="text-navy/50">No receipts uploaded yet.</p>}</Panel>
            <Panel title="Announcements for You">{data.ann.length ? data.ann.slice(0, 4).map((a: R) => <AnnCard key={a._id} a={a} />) : <p className="text-navy/50">No announcements right now.</p>}</Panel>
          </div>
        </div>
      )}
    </Async>
  );
}

export function DeptTable({ rows }: { rows: R[] }) {
  return (
    <Table head={["Department", "Members", "Receipts", "Total Amount"]}>
      {rows.map((d) => <tr key={d.department}><td className="font-semibold">{DEPT_LABELS[d.department] || d.department}</td><td>{d.memberCount}</td><td>{d.receiptCount}</td><td className="font-semibold">{money(d.totalAmount)}</td></tr>)}
    </Table>
  );
}

export function Receipts() {
  const { toast, showLoader, hideLoader } = useAuth();
  const { data, loading, error, reload } = useLoad<R>(() => api.receipts.mine({ limit: 50 }));
  const [open, setOpen] = useState(false);
  async function upload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const file = f.get("receiptImage") as File;
    if (!file || !file.size) return toast("Please choose a receipt image", "error");
    showLoader("Uploading your receipt...");
    try { await api.receipts.upload(f); toast("Receipt uploaded successfully", "success"); setOpen(false); reload(); }
    catch (err) { toast((err as Error).message || "Upload failed", "error"); } finally { hideLoader(); }
  }
  const items: R[] = data?.receipts || [];
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-navy/60">Upload your tithe/offering receipt for verification.</p><button onClick={() => setOpen(true)} className={btnGold}>+ Upload Receipt</button></div>
      <Async loading={loading} error={error} text="Loading receipts...">
        {!items.length ? <Empty>No receipts uploaded yet.</Empty> : (
          <Table head={["Date", "Type", "Amount", "Status", "Notes", "Receipt"]}>
            {items.map((r) => <tr key={r._id}><td>{fdate(r.uploadDate)}</td><td className="capitalize">{r.paymentType}</td><td className="font-semibold">{money(r.amount)}</td><td><Badge status={r.approvalStatus} /></td><td className="max-w-[200px] text-navy/60">{r.adminNotes || "—"}</td><td><a href={`${BASE_URL}${r.receiptImage}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold-dark hover:underline">View</a></td></tr>)}
          </Table>
        )}
      </Async>
      <Modal open={open} onClose={() => setOpen(false)} title="Upload Receipt">
        <form onSubmit={upload} className="space-y-4">
          <div><label className={labelCls}>Amount (₦)</label><input name="amount" type="number" min="1" step="0.01" required className={inputCls} /></div>
          <div><label className={labelCls}>Payment Type</label><select name="paymentType" className={inputCls}>{["tithe", "offering", "seed", "project", "other"].map((t) => <option key={t} value={t} className="capitalize">{t[0].toUpperCase() + t.slice(1)}</option>)}</select></div>
          <div><label className={labelCls}>Receipt Image</label><input name="receiptImage" type="file" accept="image/*" required className={inputCls} /></div>
          <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={() => setOpen(false)} className={btnGhost}>Cancel</button><button className={btnPrimary}>Upload</button></div>
        </form>
      </Modal>
    </div>
  );
}

export function Give() {
  const { data, loading, error } = useLoad<R>(() => api.paymentAccounts.active());
  const accs: R[] = data?.accounts || [];
  return (
    <Async loading={loading} error={error} text="Loading payment accounts...">
      {!accs.length ? <Empty>No payment accounts are available right now.</Empty> : (
        <div className="space-y-5">
          <p className="text-navy/65">Make your tithe, offering, or seed payment to any account below, then upload your receipt in <Link href="/dashboard/receipts" className="font-semibold text-gold-dark">My Receipts</Link> for verification.</p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{accs.map((a) => (
            <div key={a._id} className="rounded-2xl bg-gradient-to-br from-navy to-navy-2 p-6 text-white shadow-lg"><p className="text-[12px] font-bold uppercase tracking-widest text-gold">{a.bankName}</p><p className="mt-2 font-mono text-[26px] font-semibold tracking-wider">{a.accountNumber}</p><p className="mt-1 text-white/75">{a.accountName}</p>{a.branchInfo && <p className="text-[12px] text-white/45">{a.branchInfo}</p>}</div>))}</div>
        </div>
      )}
    </Async>
  );
}

export function MemberAnnouncements() {
  const { data, loading, error } = useLoad<R>(() => api.announcements.visible());
  const items: R[] = data?.announcements || [];
  return (
    <Async loading={loading} error={error} text="Loading announcements...">
      {!items.length ? <Empty>No announcements for you right now.</Empty> : (
        <div className="space-y-4">{items.map((a) => (
          <Panel key={a._id}><div className="flex flex-wrap items-start justify-between gap-2"><h3 className="text-[17px] font-bold text-navy">{a.title}</h3><span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-[11px] font-bold text-gold-dark">{AUDIENCE_LABELS[a.targetAudience] || a.targetAudience}</span></div><p className="mt-2 text-navy/70">{a.content}</p><p className="mt-3 text-[12px] text-navy/40">{fdate(a.createdAt)} • by {a.createdBy?.name || "Admin"}</p></Panel>))}</div>
      )}
    </Async>
  );
}

export function Profile() {
  const { user, updateUser, toast } = useAuth();
  const [busy, setBusy] = useState(false);
  if (!user) return null;
  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = new FormData(e.currentTarget); setBusy(true);
    try { const d = await api.auth.updateMe({ name: String(f.get("name")).trim(), phone: String(f.get("phone")).trim() }); updateUser(d.user); toast("Profile updated successfully", "success"); }
    catch (err) { toast((err as Error).message || "Update failed", "error"); } finally { setBusy(false); }
  }
  async function pass(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form = e.currentTarget; const f = new FormData(form); setBusy(true);
    try { await api.auth.changePassword(String(f.get("current")), String(f.get("next"))); toast("Password changed successfully", "success"); form.reset(); }
    catch (err) { toast((err as Error).message || "Could not change password", "error"); } finally { setBusy(false); }
  }
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Panel title="Profile Details"><form onSubmit={save} className="space-y-4">
        <div><label className={labelCls}>Full Name</label><input name="name" defaultValue={user.name} required className={inputCls} /></div>
        <div><label className={labelCls}>Email</label><input value={user.email} disabled className={inputCls} readOnly /></div>
        <div><label className={labelCls}>Phone</label><input name="phone" type="tel" defaultValue={user.phone || ""} className={inputCls} /></div>
        {user.department && <div><label className={labelCls}>Department</label><input value={DEPT_LABELS[user.department] || user.department} disabled className={inputCls} readOnly /></div>}
        <button disabled={busy} className={btnPrimary}>Save Changes</button></form></Panel>
      <Panel title="Change Password"><form onSubmit={pass} className="space-y-4">
        <div><label className={labelCls}>Current Password</label><input name="current" type="password" required className={inputCls} /></div>
        <div><label className={labelCls}>New Password</label><input name="next" type="password" minLength={8} required className={inputCls} /></div>
        <button disabled={busy} className={btnPrimary}>Update Password</button></form></Panel>
    </div>
  );
}
