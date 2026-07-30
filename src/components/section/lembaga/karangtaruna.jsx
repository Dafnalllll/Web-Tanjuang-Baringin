import { useRef } from "react";
import { MdGroups } from "react-icons/md";

import SectionHeader from "./shared/sectionheader";
import PersonCard from "./shared/personscard";
import useSectionAnimation from "./shared/useSectionanimation";

import KarangTaruna1 from "../../../assets/lembaga/karangtaruna/karang1.webp";
import KarangTaruna2 from "../../../assets/lembaga/karangtaruna/karang2.webp";
import KarangTaruna3 from "../../../assets/lembaga/karangtaruna/karang3.webp";
import KarangTaruna4 from "../../../assets/lembaga/karangtaruna/karang4.webp";

/* ─── Data Karang Taruna ─── */
const karangTarunaData = [
  {
    id: 1,
    nama: "DEDI ARIANTO",
    jabatan: "Ketua",
    foto: KarangTaruna1,
  },
  {
    id: 2,
    nama: "YULIA FEBRINA",
    jabatan: "Anggota",
    foto: KarangTaruna2,
  },
  {
    id: 3,
    nama: "DESI RATNA SARI",
    jabatan: "Anggota",
    foto: KarangTaruna3,
  },
  {
    id: 4,
    nama: "DENI SAPUTRA",
    jabatan: "Anggota",
    foto: KarangTaruna4,
    fotoScale: 4.5,
    fotoPositionY: "24px",
    fotoPositionX: "10px",
  },
];

/* ════════════════════════════════════════
    MAIN COMPONENT
   ════════════════════════════════════════ */
export default function KarangTaruna() {
  const sectionRef = useRef(null);

  useSectionAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="relative z-10">
      <div data-sec>
        <SectionHeader
          icon={MdGroups}
          title="Karang Taruna"
          subtitle="Organisasi kepemudaan nagari — wadah pengembangan potensi pemuda dan pemudi dalam kegiatan sosial, kreatif, dan pembangunan"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {karangTarunaData.map((item) => (
            <PersonCard key={item.id} person={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
