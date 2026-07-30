import { useRef } from "react";
import { MdGroups } from "react-icons/md";

import SectionHeader from "./shared/sectionheader";
import PersonCard from "./shared/personscard";
import useSectionAnimation from "./shared/useSectionanimation";

import Bundo1 from "../../../assets/lembaga/bundo/bundo1.webp";
import Bundo2 from "../../../assets/lembaga/bundo/bundo2.webp";
import Bundo3 from "../../../assets/lembaga/bundo/bundo3.webp";
import Bundo4 from "../../../assets/lembaga/bundo/bundo4.webp";
import Bundo5 from "../../../assets/lembaga/bundo/bundo5.webp";
import Bundo6 from "../../../assets/lembaga/bundo/bundo6.webp";
import Bundo7 from "../../../assets/lembaga/bundo/bundo7.webp";
import Bundo8 from "../../../assets/lembaga/bundo/bundo8.webp";
import Bundo9 from "../../../assets/lembaga/bundo/bundo9.webp";
import Bundo10 from "../../../assets/lembaga/bundo/bundo10.webp";
import Bundo11 from "../../../assets/lembaga/bundo/bundo11.webp";
import Bundo12 from "../../../assets/lembaga/bundo/bundo12.webp";
import Bundo13 from "../../../assets/lembaga/bundo/bundo13.webp";
import Bundo14 from "../../../assets/lembaga/bundo/bundo14.webp";
import Bundo15 from "../../../assets/lembaga/bundo/bundo15.webp";

/* ─── Data Bundo Kanduang ─── */
const bundoKanduangData = [
  {
    id: 1,
    nama: "HELDIZA SILVIANDARI",
    foto: Bundo1,
    fotoPositionY: "-12px",
    fotoPositionX: "-1px",
    fotoScale: 2.0,
  },
  {
    id: 2,
    nama: "NOVERITA B",
    foto: Bundo2,
  },
  {
    id: 3,
    nama: "NOVALINA",
    foto: Bundo3,
    fotoPositionX: "1px",
    fotoPositionY: "-1px",
  },
  {
    id: 4,
    nama: "MARDIANA",
    foto: Bundo4,
    fotoPositionY: "-44px",
    fotoPositionX: "-4px",
    fotoScale: 1.6,
  },
  {
    id: 5,
    nama: "VIKA WINDARI",
    foto: Bundo5, 
  },
  {
    id: 6,
    nama: "NUR EDEFI",
    foto: Bundo6,
    fotoPositionY: "-1px",
  },
  {
    id: 7,
    nama: "SUSANTI",
    foto: Bundo7,
    fotoPositionY: "-18px",
  },
  {
    id: 8,
    nama: "DESMI WIDYA",
    foto: Bundo8,
  },
  {
    id: 9,
    nama: "IRMAWATI",
    foto: Bundo9,
    fotoPositionY: "-34px",
  },
  {
    id: 10,
    nama: "RESTIA FITRI",
    foto: Bundo10,
    fotoPositionY: "-25px",
  },
  {
    id: 11,
    nama: "APRISDA ROYANI",
    foto: Bundo11,
    fotoPositionY: "-20px",
  },
  {
    id: 12,
    nama: "ADRI YENI",
    foto: Bundo12,
    fotoScale: 3.0,
    fotoPositionY: "-10px",
    fotoPositionX: "2px",
  },
  {
    id: 13,
    nama: "ERMAWATI",
    foto: Bundo13,
  },
  {
    id: 14,
    nama: "MAILINA",
    foto: Bundo14,
  },
  {
    id: 15,
    nama: "DESI ARISANDI",
    foto: Bundo15,
  },
];

/* ════════════════════════════════════════
    MAIN COMPONENT
   ════════════════════════════════════════ */
export default function BundoKanduang() {
  const sectionRef = useRef(null);

  useSectionAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="relative z-10">
      <div data-sec>
        <SectionHeader
          icon={MdGroups}
          title="Bundo Kanduang"
          subtitle="Organisasi kaum perempuan nagari — pelestari adat dan budaya, serta penggerak pemberdayaan perempuan Minangkabau"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bundoKanduangData.map((item) => (
            <PersonCard key={item.id} person={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
