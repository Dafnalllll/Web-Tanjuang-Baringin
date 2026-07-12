import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaEye,
  FaBullseye,
  FaHandshake,
  FaLeaf,
  FaBookOpen,
  FaUsers,
  FaStar,
  FaBalanceScale,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const misiData = [
  {
    icon: FaHandshake,
    title: "Penguatan Kelembagaan",
    description:
      "Memperkuat kelembagaan nagari yang transparan, akuntabel, dan partisipatif berbasis adat dan syarak.",
  },
  {
    icon: FaUsers,
    title: "Pemberdayaan Masyarakat",
    description:
      "Meningkatkan kapasitas dan kemandirian masyarakat melalui program pemberdayaan ekonomi, pendidikan, dan kesehatan.",
  },
  {
    icon: FaLeaf,
    title: "Pelestarian Budaya & Lingkungan",
    description:
      "Melestarikan nilai-nilai adat, budaya Minangkabau, serta menjaga kelestarian lingkungan dan sumber daya alam nagari.",
  },
  {
    icon: FaBookOpen,
    title: "Pendidikan & Literasi",
    description:
      "Mendorong peningkatan kualitas pendidikan dan literasi digital bagi seluruh lapisan masyarakat nagari.",
  },
  {
    icon: FaBalanceScale,
    title: "Keadilan & Kesejahteraan",
    description:
      "Mewujudkan keadilan sosial dan kesejahteraan merata melalui pembangunan infrastruktur dan layanan publik yang inklusif.",
  },
  {
    icon: FaStar,
    title: "Inovasi & Digitalisasi",
    description:
      "Mengembangkan pelayanan publik berbasis digital dan mendorong inovasi di berbagai sektor untuk nagari yang modern dan kompetitif.",
  },
];

const visiText =
  "Terwujudnya Nagari Tanjuang Baringin yang Madani, Sejahtera, dan Berbudaya Berlandaskan Adat Basandi Syarak, Syarak Basandi Kitabullah";

export default function VisiMisi() {
  const sectionRef = useRef(null);
  const heroContentRef = useRef(null);
  const bgCanvasRef = useRef(null);

  /* ── Floating particles ── */
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    const particles = Array.from({ length: 35 }, () => ({
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
      const badge = hero.querySelector("[data-hero-badge]");
      const title = hero.querySelector("[data-hero-title]");
      const line = hero.querySelector("[data-hero-line]");
      const subtitle = hero.querySelector("[data-hero-subtitle]");

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

  /* ── Content reveal on scroll ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const blocks = section.querySelectorAll("[data-reveal]");
      blocks.forEach((el) => {
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

  /* ── Misi cards stagger ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll("[data-misi-card]");
      cards.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 90%",
          onEnter: () => {
            gsap.fromTo(
              card,
              { y: 30, opacity: 0, scale: 0.97 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "power3.out",
              }
            );
          },
          once: true,
        });
      });
    }, section);

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
        id="visi-misi"
        className="relative z-10 flex min-h-[70vh] items-center justify-center pt-28 pb-16 sm:pt-32 sm:pb-20"
      >
        {/* Decorative glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/3 blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

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
            Visi & Misi
          </div>

          {/* Title */}
          <h1
            data-hero-title
            className="text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Visi &{" "}
            <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              Misi
            </span>
            <br />
            Nagari
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
            Arahan dan tujuan pembangunan Nagari Tanjuang Baringin yang
            berlandaskan pada nilai-nilai adat Minangkabau, kearifan lokal,
            serta semangat kemajuan menuju nagari yang madani dan sejahtera.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          VISI SECTION
         ════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className="relative z-10 mx-auto max-w-6xl px-4 pb-20 sm:pb-32"
      >
        {/* ── VISI ── */}
        <div data-reveal className="mb-28">
          <div className="mx-auto max-w-4xl text-center">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20">
                <FaEye className="h-9 w-9 text-amber-400" />
              </div>
            </div>

            <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
                VISI
              </span>{" "}
              Nagari
            </h2>

            <div className="mx-auto mb-6 h-0.5 w-20 rounded-full bg-amber-400/60" />

            {/* Visi Card */}
            <div className="relative rounded-2xl border border-amber-500/10 bg-linear-to-br from-amber-500/5 to-transparent px-6 py-10 sm:px-12 sm:py-14">
              {/* Decorative quote marks */}
              <div className="absolute top-4 left-6 text-5xl leading-none text-amber-400/10 font-serif select-none">
                &ldquo;
              </div>
              <div className="absolute bottom-4 right-6 text-5xl leading-none text-amber-400/10 font-serif select-none">
                &rdquo;
              </div>

              <p className="relative z-10 text-lg leading-relaxed text-slate-200 sm:text-xl md:text-2xl font-medium">
                {visiText}
              </p>

              {/* Bottom decoration */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-amber-400/30" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400/50">
                  Cita-Cita Bersama
                </span>
                <div className="h-px w-12 bg-amber-400/30" />
              </div>
            </div>
          </div>
        </div>

        {/* ── MISI ── */}
        <div>
          {/* Section header */}
          <div className="mb-14 text-center">
            <div
              data-reveal
              className="mb-6 flex justify-center"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20">
                <FaBullseye className="h-9 w-9 text-amber-400" />
              </div>
            </div>

            <h2
              data-reveal
              className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl"
            >
              <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
                MISI
              </span>{" "}
              Nagari
            </h2>

            <div
              data-reveal
              className="mx-auto h-0.5 w-20 rounded-full bg-amber-400/60"
            />

            <p
              data-reveal
              className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400"
            >
              Enam pilar utama dalam mewujudkan visi nagari yang madani,
              sejahtera, dan berbudaya
            </p>
          </div>

          {/* Misi Cards Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {misiData.map((misi, idx) => {
              const Icon = misi.icon;
              return (
                <div
                  key={misi.title}
                  data-misi-card
                  className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:border-amber-500/20 hover:bg-amber-500/[0.03] hover:shadow-lg hover:shadow-amber-500/5"
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  {/* Hover glow */}
                  <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-amber-500/5 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

                  {/* Number */}
                  <div className="absolute top-3 right-4 text-[11px] font-bold text-amber-400/20 select-none">
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/10 text-amber-400 transition-all duration-300 group-hover:bg-amber-500/20 group-hover:border-amber-500/30 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <h3 className="relative z-10 mb-2 text-base font-bold text-white">
                    {misi.title}
                  </h3>
                  <p className="relative z-10 text-xs leading-relaxed text-slate-400">
                    {misi.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-linear-to-r from-transparent via-amber-500/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
              &ldquo;Adat basandi syarak, syarak basandi Kitabullah&rdquo;
            </blockquote>

            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-amber-400/40" />
              <span className="text-xs uppercase tracking-[0.2em] text-amber-400/60">
                Filosofi hidup masyarakat Minangkabau
              </span>
              <div className="h-px w-8 bg-amber-400/40" />
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-xs leading-relaxed text-slate-500">
              Visi dan misi ini merupakan komitmen bersama antara
              Pemerintahan Nagari, BAMUS, ninik mamak, alim ulama, cadiak
              pandai, dan seluruh elemen masyarakat Nagari Tanjuang Baringin
              untuk mewujudkan masa depan yang lebih baik.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
