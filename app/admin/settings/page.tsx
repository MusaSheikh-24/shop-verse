"use client";

import { useState } from "react";
import { Bell, Check, Save, ShieldCheck, Store } from "lucide-react";

export default function AdminSettingsPage() {
    const [saved, setSaved] = useState(false);
    const [prefs, setPrefs] = useState({ orders: true, stock: true, newsletter: false });

    const toggle = (key: keyof typeof prefs) => setPrefs({ ...prefs, [key]: !prefs[key] });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const input =
        "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(14,165,233,0.1)]";

    const Toggle = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
        <button
            onClick={onClick}
            aria-pressed={on}
            className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition ${on ? "bg-linear-to-r from-sky-500 to-blue-600" : "bg-slate-200"}`}
        >
            <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
        </button>
    );

    return (
        <div className="space-y-6">
            <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3.5 py-1.5 text-xs font-bold text-sky-600 shadow-sm">
                    <Store className="size-3.5" /> Configuration
                </span>
                <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">Settings</h1>
                <p className="mt-1 text-sm text-slate-500">Manage your store profile and preferences.</p>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                {/* Store Profile */}
                <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-100/60 sm:p-8">
                    <div className="mb-6 flex items-center gap-3">
                        <span className="grid size-11 place-items-center rounded-2xl bg-linear-to-br from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-200">
                            <Store className="size-5" />
                        </span>
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">Store Profile</h2>
                            <p className="text-xs text-slate-500">Basic information about your store</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Store Name</label>
                            <input defaultValue="ShopVerse" className={input} />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Email</label>
                                <input type="email" defaultValue="support@shopverse.com" className={input} />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Phone</label>
                                <input defaultValue="+1 (555) 123-4567" className={input} />
                            </div>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Address</label>
                            <input defaultValue="123 Market Street, New York, NY" className={input} />
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-100/60 sm:p-8">
                    <div className="mb-6 flex items-center gap-3">
                        <span className="grid size-11 place-items-center rounded-2xl bg-linear-to-br from-violet-400 to-purple-600 text-white shadow-lg shadow-violet-200">
                            <Bell className="size-5" />
                        </span>
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">Notifications</h2>
                            <p className="text-xs text-slate-500">Choose what you want to be alerted about</p>
                        </div>
                    </div>
                    <ul className="space-y-5">
                        <li className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-slate-900">New order alerts</p>
                                <p className="text-xs text-slate-500">Get notified whenever a new order is placed</p>
                            </div>
                            <Toggle on={prefs.orders} onClick={() => toggle("orders")} />
                        </li>
                        <li className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-slate-900">Low stock warnings</p>
                                <p className="text-xs text-slate-500">Alert when any product stock falls below 10</p>
                            </div>
                            <Toggle on={prefs.stock} onClick={() => toggle("stock")} />
                        </li>
                        <li className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-slate-900">Weekly newsletter</p>
                                <p className="text-xs text-slate-500">Store performance summary every Monday</p>
                            </div>
                            <Toggle on={prefs.newsletter} onClick={() => toggle("newsletter")} />
                        </li>
                    </ul>
                    <div className="mt-8 flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
                        <ShieldCheck className="size-4 shrink-0" /> Your store data is encrypted and secure.
                    </div>
                </div>
            </div>

            <button
                onClick={handleSave}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold text-white shadow-xl transition active:scale-[0.98] ${saved
                        ? "bg-linear-to-r from-emerald-500 to-green-600 shadow-emerald-200"
                        : "bg-linear-to-r from-sky-500 to-blue-600 shadow-sky-300 hover:scale-[1.02]"
                    }`}
            >
                {saved ? <Check className="size-4" /> : <Save className="size-4" />}
                {saved ? "Settings Saved!" : "Save Changes"}
            </button>
        </div>
    );
}
