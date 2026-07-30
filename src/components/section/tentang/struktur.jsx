import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp, FaUserCircle } from "react-icons/fa";
import { MdGroups, MdAccountBalance } from "react-icons/md";

//Pimpinan//
import WaliNagari from "../../../assets/sotk/pimpinan/walnag.webp";
import SekretarisNagari from "../../../assets/sotk/pimpinan/sesnag.webp";

//Kasi//
import KasiPemerintahan from "../../../assets/sotk/kasi/pemerintahan.webp";
import KasiKesra from "../../../assets/sotk/kasi/kesra.webp";
import KasiPelayanan from "../../../assets/sotk/kasi/pelayanan.webp";

//Kaur//
import KaurKeuangan from "../../../assets/sotk/kaur/keuangan.webp";
import KaurTataUsahaDanUmum from "../../../assets/sotk/kaur/tatausahadanumum.webp";
import KaurPerencanaan from "../../../assets/sotk/kaur/perencanaan.webp";

//Staf//
import StafPemerintahan from "../../../assets/sotk/staf/pemerintahan/pemerintahan.webp";
import StafKesra from "../../../assets/sotk/staf/kesra/kesra.webp";
import StafKesra1 from "../../../assets/sotk/staf/kesra/kesra1.webp";
import StafPelayanan from "../../../assets/sotk/staf/pelayanan/pelayanan.webp";
import StafKeuangan from "../../../assets/sotk/staf/keuangan/keuangan.webp";
import StafKeuangan1 from "../../../assets/sotk/staf/keuangan/keuangan1.webp";
import StafTataUsahaDanUmum from "../../../assets/sotk/staf/tatausahadanumum/tatausahadanumum.webp";
import StafPerencanaan from "../../../assets/sotk/staf/perencanaan/perencanaan.webp";

//Jorong//
import Jorong3 from "../../../assets/sotk/jorong/jorong3.webp";
import Jorong4 from "../../../assets/sotk/jorong/jorong4.webp";
import Jorong5 from "../../../assets/sotk/jorong/jorong5.webp";

//Petugas Nagari//
import PetugasPustaka from "../../../assets/sotk/petugas/pustaka.webp";
import PetugasData from "../../../assets/sotk/petugas/data.webp";
import PetugasKeamanan from "../../../assets/sotk/petugas/keamanan.webp";


gsap.registerPlugin(ScrollTrigger);

/* ─── Data Struktur Pemerintahan ─── */
const perangkatData = [
  {
    id: 1,
    nama: "RONALD YULMASRI",
    jabatan: "Wali Nagari",
    bidanglevel: "pimpinan",
    whatsapp: "+6282130147901",
    foto: WaliNagari,
  },
  {
    id: 2,
    nama: "NENENG RIANI",
    jabatan: "Sekretaris Nagari",
    bidanglevel: "pimpinan",
    whatsapp: "+6285274885074",
    foto: SekretarisNagari,
    fotoPositionY: "-22px",
  },
  {
    id: 3,
    nama: "NUR ZAWILIS",
    jabatan: "Kasi Pemerintahan",
    bidanglevel: "kasi",
    whatsapp: "+6281261378002",
    foto: KasiPemerintahan,
  },
  {
    id: 4,
    nama: "ZUL AFRIADI",
    jabatan: "Kasi Kesejahteraan",
    bidanglevel: "kasi",
    whatsapp: "+6282389955550",
    foto: KasiKesra,
  },
  {
    id: 5,
    nama: "NOVITA SARI",
    jabatan: "Kasi Pelayanan",
    bidanglevel: "kasi",
    whatsapp: "+6282360394310",
    foto: KasiPelayanan,
    fotoPositionY: "0px",
  },
  {
    id: 6,
    nama: "MARISA RAHIM",
    jabatan: "Kaur Keuangan",
    bidanglevel: "kaur",
    whatsapp: "+6281371183789",
    foto: KaurKeuangan,
  },
  {
    id: 7,
    nama: "SUSANTI",
    jabatan: "Kaur Tata Usaha dan Umum",
    bidanglevel: "kaur",
    whatsapp: "+6282386813802",
    foto: KaurTataUsahaDanUmum,
  },
  {
    id: 8,
    nama: "MELFI ARIANSYAH",
    jabatan: "Kaur Perencanaan",
    bidanglevel: "kaur",
    whatsapp: "+6281363179169",
    foto: KaurPerencanaan,
  },
];

const stafData = [
  {
    id: 9,
    nama: "SYAHRIAL",
    jabatan: "Staf Kasi Pemerintahan",
    bidanglevel: "staf",
    whatsapp: "+6281266094409",
    foto: StafPemerintahan,
    fotoPositionY: "-8px",
  },
  {
    id: 10,
    nama: "SUCI DWI RAMADHANI",
    jabatan: "Staf Kasi Kesra",
    bidanglevel: "staf",
    whatsapp: "+6282135539302",
    foto: StafKesra,
  },
  {
    id: 11,
    nama: "RANDI MULYADI",
    jabatan: "Staf Kasi Kesra",
    bidanglevel: "staf",
    whatsapp: "+6282384045101",
    foto: StafKesra1,
    fotoPositionY: "-20px",
  },
  {
    id: 12,
    nama: "MIRA OKTAVIA",
    jabatan: "Staf Kasi Pelayanan",
    bidanglevel: "staf",
    whatsapp: "+6281378838489",
    foto: StafPelayanan,
    fotoPositionY: "-30px",
  },
  {
    id: 13,
    nama: "DESMARNI",
    jabatan: "Staf Kaur Keuangan",
    bidanglevel: "staf",
    whatsapp: "+6282169075120",
    foto: StafKeuangan,
  },
  {
    id: 14,
    nama: "NORA YULIASMI",
    jabatan: "Staf Kaur Keuangan",
    bidanglevel: "staf",
    whatsapp: "+6282391255231",
    foto: StafKeuangan1,
    fotoPositionY: "0px",
  },
  {
    id: 15,
    nama: "RAHMADANI",
    jabatan: "Staf Kaur Tata Usaha dan Umum",
    bidanglevel: "staf",
    whatsapp: "+6282386832296",
    foto: StafTataUsahaDanUmum,
    fotoPositionY: "0px",
  },
  {
    id: 16,
    nama: "DONI IKHWAN",
    jabatan: "Staf Kaur Perencanaan",
    bidanglevel: "staf",
    whatsapp: "+6281270035289",
    foto: StafPerencanaan,
    fotoPositionY: "-30px",
  },
];

/* ─── Data Jorong ─── */
const jorongData = [
  {
    id: 17,
    nama: "ERI YANTO",
    jabatan: "Kepala Jorong Tigo",
    whatsapp: "+6282262640158",
    foto: Jorong3,
  },
  {
    id: 18,
    nama: "ZAIDIRMAN",
    jabatan: "Kepala Jorong Ampek",
    whatsapp: "+6281374132864",
    foto: Jorong4,
    fotoPositionY: "-4px",
  },
  {
    id: 19,
    nama: "IWAN PUTRA",
    jabatan: "Kepala Jorong Limo",
    whatsapp: "+6282171639171",
    foto: Jorong5,
    fotoPositionY: "-28px",
  },
];


/* ─── Data Petugas Nagari ─── */
const petugasData = [
  {
    id: 20,
    nama: "YULIANSYAH",
    jabatan: "Petugas Keagamaan",
    bidanglevel: "petugas",
    whatsapp: "+6285363017284",
    foto: null,
  },
  {
    id: 21,
    nama: "MERI SATRIA",
    jabatan: "Petugas Kebersihan",
    bidanglevel: "petugas",
    whatsapp: "+6282281631035",
    foto: null,
  },
  {
    id: 22,
    nama: "PITRISNAWATI",
    jabatan: "Petugas Pustaka",
    bidanglevel: "petugas",
    whatsapp: "+6282172908568",
    foto: PetugasPustaka,
    fotoPositionY: "-28px",
  },
  {
    id: 23,
    nama: "ARDI",
    jabatan: "Petugas Keamanan",
    bidanglevel: "petugas",
    whatsapp: "+6285376310769",
    foto: PetugasKeamanan,
  },
  {
    id: 24,
    nama: "ABDULLAH NASYIR",
    jabatan: "Petugas Data",
    bidanglevel: "petugas",
    whatsapp: "+6285271195491",
    foto: PetugasData,
  },
];

/* ─── Card Komponen ─── */
function PersonCard({ data, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      onEnter: () => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0, rotateX: 5 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            ease: "power3.out",
            delay: index * 0.06,
            clearProps: "transform",
          },
        );
      },
      once: true,
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="
      group
      relative
      border-2 border-stone-700/70
      bg-stone-900/60
      p-5
      transform-gpu
      transition-all
      duration-300
      ease-out
      hover:-translate-y-1
      hover:scale-[1.02]
      hover:shadow-xl
      hover:shadow-amber-500/10
      hover:border-amber-600/40
      hover:bg-stone-900/80
      will-change-transform
    "
    >
      {/* Foto */}
      <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center overflow-hidden border-2 border-stone-700 bg-stone-800/80 transition-all duration-300 group-hover:border-amber-600/40">
        {data.foto ? (
          <img
            src={data.foto}
            alt={data.nama || data.jabatan}
            className="h-full w-full object-cover"
            style={{
              objectPosition: `center ${data.fotoPositionY || "center"}`,
            }}
          />
        ) : (
          <div className="flex flex-col items-center gap-1 text-stone-600">
            <FaUserCircle className="h-12 w-12" />
            <span className="text-[9px] uppercase tracking-widest">Foto</span>
          </div>
        )}
      </div>

      {/* Nama */}
      <p className="mb-1 text-center text-sm font-bold text-white leading-snug min-h-10 flex items-center justify-center">
        {data.nama || (
          <span className="text-stone-600 text-xs italic font-normal">
            — nama belum diisi —
          </span>
        )}
      </p>

      {/* Jabatan */}
      <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-amber-400/80">
        {data.jabatan}
      </p>

      {/* WhatsApp */}
      <div className="flex items-center justify-center gap-1.5 border-t border-stone-800 pt-3">
        {data.whatsapp ? (
          <a
            href={`https://wa.me/${data.whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-sm border border-emerald-700/40 bg-emerald-900/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400/80 transition-all hover:bg-emerald-900/40 hover:text-emerald-300"
          >
            <FaWhatsapp className="h-3 w-3" />
            Hubungi
          </a>
        ) : (
          <span className="text-[9px] uppercase tracking-widest text-stone-600 italic">
            <FaWhatsapp className="mr-1 inline h-3 w-3" />— nomor belum diisi —
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Section Header ─── */
function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="mb-10 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center border-2 border-amber-600/30 bg-amber-900/20">
        <Icon className="h-6 w-6 text-amber-400" />
      </div>
      <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
        {title}
      </h3>
      {subtitle && (
        <p className="mt-2 text-xs leading-relaxed text-stone-500 max-w-md mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-3 h-0.5 w-16 bg-amber-600/30" />
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════ */
export default function Struktur() {
  const heroRef = useRef(null);
  const sectionRef = useRef(null);

  /* ── Hero entrance ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      const items = hero.querySelectorAll("[data-hero-anim]");
      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.1,
        },
      );
    }, hero);

    return () => ctx.revert();
  }, []);

  /* ── Stagger sections on scroll ── */
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    const ctx = gsap.context(() => {
      const blocks = sec.querySelectorAll("[data-sec]");
      blocks.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(
              el,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            );
          },
          once: true,
        });
      });
    }, sec);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* ════════════════════════════════════════
          HERO
         ════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="flex min-h-[60vh] items-center justify-center pt-28 pb-16 sm:pt-32 sm:pb-20"
      >
        <div className="mx-auto max-w-4xl px-4 text-center">
          {/* Badge */}
          <div
            data-hero-anim
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-5 py-1.5 text-xs uppercase tracking-[0.2em] text-amber-400/80"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Tentang Nagari
          </div>

          {/* Title */}
          <h1
            data-hero-anim
            className="text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            Struktur Pemerintahan
            <br />
            <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent text-3xl sm:text-5xl">
              Nagari Tanjuang Baringin
            </span>
          </h1>

          {/* Garis */}
          <div
            data-hero-anim
            className="mx-auto my-6 h-0.5 w-32 rounded-full bg-linear-to-r from-transparent via-amber-400/60 to-transparent sm:w-48"
          />

          <p
            data-hero-anim
            className="mx-auto max-w-xl text-sm leading-relaxed text-stone-500"
          >
            Perangkat nagari yang bertugas melayani, mengayomi, dan membangun
            Nagari Tanjuang Baringin bersama masyarakat.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CONTENT
         ════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className="relative z-10 mx-auto max-w-6xl px-4 pb-24 sm:pb-36 space-y-24"
      >
        {/* ──── PIMPINAN ──── */}
        <div data-sec>
          <SectionHeader
            icon={MdAccountBalance}
            title="Pimpinan Nagari"
            subtitle="Wali Nagari dan Sekretaris Nagari sebagai pucuk pimpinan pemerintahan nagari"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mx-auto max-w-lg">
            {perangkatData
              .filter((d) => d.bidanglevel === "pimpinan")
              .map((d, i) => (
                <PersonCard key={d.id} data={d} index={i} />
              ))}
          </div>
        </div>

        {/* ──── KASI & KAUR ──── */}
        <div data-sec>
          <SectionHeader
            icon={MdGroups}
            title="Kepala Seksi & Kepala Urusan"
            subtitle="Pelaksana teknis di bidang pemerintahan, kesejahteraan, pelayanan, keuangan, serta umum dan perencanaan"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {perangkatData
              .filter(
                (d) => d.bidanglevel === "kasi" || d.bidanglevel === "kaur",
              )
              .map((d, i) => (
                <PersonCard key={d.id} data={d} index={i} />
              ))}
          </div>
        </div>

        {/* ──── STAF ──── */}
        <div data-sec>
          <SectionHeader
            icon={MdGroups}
            title="Staf"
            subtitle="Tenaga pendukung operasional pemerintahan dan pelayanan nagari"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {stafData
              .filter((d) => d.bidanglevel === "staf")
              .map((d, i) => (
                <PersonCard key={d.id} data={d} index={i} />
              ))}
          </div>
        </div>

        {/* ──── JORONG ──── */}
        <div data-sec>
          <SectionHeader
            icon={MdGroups}
            title="Pimpinan Jorong"
            subtitle="Wali Jorong yang memimpin pelayanan dan pembangunan di tingkat jorong"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {jorongData.map((d, i) => (
              <PersonCard key={d.id} data={d} index={i} />
            ))}
          </div>
        </div>

        {/* ──── PETUGAS NAGARI ──── */}
        <div data-sec>
          <SectionHeader
            icon={MdGroups}
            title="Petugas Nagari"
            subtitle="Tenaga pendukung operasional pemerintahan nagari"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {petugasData
              .filter((d) => d.bidanglevel === "petugas")
              .map((d, i) => (
                <PersonCard key={d.id} data={d} index={i} />
              ))}
          </div>
        </div>

        {/* ──── PENUTUP ──── */}
        <div data-sec className="border-t border-stone-800 pt-12 text-center">
          <p className="text-xs leading-relaxed text-stone-600 max-w-xl mx-auto">
            Susunan ini merupakan struktur pemerintahan Nagari Tanjuang Baringin
            berdasarkan ketentuan yang berlaku. Setiap perangkat nagari
            berkomitmen untuk memberikan pelayanan terbaik bagi masyarakat.
          </p>
        </div>
      </section>
    </div>
    
  );
}
