"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Eye, EyeOff, ShoppingBag } from "lucide-react";

export default function SignUpPage() {
    const [showPass, setShowPass] = useState(false);

    const input =
        "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/70 focus:bg-white/10";

    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-950">
            {/* Right side subtle glow */}
            <div className="pointer-events-none absolute -right-32 top-1/3 size-96 rounded-full bg-sky-500/10 blur-3xl" />

            {/* ===== LEFT — gradient panel ===== */}
            <div className="relative overflow-hidden bg-linear-to-br from-sky-500 via-blue-700 to-indigo-950 px-6 pb-24 pt-28 sm:px-12 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-[58%] lg:items-center lg:px-16 lg:py-8">
                {/* Decor */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-size-[56px_56px]" />
                    <div className="absolute -left-24 -top-24 size-96 rounded-full bg-sky-400/30 blur-3xl" />
                    <div className="absolute -bottom-32 right-0 size-96 rounded-full bg-indigo-500/30 blur-3xl" />
                </div>

                {/* Top row: logo + back */}
                <div className="absolute inset-x-6 top-6 flex items-center justify-between sm:inset-x-12 lg:inset-x-16">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="grid size-9 place-items-center rounded-lg bg-white/15 backdrop-blur">
                            <ShoppingBag className="size-4 text-white" />
                        </span>
                        <span className="text-lg font-extrabold text-white">
                            Shop<span className="text-sky-200">Verse</span>
                        </span>
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/20"
                    >
                        <ArrowLeft className="size-3.5" /> Back to website
                    </Link>
                </div>

                {/* Heading + paragraph */}
                <div className="relative max-w-xl">
                    <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">
                        Start Your Shopping Journey Today
                    </h1>
                    <p className="mt-6 leading-relaxed text-sky-100/90">
                        Create your free account and unlock exclusive deals, premium products
                        and fast delivery — everything you need, all in one place.
                    </p>
                </div>
            </div>

            {/* ===== CARD — ✅ FIXED spacing: back button cover nahi hota, proper centering ===== */}
            <div className="relative z-10 mx-auto -mt-12 w-full max-w-md px-4 pb-16 scrollbar-none lg:absolute lg:inset-y-0 lg:left-[58%] lg:mx-0 lg:flex lg:w-[440px] lg:-translate-x-10 lg:items-center lg:overflow-y-auto lg:px-0 lg:py-8 lg:pb-8">
                <div className="relative w-full">
                    {/* Glow behind card */}
                    <div className="absolute -inset-2 rounded-[2rem] bg-sky-500/20 blur-2xl" />

                    <div className="relative rounded-3xl border border-white/10 bg-slate-900/90 p-8 backdrop-blur-xl">
                        <p className="text-center text-[11px] font-bold uppercase tracking-[0.35em] text-sky-400">
                            Sign Up
                        </p>
                        <h2 className="mt-2 text-center text-2xl font-extrabold text-white">
                            Create new account
                        </h2>

                        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                            {/* Names */}
                            <div className="grid grid-cols-2 gap-3">
                                <input required placeholder="First name" className={input} />
                                <input required placeholder="Last name" className={input} />
                            </div>

                            <input type="email" required placeholder="E-mail address" className={input} />

                            {/* Password + eye toggle */}
                            <div className="relative">
                                <input
                                    type={showPass ? "text" : "password"}
                                    required
                                    placeholder="Password"
                                    className={`${input} pr-11`}
                                />
                                <button
                                    type="button"
                                    aria-label={showPass ? "Hide password" : "Show password"}
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500 transition hover:text-sky-400"
                                >
                                    {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                </button>
                            </div>

                            <input
                                type={showPass ? "text" : "password"}
                                required
                                placeholder="Repeat password"
                                className={input}
                            />

                            {/* Terms checkbox */}
                            <label className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-400">
                                <input type="checkbox" required className="mt-0.5 size-4 cursor-pointer accent-sky-500" />
                                <span>
                                    By signing up, you agree to our{" "}
                                    <a href="#" className="font-bold text-white hover:underline">Terms</a>,{" "}
                                    <a href="#" className="font-bold text-white hover:underline">Data Policy</a> and{" "}
                                    <a href="#" className="font-bold text-white hover:underline">Cookies Policy</a>.
                                </span>
                            </label>

                            {/* White pill button */}
                            <button
                                type="submit"
                                className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-extrabold text-slate-900 shadow-lg transition hover:scale-[1.02]"
                            >
                                Get Started
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </form>

                        <p className="mt-5 text-center text-xs text-slate-400">
                            Already have an account?{" "}
                            <Link href="/signin" className="font-bold text-sky-400 hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}