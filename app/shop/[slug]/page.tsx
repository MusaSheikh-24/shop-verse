"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft, BadgeCheck, Check, ChevronRight, Heart, Minus, Package, Plus,
    RefreshCw, RotateCw, ShieldCheck, ShoppingCart, Sparkles, Star, Truck, Zap,
    Share2, Info
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProduct, PRODUCTS } from "../data";
import ProductCard from "../components/ProductCard";

export default function ProductDetailPage() {
    const params = useParams();
    const rawSlug = params?.slug;
    const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug ?? "";

    const product = getProduct(slug);

    // State Management
    const [qty, setQty] = useState(1);
    const [wished, setWished] = useState(false);
    const [added, setAdded] = useState(false);
    const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");
    const [mainImage, setMainImage] = useState(product?.img || "");
    const [isScrolled, setIsScrolled] = useState(false);

    // Scroll listener for sticky mobile bar
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
                        <p className="bg-linear-to-r from-sky-400 to-blue-600 bg-clip-text text-9xl font-black text-transparent opacity-20 blur-sm absolute inset-0">404</p>
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

    // Mock additional images for gallery effect (using same image with different filters/crops conceptually)
    const galleryImages = [
        product.img,
        `${product.img}&sat=-100`, // B&W version mock
        `${product.img}&blur=2`,   // Blur mock
        `${product.img}&auto=format&fit=crop&w=800&q=80` // Original again
    ];

    const related = [
        ...PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug),
        ...PRODUCTS.filter((p) => p.category !== product.category && p.slug !== product.slug),
    ].slice(0, 4);

    const addToCart = () => {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const tabs = [
        { id: "desc" as const, label: "Description", icon: Info },
        { id: "specs" as const, label: "Specifications", icon: BadgeCheck },
        { id: "reviews" as const, label: "Reviews (128)", icon: Star },
    ];

    return (
        <>
            <Navbar />

            {/* Background Ambience */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-white">
                <div className="absolute left-[10%] top-[10%] size-150 rounded-full bg-sky-100/40 blur-[100px]" />
                <div className="absolute right-[5%] top-[20%] size-125 rounded-full bg-blue-100/40 blur-[100px]" />
                <div className="absolute bottom-[10%] left-[20%] size-100 rounded-full bg-indigo-100/30 blur-[80px]" />
            </div>

            <main className="relative z-10 mx-auto max-w-7xl px-4 pb-32 pt-28 sm:px-6 lg:px-8">

                {/* Breadcrumbs */}
                <nav className="mb-8 flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Link href="/" className="transition-colors hover:text-sky-600">Home</Link>
                    <ChevronRight className="size-3" />
                    <Link href="/shop" className="transition-colors hover:text-sky-600">Shop</Link>
                    <ChevronRight className="size-3" />
                    <span className="font-semibold text-slate-900">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

                    {/* LEFT COLUMN: Image Gallery (lg:col-span-7) */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24 space-y-4">
                            {/* Main Image Container */}
                            <div className="group relative aspect-square w-full overflow-hidden rounded-4xl border border-slate-100 bg-white shadow-2xl shadow-sky-100/50 transition-all duration-500 hover:shadow-sky-200/60">
                                <div className="absolute inset-0 bg-slate-50 animate-pulse" /> {/* Loading skeleton placeholder */}
                                <img
                                    src={mainImage}
                                    alt={product.name}
                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />

                                {/* Badges */}
                                <div className="absolute left-6 top-6 flex flex-col gap-2">
                                    <span className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-900 shadow-lg backdrop-blur-md">
                                        {product.tag}
                                    </span>
                                    <span className="rounded-full bg-rose-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-rose-200">
                                        -{product.discount}% OFF
                                    </span>
                                </div>

                                {/* Wishlist Floating Button */}
                                <button
                                    onClick={() => setWished(!wished)}
                                    className={`absolute right-6 top-6 grid size-12 place-items-center rounded-full bg-white/90 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 ${wished ? "text-rose-500" : "text-slate-400 hover:text-rose-400"}`}
                                >
                                    <Heart className={`size-6 ${wished ? "fill-current" : ""}`} />
                                </button>
                            </div>

                            {/* Thumbnail Strip */}
                            <div className="grid grid-cols-4 gap-4">
                                {galleryImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setMainImage(img)}
                                        className={`relative aspect-square overflow-hidden rounded-2xl border-2 transition-all duration-300 ${mainImage === img ? "border-sky-500 ring-2 ring-sky-200" : "border-transparent opacity-70 hover:opacity-100"}`}
                                    >
                                        <img src={img} alt={`View ${idx + 1}`} className="h-full w-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Product Details (lg:col-span-5) */}
                    <div className="flex flex-col lg:col-span-5">

                        {/* Header Info */}
                        <div className="mb-6">
                            <div className="mb-3 flex items-center gap-3">
                                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-600">
                                    {product.category}
                                </span>
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star className="size-4 fill-current" />
                                    <span className="text-sm font-bold text-slate-700">{product.rating}</span>
                                    <span className="text-xs text-slate-400">(128 reviews)</span>
                                </div>
                            </div>

                            <h1 className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                                {product.name}
                            </h1>

                            <p className="mt-4 text-lg leading-relaxed text-slate-600">
                                {product.desc} Experience premium quality craftsmanship designed for modern lifestyle.
                            </p>
                        </div>

                        {/* Price Section */}
                        <div className="mb-8 flex items-end gap-4 border-b border-slate-100 pb-8">
                            <span className="text-5xl font-black tracking-tight text-slate-900">${product.price}</span>
                            <div className="mb-2 flex flex-col">
                                <span className="text-lg font-medium text-slate-400 line-through">${product.old}</span>
                                <span className="text-xs font-bold text-emerald-600">Save ${product.old - product.price}</span>
                            </div>
                        </div>

                        {/* Actions Area */}
                        <div className="space-y-6">
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-6">
                                <span className="text-sm font-bold text-slate-900">Quantity:</span>
                                <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                                    <button
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                        className="grid size-10 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-50 hover:text-sky-600 active:bg-slate-100"
                                    >
                                        <Minus className="size-4" />
                                    </button>
                                    <span className="w-12 text-center font-bold text-slate-900">{qty}</span>
                                    <button
                                        onClick={() => setQty(Math.min(10, qty + 1))}
                                        className="grid size-10 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-50 hover:text-sky-600 active:bg-slate-100"
                                    >
                                        <Plus className="size-4" />
                                    </button>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <button
                                    onClick={addToCart}
                                    className={`group relative flex items-center justify-center gap-2 rounded-2xl px-8 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 ${added
                                        ? "bg-emerald-500 shadow-emerald-200"
                                        : "bg-slate-900 hover:bg-sky-600 hover:shadow-sky-200"
                                        }`}
                                >
                                    {added ? (
                                        <>
                                            <Check className="size-5 animate-bounce" /> Added to Cart
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="size-5 transition-transform group-hover:scale-110" /> Add to Cart
                                        </>
                                    )}
                                </button>

                                <button className="flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 transition-all hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600">
                                    <Share2 className="size-5" /> Share
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges Grid */}
                        <div className="mt-10 grid grid-cols-3 gap-4 rounded-3xl bg-slate-50 p-6">
                            {[
                                { icon: Truck, label: "Free Shipping", sub: "On orders over $50" },
                                { icon: ShieldCheck, label: "2 Year Warranty", sub: "Full coverage" },
                                { icon: RefreshCw, label: "30 Days Return", sub: "Money back guarantee" },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center text-center">
                                    <div className="mb-3 grid size-12 place-items-center rounded-full bg-white text-sky-600 shadow-sm">
                                        <item.icon className="size-6" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-900">{item.label}</span>
                                    <span className="text-[10px] text-slate-500">{item.sub}</span>
                                </div>
                            ))}
                        </div>

                        {/* Accordion / Tabs Section */}
                        <div className="mt-12">
                            <div className="flex gap-2 border-b border-slate-200">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`relative px-6 py-4 text-sm font-bold transition-colors ${activeTab === tab.id ? "text-sky-600" : "text-slate-500 hover:text-slate-800"
                                            }`}
                                    >
                                        {tab.label}
                                        {activeTab === tab.id && (
                                            <span className="absolute bottom-0 left-0 h-0.5 w-full bg-sky-600 transition-all duration-300" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="py-6 text-sm leading-relaxed text-slate-600">
                                {activeTab === "desc" && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <p>{product.desc}</p>
                                        <p>Premium materials ensure durability and style. Designed for those who appreciate quality in every detail.</p>
                                        <ul className="mt-4 space-y-2">
                                            {["High-quality build", "Ergonomic design", "Long-lasting performance", "Easy maintenance"].map((f) => (
                                                <li key={f} className="flex items-center gap-2">
                                                    <Check className="size-4 text-emerald-500" /> {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {activeTab === "specs" && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <table className="w-full text-left">
                                            <tbody className="divide-y divide-slate-100">
                                                {[
                                                    ["Category", product.category],
                                                    ["Brand", "Premium Store"],
                                                    ["Weight", "0.5 kg"],
                                                    ["Dimensions", "10 x 10 x 5 cm"],
                                                    ["Color", "Multiple"],
                                                    ["Warranty", "2 Years"]
                                                ].map(([key, val]) => (
                                                    <tr key={key}>
                                                        <td className="py-3 font-semibold text-slate-900">{key}</td>
                                                        <td className="py-3 text-slate-600">{val}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {activeTab === "reviews" && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <div className="mb-6 flex items-center gap-4 rounded-2xl bg-sky-50 p-4">
                                            <div className="text-center">
                                                <p className="text-3xl font-black text-slate-900">{product.rating}</p>
                                                <div className="flex text-amber-400"><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /></div>
                                            </div>
                                            <div className="h-10 w-px bg-sky-200" />
                                            <p className="text-sm text-slate-600">Based on 128 verified customer reviews. Highly recommended by 98% of buyers.</p>
                                        </div>
                                        {/* Mock Review Item */}
                                        <div className="space-y-4">
                                            {[1, 2].map((r) => (
                                                <div key={r} className="border-b border-slate-100 pb-4 last:border-0">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-bold text-slate-900">Alex M.</span>
                                                        <span className="text-xs text-slate-400">2 days ago</span>
                                                    </div>
                                                    <div className="my-1 flex text-amber-400"><Star className="size-3 fill-current" /><Star className="size-3 fill-current" /><Star className="size-3 fill-current" /><Star className="size-3 fill-current" /><Star className="size-3 fill-current" /></div>
                                                    <p className="text-slate-600">Absolutely love this product! The quality exceeded my expectations and delivery was super fast.</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                <section className="mt-24 border-t border-slate-100 pt-16">
                    <div className="mb-10 flex items-end justify-between">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900">You Might Also Like</h2>
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

            {/* Mobile Sticky Add-to-Cart Bar */}
            <div className={`fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/90 p-4 backdrop-blur-lg transition-transform duration-300 lg:hidden ${isScrolled ? "translate-y-0" : "translate-y-full"}`}>
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs text-slate-500">Total Price</p>
                        <p className="text-xl font-black text-slate-900">${product.price * qty}</p>
                    </div>
                    <button
                        onClick={addToCart}
                        className={`flex-1 rounded-xl py-3.5 font-bold text-white shadow-lg transition-colors ${added ? "bg-emerald-500" : "bg-sky-600"}`}
                    >
                        {added ? "Added!" : "Add to Cart"}
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
}