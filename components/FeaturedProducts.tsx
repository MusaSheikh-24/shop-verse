"use client";

import { useState } from "react";
import Link from "next/link";
import {
    BadgePercent,
    Eye,
    Filter,
    Flame,
    Heart,
    Plus,
    Sparkles,
    Star,
    Tag,
    Zap,
    type LucideIcon,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import type { Product } from "@/app/shop/data";

/* ✅ Clean data — trailing spaces hataye (slugs/URLs fix) */
const products: Product[] = [
    { slug: "aero-sneaker-x", name: "Aero Sneaker X", category: "Footwear", price: 129, old: 199, rating: 4.9, tag: "Hot", discount: 35, desc: "Lightweight performance sneakers with responsive cushioning.", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" },
    { slug: "pulse-headphones", name: "Pulse Headphones", category: "Audio", price: 89, old: 149, rating: 4.8, tag: "New", discount: 40, desc: "Over-ear ANC headphones with 40-hour battery life.", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop" },
    { slug: "nova-smart-watch", name: "Nova Smart Watch", category: "Wearables", price: 199, old: 299, rating: 4.7, tag: "Deal", discount: 33, desc: "AMOLED display, health tracking, and 7-day battery.", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop" },
    { slug: "urban-backpack", name: "Urban Backpack", category: "Accessories", price: 59, old: 89, rating: 4.6, tag: "Sale", discount: 34, desc: "Water-resistant 25L backpack with laptop sleeve.", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop" },
    { slug: "vision-sunglasses", name: "Vision Sunglasses", category: "Fashion", price: 75, old: 120, rating: 4.5, tag: "Hot", discount: 38, desc: "Polarized UV400 lenses in a classic frame.", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop" },
    { slug: "titan-phone-12", name: "Titan Phone 12", category: "Electronics", price: 999, old: 1199, rating: 4.9, tag: "Pro", discount: 17, desc: "6.7-inch OLED display with pro-grade camera.", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop" },
    { slug: "glide-laptop-air", name: "Glide Laptop Air", category: "Computers", price: 1299, old: 1499, rating: 4.8, tag: "New", discount: 13, desc: "Ultra-slim 14-inch laptop with all-day battery.", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop" },
    { slug: "glow-skincare-set", name: "Glow Skincare Set", category: "Beauty", price: 45, old: 70, rating: 4.6, tag: "Sale", discount: 36, desc: "5-piece hydrating skincare routine for glow.", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop" },
];

const tagIcons: Record<string, LucideIcon> = {
    Hot: Flame,
    New: Sparkles,
    Sale: Tag,
    Pro: Zap,
    Deal: BadgePercent,
};

const categories = ["All", "Electronics", "Computers", "Audio", "Wearables", "Footwear", "Fashion", "Accessories", "Beauty"];

export default function FeaturedProducts() {
    const [activeCategory, setActiveCategory] = useState("All");
    const { addToCart, toggleWishlist, isWished } = useStore();

    const filteredProducts =
        activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

    return (
        <section id="products" className="relative overflow-hidden bg-linear-to-br from-sky-50 via-white to-blue-50 px-4 py-24">
            {/* Gradient blobs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-40 size-125 animate-pulse rounded-full bg-sky-200/60 blur-3xl" />
                <div className="absolute -right-40 top-1/3 size-125 animate-pulse rounded-full bg-blue-200/60 blur-3xl" style={{ animationDelay: "1s" }} />
                <div className="absolute -bottom-40 left-1/4 size-125 animate-pulse rounded-full bg-cyan-200/50 blur-3xl" style={{ animationDelay: "2s" }} />
            </div>

            <div className="relative mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em] text-sky-600 shadow-sm backdrop-blur-sm">
                            <Sparkles className="size-3.5" /> Trending Now
                        </span>
                        <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">
                            Featured{" "}
                            <span className="bg-linear-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Products</span>
                        </h2>
                        <p className="mt-3 max-w-xl text-slate-600">
                            Discover our handpicked collection of premium products at unbeatable prices.
                        </p>
                    </div>
                    <Link
                        href="/shop"
                        className="group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-200 transition-all hover:scale-105 hover:shadow-xl hover:shadow-sky-300"
                    >
                        View All
                        <Plus className="size-4 transition-transform group-hover:rotate-90" />
                    </Link>
                </div>

                {/* Filters */}
                <div className="mb-10 flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
                        <Filter className="size-4 text-sky-600" />
                        <span className="text-sm font-semibold text-slate-700">Filter:</span>
                    </div>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${activeCategory === category
                                    ? "scale-105 bg-linear-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-200"
                                    : "border border-sky-100 bg-white/80 text-slate-600 shadow-sm backdrop-blur-sm hover:border-sky-300 hover:text-sky-600 hover:shadow-md"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredProducts.map((p) => {
                        const TagIcon = tagIcons[p.tag] || Tag;
                        const wished = isWished(p.slug);
                        return (
                            <article
                                key={p.slug}
                                className="group relative overflow-hidden rounded-3xl border border-white bg-white shadow-xl shadow-sky-100/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-200/80"
                            >
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden bg-linear-to-br from-slate-100 to-slate-50">
                                    <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    {/* Tag */}
                                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold shadow-lg backdrop-blur">
                                        <TagIcon className="size-3.5 text-sky-600" />
                                        <span className="text-slate-700">{p.tag}</span>
                                    </span>
                                    {/* ❤️ Wishlist button */}
                                    <button
                                        aria-label={`Add ${p.name} to wishlist`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleWishlist(p);
                                        }}
                                        className="absolute right-3 top-3 grid size-10 cursor-pointer place-items-center rounded-full bg-white/95 shadow-lg backdrop-blur transition-all hover:scale-110 active:scale-90"
                                    >
                                        {wished && (
                                            <span className="absolute size-full rounded-full bg-rose-400 opacity-0 animate-ping" style={{ animationDuration: "0.5s", animationIterationCount: 1 }} />
                                        )}
                                        <Heart className={`size-5 transition-all duration-300 ${wished ? "scale-110 fill-rose-500 text-rose-500" : "text-slate-400 hover:text-rose-400"}`} />
                                    </button>
                                    {/* Discount */}
                                    <div className="absolute bottom-3 left-3 grid size-12 place-items-center rounded-full bg-linear-to-br from-rose-500 to-pink-600 text-white shadow-lg">
                                        <span className="text-xs font-extrabold">-{p.discount}%</span>
                                    </div>
                                    {/* Quick add to cart */}
                                    <button
                                        aria-label={`Add ${p.name} to cart`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart(p);
                                        }}
                                        className="absolute bottom-3 right-3 grid size-12 translate-y-0 cursor-pointer place-items-center rounded-full bg-linear-to-r from-sky-500 to-blue-600 text-white opacity-100 shadow-xl shadow-sky-300 transition-all duration-300 hover:scale-110 active:scale-95 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
                                    >
                                        <Plus className="size-5" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <div className="mb-3 flex items-center justify-between text-xs">
                                        <span className="rounded-full bg-sky-50 px-3 py-1 font-semibold uppercase tracking-wider text-sky-600">{p.category}</span>
                                        <span className="inline-flex items-center gap-1 font-medium text-slate-600">
                                            <Star className="size-3.5 fill-amber-400 text-amber-400" /> {p.rating}
                                        </span>
                                    </div>
                                    <h3 className="mb-3 text-lg font-bold text-slate-900 transition-colors group-hover:text-sky-600">{p.name}</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="bg-linear-to-r from-sky-600 to-blue-600 bg-clip-text text-2xl font-extrabold text-transparent">${p.price}</span>
                                        <s className="text-sm font-medium text-slate-400">${p.old}</s>
                                    </div>
                                    <p className="mt-1 text-xs font-semibold text-emerald-600">You save ${p.old - p.price}</p>
                                    <Link
                                        href={`/shop/${p.slug}`}
                                        className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-sky-200 bg-sky-50/60 py-2.5 text-xs font-extrabold uppercase tracking-wider text-sky-600 transition-all duration-300 hover:border-transparent hover:bg-linear-to-r hover:from-sky-500 hover:to-blue-600 hover:text-white hover:shadow-lg hover:shadow-sky-200"
                                    >
                                        <Eye className="size-3.5" /> View Details
                                    </Link>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 bg-linear-to-r from-sky-500 to-blue-600 transition-transform duration-300 group-hover:scale-x-100" />
                            </article>
                        );
                    })}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="grid size-20 place-items-center rounded-full bg-white shadow-lg shadow-sky-100">
                            <Filter className="size-8 text-sky-600" />
                        </div>
                        <h3 className="mt-4 text-xl font-bold text-slate-900">No products found</h3>
                        <p className="mt-2 text-slate-600">Try selecting a different category</p>
                    </div>
                )}
            </div>
        </section>
    );
}