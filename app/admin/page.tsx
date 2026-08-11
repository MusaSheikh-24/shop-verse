import {
    ArrowDownRight,
    ArrowRight,
    ArrowUpRight,
    DollarSign,
    Package,
    ShoppingCart,
    Sparkles,
    TrendingUp,
    Users,
} from "lucide-react";
import Link from "next/link";

const stats = [
    { label: "Total Revenue", value: "$48,250", change: "+12.5%", up: true, icon: DollarSign, gradient: "from-sky-400 to-blue-600", shadow: "shadow-sky-200" },
    { label: "Total Orders", value: "1,284", change: "+8.2%", up: true, icon: ShoppingCart, gradient: "from-violet-400 to-purple-600", shadow: "shadow-violet-200" },
    { label: "Customers", value: "3,420", change: "+15.3%", up: true, icon: Users, gradient: "from-emerald-400 to-teal-600", shadow: "shadow-emerald-200" },
    { label: "Active Products", value: "86", change: "-2.4%", up: false, icon: Package, gradient: "from-amber-400 to-orange-600", shadow: "shadow-amber-200" },
];

const sales = [
    { m: "Jan", v: 45 }, { m: "Feb", v: 62 }, { m: "Mar", v: 55 }, { m: "Apr", v: 70 },
    { m: "May", v: 58 }, { m: "Jun", v: 80 }, { m: "Jul", v: 74 }, { m: "Aug", v: 92 },
    { m: "Sep", v: 68 }, { m: "Oct", v: 85 }, { m: "Nov", v: 78 }, { m: "Dec", v: 100 },
];

const topProducts = [
    { name: "Titan Phone 12", sold: 320, revenue: "$319,680", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200&auto=format&fit=crop" },
    { name: "Glide Laptop Air", sold: 210, revenue: "$272,790", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=200&auto=format&fit=crop" },
    { name: "Pulse Headphones", sold: 480, revenue: "$42,720", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop" },
    { name: "Aero Sneaker X", sold: 390, revenue: "$50,310", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop" },
];

const orders = [
    { id: "#ORD-7841", customer: "Sarah Ahmed", product: "Pulse Headphones", date: "Aug 10, 2026", amount: "$89", status: "Delivered" },
    { id: "#ORD-7840", customer: "Ali Raza", product: "Titan Phone 12", date: "Aug 10, 2026", amount: "$999", status: "Processing" },
    { id: "#ORD-7839", customer: "Emma Wilson", product: "Glow Skincare Set", date: "Aug 9, 2026", amount: "$45", status: "Delivered" },
    { id: "#ORD-7838", customer: "Bilal Khan", product: "Urban Backpack", date: "Aug 9, 2026", amount: "$59", status: "Pending" },
    { id: "#ORD-7837", customer: "Ayesha Malik", product: "Nova Smart Watch", date: "Aug 8, 2026", amount: "$199", status: "Cancelled" },
];

const statusStyles: Record<string, string> = {
    Delivered: "bg-emerald-50 text-emerald-600",
    Processing: "bg-sky-50 text-sky-600",
    Pending: "bg-amber-50 text-amber-600",
    Cancelled: "bg-rose-50 text-rose-600",
};

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3.5 py-1.5 text-xs font-bold text-sky-600 shadow-sm">
                        <Sparkles className="size-3.5" /> Overview
                    </span>
                    <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">Dashboard</h1>
                    <p className="mt-1 text-sm text-slate-500">Welcome back, Admin — here's what's happening in your store today.</p>
                </div>
                <span className="rounded-full border border-sky-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm">
                    Tuesday, Aug 11, 2026
                </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((s) => {
                    const Icon = s.icon;
                    return (
                        <div key={s.label} className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-xl shadow-slate-100/60 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-200/50">
                            <div className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-sky-50 blur-2xl transition group-hover:bg-sky-100" />
                            <div className="relative flex items-start justify-between">
                                <span className={`grid size-12 place-items-center rounded-2xl bg-linear-to-br ${s.gradient} text-white shadow-lg ${s.shadow} transition group-hover:scale-110 group-hover:rotate-3`}>
                                    <Icon className="size-6" />
                                </span>
                                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${s.up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                                    {s.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                                    {s.change}
                                </span>
                            </div>
                            <p className="relative mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">{s.value}</p>
                            <p className="relative mt-1 text-sm font-medium text-slate-500">{s.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Chart + Top products */}
            <div className="grid gap-6 xl:grid-cols-3">
                {/* Sales chart */}
                <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-100/60 xl:col-span-2">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">Sales Overview</h2>
                            <p className="text-xs text-slate-500">Monthly revenue performance — 2026</p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-600">
                            <TrendingUp className="size-3.5" /> +18.4% YoY
                        </span>
                    </div>
                    <div className="flex items-end gap-1.5 sm:gap-3">
                        {sales.map((d, i) => (
                            <div key={d.m} className="group flex flex-1 flex-col items-center gap-2">
                                <div className="relative flex h-40 w-full items-end sm:h-44">
                                    <div
                                        style={{ height: `${d.v}%` }}
                                        className={`w-full rounded-t-lg transition-all duration-300 group-hover:brightness-110 ${i === sales.length - 1
                                            ? "bg-linear-to-t from-blue-600 to-sky-400"
                                            : "bg-linear-to-t from-blue-600/50 to-sky-400/50 group-hover:from-blue-600 group-hover:to-sky-400"
                                            }`}
                                    />
                                    <span
                                        className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 rounded-md bg-slate-900 px-2 py-1 text-[10px] font-bold whitespace-nowrap text-white opacity-0 shadow-lg transition group-hover:opacity-100"
                                        style={{ bottom: `calc(${d.v}% + 6px)` }}
                                    >
                                        ${d.v}k
                                    </span>
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${i === sales.length - 1 ? "text-sky-600" : "text-slate-400"}`}>{d.m}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top products */}
                <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-100/60">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">Top Products</h2>
                            <p className="text-xs text-slate-500">Best sellers this month</p>
                        </div>
                        <Link href="/admin/products" className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 transition hover:text-blue-700">
                            View all <ArrowRight className="size-3.5" />
                        </Link>
                    </div>
                    <ul className="space-y-3">
                        {topProducts.map((p, i) => (
                            <li key={p.name} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-3 transition hover:border-sky-200 hover:bg-white hover:shadow-md hover:shadow-sky-100">
                                <span className="w-5 text-sm font-bold text-slate-400">#{i + 1}</span>
                                <img src={p.img} alt={p.name} loading="lazy" className="size-11 rounded-xl object-cover shadow-md shadow-slate-200" />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-bold text-slate-900">{p.name}</p>
                                    <p className="text-xs text-slate-500">{p.sold} sold</p>
                                </div>
                                <p className="text-sm font-semibold text-sky-600">{p.revenue}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Recent orders — table on desktop, cards on mobile */}
            <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-100/60">
                <div className="flex flex-wrap items-center justify-between gap-3 p-6 pb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
                        <p className="text-xs text-slate-500">Latest orders from your store</p>
                    </div>
                    <Link href="/admin/orders" className="inline-flex items-center gap-1 rounded-xl border border-sky-200 bg-sky-50 px-3.5 py-2 text-xs font-bold text-sky-600 transition hover:bg-sky-100">
                        View All Orders <ArrowRight className="size-3.5" />
                    </Link>
                </div>

                {/* Desktop table */}
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-y border-slate-100 bg-slate-50/70 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                                <th className="px-6 py-3.5">Order</th>
                                <th className="px-6 py-3.5">Customer</th>
                                <th className="px-6 py-3.5">Product</th>
                                <th className="px-6 py-3.5">Date</th>
                                <th className="px-6 py-3.5">Amount</th>
                                <th className="px-6 py-3.5">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {orders.map((o) => (
                                <tr key={o.id} className="transition hover:bg-sky-50/40">
                                    <td className="px-6 py-4 font-bold text-sky-600">{o.id}</td>
                                    <td className="px-6 py-4 font-semibold text-slate-700">{o.customer}</td>
                                    <td className="px-6 py-4 text-slate-600">{o.product}</td>
                                    <td className="px-6 py-4 text-slate-500">{o.date}</td>
                                    <td className="px-6 py-4 font-extrabold text-slate-900">{o.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[o.status]}`}>{o.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile cards */}
                <ul className="divide-y divide-slate-50 md:hidden">
                    {orders.map((o) => (
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
            </div>
        </div>
    );
}
