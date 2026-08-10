import Link from "next/link";
import {
    ArrowRight,
    Award,
    Globe,
    Heart,
    Rocket,
    ShieldCheck,
    Sparkles,
    Star,
    Target,
    Truck,
    Users,
    Zap,
    type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
    { value: "10K+", label: "Premium Products", icon: Sparkles },
    { value: "50K+", label: "Happy Customers", icon: Users },
    { value: "4.8★", label: "Average Rating", icon: Star },
    { value: "24/7", label: "Support", icon: Zap },
];

const values: { icon: LucideIcon; title: string; text: string }[] = [
    { icon: Award, title: "Premium Quality", text: "Every product reaches you only after a rigorous quality check. No compromises." },
    { icon: Truck, title: "Lightning Delivery", text: "Nationwide delivery in 2–4 business days. Free shipping on orders over $50." },
    { icon: ShieldCheck, title: "100% Trust", text: "Secure payments, a 2-year warranty, and 30-day no-questions-asked returns." },
    { icon: Heart, title: "Customer First", text: "Your satisfaction is our priority. Dedicated support is always by your side." },
];

const journey: { year: string; title: string; text: string; icon: LucideIcon }[] = [
    { year: "2020", title: "The Beginning", text: "Started with a simple idea — quality products at fair prices.", icon: Rocket },
    { year: "2021", title: "Growing Fast", text: "Earned the trust of 10,000+ customers and expanded our catalog.", icon: Users },
    { year: "2023", title: "Going Premium", text: "Launched our premium collection and nationwide delivery.", icon: Award },
    { year: "2025", title: "Today & Beyond", text: "With 50K+ happy customers, our journey of getting better continues.", icon: Sparkles },
];

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <section className="relative bg-linear-to-b from-sky-50 via-white to-white pb-20 pt-28">
                {/* Background glows */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -left-32 -top-32 size-[500px] rounded-full bg-sky-200/50 blur-3xl" />
                    <div className="absolute -right-32 top-40 size-[500px] rounded-full bg-blue-200/50 blur-3xl" />
                    <div className="absolute bottom-0 left-1/3 size-[500px] rounded-full bg-cyan-100/60 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-6xl px-4">
                    {/* ===== HERO ===== */}
                    <div className="text-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-2 text-xs font-extrabold uppercase tracking-[0.3em] text-sky-600 shadow-lg shadow-sky-100">
                            <Heart className="size-3.5 fill-sky-500 text-sky-500" /> Our Story
                        </span>
                        <h1 className="mx-auto mt-8 max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-6xl">
                            We make shopping{" "}
                            <span className="bg-linear-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                simple, special
                            </span>{" "}
                            and full of smiles.
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                            ShopVerse started in 2020 with a simple idea — premium quality, fair prices, and heartfelt customer service. Today, we are the trusted choice of thousands of customers.
                        </p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href="/shop"
                                className="group inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-linear-to-r from-sky-500 to-blue-600 px-8 py-4 text-sm font-extrabold text-white shadow-xl shadow-sky-300 transition hover:scale-105 active:scale-95"
                            >
                                Start Shopping
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border-2 border-sky-200 bg-white px-8 py-4 text-sm font-extrabold text-sky-600 shadow-md shadow-sky-100 transition hover:border-sky-400 hover:bg-sky-50"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    {/* ===== STATS ===== */}
                    <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {stats.map((s) => (
                            <div
                                key={s.label}
                                className="group rounded-3xl border-2 border-sky-100 bg-white p-6 text-center shadow-[0_10px_35px_-12px_rgba(2,132,199,0.2)] transition hover:-translate-y-1.5 hover:border-sky-200 hover:shadow-[0_25px_60px_-15px_rgba(2,132,199,0.35)]"
                            >
                                <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-linear-to-br from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-200 transition group-hover:rotate-3 group-hover:scale-110">
                                    <s.icon className="size-6" />
                                </span>
                                <p className="mt-4 bg-linear-to-r from-sky-600 to-blue-600 bg-clip-text text-3xl font-black text-transparent">
                                    {s.value}
                                </p>
                                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* ===== MISSION SPLIT ===== */}
                    <div className="mt-24 grid items-center gap-10 lg:grid-cols-2">
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-[2.5rem] bg-linear-to-br from-sky-300/50 to-blue-300/50 blur-2xl" />
                            <div className="relative overflow-hidden rounded-[2rem] border-2 border-sky-100 bg-linear-to-br from-sky-500 via-blue-600 to-indigo-600 p-10 shadow-[0_30px_80px_-20px_rgba(2,132,199,0.5)]">
                                {/* ✨ Theme-consistent pattern */}
                                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-size-[36px_36px]" />
                                <Rocket className="relative size-12 text-white/90" />
                                <h3 className="relative mt-6 text-3xl font-black text-white">Our Mission</h3>
                                <p className="relative mt-3 leading-relaxed text-sky-100">
                                    To give every customer a premium shopping experience — without any hassle. Quality, trust, and convenience, all in one place.
                                </p>
                                <div className="relative mt-8 flex flex-wrap gap-2">
                                    {["Quality", "Trust", "Speed", "Care"].map((t) => (
                                        <span key={t} className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-sky-600">
                                <Target className="size-3.5" /> Why ShopVerse
                            </span>
                            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">
                                What makes us{" "}
                                <span className="bg-linear-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">different</span>?
                            </h2>
                            <p className="leading-relaxed text-slate-600">
                                Selling products is not our only job — we craft experiences. With every order, we deliver quality, care, and confidence.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Handpicked premium products from only the best brands",
                                    "Transparent pricing — no hidden charges",
                                    "Fast and secure delivery across the country",
                                    "Real customer support, whenever you need it",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-sky-100 text-sky-600">
                                            <Sparkles className="size-3.5" />
                                        </span>
                                        <span className="text-sm font-medium text-slate-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* ===== VALUES ===== */}
                    <div className="mt-24">
                        <div className="mb-12 text-center">
                            <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-sky-600">
                                <Globe className="size-3.5" /> Our Values
                            </span>
                            <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
                                The principles we{" "}
                                <span className="bg-linear-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">live by</span>
                            </h2>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {values.map((v) => (
                                <div
                                    key={v.title}
                                    className="group rounded-3xl border-2 border-sky-100 bg-white p-7 shadow-[0_10px_35px_-12px_rgba(2,132,199,0.2)] transition hover:-translate-y-1.5 hover:border-sky-200 hover:shadow-[0_25px_60px_-15px_rgba(2,132,199,0.35)]"
                                >
                                    <span className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-200 transition group-hover:-rotate-3 group-hover:scale-110">
                                        <v.icon className="size-6" />
                                    </span>
                                    <h3 className="mt-4 text-lg font-extrabold text-slate-900">{v.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{v.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ===== JOURNEY TIMELINE (with icons) ===== */}
                    <div className="mt-24">
                        <div className="mb-12 text-center">
                            <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-sky-600">
                                <Rocket className="size-3.5" /> Our Journey
                            </span>
                            <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
                                The road we have{" "}
                                <span className="bg-linear-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">traveled</span>
                            </h2>
                        </div>
                        <div className="relative mx-auto max-w-3xl">
                            <div className="absolute left-4 top-0 h-full w-0.5 bg-linear-to-b from-sky-200 via-sky-300 to-blue-300 sm:left-1/2 sm:-translate-x-1/2" />
                            <div className="space-y-10">
                                {journey.map((j, i) => (
                                    <div
                                        key={j.year}
                                        className={`relative flex flex-col gap-4 pl-12 sm:w-1/2 sm:pl-0 ${i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12"
                                            }`}
                                    >
                                        <span className="absolute left-4 top-1 grid size-8 -translate-x-1/2 place-items-center rounded-full border-4 border-white bg-linear-to-br from-sky-500 to-blue-600 shadow-lg shadow-sky-200 sm:left-auto sm:right-0 sm:translate-x-1/2">
                                            <span className="size-2 rounded-full bg-white" />
                                        </span>
                                        <div className="rounded-3xl border-2 border-sky-100 bg-white p-6 shadow-[0_10px_35px_-12px_rgba(2,132,199,0.2)] transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_20px_50px_-15px_rgba(2,132,199,0.35)]">
                                            <span className={`flex items-center gap-2 ${i % 2 === 0 ? "sm:justify-end" : ""}`}>
                                                <j.icon className="size-4 text-sky-500" />
                                                <span className="bg-linear-to-r from-sky-600 to-blue-600 bg-clip-text text-sm font-black text-transparent">
                                                    {j.year}
                                                </span>
                                            </span>
                                            <h3 className="mt-1 text-lg font-extrabold text-slate-900">{j.title}</h3>
                                            <p className="mt-1 text-sm text-slate-500">{j.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ===== CTA ===== */}
                    <div className="relative mt-24 overflow-hidden rounded-[2.5rem] bg-linear-to-r from-sky-500 via-blue-600 to-indigo-600 p-12 text-center shadow-2xl shadow-sky-300">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-size-[44px_44px]" />
                        <Sparkles className="pointer-events-none absolute left-10 top-8 size-6 animate-pulse text-white/30" />
                        <Sparkles className="pointer-events-none absolute bottom-8 right-12 size-5 animate-pulse text-white/30" style={{ animationDelay: "1s" }} />
                        <Rocket className="relative mx-auto size-10 text-white/80" />
                        <h2 className="relative mt-4 text-3xl font-black text-white sm:text-4xl">Ready to experience the difference?</h2>
                        <p className="relative mx-auto mt-3 max-w-md text-sky-100">
                            Explore our latest collection and order your favorites today.
                        </p>
                        <Link
                            href="/shop"
                            className="group relative mt-8 inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-white px-10 py-4 text-sm font-extrabold text-sky-600 shadow-xl transition hover:scale-105 active:scale-95"
                        >
                            Start Shopping
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}