import { site, whatsappLink } from "@/lib/site";

export const metadata = {
  title: "İletişim",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1f3a5f] mb-6">İletişim</h1>
      <div className="space-y-4 text-gray-600">
        <p>Sorularınız ve siparişleriniz için bize ulaşın:</p>
        <ul className="space-y-2">
          <li>
            <strong>E-posta:</strong>{" "}
            <a
              className="text-[#ff6b6b] hover:underline"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
          </li>
          <li>
            <strong>Instagram:</strong>{" "}
            <a
              className="text-[#ff6b6b] hover:underline"
              href={`https://instagram.com/${site.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{site.instagram}
            </a>
          </li>
          <li>
            <strong>WhatsApp:</strong>{" "}
            <a
              className="text-[#ff6b6b] hover:underline"
              href={whatsappLink("Merhaba, ürünleriniz hakkında bilgi almak istiyorum.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.whatsappDisplay}
            </a>
          </li>
        </ul>
        <a
          href={whatsappLink("Merhaba, ürünleriniz hakkında bilgi almak istiyorum.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 bg-[#25D366] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
        >
          WhatsApp&apos;tan Yaz
        </a>
      </div>
    </div>
  );
}
