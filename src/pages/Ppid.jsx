import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Profil from "../components/section/ppid/profil";
import VisiMisi from "../components/section/ppid/visimisi";
import TugasFungsi from "../components/section/ppid/tugasfungsi";
import Maklumat from "../components/section/ppid/maklumat";

export default function Ppid() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const els = el.querySelectorAll("[data-hero-anim]");
      gsap.fromTo(
        els,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
        },
      );
    }, el);

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
            PPID Nagari
          </div>

          {/* Title */}
          <h1
            data-hero-anim
            className="text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            Pejabat Pengelola
            <br />
            <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent text-3xl sm:text-5xl">
              Informasi dan Dokumentasi
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
            Layanan keterbukaan informasi publik Nagari Tanjuang Baringin.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PROFIL PPID
         ════════════════════════════════════════ */}
      <Profil />

      {/* ════════════════════════════════════════
          VISI & MISI PPID
         ════════════════════════════════════════ */}
      <VisiMisi />

      {/* ════════════════════════════════════════
          TUGAS, FUNGSI & KEWENANGAN PPID
         ════════════════════════════════════════ */}
      <TugasFungsi />

      {/* ════════════════════════════════════════
          MAKLUMAT PELAYANAN PPID
         ════════════════════════════════════════ */}
      <Maklumat />
    </div>
  );
}
