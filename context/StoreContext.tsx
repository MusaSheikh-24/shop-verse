"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "@/app/shop/data";

export interface CartItem {
    product: Product;
    qty: number;
}

export interface ToastState {
    message: string;
    type: "cart" | "wishlist";
    img?: string;
}

interface StoreCtx {
    cart: CartItem[];
    wishlist: Product[];
    cartOpen: boolean;
    wishOpen: boolean;
    cartCount: number;
    cartTotal: number;
    cartSavings: number;
    toast: ToastState | null;
    addToCart: (p: Product, qty?: number, openDrawer?: boolean) => void;
    removeFromCart: (slug: string) => void;
    updateQty: (slug: string, qty: number) => void;
    clearCart: () => void;
    toggleWishlist: (p: Product) => void;
    isWished: (slug: string) => boolean;
    moveToCart: (p: Product) => void;
    openCart: () => void;
    closeCart: () => void;
    openWishlist: () => void;
    closeWishlist: () => void;
    hideToast: () => void;
}

const StoreContext = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [wishOpen, setWishOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [toast, setToast] = useState<ToastState | null>(null);
    const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    /* ===== Toast ===== */
    const showToast = useCallback((t: ToastState) => {
        if (toastTimer.current) clearTimeout(toastTimer.current);
        setToast(t);
        toastTimer.current = setTimeout(() => setToast(null), 2200);
    }, []);

    const hideToast = useCallback(() => {
        if (toastTimer.current) clearTimeout(toastTimer.current);
        setToast(null);
    }, []);

    /* ===== localStorage se load ===== */
    useEffect(() => {
        setMounted(true);
        try {
            const c = localStorage.getItem("sv-cart");
            const w = localStorage.getItem("sv-wishlist");
            if (c) setCart(JSON.parse(c));
            if (w) setWishlist(JSON.parse(w));
        } catch { /* ignore */ }
    }, []);

    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem("sv-cart", JSON.stringify(cart));
    }, [cart, mounted]);

    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem("sv-wishlist", JSON.stringify(wishlist));
    }, [wishlist, mounted]);

    /* ===== Cart actions ===== */
    const addToCart = useCallback((p: Product, qty = 1, openDrawer = false) => {
        setCart((prev) => {
            const exists = prev.find((i) => i.product.slug === p.slug);
            if (exists) {
                return prev.map((i) =>
                    i.product.slug === p.slug ? { ...i, qty: Math.min(9, i.qty + qty) } : i
                );
            }
            return [...prev, { product: p, qty }];
        });

        // 👇 Drawer ki jagah toast dikhao
        if (openDrawer) {
            setCartOpen(true);
        } else {
            showToast({ message: `${p.name} cart mein add ho gaya!`, type: "cart", img: p.img });
        }
    }, [showToast]);

    const removeFromCart = useCallback((slug: string) => {
        setCart((prev) => prev.filter((i) => i.product.slug !== slug));
    }, []);

    const updateQty = useCallback((slug: string, qty: number) => {
        if (qty < 1) return removeFromCart(slug);
        setCart((prev) =>
            prev.map((i) => (i.product.slug === slug ? { ...i, qty: Math.min(9, qty) } : i))
        );
    }, [removeFromCart]);

    const clearCart = useCallback(() => setCart([]), []);

    /* ===== Wishlist actions ===== */
    const toggleWishlist = useCallback((p: Product) => {
        const alreadyWished = wishlist.some((i) => i.slug === p.slug);
        setWishlist((prev) =>
            prev.some((i) => i.slug === p.slug) ? prev.filter((i) => i.slug !== p.slug) : [...prev, p]
        );
        if (!alreadyWished) {
            showToast({ message: `${p.name} wishlist mein save ho gaya!`, type: "wishlist", img: p.img });
        }
    }, [wishlist, showToast]);

    const isWished = useCallback((slug: string) => wishlist.some((i) => i.slug === slug), [wishlist]);

    const moveToCart = useCallback((p: Product) => {
        setWishlist((prev) => prev.filter((i) => i.slug !== p.slug));
        addToCart(p, 1, true); // ⚠️ Yahan drawer KHULEGA — intentional (wishlist se move kar rahe ho)
    }, [addToCart]);

    /* ===== Derived ===== */
    const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
    const cartTotal = useMemo(() => cart.reduce((s, i) => s + i.qty * i.product.price, 0), [cart]);
    const cartSavings = useMemo(() => cart.reduce((s, i) => s + (i.product.old - i.product.price) * i.qty, 0), [cart]);

    const value: StoreCtx = {
        cart, wishlist, cartOpen, wishOpen, cartCount, cartTotal, cartSavings, toast,
        addToCart, removeFromCart, updateQty, clearCart,
        toggleWishlist, isWished, moveToCart,
        openCart: () => setCartOpen(true),
        closeCart: () => setCartOpen(false),
        openWishlist: () => setWishOpen(true),
        closeWishlist: () => setWishOpen(false),
        hideToast,
    };

    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
    const ctx = useContext(StoreContext);
    if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
    return ctx;
}