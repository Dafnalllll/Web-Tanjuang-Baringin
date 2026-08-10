import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaBalanceScale,
  FaBookOpen,
  FaFileContract,
  FaGavel,
  FaInfoCircle,
  FaLandmark,
  FaScroll,
  FaStamp,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data Dasar Hukum ─── */
const dasarHukum = [
  {
    icon: FaBalanceScale,
    nomor: "PP No. 61 Tahun 2010",
    pasal: "Pasal 12",
    judul: "Pelaksanaan UU No. 14 Tahun 2008",
    deskripsi: "Tentang Keterbukaan Informasi Publik",
  },
  {
    icon: FaLandmark,
    nomor: "Permendagri No. 35 Tahun 2010",
    pasal: "Pasal 7",
    judul: "Pedoman Pengelolaan Pelayanan Informasi dan Dokumen",
    deskripsi: "Di lingkungan Kementerian Dalam Negeri dan Pemerintah Daerah",
  },
  {
    icon: FaBookOpen,
    nomor: "Perkom No. 1 Tahun 2018",
    pasal: "",
    judul: "Standar Layanan Informasi Desa",
    deskripsi: "Peraturan Komisi Informasi Republik Indonesia",
  },
];

/* ════════════════════════════════════════
    MAIN COMPONENT
   ════════════════════════════════════════ */
export default function Profil() {
  const sectionRef = useRef(null);

  /* ── Reveal on scroll ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const blocks = section.querySelectorAll("[data-reveal]");
      blocks.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          onEnter: () => {
            gsap.fromTo(
              el,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            );
          },
          once: true,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden py-24 sm:py-32"
    >
      {/* ── Decorative blobs ── */}
      <div className="pointer-events-none absolute top-32 -left-32 h-96 w-96 rounded-full bg-amber-900/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 -right-40 h-80 w-80 rounded-full bg-yellow-800/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* ═══════════════════════════════
            SECTION HEADER
           ═══════════════════════════════ */}
        <div data-reveal className="mb-16 text-center sm:mb-20">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Profil{" "}
            <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              PPID Nagari
            </span>
          </h2>

          <div className="mx-auto mt-5 h-0.5 w-20 rounded-full bg-amber-400/60" />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Pejabat Pengelola Informasi dan Dokumentasi Nagari Tanjuang Baringin
            — pilar keterbukaan informasi publik yang baru saja dibentuk untuk
            melayani masyarakat.
          </p>
        </div>

        {/* ═══════════════════════════════
            NARASI UTAMA
           ═══════════════════════════════ */}
        <div className="mb-24 grid grid-cols-1 items-start gap-10 lg:grid-cols-5">
          {/* Teks */}
          <div
            data-reveal
            className="rounded-2xl border border-white/5 bg-white/2 p-7 sm:p-10 lg:col-span-3"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center border-2 border-amber-600/30 bg-amber-900/20">
                <FaInfoCircle className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400/80">
                  Latar Belakang
                </p>
                <h3 className="text-lg font-bold text-white">
                  Hal Baru di Nagari Tanjuang Baringin
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-stone-400 sm:text-base">
              <p>
                <span className="font-semibold text-stone-200">
                  Pejabat Pengelola Informasi dan Dokumentasi (PPID)
                </span>{" "}
                merupakan hal baru di Nagari Tanjuang Baringin, Kecamatan Lubuk
                Sikaping, Kabupaten Pasaman. PPID nagari dibentuk berdasarkan
                Surat Keputusan (SK) Wali Nagari Nomor 27a Tahun 2025 tentang
                Pejabat Pengelola Informasi dan Dokumentasi (PPID) Nagari
                Tanjuang Baringin Kecamatan Lubuk Sikaping Kabupaten Pasaman
                yang disahkan pada tanggal 24 Februari 2025.
              </p>
              <p>
                Kehadiran PPID ini menjadi langkah nyata nagari dalam mewujudkan
                tata kelola pemerintahan yang transparan, akuntabel, dan
                responsif terhadap hak masyarakat untuk memperoleh informasi
                publik.
              </p>
            </div>
          </div>

          {/* Kartu SK */}
          <div
            data-reveal
            className="relative overflow-hidden border-2 border-stone-700/70 bg-stone-900/60 p-7 sm:p-8 lg:col-span-2"
          >
            <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl" />

            <div className="mb-5 flex h-14 w-14 items-center justify-center border-2 border-stone-700 bg-stone-800/60">
              <FaStamp className="h-6 w-6 text-amber-400/80" />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.15em] text-stone-500">
              Dasar Penetapan
            </p>

            <h3 className="mt-2 text-lg font-black leading-snug text-white">
              SK Wali Nagari
              <br />
              Nomor 27a Tahun 2025
            </h3>

            <div className="my-5 h-px bg-stone-800" />

            <div className="space-y-3 text-sm">
              <div className="flex items-start justify-between gap-4">
                <span className="text-stone-400">Perihal</span>
                <span className="text-right font-semibold text-stone-200">
                  Pembentukan PPID Nagari
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-stone-400">Disahkan</span>
                <span className="text-right font-semibold text-stone-200">
                  24 Februari 2025
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-stone-400">Lokasi</span>
                <span className="text-right font-semibold text-stone-200">
                  Nagari Tanjuang Baringin,
                  <br />
                  Kec. Lubuk Sikaping, Kab. Pasaman
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════
            DASAR HUKUM
           ═══════════════════════════════ */}
        <div className="mb-20">
          {/* Sub-header */}
          <div data-reveal className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400/80">
              <FaGavel className="h-3 w-3" />
              Regulasi
            </div>
            <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Dasar{" "}
              <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
                Hukum
              </span>
            </h3>
            <div className="mx-auto mt-3 h-0.5 w-16 rounded-full bg-amber-400/60" />
            <p className="mx-auto mt-4 max-w-xl text-xs leading-relaxed text-stone-500 sm:text-sm">
              PPID Nagari Tanjuang Baringin terbentuk berdasarkan ketentuan
              peraturan perundang-undangan berikut:
            </p>
          </div>

          {/* Kartu regulasi */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dasarHukum.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.nomor}
                  data-reveal
                  className="group relative border-2 border-stone-700/70 bg-stone-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-600/40 hover:bg-stone-900/80"
                >
                  {/* Nomor urut */}
                  <div className="absolute top-5 right-5 text-4xl font-black text-stone-800/80 transition-colors duration-300 group-hover:text-amber-900/50 select-none">
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  <div className="mb-5 flex h-14 w-14 items-center justify-center border-2 border-stone-700 bg-stone-800/60 transition-colors duration-300 group-hover:border-amber-600/40">
                    <Icon className="h-6 w-6 text-amber-400/80" />
                  </div>

                  {item.pasal && (
                    <span className="mb-2 inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-400">
                      {item.pasal}
                    </span>
                  )}

                  <h4 className="text-base font-bold leading-snug text-white">
                    {item.nomor}
                  </h4>

                  <p className="mt-2 text-sm font-semibold text-amber-400/80">
                    {item.judul}
                  </p>

                  {item.deskripsi && (
                    <p className="mt-1.5 text-xs leading-relaxed text-stone-500">
                      {item.deskripsi}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══════════════════════════════
            PERNYATAAN PENUTUP
           ═══════════════════════════════ */}
        <div data-reveal className="relative mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/2 px-8 py-12 text-center sm:px-14">
            {/* Dekorasi */}
            <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />
            <FaScroll className="pointer-events-none absolute -left-4 top-1/2 h-32 w-32 -translate-y-1/2 text-amber-400/5" />
            <FaFileContract className="pointer-events-none absolute -right-4 top-1/2 h-32 w-32 -translate-y-1/2 text-amber-400/5" />

            <div className="relative z-10">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/25 bg-amber-500/10">
                <FaScroll className="h-5 w-5 text-amber-400" />
              </div>

              <p className="text-base leading-relaxed text-stone-300 sm:text-lg">
                Berdasarkan regulasi tersebut di atas, perlu menetapkan{" "}
                <span className="font-semibold text-white">
                  Pejabat Pengelola Informasi dan Dokumentasi (PPID)
                </span>{" "}
                Nagari Tanjuang Baringin, Kecamatan Lubuk Sikaping, Kabupaten
                Pasaman.
              </p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="h-px w-10 bg-amber-400/40" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400/60">
                  Pemerintahan Nagari Tanjuang Baringin
                </span>
                <div className="h-px w-10 bg-amber-400/40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
