"use client";

import { useEffect } from "react";
import { Minus, Plus, ShoppingBag, Sparkles, Trash2, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";

const FREE_SHIP = 50;

export default function CartDrawer() {
    const { cart, cartOpen, closeCart, updateQty, removeFromCart, cartTotal, cartCount, cartSavings } = useStore();

    /* ESC se band + body scroll lock */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [closeCart]);

    useEffect(() => {
        document.body.style.overflow = cartOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [cartOpen]);

    const remaining = Math.max(0, FREE_SHIP - cartTotal);
    const progress = Math.min(100, (cartTotal / FREE_SHIP) * 100);

    return (
        <>
            {/* Overlay */}
            <div
                onClick={closeCart}
                className={`fixed inset-0 z-60 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${cartOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
            />

            {/* Panel — right se slide */}
            <aside
                className={`fixed right-0 top-0 z-70 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-sky-100 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-200">
                            <ShoppingBag className="size-5" />
                        </span>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-900">Your Cart</h2>
                            <p className="text-xs font-semibold text-slate-500">{cartCount} {cartCount === 1 ? "item" : "items"}</p>
                        </div>
                    </div>
                    <button onClick={closeCart} aria-label="Close cart" className="grid size-9 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                        <X className="size-5" />
                    </button>
                </div>

                {/* Free shipping progress */}
                {cart.length > 0 && (
                    <div className="border-b border-sky-50 px-6 py-4">
                        {remaining > 0 ? (
                            <p className="text-xs font-semibold text-slate-600">
                                <Sparkles className="mr-1 inline size-3.5 text-sky-500" />
                                Add <b className="text-sky-600">${remaining.toFixed(0)}</b> more for <b>FREE shipping</b>
                            </p>
                        ) : (
                            <p className="text-xs font-bold text-emerald-600">🎉 You unlocked FREE shipping!</p>
                        )}
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                                className="h-full rounded-full bg-linear-to-r from-sky-400 to-blue-600 transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {cart.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <span className="grid size-20 place-items-center rounded-full bg-sky-50 text-sky-300">
                                <ShoppingBag className="size-10" />
                            </span>
                            <h3 className="mt-4 font-bold text-slate-900">Your cart is empty</h3>
                            <p className="mt-1 text-sm text-slate-500">Add some products to get started</p>
                            <button
                                onClick={closeCart}
                                className="mt-5 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-200 transition hover:brightness-110"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.product.slug} className="mb-4 flex gap-4 rounded-2xl border border-sky-100 bg-white p-3 shadow-sm">
                                <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                                    <img src={item.product.img} alt={item.product.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex flex-1 flex-col">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-sky-600">{item.product.category}</p>
                                            <h4 className="text-sm font-bold text-slate-900">{item.product.name}</h4>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.product.slug)}
                                            aria-label="Remove item"
                                            className="text-slate-300 transition hover:text-rose-500"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                    <div className="mt-auto flex items-center justify-between pt-2">
                                        <div className="flex items-center rounded-lg border border-sky-100">
                                            <button onClick={() => updateQty(item.product.slug, item.qty - 1)} aria-label="Decrease" className="grid size-7 place-items-center text-slate-500 transition hover:text-sky-600">
                                                <Minus className="size-3" />
                                            </button>
                                            <span className="w-7 text-center text-xs font-bold text-slate-900">{item.qty}</span>
                                            <button onClick={() => updateQty(item.product.slug, item.qty + 1)} aria-label="Increase" className="grid size-7 place-items-center text-slate-500 transition hover:text-sky-600">
                                                <Plus className="size-3" />
                                            </button>
                                        </div>
                                        <p className="text-sm font-extrabold text-slate-900">${(item.product.price * item.qty).toFixed(0)}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="border-t border-sky-100 px-6 py-5">
                        <div className="mb-2 flex justify-between text-sm text-slate-500">
                            <span>Subtotal</span>
                            <span className="font-bold text-slate-900">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="mb-4 flex justify-between text-sm text-slate-500">
                            <span>You save</span>
                            <span className="font-bold text-emerald-600">-${cartSavings.toFixed(2)}</span>
                        </div>
                        <button className="w-full rounded-2xl bg-linear-to-r from-sky-500 to-blue-600 py-4 font-bold text-white shadow-xl shadow-sky-300 transition hover:brightness-110 active:scale-[0.98]">
                            Checkout • ${cartTotal.toFixed(2)}
                        </button>
                        <button onClick={closeCart} className="mt-2 w-full rounded-xl py-2.5 text-sm font-semibold text-slate-500 transition hover:text-sky-600">
                            Continue Shopping
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
}