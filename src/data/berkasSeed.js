/* ─── Daftar Berkas Pelayanan ───
   Folder file: public/berkas/
   Cara pakai:
   1) Masukkan file ke public/berkas/ (mis. public/berkas/skkm.pdf)
   2) Isi "file" di bawah dengan nama file persis sesuai yang dimasukkan.
      - Jika file sudah ada  -> { ... } dengan properti "file"
      - Jika belum ada       -> tanpa properti "file" (tombol tampil "Segera Hadir")
   Nama harus sama persis (termasuk huruf besar/kecil & ekstensi).
*/

/* Kunci pendek untuk nama layanan (dipakai untuk mencocokkan file) */
const keys = {
  "Surat Keterangan Ahli Waris (SKAW)": "skaw",
  "Surat Keterangan Air": "sk-air",
  "Surat Keterangan Belum Pernah Menikah (SKBM)": "skbm",
  "Surat Keterangan Bersih Diri (SKBD)": "skbd",
  "Surat Keterangan Duda/Janda (SKDJ)": "skdj",
  "Surat Keterangan Meninggal Dunia (SKMD)": "skmd",
  "Surat Keterangan Cerai": "sk-cerai",
  "Surat Keterangan Berdomisili Baik (SKBB)": "skbb",
  "Surat Keterangan Domisili Perusahaan (SKDP)": "skdp",
  "Surat Keterangan Kurang Mampu (SKKM)": "skkm",
  "Surat Keterangan Penduduk (SKP)": "skp",
  "Surat Keterangan Penghasilan": "sk-penghasilan",
  "Surat Keterangan Jual Beli Tanah": "sk-jual-beli-tanah",
  "Surat Keterangan Belum Memiliki Rumah (SKBMR)": "skbmr",
  "Surat Izin/Rekomendasi Keramaian": "izin-keramaian",
  "Surat Pengantar Nikah": "pengantar-nikah",
  "Pelayanan Pengaduan": "pengaduan",
};

/* ─── Daftar file per layanan ───
   Isi "file" sesuai nama file yang sudah Anda masukkan ke public/berkas/. */
export const berkasFiles = {
  "Surat Keterangan Ahli Waris (SKAW)": {
    file: "SK AHLI WARIS.docx",
  },
  "Surat Keterangan Air": {
    file: "SK AIR.docx",
  },
  "Surat Keterangan Belum Pernah Menikah (SKBM)": {
    file: "SKBPM1.docx",
  },
  "Surat Keterangan Duda/Janda (SKDJ)": {
    file: "SK DUDA ATAU JANDA.docx",
  },
  "Surat Keterangan Meninggal Dunia (SKMD)": {
    file: "SKMD.docx",
  },
  "Surat Keterangan Cerai": {
    file: "SK CERAI.docx",
  },
  "Surat Keterangan Berdomisili Baik (SKBB)": {
    file: "SKBB.docx",
  },
  "Surat Keterangan Domisili Perusahaan (SKDP)": {
    file: "SKDP1NEW.docx",
  },
  "Surat Keterangan Kurang Mampu (SKKM)": {
    file: "SKKM.docx",
  },
  "Surat Keterangan Penduduk (SKP)": {
    file: "SKP.docx",
  },
  "Surat Keterangan Penghasilan": {
    file: "SK PENGHASILAN ORANG TUA.docx",
  },
  "Surat Keterangan Jual Beli Tanah": {
    file: "SK JUAL BELI TANAH.docx",
  },
  "Surat Keterangan Belum Memiliki Rumah (SKBMR)": {
    file: "SKBMR.docx",
  },
  "Surat Izin/Rekomendasi Keramaian": {
    file: "SK IZIN KERAMAIAN.DOCX",
  },
  "Surat Pengantar Nikah": {
    file: "SURAT KETERANGAN IZIN NIKAH.docx",
  },
  "Pelayanan Pengaduan": {
    file: "FORMULIR PENGADUAN.docx",
  },
};

/* ─── Helper: dapatkan nama file untuk sebuah layanan ─── */
export function getBerkasFileName(layanan) {
  const meta = berkasFiles[layanan];
  return meta?.file ?? null;
}

/* ─── Helper: dapatkan kunci slug (dipakai bila ingin custom nama) ─── */
export function getLayananKey(layanan) {
  return keys[layanan] ?? null;
}
