import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaEye, FaBullseye } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const misiData = [
  {
    icon: "🤝",
    title: "Penguatan Kelembagaan",
    description:
      "Memperkuat kelembagaan nagari yang transparan, akuntabel, dan partisipatif berbasis adat dan syarak.",
  },
  {
    icon: "👥",
    title: "Pemberdayaan Masyarakat",
    description:
      "Meningkatkan kapasitas dan kemandirian masyarakat melalui program pemberdayaan ekonomi, pendidikan, dan kesehatan.",
  },
  {
    icon: "🌿",
    title: "Pelestarian Budaya & Lingkungan",
    description:
      "Melestarikan nilai-nilai adat, budaya Minangkabau, serta menjaga kelestarian lingkungan dan sumber daya alam nagari.",
  },
  {
    icon: "📖",
    title: "Pendidikan & Literasi",
    description:
      "Mendorong peningkatan kualitas pendidikan dan literasi digital bagi seluruh lapisan masyarakat nagari.",
  },
  {
    icon: "⚖️",
    title: "Keadilan & Kesejahteraan",
    description:
      "Mewujudkan keadilan sosial dan kesejahteraan merata melalui pembangunan infrastruktur dan layanan publik yang inklusif.",
  },
  {
    icon: "✨",
    title: "Inovasi & Digitalisasi",
    description:
      "Mengembangkan pelayanan publik berbasis digital dan mendorong inovasi di berbagai sektor untuk nagari yang modern dan kompetitif.",
  },
];

const visiText =
  "Terwujudnya Nagari Tanjuang Baringin yang Madani, Sejahtera, dan Berbudaya Berlandaskan Adat Basandi Syarak, Syarak Basandi Kitabullah";

export default function VisiMisi() {
  const sectionRef = useRef(null);
  const visiRef = useRef(null);
  const misiGridRef = useRef(null);

  /* ── Entrance animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const visi = visiRef.current;
      if (visi) {
        gsap.fromTo(
          visi.querySelectorAll("[data-anim]"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: visi, start: "top 80%", once: true },
          }
        );
      }

      const cards = misiGridRef.current?.querySelectorAll("[data-card]");
      if (cards) {
        cards.forEach((card, i) => {
          const dir = i % 2 === 0 ? -30 : 30;
          gsap.fromTo(
            card,
            { x: dir, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                once: true,
              },
            }
          );
        });
      }

      const quote = sectionRef.current?.querySelector("[data-quote]");
      if (quote) {
        gsap.fromTo(
          quote,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: quote, start: "top 85%", once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="visi-misi"
      ref={sectionRef}
      className="relative overflow-hidden bg-emerald-950"
    >
      {/* ── Background texture ── */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fcd34d' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Organic shape blobs ── */}
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-amber-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 -right-40 w-80 h-80 rounded-full bg-yellow-800/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-emerald-900/10 blur-[80px] pointer-events-none" />

      {/* ════════════════════════════════════════
          VISI
         ════════════════════════════════════════ */}
      <section
        ref={visiRef}
        className="relative z-10 pt-28 pb-20 sm:pt-36 sm:pb-28"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16 items-center">
            {/* ── Label col ── */}
            <div className="lg:col-span-2" data-anim>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400 bg-amber-900/15 text-amber-400 text-xs font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Arahan Utama
              </div>
              <h2 className="mt-6 text-5xl sm:text-6xl font-black tracking-tight text-white leading-[0.9]">
                Visi
                <span className="block mt-2 text-3xl sm:text-4xl font-normal text-stone-400">
                  Nagari
                </span>
              </h2>
            </div>

            {/* ── Text col ── */}
            <div className="lg:col-span-3" data-anim>
              <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-400">
                <FaEye className="absolute -left-3 top-0 w-6 h-6 text-amber-400 bg-emerald-950" />
                <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-stone-200 font-serif italic">
                  &ldquo;{visiText}&rdquo;
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.15em] text-stone-500 font-medium">
                  &mdash; Cita-cita bersama Nagari Tanjuang Baringin
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="h-px bg-linear-to-r from-transparent via-amber-800/30 to-transparent" />
      </div>

      {/* ════════════════════════════════════════
          MISI
         ════════════════════════════════════════ */}
      <section className="relative z-10 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          {/* ── Header ── */}
          <div className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400 bg-amber-900/15 text-amber-400 text-xs font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Enam Pilar
              </div>
              <h2 className="mt-4 text-5xl sm:text-6xl font-black tracking-tight text-white leading-[0.9]">
                Misi
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-stone-500">
              Enam pilar utama dalam mewujudkan visi nagari yang madani,
              sejahtera, dan berbudaya
            </p>
          </div>

          {/* ── Misi Cards (asymmetric layout) ── */}
          <div
            ref={misiGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {misiData.map((misi, idx) => {
              const isTall = idx === 0 || idx === 3;
              return (
                <div
                  key={misi.title}
                  data-card
                  className={`group relative rounded-none border border-stone-800/60 bg-stone-900/40 p-6 sm:p-8 transition-all duration-300 hover:bg-stone-900/60 hover:border-stone-700/60 ${
                    isTall ? "sm:row-span-2 flex flex-col" : ""
                  }`}
                >
                  {/* ── Corner accent ── */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* ── Number ── */}
                  <span className="absolute top-4 right-4 text-4xl font-black text-stone-700 select-none leading-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* ── Emoji icon ── */}
                  <span className="block text-3xl mb-4" aria-hidden="true">
                    {misi.icon}
                  </span>

                  {/* ── Content ── */}
                  <h3 className="text-base font-bold text-white mb-2">
                    {misi.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-stone-400">
                    {misi.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          QUOTE / PENUTUP
         ════════════════════════════════════════ */}
      <section data-quote className="relative z-10 pb-28 sm:pb-40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="relative">
            {/* ── Decorative top line ── */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-16 bg-amber-400" />
              <FaBullseye className="w-4 h-4 text-amber-400" />
              <div className="h-px w-16 bg-amber-400" />
            </div>

            <blockquote className="text-xl sm:text-2xl font-serif italic leading-relaxed text-stone-300 max-w-2xl mx-auto">
              &ldquo;Adat basandi syarak, syarak basandi Kitabullah&rdquo;
            </blockquote>

            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-stone-500">
              Filosofi hidup masyarakat Minangkabau
            </p>

            <div className="mt-12 mx-auto max-w-lg">
              <p className="text-xs leading-relaxed text-stone-600">
                Visi dan misi ini merupakan komitmen bersama antara Pemerintahan
                Nagari, BAMUS, ninik mamak, alim ulama, cadiak pandai, dan
                seluruh elemen masyarakat Nagari Tanjuang Baringin untuk
                mewujudkan masa depan yang lebih baik.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
