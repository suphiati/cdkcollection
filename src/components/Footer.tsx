import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-20 bg-[#eaf6f8]/40">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="font-bold text-lg text-[#1f3a5f]">{site.name}</div>
          <p className="mt-2 text-gray-500">
            Çocuklar için rahat, kaliteli ve şık giyim. Her yaş ve mevsim için
            özenle seçilmiş ürünler.
          </p>
        </div>
        <div>
          <div className="font-medium mb-2 text-[#1f3a5f]">Hızlı Bağlantılar</div>
          <ul className="space-y-1 text-gray-500">
            <li>
              <a href="/products" className="hover:text-[#ff6b6b]">
                Ürünler
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-[#ff6b6b]">
                Hakkımızda
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-[#ff6b6b]">
                İletişim
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2 text-[#1f3a5f]">İletişim</div>
          <ul className="space-y-1 text-gray-500">
            <li>E-posta: {site.email}</li>
            <li>Instagram: @{site.instagram}</li>
            <li>WhatsApp: {site.whatsappDisplay}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} {site.name}. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
