import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const featured = getFeaturedProducts();
  const categories = getCategories();

  const valueProps = [
    {
      title: "Yumuşak & Güvenli",
      text: "Hassas çocuk cildine uygun, nefes alabilir kaliteli kumaşlar.",
    },
    {
      title: "Hızlı Kargo",
      text: "Siparişleriniz özenle paketlenir ve hızlıca gönderilir.",
    },
    {
      title: "Kolay İade",
      text: "Beğenmezseniz koşulsuz iade ve değişim imkânı.",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#eaf6f8] to-white">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <span className="inline-block bg-white text-[#2cc5d2] text-sm font-medium px-4 py-1 rounded-full border border-[#2cc5d2]/30">
            Yeni Sezon Çocuk Koleksiyonu
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-[#1f3a5f]">
            Minikler İçin Rahat ve Şık Giyim
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Bebekten okul çağına, her yaş için yumuşacık kumaşlar ve sevimli
            tasarımlar. Çocuğunuzun her anına eşlik edecek kaliteli parçalar.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/products"
              className="bg-[#ff6b6b] text-white px-6 py-3 rounded-full font-medium hover:bg-[#ec5454] transition"
            >
              Ürünleri Keşfet
            </Link>
            <Link
              href="/about"
              className="border border-[#ff6b6b] text-[#ff6b6b] px-6 py-3 rounded-full font-medium hover:bg-[#fff1f1] transition"
            >
              Hakkımızda
            </Link>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {valueProps.map((v) => (
            <div
              key={v.title}
              className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm"
            >
              <div className="font-semibold text-[#1f3a5f]">{v.title}</div>
              <p className="mt-1 text-sm text-gray-500">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-10 text-[#1f3a5f]">
          Kategoriler
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="group block rounded-xl border border-gray-200 p-6 text-center hover:shadow-md hover:border-[#2cc5d2] transition"
            >
              <div className="text-lg font-medium text-[#1f3a5f] group-hover:text-[#ff6b6b]">
                {cat.name}
              </div>
              <p className="mt-2 text-sm text-gray-500">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-center mb-10 text-[#1f3a5f]">
          Öne Çıkan Ürünler
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
