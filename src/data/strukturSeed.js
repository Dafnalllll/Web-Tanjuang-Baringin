/* ─── Seed Data Struktur Pemerintahan ───
   Data dummy diambil dari src/components/section/tentang/struktur.jsx.
   Foto menggunakan asset yang sama agar tampilan konsisten. */

//Pimpinan//
import WaliNagari from "../assets/sotk/pimpinan/walnag.webp";
import SekretarisNagari from "../assets/sotk/pimpinan/sesnag.webp";

//Kasi//
import KasiPemerintahan from "../assets/sotk/kasi/pemerintahan.webp";
import KasiKesra from "../assets/sotk/kasi/kesra.webp";
import KasiPelayanan from "../assets/sotk/kasi/pelayanan.webp";

//Kaur//
import KaurKeuangan from "../assets/sotk/kaur/keuangan.webp";
import KaurTataUsahaDanUmum from "../assets/sotk/kaur/tatausahadanumum.webp";
import KaurPerencanaan from "../assets/sotk/kaur/perencanaan.webp";

//Staf//
import StafPemerintahan from "../assets/sotk/staf/pemerintahan/pemerintahan.webp";
import StafKesra from "../assets/sotk/staf/kesra/kesra.webp";
import StafKesra1 from "../assets/sotk/staf/kesra/kesra1.webp";
import StafPelayanan from "../assets/sotk/staf/pelayanan/pelayanan.webp";
import StafKeuangan from "../assets/sotk/staf/keuangan/keuangan.webp";
import StafKeuangan1 from "../assets/sotk/staf/keuangan/keuangan1.webp";
import StafTataUsahaDanUmum from "../assets/sotk/staf/tatausahadanumum/tatausahadanumum.webp";
import StafPerencanaan from "../assets/sotk/staf/perencanaan/perencanaan.webp";

//Jorong//
import Jorong3 from "../assets/sotk/jorong/jorong3.webp";
import Jorong4 from "../assets/sotk/jorong/jorong4.webp";
import Jorong5 from "../assets/sotk/jorong/jorong5.webp";

//Petugas Nagari//
import PetugasPustaka from "../assets/sotk/petugas/pustaka.webp";
import PetugasData from "../assets/sotk/petugas/data.webp";
import PetugasKeamanan from "../assets/sotk/petugas/keamanan.webp";
import PetugasKebersihan from "../assets/sotk/petugas/kebersihan.webp";
import PetugasKeagamaan from "../assets/sotk/petugas/keagamaan.webp";

/* ─── Kategori level untuk form ─── */
export const strukturLevels = [
  { id: "pimpinan", label: "Pimpinan" },
  { id: "kasi", label: "Kasi" },
  { id: "kaur", label: "Kaur" },
  { id: "staf", label: "Staf" },
  { id: "jorong", label: "Jorong" },
  { id: "petugas", label: "Petugas Nagari" },
];

/* ─── Data dummy struktur (tidak dihapus) ─── */
export const strukturSeed = [
  {
    id: 1,
    nama: "RONALD YULMASRI",
    jabatan: "Wali Nagari",
    level: "pimpinan",
    whatsapp: "+6282130147901",
    foto: WaliNagari,
    fotoPositionY: "center",
  },
  {
    id: 2,
    nama: "NENENG RIANI",
    jabatan: "Sekretaris Nagari",
    level: "pimpinan",
    whatsapp: "+6285274885074",
    foto: SekretarisNagari,
    fotoPositionY: "-22px",
  },
  {
    id: 3,
    nama: "NUR ZAWILIS",
    jabatan: "Kasi Pemerintahan",
    level: "kasi",
    whatsapp: "+6281261378002",
    foto: KasiPemerintahan,
    fotoPositionY: "center",
  },
  {
    id: 4,
    nama: "ZUL AFRIADI",
    jabatan: "Kasi Kesejahteraan",
    level: "kasi",
    whatsapp: "+6282389955550",
    foto: KasiKesra,
    fotoPositionY: "center",
  },
  {
    id: 5,
    nama: "NOVITA SARI",
    jabatan: "Kasi Pelayanan",
    level: "kasi",
    whatsapp: "+6282360394310",
    foto: KasiPelayanan,
    fotoPositionY: "0px",
  },
  {
    id: 6,
    nama: "MARISA RAHIM",
    jabatan: "Kaur Keuangan",
    level: "kaur",
    whatsapp: "+6281371183789",
    foto: KaurKeuangan,
    fotoPositionY: "center",
  },
  {
    id: 7,
    nama: "SUSANTI",
    jabatan: "Kaur Tata Usaha dan Umum",
    level: "kaur",
    whatsapp: "+6282386813802",
    foto: KaurTataUsahaDanUmum,
    fotoPositionY: "center",
  },
  {
    id: 8,
    nama: "MELFI ARIANSYAH",
    jabatan: "Kaur Perencanaan",
    level: "kaur",
    whatsapp: "+6281363179169",
    foto: KaurPerencanaan,
    fotoPositionY: "center",
  },
  {
    id: 9,
    nama: "SYAHRIAL",
    jabatan: "Staf Kasi Pemerintahan",
    level: "staf",
    whatsapp: "+6281266094409",
    foto: StafPemerintahan,
    fotoPositionY: "-8px",
  },
  {
    id: 10,
    nama: "SUCI DWI RAMADHANI",
    jabatan: "Staf Kasi Kesra",
    level: "staf",
    whatsapp: "+6282135539302",
    foto: StafKesra,
    fotoPositionY: "center",
  },
  {
    id: 11,
    nama: "RANDI MULYADI",
    jabatan: "Staf Kasi Kesra",
    level: "staf",
    whatsapp: "+6282384045101",
    foto: StafKesra1,
    fotoPositionY: "-20px",
  },
  {
    id: 12,
    nama: "MIRA OKTAVIA",
    jabatan: "Staf Kasi Pelayanan",
    level: "staf",
    whatsapp: "+6281378838489",
    foto: StafPelayanan,
    fotoPositionY: "-30px",
  },
  {
    id: 13,
    nama: "DESMARNI",
    jabatan: "Staf Kaur Keuangan",
    level: "staf",
    whatsapp: "+6282169075120",
    foto: StafKeuangan,
    fotoPositionY: "center",
  },
  {
    id: 14,
    nama: "NORA YULIASMI",
    jabatan: "Staf Kaur Keuangan",
    level: "staf",
    whatsapp: "+6282391255231",
    foto: StafKeuangan1,
    fotoPositionY: "0px",
  },
  {
    id: 15,
    nama: "RAHMADANI",
    jabatan: "Staf Kaur Tata Usaha dan Umum",
    level: "staf",
    whatsapp: "+6282386832296",
    foto: StafTataUsahaDanUmum,
    fotoPositionY: "0px",
  },
  {
    id: 16,
    nama: "DONI IKHWAN",
    jabatan: "Staf Kaur Perencanaan",
    level: "staf",
    whatsapp: "+6281270035289",
    foto: StafPerencanaan,
    fotoPositionY: "-30px",
  },
  {
    id: 17,
    nama: "ERI YANTO",
    jabatan: "Kepala Jorong Tigo",
    level: "jorong",
    whatsapp: "+6282262640158",
    foto: Jorong3,
    fotoPositionY: "center",
  },
  {
    id: 18,
    nama: "ZAIDIRMAN",
    jabatan: "Kepala Jorong Ampek",
    level: "jorong",
    whatsapp: "+6281374132864",
    foto: Jorong4,
    fotoPositionY: "-4px",
  },
  {
    id: 19,
    nama: "IWAN PUTRA",
    jabatan: "Kepala Jorong Limo",
    level: "jorong",
    whatsapp: "+6282171639171",
    foto: Jorong5,
    fotoPositionY: "-28px",
  },
  {
    id: 20,
    nama: "YULIANSYAH",
    jabatan: "Petugas Keagamaan",
    level: "petugas",
    whatsapp: "+6285363017284",
    foto: PetugasKeagamaan,
    fotoPositionY: "-12px",
  },
  {
    id: 21,
    nama: "MERI SATRIA",
    jabatan: "Petugas Kebersihan",
    level: "petugas",
    whatsapp: "+6282281631035",
    foto: PetugasKebersihan,
    fotoPositionY: "center",
  },
  {
    id: 22,
    nama: "PITRISNAWATI",
    jabatan: "Petugas Pustaka",
    level: "petugas",
    whatsapp: "+6282172908568",
    foto: PetugasPustaka,
    fotoPositionY: "-28px",
  },
  {
    id: 23,
    nama: "ARDI",
    jabatan: "Petugas Keamanan",
    level: "petugas",
    whatsapp: "+6285376310769",
    foto: PetugasKeamanan,
    fotoPositionY: "center",
  },
  {
    id: 24,
    nama: "ABDULLAH NASYIR",
    jabatan: "Petugas Data",
    level: "petugas",
    whatsapp: "+6285271195491",
    foto: PetugasData,
    fotoPositionY: "center",
  },
];
