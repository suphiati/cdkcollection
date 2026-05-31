"use client";

import { useState } from "react";
import { Product, Category, GENDER_LABELS } from "@/lib/types";
import ProductForm from "./ProductForm";

type Props = {
  initialProducts: Product[];
  categories: Category[];
};

export default function ProductTable({ initialProducts, categories }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);

  async function refresh() {
    const res = await fetch("/api/products", { cache: "no-store" });
    if (res.ok) setProducts(await res.json());
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    await refresh();
  }

  const categoryName = (slug: string) =>
    categories.find((c) => c.slug === slug)?.name ?? slug;

  if (creating || editing) {
    return (
      <div className="border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-[#1f3a5f] mb-4">
          {editing ? "Ürünü Düzenle" : "Yeni Ürün"}
        </h2>
        <ProductForm
          product={editing ?? undefined}
          categories={categories}
          onSaved={async () => {
            setEditing(null);
            setCreating(false);
            await refresh();
          }}
          onCancel={() => {
            setEditing(null);
            setCreating(false);
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setCreating(true)}
        className="mb-6 bg-[#ff6b6b] text-white px-4 py-2 rounded-lg hover:bg-[#ec5454] transition"
      >
        + Yeni Ürün Ekle
      </button>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-lg">
          <thead className="bg-[#eaf6f8] text-[#1f3a5f]">
            <tr>
              <th className="text-left p-3">Ürün</th>
              <th className="text-left p-3">Kategori</th>
              <th className="text-left p-3">Cinsiyet</th>
              <th className="text-left p-3">Fiyat</th>
              <th className="text-left p-3">Stok</th>
              <th className="text-right p-3">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-gray-200">
                <td className="p-3 font-medium text-[#1f3a5f]">{p.name}</td>
                <td className="p-3">{categoryName(p.category)}</td>
                <td className="p-3">{GENDER_LABELS[p.gender]}</td>
                <td className="p-3">{p.price} ₺</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3 text-right space-x-3">
                  <button
                    onClick={() => setEditing(p)}
                    className="text-[#2cc5d2]"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-500"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-400">
                  Henüz ürün yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
