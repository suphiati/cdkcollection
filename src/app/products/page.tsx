import { getProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Tüm Ürünler",
};

export default function ProductsPage() {
  const products = getProducts();
  const categories = getCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1f3a5f] mb-8">Tüm Ürünler</h1>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => (
          <a
            key={c.slug}
            href={`/shop/${c.slug}`}
            className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:border-[#2cc5d2] hover:text-[#ff6b6b] transition"
          >
            {c.name}
          </a>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
