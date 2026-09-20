"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type FormEvent } from "react";
import { api, BASE_URL, type R } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { AUDIENCE_LABELS, Async, Badge, DEPT_LABELS, Empty, Modal, Panel, StatCard, Table, btnDanger, btnGhost, btnGold, btnPrimary, fdate, fdatetime, inputCls, labelCls, money, smBtn, useLoad } from "./DashUI";
import { DeptTable } from "./MemberViews";

const depts = <><option value="">All departments</option><option value="men">Men</option><option value="women">Women</option><option value="youth">Youth</option></>;

export function AdminReceipts() {
  const { toast, showLoader, hideLoader } = useAuth();
  const [status, setStatus] = useState(""); const [dept, setDept] = useState("");
  const [reject, setReject] = useState<R | null>(null);
  const { data, loading, error, reload } = useLoad<R>(() => api.receipts.all({ approvalStatus: status, department: dept, limit: 100 }), [status, dept]);
  const items: R[] = data?.receipts || [];
  async function act(fn: () => Promise<unknown>, msg: string, busy: string) {
    showLoader(busy);
    try { await fn(); toast(msg, "success"); setReject(null); reload(); } catch (e) { toast((e as Error).message, "error"); } finally { hideLoader(); }
  }
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={`${inputCls} !w-auto`}><option value="">All statuses</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select>
        <select value={dept} onChange={(e) => setDept(e.target.value)} className={`${inputCls} !w-auto`}>{depts}</select>
      </div>
      <Async loading={loading} error={error} text="Loading receipts...">
        {!items.length ? <Empty>No receipts found.</Empty> : (
          <Table head={["Member", "Dept", "Type", "Amount", "Date", "Status", "Receipt", "Action"]}>
            {items.map((r) => (
              <tr key={r._id}><td><p className="font-semibold">{r.member?.name || "Unknown"}</p><p className="text-[12px] text-navy/45">{r.member?.email}</p></td>
                <td className="capitalize">{r.department}</td><td className="capitalize">{r.paymentType}</td><td className="font-semibold">{money(r.amount)}</td><td>{fdate(r.uploadDate)}</td><td><Badge status={r.approvalStatus} /></td>
                <td><a href={`${BASE_URL}${r.receiptImage}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold-dark hover:underline">View</a></td>
                <td>{r.approvalStatus === "pending" ? <div className="flex gap-2">
                  <button className={`${smBtn} bg-emerald-600 text-white`} onClick={() => confirm("Approve this receipt?") && act(() => api.receipts.approve(r._id, ""), "Receipt approved", "Approving...")}>Approve</button>
                  <button className={`${smBtn} bg-red-600 text-white`} onClick={() => setReject(r)}>Reject</button></div> : <span className="text-navy/40">—</span>}</td></tr>))}
          </Table>)}
      </Async>
      <Modal open={!!reject} onClose={() => setReject(null)} title="Reject Receipt">
        <form onSubmit={(e) => { e.preventDefault(); const n = String(new FormData(e.currentTarget).get("notes")).trim(); if (!n) return toast("Please provide a reason", "error"); act(() => api.receipts.reject(reject!._id, n), "Receipt rejected", "Rejecting..."); }} className="space-y-4">
          <div><label className={labelCls}>Reason for rejection</label><textarea name="notes" rows={4} required className={inputCls} /></div>
          <div className="flex justify-end gap-3"><button type="button" onClick={() => setReject(null)} className={btnGhost}>Cancel</button><button className={btnDanger}>Reject</button></div>
        </form>
      </Modal>
    </div>
  );
}

export function Members() {
  const { toast, showLoader, hideLoader } = useAuth();
  const [q, setQ] = useState(""); const [search, setSearch] = useState(""); const [dept, setDept] = useState("");
  const { data, loading, error, reload } = useLoad<R>(() => api.admin.members({ search, department: dept, limit: 100 }), [search, dept]);
  const items: R[] = data?.members || [];
  async function act(fn: () => Promise<unknown>, busy: string) {
    showLoader(busy);
    try { await fn(); reload(); } catch (e) { toast((e as Error).message, "error"); } finally { hideLoader(); }
  }
  return (
    <div className="space-y-5">
      <form onSubmit={(e) => { e.preventDefault(); setSearch(q.trim()); }} className="flex flex-wrap gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or email" className={`${inputCls} !w-64`} />
        <select value={dept} onChange={(e) => setDept(e.target.value)} className={`${inputCls} !w-auto`}>{depts}</select><button className={btnPrimary}>Search</button>
      </form>
      <Async loading={loading} error={error} text="Loading members...">
        {!items.length ? <Empty>No members found.</Empty> : (
          <Table head={["Name", "Email", "Department", "Phone", "Status", "Joined", "Actions"]}>
            {items.map((m) => <tr key={m._id}><td className="font-semibold">{m.name}</td><td>{m.email}</td><td className="capitalize">{m.department}</td><td>{m.phone || "—"}</td><td><Badge status={m.isActive ? "active" : "inactive"} /></td><td>{fdate(m.createdAt)}</td>
              <td><div className="flex gap-2">
                <button className={`${smBtn} border border-navy/20`} onClick={() => act(async () => { await api.admin.toggleMemberStatus(m._id); toast("Member status updated", "success"); }, "Updating member status...")}>{m.isActive ? "Deactivate" : "Activate"}</button>
                <button className={`${smBtn} bg-red-600 text-white`} onClick={() => confirm(`Delete ${m.name}? This cannot be undone.`) && act(async () => { await api.admin.deleteMember(m._id); toast("Member deleted", "success"); }, "Deleting member...")}>Delete</button></div></td></tr>)}
          </Table>)}
      </Async>
    </div>
  );
}

export function Payments() {
  const { toast, showLoader, hideLoader } = useAuth();
  const { data, loading, error, reload } = useLoad<R>(() => api.paymentAccounts.all());
  const [edit, setEdit] = useState<R | "new" | null>(null);
  const items: R[] = data?.accounts || [];
  async function run(fn: () => Promise<unknown>, msg: string) {
    showLoader("Saving...");
    try { await fn(); toast(msg, "success"); setEdit(null); reload(); } catch (e) { toast((e as Error).message, "error"); } finally { hideLoader(); }
  }
  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = new FormData(e.currentTarget);
    const p = { bankName: String(f.get("bankName")).trim(), accountName: String(f.get("accountName")).trim(), accountNumber: String(f.get("accountNumber")).trim(), branchInfo: String(f.get("branchInfo")).trim() };
    run(() => (edit !== "new" && edit ? api.paymentAccounts.update(edit._id, p) : api.paymentAccounts.create(p)), "Account saved");
  }
  const cur = edit && edit !== "new" ? edit : null;
  return (
    <div className="space-y-5">
      <div className="flex justify-end"><button onClick={() => setEdit("new")} className={btnGold}>+ Add Account</button></div>
      <Async loading={loading} error={error} text="Loading accounts...">
        {!items.length ? <Empty>No payment accounts yet.</Empty> : (
          <Table head={["Bank", "Account Name", "Account Number", "Status", "Actions"]}>
            {items.map((a) => <tr key={a._id}><td className="font-semibold">{a.bankName}</td><td>{a.accountName}</td><td className="font-mono">{a.accountNumber}</td><td><Badge status={a.isActive ? "active" : "inactive"} /></td>
              <td><div className="flex gap-2"><button className={`${smBtn} border border-navy/20`} onClick={() => setEdit(a)}>Edit</button>
                <button className={`${smBtn} border border-navy/20`} onClick={() => run(() => api.paymentAccounts.toggle(a._id), "Account status updated")}>{a.isActive ? "Deactivate" : "Activate"}</button>
                <button className={`${smBtn} bg-red-600 text-white`} onClick={() => confirm("Delete this account?") && run(() => api.paymentAccounts.remove(a._id), "Account deleted")}>Delete</button></div></td></tr>)}
          </Table>)}
      </Async>
      <Modal open={!!edit} onClose={() => setEdit(null)} title={cur ? "Edit Account" : "Add Account"}>
        <form key={cur?._id || "new"} onSubmit={save} className="space-y-4">
          <div><label className={labelCls}>Bank Name</label><input name="bankName" defaultValue={cur?.bankName} required className={inputCls} /></div>
          <div><label className={labelCls}>Account Name</label><input name="accountName" defaultValue={cur?.accountName} required className={inputCls} /></div>
          <div><label className={labelCls}>Account Number</label><input name="accountNumber" maxLength={10} defaultValue={cur?.accountNumber} required className={inputCls} /></div>
          <div><label className={labelCls}>Branch Info (optional)</label><input name="branchInfo" defaultValue={cur?.branchInfo || ""} className={inputCls} /></div>
          <div className="flex justify-end gap-3"><button type="button" onClick={() => setEdit(null)} className={btnGhost}>Cancel</button><button className={btnPrimary}>Save</button></div>
        </form>
      </Modal>
    </div>
  );
}

export function AdminAnnouncements() {
  const { toast, showLoader, hideLoader } = useAuth();
  const { data, loading, error, reload } = useLoad<R>(() => api.announcements.all({ limit: 100 }));
  const [edit, setEdit] = useState<R | "new" | null>(null);
  const items: R[] = data?.announcements || [];
  const cur = edit && edit !== "new" ? edit : null;
  async function run(fn: () => Promise<unknown>, msg: string) {
    showLoader("Saving...");
    try { await fn(); toast(msg, "success"); setEdit(null); reload(); } catch (e) { toast((e as Error).message, "error"); } finally { hideLoader(); }
  }
  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = new FormData(e.currentTarget);
    const p: Record<string, unknown> = { title: String(f.get("title")).trim(), content: String(f.get("content")).trim(), targetAudience: f.get("targetAudience") };
    if (cur) p.isActive = f.get("isActive") === "on";
    run(() => (cur ? api.announcements.update(cur._id, p) : api.announcements.create(p)), cur ? "Announcement updated" : "Announcement published");
  }
  return (
    <div className="space-y-5">
      <div className="flex justify-end"><button onClick={() => setEdit("new")} className={btnGold}>+ New Announcement</button></div>
      <Async loading={loading} error={error} text="Loading announcements...">
        {!items.length ? <Empty>No announcements yet.</Empty> : (
          <div className="space-y-4">{items.map((a) => (
            <Panel key={a._id}><div className="flex flex-wrap items-start justify-between gap-3">
              <div><h3 className="text-[17px] font-bold text-navy">{a.title}</h3><p className="mt-1 text-[12px] text-navy/45">{AUDIENCE_LABELS[a.targetAudience] || a.targetAudience} • {fdate(a.createdAt)}</p></div><Badge status={a.isActive ? "active" : "inactive"} /></div>
              <p className="mt-3 text-navy/70">{a.content}</p>
              <div className="mt-4 flex gap-2"><button className={`${smBtn} border border-navy/20`} onClick={() => setEdit(a)}>Edit</button>
                <button className={`${smBtn} bg-red-600 text-white`} onClick={async () => { if (!confirm("Delete this announcement?")) return; showLoader("Deleting..."); try { await api.announcements.remove(a._id); toast("Announcement deleted", "success"); reload(); } catch (e) { toast((e as Error).message, "error"); } finally { hideLoader(); } }}>Delete</button></div></Panel>))}</div>)}
      </Async>
      <Modal open={!!edit} onClose={() => setEdit(null)} title={cur ? "Edit Announcement" : "New Announcement"}>
        <form key={cur?._id || "new"} onSubmit={save} className="space-y-4">
          <div><label className={labelCls}>Title</label><input name="title" defaultValue={cur?.title} required className={inputCls} /></div>
          <div><label className={labelCls}>Content</label><textarea name="content" rows={4} defaultValue={cur?.content} required className={inputCls} /></div>
          <div><label className={labelCls}>Audience</label><select name="targetAudience" defaultValue={cur?.targetAudience || "general"} className={inputCls}>{Object.entries(AUDIENCE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>
          {cur && <label className="flex items-center gap-2 text-[14px]"><input type="checkbox" name="isActive" defaultChecked={cur.isActive} /> Active</label>}
          <div className="flex justify-end gap-3"><button type="button" onClick={() => setEdit(null)} className={btnGhost}>Cancel</button><button className={btnPrimary}>Save</button></div>
        </form>
      </Modal>
    </div>
  );
}

export function Analytics() {
  const year = new Date().getFullYear();
  const { data, loading, error } = useLoad<R>(async () => { const [o, d, m] = await Promise.all([api.analytics.overview(), api.analytics.department(), api.analytics.monthly(year)]); return { a: o.analytics, d: d.departments, m: m.months }; });
  return (
    <Async loading={loading} error={error} text="Crunching the numbers...">
      {data && (() => { const max = Math.max(1, ...data.m.map((x: R) => x.totalAmount)); return (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon="💰" label="Total Approved Giving" value={money(data.a.amounts.totalApproved)} /><StatCard delay={1} icon="📈" label="This Month" value={money(data.a.amounts.thisMonth)} />
            <StatCard delay={2} icon="⏳" label="Pending Reviews" value={data.a.receipts.pending} /><StatCard delay={3} icon="🧾" label="Total Receipts" value={data.a.receipts.total} /></div>
          <Panel title={`${year} Monthly Giving Trend`}><div className="flex h-56 items-end gap-2 overflow-x-auto pt-6">{data.m.map((m: R, i: number) => (
            <div key={i} className="flex min-w-[42px] flex-1 flex-col items-center justify-end gap-1"><span className="text-[10px] text-navy/50">{m.totalAmount ? money(m.totalAmount).replace(".00", "") : ""}</span>
              <div className="w-full rounded-t-lg bg-gradient-to-t from-navy to-gold" style={{ height: Math.max(4, Math.round((m.totalAmount / max) * 160)) }} /><span className="text-[11px] font-semibold text-navy/60">{m.monthName.slice(0, 3)}</span></div>))}</div></Panel>
          <Panel title="Department Breakdown"><DeptTable rows={data.d} /></Panel></div>); })()}
    </Async>
  );
}

export function Audit() {
  const { data, loading, error } = useLoad<R>(() => api.admin.auditLogs({ limit: 60 }));
  const items: R[] = data?.logs || [];
  return (
    <Async loading={loading} error={error} text="Loading audit logs...">
      {!items.length ? <Empty>No audit logs yet.</Empty> : (
        <Table head={["Admin", "Action", "Resource", "Date"]}>{items.map((l) => <tr key={l._id}><td className="font-semibold">{l.admin?.name || "Unknown"}</td><td className="capitalize">{(l.action || "").replace(/_/g, " ")}</td><td>{l.resource}</td><td>{fdatetime(l.createdAt)}</td></tr>)}</Table>)}
    </Async>
  );
}
