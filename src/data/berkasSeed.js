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
  "Surat Keterangan": "surat-keterangan",
  "Surat Keterangan Ahli Waris (SKAW)": "skaw",
  "Surat Keterangan Air": "sk-air",
  "Surat Keterangan Belum Memiliki KIP Kuliah (SKBMK)": "skbmk",
  "Surat Keterangan Belum Pernah Menikah (SKBM)": "skbm",
  "Surat Keterangan Bersih Diri (SKBD)": "skbd",
  "Surat Keterangan Duda/Janda (SKDJ)": "skdj",
  "Surat Keterangan Kehilangan/Kepundahan (SKK)": "skk",
  "Surat Keterangan Meninggal Dunia (SKMD)": "skmd",
  "Surat Keterangan Cerai": "sk-cerai",
  "Surat Keterangan Beralih Lingkungan": "sk-beralih-lingkungan",
  "Surat Keterangan Berdomisili Baik (SKBB)": "skbb",
  "Surat Keterangan Domisili Perusahaan (SKDP)": "skdp",
  "Surat Keterangan Kurang Mampu (SKKM)": "skkm",
  "Surat Keterangan Penduduk (SKP)": "skp",
  "Surat Keterangan Domisili Tempat Usaha (SKDTU)": "skdtu",
  "Surat Keterangan Penghasilan": "sk-penghasilan",
  "Surat Keterangan Jual Beli Tanah": "sk-jual-beli-tanah",
  "Surat Keterangan Tanah": "sk-tanah",
  "Surat Keterangan Belum Memiliki Rumah (SKBMR)": "skbmr",
  "Surat Izin/Rekomendasi Keramaian": "izin-keramaian",
  "Surat Pengantar Nikah": "pengantar-nikah",
  "Pelayanan Pengaduan": "pengaduan",
};

/* ─── Daftar file per layanan ───
   Isi "file" sesuai nama file yang sudah Anda masukkan ke public/berkas/. */
export const berkasFiles = {
  "Surat Keterangan": {
    // file: "surat-keterangan.pdf",
  },
  "Surat Keterangan Ahli Waris (SKAW)": {
    file: "SK AHLI WARIS.docx",
  },
  "Surat Keterangan Air": {
    file: "SK AIR.docx",
  },
  "Surat Keterangan Belum Memiliki KIP Kuliah (SKBMK)": {
    // file: "skbmk.pdf",
  },
  "Surat Keterangan Belum Pernah Menikah (SKBM)": {
    // file: "skbm.pdf",
  },
  "Surat Keterangan Bersih Diri (SKBD)": {
    // file: "skbd.pdf",
  },
  "Surat Keterangan Duda/Janda (SKDJ)": {
    file: "SK DUDA ATAU JANDA.docx",
  },
  "Surat Keterangan Kehilangan/Kepundahan (SKK)": {
    // file: "skk.pdf",
  },
  "Surat Keterangan Meninggal Dunia (SKMD)": {
    // file: "skmd.pdf",
  },
  "Surat Keterangan Cerai": {
    file: "SK CERAI.docx",
  },
  "Surat Keterangan Beralih Lingkungan": {
    // file: "sk-beralih-lingkungan.pdf",
  },
  "Surat Keterangan Berdomisili Baik (SKBB)": {
    // file: "skbb.pdf",
  },
  "Surat Keterangan Domisili Perusahaan (SKDP)": {
    // file: "skdp.pdf",
  },
  "Surat Keterangan Kurang Mampu (SKKM)": {
    // file: "skkm.pdf",
  },
  "Surat Keterangan Penduduk (SKP)": {
    // file: "skp.pdf",
  },
  "Surat Keterangan Domisili Tempat Usaha (SKDTU)": {
    // file: "skdtu.pdf",
  },
  "Surat Keterangan Penghasilan": {
    file: "SK PENGHASILAN ORANG TUA.docx",
  },
  "Surat Keterangan Jual Beli Tanah": {
    // file: "sk-jual-beli-tanah.pdf",
  },
  "Surat Keterangan Tanah": {
    // file: "sk-tanah.pdf",
  },
  "Surat Keterangan Belum Memiliki Rumah (SKBMR)": {
    // file: "skbmr.pdf",
  },
  "Surat Izin/Rekomendasi Keramaian": {
    file: "SK IZIN KERAMAIAN.DOCX",
  },
  "Surat Pengantar Nikah": {
    // file: "pengantar-nikah.pdf",
  },
  "Pelayanan Pengaduan": {
    // file: "pengaduan.pdf",
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
