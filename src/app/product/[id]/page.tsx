import Image from "next/image";
import Link from "next/link";
import { getProductById, getProducts } from "@/lib/products";
import { getCategoryBySlug } from "@/lib/categories";
import { GENDER_LABELS } from "@/lib/types";
import { notFound } from "next/navigation";
import ProductActions from "@/components/ProductActions";

export function generateStaticParams() {
  return getProducts().map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  return { title: product?.name ?? "Ürün" };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return notFound();

  const category = getCategoryBySlug(product.category);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/products" className="hover:text-[#ff6b6b]">
          Ürünler
        </Link>
        {category && (
          <>
            {" / "}
            <Link
              href={`/shop/${category.slug}`}
              className="hover:text-[#ff6b6b]"
            >
              {category.name}
            </Link>
          </>
        )}
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square bg-[#eaf6f8] rounded-xl relative overflow-hidden">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              Görsel yok
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#1f3a5f]">{product.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <span className="bg-[#eaf6f8] text-[#2cc5d2] px-2 py-0.5 rounded-full">
              {GENDER_LABELS[product.gender]}
            </span>
            {product.stock > 0 ? (
              <span className="text-green-600">Stokta var</span>
            ) : (
              <span className="text-red-500">Stokta yok</span>
            )}
          </div>
          <p className="mt-4 text-gray-600 leading-relaxed">
            {product.description}
          </p>
          <div className="mt-6 text-2xl font-bold text-[#ff6b6b]">
            {product.price} ₺
          </div>
          <ProductActions product={product} />
        </div>
      </div>
    </div>
  );
}
