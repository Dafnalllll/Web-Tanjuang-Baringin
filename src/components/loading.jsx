import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import tanjuangLogo from "../assets/tanjuangbaringin.webp";

const LOADING_LABELS = [
  "Memuat halaman",
  "Menyiapkan konten",
  "Menghadirkan nagari",
  "Mengumpulkan informasi",
];

export default function LoadingScreen({ caption }) {
  const canvasRef = useRef(null);
  const progressRef = useRef(null);
  const [percent, setPercent] = useState(0);
  const [activeLabel, setActiveLabel] = useState(0);

  /* ── Floating particles + connecting lines ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.6,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35 - 0.1,
      alpha: Math.random() * 0.45 + 0.1,
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

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(251, 191, 36, ${0.06 * (1 - dist / 110)})`;
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

  /* ── Progress bar + percentage (smooth loop) ── */
  useEffect(() => {
    const state = { p: 0 };
    const tween = gsap.to(state, {
      p: 100,
      duration: 3.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      onUpdate: () => setPercent(Math.round(state.p)),
    });

    const barTween = gsap.fromTo(
      progressRef.current,
      { scaleX: 0.02 },
      {
        scaleX: 1,
        transformOrigin: "left center",
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      },
    );

    return () => {
      tween.kill();
      barTween.kill();
    };
  }, []);

  /* ── Rotating caption ── */
  useEffect(() => {
    const id = setInterval(() => {
      setActiveLabel((i) => (i + 1) % LOADING_LABELS.length);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const label = caption ?? LOADING_LABELS[activeLabel];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed inset-0 z-200 flex flex-col items-center justify-center overflow-hidden bg-emerald-950"
      aria-label="Memuat halaman"
      role="status"
    >
      {/* ── Ambient glows ── */}
      <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[80px]" />
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-emerald-700/20 blur-[100px]" />
      <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-yellow-700/10 blur-[120px]" />

      {/* ── Floating particles ── */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* ── Center content ── */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="relative flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44">
          {/* Pulsing halo */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.35, 0.1, 0.35] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-amber-400/20 blur-2xl"
          />

          {/* Dashed ring (slow) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/25"
          />

          {/* Conic ring (fast, opposite direction) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-1.5 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "rgba(251, 191, 36, 0.9)",
              borderRightColor: "rgba(251, 191, 36, 0.25)",
            }}
          />

          {/* Orbiting dot */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
            style={{ transformOrigin: "center" }}
          >
            <span className="absolute top-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
          </motion.div>

          {/* Logo */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-amber-400/30 bg-emerald-900/60 shadow-[0_0_30px_rgba(251,191,36,0.18)] sm:h-28 sm:w-28"
          >
            <img
              src={tanjuangLogo}
              alt="Logo Nagari Tanjuang Baringin"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          className="mt-8 bg-linear-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-sm font-black uppercase tracking-[0.4em] text-transparent"
        >
          Tanjuang Baringin
        </motion.h1>

        {/* Rotating caption */}
        <div className="mt-3 h-5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400"
            >
              <span>{label}</span>
              <span className="inline-flex gap-0.5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.18,
                    }}
                    className="inline-block h-1 w-1 rounded-full bg-amber-400"
                  />
                ))}
              </span>
            </motion.p>
          </AnimatePresence>
        </div>

        {/* ── Progress bar ── */}
        <div className="mt-6 w-64 sm:w-80">
          <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <span>Memuat</span>
            <span className="tabular-nums text-amber-300">{percent}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              ref={progressRef}
              className="h-full w-full origin-left scale-x-[0.02] rounded-full bg-linear-to-r from-amber-400 via-amber-300 to-yellow-300"
              style={{ boxShadow: "0 0 12px rgba(251, 191, 36, 0.6)" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
