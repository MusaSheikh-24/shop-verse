"use client";

import { useEffect } from "react";
import { Heart, ShoppingCart, Star, Trash2, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function WishlistDrawer() {
    const { wishlist, wishOpen, closeWishlist, toggleWishlist, moveToCart, addToCart } = useStore();

    /* ESC se band */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeWishlist();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [closeWishlist]);

    /* Body scroll lock */
    useEffect(() => {
        document.body.style.overflow = wishOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [wishOpen]);

    return (
        <>
            {/* Overlay */}
            <div
                onClick={closeWishlist}
                className={`fixed inset-0 z-60 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${wishOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
            />

            {/* Panel — RIGHT se slide (cart jaisa) */}
            <aside
                className={`fixed right-0 top-0 z-70 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${wishOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-sky-100 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-200">
                            <Heart className="size-5" />
                        </span>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-900">Wishlist</h2>
                            <p className="text-xs font-semibold text-slate-500">
                                {wishlist.length} saved {wishlist.length === 1 ? "item" : "items"}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={closeWishlist}
                        aria-label="Close wishlist"
                        className="grid size-9 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {wishlist.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <span className="grid size-20 place-items-center rounded-full bg-sky-50 text-sky-300">
                                <Heart className="size-10" />
                            </span>
                            <h3 className="mt-4 font-bold text-slate-900">Wishlist is empty</h3>
                            <p className="mt-1 text-sm text-slate-500">Tap the ❤️ on any product to save it here</p>
                            <button
                                onClick={closeWishlist}
                                className="mt-5 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-200 transition hover:brightness-110"
                            >
                                Explore Products
                            </button>
                        </div>
                    ) : (
                        wishlist.map((p) => (
                            <div key={p.slug} className="mb-4 flex gap-4 rounded-2xl border border-sky-100 bg-white p-3 shadow-sm transition hover:border-sky-200 hover:shadow-md">
                                <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                                    <img src={p.img} alt={p.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex flex-1 flex-col">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-sky-600">{p.category}</p>
                                            <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                                            <span className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-slate-600">
                                                <Star className="size-3 fill-amber-400 text-amber-400" /> {p.rating}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => toggleWishlist(p)}
                                            aria-label="Remove from wishlist"
                                            className="text-slate-300 transition hover:text-sky-600"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                    <div className="mt-auto flex items-center justify-between pt-2">
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="bg-linear-to-r from-sky-600 to-blue-600 bg-clip-text text-sm font-extrabold text-transparent">${p.price}</span>
                                            <s className="text-xs text-slate-400">${p.old}</s>
                                        </div>
                                        <button
                                            onClick={() => moveToCart(p)}
                                            className="inline-flex items-center gap-1.5 rounded-lg bg-linear-to-r from-sky-500 to-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-sky-200 transition hover:scale-105 active:scale-95"
                                        >
                                            <ShoppingCart className="size-3.5" /> Move to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {wishlist.length > 0 && (
                    <div className="border-t border-sky-100 px-6 py-5">
                        <button
                            onClick={() => { wishlist.forEach((p) => addToCart(p, 1, false)); }}
                            className="w-full rounded-2xl bg-linear-to-r from-sky-500 to-blue-600 py-4 font-bold text-white shadow-xl shadow-sky-300 transition hover:brightness-110 active:scale-[0.98]"
                        >
                            Add All to Cart
                        </button>
                        <button
                            onClick={closeWishlist}
                            className="mt-2 w-full rounded-xl py-2.5 text-sm font-semibold text-slate-500 transition hover:text-sky-600"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
}