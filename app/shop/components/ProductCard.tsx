"use client";

import Link from "next/link";
import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import type { Product } from "../data";
import { useStore } from "@/context/StoreContext";

export default function ProductCard({ product, view = "grid" }: { product: Product; view?: "grid" | "list" }) {
    const { addToCart, toggleWishlist, isWished } = useStore();
    const wished = isWished(product.slug);

    const wishBtn = (
        <button
            aria-label={`Add ${product.name} to wishlist`}
            onClick={() => toggleWishlist(product)}
            className="relative grid size-9 place-items-center rounded-full bg-white/95 shadow-lg backdrop-blur transition-all hover:scale-110 active:scale-90"
        >
            {wished && (
                <span className="absolute size-full rounded-full bg-rose-400 opacity-0 animate-ping" style={{ animationDuration: "0.5s", animationIterationCount: 1 }} />
            )}
            <Heart className={`size-4 transition-all duration-300 ${wished ? "scale-110 fill-rose-500 text-rose-500" : "text-slate-400 hover:text-rose-400"}`} />
        </button>
    );

    /* LIST VIEW */
    if (view === "list") {
        return (
            <article className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-sky-100 bg-white shadow-[0_10px_35px_-12px_rgba(2,132,199,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_25px_60px_-15px_rgba(2,132,199,0.35)] sm:flex-row">
                <div className="relative m-3 h-56 shrink-0 overflow-hidden rounded-3xl bg-slate-100 sm:h-auto sm:w-64">
                    <img src={product.img} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-700 shadow-lg">{product.tag}</span>
                    <span className="absolute bottom-3 left-3 rounded-full bg-rose-500 px-2.5 py-1 text-[10px] font-extrabold text-white shadow-lg">-{product.discount}%</span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6 sm:pl-3">
                    <div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="rounded-full bg-sky-50 px-2.5 py-1 font-bold uppercase tracking-wider text-sky-600">{product.category}</span>
                            <span className="inline-flex items-center gap-1 font-semibold text-slate-600">
                                <Star className="size-3.5 fill-amber-400 text-amber-400" /> {product.rating}
                            </span>
                        </div>
                        <h3 className="mt-3 text-lg font-bold text-slate-900 transition-colors group-hover:text-sky-600">{product.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">{product.desc}</p>
                    </div>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-baseline gap-2">
                            <span className="bg-linear-to-r from-sky-600 to-blue-600 bg-clip-text text-2xl font-extrabold text-transparent">${product.price}</span>
                            <s className="text-sm text-slate-400">${product.old}</s>
                            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold text-emerald-600">Save ${product.old - product.price}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {wishBtn}
                            <Link
                                href={`/shop/${product.slug}`}
                                className="inline-flex items-center gap-1.5 rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-sky-600 transition-all hover:border-transparent hover:bg-linear-to-r hover:from-sky-500 hover:to-blue-600 hover:text-white"
                            >
                                <Eye className="size-3.5" /> Details
                            </Link>
                            <button
                                onClick={() => addToCart(product)}
                                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-200 transition-all hover:scale-105 active:scale-95"
                            >
                                <ShoppingCart className="size-4" /> Add
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        );
    }

    /* GRID VIEW */
    return (
        <article className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-sky-100 bg-white shadow-[0_10px_35px_-12px_rgba(2,132,199,0.2)] transition-all duration-300 hover:-translate-y-2 hover:border-sky-200 hover:shadow-[0_25px_60px_-15px_rgba(2,132,199,0.4)]">
            <div className="relative m-3 h-56 overflow-hidden rounded-3xl bg-slate-100">
                <img src={product.img} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-700 shadow-lg">{product.tag}</span>
                <div className="absolute right-3 top-3">{wishBtn}</div>
                <span className="absolute bottom-3 left-3 rounded-full bg-rose-500 px-2.5 py-1 text-[10px] font-extrabold text-white shadow-lg transition-opacity duration-300 group-hover:opacity-0">-{product.discount}%</span>
                <button
                    onClick={() => addToCart(product)}
                    className="absolute inset-x-3 bottom-3 flex translate-y-[150%] items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 py-2.5 text-sm font-bold text-white shadow-xl shadow-sky-300 transition-transform duration-300 group-hover:translate-y-0 active:scale-95"
                >
                    <ShoppingCart className="size-4" /> Add to Cart
                </button>
            </div>
            <div className="flex flex-1 flex-col px-5 pb-5">
                <div className="flex items-center justify-between text-xs">
                    <span className="rounded-full bg-sky-50 px-2.5 py-1 font-bold uppercase tracking-wider text-sky-600">{product.category}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-600">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" /> {product.rating}
                    </span>
                </div>
                <h3 className="mt-2.5 font-bold text-slate-900 transition-colors group-hover:text-sky-600">{product.name}</h3>
                <p className="mt-1 line-clamp-1 text-xs text-slate-500">{product.desc}</p>
                <div className="mt-auto pt-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                            <span className="bg-linear-to-r from-sky-600 to-blue-600 bg-clip-text text-xl font-extrabold text-transparent">${product.price}</span>
                            <s className="text-xs text-slate-400">${product.old}</s>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold text-emerald-600">Save ${product.old - product.price}</span>
                    </div>
                    <Link
                        href={`/shop/${product.slug}`}
                        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-sky-200 bg-sky-50/60 py-2 text-xs font-extrabold uppercase tracking-wider text-sky-600 transition-all duration-300 hover:border-transparent hover:bg-linear-to-r hover:from-sky-500 hover:to-blue-600 hover:text-white hover:shadow-lg hover:shadow-sky-200"
                    >
                        <Eye className="size-3.5" /> View Details
                    </Link>
                </div>
            </div>
        </article>
    );
}