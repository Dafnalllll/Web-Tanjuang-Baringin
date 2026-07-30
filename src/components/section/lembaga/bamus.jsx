import { useRef } from "react";
import { MdAccountBalance } from "react-icons/md";

import SectionHeader from "./shared/sectionheader";
import PersonCard from "./shared/personscard";
import useSectionAnimation from "./shared/useSectionanimation";

import Bamus1 from "../../../assets/lembaga/bamus/bamus1.webp";
import Bamus2 from "../../../assets/lembaga/bamus/bamus2.webp";
import Bamus3 from "../../../assets/lembaga/bamus/bamus3.webp";
import Bamus4 from "../../../assets/lembaga/bamus/bamus4.webp";
import Bamus5 from "../../../assets/lembaga/bamus/bamus5.webp";

/* ─── Data BAMUS ─── */
const bamusData = [
  {
    id: 1,
    nama: "DIDIA DHARMA",
    jabatan: "Ketua BAMUS",
    foto: Bamus1,
    fotoPositionY: "-41px",
  },
  {
    id: 2,
    nama: "DHARMA INDRA BUANA",
    jabatan: "Wakil Ketua BAMUS",
    foto: Bamus2,
    fotoPositionY: "2px",
    fotoPositionX: "-3px",
    fotoScale: 2.0,
  },
  {
    id: 3,
    nama: "ELVI SRINOVITA",
    jabatan: "Sekretaris BAMUS",
    foto: Bamus3,
    fotoPositionY: "-32px",
  },
  {
    id: 4,
    nama: "JULIARDI",
    jabatan: "Anggota BAMUS",
    foto: Bamus4,
    fotoPositionX: "-20px",
  },
  {
    id: 5,
    nama: "ZAINAL ABIDIN",
    jabatan: "Anggota BAMUS",
    foto: Bamus5,
    fotoPositionY: "-90px",
    fotoPositionX: "2px",
    fotoScale: 1.5,
  },
];

/* ════════════════════════════════════════
    MAIN COMPONENT
   ════════════════════════════════════════ */

export default function Bamus() {
  const sectionRef = useRef(null);

  useSectionAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="relative z-10">
      <div data-sec>
        <SectionHeader
          icon={MdAccountBalance}
          title="BAMUS"
          subtitle="Badan Musyawarah Nagari sebagai mitra kerja Wali Nagari dalam penyelenggaraan pemerintahan, penyaluran aspirasi masyarakat, serta pengawasan jalannya pemerintahan nagari."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bamusData.map((item) => (
            <PersonCard key={item.id} person={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
