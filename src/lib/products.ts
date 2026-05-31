import productsData from "@/data/products.json";
import { Product } from "./types";
import { readProducts } from "./storage";

export function getProducts(): Product[] {
  // Prefer persisted store if available, else fall back to bundled JSON
  const stored = readProducts();
  if (stored && stored.length >= 0) {
    return stored;
  }
  return productsData as Product[];
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return getProducts().filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return getProducts().filter((p) => p.featured);
}
