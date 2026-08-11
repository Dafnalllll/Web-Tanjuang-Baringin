import { motion } from "framer-motion";
import { MdLogin } from "react-icons/md";
import { Link } from "react-router-dom";
import tanjuangLogo from "../assets/tanjuangbaringin.webp";
import { useMemo, useState } from "react";
import { useToast } from "../components/admin/ui/useToast";

export default function Auth() {
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        x: (i * 13) % 100,
        y: (i * 17) % 100,
        duration: 6 + (i % 6),
      })),
    [],
  );

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.warning("Username dan password wajib diisi", {
        title: "Form Belum Lengkap",
      });

      return;
    }

    toast.success("Data berhasil divalidasi", {
      title: "Login Berhasil",
    });

    // lanjutkan proses login API
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-emerald-950  px-4">
      {/* ── Background texture ── */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fcd34d' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-green-500/10 blur-[120px]" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-amber-400/40"
            initial={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0.2, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.4)]">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center">
            <motion.img
              src={tanjuangLogo}
              alt="Tanjuang Baringin"
              className="h-24 w-24 rounded-2xl"
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />

            <h1 className="mt-4 text-center text-2xl font-black text-white">
              Admin Panel
            </h1>

            <p className="mt-2 text-center text-sm text-slate-400">
              Website Nagari Tanjuang Baringin
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-amber-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-amber-400"
              />
            </div>

            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.98,
              }}
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-amber-500 to-yellow-400 py-3 font-bold text-emerald-950"
            >
              <MdLogin />
              Masuk
            </motion.button>
          </form>

          <Link
            to="/"
            className="mt-6 block text-center text-sm text-slate-400 transition hover:text-white"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
