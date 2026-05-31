"use client";

import { useState } from "react";
import { Product, Category, Gender, GENDER_LABELS } from "@/lib/types";

type Props = {
  product?: Product;
  categories: Category[];
  onSaved: () => void;
  onCancel: () => void;
};

export default function ProductForm({
  product,
  categories,
  onSaved,
  onCancel,
}: Props) {
  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    category: product?.category || categories[0]?.slug || "",
    stock: product?.stock || 0,
    images: product?.images || [],
    sizes: (product?.sizes || []).join(", "),
    gender: (product?.gender || "unisex") as Gender,
    featured: product?.featured || false,
  });
  const [uploading, setUploading] = useState(false);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (res.ok) {
      const { url } = await res.json();
      setForm((f) => ({ ...f, images: [...f.images, url] }));
    }
    setUploading(false);
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const method = product ? "PUT" : "POST";
        const url = product ? `/api/products/${product.id}` : "/api/products";
        const payload = {
          ...form,
          sizes: form.sizes
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        };
        await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        onSaved();
      }}
      className="space-y-4"
    >
      <input
        required
        placeholder="Ürün adı"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
      />
      <textarea
        placeholder="Açıklama"
        value={form.description}
        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Fiyat"
          value={form.price}
          onChange={(e) =>
            setForm((f) => ({ ...f, price: Number(e.target.value) }))
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
        <input
          type="number"
          placeholder="Stok"
          value={form.stock}
          onChange={(e) =>
            setForm((f) => ({ ...f, stock: Number(e.target.value) }))
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <select
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        >
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={form.gender}
          onChange={(e) =>
            setForm((f) => ({ ...f, gender: e.target.value as Gender }))
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        >
          {(Object.keys(GENDER_LABELS) as Gender[]).map((g) => (
            <option key={g} value={g}>
              {GENDER_LABELS[g]}
            </option>
          ))}
        </select>
      </div>
      <input
        placeholder="Bedenler (virgülle ayırın: 2 yaş, 3-4 yaş, 5-6 yaş)"
        value={form.sizes}
        onChange={(e) => setForm((f) => ({ ...f, sizes: e.target.value }))}
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) =>
            setForm((f) => ({ ...f, featured: e.target.checked }))
          }
        />
        Öne çıkar
      </label>
      <div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {uploading && <p className="text-sm text-gray-500">Yükleniyor...</p>}
        <div className="flex gap-2 mt-2">
          {form.images.map((img) => (
            <div
              key={img}
              className="w-16 h-16 bg-gray-100 rounded relative overflow-hidden group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    images: f.images.filter((i) => i !== img),
                  }))
                }
                className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 leading-none opacity-0 group-hover:opacity-100"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-[#ff6b6b] text-white px-4 py-2 rounded-lg hover:bg-[#ec5454] transition"
        >
          Kaydet
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-300 px-4 py-2 rounded-lg"
        >
          İptal
        </button>
      </div>
    </form>
  );
}
