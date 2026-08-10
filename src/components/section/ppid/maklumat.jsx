import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCheckCircle, FaHandshake, FaStamp } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data Janji Layanan ─── */
const janjiLayanan = [
  "Memberikan pelayanan informasi yang cepat dan tepat waktu;",
  "Memberikan kemudahan dalam mendapatkan informasi publik yang diperlukan dengan murah dan sederhana;",
  "Menyediakan dan memberikan informasi publik yang akurat, benar dan tidak menyesatkan;",
  "Menyediakan daftar informasi publik untuk informasi yang wajib disediakan dan diumumkan;",
  "Menyediakan daftar informasi publik dan fasilitas pelayanan sesuai dengan ketentuan dan tata tertib yang berlaku;",
  "Menyiapkan ruang dan fasilitas yang nyaman dan tertata baik;",
  "Merespon dengan cepat permintaan informasi dan keberatan atas informasi publik yang disampaikan baik langsung maupun media;",
  "Menyiapkan petugas informasi yang berdedikasi dan siap melayani;",
  "Melakukan pengawasan internal dan evaluasi kinerja pelaksana.",
];

/* ════════════════════════════════════════
    MAIN COMPONENT
   ════════════════════════════════════════ */
export default function Maklumat() {
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
      <div className="pointer-events-none absolute top-32 -right-32 h-96 w-96 rounded-full bg-amber-900/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 -left-40 h-80 w-80 rounded-full bg-yellow-800/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* ═══════════════════════════════
            SECTION HEADER
           ═══════════════════════════════ */}
        <div data-reveal className="mb-16 text-center sm:mb-20">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Maklumat{" "}
            <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              Pelayanan
            </span>
          </h2>

          <div className="mx-auto mt-5 h-0.5 w-20 rounded-full bg-amber-400/60" />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Pejabat Pengelola Informasi dan Dokumentasi (PPID) Nagari Tanjuang
            Baringin.
          </p>
        </div>

        {/* ═══════════════════════════════
            DOKUMEN MAKLUMAT
           ═══════════════════════════════ */}
        <div
          data-reveal
          className="relative mx-auto max-w-4xl overflow-hidden border-2 border-stone-700/70 bg-stone-900/60"
        >
          {/* Dekorasi */}
          <div className="pointer-events-none absolute -top-20 -left-20 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl" />
          <FaStamp className="pointer-events-none absolute -right-6 -bottom-6 h-44 w-44 rotate-12 text-amber-400/5" />

          <div className="relative z-10 p-8 sm:p-12">
            {/* ── Kop Maklumat ── */}
            <div className="mb-10 flex flex-col items-center gap-5 border-b border-stone-800 pb-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center border-2 border-amber-600/30 bg-amber-900/20">
                <FaHandshake className="h-7 w-7 text-amber-400" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400/80">
                  Maklumat Pelayanan
                </p>
                <h3 className="mt-2 text-xl font-black tracking-tight text-white sm:text-2xl">
                  Pejabat Pengelola Informasi dan Dokumentasi (PPID)
                </h3>
                <p className="mt-1 text-sm font-semibold text-stone-400">
                  Nagari Tanjuang Baringin
                </p>
              </div>
            </div>

            {/* ── Pernyataan ── */}
            <p className="mb-10 text-center text-sm leading-relaxed text-stone-300 sm:text-base">
              Kami berupaya memberikan pelayanan informasi publik dengan{" "}
              <span className="font-semibold text-white">
                sepenuh hati dan bersungguh-sungguh
              </span>{" "}
              untuk dapat:
            </p>

            {/* ── Daftar Janji ── */}
            <ol className="space-y-4">
              {janjiLayanan.map((janji, idx) => (
                <li
                  key={janji}
                  className="group flex items-start gap-4 rounded-none border border-stone-800/60 bg-stone-950/40 p-4 transition-all duration-300 hover:border-amber-600/30 hover:bg-stone-900/60 sm:p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-amber-600/30 bg-amber-900/20 text-xs font-black text-amber-400">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-stone-300">
                    {janji}
                  </p>
                  <FaCheckCircle className="ml-auto mt-1 h-4 w-4 shrink-0 text-amber-400/40 transition-colors duration-300 group-hover:text-amber-400" />
                </li>
              ))}
            </ol>

            {/* ── Penutup ── */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-3">
                <div className="h-px w-10 bg-amber-400/40" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400/60">
                  Komitmen Pelayanan PPID Nagari Tanjuang Baringin
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
