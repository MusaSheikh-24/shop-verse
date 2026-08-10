"use client";

import { useState, type FormEvent } from "react";
import {
    Apple,
    ArrowUp,
    Check,
    ChevronDown,
    CreditCard,
    Globe,
    Heart,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Play,
    PlayCircle,
    Send,
    ShoppingBag,
    Sparkles,
} from "lucide-react";

/* ✅ Sirf 4 main links — jo pages actually exist karte hain */
const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Deals", href: "/#deals" },
    { label: "Contact", href: "/#contact" },
];

const socials = [
    { icon: Globe, label: "Website", hover: "hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600" },
    { icon: MessageCircle, label: "Chat", hover: "hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600" },
    { icon: PlayCircle, label: "Video", hover: "hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600" },
    { icon: Mail, label: "Email", hover: "hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600" },
];

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSubscribed(true);
        setEmail("");
        setTimeout(() => setSubscribed(false), 3000);
    };

    return (
        <footer id="contact" className="relative overflow-hidden bg-linear-to-b from-white via-sky-50/70 to-sky-100/80">
            {/* Top gradient hairline */}
            <div className="h-1 bg-linear-to-r from-sky-400 via-blue-500 to-indigo-500" />

            {/* Soft blobs */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-32 -top-32 size-96 rounded-full bg-sky-200/50 blur-3xl" />
                <div className="absolute -right-32 top-1/3 size-96 rounded-full bg-blue-200/50 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-14">
                {/* ✨ Newsletter — compact */}
                <div className="relative mb-10 overflow-hidden rounded-3xl bg-linear-to-r from-sky-500 via-blue-600 to-indigo-600 p-6 text-white shadow-xl shadow-sky-200 sm:p-8">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -left-16 -top-16 size-56 rounded-full bg-white/10 blur-2xl" />
                        <div className="absolute -bottom-20 -right-10 size-64 rounded-full bg-cyan-300/20 blur-2xl" />
                        <Mail className="absolute right-14 top-8 size-10 -rotate-12 animate-float text-white/20" />
                        <Sparkles className="absolute left-1/2 top-6 size-5 animate-pulse text-white/30" />
                    </div>

                    <div className="relative flex flex-col items-center justify-between gap-5 lg:flex-row">
                        <div>
                            <h3 className="text-xl font-extrabold sm:text-2xl">Subscribe for exclusive deals</h3>
                            <p className="mt-1 text-sm text-sky-100">
                                Be the first to get new arrivals and exclusive offers in your inbox — no spam, only deals.
                            </p>
                        </div>

                        <div className="w-full max-w-md">
                            <form className="flex gap-3" onSubmit={handleSubscribe}>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    aria-label="Email address"
                                    className="w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-sm text-white outline-none backdrop-blur transition placeholder:text-sky-100 focus:border-white focus:bg-white/20"
                                />
                                <button
                                    type="submit"
                                    className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-lg transition hover:scale-105"
                                >
                                    {subscribed ? <Check className="size-4 text-emerald-600" /> : <Send className="size-4" />}
                                    {subscribed ? "Subscribed!" : "Subscribe"}
                                </button>
                            </form>
                            <p
                                className={`mt-2 text-xs font-semibold text-emerald-300 transition-opacity duration-300 ${subscribed ? "opacity-100" : "opacity-0"
                                    }`}
                            >
                                You're on the list — watch your inbox for exclusive deals! 🎉
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main grid — compact: Brand + Quick Links + Contact */}
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
                    {/* Brand */}
                    <div className="lg:col-span-5">
                        <a href="/" className="flex cursor-pointer items-center gap-2.5">
                            <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-sky-400 to-blue-600 shadow-lg shadow-sky-200">
                                <ShoppingBag className="size-5 text-white" />
                            </span>
                            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                                Shop<span className="bg-linear-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Verse</span>
                            </span>
                        </a>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
                            Your one-stop shop for trending products, premium brands and unbeatable deals — with fast delivery.
                        </p>
                        <div className="mt-5 flex gap-3">
                            {socials.map((s) => {
                                const Icon = s.icon;
                                return (
                                    <a
                                        key={s.label}
                                        href="#"
                                        aria-label={s.label}
                                        className={`grid size-10 cursor-pointer place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${s.hover}`}
                                    >
                                        <Icon className="size-4" />
                                    </a>
                                );
                            })}
                        </div>
                        {/* 📱 Download App */}
                        <div className="mt-5 flex flex-wrap gap-3">
                            <a
                                href="#"
                                className="inline-flex cursor-pointer items-center gap-2.5 rounded-xl bg-slate-900 px-4 py-2.5 text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800"
                            >
                                <Apple className="size-5" />
                                <span className="text-left leading-tight">
                                    <span className="block text-[9px] uppercase tracking-wider text-slate-300">Download on the</span>
                                    <span className="block text-sm font-bold">App Store</span>
                                </span>
                            </a>
                            <a
                                href="#"
                                className="inline-flex cursor-pointer items-center gap-2.5 rounded-xl bg-slate-900 px-4 py-2.5 text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800"
                            >
                                <Play className="size-5 fill-white" />
                                <span className="text-left leading-tight">
                                    <span className="block text-[9px] uppercase tracking-wider text-slate-300">Get it on</span>
                                    <span className="block text-sm font-bold">Google Play</span>
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* ✅ Quick Links — sirf 4 main */}
                    <div className="lg:col-span-3">
                        <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">Quick Links</h4>
                        <ul className="mt-4 space-y-2.5">
                            {quickLinks.map((l) => (
                                <li key={l.label}>
                                    <a href={l.href} className="cursor-pointer text-sm text-slate-600 transition hover:pl-1 hover:text-sky-600">
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact info */}
                    <div className="lg:col-span-4">
                        <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">Get in Touch</h4>
                        <ul className="mt-4 space-y-3 text-sm text-slate-600">
                            <li className="flex items-center gap-3">
                                <MapPin className="size-4 shrink-0 text-sky-500" /> 123 Market Street, New York, NY
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="size-4 shrink-0 text-sky-500" /> +1 (555) 123-4567
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="size-4 shrink-0 text-sky-500" /> support@shopverse.com
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-sky-100 pt-6 lg:flex-row">
                    <p className="text-sm text-slate-500">© {new Date().getFullYear()} ShopVerse. All rights reserved.</p>
                    <p className="flex items-center gap-1.5 text-sm text-slate-500">
                        Made with <Heart className="size-4 fill-rose-500 text-rose-500" /> by ShopVerse Team
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <div className="relative">
                            <Globe className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sky-500" />
                            <select
                                aria-label="Select country"
                                className="cursor-pointer appearance-none rounded-lg border border-sky-100 bg-white py-1.5 pl-9 pr-8 text-xs font-semibold text-slate-600 outline-none transition hover:border-sky-300 focus:border-sky-400"
                            >
                                <option>United States</option>
                                <option>Pakistan</option>
                                <option>United Kingdom</option>
                                <option>UAE</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
                        </div>
                        {["Visa", "Mastercard", "PayPal", "Stripe"].map((p) => (
                            <span
                                key={p}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-sky-100 bg-white px-3 py-1.5 text-xs font-bold text-slate-500 transition hover:border-sky-300 hover:text-sky-600"
                            >
                                <CreditCard className="size-3.5" /> {p}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Back to Top FAB */}
            <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="absolute bottom-8 right-8 grid size-12 cursor-pointer place-items-center rounded-full bg-linear-to-br from-sky-500 to-blue-600 text-white shadow-xl shadow-sky-200 ring-4 ring-white/70 transition hover:-translate-y-1 hover:brightness-110"
            >
                <ArrowUp className="size-5" />
            </button>
        </footer>
    );
}