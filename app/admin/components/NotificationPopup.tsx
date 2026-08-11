"use client";

import { useEffect, useRef, useState } from "react";
import {
    Bell,
    Boxes,
    Check,
    CheckCheck,
    Package,
    Percent,
    ShoppingCart,
    Trash2,
    TrendingUp,
    Users,
    X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Notification = {
    id: number;
    icon: LucideIcon;
    iconBg: string;
    title: string;
    desc: string;
    time: string;
    read: boolean;
    tag?: string;
};

const initialNotifications: Notification[] = [
    { id: 1, icon: ShoppingCart, iconBg: "from-sky-400 to-blue-600", title: "New order #ORD-7845", desc: "Sarah Ahmed ordered Pulse Headphones — $89", time: "2 min ago", read: false, tag: "Order" },
    { id: 2, icon: Package, iconBg: "from-amber-400 to-orange-600", title: "Low stock: Pulse Headphones", desc: "Only 8 units left — reorder soon", time: "18 min ago", read: false, tag: "Stock" },
    { id: 3, icon: TrendingUp, iconBg: "from-emerald-400 to-teal-600", title: "Revenue up +12.5%", desc: "This week is performing better than last", time: "1 hr ago", read: false, tag: "Insight" },
    { id: 4, icon: Users, iconBg: "from-violet-400 to-purple-600", title: "New customer joined", desc: "Ayesha Malik created an account", time: "3 hrs ago", read: true, tag: "Customer" },
    { id: 5, icon: Boxes, iconBg: "from-rose-400 to-pink-600", title: "Category needs review", desc: "Gaming has 640+ items without a cover image", time: "Yesterday", read: true, tag: "Task" },
    { id: 6, icon: Percent, iconBg: "from-cyan-400 to-sky-600", title: "Deal expiring soon", desc: "FLASH25 ends on Aug 12, 2026", time: "Yesterday", read: true, tag: "Deal" },
];

export default function NotificationPopup() {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(initialNotifications);
    const [filter, setFilter] = useState<"all" | "unread">("all");
    const popupRef = useRef<HTMLDivElement>(null);

    const unreadCount = items.filter((n) => !n.read).length;
    const visible = items.filter((n) => (filter === "unread" ? !n.read : true));

    /* Click outside + Escape to close */
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        document.addEventListener("mousedown", onClick);
        window.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onClick);
            window.removeEventListener("keydown", onKey);
        };
    }, []);

    const markRead = (id: number) =>
        setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

    const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));

    const clearRead = () => setItems((prev) => prev.filter((n) => !n.read));

    return (
        <div ref={popupRef} className="relative">
            {/* Bell button */}
            <button
                onClick={() => setOpen(!open)}
                aria-label="Notifications"
                aria-expanded={open}
                className={`relative grid size-10 cursor-pointer place-items-center rounded-xl border transition hover:border-sky-300 hover:text-sky-600 ${open ? "border-sky-300 bg-sky-50 text-sky-600" : "border-slate-200 bg-white text-slate-500 shadow-sm"}`}
            >
                <Bell className="size-5" />
                {unreadCount > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 grid min-w-5 place-items-center rounded-full bg-linear-to-r from-rose-500 to-pink-600 px-1 text-[10px] font-bold text-white shadow-md shadow-rose-200 ring-2 ring-white">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown panel */}
            {open && (
                <>
                    {/* Mobile scrim (tap to close) */}
                    <div className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm sm:hidden" onClick={() => setOpen(false)} />
                    <div className="fixed inset-x-3 top-[4.5rem] z-50 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-3 sm:w-[24rem]">
                        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_60px_-15px_rgba(2,132,199,0.35)]">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-200">
                                        <Bell className="size-5" />
                                    </span>
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                                        <p className="text-xs text-slate-500">
                                            {unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up"}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setOpen(false)}
                                    aria-label="Close notifications"
                                    className="grid size-8 cursor-pointer place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 sm:hidden"
                                >
                                    <X className="size-4" />
                                </button>
                            </div>

                            {/* Filters */}
                            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-2.5">
                                <div className="flex gap-1 rounded-full bg-slate-100 p-1">
                                    {(["all", "unread"] as const).map((f) => (
                                        <button
                                            key={f}
                                            onClick={() => setFilter(f)}
                                            className={`cursor-pointer rounded-full px-3.5 py-1 text-xs font-bold capitalize transition ${filter === f ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={markAllRead}
                                    className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-sky-600 transition hover:text-blue-700"
                                >
                                    <CheckCheck className="size-3.5" /> Mark all read
                                </button>
                            </div>

                            {/* List */}
                            <div className="max-h-[60vh] overflow-y-auto">
                                {visible.length === 0 ? (
                                    <div className="flex flex-col items-center px-5 py-12 text-center">
                                        <span className="grid size-14 place-items-center rounded-full bg-sky-50 text-sky-300">
                                            <Check className="size-7" />
                                        </span>
                                        <p className="mt-3 text-sm font-bold text-slate-900">No notifications</p>
                                        <p className="mt-1 text-xs text-slate-500">You're all caught up — nice work!</p>
                                    </div>
                                ) : (
                                    <ul className="divide-y divide-slate-50">
                                        {visible.map((n) => (
                                            <li key={n.id}>
                                                <button
                                                    onClick={() => markRead(n.id)}
                                                    className={`flex w-full cursor-pointer items-start gap-3 px-5 py-3.5 text-left transition hover:bg-sky-50/50 ${n.read ? "opacity-60" : ""}`}
                                                >
                                                    <span className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-linear-to-br ${n.iconBg} text-white shadow-md`}>
                                                        <n.icon className="size-4" />
                                                    </span>
                                                    <span className="min-w-0 flex-1">
                                                        <span className="flex items-center gap-2">
                                                            <span className="truncate text-sm font-bold text-slate-900">{n.title}</span>
                                                            {!n.read && <span className="size-2 shrink-0 rounded-full bg-sky-500" />}
                                                        </span>
                                                        <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">{n.desc}</span>
                                                        <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                            {n.tag} • {n.time}
                                                        </span>
                                                    </span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Footer */}
                            {items.some((n) => n.read) && (
                                <button
                                    onClick={clearRead}
                                    className="flex w-full cursor-pointer items-center justify-center gap-2 border-t border-slate-100 py-3 text-xs font-semibold text-slate-500 transition hover:bg-rose-50 hover:text-rose-500"
                                >
                                    <Trash2 className="size-3.5" /> Clear read notifications
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
