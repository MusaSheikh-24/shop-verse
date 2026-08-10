import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    Footprints,
    Gamepad2,
    Shirt,
    Smartphone,
    Sparkles,
    Watch,
} from "lucide-react";

const categories = [
    { name: "Electronics", items: "1,200+ items", icon: Smartphone, color: "text-sky-600", gradient: "from-sky-100 to-blue-100", shadowColor: "shadow-sky-200" },
    { name: "Fashion", items: "3,400+ items", icon: Shirt, color: "text-rose-500", gradient: "from-rose-100 to-pink-100", shadowColor: "shadow-rose-200" },
    { name: "Footwear", items: "860+ items", icon: Footprints, color: "text-violet-600", gradient: "from-violet-100 to-purple-100", shadowColor: "shadow-violet-200" },
    { name: "Watches", items: "420+ items", icon: Watch, color: "text-amber-600", gradient: "from-amber-100 to-orange-100", shadowColor: "shadow-amber-200" },
    { name: "Gaming", items: "640+ items", icon: Gamepad2, color: "text-emerald-600", gradient: "from-emerald-100 to-teal-100", shadowColor: "shadow-emerald-200" },
    { name: "Beauty", items: "980+ items", icon: Sparkles, color: "text-fuchsia-600", gradient: "from-fuchsia-100 to-pink-100", shadowColor: "shadow-fuchsia-200" },
];

export default function Categories() {
    return (
        <section id="categories" className="relative overflow-hidden bg-linear-to-b from-white to-sky-50/60 px-4 py-20">
            {/* Background decorative elements */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-40 top-20 size-96 rounded-full bg-sky-100/40 blur-3xl" />
                <div className="absolute -right-40 bottom-20 size-96 rounded-full bg-blue-100/40 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em] text-sky-600 shadow-sm">
                        <Sparkles className="size-3.5" />
                        Categories
                    </span>
                    <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">
                        Browse by{" "}
                        <span className="bg-linear-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Category</span>
                    </h2>
                    {/* ✅ English copy */}
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                        Everything you need, all in one place — the best deals and premium products in every category.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
                    {categories.map((c, index) => {
                        const Icon = c.icon;
                        return (
                            <Link
                                key={c.name}
                                href={`/shop?category=${encodeURIComponent(c.name)}`}
                                style={{ animationDelay: `${index * 50}ms` }}
                                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-sky-200 hover:shadow-2xl hover:shadow-sky-100"
                            >
                                {/* Hover gradient background */}
                                <div className="absolute inset-0 bg-linear-to-br from-sky-50/0 via-white to-blue-50/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                {/* Arrow icon */}
                                <ArrowUpRight className="absolute right-3 top-3 size-4 text-slate-300 opacity-0 transition-all duration-300 group-hover:text-sky-500 group-hover:opacity-100" />
                                {/* Icon container */}
                                <div className="relative">
                                    <div className={`mx-auto grid size-20 place-items-center rounded-2xl bg-linear-to-br ${c.gradient} shadow-lg ${c.shadowColor} transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
                                        <Icon className={`${c.color} size-8 transition-transform duration-300 group-hover:rotate-12`} strokeWidth={1.75} />
                                    </div>
                                </div>
                                {/* Text content */}
                                <div className="relative mt-4">
                                    <h3 className="font-bold text-slate-900 transition-colors duration-300 group-hover:text-sky-600">{c.name}</h3>
                                    <p className="mt-1 text-xs font-medium text-slate-500">{c.items}</p>
                                </div>
                                {/* Hover indicator bar */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 bg-linear-to-r from-sky-500 to-blue-600 transition-transform duration-300 group-hover:scale-x-100" />
                            </Link>
                        );
                    })}
                </div>

                {/* View All Button */}
                <div className="mt-16 text-center">
                    <Link
                        href="/shop"
                        className="group inline-flex cursor-pointer items-center gap-3 rounded-2xl bg-linear-to-r from-sky-500 via-blue-600 to-indigo-600 px-8 py-4 font-bold text-white shadow-xl shadow-sky-200 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-sky-300"
                    >
                        <span>View All Categories</span>
                        <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <p className="mt-4 text-sm text-slate-500">Explore 8,500+ products across 6 categories</p>
                </div>
            </div>
        </section>
    );
}