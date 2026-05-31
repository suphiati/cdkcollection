import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getProducts } from "@/lib/products";
import { writeProducts } from "@/lib/storage";
import { isAuthenticatedFromCookies } from "@/lib/auth";
import { Product } from "@/lib/types";

export async function GET() {
  return NextResponse.json(getProducts());
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  if (!isAuthenticatedFromCookies(cookieStore)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }
  const body = await req.json();
  const products = getProducts();
  const newProduct: Product = {
    id: `p${Date.now()}`,
    name: body.name ?? "",
    description: body.description ?? "",
    price: Number(body.price) || 0,
    images: Array.isArray(body.images) ? body.images : [],
    category: body.category ?? "",
    stock: Number(body.stock) || 0,
    sizes: Array.isArray(body.sizes) ? body.sizes : [],
    gender: body.gender ?? "unisex",
    featured: Boolean(body.featured),
    createdAt: new Date().toISOString(),
  };
  const updated = [...products, newProduct];
  if (!writeProducts(updated)) {
    return NextResponse.json(
      { error: "Kaydedilemedi (dosya sistemi salt okunur olabilir)" },
      { status: 500 }
    );
  }
  return NextResponse.json(newProduct, { status: 201 });
}
