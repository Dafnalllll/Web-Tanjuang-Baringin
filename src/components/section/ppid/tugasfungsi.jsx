import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaCheckCircle,
  FaChevronRight,
  FaClipboardList,
  FaGavel,
  FaSitemap,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data Tugas ─── */
const tugasItems = [
  {
    num: "01",
    text:
      "Mengkoordinasikan dan mengkonsolidasikan pengumpulan bahan informasi dan dokumentasi dari PPID Pembantu yang meliputi:",
    sub: [
      "Informasi yang wajib disediakan dan diumumkan secara berkala;",
      "Informasi yang wajib tersedia setiap saat;",
      "Informasi terbuka lainnya yang diminta pemohon informasi publik.",
    ],
  },
  {
    num: "02",
    text:
      "Menyimpan, mendokumentasikan, menyediakan dan memberi pelayanan informasi kepada publik;",
  },
  {
    num: "03",
    text: "Melakukan verifikasi bahan informasi publik;",
  },
  {
    num: "04",
    text: "Melakukan uji konsekuensi atas informasi yang dikecualikan;",
  },
  {
    num: "05",
    text: "Melakukan pemutakhiran informasi dan dokumentasi; dan",
  },
  {
    num: "06",
    text: "Menyediakan informasi dan dokumentasi untuk diakses oleh masyarakat.",
  },
];

/* ─── Data Fungsi ─── */
const fungsiItems = [
  "Mengkoordinasikan penyimpanan dan pendokumentasian seluruh informasi publik;",
  "Mengkoordinasikan penyediaan dan pelayanan seluruh informasi publik di bawah penguasaan masing-masing yang dapat diakses oleh publik;",
  "Menjaga kerahasiaan informasi yang dikecualikan kepada masyarakat dan/atau pemohon informasi publik;",
  "Menjamin keakuratan informasi yang diberikan kepada masyarakat dan/atau pemohon informasi publik.",
];

/* ─── Data Kewenangan ─── */
const kewenanganText =
  "Dalam melaksanakan tugas dan fungsinya, PPID berwenang:";

const kewenanganItems = [
  "Menolak memberikan informasi yang dikecualikan sesuai dengan ketentuan peraturan perundang-undangan;",
  "Meminta dan memperoleh informasi dari unit kerja/komponen/satuan kerja yang menjadi cakupan kerjanya;",
  "Mengkoordinasikan pemberian pelayanan informasi dengan PPID Pembantu dan/atau Pejabat Fungsional yang menjadi cakupan kerjanya;",
  "Menentukan atau menetapkan suatu informasi dapat/tidaknya diakses oleh publik; dan",
  "Menugaskan PPID Pembantu dan/atau Pejabat Fungsional untuk membuat, mengumpulkan, serta memelihara informasi dan dokumentasi untuk kebutuhan organisasi.",
];

/* ════════════════════════════════════════
    MAIN COMPONENT
   ════════════════════════════════════════ */
export default function TugasFungsi() {
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
            Tugas, Fungsi &{" "}
            <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              Kewenangan
            </span>
          </h2>

          <div className="mx-auto mt-5 h-0.5 w-20 rounded-full bg-amber-400/60" />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Tugas pokok, fungsi, dan kewenangan Pejabat Pengelola Informasi dan
            Dokumentasi Nagari Tanjuang Baringin dalam melayani keterbukaan
            informasi publik.
          </p>
        </div>

        {/* ═══════════════════════════════
            TUGAS & FUNGSI
           ═══════════════════════════════ */}
        <div className="mb-20 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* ── Tugas ── */}
          <div
            data-reveal
            className="relative border-2 border-stone-700/70 bg-stone-900/60 p-7 sm:p-10"
          >
            {/* Dekorasi */}
            <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />

            <div className="relative z-10">
              {/* Header */}
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-amber-600/30 bg-amber-900/20">
                  <FaClipboardList className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400/80">
                    Tugas Pokok
                  </p>
                  <h3 className="text-2xl font-black tracking-tight text-white">
                    Tugas
                  </h3>
                </div>
              </div>

              {/* Daftar tugas */}
              <ol className="space-y-5">
                {tugasItems.map((item, idx) => (
                  <li key={item.num} className="flex gap-4">
                    <span className="mt-0.5 text-2xl font-black leading-none text-stone-700 select-none">
                      {item.num}
                    </span>
                    <div>
                      <p className="text-sm leading-relaxed text-stone-300">
                        {item.text}
                      </p>

                      {/* Sub-bullet */}
                      {item.sub && (
                        <ul className="mt-3 space-y-2">
                          {item.sub.map((sub) => (
                            <li
                              key={sub}
                              className="flex items-start gap-2.5 text-xs leading-relaxed text-stone-500"
                            >
                              <FaChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-amber-400/60" />
                              {sub}
                            </li>
                          ))}
                        </ul>
                      )}

                      {idx < tugasItems.length - 1 && (
                        <div className="mt-5 h-px bg-stone-800/80" />
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* ── Fungsi ── */}
          <div
            data-reveal
            className="relative border-2 border-stone-700/70 bg-stone-900/60 p-7 sm:p-10"
          >
            {/* Dekorasi */}
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-yellow-800/10 blur-3xl" />

            <div className="relative z-10">
              {/* Header */}
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-amber-600/30 bg-amber-900/20">
                  <FaSitemap className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400/80">
                    Peran Utama
                  </p>
                  <h3 className="text-2xl font-black tracking-tight text-white">
                    Fungsi
                  </h3>
                </div>
              </div>

              {/* Daftar fungsi */}
              <ul className="space-y-4">
                {fungsiItems.map((item, idx) => (
                  <li key={item} className="flex items-start gap-3.5">
                    <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400/80" />
                    <p className="text-sm leading-relaxed text-stone-300">
                      {item}
                    </p>
                    {idx < fungsiItems.length - 1 && (
                      <span className="hidden" />
                    )}
                  </li>
                ))}
              </ul>

              {/* Catatan */}
              <div className="mt-10 rounded-none border-l-2 border-amber-400 bg-amber-500/5 px-5 py-4">
                <p className="text-xs leading-relaxed text-stone-500">
                  Keempat fungsi tersebut dijalankan secara terkoordinasi demi
                  mewujudkan pelayanan informasi publik yang transparan,
                  akurat, dan akuntabel.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════
            KEWENANGAN
           ═══════════════════════════════ */}
        <div
          data-reveal
          className="relative overflow-hidden border-2 border-amber-600/20 bg-amber-900/10 p-7 sm:p-12"
        >
          {/* Dekorasi */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl" />
          <FaGavel className="pointer-events-none absolute -left-6 bottom-0 h-40 w-40 text-amber-400/5" />

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center border-2 border-amber-600/30 bg-amber-900/20">
                <FaGavel className="h-7 w-7 text-amber-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400/80">
                  Otoritas PPID
                </p>
                <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Kewenangan
                </h3>
                <p className="mt-2 text-sm italic leading-relaxed text-stone-400">
                  &ldquo;{kewenanganText}&rdquo;
                </p>
              </div>
            </div>

            {/* Daftar kewenangan */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {kewenanganItems.map((item, idx) => (
                <div
                  key={item}
                  className="group relative border border-stone-800/60 bg-stone-900/50 p-5 transition-all duration-300 hover:border-amber-600/30 hover:bg-stone-900/70"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex h-8 w-8 items-center justify-center border border-amber-600/30 bg-amber-900/20 text-xs font-black text-amber-400">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <FaCheckCircle className="h-4 w-4 text-amber-400/40 transition-colors duration-300 group-hover:text-amber-400" />
                  </div>
                  <p className="text-xs leading-relaxed text-stone-300">
                    {item}
                  </p>
                </div>
              ))}

              {/* Kartu pemantap */}
              <div className="flex flex-col justify-center border-2 border-amber-600/20 bg-amber-500/5 p-5">
                <p className="text-xs font-semibold leading-relaxed text-amber-400/90">
                  Kewenangan ini dijalankan sesuai dengan ketentuan peraturan
                  perundang-undangan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
