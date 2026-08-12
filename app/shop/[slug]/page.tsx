"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, BadgeCheck, Check, ChevronRight, ClipboardList, CreditCard,
    Gauge, Heart, Minus, Package, Plus, RotateCw, ShieldCheck,
    ShoppingCart, Sparkles, Star, Truck, Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProduct, PRODUCTS } from "../data";
import ProductCard from "../components/ProductCard";
import { useStore } from "@/context/StoreContext";

const perks = [
    { icon: Truck, label: "Free Shipping", sub: "On orders over $50" },
    { icon: ShieldCheck, label: "2 Year Warranty", sub: "Full coverage" },
    { icon: RotateCw, label: "30 Days Return", sub: "Money back guarantee" },
    { icon: Zap, label: "Fast Delivery", sub: "Ships within 24 hrs" },
];

export default function ProductDetailPage() {
    const params = useParams();
    const rawSlug = params?.slug;
    const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug ?? "";

    const product = getProduct(slug);

    const [qty, setQty] = useState(1);
    const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");
    const [mainImage, setMainImage] = useState(product?.img || "");
    const [isScrolled, setIsScrolled] = useState(false);

    const { addToCart, toggleWishlist, isWished } = useStore();
    const wished = product ? isWished(product.slug) : false;

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 400);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* ===== 404 Fallback ===== */
    if (!product) {
        return (
            <>
                <Navbar />
                <section className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-sky-50 via-white to-white px-4 pt-28 text-center">
                    <div className="relative">
                        <p className="absolute inset-0 bg-linear-to-r from-sky-400 to-blue-600 bg-clip-text text-9xl font-black text-transparent opacity-20 blur-sm">404</p>
                        <p className="relative bg-linear-to-r from-sky-500 to-blue-700 bg-clip-text text-9xl font-black text-transparent">404</p>
                    </div>
                    <h1 className="mt-4 text-3xl font-extrabold text-slate-900">Product Not Found</h1>
                    <p className="mt-3 max-w-md text-slate-500">The product you are looking for might have been removed or is temporarily unavailable.</p>
                    <Link href="/shop" className="mt-8 group inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-3.5 font-semibold text-white shadow-xl transition hover:bg-sky-600 hover:shadow-sky-200">
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> Back to Shop
                    </Link>
                </section>
                <Footer />
            </>
        );
    }

    // Gallery mocks (same image, different crops) for the thumbnail strip
    const galleryImages = [
        product.img,
        `${product.img}&sat=-100`,
        `${product.img}&blur=2`,
        `${product.img}&auto=format&fit=crop&w=800&q=80`,
    ];

    const related = [
        ...PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug),
        ...PRODUCTS.filter((p) => p.category !== product.category && p.slug !== product.slug),
    ].slice(0, 4);

    const stock = 86; // mock stock level
    const ratingBars = [
        { label: "5 ★", pct: 82 },
        { label: "4 ★", pct: 12 },
        { label: "3 ★", pct: 4 },
        { label: "2 ★", pct: 1 },
        { label: "1 ★", pct: 1 },
    ];

    const tabs = [
        { id: "desc" as const, label: "Description", icon: ClipboardList },
        { id: "specs" as const, label: "Specifications", icon: BadgeCheck },
        { id: "reviews" as const, label: `Reviews (${128})`, icon: Star },
    ];

    const specs = [
        ["Category", product.category],
        ["Brand", "Premium Store"],
        ["Weight", "0.5 kg"],
        ["Dimensions", "10 x 10 x 5 cm"],
        ["Color", "Multiple"],
        ["Warranty", "2 Years"],
        ["In The Box", "Product + USB-C cable"],
    ];

    return (
        <>
            <Navbar />

            {/* Background Ambience */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-white">
                <div className="absolute left-[8%] top-[5%] size-150 rounded-full bg-sky-100/50 blur-[100px]" />
                <div className="absolute right-[2%] top-[25%] size-125 rounded-full bg-blue-100/50 blur-[100px]" />
                <div className="absolute bottom-[5%] left-[25%] size-125 rounded-full bg-indigo-100/40 blur-[90px]" />
                <div className="absolute -bottom-20 right-[15%] size-96 rounded-full bg-cyan-100/30 blur-[80px]" />
            </div>

            <main className="relative z-10 mx-auto max-w-7xl px-4 pb-32 pt-28 sm:px-6 lg:px-8">

                {/* Breadcrumbs */}
                <nav className="mb-8 flex items-center gap-2 overflow-x-auto text-xs font-medium whitespace-nowrap text-slate-500 no-scrollbar">
                    <Link href="/" className="transition-colors hover:text-sky-600">Home</Link>
                    <ChevronRight className="size-3 shrink-0" />
                    <Link href="/shop" className="transition-colors hover:text-sky-600">Shop</Link>
                    <ChevronRight className="size-3 shrink-0" />
                    <Link href="/shop" className="transition-colors hover:text-sky-600">{product.category}</Link>
                    <ChevronRight className="size-3 shrink-0" />
                    <span className="truncate font-semibold text-slate-900">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

                    {/* ============ LEFT: Image Gallery ============ */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24 space-y-6">
                            {/* Glow-blob behind frame */}
                            <div className="relative">
                                <div className="absolute -inset-6 rounded-[3rem] bg-linear-to-br from-sky-200/60 via-blue-100/50 to-indigo-200/60 blur-2xl" />
                                <div className="relative">
                                    {/* Gradient ring frame */}
                                    <div className="rounded-[2.25rem] bg-linear-to-br from-sky-400 via-blue-500 to-indigo-500 p-1.5 shadow-2xl shadow-sky-200/70">
                                        <div className="group relative aspect-square w-full overflow-hidden rounded-[1.8rem] bg-white">
                                            <img
                                                src={mainImage}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />

                                            {/* Badges */}
                                            <div className="absolute left-5 top-5 flex flex-col items-start gap-2">
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-900 shadow-lg backdrop-blur-md">
                                                    <Sparkles className="size-3.5 text-sky-500" /> {product.tag}
                                                </span>
                                                <span className="rounded-full bg-linear-to-r from-rose-500 to-pink-500 px-4 py-1.5 text-xs font-extrabold text-white shadow-lg shadow-rose-200">
                                                    -{product.discount}% OFF
                                                </span>
                                            </div>

                                            {/* Floating wishlist */}
                                            <button
                                                onClick={() => toggleWishlist(product)}
                                                aria-label="Toggle wishlist"
                                                className={`absolute right-5 top-5 grid size-12 place-items-center rounded-full bg-white/90 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 ${wished ? "text-rose-500" : "text-slate-400 hover:text-rose-400"}`}
                                            >
                                                <Heart className={`size-6 transition-all ${wished ? "scale-110 fill-current" : ""}`} />
                                            </button>

                                            {/* Rotating discount badge */}
                                            <div className="absolute -bottom-4 left-1/2 size-24 -translate-x-1/2">
                                                <div className="relative grid size-full place-items-center">
                                                    <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-[spin_14s_linear_infinite]">
                                                        <defs>
                                                            <path id="circlePath" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                                                        </defs>
                                                        <text className="fill-sky-700 text-[11px] font-extrabold tracking-[0.18em] uppercase">
                                                            <textPath href="#circlePath">• Special Offer • Limited Time</textPath>
                                                        </text>
                                                    </svg>
                                                    <span className="grid size-14 place-items-center rounded-full bg-linear-to-br from-sky-500 to-blue-600 text-center text-sm font-black text-white shadow-xl shadow-sky-300">
                                                        {product.discount}%
                                                        <span className="block text-[8px] font-bold tracking-wider">OFF</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Thumbnail strip */}
                            <div className="grid grid-cols-4 gap-4">
                                {galleryImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setMainImage(img)}
                                        className={`relative aspect-square overflow-hidden rounded-2xl border-2 transition-all duration-300 ${mainImage === img
                                            ? "border-sky-500 ring-4 ring-sky-100"
                                            : "border-slate-200 opacity-70 hover:opacity-100"}`}
                                    >
                                        <img src={img} alt={`View ${idx + 1}`} className="h-full w-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ============ RIGHT: Details ============ */}
                    <div className="flex flex-col lg:col-span-5">

                        {/* Header */}
                        <div className="mb-6">
                            <div className="mb-3 flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-sky-600">
                                    <Package className="size-3.5" /> {product.category}
                                </span>
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star className="size-4 fill-current" />
                                    <span className="text-sm font-bold text-slate-700">{product.rating}</span>
                                    <span className="text-xs text-slate-400">(128 reviews)</span>
                                </div>
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                                    <Check className="size-3.5" /> In Stock
                                </span>
                            </div>

                            <h1 className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                                {product.name}
                            </h1>

                            <p className="mt-4 text-lg leading-relaxed text-slate-600">
                                {product.desc} Experience premium quality craftsmanship designed for modern lifestyle.
                            </p>
                        </div>

                        {/* Price card */}
                        <div className="mb-6 flex items-center gap-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-sky-100/40">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Today&apos;s Price</p>
                                <div className="mt-1 flex items-baseline gap-3">
                                    <span className="bg-linear-to-r from-sky-600 to-blue-600 bg-clip-text text-5xl font-black tracking-tight text-transparent">
                                        ${product.price}
                                    </span>
                                </div>
                            </div>
                            <div className="h-12 w-px bg-slate-100" />
                            <div className="space-y-1">
                                <p className="text-lg font-medium text-slate-400 line-through">${product.old}</p>
                                <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-600">
                                    Save ${product.old - product.price}
                                </span>
                            </div>
                        </div>

                        {/* Stock level bar */}
                        <div className="mb-6">
                            <div className="mb-2 flex items-center justify-between text-xs">
                                <span className="font-bold text-slate-700">Hurry! Only {stock} left in stock</span>
                                <span className="font-extrabold text-sky-600">92% sold</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                <div className="h-full w-[92%] rounded-full bg-linear-to-r from-sky-400 via-blue-500 to-indigo-500" />
                            </div>
                        </div>

                        {/* Quantity + Add to cart */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-slate-900">Quantity:</span>
                                <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                                    <button
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                        aria-label="Decrease quantity"
                                        className="grid size-10 cursor-pointer place-items-center rounded-lg text-slate-500 transition hover:bg-slate-50 hover:text-sky-600 active:bg-slate-100"
                                    >
                                        <Minus className="size-4" />
                                    </button>
                                    <span className="w-12 text-center font-bold text-slate-900">{qty}</span>
                                    <button
                                        onClick={() => setQty(Math.min(10, qty + 1))}
                                        aria-label="Increase quantity"
                                        className="grid size-10 cursor-pointer place-items-center rounded-lg text-slate-500 transition hover:bg-slate-50 hover:text-sky-600 active:bg-slate-100"
                                    >
                                        <Plus className="size-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <button
                                    onClick={() => addToCart(product, qty)}
                                    className="group relative flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-2xl bg-linear-to-r from-sky-500 to-blue-600 px-8 py-4 font-bold text-white shadow-xl shadow-sky-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-300 active:translate-y-0"
                                >
                                    <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                                    <ShoppingCart className="size-5 transition-transform group-hover:scale-110" />
                                    Add to Cart
                                </button>
                                <button className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 transition-all hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600">
                                    <Gauge className="size-5" /> Buy Now
                                </button>
                            </div>
                        </div>

                        {/* Perks marquee (scrolling) */}
                        <div className="relative mt-10 overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/80">
                            <div className="flex w-max animate-[marquee_22s_linear_infinite] gap-3 p-4 hover:[animation-play-state:paused]">
                                {[...perks, ...perks].map((item, i) => (
                                    <div key={i} className="flex shrink-0 items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-2.5 shadow-sm">
                                        <span className="grid size-9 place-items-center rounded-full bg-linear-to-br from-sky-400 to-blue-600 text-white shadow-md shadow-sky-200">
                                            <item.icon className="size-4" />
                                        </span>
                                        <span>
                                            <span className="block text-xs font-extrabold text-slate-900">{item.label}</span>
                                            <span className="block text-[10px] text-slate-500">{item.sub}</span>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ============ Tabs ============ */}
                        <div className="mt-12">
                            {/* Gradient pill tabs */}
                            <div className="flex gap-2 overflow-x-auto rounded-2xl bg-slate-100/80 p-1.5 no-scrollbar">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-300 ${activeTab === tab.id
                                            ? "bg-linear-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-200"
                                            : "text-slate-500 hover:bg-white hover:text-slate-800"
                                            }`}
                                    >
                                        <tab.icon className="size-4" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="py-6 text-sm leading-relaxed text-slate-600">
                                {activeTab === "desc" && (
                                    <div className="space-y-4">
                                        <p>{product.desc}</p>
                                        <p>Premium materials ensure durability and style. Designed for those who appreciate quality in every detail.</p>
                                        <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                                            {["High-quality build", "Ergonomic design", "Long-lasting performance", "Easy maintenance"].map((f) => (
                                                <li key={f} className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/50 px-3 py-2.5 font-semibold text-slate-700">
                                                    <span className="grid size-5 place-items-center rounded-full bg-emerald-500 text-white">
                                                        <Check className="size-3" />
                                                    </span>
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {activeTab === "specs" && (
                                    <div className="overflow-hidden rounded-2xl border border-slate-100">
                                        <table className="w-full text-left">
                                            <tbody className="divide-y divide-slate-100">
                                                {specs.map(([key, val], i) => (
                                                    <tr key={key} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                                                        <td className="w-2/5 py-3.5 pl-5 font-bold text-slate-900">{key}</td>
                                                        <td className="py-3.5 pr-5 text-slate-600">{val}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {activeTab === "reviews" && (
                                    <div className="space-y-6">
                                        {/* Summary card */}
                                        <div className="flex flex-col items-center gap-5 rounded-2xl bg-linear-to-br from-sky-50 to-blue-50 p-6 sm:flex-row">
                                            <div className="text-center">
                                                <p className="text-4xl font-black text-slate-900">{product.rating}</p>
                                                <div className="mt-1 flex justify-center text-amber-400">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <Star key={s} className="size-4 fill-current" />
                                                    ))}
                                                </div>
                                                <p className="mt-1 text-xs text-slate-500">128 reviews</p>
                                            </div>
                                            <div className="hidden h-16 w-px bg-sky-200 sm:block" />
                                            <div className="w-full flex-1 space-y-1.5">
                                                {ratingBars.map((b) => (
                                                    <div key={b.label} className="flex items-center gap-3">
                                                        <span className="w-8 shrink-0 text-right text-xs font-bold text-slate-600">{b.label}</span>
                                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/80">
                                                            <div className="h-full rounded-full bg-linear-to-r from-amber-400 to-amber-500" style={{ width: `${b.pct}%` }} />
                                                        </div>
                                                        <span className="w-8 shrink-0 text-xs font-semibold text-slate-500">{b.pct}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        {/* Reviews */}
                                        {[
                                            { name: "Alex M.", time: "2 days ago", text: "Absolutely love this product! The quality exceeded my expectations and delivery was super fast." },
                                            { name: "Priya S.", time: "1 week ago", text: "Great value for money. The design is stunning and it works exactly as described." },
                                        ].map((r) => (
                                            <div key={r.name} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <span className="grid size-9 place-items-center rounded-full bg-linear-to-br from-sky-400 to-blue-600 text-xs font-extrabold text-white">
                                                            {r.name.charAt(0)}
                                                        </span>
                                                        <span className="font-bold text-slate-900">{r.name}</span>
                                                    </div>
                                                    <span className="text-xs text-slate-400">{r.time}</span>
                                                </div>
                                                <div className="my-2 flex text-amber-400">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <Star key={s} className="size-3 fill-current" />
                                                    ))}
                                                </div>
                                                <p className="text-slate-600">{r.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment strip */}
                        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-4 text-xs font-semibold text-slate-500 shadow-sm">
                            <CreditCard className="size-4 shrink-0 text-sky-500" />
                            Guaranteed safe checkout — Visa, Mastercard, PayPal & UPI accepted
                        </div>
                    </div>
                </div>

                {/* ============ Related Products ============ */}
                <section className="mt-24 border-t border-slate-100 pt-16">
                    <div className="mb-10 flex items-end justify-between">
                        <div>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-100 bg-sky-50 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-sky-600">
                                <Zap className="size-3.5" /> Handpicked
                            </span>
                            <h2 className="mt-3 text-3xl font-black text-slate-900">You Might Also Like</h2>
                            <p className="mt-2 text-slate-500">Handpicked recommendations just for you</p>
                        </div>
                        <Link href="/shop" className="hidden items-center gap-1 text-sm font-bold text-sky-600 hover:text-blue-700 sm:flex">
                            View All <ChevronRight className="size-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {related.map((p) => (
                            <ProductCard key={p.slug} product={p} view="grid" />
                        ))}
                    </div>
                </section>
            </main>

            {/* Mobile sticky bar */}
            <div className={`fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/90 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-lg transition-transform duration-300 lg:hidden ${isScrolled ? "translate-y-0" : "translate-y-full"}`}>
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs text-slate-500">Total Price</p>
                        <p className="text-xl font-black text-slate-900">${product.price * qty}</p>
                    </div>
                    <button
                        onClick={() => addToCart(product, qty)}
                        className="flex-1 cursor-pointer rounded-xl bg-linear-to-r from-sky-500 to-blue-600 py-3.5 font-bold text-white shadow-lg transition-transform active:scale-95"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
}
