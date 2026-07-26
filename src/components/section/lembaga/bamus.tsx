import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp, FaUserCircle } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data BAMUS ─── */
const bamusData = [
  {
    id: 10,
    nama: "",
    jabatan: "Ketua BAMUS",
    whatsapp: "",
    foto: null,
  },
  {
    id: 11,
    nama: "",
    jabatan: "Wakil Ketua BAMUS",
    whatsapp: "",
    foto: null,
  },
  {
    id: 12,
    nama: "",
    jabatan: "Sekretaris BAMUS",
    whatsapp: "",
    foto: null,
  },
  {
    id: 13,
    nama: "",
    jabatan: "Anggota BAMUS",
    whatsapp: "",
    foto: null,
  },
  {
    id: 14,
    nama: "",
    jabatan: "Anggota BAMUS",
    whatsapp: "",
    foto: null,
  },
];

/* ─── Card Komponen ─── */
function PersonCard({ data, index }: { data: typeof bamusData[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

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
          },
        );
      },
      once: true,
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative border-2 border-stone-700/70 bg-stone-900/60 p-5 transition-all duration-300 hover:border-amber-600/40 hover:bg-stone-900/80 hover:-translate-y-1"
    >
      {/* Foto */}
      <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center overflow-hidden border-2 border-stone-700 bg-stone-800/80 transition-all duration-300 group-hover:border-amber-600/40">
        {data.foto ? (
          <img
            src={data.foto}
            alt={data.nama || data.jabatan}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-1 text-stone-600">
            <FaUserCircle className="h-12 w-12" />
            <span className="text-[9px] uppercase tracking-widest">
              Foto
            </span>
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
            <FaWhatsapp className="mr-1 inline h-3 w-3" />
            — nomor belum diisi —
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Section Header ─── */
function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
}) {
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
export default function Bamus() {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* ── Stagger cards on scroll ── */
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
    <section
      ref={sectionRef}
      className="relative z-10 mx-auto max-w-6xl px-4 pb-24 sm:pb-36"
    >
      <div data-sec>
        <SectionHeader
          icon={MdAccountBalance}
          title="BAMUS"
          subtitle="Badan Musyawarah Nagari — mitra kerja Wali Nagari dalam penetapan kebijakan dan pengawasan"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bamusData.map((d, i) => (
            <PersonCard key={d.id} data={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
