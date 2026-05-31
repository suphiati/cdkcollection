"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/lib/products";
import { getCategoryBySlug } from "@/lib/categories";
import { useCart } from "@/components/CartContext";
import { Product, GENDER_LABELS } from "@/lib/types";
import { notFound } from "next/navigation";

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
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
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
}

function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const hasSizes = product.sizes && product.sizes.length > 0;
  const [size, setSize] = useState<string>("");
  const [added, setAdded] = useState(false);

  const disabled = product.stock <= 0 || (hasSizes && !size);

  function handleAdd() {
    add(product, 1, hasSizes ? size : undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="mt-8">
      {hasSizes && (
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">
            Beden / Yaş seçin
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`px-4 py-2 rounded-full border text-sm transition ${
                  size === s
                    ? "bg-[#1f3a5f] text-white border-[#1f3a5f]"
                    : "border-gray-300 hover:border-[#2cc5d2]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={handleAdd}
        disabled={disabled}
        className="bg-[#ff6b6b] text-white px-6 py-3 rounded-full font-medium hover:bg-[#ec5454] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {product.stock <= 0
          ? "Stokta Yok"
          : added
            ? "Sepete Eklendi ✓"
            : "Sepete Ekle"}
      </button>
      {hasSizes && !size && product.stock > 0 && (
        <p className="mt-2 text-sm text-gray-400">Lütfen bir beden seçin.</p>
      )}
    </div>
  );
}
