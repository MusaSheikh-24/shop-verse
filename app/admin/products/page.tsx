"use client";

import { useState } from "react";
import { Package, Pencil, Plus, Search, Trash2 } from "lucide-react";

const products = [
    { name: "Aero Sneaker X", category: "Footwear", price: 129, stock: 42, status: "In Stock", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop" },
    { name: "Pulse Headphones", category: "Audio", price: 89, stock: 8, status: "Low Stock", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop" },
    { name: "Nova Smart Watch", category: "Wearables", price: 199, stock: 65, status: "In Stock", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop" },
    { name: "Urban Backpack", category: "Accessories", price: 59, stock: 0, status: "Out of Stock", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=200&auto=format&fit=crop" },
    { name: "Titan Phone 12", category: "Electronics", price: 999, stock: 24, status: "In Stock", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200&auto=format&fit=crop" },
    { name: "Glide Laptop Air", category: "Computers", price: 1299, stock: 5, status: "Low Stock", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=200&auto=format&fit=crop" },
    { name: "Glow Skincare Set", category: "Beauty", price: 45, stock: 120, status: "In Stock", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop" },
];

const statusStyles: Record<string, string> = {
    "In Stock": "bg-emerald-50 text-emerald-600",
    "Low Stock": "bg-amber-50 text-amber-600",
    "Out of Stock": "bg-rose-50 text-rose-600",
};

export default function AdminProductsPage() {
    const [query, setQuery] = useState("");
    const filtered = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3.5 py-1.5 text-xs font-bold text-sky-600 shadow-sm">
                        <Package className="size-3.5" /> Catalog
                    </span>
                    <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">Products</h1>
                    <p className="mt-1 text-sm text-slate-500">Manage your store's catalog — {products.length} products total.</p>
                </div>
                <button className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-200 transition hover:scale-105">
                    <Plus className="size-4" /> Add Product
                </button>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-100/60">
                <div className="flex flex-wrap items-center justify-between gap-4 p-6 pb-4">
                    <div className="relative w-full max-w-xs">
                        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search products…"
                            className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white"
                        />
                    </div>
                    <span className="text-xs font-bold text-slate-500">{filtered.length} results</span>
                </div>

                {/* Desktop table */}
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-y border-slate-100 bg-slate-50/70 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                                <th className="px-6 py-3.5">Product</th>
                                <th className="px-6 py-3.5">Category</th>
                                <th className="px-6 py-3.5">Price</th>
                                <th className="px-6 py-3.5">Stock</th>
                                <th className="px-6 py-3.5">Status</th>
                                <th className="px-6 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.map((p) => (
                                <tr key={p.name} className="transition hover:bg-sky-50/40">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={p.img} alt={p.name} loading="lazy" className="size-11 rounded-xl object-cover shadow-md shadow-slate-100" />
                                            <span className="font-bold text-slate-900">{p.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{p.category}</td>
                                    <td className="px-6 py-4 font-extrabold text-slate-900">${p.price}</td>
                                    <td className="px-6 py-4 font-semibold text-slate-600">{p.stock}</td>
                                    <td className="px-6 py-4">
                                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[p.status]}`}>{p.status}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button aria-label={`Edit ${p.name}`} className="grid size-9 cursor-pointer place-items-center rounded-lg border border-slate-100 text-sky-600 transition hover:bg-sky-50">
                                                <Pencil className="size-4" />
                                            </button>
                                            <button aria-label={`Delete ${p.name}`} className="grid size-9 cursor-pointer place-items-center rounded-lg border border-rose-100 text-rose-500 transition hover:bg-rose-50">
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile cards */}
                <ul className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 md:hidden">
                    {filtered.map((p) => (
                        <li key={p.name} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                            <div className="relative h-36 overflow-hidden bg-slate-100">
                                <img src={p.img} alt={p.name} className="h-full w-full object-cover" />
                                <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles[p.status]}`}>{p.status}</span>
                            </div>
                            <div className="p-4">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-bold text-slate-900">{p.name}</p>
                                        <p className="mt-0.5 text-xs text-slate-500">{p.category}</p>
                                    </div>
                                    <p className="shrink-0 text-sm font-extrabold text-slate-900">${p.price}</p>
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
                                        {p.stock} in stock
                                    </span>
                                    <div className="flex gap-1.5">
                                        <button aria-label={`Edit ${p.name}`} className="grid size-8 cursor-pointer place-items-center rounded-lg border border-slate-100 text-sky-600 transition hover:bg-sky-50">
                                            <Pencil className="size-3.5" />
                                        </button>
                                        <button aria-label={`Delete ${p.name}`} className="grid size-8 cursor-pointer place-items-center rounded-lg border border-rose-100 text-rose-500 transition hover:bg-rose-50">
                                            <Trash2 className="size-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                {filtered.length === 0 && (
                    <div className="flex flex-col items-center py-16 text-center">
                        <Package className="size-10 text-slate-300" />
                        <p className="mt-3 text-sm font-semibold text-slate-500">No products found for "{query}"</p>
                    </div>
                )}
            </div>
        </div>
    );
}
