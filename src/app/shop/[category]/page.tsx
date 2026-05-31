import { getProductsByCategory } from "@/lib/products";
import { getCategoryBySlug, getCategories } from "@/lib/categories";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  return { title: cat?.name ?? "Kategori" };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return notFound();
  const products = getProductsByCategory(category);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1f3a5f] mb-2">{cat.name}</h1>
      <p className="text-gray-500 mb-8">{cat.description}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="text-gray-400">Bu kategoride henüz ürün yok.</p>
      )}
    </div>
  );
}
