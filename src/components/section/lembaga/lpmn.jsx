import { useRef } from "react";
import { MdGroups } from "react-icons/md";

import SectionHeader from "./shared/sectionheader";
import PersonCard from "./shared/personscard";
import useSectionAnimation from "./shared/useSectionanimation";

import LPMN1 from "../../../assets/lembaga/lpmn/lpmn1.webp";
import LPMN2 from "../../../assets/lembaga/lpmn/lpmn2.webp";

/* ─── Data LPMN ─── */
const lpmnData = [
  {
    id: 1,
    nama: "NUR SETIA RUDI",
    jabatan: "Ketua LPMN",
    foto: LPMN1,
  },
  {
    id: 2,
    nama: "FIKA ZULFANANDA",
    jabatan: "Sekretaris  LPMN",
    foto: LPMN2,
    fotoPositionX: "-10px",
    fotoPositionY: "-20px",
    fotoScale: 2.5,
  },
];

/* ════════════════════════════════════════
    MAIN COMPONENT
   ════════════════════════════════════════ */
export default function LPMN() {
  const sectionRef = useRef(null);
  useSectionAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="relative z-10">
      <div data-sec>
        <SectionHeader
          icon={MdGroups}
          title="LPMN"
          subtitle="Lembaga Pemberdayaan Masyarakat Nagari — mitra strategis dalam perencanaan, pelaksanaan, dan pengendalian pembangunan nagari"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {lpmnData.map((item) => (
            <PersonCard key={item.id} person={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
