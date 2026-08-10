import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaBookOpen, FaEye, FaGlobe, FaQuoteLeft, FaUserGraduate } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data Misi ─── */
const misiData = [
  {
    icon: FaBookOpen,
    title: "Pengelolaan & Pelayanan Informasi Berkualitas",
    description:
      "Meningkatkan pengelolaan dan pelayanan informasi yang berkualitas kepada masyarakat.",
  },
  {
    icon: FaGlobe,
    title: "Sistem Informasi Berbasis Website",
    description:
      "Membangun dan mengembangkan sistem penyediaan dan layanan informasi berbasis website.",
  },
  {
    icon: FaUserGraduate,
    title: "Peningkatan Sumber Daya Manusia",
    description:
      "Meningkatkan kualitas sumber daya manusia pengelola informasi dan dokumentasi.",
  },
];

/* ════════════════════════════════════════
    MAIN COMPONENT
   ════════════════════════════════════════ */
export default function VisiMisi() {
  const sectionRef = useRef(null);

  /* ── Reveal on scroll ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const blocks = section.querySelectorAll("[data-reveal]");
      blocks.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          onEnter: () => {
            gsap.fromTo(
              el,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            );
          },
          once: true,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden py-24 sm:py-32"
    >
      {/* ── Decorative blobs ── */}
      <div className="pointer-events-none absolute top-32 -right-32 h-96 w-96 rounded-full bg-amber-900/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 -left-40 h-80 w-80 rounded-full bg-yellow-800/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* ═══════════════════════════════
            SECTION HEADER
           ═══════════════════════════════ */}
        <div data-reveal className="mb-16 text-center sm:mb-20">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Visi &{" "}
            <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              Misi PPID
            </span>
          </h2>

          <div className="mx-auto mt-5 h-0.5 w-20 rounded-full bg-amber-400/60" />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Arahan dan komitmen Pejabat Pengelola Informasi dan Dokumentasi
            Nagari Tanjuang Baringin dalam mewujudkan keterbukaan informasi
            publik.
          </p>
        </div>

        {/* ═══════════════════════════════
            VISI
           ═══════════════════════════════ */}
        <div
          data-reveal
          className="relative mb-24 overflow-hidden border-2 border-stone-700/70 bg-stone-900/60 p-8 sm:p-14"
        >
          {/* Dekorasi */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
          <FaQuoteLeft className="pointer-events-none absolute top-6 left-6 h-10 w-10 text-amber-400/10" />

          <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-5 lg:gap-12">
            {/* Label */}
            <div className="lg:col-span-2 lg:border-r lg:border-stone-800 lg:pr-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
                <FaEye className="h-3 w-3" />
                Arahan Utama
              </div>
              <h3 className="text-5xl font-black tracking-tight text-white leading-[0.9] sm:text-6xl">
                Visi
                <span className="mt-2 block text-2xl font-normal text-stone-500 sm:text-3xl">
                  PPID Nagari
                </span>
              </h3>
            </div>

            {/* Teks Visi */}
            <div className="lg:col-span-3">
              <div className="relative border-l-2 border-amber-400 pl-6 sm:pl-8">
                <FaEye className="absolute -left-3.5 -top-5 h-6 w-6  text-amber-400" />
                <p className="text-lg font-serif italic leading-relaxed tracking-wide text-stone-100 uppercase sm:text-xl md:text-2xl">
                  &ldquo;Dengan Transparansi Kita Tingkatkan Kepercayaan
                  Masyarakat pada Pemerintah&rdquo;
                </p>
                <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                  &mdash; Komitmen PPID Nagari Tanjuang Baringin
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════
            MISI
           ═══════════════════════════════ */}
        <div>
          {/* Sub-header */}
          <div data-reveal className="mb-12 text-center">
            <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Misi{" "}
              <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
                PPID
              </span>
            </h3>
            <div className="mx-auto mt-3 h-0.5 w-16 rounded-full bg-amber-400/60" />
            <p className="mx-auto mt-4 max-w-xl text-xs leading-relaxed text-stone-500 sm:text-sm">
              Tiga langkah strategis dalam mewujudkan visi keterbukaan
              informasi publik di Nagari Tanjuang Baringin.
            </p>
          </div>

          {/* Kartu misi */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {misiData.map((misi, idx) => {
              const Icon = misi.icon;
              return (
                <div
                  key={misi.title}
                  data-reveal
                  className="group relative border-2 border-stone-700/70 bg-stone-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-600/40 hover:bg-stone-900/80"
                >
                  {/* Nomor urut */}
                  <div className="absolute top-5 right-5 text-4xl font-black text-stone-800/80 transition-colors duration-300 group-hover:text-amber-900/50 select-none">
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  <div className="mb-5 flex h-14 w-14 items-center justify-center border-2 border-stone-700 bg-stone-800/60 transition-colors duration-300 group-hover:border-amber-600/40">
                    <Icon className="h-6 w-6 text-amber-400/80" />
                  </div>

                  <h4 className="text-sm font-bold leading-snug text-white uppercase sm:text-base">
                    {misi.title}
                  </h4>

                  <p className="mt-2 text-xs leading-relaxed text-stone-500">
                    {misi.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
