import { useRef } from "react";

import {
  FaMapMarkedAlt,
  FaMountain,
  FaWater,
  FaTemperatureHigh,
  FaRulerCombined,
  FaTree,
} from "react-icons/fa";
import { MdAgriculture, MdOutlineLandscape } from "react-icons/md";

import SectionHeader from "./shared/sectionheader";
import StatCard from "./shared/statscard";
import useSectionAnimation from "./shared/useSectionanimation";

/* ═══════════════════════════════════════
   DATA
   ═══════════════════════════════════════ */

/* ─── Luas Wilayah per Jorong ─── */
const luasWilayahData = [
  { jorong: "Kampuang Tangah", luas: 1513, persen: 26.76 },
  { jorong: "Benteng", luas: 2820, persen: 49.89 },
  { jorong: "Tikalak", luas: 1320, persen: 23.35 },
];

const totalLuas = luasWilayahData.reduce((sum, d) => sum + d.luas, 0);

/* ─── Kondisi Geografis ─── */
const kondisiGeografis = [
  {
    icon: FaTemperatureHigh,
    label: "Suhu Rata-rata",
    value: "23°C – 24°C",
    desc: "Mendukung pertanian dan perkebunan.",
  },
  {
    icon: FaMountain,
    label: "Ketinggian",
    value: "2240 Mdpl",
    desc: "Ketinggian dari permukaan laut",
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
    value: "Sawah, perkebunan, dan hutan sekunder",
    desc: "Didominasi padi, kelapa sawit, karet, serta vegetasi perbukitan",
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
    value: "Dataran, bergelombang, dan perbukitan",
    desc: "Topografi bervariasi dengan lereng landai hingga agak curam",
  },
];

/* ─── Nama Sungai ─── */
const sungaiData = [
  { nama: "Sungai Paku", panjang: "4.2 km", status: "Permanen" },
  { nama: "Sungai Tikalak", panjang: "3.8 km", status: "Permanen" },
  { nama: "Sungai Pigariang", panjang: "5.1 km", status: "Permanen" },
  { nama: "Sungai Anang", panjang: "6.5 km", status: "Permanen" },
  { nama: "Sungai Bulakan Panjang", panjang: "2.9 km", status: "Musiman" },
  { nama: "Sungai Batu Ampa", panjang: "2.9 km", status: "Musiman" },
];

/* ═══════════════════════════════════════
    MAIN COMPONENT
   ═══════════════════════════════════════ */
export default function Geografi() {
  const sectionRef = useRef(null);

  useSectionAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="relative overflow-hidden ">
      <div className="relative z-10 py-24 sm:py-1">
        <div className="mx-auto max-w-7xl px-6">
          {/* ════════════════════════════════════════
              CARD 1 — LUAS WILAYAH PER JORONG
             ════════════════════════════════════════ */}
          <div className="mb-24">
            <SectionHeader
              title="Luas Wilayah"
              subtitle="per Jorong"
              description="Distribusi luas wilayah Nagari Tanjuang Baringin berdasarkan tiga jorong beserta kontribusinya terhadap total luas nagari."
            />

            <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  <h3
                    data-counter
                    data-value={item.luas}
                    className="mt-2 text-4xl font-black text-white tabular-nums"
                  >
                    0
                  </h3>

                  {/* Unit */}
                  <p className="mt-2 text-xs font-medium text-stone-500">
                    Ha —{" "}
                    {item.persen.toLocaleString("id-ID", {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                    % dari total
                  </p>

                  {/* Progress bar */}
                  <div className="mt-4 h-2 w-full overflow-hidden border border-stone-700 bg-stone-800">
                    <div
                      data-progress
                      data-width={item.persen}
                      className="h-full bg-linear-to-r from-amber-600 to-amber-400"
                      style={{ width: "0%" }}
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
                <span
                  data-counter
                  data-value={totalLuas}
                  className="text-5xl font-black text-white tabular-nums"
                >
                  0{" "}
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
              title="Kondisi"
              subtitle="Geografis"
              description="Karakteristik fisik Nagari Tanjuang Baringin yang meliputi topografi, iklim, jenis tanah, vegetasi, ketinggian, dan luas wilayah."
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
              title="Nama"
              subtitle="Sungai"
              description="Daftar sungai yang melintasi wilayah Nagari Tanjuang Baringin beserta panjang aliran dan karakteristik keberlangsungannya."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sungaiData.map((item) => (
                <StatCard key={item.nama} data-card>
                  <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="grid grid-cols-[1fr_auto] items-start gap-4">
                      <div className="flex flex-1 items-center gap-4 min-w-0">
                        {/* Icon */}
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-stone-700 bg-stone-800/60 transition-all duration-300 group-hover:border-sky-500/40">
                          <FaWater className="h-7 w-7 text-sky-400" />
                        </div>

                        {/* Nama Sungai */}
                        <div className="flex-1 min-w-0 max-w-full">
                          <h3 className="mt-1 text-xl font-black leading-tight text-white wrap-break-word">
                            {item.nama}
                          </h3>
                        </div>
                      </div>

                      {/* Status */}
                      <span
                        className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider ${
                          item.status === "Permanen"
                            ? "border-sky-700/40 bg-sky-900/20 text-sky-400"
                            : "border-amber-700/40 bg-amber-900/20 text-amber-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-stone-800" />

                    {/* Footer */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-stone-500">
                          Panjang Sungai
                        </p>

                        <h4 className="mt-2 text-3xl font-black text-white tabular-nums">
                          {item.panjang}
                        </h4>
                      </div>

                      <FaWater className="text-4xl text-sky-400/20" />
                    </div>
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
