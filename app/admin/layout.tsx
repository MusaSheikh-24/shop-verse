"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Boxes,
    LayoutDashboard,
    LogOut,
    Menu,
    Package,
    Percent,
    Search,
    Settings as SettingsIcon,
    ShoppingBag,
    ShoppingCart,
    Store,
    Users,
    X,
} from "lucide-react";
import NotificationPopup from "./components/NotificationPopup";

const navGroups = [
    {
        label: "Overview",
        items: [
            { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
        ],
    },
    {
        label: "Management",
        items: [
            { label: "Products", icon: Package, href: "/admin/products" },
            { label: "Orders", icon: ShoppingCart, href: "/admin/orders", badge: "12" },
            { label: "Customers", icon: Users, href: "/admin/customers" },
            { label: "Categories", icon: Boxes, href: "/admin/categories" },
        ],
    },
    {
        label: "Sales",
        items: [
            { label: "Deals", icon: Percent, href: "/admin/deals" },
            { label: "Settings", icon: SettingsIcon, href: "/admin/settings" },
        ],
    },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;

    return (
        <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-blue-50">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* ===== SIDEBAR (dark, premium) ===== */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-950 text-slate-400 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Ambient glow */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -left-24 -top-24 size-64 rounded-full bg-sky-600/20 blur-3xl" />
                    <div className="absolute -bottom-32 -right-16 size-72 rounded-full bg-blue-700/10 blur-3xl" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.03)_1px,transparent_1px)] bg-size-[48px_48px]" />
                </div>

                {/* Brand */}
                <div className="relative flex items-center justify-between px-6 pb-5 pt-6">
                    <Link href="/" className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-sky-400 to-blue-600 shadow-lg shadow-sky-900/50">
                            <ShoppingBag className="size-5 text-white" />
                        </span>
                        <span>
                            <span className="block text-base font-bold tracking-tight text-white">
                                Shop<span className="bg-linear-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">Verse</span>
                            </span>
                            <span className="block text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500">Admin Panel</span>
                        </span>
                    </Link>
                    <button
                        className="grid size-9 cursor-pointer place-items-center rounded-xl text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close sidebar"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Divider */}
                <div className="relative mx-6 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

                {/* Store card */}
                <div className="relative mx-6 mb-5 mt-5 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3.5 py-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-linear-to-br from-violet-400 to-purple-600 text-white shadow-md">
                        <Store className="size-4" />
                    </span>
                    <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold text-white">ShopVerse Store</p>
                        <p className="text-[11px] text-slate-500">Premium plan</p>
                    </div>
                    <span className="ml-auto size-2 shrink-0 rounded-full bg-emerald-400 ring-4 ring-emerald-400/15" />
                </div>

                {/* Nav — fits without scrolling on standard heights */}
                <nav className="relative flex-1 overflow-hidden px-4 pb-4">
                    <div className="space-y-4">
                        {navGroups.map((group) => (
                            <div key={group.label}>
                                <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                                    {group.label}
                                </p>
                                <ul className="space-y-0.5">
                                    {group.items.map((item) => {
                                        const active = isActive(item.href);
                                        return (
                                            <li key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setSidebarOpen(false)}
                                                    className={`group/nav relative flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition ${active
                                                        ? "bg-gradient-to-r from-sky-500/15 to-blue-600/5 font-semibold text-white ring-1 ring-inset ring-sky-400/30"
                                                        : "font-medium text-slate-400 hover:bg-white/[0.05] hover:text-slate-100"
                                                        }`}
                                                >
                                                    <item.icon className={`size-[18px] transition ${active ? "text-sky-400" : "text-slate-500 group-hover/nav:text-slate-300"}`} />
                                                    {item.label}
                                                    {"badge" in item && item.badge && (
                                                        <span className="ml-auto rounded-full bg-rose-500/90 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </nav>

                {/* Bottom */}
                <div className="relative border-t border-white/[0.07] p-4">
                    <div className="mb-2 flex items-center gap-2.5 rounded-xl px-2 py-1.5">
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-linear-to-br from-sky-400 to-blue-600 text-[13px] font-semibold text-white shadow-md">
                            A
                        </span>
                        <div className="min-w-0">
                            <p className="truncate text-[13px] font-semibold text-white">Admin</p>
                            <p className="truncate text-[11px] text-slate-500">admin@shopverse.com</p>
                        </div>
                    </div>
                    <button className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-rose-400/90 transition hover:bg-rose-500/10 hover:text-rose-300">
                        <LogOut className="size-[18px]" /> Log Out
                    </button>
                </div>
            </aside>

            {/* ===== MAIN ===== */}
            <div className="lg:pl-72">
                {/* Topbar */}
                <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
                    <div className="flex items-center gap-3 px-4 py-3.5 sm:gap-4 sm:px-6">
                        <button
                            className="grid size-10 cursor-pointer place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-sky-300 hover:text-sky-600 lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Open sidebar"
                        >
                            <Menu className="size-5" />
                        </button>

                        <div className="relative hidden min-w-0 max-w-md flex-1 sm:block">
                            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="search"
                                placeholder="Search orders, products, customers…"
                                className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(14,165,233,0.1)]"
                            />
                        </div>

                        <div className="ml-auto flex items-center gap-2 sm:gap-3">
                            <NotificationPopup />
                            <div className="hidden h-8 w-px bg-slate-200 sm:block" />
                            <span className="hidden text-right sm:block">
                                <span className="block text-sm font-semibold text-slate-900">Admin</span>
                                <span className="block text-xs text-slate-500">admin@shopverse.com</span>
                            </span>
                            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-linear-to-br from-sky-400 to-blue-600 text-sm font-semibold text-white shadow-lg shadow-sky-200">
                                A
                            </span>
                        </div>
                    </div>
                </header>

                <main className="px-4 py-6 sm:px-6 sm:py-8">{children}</main>
            </div>
        </div>
    );
}
