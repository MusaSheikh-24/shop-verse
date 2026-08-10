import { RotateCcw, Star } from "lucide-react";

interface Props {
    categories: { name: string; count: number }[];
    selectedCats: string[];
    toggleCat: (c: string) => void;
    price: { min: number; max: number };
    setPrice: (p: { min: number; max: number }) => void;
    maxPrice: number;
    minRating: number;
    setMinRating: (r: number) => void;
    tags: string[];
    selectedTags: string[];
    toggleTag: (t: string) => void;
    clearAll: () => void;
}

export default function FilterSidebar(props: Props) {
    return (
        <div className="space-y-6 rounded-3xl border-2 border-sky-100 bg-white p-6 shadow-[0_15px_40px_-12px_rgba(2,132,199,0.25)]">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900">Filters</h3>
                <button onClick={props.clearAll} className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 transition hover:text-blue-700">
                    <RotateCcw className="size-3.5" /> Clear All
                </button>
            </div>

            {/* Categories */}
            <div>
                <h4 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-slate-900">Categories</h4>
                <ul className="space-y-2">
                    {props.categories.map((c) => (
                        <li key={c.name}>
                            <label className="flex cursor-pointer items-center justify-between text-sm text-slate-600 transition hover:text-sky-600">
                                <span className="flex items-center gap-2.5">
                                    <input
                                        type="checkbox"
                                        checked={props.selectedCats.includes(c.name)}
                                        onChange={() => props.toggleCat(c.name)}
                                        className="size-4 rounded accent-sky-500"
                                    />
                                    {c.name}
                                </span>
                                <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-600">{c.count}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Price range */}
            <div>
                <h4 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-slate-900">Price Range</h4>
                <input
                    type="range"
                    min={0}
                    max={props.maxPrice}
                    step={10}
                    value={props.price.max}
                    onChange={(e) => props.setPrice({ ...props.price, max: +e.target.value })}
                    className="w-full accent-sky-500"
                />
                <div className="mt-2 flex items-center gap-2">
                    <input
                        type="number"
                        min={0}
                        value={props.price.min}
                        onChange={(e) => props.setPrice({ ...props.price, min: +e.target.value })}
                        className="w-full rounded-lg border border-sky-200 bg-white px-2 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-sky-400"
                    />
                    <span className="text-slate-400">—</span>
                    <input
                        type="number"
                        max={props.maxPrice}
                        value={props.price.max}
                        onChange={(e) => props.setPrice({ ...props.price, max: +e.target.value })}
                        className="w-full rounded-lg border border-sky-200 bg-white px-2 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-sky-400"
                    />
                </div>
            </div>

            {/* Rating */}
            <div>
                <h4 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-slate-900">Rating</h4>
                <div className="space-y-2">
                    {[4.5, 4, 3, 0].map((r) => (
                        <button
                            key={r}
                            onClick={() => props.setMinRating(r)}
                            className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${props.minRating === r ? "bg-linear-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-200" : "text-slate-600 hover:bg-sky-50"
                                }`}
                        >
                            {r === 0 ? (
                                "All Ratings"
                            ) : (
                                <>
                                    <Star className="size-4 fill-amber-400 text-amber-400" /> {r}★ & up
                                </>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tags */}
            <div>
                <h4 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-slate-900">Deals</h4>
                <div className="flex flex-wrap gap-2">
                    {props.tags.map((t) => (
                        <button
                            key={t}
                            onClick={() => props.toggleTag(t)}
                            className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${props.selectedTags.includes(t)
                                    ? "bg-linear-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-200"
                                    : "border border-sky-200 bg-white text-slate-600 hover:border-sky-400 hover:text-sky-600"
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}