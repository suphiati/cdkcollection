"use client";

import { Product } from "./types";

export type CartItem = {
  product: Product;
  quantity: number;
  size?: string; // selected size/age option
};

const CART_KEY = "cart";

// A cart line is identified by product id + selected size, so the same
// product in two different sizes counts as two lines.
export function lineKey(productId: string, size?: string): string {
  return `${productId}__${size ?? ""}`;
}

export function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
}
