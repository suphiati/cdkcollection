// Central site configuration. Update brand/contact details here in one place.
export const site = {
  name: "CDK Collection",
  shortName: "CDK",
  domain: "cdkcollection.com",
  url: "https://cdkcollection.com",
  description:
    "Çocuklar için rahat, kaliteli ve şık giyim. Bebek bodyleri, tişörtler, elbiseler, pijamalar ve daha fazlası.",
  email: "info@cdkcollection.com",
  instagram: "cdkcollection",
  // International format without "+" or spaces, for wa.me links.
  whatsapp: "905555555555",
  whatsappDisplay: "+90 555 555 55 55",
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
