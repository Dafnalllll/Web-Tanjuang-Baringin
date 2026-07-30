import { useRef } from "react";
import { MdGroups } from "react-icons/md";

import SectionHeader from "./shared/sectionheader";
import PersonCard from "./shared/personscard";
import useSectionAnimation from "./shared/useSectionanimation";

/* ─── Data Karang Taruna ─── */
const karangTarunaData = [
  {
    id: 1,
    nama: "",
    jabatan: "Ketua Karang Taruna",
    foto: null,
  },
  {
    id: 2,
    nama: "",
    jabatan: "Wakil Ketua Karang Taruna",
    foto: null,
  },
  {
    id: 3,
    nama: "",
    jabatan: "Sekretaris Karang Taruna",
    foto: null,
  },
  {
    id: 4,
    nama: "",
    jabatan: "Bendahara Karang Taruna",
    foto: null,
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
