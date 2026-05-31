"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { lineKey } from "@/lib/cart";

export default function CartPage() {
  const { items, remove, setQty, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Sepetiniz boş.</p>
        <Link
          href="/products"
          className="inline-block mt-6 bg-[#ff6b6b] text-white px-6 py-3 rounded-full hover:bg-[#ec5454] transition"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1f3a5f] mb-8">Sepetim</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={lineKey(item.product.id, item.size)}
            className="flex items-center gap-4 border border-gray-200 rounded-xl p-4"
          >
            <div className="w-20 h-20 bg-[#eaf6f8] rounded-lg relative overflow-hidden flex-shrink-0">
              {item.product.images?.[0] ? (
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : null}
            </div>
            <div className="flex-1">
              <Link
                href={`/product/${item.product.id}`}
                className="font-medium text-[#1f3a5f] hover:text-[#ff6b6b]"
              >
                {item.product.name}
              </Link>
              {item.size && (
                <p className="text-xs text-gray-400">Beden: {item.size}</p>
              )}
              <p className="text-sm text-gray-500">{item.product.price} ₺</p>
            </div>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) =>
                setQty(item.product.id, parseInt(e.target.value), item.size)
              }
              className="w-16 border border-gray-200 rounded px-2 py-1"
            />
            <button
              onClick={() => remove(item.product.id, item.size)}
              className="text-red-500 text-sm"
            >
              Kaldır
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <span className="text-xl font-bold text-[#1f3a5f]">
          Toplam: {total} ₺
        </span>
        <Link
          href="/checkout"
          className="bg-[#ff6b6b] text-white px-6 py-3 rounded-full font-medium hover:bg-[#ec5454] transition"
        >
          Siparişi Tamamla
        </Link>
      </div>
    </div>
  );
}
