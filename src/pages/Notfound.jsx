import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, Map } from "lucide-react";

const numberClass =
  "bg-linear-to-b from-amber-300 via-amber-400 to-amber-700 bg-clip-text text-[5.5rem] leading-none font-black text-transparent drop-shadow-[0_0_35px_rgba(251,191,36,0.25)] sm:text-[9rem] md:text-[11rem]";

export default function NotFound() {
  const bgCanvasRef = useRef(null);

  /* ── Floating particle network (same style as Home hero) ── */
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    const particles = Array.from({ length: 45 }, () => ({
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

  return (
    <div className="relative flex h-screen items-center justify-center bg-emerald-950 overflow-hidden px-6">
      {/* ── Particle canvas ── */}
      <canvas
        ref={bgCanvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* ── Glow blobs ── */}
      <div className="pointer-events-none absolute top-24 -left-32 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-32 bottom-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* ── Badge ── */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-300 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
          Error 404
        </motion.p>

        {/* ── The big 404 ── */}
        <div className="mt-8 flex items-center justify-center gap-3 sm:gap-6">
          <motion.span
            initial={{ y: 80, opacity: 0, rotate: -10 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 100,
              damping: 12,
            }}
            className={numberClass}
          >
            4
          </motion.span>

          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{
              delay: 0.35,
              type: "spring",
              stiffness: 90,
              damping: 12,
            }}
            className="relative flex h-28 w-28 items-center justify-center sm:h-44 sm:w-44 md:h-52 md:w-52"
          >
            <div className="absolute inset-0 animate-[spin_28s_linear_infinite] rounded-full border-2 border-dashed border-amber-400/30" />
            <div className="absolute inset-4 rounded-full border border-amber-400/15" />
            <div className="absolute inset-0 rounded-full bg-amber-500/5 blur-xl" />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <Compass className="h-12 w-12 text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.35)] sm:h-16 sm:w-16 md:h-20 md:w-20" />
            </motion.div>
          </motion.div>

          <motion.span
            initial={{ y: 80, opacity: 0, rotate: 10 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{
              delay: 0.55,
              type: "spring",
              stiffness: 100,
              damping: 12,
            }}
            className={numberClass}
          >
            4
          </motion.span>
        </div>

        {/* ── Title ── */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
          className="mt-8 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          Ups! Kamu Tersesat di{" "}
          <span className="bg-linear-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
            Nagari
          </span>
        </motion.h1>

        {/* ── Description ── */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6, ease: "easeOut" }}
          className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          Halaman yang kamu cari mungkin telah dipindahkan, dihapus, atau tidak
          pernah ada. Ayo kembali dan jelajahi kekayaan budaya, alam, serta
          semangat Nagari Tanjuang Baringin.
        </motion.p>

        {/* ── Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/home"
            className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-white/5 px-8 py-3.5 text-sm font-bold text-amber-300 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/50 hover:bg-white/10 hover:shadow-lg hover:shadow-amber-500/20"
          >
            <Map className="h-4 w-4" />
            Jelajahi Nagari
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
