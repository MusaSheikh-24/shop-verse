import { Mail, Users } from "lucide-react";

const customers = [
    { name: "Sarah Ahmed", email: "sarah@example.com", orders: 24, spent: "$2,340", joined: "Jan 2024", status: "VIP" },
    { name: "Ali Raza", email: "ali@example.com", orders: 18, spent: "$4,120", joined: "Mar 2024", status: "VIP" },
    { name: "Emma Wilson", email: "emma@example.com", orders: 12, spent: "$980", joined: "Jun 2024", status: "Active" },
    { name: "Bilal Khan", email: "bilal@example.com", orders: 3, spent: "$210", joined: "May 2026", status: "New" },
    { name: "Ayesha Malik", email: "ayesha@example.com", orders: 9, spent: "$1,450", joined: "Nov 2025", status: "Active" },
];

const statusStyles: Record<string, string> = {
    VIP: "bg-violet-50 text-violet-600",
    Active: "bg-emerald-50 text-emerald-600",
    New: "bg-sky-50 text-sky-600",
};

export default function AdminCustomersPage() {
    return (
        <div className="space-y-6">
            <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3.5 py-1.5 text-xs font-bold text-sky-600 shadow-sm">
                    <Users className="size-3.5" /> People
                </span>
                <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">Customers</h1>
                <p className="mt-1 text-sm text-slate-500">3,420 total customers — here are your most active ones.</p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-100/60">
                {/* Desktop table */}
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                                <th className="px-6 py-3.5">Customer</th>
                                <th className="px-6 py-3.5">Orders</th>
                                <th className="px-6 py-3.5">Total Spent</th>
                                <th className="px-6 py-3.5">Joined</th>
                                <th className="px-6 py-3.5">Status</th>
                                <th className="px-6 py-3.5 text-right">Contact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {customers.map((c) => (
                                <tr key={c.email} className="transition hover:bg-sky-50/40">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-linear-to-br from-sky-400 to-blue-600 text-sm font-extrabold text-white shadow-md shadow-sky-200">
                                                {c.name.charAt(0)}
                                            </span>
                                            <div>
                                                <p className="font-bold text-slate-900">{c.name}</p>
                                                <p className="text-xs text-slate-500">{c.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-slate-600">{c.orders}</td>
                                    <td className="px-6 py-4 font-extrabold text-slate-900">{c.spent}</td>
                                    <td className="px-6 py-4 text-slate-500">{c.joined}</td>
                                    <td className="px-6 py-4">
                                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[c.status]}`}>{c.status}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end">
                                            <a href={`mailto:${c.email}`} aria-label={`Email ${c.name}`} className="grid size-9 cursor-pointer place-items-center rounded-lg border border-slate-100 text-sky-600 transition hover:bg-sky-50">
                                                <Mail className="size-4" />
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile cards */}
                <ul className="divide-y divide-slate-50 md:hidden">
                    {customers.map((c) => (
                        <li key={c.email} className="flex items-center gap-3 px-5 py-4">
                            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-linear-to-br from-sky-400 to-blue-600 text-sm font-extrabold text-white shadow-md">
                                {c.name.charAt(0)}
                            </span>
                            <div className="min-w-0 flex-1">
                                <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
                                    <span className="truncate">{c.name}</span>
                                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${statusStyles[c.status]}`}>{c.status}</span>
                                </p>
                                <p className="truncate text-xs text-slate-500">{c.email}</p>
                                <p className="mt-0.5 text-[11px] text-slate-400">{c.orders} orders • {c.spent} spent • {c.joined}</p>
                            </div>
                            <a href={`mailto:${c.email}`} aria-label={`Email ${c.name}`} className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg border border-slate-100 text-sky-600 transition hover:bg-sky-50">
                                <Mail className="size-4" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
