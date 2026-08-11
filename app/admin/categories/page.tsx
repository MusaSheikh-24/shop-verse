import { Boxes, Footprints, Gamepad2, Pencil, Plus, Shirt, Smartphone, Sparkles, Trash2, Watch } from "lucide-react";

const categories = [
    { name: "Electronics", items: "1,200+ items", icon: Smartphone, gradient: "from-sky-100 to-blue-100", color: "text-sky-600" },
    { name: "Fashion", items: "3,400+ items", icon: Shirt, gradient: "from-rose-100 to-pink-100", color: "text-rose-500" },
    { name: "Footwear", items: "860+ items", icon: Footprints, gradient: "from-violet-100 to-purple-100", color: "text-violet-600" },
    { name: "Watches", items: "420+ items", icon: Watch, gradient: "from-amber-100 to-orange-100", color: "text-amber-600" },
    { name: "Gaming", items: "640+ items", icon: Gamepad2, gradient: "from-emerald-100 to-teal-100", color: "text-emerald-600" },
    { name: "Beauty", items: "980+ items", icon: Sparkles, gradient: "from-fuchsia-100 to-pink-100", color: "text-fuchsia-600" },
];

export default function AdminCategoriesPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3.5 py-1.5 text-xs font-bold text-sky-600 shadow-sm">
                        <Boxes className="size-3.5" /> Structure
                    </span>
                    <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">Categories</h1>
                    <p className="mt-1 text-sm text-slate-500">Organize your catalog into {categories.length} categories.</p>
                </div>
                <button className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-200 transition hover:scale-105">
                    <Plus className="size-4" /> Add Category
                </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {categories.map((c) => {
                    const Icon = c.icon;
                    return (
                        <div key={c.name} className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-100/60 transition hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-sky-200/70">
                            <div className="flex items-start justify-between">
                                <span className={`grid size-14 place-items-center rounded-2xl bg-linear-to-br ${c.gradient} shadow-lg transition group-hover:scale-110`}>
                                    <Icon className={`size-7 ${c.color}`} strokeWidth={1.75} />
                                </span>
                                <div className="flex gap-2">
                                    <button aria-label={`Edit ${c.name}`} className="grid size-9 cursor-pointer place-items-center rounded-lg border border-slate-100 text-sky-600 transition hover:bg-sky-50">
                                        <Pencil className="size-4" />
                                    </button>
                                    <button aria-label={`Delete ${c.name}`} className="grid size-9 cursor-pointer place-items-center rounded-lg border border-rose-100 text-rose-500 transition hover:bg-rose-50">
                                        <Trash2 className="size-4" />
                                    </button>
                                </div>
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-slate-900">{c.name}</h3>
                            <p className="mt-1 text-sm text-slate-500">{c.items}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}