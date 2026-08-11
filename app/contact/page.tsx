"use client";

import { useState, type FormEvent } from "react";
import {
    CheckCircle2,
    Loader2,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    Send,
    Tag,
    User,
    type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type InfoLine = { text: string; href?: string };

const contactInfo: { icon: LucideIcon; title: string; lines: InfoLine[] }[] = [
    {
        icon: Mail,
        title: "Email Us",
        lines: [
            { text: "support@shopverse.com", href: "mailto:support@shopverse.com" },
            { text: "We reply within 24 hours" },
        ],
    },
    {
        icon: Phone,
        title: "Phone (Landline)",
        lines: [
            { text: "+1 (555) 123-4567", href: "tel:+15551234567" },
            { text: "Mon–Sat, 9am to 8pm" },
        ],
    },
    {
        icon: MapPin,
        title: "Our Office Location",
        lines: [{ text: "123 Market Street" }, { text: "New York, NY, USA" }],
    },
];

const inputIcon = "pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-sky-500";
const inputClass =
    "w-full rounded-xl border-2 border-sky-100 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(14,165,233,0.1)]";

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (status !== "idle") return;
        const form = e.currentTarget;
        setStatus("sending");
        setTimeout(() => {
            form.reset();
            setStatus("sent");
            setTimeout(() => setStatus("idle"), 3000);
        }, 900);
    };

    return (
        <>
            <Navbar />
            <section className="relative bg-linear-to-b from-sky-50 via-white to-white pb-20 pt-28">
                {/* Glows */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -left-32 -top-32 size-125 rounded-full bg-sky-200/50 blur-3xl" />
                    <div className="absolute -right-32 top-40 size-125 rounded-full bg-blue-200/50 blur-3xl" />
                    <div className="absolute bottom-0 left-1/3 size-125 rounded-full bg-cyan-100/60 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-5xl px-4">
                    {/* ===== Header ===== */}
                    <div className="text-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-2 text-xs font-extrabold uppercase tracking-[0.3em] text-sky-600 shadow-lg shadow-sky-100">
                            <Send className="size-3.5" /> Get In Touch
                        </span>
                        <h1 className="mx-auto mt-6 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                            Contact{" "}
                            <span className="bg-linear-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Us</span>
                        </h1>
                        <p className="mx-auto mt-4 max-w-xl text-slate-600">
                            Any questions or remarks? Just write us a message!
                        </p>
                    </div>

                    {/* ===== Form (top, like reference) ===== */}
                    <div className="relative mt-12">
                        <div className="absolute -inset-3 rounded-[2.5rem] bg-linear-to-br from-sky-200/50 to-blue-200/50 blur-2xl" />
                        <form
                            onSubmit={handleSubmit}
                            className="relative rounded-[2rem] border-2 border-sky-100 bg-white p-6 shadow-[0_30px_80px_-20px_rgba(2,132,199,0.35)] sm:p-10"
                        >
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="mb-1.5 block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                                        Name
                                    </label>
                                    <div className="relative">
                                        <User className={inputIcon} />
                                        <input id="name" required placeholder="Enter your Name" className={inputClass} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="mb-1.5 block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className={inputIcon} />
                                        <input id="email" type="email" required placeholder="Enter a valid email address" className={inputClass} />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5">
                                <label htmlFor="subject" className="mb-1.5 block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                                    Subject
                                </label>
                                <div className="relative">
                                    <Tag className={inputIcon} />
                                    <input id="subject" required placeholder="How can we help?" className={inputClass} />
                                </div>
                            </div>

                            <div className="mt-5">
                                <label htmlFor="message" className="mb-1.5 block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                                    Message
                                </label>
                                <div className="relative">
                                    <MessageSquare className="pointer-events-none absolute left-4 top-4 size-4 text-sky-500" />
                                    <textarea
                                        id="message"
                                        required
                                        rows={5}
                                        placeholder="Write your message here..."
                                        className={`${inputClass} resize-none`}
                                    />
                                </div>
                            </div>

                            {/* ✅ Full-width SUBMIT — reference style */}
                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className={`mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-8 py-4 text-sm font-extrabold uppercase tracking-widest text-white shadow-xl transition active:scale-[0.98] ${status === "sent"
                                        ? "bg-linear-to-r from-emerald-500 to-green-600 shadow-emerald-200"
                                        : "bg-linear-to-r from-sky-500 to-blue-600 shadow-sky-300 hover:scale-[1.01] hover:brightness-110"
                                    }`}
                            >
                                {status === "sending" ? (
                                    <>
                                        <Loader2 className="size-5 animate-spin" /> Sending…
                                    </>
                                ) : status === "sent" ? (
                                    <>
                                        <CheckCircle2 className="size-5" /> Message Sent!
                                    </>
                                ) : (
                                    <>
                                        <Send className="size-4" /> Submit
                                    </>
                                )}
                            </button>
                            <p className="mt-3 text-center text-xs text-slate-500">
                                We usually reply within 24 hours — no waiting, no hassle. ⚡
                            </p>
                        </form>
                    </div>

                    {/* ===== Info trio — circular icons (reference layout) ===== */}
                    <div className="mt-16 rounded-[2rem] bg-linear-to-r from-sky-100/70 via-white to-blue-100/70 px-6 py-12 sm:px-10">
                        <div className="grid gap-10 sm:grid-cols-3">
                            {contactInfo.map((c) => (
                                <div key={c.title} className="group text-center">
                                    <span className="mx-auto grid size-16 place-items-center rounded-full bg-linear-to-br from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-200 ring-4 ring-white transition duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                                        <c.icon className="size-7" />
                                    </span>
                                    <h3 className="mt-5 text-sm font-extrabold uppercase tracking-wider text-slate-900">{c.title}</h3>
                                    <div className="mt-2 space-y-1">
                                        {c.lines.map((l) =>
                                            l.href ? (
                                                <a
                                                    key={l.text}
                                                    href={l.href}
                                                    className="block cursor-pointer text-sm font-semibold text-sky-600 transition hover:text-blue-700"
                                                >
                                                    {l.text}
                                                </a>
                                            ) : (
                                                <p key={l.text} className="text-sm text-slate-500">
                                                    {l.text}
                                                </p>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}