import { useRef } from "react";
import { MdGroups } from "react-icons/md";

import SectionHeader from "./shared/sectionheader";
import PersonCard from "./shared/personscard";
import useSectionAnimation from "./shared/useSectionanimation";

/* ─── Data Bundo Kanduang ─── */
const bundoKanduangData = [
  {
    id: 1,
    nama: "HELDIZA SILVIANDARI",
    foto: null,
  },
  {
    id: 2,
    nama: "NOVERITA B",
    foto: null,
  },
  {
    id: 3,
    nama: "NOVALINA",
    foto: null,
  },
  {
    id: 4,
    nama: "MARDIANA",
    foto: null,
  },
  {
    id: 5,
    nama: "VIKA WINDARI",
    foto: null,
  },
  {
    id: 6,
    nama: "NUR EDEFI",
    foto: null,
  },
  {
    id: 7,
    nama: "SUSANTI",
    foto: null,
  },
  {
    id: 8,
    nama: "DESMI WIDYA",
    foto: null,
  },
  {
    id: 9,
    nama: "IRMAWATI",
    foto: null,
  },
  {
    id: 10,
    nama: "RESTIA FITRI",
    foto: null,
  },
  {
    id: 11,
    nama: "APRISDA ROYANI",
    foto: null,
  },
  {
    id: 12,
    nama: "ADRI YENI",
    foto: null,
  },
  {
    id: 13,
    nama: "ERMAWATI",
    foto: null,
  },
  {
    id: 14,
    nama: "MAILINA",
    foto: null,
  },
  {
    id: 15,
    nama: "DESI ARISANDI",
    foto: null,
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
