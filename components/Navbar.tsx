"use client";

import { useEffect, useState, type FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, ShoppingCart, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Deals", href: "/#deals" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hash, setHash] = useState("");
    const [query, setQuery] = useState("");
    const pathname = usePathname();
    const router = useRouter();
    const { cartCount, wishlist, openCart, openWishlist } = useStore();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onHash = () => setHash(window.location.hash);
        onHash();
        window.addEventListener("hashchange", onHash);
        return () => window.removeEventListener("hashchange", onHash);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [pathname, hash]);

    const isActive = (href: string) => {
        if (href.includes("#")) {
            const [path, h] = href.split("#");
            return pathname === (path || "/") && hash === `#${h}`;
        }
        if (href === "/") return pathname === "/" && hash === "";
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    /* 🔍 Search submit → /shop par query ke sath redirect */
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const q = query.trim();
        if (!q) return;
        router.push(`/shop?q=${encodeURIComponent(q)}`);
        setQuery("");
        setOpen(false);
    };

    const searchField = (
        <>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands…"
                aria-label="Search products"
                className="w-full rounded-full border border-slate-200 bg-white/80 py-2.5 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100"
            />
        </>
    );

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-4">
            <nav
                className={`mx-auto mt-4 flex max-w-7xl items-center gap-2.5 rounded-2xl border px-3 py-3 transition-all duration-300 sm:gap-4 sm:px-5 ${scrolled
                    ? "border-sky-100 bg-white/90 shadow-lg shadow-sky-100/60 backdrop-blur-xl"
                    : "border-white/60 bg-white/60 backdrop-blur-md"
                    }`}
            >
                {/* Logo */}
                <a href="/" className="flex shrink-0 items-center gap-2 sm:gap-2.5">
                    <span className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-sky-400 to-blue-600 shadow-lg shadow-sky-200">
                        <ShoppingBag className="size-5 text-white" />
                    </span>
                    <span className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                        Shop<span className="bg-linear-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Verse</span>
                    </span>
                </a>

                {/* Links (desktop) */}
                <ul className="hidden items-center gap-6 lg:ml-8 lg:flex xl:ml-12 xl:gap-7">
                    {navLinks.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    aria-current={active ? "page" : undefined}
                                    className={`relative py-1 text-sm font-medium transition hover:text-sky-600 ${active ? "text-sky-600" : "text-slate-600"
                                        }`}
                                >
                                    {link.label}
                                    <span
                                        className={`absolute -bottom-1 left-1/2 h-1 -translate-x-1/2 rounded-full bg-linear-to-r from-sky-500 to-blue-600 shadow-sm shadow-sky-200 transition-all duration-300 ${active ? "w-6 opacity-100" : "w-0 opacity-0"
                                            }`}
                                    />
                                </a>
                            </li>
                        );
                    })}
                </ul>

                {/* 🔍 NEW — Search bar (tablet / desktop) */}
                <form
                    onSubmit={handleSearch}
                    role="search"
                    className="relative hidden min-w-0 flex-1 md:block md:max-w-xs xl:max-w-sm"
                >
                    {searchField}
                </form>

                {/* Actions */}
                <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
                    {/* ❤️ Wishlist */}
                    <button
                        onClick={openWishlist}
                        aria-label="Open wishlist"
                        className="group relative grid size-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-rose-200 hover:bg-rose-50/50 hover:text-rose-500 sm:size-10"
                    >
                        <Heart className="size-5 transition-transform duration-300 group-hover:scale-110" />
                        {wishlist.length > 0 && (
                            <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-linear-to-r from-rose-500 to-pink-600 text-[10px] font-bold text-white shadow-md shadow-rose-200 ring-2 ring-white">
                                {wishlist.length}
                            </span>
                        )}
                    </button>

                    {/* 🛒 Cart */}
                    <button
                        onClick={openCart}
                        aria-label="Open cart"
                        className="group relative grid size-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-200 hover:bg-sky-50/50 hover:text-sky-600 sm:size-10"
                    >
                        <ShoppingCart className="size-5 transition-transform duration-300 group-hover:scale-110" />
                        {cartCount > 0 && (
                            <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-linear-to-r from-sky-500 to-blue-600 text-[10px] font-bold text-white shadow-md shadow-sky-200 ring-2 ring-white">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <a
                        href="/signin"
                        className="rounded-xl bg-linear-to-r from-sky-500 to-blue-600 px-3 py-2 text-xs font-bold whitespace-nowrap text-white shadow-lg shadow-sky-200 transition hover:brightness-110 sm:px-5 sm:py-2.5 sm:text-sm sm:font-semibold"
                    >
                        Sign In
                    </a>

                    <button
                        aria-label="Menu"
                        onClick={() => setOpen(!open)}
                        className="grid size-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm md:hidden sm:size-10"
                    >
                        {open ? <X className="size-5" /> : <Menu className="size-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile dropdown */}
            {open && (
                <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-sky-100 bg-white/95 p-4 shadow-lg shadow-sky-100/60 backdrop-blur-xl md:hidden">
                    {/* 🔍 NEW — Search (mobile) */}
                    <form onSubmit={handleSearch} role="search" className="relative mb-3">
                        {searchField}
                    </form>
                    <ul className="space-y-1">
                        {navLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition ${active
                                            ? "bg-linear-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-200"
                                            : "text-slate-600 hover:bg-sky-50 hover:text-sky-600"
                                            }`}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                    <a
                        href="/signin"
                        onClick={() => setOpen(false)}
                        className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-sky-200 transition hover:brightness-110"
                    >
                        Sign In
                    </a>
                </div>
            )}
        </header>
    );
}