"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, LayoutGrid, List, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "./components/ProductCard";
import FilterSidebar from "./components/FilterSidebar";
import { PRODUCTS } from "./data";   // ✅ central data — slug ke sath

const MAX_PRICE = 1500;

function ShopPageClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    // 🔍 URL ka `q` param hi single source of truth hai (navbar search yahan redirect karta hai)
    const query = searchParams.get("q") ?? "";
    const [focused, setFocused] = useState(false);
    const [selectedCats, setSelectedCats] = useState<string[]>([]);
    const [price, setPrice] = useState({ min: 0, max: MAX_PRICE });
    const [minRating, setMinRating] = useState(0);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sort, setSort] = useState("featured");
    const [view, setView] = useState<"grid" | "list">("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [visible, setVisible] = useState(8);

    // Typing se URL update karo (history spam se bachne ke liye replace use karo)
    const setQuery = (q: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (q) params.set("q", q);
        else params.delete("q");
        router.replace(`/shop?${params.toString()}`, { scroll: false });
    };

    const categories = useMemo(() => {
        const map = new Map<string, number>();
        PRODUCTS.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1));
        return [...map.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
    }, []);

    const tags = useMemo(() => [...new Set(PRODUCTS.map((p) => p.tag))], []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        const list = PRODUCTS.filter((p) => {
            if (q && !p.name.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
            if (selectedCats.length && !selectedCats.includes(p.category)) return false;
            if (p.price < price.min || p.price > price.max) return false;
            if (p.rating < minRating) return false;
            if (selectedTags.length && !selectedTags.includes(p.tag)) return false;
            return true;
        });
        switch (sort) {
            case "price-asc": return [...list].sort((a, b) => a.price - b.price);
            case "price-desc": return [...list].sort((a, b) => b.price - a.price);
            case "rating": return [...list].sort((a, b) => b.rating - a.rating);
            case "discount": return [...list].sort((a, b) => b.discount - a.discount);
            default: return list;
        }
    }, [query, selectedCats, price, minRating, selectedTags, sort]);

    const suggestions = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        return PRODUCTS.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 5);
    }, [query]);

    const toggleCat = (c: string) => {
        setSelectedCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
        setVisible(8);
    };
    const toggleTag = (t: string) => setSelectedTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
    const clearAll = () => {
        setQuery(""); setSelectedCats([]); setPrice({ min: 0, max: MAX_PRICE });
        setMinRating(0); setSelectedTags([]); setVisible(8);
        router.replace("/shop", { scroll: false });
    };

    const chips = [
        ...(query ? [{ label: `"${query}"`, remove: () => setQuery("") }] : []),
        ...selectedCats.map((c) => ({ label: c, remove: () => toggleCat(c) })),
        ...(price.min > 0 || price.max < MAX_PRICE ? [{ label: `$${price.min}–$${price.max}`, remove: () => setPrice({ min: 0, max: MAX_PRICE }) }] : []),
        ...(minRating > 0 ? [{ label: `${minRating}★ & up`, remove: () => setMinRating(0) }] : []),
        ...selectedTags.map((t) => ({ label: t, remove: () => toggleTag(t) })),
    ];

    const sidebarProps = { categories, selectedCats, toggleCat, price, setPrice, maxPrice: MAX_PRICE, minRating, setMinRating, tags, selectedTags, toggleTag, clearAll };

    return (
        <>
            <Navbar />
            <section className="relative bg-linear-to-b from-sky-50 via-white to-white pb-20 pt-28">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -left-32 -top-32 size-125 rounded-full bg-sky-200/50 blur-3xl" />
                    <div className="absolute -right-32 top-40 size-125 rounded-full bg-blue-200/50 blur-3xl" />
                    <div className="absolute bottom-0 left-1/3 size-125 rounded-full bg-cyan-100/60 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4">
                    {/* Search */}
                    <div className="relative mx-auto mb-8 max-w-2xl">
                        <div className="flex items-center gap-3 rounded-2xl border-2 border-sky-100 bg-white px-5 py-4 shadow-[0_15px_40px_-12px_rgba(2,132,199,0.3)] transition focus-within:border-sky-400 focus-within:shadow-[0_20px_50px_-12px_rgba(2,132,199,0.45)]">
                            <Search className="size-5 shrink-0 text-sky-500" />
                            <input
                                value={query}
                                onChange={(e) => { setQuery(e.target.value); setVisible(8); }}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setTimeout(() => setFocused(false), 150)}
                                placeholder="Search products, categories..."
                                className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
                            />
                            {query && (
                                <button onClick={() => setQuery("")} aria-label="Clear search" className="text-slate-400 transition hover:text-rose-500">
                                    <X className="size-4" />
                                </button>
                            )}
                        </div>
                        {focused && suggestions.length > 0 && (
                            <div className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border-2 border-sky-100 bg-white shadow-[0_25px_60px_-15px_rgba(2,132,199,0.4)]">
                                {suggestions.map((s) => (
                                    <button
                                        key={s.slug}
                                        onMouseDown={() => { setQuery(s.name); setFocused(false); }}
                                        className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-sky-50"
                                    >
                                        <img src={s.img} alt={s.name} className="size-10 rounded-lg object-cover" />
                                        <span className="flex-1 text-sm font-semibold text-slate-800">{s.name}</span>
                                        <span className="text-sm font-bold text-sky-600">${s.price}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Category pills */}
                    <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
                        <button
                            onClick={() => { setSelectedCats([]); setVisible(8); }}
                            className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition ${selectedCats.length === 0
                                ? "bg-linear-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-200"
                                : "border border-sky-100 bg-white text-slate-600 shadow-sm hover:border-sky-300 hover:text-sky-600"}`}
                        >
                            All
                        </button>
                        {categories.map((c) => (
                            <button
                                key={c.name}
                                onClick={() => toggleCat(c.name)}
                                className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition ${selectedCats.includes(c.name)
                                    ? "bg-linear-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-200"
                                    : "border border-sky-100 bg-white text-slate-600 shadow-sm hover:border-sky-300 hover:text-sky-600"}`}
                            >
                                {c.name} ({c.count})
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-8">
                        <aside className="hidden w-72 shrink-0 lg:block">
                            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-4 pr-1">
                                <FilterSidebar {...sidebarProps} />
                            </div>
                        </aside>

                        <div className="min-w-0 flex-1">
                            {/* Toolbar */}
                            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                                <p className="text-sm font-semibold text-slate-600">
                                    <span className="bg-linear-to-r from-sky-600 to-blue-600 bg-clip-text font-extrabold text-transparent">{filtered.length}</span> products found
                                </p>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="inline-flex items-center gap-2 rounded-xl border-2 border-sky-100 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-md shadow-sky-100 transition hover:border-sky-300 hover:text-sky-600 lg:hidden"
                                    >
                                        <SlidersHorizontal className="size-4" /> Filters
                                    </button>
                                    <div className="relative">
                                        <select
                                            value={sort}
                                            onChange={(e) => setSort(e.target.value)}
                                            aria-label="Sort products"
                                            className="appearance-none rounded-xl border-2 border-sky-100 bg-white py-2.5 pl-4 pr-10 text-sm font-semibold text-slate-700 shadow-md shadow-sky-100 outline-none transition hover:border-sky-300 focus:border-sky-400"
                                        >
                                            <option value="featured">Featured</option>
                                            <option value="price-asc">Price: Low → High</option>
                                            <option value="price-desc">Price: High → Low</option>
                                            <option value="rating">Top Rated</option>
                                            <option value="discount">Biggest Discount</option>
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-sky-500" />
                                    </div>
                                    <div className="flex overflow-hidden rounded-xl border-2 border-sky-100 bg-white shadow-md shadow-sky-100">
                                        <button onClick={() => setView("grid")} aria-label="Grid view" className={`grid size-10 place-items-center transition ${view === "grid" ? "bg-linear-to-r from-sky-500 to-blue-600 text-white" : "text-slate-500 hover:text-sky-600"}`}>
                                            <LayoutGrid className="size-4" />
                                        </button>
                                        <button onClick={() => setView("list")} aria-label="List view" className={`grid size-10 place-items-center transition ${view === "list" ? "bg-linear-to-r from-sky-500 to-blue-600 text-white" : "text-slate-500 hover:text-sky-600"}`}>
                                            <List className="size-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {showFilters && (
                                <div className="mb-6 lg:hidden">
                                    <FilterSidebar {...sidebarProps} />
                                </div>
                            )}

                            {/* Chips */}
                            {chips.length > 0 && (
                                <div className="mb-6 flex flex-wrap items-center gap-2">
                                    <Sparkles className="size-4 text-sky-500" />
                                    {chips.map((chip) => (
                                        <button
                                            key={chip.label}
                                            onClick={chip.remove}
                                            className="group inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-sky-500 to-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-sky-200 transition hover:brightness-110"
                                        >
                                            {chip.label}
                                            <X className="size-3 transition-transform group-hover:rotate-90" />
                                        </button>
                                    ))}
                                    <button onClick={clearAll} className="text-xs font-semibold text-slate-500 underline transition hover:text-rose-500">
                                        Clear all
                                    </button>
                                </div>
                            )}

                            {/* Products */}
                            {filtered.length === 0 ? (
                                <div className="flex flex-col items-center rounded-3xl border-2 border-dashed border-sky-200 bg-white/60 py-20 text-center">
                                    <Search className="size-10 text-sky-300" />
                                    <h3 className="mt-4 text-xl font-bold text-slate-900">Koi product nahi mila</h3>
                                    <p className="mt-1 text-sm text-slate-500">Filters change karo ya search clear karo</p>
                                    <button onClick={clearAll} className="mt-5 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:brightness-110">
                                        Clear All Filters
                                    </button>
                                </div>
                            ) : view === "grid" ? (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                    {filtered.slice(0, visible).map((p) => (
                                        <ProductCard key={p.slug} product={p} view="grid" />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-6">
                                    {filtered.slice(0, visible).map((p) => (
                                        <ProductCard key={p.slug} product={p} view="list" />
                                    ))}
                                </div>
                            )}

                            {visible < filtered.length && (
                                <div className="mt-10 text-center">
                                    <button
                                        onClick={() => setVisible((v) => v + 4)}
                                        className="rounded-xl bg-linear-to-r from-sky-500 to-blue-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-sky-200 transition hover:scale-105 hover:shadow-xl"
                                    >
                                        Load More Products
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={null}>
            <ShopPageClient />
        </Suspense>
    );
}