import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Perks from "@/components/Perks";
import Testimonials from "../components/Testimonials";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-night-950 text-zinc-100">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Perks />
      <Testimonials />
      <PromoBanner />
      <Footer />
    </main>
  );
}