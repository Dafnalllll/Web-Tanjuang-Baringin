/* ─── Seed Data Produk Nagari ───
   Permulaan data untuk halaman admin produk.
   Konten diselaraskan dengan halaman publik src/pages/Produk.jsx
   supaya isian form AdminProduk mencerminkan apa yang tampil di situs. */

import coverImage from "../assets/produk/IDM.webp";

export const produkSeed = [
  {
    id: "seed-idm",

    isDummy: true,

    title: "Indeks Desa Tahun 2026",
    subtitle: "Nagari Tanjuang Baringin",
    badge: "Publikasi Resmi Nagari",
    description:
      "Indeks Desa 2026 adalah sebuah indikator tunggal yang digunakan oleh Pemerintah Indonesia untuk mengukur tingkat kemajuan dan kemandirian desa di seluruh Indonesia. Indeks ini akan menjadi alat ukur utama dalam menilai capaian pembangunan desa/nagari dan menjadi dasar dalam perumusan kebijakan pembangunan desa/nagari ke depannya. Tujuan dari Indeks Desa ini adalah untuk mengukur capaian pembangunan desa/nagari, mengidentifikasi potensi dan tantangan desa/nagari.",
    highlights: [
      "Alat ukur kemajuan dan kemandirian nagari",
      "Dasar perumusan kebijakan pembangunan",
      "Identifikasi potensi dan tantangan nagari",
    ],
    cover: coverImage,
    filePath: "/berkas/Book.xlsx",
    buttonText: "Unduh File",
  },
];
