"use client";

import { Heart, ShoppingCart } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function Toast() {
    const { toast, openCart, openWishlist, hideToast } = useStore();

    if (!toast) return null;

    const handleClick = () => {
        hideToast();
        if (toast.type === "cart") openCart();
        else openWishlist();
    };

    return (
        <div className="fixed bottom-6 left-1/2 z-80 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2">
            <button
                onClick={handleClick}
                className="flex w-full animate-[toast-in_0.3s_ease-out] items-center gap-3 rounded-2xl border border-sky-100 bg-white/95 py-3 pl-3 pr-5 shadow-[0_20px_50px_-15px_rgba(2,132,199,0.4)] backdrop-blur-xl transition hover:scale-[1.02]"
            >
                {toast.img && (
                    <img src={toast.img} alt="" className="size-11 shrink-0 rounded-xl object-cover" />
                )}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-linear-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-200">
                    {toast.type === "cart"
                        ? <ShoppingCart className="size-4" />
                        : <Heart className="size-4 fill-current" />}
                </span>
                <div className="min-w-0 text-left">
                    <p className="truncate text-sm font-bold text-slate-900">{toast.message}</p>
                    <p className="text-xs font-semibold text-sky-600">
                        {toast.type === "cart" ? "Cart dekhein" : "Wishlist dekhein"} →
                    </p>
                </div>
            </button>
        </div>
    );
}