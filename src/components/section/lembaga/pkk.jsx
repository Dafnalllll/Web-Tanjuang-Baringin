import { useRef } from "react";
import { MdGroups } from "react-icons/md";

import SectionHeader from "./shared/sectionheader";
import PersonCard from "./shared/personscard";
import useSectionAnimation from "./shared/useSectionanimation";

import PKK1 from "../../../assets/lembaga/pkk/pkk1.webp";
import PKK2 from "../../../assets/lembaga/pkk/pkk2.webp";
import PKK3 from "../../../assets/lembaga/pkk/pkk3.webp";
import PKK4 from "../../../assets/lembaga/pkk/pkk4.webp";
import PKK5 from "../../../assets/lembaga/pkk/pkk5.webp";
import PKK6 from "../../../assets/lembaga/pkk/pkk6.webp";
import PKK7 from "../../../assets/lembaga/pkk/pkk7.webp";
import PKK8 from "../../../assets/lembaga/pkk/pkk8.webp";
import PKK9 from "../../../assets/lembaga/pkk/pkk9.webp";
import PKK10 from "../../../assets/lembaga/pkk/pkk10.webp";

/* ─── Data PKK ─── */
const pkkData = [
  {
    id: 1,
    nama: "NY. VERAWATI RONAL YULMASRI",
    jabatan: "Ketua",
    foto: PKK1,
  },
  {
    id: 2,
    nama: "NURHAYANI",
    jabatan: "Wakil Ketua",
    foto: PKK2,
  },
  {
    id: 3,
    nama: "NOVITA ZUL RAHMI",
    jabatan: "Sekretaris I",
    foto: PKK3,
  },
  {
    id: 4,
    nama: "SUSANTI",
    jabatan: "Sekretaris II",
    foto: PKK4,
  },
  {
    id: 5,
    nama: "FIJRI MAIWATI",
    jabatan: "Sekretaris III",
    foto: PKK5,
  },
  {
    id: 6,
    nama: "SUCI DWI RAMADHANI",
    jabatan: "Bendahara",
    foto: PKK6,
  },
  {
    id: 7,
    nama: "DWI SARTIKA",
    jabatan: "Ketua Pokja I",
    foto: PKK7,
  },
  {
    id: 8,
    nama: "SEPTRI HENITA",
    jabatan: "Ketua Pokja II",
    foto: PKK8,
  },
  {
    id: 9,
    nama: "AGUSNI SATRIA",
    jabatan: "Ketua Pokja III",
    foto: PKK9,
  },
  {
    id: 10,
    nama: "DERI BESTA SUTAKI",
    jabatan: "Ketua Pokja IV",
    foto: PKK10,
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
