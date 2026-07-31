import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowDown, Compass } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import background from "../assets/background1.webp";
import VisiMisi from "../components/section/tentang/visimisi";
import Statistik from "../components/section/tentang/statistik";
import MapSection from "../components/section/map";
import Galeri from "../components/section/lain/galeri"

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const bgCanvasRef = useRef(null);
  const heroRef = useRef(null);
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef([]);
  const scrollIndicatorRef = useRef(null);
  const { hash } = useLocation();
  const navigate = useNavigate();

  /* ── Scroll to hash on mount ── */
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  }, [hash]);

  /* ── Floating particles ── */
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4 - 0.12,
      alpha: Math.random() * 0.5 + 0.1,
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

      /* ── Draw connecting lines between nearby particles ── */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(251, 191, 36, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

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

  /* ── GSAP entrance animations ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      /* Timeline for smooth staggered entrance */
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, delay: 0.15 },
      )
        .fromTo(
          titleRef.current,
          { y: 60, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
          "-=0.3",
        )
        .fromTo(
          descRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4",
        )
        .fromTo(
          buttonsRef.current.filter(Boolean),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 },
          "-=0.3",
        )
        .fromTo(
          scrollIndicatorRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.1",
        );
    }, hero);

    return () => ctx.revert();
  }, []);

  /* ── Glow effect on title letters (GSAP) ── */
  useEffect(() => {
    const titleEl = titleRef.current;
    if (!titleEl) return;

    const letters = titleEl.querySelectorAll("[data-letter]");
    if (!letters.length) return;

    letters.forEach((letter, i) => {
      gsap.to(letter, {
        textShadow:
          "0 0 20px rgba(251, 191, 36, 0.3), 0 0 40px rgba(251, 191, 36, 0.1)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.08,
      });
    });
  }, []);

  /* ── ScrollTrigger for parallax-like effect on background ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          gsap.to(hero, {
            y: self.progress * 80,
            duration: 0.1,
            overwrite: "auto",
          });
        },
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  const titleText = "Nagari Tanjuang Baringin";

  return (
    <>
      <div ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* ── Background Image ── */}
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${background})` }}
        />

        {/* ── Overlay Gradient ── */}
        <div className="fixed inset-0 -z-10 bg-linear-to-b from-emerald-950/70 via-black/65 to-emerald-950/80" />

        {/* ── Content ── */}
        <section className="relative z-10 flex min-h-screen items-center justify-center pt-24 sm:pt-28">
          <div className="mx-auto max-w-5xl px-6 text-center">
            {/* ── Subtitle ── */}
            <motion.p
              ref={subtitleRef}
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-300 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Selamat Datang di
            </motion.p>

            {/* ── Title ── */}
            <h1
              ref={titleRef}
              className="mt-6 text-5xl font-black leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            >
              <span className="text-white">Nagari</span>
              <span className="inline-flex flex-wrap justify-center gap-1 text-amber-400">
                {titleText
                  .replace("Nagari ", "")
                  .split("")
                  .map((char, i) => (
                    <span
                      key={i}
                      data-letter
                      className="inline-block"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
              </span>
            </h1>

            {/* ── Description ── */}
            <p
              ref={descRef}
              className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl"
            >
              Menjelajahi kekayaan budaya, keindahan alam, dan potensi nagari
              melalui satu platform yang menghadirkan informasi, tradisi, serta
              semangat masyarakat dalam membangun generasi yang kreatif,
              berbudaya, dan berdaya saing.
            </p>

            {/* ── Buttons ── */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <motion.button
                ref={(el) => (buttonsRef.current[0] = el)}
                onClick={() => navigate("/home#visi-misi")}
                className="group relative overflow-hidden rounded-full border bg-transparent px-8 py-3.5 font-bold text-white cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Compass className="h-4 w-4" />
                  Jelajahi Nagari
                </span>
                <span className="absolute inset-0 -translate-x-full rounded-full bg-linear-to-r from-amber-400 to-yellow-800 transition-transform duration-300 group-hover:translate-x-0" />
              </motion.button>
            </div>

            {/* ── Scroll Indicator ── */}
            <motion.div
              ref={scrollIndicatorRef}
              className="mt-16 flex flex-col items-center gap-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Scroll
              </span>
              <ArrowDown className="h-4 w-4 text-slate-500" />
            </motion.div>
          </div>
        </section>
      </div>

      {/* ── Visi & Misi Section ── */}
      <VisiMisi />

      {/* ── Statistik Section ── */}
      <Statistik />

      {/* ── Map / Lokasi Section ── */}
      <MapSection />

      {/* ── Galeri Section ── */}
      <Galeri />

      {/* ── Spacer to offset the fixed particle canvas from overlapping next sections ── */}
      <div className="relative z-0" />
    </>
  );
}
