import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaScroll,
  FaLandmark,
  FaPeopleArrows,
  FaBookOpen,
  FaHandshake,
  FaStar,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    year: "Abad ke-17",
    title: "Awal Mula Pemukiman",
    description:
      "Para perantau dari Tanah Datar mulai membuka lahan dan mendirikan pemukiman di kawasan yang kini dikenal sebagai Tanjuang Baringin. Nama ini diambil dari bahasa Minangkabau 'tanjuang' (tanjung) dan 'baringin' (beringin), merujuk pada pohon beringin besar yang tumbuh di tanjung sungai setempat.",
    icon: FaScroll,
  },
  {
    year: "1908",
    title: "Penetapan sebagai Nagari",
    description:
      "Pemerintah Hindia Belanda secara resmi menetapkan Tanjuang Baringin sebagai salah satu nagari di Kecamatan Lubuk Sikaping, Kabupaten Pasaman, berdasarkan sistem pemerintahan adat Minangkabau yang telah berlangsung turun-temurun.",
    icon: FaLandmark,
  },
  {
    year: "1945–1949",
    title: "Masa Perjuangan Kemerdekaan",
    description:
      "Masyarakat Tanjuang Baringin turut aktif dalam mempertahankan kemerdekaan Indonesia. Pemuda-pemuda nagari bergabung dengan laskar-laskar perjuangan untuk melawan kembalinya penjajah, menjadikan nagari ini sebagai salah satu lumbung perlawanan di Pasaman.",
    icon: FaStar,
  },
  {
    year: "1979",
    title: "Pengesahan UU No. 5/1979",
    description:
      "Pemerintahan nagari sempat mengalami perubahan sistem menjadi desa sesuai Undang-Undang No. 5 Tahun 1979 tentang Pemerintahan Desa. Namun, semangat adat dan budaya Minangkabau tetap terpelihara dalam keseharian masyarakat.",
    icon: FaBookOpen,
  },
  {
    year: "2000–2014",
    title: "Era Reformasi & Kembalinya Nagari",
    description:
      "Dengan diberlakukannya otonomi daerah dan Peraturan Daerah tentang Nagari, Tanjuang Baringin kembali menggunakan sistem nagari sebagai unit pemerintahan. Masa ini ditandai dengan pemekaran beberapa jorong dan penguatan kembali lembaga-lembaga adat.",
    icon: FaHandshake,
  },
  {
    year: "2020–Sekarang",
    title: "Nagari Modern Berbasis Digital",
    description:
      "Tanjuang Baringin mulai mengadopsi sistem pelayanan publik berbasis digital. Website nagari, administrasi online, dan pemanfaatan media sosial menjadi bagian dari upaya mewujudkan nagari yang transparan, responsif, dan modern tanpa meninggalkan nilai-nilai adat.",
    icon: FaPeopleArrows,
  },
];

export default function Sejarah() {
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  /* ── Floating particles ── */
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3 - 0.1,
      alpha: Math.random() * 0.35 + 0.08,
    }));
    let animId;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 191, 36, ${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    animId = requestAnimationFrame(draw);
    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── Hero entrance ── */
  useEffect(() => {
    const hero = heroContentRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      const title = hero.querySelector("[data-hero-title]");
      const subtitle = hero.querySelector("[data-hero-subtitle]");
      const badge = hero.querySelector("[data-hero-badge]");
      const line = hero.querySelector("[data-hero-line]");

      if (badge) {
        gsap.fromTo(
          badge,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 }
        );
      }
      if (title) {
        gsap.fromTo(
          title,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power4.out",
            delay: 0.4,
          }
        );
      }
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power3.out", delay: 0.7 }
        );
      }
      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.9 }
        );
      }
    }, hero);

    return () => ctx.revert();
  }, []);

  /* ── Content sections reveal ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const contentBlocks = section.querySelectorAll("[data-reveal]");
      contentBlocks.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(
              el,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
            );
          },
          once: true,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  /* ── Timeline animations ── */
  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const ctx = gsap.context(() => {
      /* Center line grow */
      const line = timeline.querySelector("[data-timeline-line]");
      if (line) {
        ScrollTrigger.create({
          trigger: timeline,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(
              line,
              { scaleY: 0, transformOrigin: "top center" },
              { scaleY: 1, duration: 1.5, ease: "power4.out" }
            );
          },
          once: true,
        });
      }

      /* Timeline items stagger */
      const items = timeline.querySelectorAll("[data-timeline-item]");
      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 88%",
          onEnter: () => {
            gsap.fromTo(
              item,
              {
                opacity: 0,
                x: i % 2 === 0 ? -40 : 40,
                y: 20,
              },
              {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                delay: i * 0.12,
              }
            );
          },
          once: true,
        });
      });
    }, timeline);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-emerald-950 overflow-hidden">
      {/* ── Background Canvas ── */}
      <canvas
        ref={bgCanvasRef}
        className="fixed inset-0 pointer-events-none w-full h-full z-0"
      />

      {/* ════════════════════════════════════════
          HERO SECTION
         ════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative z-10 flex min-h-[70vh] items-center justify-center pt-28 pb-16 sm:pt-32 sm:pb-20"
      >
        {/* Decorative glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/3 blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

        <div
          ref={heroContentRef}
          className="relative mx-auto max-w-5xl px-4 text-center"
        >
          {/* Badge */}
          <div
            data-hero-badge
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-5 py-1.5 text-xs uppercase tracking-[0.2em] text-amber-400/80"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Tentang Nagari
          </div>

          {/* Title */}
          <h1
            data-hero-title
            className="text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Sejarah{" "}
            <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              Nagari
            </span>
            <br />
            Tanjuang Baringin
          </h1>

          {/* Decorative line */}
          <div
            data-hero-line
            className="mx-auto my-6 h-0.5 w-32 origin-center rounded-full bg-linear-to-r from-transparent via-amber-400/60 to-transparent sm:my-8 sm:w-48"
          />

          {/* Subtitle */}
          <p
            data-hero-subtitle
            className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base"
          >
            Menelusuri perjalanan panjang Nagari Tanjuang Baringin — dari
            pemukiman awal, masa perjuangan, hingga transformasi menjadi nagari
            modern yang berakar pada nilai-nilai adat Minangkabau.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CONTENT SECTION
         ════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className="relative z-10 mx-auto max-w-6xl px-4 pb-20 sm:pb-32"
      >
        {/* Row 1: Narasi utama */}
        <div className="mb-24 grid grid-cols-1 items-center gap-12 lg:grid-cols-5">
          {/* Illustration / decorative */}
          <div
            data-reveal
            className="relative flex items-center justify-center lg:col-span-2"
          >
            <div className="relative flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-amber-500/10 animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-amber-500/5 animate-[spin_20s_linear_infinite_reverse]" />

              {/* Center icon group */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-linear-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20">
                  <FaScroll className="h-10 w-10 text-amber-400" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-amber-400/60">
                  Sejarah Panjang
                </span>
              </div>

              {/* Orbiting dots */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-amber-400/40 animate-ping" />
              <div className="absolute bottom-2 right-1/4 h-1.5 w-1.5 rounded-full bg-amber-400/30 animate-ping [animation-delay:1s]" />
              <div className="absolute bottom-1/3 right-2 h-1 w-1 rounded-full bg-amber-400/20 animate-ping [animation-delay:2s]" />
            </div>
          </div>

          {/* Teks */}
          <div data-reveal className="space-y-5 lg:col-span-3">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Dari Legenda{" "}
              <span className="text-amber-400">Hingga Lembaran Negara</span>
            </h2>
            <div className="h-0.5 w-16 rounded-full bg-amber-400/60" />
            <div className="space-y-4 text-sm leading-relaxed text-slate-400 sm:text-base">
              <p>
                <span className="font-semibold text-slate-300">
                  Nagari Tanjuang Baringin
                </span>{" "}
                adalah salah satu nagari yang terletak di Kecamatan Lubuk
                Sikaping, Kabupaten Pasaman, Provinsi Sumatera Barat. Berdirinya
                nagari ini tidak terlepas dari sejarah panjang perantauan
                masyarakat Minangkabau dari kawasan Luhak Nan Tigo — Tanah Datar,
                Agam, dan Limapuluh Kota — yang merantau ke pesisir timur
                Sumatera.
              </p>
              <p>
                Menurut cerita turun-temurun, para pendahulu yang tiba di daerah
                ini menemukan sebuah tanjung (tanjuang) yang ditumbuhi pohon
                beringin (baringin) besar dan rindang. Tempat tersebut dijadikan
                sebagai lokasi bermusyawarah dan pusat kegiatan adat, sekaligus
                menjadi cikal bakal nama "Tanjuang Baringin" yang kita kenal
                sekarang.
              </p>
              <p>
                Sejak awal, masyarakat Tanjuang Baringin telah hidup dengan
                sistem adat Minangkabau yang kuat — Datuak dan ninik mamak
                memegang peran penting dalam pengambilan keputusan, sementara
                Alim Ulama memberikan tuntunan spiritual. Perpaduan antara adat
                dan syarak ini menjadi fondasi yang kokoh hingga saat ini.
              </p>
            </div>
          </div>
        </div>

        {/* Row 2: Kedatangan Belanda (alternate layout) */}
        <div className="mb-24 grid grid-cols-1 items-center gap-12 lg:grid-cols-5">
          <div
            data-reveal
            className="order-2 space-y-5 lg:order-1 lg:col-span-3"
          >
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Masa Kolonial &{" "}
              <span className="text-amber-400">Pengaruh Belanda</span>
            </h2>
            <div className="h-0.5 w-16 rounded-full bg-amber-400/60" />
            <div className="space-y-4 text-sm leading-relaxed text-slate-400 sm:text-base">
              <p>
                Pada awal abad ke-20, Pemerintah Hindia Belanda mulai
                memperluas pengaruhnya hingga ke pedalaman Pasaman. Tanjuang
                Baringin, dengan posisinya yang strategis di jalur
                perdagangan, menjadi salah satu daerah yang mendapat perhatian.
              </p>
              <p>
                Tahun 1908 menjadi momen penting ketika sistem pemerintahan
                nagari diakui secara resmi oleh pemerintah kolonial. Namun,
                pengakuan ini juga membawa perubahan dalam struktur pemerintahan
                adat. Meskipun demikian, masyarakat tetap mempertahankan
                identitas budaya mereka melalui gelar-gelar adat dan sistem
                kekerabatan matrilineal yang terus diwariskan dari generasi ke
                generasi.
              </p>
            </div>
          </div>

          {/* Illustration */}
          <div
            data-reveal
            className="order-1 flex items-center justify-center lg:order-2 lg:col-span-2"
          >
            <div className="relative flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72">
              <div className="absolute inset-0 rounded-2xl border border-white/5 bg-white/[0.02]" />
              <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
                <FaLandmark className="h-12 w-12 text-amber-400/70" />
                <p className="text-xs leading-relaxed text-slate-500">
                  Pemerintahan Hindia Belanda
                  <br />
                  mengakui Tanjuang Baringin
                  <br />
                  sebagai Nagari pada 1908
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Perjuangan */}
        <div className="mb-24 grid grid-cols-1 items-center gap-12 lg:grid-cols-5">
          <div
            data-reveal
            className="flex items-center justify-center lg:col-span-2"
          >
            <div className="relative flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72">
              <div className="absolute inset-0 rounded-2xl border border-white/5 bg-white/[0.02]" />
              <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
                <FaStar className="h-12 w-12 text-amber-400/70" />
                <p className="text-xs leading-relaxed text-slate-500">
                  Pemuda-pemuda nagari
                  <br />
                  turut berjuang mempertahankan
                  <br />
                  kemerdekaan RI 1945–1949
                </p>
              </div>
            </div>
          </div>

          <div data-reveal className="space-y-5 lg:col-span-3">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Perebutan{" "}
              <span className="text-amber-400">Kemerdekaan</span>
            </h2>
            <div className="h-0.5 w-16 rounded-full bg-amber-400/60" />
            <div className="space-y-4 text-sm leading-relaxed text-slate-400 sm:text-base">
              <p>
                Ketika Proklamasi Kemerdekaan Indonesia dikumandangkan pada 17
                Agustus 1945, semangat itu cepat menyebar ke seluruh pelosok
                negeri, termasuk Tanjuang Baringin. Para pemuda nagari tidak
                tinggal diam. Mereka bergabung dengan laskar-laskar perjuangan,
                membentuk barisan pertahanan, dan ikut serta dalam berbagai
                pertempuran melawan tentara Belanda yang ingin kembali
                menjajah.
              </p>
              <p>
                Masa revolusi fisik (1945–1949) menjadi salah satu babak paling
                berdarah namun juga paling membanggakan dalam sejarah nagari.
                Banyak putra terbaik Tanjuang Baringin yang gugur di medan
                perang. Nama-nama mereka kini diabadikan sebagai pahlawan daerah
                dan dikenang setiap tahun dalam upacara peringatan hari
                pahlawan.
              </p>
            </div>
          </div>
        </div>

        {/* Row 4: Masa Kini */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-5">
          <div
            data-reveal
            className="order-2 space-y-5 lg:order-1 lg:col-span-3"
          >
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Transformasi Menuju{" "}
              <span className="text-amber-400">Nagari Modern</span>
            </h2>
            <div className="h-0.5 w-16 rounded-full bg-amber-400/60" />
            <div className="space-y-4 text-sm leading-relaxed text-slate-400 sm:text-base">
              <p>
                Memasuki era reformasi dan otonomi daerah, Tanjuang Baringin
                kembali menemukan identitasnya sebagai nagari. Dengan Peraturan
                Daerah tentang Nagari, sistem pemerintahan nagari dihidupkan
                kembali lengkap dengan Wali Nagari, Badan Musyawarah Nagari
                (BAMUS), dan lembaga-lembaga adat yang kembali berfungsi
                sebagaimana mestinya.
              </p>
              <p>
                Kini, di bawah kepemimpinan Wali Nagari dan dukungan penuh
                masyarakat, Tanjuang Baringin terus berbenah. Berbagai program
                pembangunan — mulai dari infrastruktur, pelayanan publik
                berbasis digital, pemberdayaan ekonomi kreatif, hingga
                pelestarian budaya — dijalankan secara berkesinambungan untuk
                mewujudkan nagari yang maju, sejahtera, dan bermartabat.
              </p>
              <p className="text-slate-300">
                <span className="font-semibold text-amber-400">
                  "Adat basandi syarak, syarak basandi Kitabullah"
                </span>{" "}
                — pegangan hidup masyarakat Minangkabau ini terus dijunjung
                tinggi sebagai pedoman dalam setiap langkah pembangunan Nagari
                Tanjuang Baringin.
              </p>
            </div>
          </div>

          <div
            data-reveal
            className="order-1 flex items-center justify-center lg:order-2 lg:col-span-2"
          >
            <div className="relative flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72">
              <div className="absolute inset-0 rounded-2xl border border-white/5 bg-white/[0.02]" />
              <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
                <FaPeopleArrows className="h-12 w-12 text-amber-400/70" />
                <p className="text-xs leading-relaxed text-slate-500">
                  Transformasi nagari
                  <br />
                  menuju pelayanan publik
                  <br />
                  berbasis digital
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TIMELINE SECTION
         ════════════════════════════════════════ */}
      <section className="relative z-10 pb-24 sm:pb-36">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-3xl px-4 text-center">
          <div
            data-reveal
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-5 py-1.5 text-xs uppercase tracking-[0.2em] text-amber-400/80"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Garis Waktu
          </div>
          <h2
            data-reveal
            className="text-3xl font-black tracking-tight text-white sm:text-4xl"
          >
            Perjalanan Nagari
            <br />
            <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              Dalam Lintasan Masa
            </span>
          </h2>
          <div
            data-reveal
            className="mx-auto mt-4 h-0.5 w-20 rounded-full bg-amber-400/60"
          />
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative mx-auto max-w-5xl px-4">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px sm:left-1/2 sm:-translate-x-1/2">
            <div
              data-timeline-line
              className="h-full w-full bg-linear-to-b from-amber-400/40 via-amber-500/20 to-transparent origin-top"
            />
          </div>

          {/* Events */}
          <div className="relative space-y-16">
            {timelineEvents.map((event, idx) => {
              const Icon = event.icon;
              const isLeft = idx % 2 === 0;

              return (
                <div
                  key={event.year}
                  data-timeline-item
                  className="relative flex flex-col sm:flex-row sm:items-start"
                >
                  {/* Desktop layout */}
                  <div
                    className={`hidden sm:block w-1/2 ${
                      isLeft ? "pr-12 text-right" : "pl-12"
                    }`}
                  >
                    {isLeft ? (
                      <>
                        <div className="inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-amber-400">
                          {event.year}
                        </div>
                        <h3 className="mt-3 text-lg font-bold text-white">
                          {event.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-slate-500">
                          {event.description}
                        </p>
                      </>
                    ) : null}
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-8 top-0 z-10 flex -translate-x-1/2 items-center justify-center sm:left-1/2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-500/30 bg-emerald-950 shadow-lg shadow-amber-500/10">
                      <Icon className="h-4 w-4 text-amber-400" />
                    </div>
                  </div>

                  {/* Mobile content (always full width) */}
                  <div className="pl-16 sm:hidden">
                    <div className="inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-400">
                      {event.year}
                    </div>
                    <h3 className="mt-2 text-base font-bold text-white">
                      {event.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                      {event.description}
                    </p>
                  </div>

                  {/* Desktop right side */}
                  <div className={`hidden sm:block w-1/2 ${isLeft ? "" : "pl-12"}`}>
                    {!isLeft ? (
                      <>
                        <div className="inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-amber-400">
                          {event.year}
                        </div>
                        <h3 className="mt-3 text-lg font-bold text-white">
                          {event.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-slate-500">
                          {event.description}
                        </p>
                      </>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CLOSING QUOTE
         ════════════════════════════════════════ */}
      <section className="relative z-10 pb-28 sm:pb-40">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div
            data-reveal
            className="relative rounded-2xl border border-white/5 bg-white/[0.02] px-8 py-14 sm:px-16 sm:py-20"
          >
            {/* Decorative quote marks */}
            <div className="absolute top-4 left-6 text-6xl leading-none text-amber-400/10 font-serif select-none">
              &ldquo;
            </div>
            <div className="absolute bottom-4 right-6 text-6xl leading-none text-amber-400/10 font-serif select-none">
              &rdquo;
            </div>

            <blockquote className="relative z-10 text-lg leading-relaxed text-slate-300 sm:text-xl">
              &ldquo;Masyarakat yang tidak mengetahui sejarahnya adalah
              masyarakat yang tidak memiliki masa depan. Dengan mengenang dan
              mempelajari perjalanan nagari ini, kita menghormati jasa para
              pendahulu sekaligus mempersiapkan langkah terbaik untuk
              generasi yang akan datang.&rdquo;
            </blockquote>

            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-amber-400/40" />
              <span className="text-xs uppercase tracking-[0.2em] text-amber-400/60">
                Pemerintahan Nagari Tanjuang Baringin
              </span>
              <div className="h-px w-8 bg-amber-400/40" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
