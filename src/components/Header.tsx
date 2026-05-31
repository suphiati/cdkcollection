"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartContext";
import { getCategories } from "@/lib/categories";
import { site } from "@/lib/site";

export default function Header() {
  const { count } = useCart();
  const categories = getCategories();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#ff6b6b] text-white font-bold">
            C
          </span>
          <span className="font-bold text-xl text-[#1f3a5f]">{site.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/products" className="hover:text-[#ff6b6b] transition">
            Tüm Ürünler
          </Link>
          {categories.slice(0, 4).map((c) => (
            <Link
              key={c.slug}
              href={`/shop/${c.slug}`}
              className="hover:text-[#ff6b6b] transition"
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <span className="text-sm font-medium">Sepet</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-4 bg-[#ff6b6b] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button
            aria-label="Menü"
            className="md:hidden text-2xl leading-none text-[#1f3a5f]"
            onClick={() => setOpen((o) => !o)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-gray-200 bg-white px-4 py-3 flex flex-col gap-3 text-sm">
          <Link href="/products" onClick={() => setOpen(false)}>
            Tüm Ürünler
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/shop/${c.slug}`}
              onClick={() => setOpen(false)}
            >
              {c.name}
            </Link>
          ))}
          <Link href="/about" onClick={() => setOpen(false)}>
            Hakkımızda
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)}>
            İletişim
          </Link>
        </nav>
      )}
    </header>
  );
}
