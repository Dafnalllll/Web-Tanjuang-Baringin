import { useRef } from "react";
import { FaUsers, FaMale, FaFemale, FaChartPie } from "react-icons/fa";

import SectionHeader from "./shared/sectionheader";
import StatCard from "./shared/statscard";
import useSectionAnimation from "./shared/useSectionanimation";

const pendudukData = [
  {
    jorong: "Kampuang Tangah",
    laki: 771,
    perempuan: 881,
    total: 1652,
    distribusi: 36.4,
    rasio: 87.51,
  },
  {
    jorong: "Benteng",
    laki: 911,
    perempuan: 1035,
    total: 1946,
    distribusi: 42.85,
    rasio: 88.02,
  },
  {
    jorong: "Tikalak",
    laki: 498,
    perempuan: 444,
    total: 942,
    distribusi: 20.75,
    rasio: 112.16,
  },
];

const statistikPenduduk = [
  {
    icon: FaMale,
    label: "Laki-laki",
    value: "2.180 Jiwa",
    desc: "48,03% dari total penduduk",
  },
  {
    icon: FaFemale,
    label: "Perempuan",
    value: "2.359 Jiwa",
    desc: "51,97% dari total penduduk",
  },
  {
    icon: FaChartPie,
    label: "Rasio Jenis Kelamin",
    value: "92,37",
    desc: "92 laki-laki untuk setiap 100 perempuan",
  },
];

const totalPenduduk = pendudukData.reduce((sum, item) => sum + item.total, 0);

export default function Penduduk() {
  const sectionRef = useRef(null);

  useSectionAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="relative overflow-hidden ">
      <div className="pointer-events-none absolute top-20 -left-32 h-96 w-96 rounded-full bg-amber-900/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 -right-40 h-80 w-80 rounded-full bg-yellow-800/10 blur-[100px]" />

      <div className="relative z-10 py-24 sm:py-1">
        <div className="mx-auto max-w-7xl px-6">
          {/* ============================
              DISTRIBUSI PENDUDUK
          ============================ */}

          <div className="mb-24">
            <SectionHeader
              title="Distribusi"
              subtitle="Penduduk"
              description="Sebaran jumlah penduduk Nagari Tanjuang Baringin berdasarkan masing-masing jorong."
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pendudukData.map((item) => (
                <StatCard key={item.jorong} data-card>
                  <div className="mb-5 flex h-14 w-14 items-center justify-center border-2 border-stone-700 bg-stone-800/60">
                    <FaUsers className="h-7 w-7 text-amber-400/80" />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-stone-500">
                    {item.jorong}
                  </p>

                  <h3
                    data-counter
                    data-value={item.total}
                    className="mt-2 text-4xl font-black text-white tabular-nums"
                  >
                    0
                  </h3>

                  <p className="mt-2 text-xs text-stone-500">
                    Jiwa — {item.distribusi}% dari total penduduk
                  </p>

                  <div className="mt-4 h-2 overflow-hidden border border-stone-700 bg-stone-800">
                    <div
                      data-progress
                      data-width={item.distribusi}
                      className="h-full bg-linear-to-r from-amber-600 to-yellow-400"
                      style={{ width: 0 }}
                    />
                  </div>
                </StatCard>
              ))}
            </div>

            <div className="mt-8 text-center">
              <StatCard
                data-card
                className="mx-auto inline-flex items-center gap-6 px-10 py-5"
              >
                <span className="text-xs uppercase tracking-[0.15em] text-stone-500 font-bold">
                  Total Penduduk
                </span>

                <span
                  data-counter
                  data-value={totalPenduduk}
                  className="text-5xl font-black text-white"
                >
                  0<span className="ml-2 text-base text-stone-400">Jiwa</span>
                </span>
              </StatCard>
            </div>
          </div>
          {/* ============================
              KOMPOSISI PENDUDUK
          ============================ */}

          <div className="mb-24">
            <SectionHeader
              title="Komposisi"
              subtitle="Penduduk"
              description="Komposisi penduduk berdasarkan jenis kelamin serta rasio jenis kelamin di Nagari Tanjuang Baringin."
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {statistikPenduduk.map((item) => (
                <StatCard key={item.label} data-card>
                  <div className="mb-5 flex h-14 w-14 items-center justify-center border-2 border-stone-700 bg-stone-800/60">
                    <item.icon className="h-7 w-7 text-amber-400/80" />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-stone-500">
                    {item.label}
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-white">
                    {item.value}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-stone-500">
                    {item.desc}
                  </p>
                </StatCard>
              ))}
            </div>
          </div>

          {/* ============================
              STATISTIK TIAP JORONG
          ============================ */}

          <div>
            <SectionHeader
              title="Statistik"
              subtitle="Tiap Jorong"
              description="Rincian jumlah penduduk laki-laki, perempuan, total penduduk, distribusi, serta rasio jenis kelamin pada setiap jorong."
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pendudukData.map((item) => (
                <StatCard key={item.jorong} data-card>
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center border-2 border-stone-700 bg-stone-800/60">
                        <FaUsers className="h-7 w-7 text-amber-400/80" />
                      </div>

                      <div>
                        <h3 className="text-xl font-black text-white">
                          {item.jorong}
                        </h3>

                        <p className="text-xs text-stone-500">
                          Distribusi {item.distribusi}%
                        </p>
                      </div>
                    </div>

                    <div className="h-px bg-stone-800" />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-stone-400">
                          Laki-laki
                        </span>

                        <span className="font-bold text-white">
                          {item.laki.toLocaleString("id-ID")}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-stone-400">
                          Perempuan
                        </span>

                        <span className="font-bold text-white">
                          {item.perempuan.toLocaleString("id-ID")}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-t border-stone-800 pt-4">
                        <span className="font-semibold text-stone-300">
                          Total
                        </span>

                        <span className="text-2xl font-black text-white">
                          {item.total.toLocaleString("id-ID")}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-stone-400">Rasio JK</span>

                        <span className="font-bold text-amber-400">
                          {item.rasio}
                        </span>
                      </div>
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
