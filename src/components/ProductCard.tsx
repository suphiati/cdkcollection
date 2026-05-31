"use client";

import Link from "next/link";
import Image from "next/image";
import { Product, GENDER_LABELS } from "@/lib/types";
import { useCart } from "./CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const image = product.images?.[0];

  return (
    <div className="group rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition flex flex-col">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square bg-[#eaf6f8] relative">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
              Görsel yok
            </div>
          )}
          {product.gender && product.gender !== "unisex" && (
            <span className="absolute top-2 left-2 bg-white/90 text-[#1f3a5f] text-xs px-2 py-0.5 rounded-full">
              {GENDER_LABELS[product.gender]}
            </span>
          )}
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-[#1f3a5f] line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-[#ff6b6b]">{product.price} ₺</span>
          <button
            onClick={() => add(product, 1)}
            className="bg-[#ff6b6b] text-white text-sm px-3 py-1.5 rounded-full hover:bg-[#ec5454] transition"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
}
