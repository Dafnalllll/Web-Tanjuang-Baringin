import { useRef } from "react";
import { MdGroups } from "react-icons/md";

import SectionHeader from "./shared/sectionheader";
import PersonCard from "./shared/personscard";
import useSectionAnimation from "./shared/useSectionanimation";

/* ─── Data PKK ─── */
const pkkData = [
  {
    id: 1,
    nama: "",
    jabatan: "Ketua PKK",
    foto: null,
  },
  {
    id: 2,
    nama: "",
    jabatan: "Wakil Ketua PKK",
    foto: null,
  },
  {
    id: 3,
    nama: "",
    jabatan: "Sekretaris PKK",
    foto: null,
  },
  {
    id: 4,
    nama: "",
    jabatan: "Bendahara PKK",
    foto: null,
  },
];

/* ════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════ */
export default function PKK() {
  const sectionRef = useRef(null);

  useSectionAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="relative z-10">
      <div data-sec>
        <SectionHeader
          icon={MdGroups}
          title="PKK"
          subtitle="Pemberdayaan Kesejahteraan Keluarga — mitra pemerintah nagari dalam pemberdayaan perempuan dan keluarga"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pkkData.map((item) => (
            <PersonCard key={item.id} person={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
