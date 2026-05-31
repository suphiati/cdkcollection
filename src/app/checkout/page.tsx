"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { whatsappLink } from "@/lib/site";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function buildMessage(): string {
    const lines = [
      "Yeni Sipariş 🛍️",
      "",
      "Ürünler:",
      ...items.map(
        (i) =>
          `• ${i.product.name}${i.size ? ` (${i.size})` : ""} x${i.quantity} — ${
            i.product.price * i.quantity
          } ₺`
      ),
      "",
      `Toplam: ${total} ₺`,
      "",
      `Ad Soyad: ${form.name}`,
      `Telefon: ${form.phone}`,
      `Adres: ${form.address}`,
      form.note ? `Not: ${form.note}` : "",
    ].filter(Boolean);
    return lines.join("\n");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Send the order to the store via WhatsApp, then confirm and clear.
    window.open(whatsappLink(buildMessage()), "_blank", "noopener,noreferrer");
    setSubmitted(true);
    clear();
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[#1f3a5f]">
          Siparişiniz Alındı! 🎉
        </h1>
        <p className="mt-4 text-gray-600">
          Siparişiniz WhatsApp üzerinden bize iletildi. En kısa sürede sizinle
          iletişime geçeceğiz.
        </p>
        <Link
          href="/products"
          className="inline-block mt-8 bg-[#ff6b6b] text-white px-6 py-3 rounded-full hover:bg-[#ec5454] transition"
        >
          Alışverişe Devam Et
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
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
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1f3a5f] mb-8">Sipariş Bilgileri</h1>

      {/* Order summary */}
      <div className="mb-8 border border-gray-200 rounded-xl p-4 text-sm">
        <div className="font-medium text-[#1f3a5f] mb-2">Sipariş Özeti</div>
        <ul className="space-y-1 text-gray-600">
          {items.map((i) => (
            <li
              key={`${i.product.id}-${i.size ?? ""}`}
              className="flex justify-between"
            >
              <span>
                {i.product.name}
                {i.size ? ` (${i.size})` : ""} × {i.quantity}
              </span>
              <span>{i.product.price * i.quantity} ₺</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between font-bold text-[#1f3a5f]">
          <span>Toplam</span>
          <span>{total} ₺</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field
          label="Ad Soyad"
          value={form.name}
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}
        />
        <Field
          label="Telefon"
          type="tel"
          value={form.phone}
          onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adres
          </label>
          <textarea
            required
            rows={3}
            value={form.address}
            onChange={(e) =>
              setForm((f) => ({ ...f, address: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sipariş Notu (isteğe bağlı)
          </label>
          <textarea
            rows={2}
            value={form.note}
            onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div className="flex justify-between items-center pt-4">
          <span className="text-xl font-bold text-[#1f3a5f]">
            Toplam: {total} ₺
          </span>
          <button
            type="submit"
            className="bg-[#25D366] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
          >
            WhatsApp ile Siparişi Gönder
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center">
          Siparişiniz WhatsApp üzerinden mağazamıza iletilecektir.
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
      />
    </div>
  );
}
