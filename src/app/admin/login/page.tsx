"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="max-w-sm mx-auto px-4 py-20">
      <h1 className="text-2xl font-bold text-[#1f3a5f] mb-6">Yönetici Girişi</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
          });
          if (res.ok) {
            window.location.href = "/admin";
          } else {
            setError("Hatalı şifre");
          }
        }}
        className="space-y-4"
      >
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifre"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-[#ff6b6b] text-white py-2 rounded-lg font-medium hover:bg-[#ec5454] transition"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
