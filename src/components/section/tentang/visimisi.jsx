import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaEye } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const misiData = [
  {
    icon: "⚡",
    title: "Pelayanan Profesional",
    description:
      "Memberikan pelayanan kepada masyarakat secara cepat, tepat, akurat, dan sesuai dengan peraturan yang berlaku.",
  },
  {
    icon: "⚖️",
    title: "Pelayanan yang Berkeadilan",
    description:
      "Menyelenggarakan pelayanan publik secara adil, setara, dan tanpa membedakan latar belakang masyarakat.",
  },
  {
    icon: "📚",
    title: "Peningkatan Kompetensi Aparatur",
    description:
      "Mengembangkan kapasitas aparatur melalui peningkatan pengetahuan, keterampilan, serta pemanfaatan ilmu pengetahuan dan teknologi.",
  },
  {
    icon: "🤝",
    title: "Pelayanan Humanis",
    description:
      "Mewujudkan pelayanan yang ramah, santun, responsif, dan mengutamakan kepuasan masyarakat.",
  },
  {
    icon: "📈",
    title: "Efektivitas dan Efisiensi Kerja",
    description:
      "Mengoptimalkan tata kelola pelayanan agar lebih efektif, efisien, dan berorientasi pada hasil.",
  },
  {
    icon: "💡",
    title: "Inovasi Pelayanan Berkelanjutan",
    description:
      "Mengembangkan inovasi pelayanan secara berkesinambungan untuk meningkatkan kualitas layanan kepada masyarakat.",
  },
];

const visiText =
  "Mewujudkan Pelayanan Prima Kepada Masyarakat Yang Memenuhi Standar Pelayanan Publik";

export default function VisiMisi() {
  const sectionRef = useRef(null);
  const visiRef = useRef(null);
  const misiGridRef = useRef(null);
  const mottoRef = useRef(null);

  /* ── Entrance animations ───────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ===============================
        VISI
    =============================== */
      const visi = visiRef.current;

      if (visi) {
        gsap.fromTo(
          visi.querySelectorAll("[data-anim]"),
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: visi,
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      /* ===============================
        MISI CARDS
    =============================== */
      const cards = misiGridRef.current?.querySelectorAll("[data-card]");

      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: i % 2 === 0 ? -30 : 30,
              y: 20,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                once: true,
              },
            },
          );
        });
      }

      /* ===============================
        CERDAS SECTION
    =============================== */
      const motto = mottoRef.current;

      if (motto) {
        // Badge
        gsap.from(motto.querySelector("[data-badge]"), {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: motto,
            start: "top 80%",
            once: true,
          },
        });

        // CERDAS
        gsap.from(motto.querySelectorAll("[data-letter]"), {
          opacity: 0,
          y: 50,
          scale: 0.6,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: motto,
            start: "top 80%",
            once: true,
          },
        });

        // Subtitle
        gsap.from(motto.querySelector("[data-subtitle]"), {
          opacity: 0,
          y: 20,
          delay: 0.3,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: motto,
            start: "top 80%",
            once: true,
          },
        });

        // Line
        gsap.from(motto.querySelector("[data-line]"), {
          scaleX: 0,
          transformOrigin: "center",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: motto,
            start: "top 80%",
            once: true,
          },
        });

        // Pills
        gsap.from(motto.querySelectorAll("[data-pill]"), {
          opacity: 0,
          y: 30,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: motto,
            start: "top 80%",
            once: true,
          },
        });

        // Description
        gsap.from(motto.querySelector("[data-description]"), {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: motto,
            start: "top 80%",
            once: true,
          },
        });

        // Glow breathing
        gsap.to(".motto-glow", {
          scale: 1.15,
          repeat: -1,
          yoyo: true,
          duration: 3,
          ease: "sine.inOut",
        });
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
                  className={`group relative rounded-none border border-stone-800/60 bg-stone-900/40 p-6 sm:p-8 transition-all duration-300 cursor-pointer hover:bg-stone-900/60 hover:border-stone-700/60 ${
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
      <section
        ref={mottoRef}
        data-quote
        className="relative z-10 overflow-hidden pb-32 pt-10"
      >
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="
      motto-glow
      absolute
      left-1/2
      top-1/2
      h-80
      w-80
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      bg-amber-400/10
      blur-[130px]
    "
          />
        </div>

        <div className="relative mx-auto max-w-5xl px-6">
          {/* Badge */}
          <div data-badge className="flex justify-center">
            <div
              className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-amber-400/20
        bg-amber-400/10
        px-5
        py-2
      "
            >
              <RiCustomerService2Fill className="text-amber-300" />

              <span
                className="
          text-xs
          uppercase
          tracking-[0.3em]
          text-amber-300
        "
              >
                Moto Pelayanan
              </span>
            </div>
          </div>

          {/* CERDAS */}
          <div
            className="
      mt-10
      flex
      justify-center
      gap-3
      sm:gap-5
    "
          >
            {"CERDAS".split("").map((letter) => (
              <span
                key={letter}
                data-letter
                className="
          text-4xl
          sm:text-6xl
          lg:text-7xl
          font-black
          tracking-wide
          text-transparent
          bg-linear-to-r
          from-yellow-300
          via-amber-400
          to-yellow-300
          bg-clip-text
        "
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Subtitle */}
          <p
            data-subtitle
            className="
      mt-5
      text-center
      uppercase
      tracking-[0.25em]
      text-xs
      text-stone-500
    "
          >
            Cepat • Efisien • Responsif • Disiplin • Akuntabel • Sopan
          </p>

          {/* Line */}
          <div
            data-line
            className="
      mx-auto
      mt-8
      h-px
      w-48
      bg-linear-to-r
      from-transparent
      via-amber-400
      to-transparent
    "
          />

          {/* Description */}
          <div
            data-description
            className="
      mx-auto
      mt-14
      max-w-3xl
      text-center
    "
          >
            <p
              className="
        text-base
        leading-8
        text-stone-400
      "
            >
              <span className="font-semibold text-amber-300">CERDAS</span>{" "}
              merupakan moto pelayanan Kantor Wali Nagari Tanjuang Baringin
              sebagai komitmen untuk memberikan pelayanan publik yang cepat,
              efisien, responsif, disiplin, akuntabel, serta menjunjung tinggi
              kesopanan kepada seluruh masyarakat.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
