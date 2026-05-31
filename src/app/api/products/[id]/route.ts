import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getProducts } from "@/lib/products";
import { writeProducts } from "@/lib/storage";
import { isAuthenticatedFromCookies } from "@/lib/auth";

async function requireAuth() {
  const cookieStore = await cookies();
  return isAuthenticatedFromCookies(cookieStore);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json();
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  }
  products[index] = {
    ...products[index],
    name: body.name ?? products[index].name,
    description: body.description ?? products[index].description,
    price: body.price !== undefined ? Number(body.price) : products[index].price,
    images: Array.isArray(body.images) ? body.images : products[index].images,
    category: body.category ?? products[index].category,
    stock: body.stock !== undefined ? Number(body.stock) : products[index].stock,
    sizes: Array.isArray(body.sizes) ? body.sizes : products[index].sizes,
    gender: body.gender ?? products[index].gender,
    featured:
      body.featured !== undefined
        ? Boolean(body.featured)
        : products[index].featured,
  };
  if (!writeProducts(products)) {
    return NextResponse.json({ error: "Kaydedilemedi" }, { status: 500 });
  }
  return NextResponse.json(products[index]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }
  const { id } = await params;
  const products = getProducts();
  const updated = products.filter((p) => p.id !== id);
  if (!writeProducts(updated)) {
    return NextResponse.json({ error: "Kaydedilemedi" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
