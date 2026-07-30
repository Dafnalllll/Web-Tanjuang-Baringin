import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Administrasi from "../components/section/pelayanan/administrasi";

gsap.registerPlugin(ScrollTrigger);

export default function Pelayanan() {
  const heroRef = useRef(null);
  const { pathname } = useLocation();

  /* ── Hero entrance ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      const items = hero.querySelectorAll("[data-hero-anim]");

      gsap.set(items, {
        opacity: 0,
        y: 50,
      });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: hero,
          start: "top 75%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    }, hero);

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
            Pelayanan Nagari
          </div>

          {/* Title */}
          <h1
            data-hero-anim
            className="text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            Layanan Administrasi
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
            Informasi lengkap layanan administrasi surat-menyurat dan
            pelayanan publik Nagari Tanjuang Baringin yang dapat diakses
            oleh masyarakat.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          Sections
         ════════════════════════════════════════ */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-24 sm:pb-36">
        {(pathname === "/pelayanan/administrasi" ||
          pathname === "/pelayanan") && <Administrasi />}
      </section>
    </div>
  );
}
