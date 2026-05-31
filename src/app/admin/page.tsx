import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAuthenticatedFromCookies } from "@/lib/auth";
import { getProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import ProductTable from "@/components/admin/ProductTable";

export const metadata = {
  title: "Yönetim Paneli",
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  if (!isAuthenticatedFromCookies(cookieStore)) {
    redirect("/admin/login");
  }
  const products = getProducts();
  const categories = getCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#1f3a5f]">Yönetim Paneli</h1>
        <form action="/api/admin/logout" method="post">
          <button className="text-sm text-red-500">Çıkış Yap</button>
        </form>
      </div>
      <ProductTable initialProducts={products} categories={categories} />
    </div>
  );
}
