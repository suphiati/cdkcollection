# CDK Collection — Çocuk Giyim E-Ticaret

[cdkcollection.com](https://cdkcollection.com) için geliştirilen çocuk giyim
e-ticaret sitesi. Next.js (App Router), React 19, TypeScript ve Tailwind CSS v4
ile geliştirilmiştir.

## Özellikler

- **Ürün kataloğu & kategoriler** — Bebek body & tulum, tişört & sweatshirt,
  elbise & etek, pantolon & tayt, mont & kaban, pijama & iç giyim.
- **Ürün detay sayfası** — Beden/yaş seçimi, cinsiyet ve stok bilgisi.
- **Sepet** — `localStorage` tabanlı, beden bazında ayrı satırlar.
- **Sipariş** — Sipariş bilgileri formu ve WhatsApp üzerinden sipariş gönderimi.
- **Hakkımızda & İletişim** sayfaları.
- **Yönetim paneli** (`/admin`) — Ürün ekleme/düzenleme/silme ve görsel yükleme.

## Geliştirme

```bash
npm install
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışır.

```bash
npm run build   # production derlemesi
npm run start   # production sunucusu
npm run lint    # eslint
```

## Yapılandırma

Marka ve iletişim bilgileri tek noktadan `src/lib/site.ts` dosyasında yönetilir
(site adı, e-posta, Instagram, WhatsApp numarası vb.). WhatsApp numarasını
`whatsapp` alanından güncelleyin.

### Ortam değişkenleri

| Değişken | Açıklama | Varsayılan |
| --- | --- | --- |
| `ADMIN_PASSWORD` | Yönetim paneli giriş şifresi | `admin123` |
| `ADMIN_SESSION_TOKEN` | Oturum çerezi gizli anahtarı | `letmein` |

> **Üretim için mutlaka** bu değerleri değiştirin.

## Veri ve görseller

- Başlangıç ürünleri `src/data/products.json` içinde tutulur.
- Panel üzerinden yapılan değişiklikler `src/data/products.store.json` dosyasına
  yazılır (git'e dahil edilmez).
- Yüklenen ürün görselleri `public/products/` altına kaydedilir.

> **Not (deploy):** Dosya tabanlı bu depolama yerel geliştirme içindir. Vercel
> gibi salt okunur/sunucusuz ortamlarda kalıcı yazma çalışmaz; üretimde ürünleri
> kalıcı saklamak için bir veritabanı (ör. Supabase) ve nesne depolama
> (ör. S3/Supabase Storage) entegrasyonu önerilir.

## Teknoloji

- [Next.js 15](https://nextjs.org) — App Router
- React 19
- TypeScript
- Tailwind CSS v4
