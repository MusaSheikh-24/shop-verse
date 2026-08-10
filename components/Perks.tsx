import { CheckCircle2, Headphones, RefreshCw, ShieldCheck, Truck } from "lucide-react";

const perks = [
    {
        icon: Truck,
        title: "Free Shipping",
        desc: "Free delivery worldwide on orders over $50",
        detail: "2-3 business days",
        color: "text-sky-600",
        gradient: "from-sky-100 to-blue-100",
        shadowColor: "shadow-sky-200",
    },
    {
        icon: ShieldCheck,
        title: "Secure Payment",
        desc: "100% protected checkout with SSL encryption",
        detail: "256-bit encryption",
        color: "text-violet-600",
        gradient: "from-violet-100 to-fuchsia-100",
        shadowColor: "shadow-violet-200",
    },
    {
        icon: RefreshCw,
        title: "Easy Returns",
        desc: "30-day no-questions-asked returns with instant refunds",
        detail: "Hassle-free process",
        color: "text-emerald-600",
        gradient: "from-emerald-100 to-teal-100",
        shadowColor: "shadow-emerald-200",
    },
    {
        icon: Headphones,
        title: "24/7 Support",
        desc: "Reach out anytime — we're always here to help",
        detail: "Live chat & email",
        color: "text-amber-600",
        gradient: "from-amber-100 to-orange-100",
        shadowColor: "shadow-amber-200",
    },
];

export default function Perks() {
    return (
        <section className="relative overflow-hidden bg-linear-to-br from-sky-50 via-white to-blue-50 px-4 py-20">
            {/* ✨ Premium Gradient Background Blobs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -right-40 -top-40 size-125 animate-pulse rounded-full bg-sky-200/50 blur-3xl" />
                <div className="absolute -left-40 top-1/2 size-125 animate-pulse rounded-full bg-blue-200/50 blur-3xl" style={{ animationDelay: "1.5s" }} />
                <div className="absolute -bottom-40 right-1/3 size-125 animate-pulse rounded-full bg-cyan-200/40 blur-3xl" style={{ animationDelay: "3s" }} />
            </div>

            <div className="relative mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em] text-sky-600 shadow-sm backdrop-blur-sm">
                        <CheckCircle2 className="size-3.5" />
                        Why Choose Us
                    </span>
                    <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">
                        Premium Shopping{" "}
                        <span className="bg-linear-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Experience</span>
                    </h2>
                    {/* ✅ English copy */}
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                        We don't just sell products — we deliver a complete shopping experience built on trust, speed, and reliability.
                    </p>
                </div>

                {/* Perks Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {perks.map((perk, index) => {
                        const Icon = perk.icon;
                        return (
                            <div
                                key={perk.title}
                                className="group relative overflow-hidden rounded-3xl border border-white bg-white p-6 shadow-xl shadow-sky-100/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-200/80"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Hover gradient overlay */}
                                <div className={`absolute inset-0 bg-linear-to-br ${perk.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-30`} />
                                {/* Icon Container */}
                                <div className="relative mb-4">
                                    <div className={`mx-auto grid size-20 place-items-center rounded-2xl bg-linear-to-br ${perk.gradient} shadow-lg ${perk.shadowColor} transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-xl`}>
                                        <Icon className={`${perk.color} size-9 transition-transform duration-300 group-hover:scale-110`} strokeWidth={1.75} />
                                    </div>
                                </div>
                                {/* Content */}
                                <div className="relative text-center">
                                    <h3 className="mb-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-sky-600">
                                        {perk.title}
                                    </h3>
                                    <p className="mb-3 text-sm leading-relaxed text-slate-600">{perk.desc}</p>
                                    {/* Detail badge */}
                                    <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                                        <CheckCircle2 className="size-3 text-emerald-500" />
                                        {perk.detail}
                                    </div>
                                </div>
                                {/* Hover indicator bar */}
                                <div className={`absolute bottom-0 left-0 right-0 h-1 scale-x-0 bg-linear-to-r ${perk.gradient} transition-transform duration-300 group-hover:scale-x-100`} />
                            </div>
                        );
                    })}
                </div>

                {/* Trust Stats */}
                <div className="mt-16 rounded-3xl border border-sky-100 bg-white/80 p-8 shadow-xl shadow-sky-100/60 backdrop-blur-sm">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        <div className="text-center">
                            <p className="bg-linear-to-r from-sky-600 to-blue-600 bg-clip-text text-4xl font-extrabold text-transparent">99.9%</p>
                            <p className="mt-2 text-sm font-medium text-slate-600">Uptime Guaranteed</p>
                        </div>
                        <div className="text-center">
                            <p className="bg-linear-to-r from-sky-600 to-blue-600 bg-clip-text text-4xl font-extrabold text-transparent">4.9★</p>
                            <p className="mt-2 text-sm font-medium text-slate-600">Customer Rating</p>
                        </div>
                        <div className="text-center">
                            <p className="bg-linear-to-r from-sky-600 to-blue-600 bg-clip-text text-4xl font-extrabold text-transparent">24/7</p>
                            <p className="mt-2 text-sm font-medium text-slate-600">Support Available</p>
                        </div>
                        <div className="text-center">
                            <p className="bg-linear-to-r from-sky-600 to-blue-600 bg-clip-text text-4xl font-extrabold text-transparent">50k+</p>
                            <p className="mt-2 text-sm font-medium text-slate-600">Happy Customers</p>
                        </div>
                    </div>
                </div>

                {/* Additional Trust Badges */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <ShieldCheck className="size-5 text-emerald-500" />
                        <span className="font-medium">SSL Secured</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="size-5 text-sky-500" />
                        <span className="font-medium">Verified Business</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Truck className="size-5 text-violet-500" />
                        <span className="font-medium">Insured Shipping</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <RefreshCw className="size-5 text-amber-500" />
                        <span className="font-medium">Money Back Guarantee</span>
                    </div>
                </div>
            </div>
        </section>
    );
}