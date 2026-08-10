import { BadgeCheck, Quote, Star } from "lucide-react";

/* ✅ English testimonials */
const testimonials = [
    {
        name: "Sarah Ahmed",
        role: "Fashion Blogger",
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        text: "The ordering experience was amazing! My delivery arrived in just 2 days and the packaging felt truly premium. ShopVerse is my go-to store now.",
    },
    {
        name: "Ali Raza",
        role: "Software Engineer",
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        text: "The headphones were 100% original and far cheaper than the market price. Finding products with the filters is super easy too. Highly recommended!",
    },
    {
        name: "Emma Wilson",
        role: "Verified Buyer",
        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
        text: "Customer support solved my return issue in just 5 minutes. You rarely find service like this these days. Love it!",
    },
];

export default function Testimonials() {
    return (
        <section className="relative overflow-hidden bg-linear-to-b from-white to-sky-50/60 px-4 py-20">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-40 top-20 size-96 rounded-full bg-sky-100/50 blur-3xl" />
                <div className="absolute -right-40 bottom-20 size-96 rounded-full bg-blue-100/50 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em] text-sky-600 shadow-sm backdrop-blur-sm">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" /> Testimonials
                    </span>
                    <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">
                        Over{" "}
                        <span className="bg-linear-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">50,000+ Happy</span>{" "}
                        Customers
                    </h2>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-sm">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                            ))}
                        </div>
                        <span className="text-sm font-semibold text-slate-700">4.9/5 — 12,000+ verified reviews</span>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid gap-6 md:grid-cols-3">
                    {testimonials.map((t) => (
                        <div
                            key={t.name}
                            className="relative rounded-3xl border border-white bg-white p-7 shadow-xl shadow-sky-100/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-200/70"
                        >
                            <Quote className="absolute right-6 top-6 size-8 text-sky-100" />
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <p className="mt-4 text-sm leading-relaxed text-slate-600">“{t.text}”</p>
                            <div className="mt-6 flex items-center gap-3 border-t border-sky-50 pt-5">
                                <img src={t.img} alt={t.name} loading="lazy" className="size-12 rounded-full object-cover ring-2 ring-sky-200" />
                                <div>
                                    <p className="flex items-center gap-1.5 font-bold text-slate-900">
                                        {t.name}
                                        <BadgeCheck className="size-4 text-sky-500" />
                                    </p>
                                    <p className="text-xs text-slate-500">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}