"use client";

import { useEffect, useRef, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    Play,
    Sparkles,
} from "lucide-react";

const miniCategories = [
    { name: "Headphones", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop" },
    { name: "Laptops", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=300&auto=format&fit=crop" },
    { name: "Smart Watches", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300&auto=format&fit=crop" },
    { name: "Smart Phones", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=300&auto=format&fit=crop" },
    { name: "Accessories", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=300&auto=format&fit=crop" },
    { name: "Cameras", img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=300&auto=format&fit=crop" },
    { name: "Keyboards", img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=300&auto=format&fit=crop" },
    { name: "Backpacks", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=300&auto=format&fit=crop" },
];

const brands = ["Nike", "Adidas", "Apple", "Sony", "Zara", "Samsung", "Puma", "Canon"];

export default function Hero() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [slide, setSlide] = useState(0);
    const [paused, setPaused] = useState(false);
    const totalDots = 5;

    const stepWidth = () => {
        const el = trackRef.current;
        if (!el) return 0;
        const card = el.firstElementChild as HTMLElement | null;
        return card ? card.offsetWidth + 16 : el.clientWidth / 2;
    };

    const scrollByDir = (dir: number) => {
        const el = trackRef.current;
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        if (dir === 1 && el.scrollLeft >= max - 10) el.scrollTo({ left: 0, behavior: "smooth" });
        else if (dir === -1 && el.scrollLeft <= 10) el.scrollTo({ left: max, behavior: "smooth" });
        else el.scrollBy({ left: dir * stepWidth(), behavior: "smooth" });
    };

    const goTo = (i: number) => {
        const el = trackRef.current;
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        el.scrollTo({ left: (i / (totalDots - 1)) * max, behavior: "smooth" });
    };

    const onScroll = () => {
        const el = trackRef.current;
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        setSlide(max > 0 ? Math.round((el.scrollLeft / max) * (totalDots - 1)) : 0);
    };

    /* 🎠 AUTO-PLAY: har 3 sec advance, end par wapis start se */
    useEffect(() => {
        if (paused) return;
        const id = setInterval(() => {
            const el = trackRef.current;
            if (!el) return;
            const max = el.scrollWidth - el.clientWidth;
            if (el.scrollLeft >= max - 10) el.scrollTo({ left: 0, behavior: "smooth" });
            else el.scrollBy({ left: stepWidth(), behavior: "smooth" });
        }, 3000);
        return () => clearInterval(id);
    }, [paused]);

    return (
        <section className="relative overflow-hidden bg-linear-to-b from-sky-50 via-white to-white px-4 pb-16 pt-28">
            {/* Background glows + grid */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-32 -top-32 size-125 animate-pulse rounded-full bg-sky-200/50 blur-3xl" />
                <div className="absolute -right-32 top-40 size-125 animate-pulse rounded-full bg-blue-200/50 blur-3xl" style={{ animationDelay: "1s" }} />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(14_165_233/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(14_165_233/0.05)_1px,transparent_1px)] bg-size-[56px_56px]" />
            </div>

            <div className="relative mx-auto max-w-7xl">
                {/* ===== Hero Card ===== */}
                <div className="relative rounded-[2.5rem] border-2 border-sky-100 bg-linear-to-br from-white via-sky-50 to-blue-100/80 px-5 pb-12 pt-10 shadow-[0_30px_80px_-20px_rgba(2,132,199,0.4)] sm:px-8 sm:pb-14 sm:pt-12 lg:px-14">
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.5rem]">
                        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-sky-200/60 blur-3xl" />
                        <div className="absolute -bottom-24 left-1/4 size-72 rounded-full bg-cyan-100/60 blur-3xl" />
                    </div>

                    <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
                        {/* Left */}
                        <div>
                            {/* ✨ IMPROVED — tighter badge copy */}
                            <span className="inline-flex animate-[fade-up_0.6s_ease-out_both] items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-1.5 text-xs font-semibold text-slate-600 shadow-lg shadow-sky-100 backdrop-blur">
                                <Sparkles className="size-4 text-sky-500" />
                                Welcome to ShopVerse — Your Tech Paradise
                            </span>

                            <h1 className="mt-6 animate-[fade-up_0.7s_ease-out_both] text-[2rem] font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl" style={{ animationDelay: "0.1s" }}>
                                Discover the Future of{" "}
                                <span className="bg-linear-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Online Shopping</span>
                            </h1>

                            {/* ✨ IMPROVED — repeated "Discover" hataya */}
                            <p className="mt-5 max-w-md animate-[fade-up_0.7s_ease-out_both] text-lg text-slate-600" style={{ animationDelay: "0.2s" }}>
                                Trending products, unbeatable deals and premium brands — find the perfect gadget for every need!
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-5 animate-[fade-up_0.7s_ease-out_both]" style={{ animationDelay: "0.3s" }}>
                                <a
                                    href="#products"
                                    className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-blue-600 px-7 py-3.5 font-semibold text-white shadow-[0_15px_35px_-10px_rgba(2,132,199,0.7)] transition-all hover:scale-105 hover:shadow-[0_20px_45px_-10px_rgba(2,132,199,0.8)]"
                                >
                                    Shop Now
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </a>

                                {/* ✨ IMPROVED — ab proper secondary button hai */}
                                <button
                                    type="button"
                                    /* TODO: yahan video modal open karein */
                                    className="group inline-flex items-center gap-3 rounded-full border-2 border-sky-200 bg-white/90 py-2.5 pl-2.5 pr-6 font-semibold text-slate-700 shadow-lg shadow-sky-100 backdrop-blur transition hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-600"
                                >
                                    <span className="grid size-9 place-items-center rounded-full bg-linear-to-r from-sky-500 to-blue-600 shadow-md shadow-sky-200 transition group-hover:scale-110">
                                        <Play className="size-3.5 fill-white text-white" />
                                    </span>
                                    Watch video
                                </button>
                            </div>
                        </div>

                        {/* Right — main image */}
                        <div className="relative mx-auto w-fit animate-[fade-up_0.8s_ease-out_both] lg:-translate-y-10" style={{ animationDelay: "0.25s" }}>
                            <div className="absolute -inset-6 animate-pulse rounded-full bg-linear-to-br from-sky-300/70 to-blue-300/70 blur-3xl sm:-inset-8" />
                            <div className="relative animate-float">
                                <img
                                    src="https://images.unsplash.com/photo-1548611716-f156c633d514?w=500&auto=format&fit=crop&q=60"
                                    alt="Glide Laptop Air"
                                    className="size-56 rounded-[2rem] object-cover shadow-[0_35px_70px_-15px_rgba(2,132,199,0.55)] ring-8 ring-white/80 sm:size-72 sm:rounded-[2.5rem] md:size-96"
                                />
                            </div>
                            <div className="absolute -left-2 top-6 animate-float-slow rounded-2xl border border-sky-100 bg-white/90 px-3 py-2.5 shadow-[0_15px_35px_-10px_rgba(2,132,199,0.4)] backdrop-blur sm:-left-8 sm:top-8 sm:px-4 sm:py-3">
                                <p className="text-xs text-slate-500">Glide Laptop Air</p>
                                <p className="bg-linear-to-r from-sky-600 to-blue-600 bg-clip-text font-extrabold text-transparent">$1,299.00</p>
                            </div>
                            <div className="absolute -right-2 bottom-8 animate-float rounded-2xl border border-sky-100 bg-white/90 px-3 py-2.5 shadow-[0_15px_35px_-10px_rgba(2,132,199,0.4)] backdrop-blur sm:-right-4 sm:px-4 sm:py-3">
                                <p className="flex items-center gap-1 text-sm font-semibold text-emerald-500">
                                    <BadgeCheck className="size-4" /> In Stock
                                </p>
                                <p className="text-xs text-slate-500">Free Delivery</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== AUTO-PLAY Carousel ===== */}
                <div
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onTouchStart={() => setPaused(true)}
                    onTouchEnd={() => setPaused(false)}
                >
                    <div
                        ref={trackRef}
                        onScroll={onScroll}
                        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-none [&::-webkit-scrollbar]:hidden"
                    >
                        {miniCategories.map((c, i) => (
                            <a
                                key={c.name}
                                href="#products"
                                style={{ animationDelay: `${0.45 + i * 0.08}s` }}
                                className="group relative flex min-w-[70%] animate-[fade-up_0.7s_ease-out_both] snap-start items-center gap-3 rounded-2xl border-2 border-sky-100 bg-white p-4 shadow-[0_15px_40px_-12px_rgba(2,132,199,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-[0_25px_60px_-15px_rgba(2,132,199,0.5)] sm:min-w-[45%] lg:min-w-[calc(20%-0.8rem)]"
                            >
                                <ArrowUpRight className="absolute right-3 top-3 size-4 text-slate-300 transition group-hover:text-sky-500" />
                                <img src={c.img} alt={c.name} loading="lazy" className="size-14 rounded-xl object-cover shadow-md shadow-sky-100 transition-transform duration-300 group-hover:scale-110" />
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900">{c.name}</h3>
                                    <p className="mt-0.5 text-xs font-medium text-sky-600">View More →</p>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="mt-4 flex items-center justify-between">
                        <button
                            onClick={() => scrollByDir(-1)}
                            aria-label="Previous"
                            className="grid size-11 place-items-center rounded-full border-2 border-sky-200 bg-white text-slate-600 shadow-[0_10px_25px_-8px_rgba(2,132,199,0.4)] transition hover:-translate-x-0.5 hover:text-sky-600"
                        >
                            <ArrowLeft className="size-4" />
                        </button>
                        <div className="flex items-center gap-2">
                            {[...Array(totalDots)].map((_, i) => (
                                <button
                                    key={i}
                                    aria-label={`Slide ${i + 1}`}
                                    onClick={() => goTo(i)}
                                    className={`h-2 rounded-full transition-all duration-300 ${i === slide
                                            ? "w-7 bg-linear-to-r from-sky-500 to-blue-600 shadow-md shadow-sky-200"
                                            : "w-2 bg-slate-300 hover:bg-sky-300"
                                        }`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={() => scrollByDir(1)}
                            aria-label="Next"
                            className="grid size-11 place-items-center rounded-full bg-linear-to-r from-sky-500 to-blue-600 text-white shadow-[0_10px_25px_-8px_rgba(2,132,199,0.6)] transition hover:translate-x-0.5 hover:brightness-110"
                        >
                            <ArrowRight className="size-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== Brands marquee — ✨ IMPROVED contrast ===== */}
            <div className="relative mt-14">
                <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
                    Trusted by the world's top brands
                </p>
                <div className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                    <div className="flex w-max animate-marquee gap-16 text-base font-extrabold uppercase tracking-[0.2em] text-slate-500">
                        {[...brands, ...brands].map((b, i) => (
                            <span key={i} className="cursor-default transition hover:scale-110 hover:text-sky-600">
                                {b}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}