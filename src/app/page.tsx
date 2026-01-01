import Link from "next/link";
import { products } from "@/data/products";
import GopuramHeader from "@/components/GopuramHeader";
import AnimatedTempleDivider from "@/components/AnimatedTempleDivider";
import TempleCard from "@/components/TempleCard";
import FarmerStory from "@/components/FarmerStory";
import CategoryCircle from "@/components/CategoryCircle";
import IngredientSpotlight from "@/components/IngredientSpotlight";
import ProcessSteps from "@/components/ProcessSteps";
import OrganicBorder from "@/components/OrganicBorder";
// import Link from "next/link";

export default function Home() {
  return (
    <main>
      <GopuramHeader />

      {/* --- 1. SHOP BY RITUAL (Categories) --- */}
      <CategoryCircle />

      {/* --- 2. INGREDIENT SPOTLIGHT (Hero Story) --- */}
      <IngredientSpotlight />

      <section className="py-16 text-center" id="products">
        <h2 className="text-4xl font-serif text-templeGreen">
          Our Organic Treasures
        </h2>
        <AnimatedTempleDivider />
        <p className="text-[#4A3B32]/70 max-w-2xl mx-auto mt-4 px-6">
          Explore our curated selection of essentials, crafted with care and tradition.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 pb-20 max-w-7xl mx-auto">
        {products.map((product) => (
          <Link href={`/products/${product.slug}`} key={product.slug}>
            <TempleCard
              title={product.name}
              desc={product.description}
              image={product.image}
              price={product.price}
              id={product.slug}
            />
          </Link>
        ))}
      </section>

      {/* --- 3. THE VEDIC DIFFERENCE (Process) --- */}
      <ProcessSteps />

      <section className="px-6 py-12 max-w-7xl mx-auto">
        <OrganicBorder variant="glow" color="#2F4F3E">
          <FarmerStory />
        </OrganicBorder>
      </section>
    </main>
  );
}
