import { useRef } from "react";
import { FaFileAlt, FaDownload } from "react-icons/fa";
import { MdDescription } from "react-icons/md";

import SectionHeader from "../lembaga/shared/sectionheader";
import useSectionAnimation from "../lembaga/shared/useSectionanimation";
import { getBerkasFileName } from "../../../data/berkasSeed";

/* ─── Data Jenis Layanan ─── */
const jenisLayanan = [
  "Surat Keterangan Ahli Waris (SKAW)",
  "Surat Keterangan Air",
  "Surat Keterangan Belum Pernah Menikah (SKBM)",
  "Surat Keterangan Duda/Janda (SKDJ)",
  "Surat Keterangan Meninggal Dunia (SKMD)",
  "Surat Keterangan Cerai",
  "Surat Keterangan Berdomisili Baik (SKBB)",
  "Surat Keterangan Domisili Perusahaan (SKDP)",
  "Surat Keterangan Kurang Mampu (SKKM)",
  "Surat Keterangan Penduduk (SKP)",
  "Surat Keterangan Penghasilan",
  "Surat Keterangan Jual Beli Tanah",
  "Surat Keterangan Belum Memiliki Rumah (SKBMR)",
  "Surat Izin/Rekomendasi Keramaian",
  "Surat Pengantar Nikah",
  "Pelayanan Pengaduan",
];

/* ─── Service Card ─── */
function ServiceCard({ layanan, index }) {
  const fileName = getBerkasFileName(layanan);

  const handleDownload = () => {
    const url = `${import.meta.env.BASE_URL}berkas/${fileName}`;
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isAvailable = Boolean(fileName);

  return (
    <div
      data-card
      className="group relative border-2 border-stone-700/70 bg-stone-900/60 p-5 transition-all duration-300 hover:border-amber-600/40 hover:bg-stone-900/80 hover:-translate-y-1"
    >
      {/* Icon */}
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center border-2 border-stone-700 bg-stone-800/80 transition-all duration-300 group-hover:border-amber-600/40">
        <FaFileAlt className="h-6 w-6 text-amber-400/70 transition-all duration-300 group-hover:text-amber-400" />
      </div>

      {/* Nomor urut */}
      <span className="mb-2 block text-center text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600">
        Layanan #{String(index + 1).padStart(2, "0")}
      </span>

      {/* Nama layanan */}
      <p className="mb-4 flex min-h-12 items-center justify-center text-center text-sm font-bold leading-snug text-white">
        {layanan}
      </p>

      {/* Tombol Download */}
      <div className="flex justify-center">
        {isAvailable ? (
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 border border-amber-600/30 bg-amber-900/20 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-amber-400/80 transition-all duration-300 hover:bg-amber-800/40 hover:text-amber-300 cursor-pointer"
          >
            <FaDownload className="h-3.5 w-3.5" />
            Unduh Berkas
          </button>
        ) : (
          <span className="inline-flex items-center gap-2 border border-stone-700/70 bg-stone-800/40 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-stone-500">
            <FaDownload className="h-3.5 w-3.5" />
            Segera Hadir
          </span>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
    MAIN COMPONENT
   ════════════════════════════════════════ */
export default function Administrasi() {
  const sectionRef = useRef(null);

  useSectionAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="relative z-10">
      <div data-sec>
        <SectionHeader
          icon={MdDescription}
          title="Pelayanan Surat"
          subtitle="Daftar layanan surat yang tersedia di Pemerintah Nagari Tanjuang Baringin. Pilih jenis surat untuk melihat persyaratan dan mengunduh formulir yang diperlukan."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jenisLayanan.map((item, idx) => (
            <ServiceCard key={idx} layanan={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
