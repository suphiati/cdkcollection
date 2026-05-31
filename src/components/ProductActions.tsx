"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { useCart } from "./CartContext";

// Interactive part of the product detail page (size selection + add to cart).
// Kept as a separate client component so the page itself can stay a server
// component and safely read server-only data (fs-backed product store).
export default function ProductActions({ product }: { product: Product }) {
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
