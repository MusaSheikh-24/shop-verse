import { Pencil, Plus, Tag, Trash2 } from "lucide-react";

const deals = [
    { code: "SHOP50", discount: "50% OFF", used: 320, expiry: "Aug 31, 2026", status: "Active" },
    { code: "WELCOME10", discount: "10% OFF", used: 1240, expiry: "Sep 15, 2026", status: "Active" },
    { code: "FLASH25", discount: "25% OFF", used: 95, expiry: "Aug 12, 2026", status: "Active" },
    { code: "FREESHIP", discount: "Free Shipping", used: 860, expiry: "Aug 01, 2026", status: "Expired" },
];

export default function AdminDealsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3.5 py-1.5 text-xs font-bold text-sky-600 shadow-sm">
                        <Tag className="size-3.5" /> Promotions
                    </span>
                    <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">Deals & Coupons</h1>
                    <p className="mt-1 text-sm text-slate-500">Create and manage discount codes for your store.</p>
                </div>
                <button className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-200 transition hover:scale-105">
                    <Plus className="size-4" /> Create Deal
                </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {deals.map((d) => (
                    <div key={d.code} className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-100/60 transition hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-sky-200/70">
                        <div className="flex items-start justify-between">
                            <span className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-200">
                                <Tag className="size-6" />
                            </span>
                            <span className={`rounded-full px-3 py-1 text-xs font-bold ${d.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                                {d.status}
                            </span>
                        </div>
                        <p className="mt-4 rounded-lg border-2 border-dashed border-sky-200 bg-sky-50/60 px-3 py-2 text-center font-mono text-lg font-extrabold tracking-[0.2em] text-sky-700">
                            {d.code}
                        </p>
                        <p className="mt-3 text-sm font-bold text-slate-900">{d.discount}</p>
                        <p className="mt-1 text-xs text-slate-500">{d.used} uses • Expires {d.expiry}</p>
                        <div className="mt-4 flex gap-2">
                            <button aria-label={`Edit ${d.code}`} className="grid size-9 cursor-pointer place-items-center rounded-lg border border-sky-100 text-sky-600 transition hover:bg-sky-50">
                                <Pencil className="size-4" />
                            </button>
                            <button aria-label={`Delete ${d.code}`} className="grid size-9 cursor-pointer place-items-center rounded-lg border border-rose-100 text-rose-500 transition hover:bg-rose-50">
                                <Trash2 className="size-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}