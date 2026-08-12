import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { BookOpen, CheckCircle2, FileDown, Sparkles } from "lucide-react";
import coverImage from "../assets/produk/IDM.webp";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  "Alat ukur kemajuan dan kemandirian nagari",
  "Dasar perumusan kebijakan pembangunan",
  "Identifikasi potensi dan tantangan nagari",
];

export default function Produk() {
  const sectionRef = useRef(null);
  const entranceRef = useRef(null);
  const ringOuterRef = useRef(null);
  const ringInnerRef = useRef(null);
  const shineRef = useRef(null);
  const contentRef = useRef(null);

  /* ── 3D tilt pada cover (mouse) ── */
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 160, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 160, damping: 18 });
  const tiltX = useTransform(springX, (v) => `${v}deg`);
  const tiltY = useTransform(springY, (v) => `${v}deg`);

  /* ── Entrance + scroll animations ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* Cover muncul dengan efek pop */
      gsap.fromTo(
        entranceRef.current,
        { opacity: 0, y: 90, scale: 0.7, rotate: -6 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 1.1,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
        },
      );

      /* Ring dekoratif muncul bertahap */
      gsap.fromTo(
        [ringOuterRef.current, ringInnerRef.current],
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          stagger: 0.18,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
        },
      );

      /* Konten muncul berurutan */
      const contentItems =
        contentRef.current?.querySelectorAll("[data-content-anim]");
      if (contentItems?.length) {
        gsap.set(contentItems, { opacity: 0, y: 40 });
        gsap.to(contentItems, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 60%", once: true },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  /* ── Handler tilt 3D ── */
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 16);
    rotateX.set(-y * 16);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleCoverEnter = () => {
    if (!shineRef.current) return;
    gsap.to(shineRef.current, {
      opacity: 1,
      xPercent: 70,
      duration: 1.1,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(shineRef.current, { opacity: 0, xPercent: -130 });
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-emerald-950 px-6 py-24 sm:py-32 lg:px-12"
    >
      {/* ── Dekorasi latar ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fcd34d' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-amber-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* ══════════════ COVER BUKU ══════════════ */}
        <div className="flex justify-center">
          <div ref={entranceRef} className="relative opacity-0">
            {/* Ring luar */}
            <div
              ref={ringOuterRef}
              className="absolute -inset-4 rounded-4xl border-2 border-dashed border-amber-300/25 sm:-inset-6"
            />
            {/* Ring dalam */}
            <div
              ref={ringInnerRef}
              className="absolute -inset-2 rounded-4xl border border-amber-200/15 sm:-inset-3"
            />

            {/* Glow backdrop */}
            <div className="absolute inset-8 rounded-full bg-amber-500/20 blur-3xl transition-opacity duration-500" />

            {/* Cover dengan tilt 3D */}
            <motion.div
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
              onMouseEnter={handleCoverEnter}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
              className="group relative cursor-pointer perspective-distant"
            >
              {/* Frame + Bayangan */}
              <div
                className="relative rounded-2xl transition-all duration-500 group-hover:shadow-[0_30px_60px_-15px_rgba(251,191,36,0.35)]"
                style={{ transform: "translateZ(40px)" }}
              >
                <img
                  src={coverImage}
                  alt="Indeks Desa 2025"
                  className="w-full max-w-md rounded-2xl object-cover shadow-2xl shadow-black/50 ring-1 ring-white/10"
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-t from-black/20 via-transparent to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Kilauan saat hover */}
                <div
                  ref={shineRef}
                  className="pointer-events-none absolute inset-0 -translate-x-full overflow-hidden rounded-2xl opacity-0"
                  style={{ transform: "skewX(-18deg) translateX(-130%)" }}
                >
                  <div className="absolute inset-y-0 left-1/3 w-1/3 bg-linear-to-r from-transparent via-white/25 to-transparent" />
                </div>
              </div>

              {/* Badge melayang */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-5 z-10 flex items-center gap-2 rounded-full border border-amber-400/30 bg-emerald-950/90 px-4 py-2 shadow-lg shadow-amber-500/10 backdrop-blur-sm"
                style={{ transform: "translateZ(60px)" }}
              >
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Edisi 2025
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ══════════════ KONTEN ══════════════ */}
        <div ref={contentRef}>
          {/* Badge */}
          <div
            data-content-anim
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-5 py-1.5 text-xs uppercase tracking-[0.2em] text-amber-400/90"
          >
            <BookOpen className="h-3.5 w-3.5" />
            Publikasi Resmi Nagari
          </div>

          {/* Judul */}
          <h2
            data-content-anim
            className="text-4xl font-black leading-[1.1] tracking-tight text-white lg:text-5xl"
          >
            Indeks Desa Tahun 2025
            <span className="mt-2 block bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-3xl text-transparent lg:text-4xl">
              Nagari Tanjuang Baringin
            </span>
          </h2>

          {/* Garis dekoratif */}
          <div
            data-content-anim
            className="my-6 h-0.5 w-40 rounded-full bg-linear-to-r from-amber-400/70 to-transparent"
          />

          {/* Deskripsi */}
          <p
            data-content-anim
            className="text-justify text-base leading-relaxed text-slate-300"
          >
            <span className="font-bold text-amber-300">Indeks Desa 2025</span>{" "}
            adalah sebuah indikator tunggal yang digunakan oleh Pemerintah
            Indonesia untuk mengukur tingkat kemajuan dan kemandirian desa di
            seluruh Indonesia. Indeks ini akan menjadi alat ukur utama dalam
            menilai capaian pembangunan desa/nagari dan menjadi dasar dalam
            perumusan kebijakan pembangunan desa/nagari ke depannya. Tujuan
            dari Indeks Desa ini adalah untuk mengukur capaian pembangunan
            desa/nagari, mengidentifikasi potensi dan tantangan desa/nagari.
          </p>

          {/* Poin-poin */}
          <ul data-content-anim className="mt-6 space-y-3">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-slate-300"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Tombol unduh */}
          <div data-content-anim className="mt-9">
            <motion.a
              href="/berkas/Book.xlsx"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex items-center gap-3 rounded-full bg-linear-to-r from-amber-400 to-yellow-500 px-8 py-3.5 font-bold text-emerald-950 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-amber-400/40"
            >
              <FileDown className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
              Unduh File (Excel)
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-950/30 transition-all duration-300 group-hover:scale-150" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
