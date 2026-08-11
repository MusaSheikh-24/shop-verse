"use client";

import { useState } from "react";
import { ChevronDown, Eye, ShoppingCart } from "lucide-react";

const orders = [
    { id: "#ORD-7841", customer: "Sarah Ahmed", product: "Pulse Headphones", date: "Aug 10, 2026", amount: "$89", status: "Delivered" },
    { id: "#ORD-7840", customer: "Ali Raza", product: "Titan Phone 12", date: "Aug 10, 2026", amount: "$999", status: "Processing" },
    { id: "#ORD-7839", customer: "Emma Wilson", product: "Glow Skincare Set", date: "Aug 9, 2026", amount: "$45", status: "Delivered" },
    { id: "#ORD-7838", customer: "Bilal Khan", product: "Urban Backpack", date: "Aug 9, 2026", amount: "$59", status: "Pending" },
    { id: "#ORD-7837", customer: "Ayesha Malik", product: "Nova Smart Watch", date: "Aug 8, 2026", amount: "$199", status: "Cancelled" },
    { id: "#ORD-7836", customer: "Hamza Ali", product: "Aero Sneaker X", date: "Aug 8, 2026", amount: "$129", status: "Delivered" },
    { id: "#ORD-7835", customer: "Zainab Tariq", product: "Vision Sunglasses", date: "Aug 7, 2026", amount: "$75", status: "Processing" },
    { id: "#ORD-7834", customer: "Omar Farooq", product: "Glide Laptop Air", date: "Aug 7, 2026", amount: "$1,299", status: "Delivered" },
];

const tabs = ["All", "Delivered", "Processing", "Pending", "Cancelled"];

const statusStyles: Record<string, string> = {
    Delivered: "bg-emerald-50 text-emerald-600",
    Processing: "bg-sky-50 text-sky-600",
    Pending: "bg-amber-50 text-amber-600",
    Cancelled: "bg-rose-50 text-rose-600",
};

export default function AdminOrdersPage() {
    const [tab, setTab] = useState("All");
    const filtered = tab === "All" ? orders : orders.filter((o) => o.status === tab);

    return (
        <div className="space-y-6">
            <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3.5 py-1.5 text-xs font-bold text-sky-600 shadow-sm">
                    <ShoppingCart className="size-3.5" /> Fulfillment
                </span>
                <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">Orders</h1>
                <p className="mt-1 text-sm text-slate-500">Track and manage all customer orders.</p>
            </div>

            {/* Status tabs — horizontally scrollable on mobile */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
                {tabs.map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`shrink-0 cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition ${tab === t
                                ? "bg-linear-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-200"
                                : "border border-slate-100 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-600"
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-100/60">
                {/* Desktop table */}
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                                <th className="px-6 py-3.5">Order</th>
                                <th className="px-6 py-3.5">Customer</th>
                                <th className="px-6 py-3.5">Product</th>
                                <th className="px-6 py-3.5">Date</th>
                                <th className="px-6 py-3.5">Amount</th>
                                <th className="px-6 py-3.5">Status</th>
                                <th className="px-6 py-3.5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.map((o) => (
                                <tr key={o.id} className="transition hover:bg-sky-50/40">
                                    <td className="px-6 py-4 font-bold text-sky-600">{o.id}</td>
                                    <td className="px-6 py-4 font-semibold text-slate-700">{o.customer}</td>
                                    <td className="px-6 py-4 text-slate-600">{o.product}</td>
                                    <td className="px-6 py-4 text-slate-500">{o.date}</td>
                                    <td className="px-6 py-4 font-extrabold text-slate-900">{o.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[o.status]}`}>{o.status}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end">
                                            <button aria-label={`View ${o.id}`} className="grid size-9 cursor-pointer place-items-center rounded-lg border border-slate-100 text-sky-600 transition hover:bg-sky-50">
                                                <Eye className="size-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile cards */}
                <ul className="divide-y divide-slate-50 md:hidden">
                    {filtered.map((o) => (
                        <li key={o.id} className="flex items-center gap-3 px-5 py-4">
                            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-linear-to-br from-sky-400 to-blue-600 text-sm font-extrabold text-white shadow-md">
                                {o.customer.charAt(0)}
                            </span>
                            <div className="min-w-0 flex-1">
                                <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
                                    <span className="truncate">{o.customer}</span>
                                    <span className="shrink-0 text-[10px] font-extrabold text-sky-600">{o.id}</span>
                                </p>
                                <p className="truncate text-xs text-slate-500">{o.product} • {o.date}</p>
                            </div>
                            <div className="shrink-0 text-right">
                                <p className="text-sm font-extrabold text-slate-900">{o.amount}</p>
                                <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${statusStyles[o.status]}`}>{o.status}</span>
                            </div>
                        </li>
                    ))}
                </ul>

                {filtered.length === 0 && (
                    <p className="py-16 text-center text-sm font-semibold text-slate-500">No {tab.toLowerCase()} orders right now.</p>
                )}
            </div>
        </div>
    );
}
