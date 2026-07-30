import { useRef } from "react";
import { MdGroups } from "react-icons/md";

import SectionHeader from "./shared/sectionheader";
import PersonCard from "./shared/personscard";
import useSectionAnimation from "./shared/useSectionanimation";

import NiniakMamak1 from "../../../assets/lembaga/niniakmamak/niniakmamak1.webp";
import NiniakMamak2 from "../../../assets/lembaga/niniakmamak/niniakmamak2.webp";
import NiniakMamak3 from "../../../assets/lembaga/niniakmamak/niniakmamak3.webp";
import NiniakMamak4 from "../../../assets/lembaga/niniakmamak/niniakmamak4.webp";
import NiniakMamak5 from "../../../assets/lembaga/niniakmamak/niniakmamak5.webp";
import NiniakMamak6 from "../../../assets/lembaga/niniakmamak/niniakmamak6.webp";
import NiniakMamak7 from "../../../assets/lembaga/niniakmamak/niniakmamak7.webp";
import NiniakMamak8 from "../../../assets/lembaga/niniakmamak/niniakmamak8.webp";
import NiniakMamak9 from "../../../assets/lembaga/niniakmamak/niniakmamak9.webp";
import NiniakMamak10 from "../../../assets/lembaga/niniakmamak/niniakmamak10.webp";

/* ─── Data Niniak Mamak ─── */
const niniakMamakData = [
  {
    id: 1,
    nama: "RY. DT. SINARO",
    foto: NiniakMamak1,
  },
  {
    id: 2,
    nama: "R. DT. PUTIAH",
    foto: NiniakMamak2,
  },
  {
    id: 3,
    nama: "AR. DT. RAJO MALENGGANG",
    foto: NiniakMamak3,
  },
  {
    id: 4,
    nama: "JRP. NAN BAGADIANG",
    foto: NiniakMamak4,
  },
  {
    id: 5,
    nama: "E. RAJO PANDITO",
    foto: NiniakMamak5,
  },
  {
    id: 6,
    nama: "Y. KARI IBRAHIM",
    foto: NiniakMamak6,
  },
  {
    id: 7,
    nama: "OF. IMAM BASAa",
    foto: NiniakMamak7,
  },
  {
    id: 8,
    nama: "FM. KHATIB BUNGSU",
    foto: NiniakMamak8,
  },
  {
    id: 9,
    nama: "OM. DT. BGD. MAJOLELO",
    foto: NiniakMamak9,
  },
  {
    id: 10,
    nama: "Z. DT. RANGKAYO BATUAH",
    foto: NiniakMamak10,
  },
  {
    id: 11,
    nama: "DT. BANDO KAYO",
    foto: null,
  },
];

/* ════════════════════════════════════════
    MAIN COMPONENT
   ════════════════════════════════════════ */
export default function NiniakMamak() {
  const sectionRef = useRef(null);

  useSectionAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="relative z-10">
      <div data-sec>
        <SectionHeader
          icon={MdGroups}
          title="Niniak Mamak"
          subtitle="Lembaga adat nagari — penjaga dan pelestari nilai-nilai adat Minangkabau serta pembimbing dalam pengambilan keputusan nagari"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {niniakMamakData.map((item) => (
            <PersonCard key={item.id} person={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
