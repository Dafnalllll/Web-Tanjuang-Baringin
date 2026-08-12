import { useRef } from "react";
import { FaBuilding } from "react-icons/fa";

import SectionHeader from "./shared/sectionheader";
import PersonCard from "./shared/personscard";
import useSectionAnimation from "./shared/useSectionanimation";
import Bumnag1 from "../../../assets/lembaga/bumnag/bumnag.webp"

/* ─── Data BUMNAG ─── */
const bumnagData = [
  {
    id: 1,
    nama: "Andri Yuneldi",
    jabatan: "Direktur Utama BUMNag Duduak Sahamparan",
    foto: Bumnag1,
  },
];

/* ════════════════════════════════════════
    MAIN COMPONENT
   ════════════════════════════════════════ */
export default function Bumnag() {
  const sectionRef = useRef(null);

  useSectionAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="relative z-10">
      <div data-sec>
        <SectionHeader
          icon={FaBuilding}
          title="BUMNAG"
          subtitle="Badan Usaha Milik Nagari — penggerak ekonomi nagari melalui unit-unit usaha yang dikelola secara profesional dan mandiri"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bumnagData.map((item) => (
            <PersonCard key={item.id} person={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
