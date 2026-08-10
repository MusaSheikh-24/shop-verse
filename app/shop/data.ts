export interface Product {
    slug: string;
    name: string;
    category: string;
    price: number;
    old: number;
    rating: number;
    tag: string;
    discount: number;
    desc: string;
    img: string;
}

export const PRODUCTS: Product[] = [
    { slug: "aero-sneaker-x", name: "Aero Sneaker X", category: "Footwear", price: 129, old: 199, rating: 4.9, tag: "Hot", discount: 35, desc: "Lightweight performance sneakers with responsive cushioning.", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" },
    { slug: "pulse-headphones", name: "Pulse Headphones", category: "Audio", price: 89, old: 149, rating: 4.8, tag: "New", discount: 40, desc: "Over-ear ANC headphones with 40-hour battery life.", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop" },
    { slug: "nova-smart-watch", name: "Nova Smart Watch", category: "Wearables", price: 199, old: 299, rating: 4.7, tag: "Sale", discount: 33, desc: "AMOLED display, health tracking aur 7-day battery.", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop" },
    { slug: "urban-backpack", name: "Urban Backpack", category: "Accessories", price: 59, old: 89, rating: 4.6, tag: "Sale", discount: 34, desc: "Water-resistant 25L backpack with laptop sleeve.", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop" },
    { slug: "vision-sunglasses", name: "Vision Sunglasses", category: "Fashion", price: 75, old: 120, rating: 4.5, tag: "Hot", discount: 38, desc: "Polarized UV400 lenses in a classic frame.", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop" },
    { slug: "titan-phone-12", name: "Titan Phone 12", category: "Electronics", price: 999, old: 1199, rating: 4.9, tag: "Pro", discount: 17, desc: "6.7-inch OLED display with pro-grade camera.", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop" },
    { slug: "glide-laptop-air", name: "Glide Laptop Air", category: "Computers", price: 1299, old: 1499, rating: 4.8, tag: "New", discount: 13, desc: "Ultra-slim 14-inch laptop with all-day battery.", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop" },
    { slug: "glow-skincare-set", name: "Glow Skincare Set", category: "Beauty", price: 45, old: 70, rating: 4.6, tag: "Sale", discount: 36, desc: "5-piece hydrating skincare routine for glow.", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop" },
    { slug: "aura-camera-s", name: "Aura Camera S", category: "Cameras", price: 649, old: 799, rating: 4.7, tag: "New", discount: 19, desc: "24MP mirrorless camera with 4K video.", img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=800&auto=format&fit=crop" },
    { slug: "mech-keyboard-rgb", name: "Mech Keyboard RGB", category: "Computers", price: 119, old: 159, rating: 4.6, tag: "Hot", discount: 25, desc: "Hot-swappable mechanical keyboard with RGB.", img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop" },
    { slug: "swift-mouse-pro", name: "Swift Mouse Pro", category: "Computers", price: 49, old: 79, rating: 4.5, tag: "Sale", discount: 38, desc: "Ergonomic wireless mouse with 8K DPI.", img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop" },
    { slug: "buds-air-pro", name: "Buds Air Pro", category: "Audio", price: 129, old: 179, rating: 4.8, tag: "Hot", discount: 28, desc: "True wireless earbuds with active noise cancellation.", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop" },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);