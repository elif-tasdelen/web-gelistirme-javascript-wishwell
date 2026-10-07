# WishWell

**Bir para at, bir dilek tut.**

WishWell; almak istediğin şeyleri dilek olarak kaydettiğin, birikimini bir dilek çeşmesine para atarak biriktirdiğin ve yeterli birikime ulaşınca dileklerini gerçekleştirdiğin bir birikim takip uygulamasıdır.

🔗 **Canlı demo:** _yakında_

![WishWell masaüstü görünümü](screenshots/desktop.png)

## Özellikler

- **Dilek tut (Ekle):** Ad, fiyat ve öncelik (Yüksek / Orta / Düşük) ile yeni dilek ekleme
- **Dileklerim (Listele):** Önceliğe göre sıralanan, kağıt not görünümlü dilek kartları
- **Düzenle (Güncelle):** Dileğin adını, fiyatını ve önceliğini kart üzerinde düzenleme
- **Sil:** Onay alarak dilek silme
- **Dilek çeşmesi:** Hazır tutarlar (50 / 100 / 250 ₺) veya özel tutarla, animasyonlu coin atarak birikim ekleme
- **İlerleme takibi:** Her dilek ve sıradaki dilek için birikimin ne kadarının hazır olduğunu gösteren ilerleme çubukları
- **Gerçekleştir:** Birikim yetince dileği gerçekleştirme; tutar birikimden düşülür, dilek "Gerçekleşenler" bölümüne taşınır ve geri alınabilir
- **Ayarlar:** Onay penceresiyle birikimi sıfırlama
- **Kalıcı veri:** Tüm veriler tarayıcıda LocalStorage ile saklanır
- **Duyarlı tasarım:** Mobil ve masaüstü uyumlu; hareketi azaltma tercihine saygı gösteren animasyonlar

## Kullanılan Teknolojiler

- [React](https://react.dev/) (JavaScript)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide](https://lucide.dev/) ikonları
- LocalStorage
- ESLint

## Proje Yapısı

```
src/
├── components/   # Arayüz bileşenleri (çeşme, dilek kartları, formlar, ayarlar)
├── hooks/        # useWishes ve usePiggyBank: CRUD ve LocalStorage mantığı
├── interfaces/   # Veri yapısı tanımları (JSDoc) ve öncelik etiketleri
├── pages/        # HomePage
├── utils/        # Sıralama yardımcıları
├── App.jsx
├── main.jsx
└── index.css     # Tema renkleri ve animasyonlar
```

## Kurulum

```bash
git clone https://github.com/elif-tasdelen/wishwell.git
cd wishwell
npm install
npm run dev
```

Uygulama varsayılan olarak `http://localhost:5173` adresinde açılır.

## Mobil Görünüm

<img src="screenshots/mobile.png" alt="WishWell mobil görünümü" width="320" />

---

Software Persona Mesleki Gelişim Programı, *Web Geliştirme; JavaScript* eğitimi kapsamında geliştirilmiştir.