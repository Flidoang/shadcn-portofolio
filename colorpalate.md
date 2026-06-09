## 1. Definisi Kode Warna & Kode Hex

Berikut adalah 4 warna utama baru dalam sistem desain ini (berbasis tema *Soft Dreamy Lavender / Pastel Aesthetic*). AI **wajib** mematuhi nilai hex berikut tanpa mengubah saturasi atau kecerahan kecuali ditentukan oleh token state (hover/active).

| Warna | Kode Hex | Peran Utama (Role) | Penerapan UI |
| :--- | :--- | :--- | :--- |
| **Ungu Gelap Kebiruan** | `#2A2F4F` | Deep Twilight Purple | Latar belakang utama (base canvas) untuk tema gelap, teks utama kontras tinggi jika pada latar terang, atau area struktural pekat. |
| **Muted Lavender** | `#917FB3` | Medium Amethyst / Slate Purple | Latar belakang komponen sekunder, border tegas, text label, atau elemen state dekoratif. |
| **Lilac Cerah / Pastel** | `#E5BEEC` | Soft Orchid / Light Lilac | Warna aksen utama, elemen penarik perhatian, ikon aktif, border halus, atau sub-headings. |
| **Pink Pastel Sangat Muda** | `#FDE2F3` | Sweet Cotton Candy / Blush | Latar belakang kontainer dalam tema gelap (untuk kontras teks tinggi), warna teks utama di atas latar gelap, atau tombol sekunder. |

---

## 2. Hirarki & Arsitektur Token Warna

Untuk menjaga keteraturan, gunakan pemetaan token fungsi berikut saat mengaplikasikan warna ke dalam komponen atau CSS (seperti Tailwind / CSS Variables):

### Tema Utama (Dreamy Dark Aesthetic)
* **Canvas / Background Utama:** `#2A2F4F` (Memberikan kesan malam yang lembut, tidak sekaku hitam pekat)
* **Surface / Container / Cards:** `#917FB3` (Menggunakan lavender redup untuk memisahkan area konten)
* **Teks Utama (Headings/Body):** `#FDE2F3` (Pink pastel sangat cerah memberikan keterbacaan yang sangat nyaman di atas latar gelap)
* **Aksen / Highlight / CTA:** `#E5BEEC` (Lilac pastel sebagai penanda elemen interaktif utama)
* **Borders & Dividers:** `#917FB3` atau `#2A2F4F` (Tergantung tingkat kedalaman kontras yang diinginkan)

---

## 3. Aturan Konsistensi AI (AI Constraints)

Saat memodifikasi, menambah, atau memperbaiki kode (HTML, CSS, Tailwind, Vue, atau NestJS), AI **harus** mengikuti instruksi di bawah ini:

1.  **Dilarang Menghasilkan Warna Baru Secara Acak:** Jangan pernah menggunakan warna di luar empat kode hex di atas untuk elemen struktural utama, kecuali untuk status sistem universal (seperti merah untuk *error*, hijau untuk *success*).
2.  **Kontras Aksesibilitas (WCAG):** * Jangan menumpuk teks berukuran kecil dengan warna `#917FB3` langsung di atas latar belakang `#2A2F4F` karena kontrasnya terlalu rendah untuk dibaca.
    * Gunakan kombinasi kontras tinggi seperti teks warna `#FDE2F3` atau `#E5BEEC` di atas latar belakang `#2A2F4F`.
3.  **Konsistensi State Komponen:**
    * **Default State:** Tombol aksi utama menggunakan latar belakang `#E5BEEC` dengan teks `#2A2F4F`.
    * **Hover State:** Ketika tombol disorot, warna bergeser ke `#917FB3` dengan teks `#FDE2F3` (atau sebaliknya) untuk memberikan efek interaksi visual yang jelas.

---