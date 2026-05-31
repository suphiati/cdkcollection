import fs from "fs";
import path from "path";
import { Product } from "./types";

const dataDir = path.join(process.cwd(), "src", "data");
const storeFile = path.join(dataDir, "products.store.json");
const seedFile = path.join(dataDir, "products.json");

function ensureStore() {
  try {
    if (!fs.existsSync(storeFile)) {
      const seed = fs.existsSync(seedFile)
        ? fs.readFileSync(seedFile, "utf-8")
        : "[]";
      fs.writeFileSync(storeFile, seed, "utf-8");
    }
  } catch {
    // ignore
  }
}

export function readProducts(): Product[] | null {
  try {
    ensureStore();
    const raw = fs.readFileSync(storeFile, "utf-8");
    return JSON.parse(raw) as Product[];
  } catch {
    return null;
  }
}

export function writeProducts(products: Product[]): boolean {
  try {
    ensureStore();
    fs.writeFileSync(storeFile, JSON.stringify(products, null, 2), "utf-8");
    return true;
  } catch {
    return false;
  }
}
