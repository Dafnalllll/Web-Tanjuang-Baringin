import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { gsap } from "gsap";
import type { ComponentType } from "react";
import Bamus from "../components/section/lembaga/bamus";
import KarangTaruna from "../components/section/lembaga/karangtaruna";
import LPMN from "../components/section/lembaga/lpmn";
import NiniakMamak from "../components/section/lembaga/niniakmamak";
import BundoKanduang from "../components/section/lembaga/bundokanduang";
import PKK from "../components/section/lembaga/pkk";
import BUMNAG from "../components/section/lembaga/bumnag";

const komponen: Record<string, ComponentType> = {
  "bamus": Bamus,
  "karang-taruna": KarangTaruna,
  "lpmn": LPMN,
  "niniak-mamak": NiniakMamak,
  "bundo-kanduang": BundoKanduang,
  "pkk": PKK,
  "bumnag": BUMNAG,
};

export default function Lembaga() {
  const { "*": slug } = useParams();
  const Komponen = slug ? komponen[slug] : undefined;
  const heroRef = useRef<HTMLDivElement>(null);

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
    <div className="relative min-h-screen bg-emerald-950 overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fcd34d' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Blob */}
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-amber-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 -right-40 w-80 h-80 rounded-full bg-yellow-800/10 blur-[100px] pointer-events-none" />

      {/* ════════════════════════════════════════
          HERO
         ════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative z-10 flex min-h-[60vh] items-center justify-center pt-28 pb-16 sm:pt-32 sm:pb-20"
      >
        <div className="mx-auto max-w-4xl px-4 text-center">
          {/* Badge */}
          <div
            data-hero-anim
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-5 py-1.5 text-xs uppercase tracking-[0.2em] text-amber-400/80"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Lembaga Nagari
          </div>

          {/* Title */}
          <h1
            data-hero-anim
            className="text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            Lembaga
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
            Lembaga kemasyarakatan dan adat nagari yang bersinergi membangun
            Nagari Tanjuang Baringin.
          </p>
        </div>
      </section>

      {/* Content komponen lembaga */}
      {Komponen ? <Komponen /> : null}
    </div>
  );
}
