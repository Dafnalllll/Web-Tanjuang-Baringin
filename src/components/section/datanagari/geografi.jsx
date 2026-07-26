import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaMapMarkedAlt,
  FaMountain,
  FaWater,
  FaTree,
  FaTemperatureHigh,
  FaRulerCombined,
} from "react-icons/fa";
import { MdAgriculture, MdOutlineLandscape } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════
   DATA
   ═══════════════════════════════════════ */

/* ─── Luas Wilayah per Jorong ─── */
const luasWilayahData = [
  { jorong: "Aie Angek", luas: 425, persen: 28.3 },
  { jorong: "Kampuang Tangah", luas: 510, persen: 34.0 },
  { jorong: "Sawah Laweh", luas: 565, persen: 37.7 },
];

const totalLuas = luasWilayahData.reduce((sum, d) => sum + d.luas, 0);

/* ─── Kondisi Geografis ─── */
const kondisiGeografis = [
  {
    icon: FaTemperatureHigh,
    label: "Suhu Rata-rata",
    value: "22°C – 32°C",
    desc: "Iklim tropis dengan suhu sejuk khas dataran tinggi",
  },
  {
    icon: FaMountain,
    label: "Ketinggian",
    value: "350 – 500 mdpl",
    desc: "Berada di dataran tinggi Pasaman",
  },
  {
    icon: MdAgriculture,
    label: "Jenis Tanah",
    value: "Andosol & Latosol",
    desc: "Tanah vulkanik subur untuk pertanian",
  },
  {
    icon: FaTree,
    label: "Vegetasi Dominan",
    value: "Sawit, Karet, Kakao",
    desc: "Komoditas unggulan masyarakat nagari",
  },
  {
    icon: FaRulerCombined,
    label: "Luas Wilayah",
    value: `${totalLuas} Ha`,
    desc: "Tersebar di 3 jorong",
  },
  {
    icon: MdOutlineLandscape,
    label: "Topografi",
    value: "Bergelombang & Berbukit",
    desc: "Kemiringan lahan 8–25%",
  },
];

/* ─── Nama Sungai ─── */
const sungaiData = [
  { nama: "Batang Air Aie Angek", panjang: "4.2 km", status: "Permanen" },
  { nama: "Batang Air Kampuang Tangah", panjang: "3.8 km", status: "Permanen" },
  { nama: "Batang Air Sawah Laweh", panjang: "5.1 km", status: "Permanen" },
  { nama: "Batang Air Lubuk Sikaping", panjang: "6.5 km", status: "Permanen" },
  { nama: "Batang Air Durian Tinggi", panjang: "2.9 km", status: "Musiman" },
];

/* ═══════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════ */

/* ─── Section Header ala Statistik ─── */
function SectionHeader({ title, subtitle, badge }) {
  return (
    <div className="mb-16 text-center">
      {badge && (
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/80">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          {badge}
        </div>
      )}

      <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
        {title}{" "}
        <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
          {subtitle}
        </span>
      </h2>

      {title && subtitle && (
        <div className="mx-auto mt-5 h-0.5 w-20 rounded-full bg-amber-400/60" />
      )}
    </div>
  );
}

/* ─── Card Stat ala Statistik ─── */
function StatCard({ children, className = "" }) {
  return (
    <div
      className={`group relative border-2 border-stone-800/60 bg-stone-900/40 p-7 transition-all duration-300 cursor-pointer hover:bg-stone-900/60 ${className}`}
    >
      {/* Corner accents */}
      <div className="absolute top-0 right-0 h-6 w-6 border-t border-r border-amber-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-amber-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {children}
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════ */
export default function Geografi() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll("[data-card]");
      if (!cards) return;

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              card,
              { y: 40, opacity: 0, scale: 0.95 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "power3.out",
                delay: i * 0.08,
              },
            );
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-emerald-950"
    >
      {/* ── Background texture ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fcd34d' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Blobs ── */}
      <div className="pointer-events-none absolute top-20 -left-32 h-96 w-96 rounded-full bg-amber-900/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 -right-40 h-80 w-80 rounded-full bg-yellow-800/10 blur-[100px]" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-emerald-900/10 blur-[80px]" />

      <div className="relative z-10 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* ════════════════════════════════════════
              CARD 1 — LUAS WILAYAH PER JORONG
             ════════════════════════════════════════ */}
          <div className="mb-24">
            <SectionHeader
              badge="Data Wilayah 2024"
              title="Luas Wilayah"
              subtitle="per Jorong"
            />

            <div
              ref={gridRef}
              className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {luasWilayahData.map((item) => (
                <StatCard key={item.jorong} data-card>
                  {/* Icon */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center border-2 border-stone-700 bg-stone-800/60 transition-all duration-300 group-hover:border-amber-600/40">
                    <FaMapMarkedAlt className="h-7 w-7 text-amber-400/80" />
                  </div>

                  {/* Title */}
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-stone-500">
                    {item.jorong}
                  </p>

                  {/* Value */}
                  <h3 className="mt-2 text-4xl font-black text-white tabular-nums">
                    {item.luas}
                  </h3>

                  {/* Unit */}
                  <p className="mt-2 text-xs font-medium text-stone-500">
                    Ha — {item.persen}% dari total
                  </p>

                  {/* Progress bar */}
                  <div className="mt-4 h-2 w-full overflow-hidden border border-stone-700 bg-stone-800">
                    <div
                      className="h-full bg-linear-to-r from-amber-600 to-amber-400 transition-all duration-700"
                      style={{ width: `${item.persen}%` }}
                    />
                  </div>
                </StatCard>
              ))}
            </div>

            {/* Total card */}
            <div className="text-center">
              <StatCard
                data-card
                className="mx-auto inline-flex items-center gap-6 px-10 py-5"
              >
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-stone-500">
                  Total Luas Wilayah
                </span>
                <span className="text-5xl font-black text-white tabular-nums">
                  {totalLuas}{" "}
                  <span className="text-base font-bold text-stone-400">Ha</span>
                </span>
              </StatCard>
            </div>
          </div>

          {/* ════════════════════════════════════════
              CARD 2 — KONDISI GEOGRAFIS
             ════════════════════════════════════════ */}
          <div className="mb-24">
            <SectionHeader
              badge="Data Geografis 2024"
              title="Kondisi"
              subtitle="Geografis"
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {kondisiGeografis.map((item) => (
                <StatCard key={item.label} data-card>
                  {/* Icon */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center border-2 border-stone-700 bg-stone-800/60 transition-all duration-300 group-hover:border-amber-600/40">
                    <item.icon className="h-7 w-7 text-amber-400/80" />
                  </div>

                  {/* Label */}
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-stone-500">
                    {item.label}
                  </p>

                  {/* Value */}
                  <h3 className="mt-2 text-2xl font-black text-white">
                    {item.value}
                  </h3>

                  {/* Desc */}
                  <p className="mt-2 text-xs font-medium leading-relaxed text-stone-500">
                    {item.desc}
                  </p>
                </StatCard>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════════
              CARD 3 — NAMA SUNGAI
             ════════════════════════════════════════ */}
          <div>
            <SectionHeader
              badge="Data Sungai 2024"
              title="Nama"
              subtitle="Sungai"
            />

            <div className="mx-auto max-w-3xl space-y-5">
              {sungaiData.map((item) => (
                <StatCard key={item.nama} data-card>
                  <div className="flex items-center gap-5">
                    {/* Icon */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-stone-700 bg-stone-800/60 transition-all duration-300 group-hover:border-amber-600/40">
                      <FaWater className="h-7 w-7 text-sky-400/80" />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-stone-500">
                        Nama Sungai
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-white truncate">
                        {item.nama}
                      </h3>
                    </div>

                    {/* Panjang */}
                    <div className="text-center">
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-stone-500">
                        Panjang
                      </p>
                      <p className="mt-1 text-base font-black text-white tabular-nums">
                        {item.panjang}
                      </p>
                    </div>

                    {/* Status chip */}
                    <span
                      className={`inline-block border px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider ${
                        item.status === "Permanen"
                          ? "border-sky-700/40 bg-sky-900/20 text-sky-400"
                          : "border-amber-700/40 bg-amber-900/20 text-amber-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </StatCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
