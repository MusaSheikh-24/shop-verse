"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, Copy, Sparkles, Timer } from "lucide-react";

const CODE = "SHOP50";
const pad = (n: number) => n.toString().padStart(2, "0");

export default function PromoBanner() {
    const [copied, setCopied] = useState(false);
    const [time, setTime] = useState({ h: 23, m: 59, s: 59 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => {
                // ⏳ Zero hone par countdown reset
                if (prev.h === 0 && prev.m === 0 && prev.s === 0) return { h: 23, m: 59, s: 59 };
                let { h, m, s } = prev;
                if (s > 0) s -= 1;
                else {
                    s = 59;
                    if (m > 0) m -= 1;
                    else {
                        m = 59;
                        if (h > 0) h -= 1;
                    }
                }
                return { h, m, s };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(CODE);
        } catch {
            // ✅ Fallback agar clipboard API fail ho
            const ta = document.createElement("textarea");
            ta.value = CODE;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const blocks = [
        { value: pad(time.h), label: "Hours" },
        { value: pad(time.m), label: "Minutes" },
        { value: pad(time.s), label: "Seconds" },
    ];

    return (
        <section id="deals" className="mx-auto max-w-7xl px-4 py-16">
            <div className="relative">
                {/* Outer glow */}
                <div className="absolute -inset-2 rounded-[3rem] bg-linear-to-r from-sky-400/60 via-blue-500/60 to-indigo-500/60 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-r from-sky-500 via-blue-600 to-indigo-600 px-6 py-14 text-center text-white shadow-2xl shadow-sky-200 sm:px-12">
                    {/* Decor + animated shapes */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -left-20 -top-20 size-64 rounded-full bg-white/10 blur-2xl" />
                        <div className="absolute -bottom-24 -right-16 size-72 rounded-full bg-cyan-300/20 blur-2xl" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-size-[44px_44px]" />
                        <div className="absolute left-1/4 top-8 size-10 animate-bounce rounded-full border-2 border-white/20" />
                        <div className="absolute bottom-10 left-10 size-6 animate-pulse rounded-full bg-white/10" />
                        <div className="absolute right-1/3 top-1/2 size-4 animate-pulse rounded-full bg-cyan-300/30" style={{ animationDelay: "1s" }} />
                        <Sparkles className="absolute left-8 top-8 size-5 animate-pulse text-white/40" />
                        <Sparkles className="absolute bottom-8 right-1/2 size-4 animate-pulse text-white/30" style={{ animationDelay: "1s" }} />
                    </div>

                    {/* 🎁 Floating products */}
                    <div className="absolute -left-4 top-10 hidden -rotate-6 animate-float overflow-hidden rounded-2xl border-2 border-white/30 shadow-2xl lg:block">
                        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop" alt="Headphones" className="size-24 object-cover" />
                    </div>
                    <div className="absolute -right-4 bottom-10 hidden rotate-6 animate-float-slow overflow-hidden rounded-2xl border-2 border-white/30 shadow-2xl lg:block">
                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300&auto=format&fit=crop" alt="Watch" className="size-24 object-cover" />
                    </div>

                    {/* 🏷️ Discount stickers */}
                    <div className="absolute right-8 top-6 grid size-24 rotate-12 place-items-center rounded-full bg-amber-400 shadow-xl shadow-amber-500/40">
                        <div className="grid size-20 place-items-center rounded-full border-2 border-dashed border-amber-700/40">
                            <p className="text-sm font-black leading-tight text-amber-900">50%<br />OFF</p>
                        </div>
                    </div>
                    <div className="absolute bottom-8 left-8 grid size-16 -rotate-12 place-items-center rounded-full bg-white/15 backdrop-blur">
                        <p className="text-[10px] font-black uppercase tracking-wider">Mega<br />Sale</p>
                    </div>

                    <div className="relative">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
                            <Timer className="size-4 text-amber-300" /> Limited Time Offer
                        </span>
                        <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-black sm:text-5xl">
                            Get <span className="text-amber-300">50% Off</span> Your First Order
                        </h2>
                        {/* ✅ English copy */}
                        <p className="mx-auto mt-4 max-w-xl text-sky-100">
                            Use this code at checkout for an instant discount. Offer ends soon — hurry!
                        </p>

                        {/* Code + copy */}
                        <button
                            onClick={copyCode}
                            className="group mt-8 inline-flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-dashed border-white/40 bg-white/10 px-6 py-3.5 backdrop-blur transition hover:bg-white/15"
                        >
                            <span className="text-lg font-extrabold tracking-[0.3em]">{CODE}</span>
                            {copied ? (
                                <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-300">
                                    <Check className="size-4" /> Copied!
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 text-sm font-semibold text-sky-100 group-hover:text-white">
                                    <Copy className="size-4" /> Copy
                                </span>
                            )}
                        </button>

                        {/* Countdown */}
                        <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4">
                            {blocks.map((b) => (
                                <div key={b.label} className="w-20 rounded-2xl border border-white/20 bg-white/10 py-3 backdrop-blur transition hover:bg-white/15">
                                    <p className="text-2xl font-extrabold tabular-nums">{b.value}</p>
                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-100">{b.label}</p>
                                </div>
                            ))}
                        </div>

                        <a
                            href="#products"
                            className="group mt-10 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white px-8 py-3.5 font-semibold text-blue-700 shadow-lg shadow-blue-900/20 transition hover:scale-105"
                        >
                            Shop Now <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}