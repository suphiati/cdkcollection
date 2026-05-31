# CDK Collection — Agent Notes

Çocuk giyim e-ticaret sitesi. Next.js App Router + TypeScript + Tailwind CSS v4.

## Komutlar

- `npm run dev` — geliştirme sunucusu
- `npm run build` — production derlemesi (değişiklik sonrası bununla doğrula)
- `npm run lint` — eslint

## Mimari

- `src/app` — sayfalar ve API route'ları (App Router)
- `src/components` — UI bileşenleri (`admin/` altında panel bileşenleri)
- `src/lib` — `types`, `products`, `categories`, `storage`, `auth`, `cart`, `site`
- `src/data` — `products.json` (seed), `categories.json`; çalışma anı verisi
  `products.store.json` (git dışı)

## Notlar

- Marka/iletişim bilgileri yalnızca `src/lib/site.ts` içinde tutulur.
- Renk paleti `src/app/globals.css` içindeki CSS değişkenlerinde tanımlıdır.
- Admin kimlik doğrulaması `ADMIN_PASSWORD` / `ADMIN_SESSION_TOKEN` ile çerez
  tabanlıdır; üretimde gerçek bir auth sağlayıcıyla değiştirilmelidir.
