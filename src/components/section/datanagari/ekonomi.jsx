import { useRef } from "react";

import {
  FaIndustry,
  FaUtensils,
  FaHammer,
  FaStore,
  FaBoxes,
  FaTree,
  FaPalette,
  FaCouch,
  FaWineBottle,
  FaTshirt,
} from "react-icons/fa";

import SectionHeader from "./shared/sectionheader";
import StatCard from "./shared/statscard";
import useSectionAnimation from "./shared/useSectionanimation";

/* =====================================
   DATA INDUSTRI
===================================== */

const industriData = [
  {
    produk: "Industri Makanan",
    jumlah: 35,
    kategori: "Pangan",
    icon: FaUtensils,
    color: "from-emerald-500 to-green-400",
  },
  {
    produk: "Pakaian Jadi",
    jumlah: 12,
    kategori: "Tekstil",
    icon: FaTshirt,
    color: "from-amber-500 to-yellow-400",
  },
  {
    produk: "Furniture",
    jumlah: 4,
    kategori: "Mebel",
    icon: FaCouch,
    color: "from-sky-500 to-cyan-400",
  },
  {
    produk: "Barang Logam",
    jumlah: 3,
    kategori: "Logam",
    icon: FaHammer,
    color: "from-orange-500 to-red-400",
  },
  {
    produk: "Gerabah / Keramik",
    jumlah: 3,
    kategori: "Kerajinan",
    icon: FaIndustry,
    color: "from-rose-500 to-pink-400",
  },
  {
    produk: "Kayu & Anyaman",
    jumlah: 2,
    kategori: "Kerajinan",
    icon: FaTree,
    color: "from-lime-500 to-green-400",
  },
  {
    produk: "Kerajinan",
    jumlah: 2,
    kategori: "UMKM",
    icon: FaPalette,
    color: "from-violet-500 to-fuchsia-400",
  },
  {
    produk: "Industri Kulit",
    jumlah: 1,
    kategori: "Kulit",
    icon: FaBoxes,
    color: "from-yellow-500 to-amber-400",
  },
  {
    produk: "Industri Minuman",
    jumlah: 1,
    kategori: "Minuman",
    icon: FaWineBottle,
    color: "from-cyan-500 to-sky-400",
  },
  {
    produk: "Industri Lainnya",
    jumlah: 1,
    kategori: "Lainnya",
    icon: FaStore,
    color: "from-slate-500 to-gray-400",
  },
];

const totalIndustri = industriData.reduce((sum, item) => sum + item.jumlah, 0);

const statistikEkonomi = [
  {
    icon: FaIndustry,
    label: "Total Industri",
    value: `${totalIndustri} Unit`,
    desc: "Industri mikro dan kecil yang aktif",
  },
  {
    icon: FaUtensils,
    label: "Produk Dominan",
    value: "Industri Makanan",
    desc: "35 unit usaha mikro",
  },
  {
    icon: FaStore,
    label: "Jenis Industri",
    value: `${industriData.length} Jenis`,
    desc: "Sektor usaha yang berkembang",
  },
];

export default function Ekonomi() {
  const sectionRef = useRef(null);

  useSectionAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="relative overflow-hidden ">
      <div className="relative z-10 py-24 sm:py-1">
        <div className="mx-auto max-w-7xl px-6">
          {/* ======================================
                POTENSI INDUSTRI
          ====================================== */}

          <div className="mb-24">
            <SectionHeader
              title="Potensi"
              subtitle="Industri"
              description="Sebaran industri mikro dan kecil berdasarkan jenis produk yang berkembang di Nagari Tanjuang Baringin."
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {industriData.map((item) => {
                const persen = ((item.jumlah / totalIndustri) * 100).toFixed(1);

                return (
                  <StatCard key={item.produk} data-card>
                    <div
                      className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br ${item.color}/20`}
                    >
                      <item.icon className="text-3xl text-white" />
                    </div>

                    <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
                      {item.kategori}
                    </p>

                    <h3 className="mt-2 text-2xl font-black text-white leading-tight">
                      {item.produk}
                    </h3>

                    <h2
                      data-counter
                      data-value={item.jumlah}
                      className="mt-4 text-5xl font-black text-white"
                    >
                      0
                    </h2>

                    <p className="mt-2 text-xs text-stone-500">Unit Industri</p>

                    <div className="mt-5">
                      <div className="mb-2 flex justify-between text-xs text-stone-500">
                        <span>Kontribusi</span>

                        <span>{persen}%</span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-stone-800">
                        <div
                          data-progress
                          data-width={persen}
                          className={`h-full rounded-full bg-linear-to-r ${item.color}`}
                          style={{ width: "0%" }}
                        />
                      </div>
                    </div>
                  </StatCard>
                );
              })}
            </div>

            <div className="mt-10">
              <StatCard data-card className="mx-auto max-w-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
                      Total Industri Mikro
                    </p>

                    <h2
                      data-counter
                      data-value={totalIndustri}
                      className="mt-3 text-5xl font-black text-white"
                    >
                      0<span className="ml-2 text-lg text-stone-400">Unit</span>
                    </h2>
                  </div>

                  <FaIndustry className="text-7xl text-amber-400/15" />
                </div>
              </StatCard>
            </div>
          </div>

          {/* ======================================
                STATISTIK INDUSTRI
          ====================================== */}

          <div className="mb-24">
            <SectionHeader
              title="Statistik"
              subtitle="Industri"
              description="Gambaran umum perkembangan industri mikro dan kecil sebagai salah satu penggerak ekonomi masyarakat Nagari Tanjuang Baringin."
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {statistikEkonomi.map((item) => (
                <StatCard key={item.label} data-card>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/20 bg-linear-to-br from-amber-500/10 to-yellow-500/5">
                    <item.icon className="text-3xl text-amber-400" />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">
                    {item.label}
                  </p>

                  <h2 className="mt-3 text-3xl font-black text-white">
                    {item.value}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-stone-400">
                    {item.desc}
                  </p>
                </StatCard>
              ))}
            </div>
          </div>

          {/* ======================================
                DETAIL JENIS INDUSTRI
          ====================================== */}

          <div>
            <SectionHeader
              title="Detail"
              subtitle="Jenis Industri"
              description="Daftar industri mikro dan kecil berdasarkan jenis produk yang berkembang di Nagari Tanjuang Baringin Tahun 2024."
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {industriData.map((item) => (
                <StatCard key={item.produk} data-card>
                  <div className="flex flex-col gap-6">
                    {/* Header */}

                    <div className="grid grid-cols-[1fr_auto] gap-4">
                      <div className="flex gap-4 min-w-0">
                        <div
                          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${item.color}/20`}
                        >
                          <item.icon className="text-3xl text-white" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-xl font-black leading-tight text-white">
                            {item.produk}
                          </h3>

                          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-stone-500">
                            {item.kategori}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-stone-800" />

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
                          Kontribusi
                        </p>

                        <h3 className="mt-2 text-3xl font-black text-white">
                          {((item.jumlah / totalIndustri) * 100).toFixed(1)}%
                        </h3>
                      </div>

                      <item.icon className="text-5xl text-white/10" />
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
