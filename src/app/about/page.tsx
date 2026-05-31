import { site } from "@/lib/site";

export const metadata = {
  title: "Hakkımızda",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1f3a5f] mb-6">Hakkımızda</h1>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          <strong>{site.name}</strong>, çocuklar için rahat, kaliteli ve şık
          giyim ürünlerini sizlerle buluşturmak için kuruldu. Bebeklerden okul
          çağındaki çocuklara kadar her yaş grubuna özel, özenle seçilmiş
          parçalar sunuyoruz.
        </p>
        <p>
          Ürünlerimizi seçerken en önemli önceliğimiz; çocukların hassas
          ciltlerine uygun, yumuşak ve nefes alabilen kumaşlar kullanmaktır.
          Hareketi kısıtlamayan rahat kesimler ve dayanıklı dikişlerle, günün
          her anına uygun giysiler hazırlıyoruz.
        </p>
        <p>
          Amacımız, hem çocukların kendini özgür ve konforlu hissetmesini sağlamak
          hem de ailelerin gönül rahatlığıyla tercih edebileceği güvenilir bir
          marka olmaktır.
        </p>
        <p>
          Sorularınız için{" "}
          <a className="text-[#ff6b6b] underline" href="/contact">
            iletişim
          </a>{" "}
          sayfamızdan bize ulaşabilirsiniz.
        </p>
      </div>
    </div>
  );
}
