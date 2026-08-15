import { motion } from "framer-motion";

/* ─── Warna badge ─── */
const variants = {
  amber:
    "border-amber-400/70 bg-amber-400 text-amber-950 shadow-md shadow-amber-400/40",
  red: "border-red-500/80 bg-red-500 text-red-50 shadow-md shadow-red-500/40",
  emerald:
    "border-emerald-400/70 bg-emerald-400 text-emerald-950 shadow-md shadow-emerald-400/40",
  sky: "border-sky-400/70 bg-sky-400 text-sky-950 shadow-md shadow-sky-400/40",
  violet:
    "border-violet-400/70 bg-violet-400 text-violet-950 shadow-md shadow-violet-400/40",
  neutral: "border-white/30 bg-white/15 text-white shadow-md shadow-black/30",
};

/* ─── Warna ring pulse (harus literal agar Tailwind terbaca) ─── */
const pingColors = {
  amber: "bg-amber-400/60",
  red: "bg-red-500/60",
  emerald: "bg-emerald-400/60",
  sky: "bg-sky-400/60",
  violet: "bg-violet-400/60",
  neutral: "bg-white/30",
};

/* ─── Ukuran badge ─── */
const sizes = {
  sm: "min-w-4.5 h-4.5 px-1 text-[9px]",
  md: "min-w-6 h-6 px-1.5 text-[11px]",
  lg: "min-w-7 h-7 px-2 text-xs",
};

/**
 * Badge angka dengan animasi untuk panel admin.
 * - Pop-in spring setiap nilai berubah (agar admin langsung sadar ada update).
 * - Opsi `pulse` menambahkan ring berkedip untuk menarik perhatian.
 * - Bila count melebihi `max`, tampilkan "{max}+" (contoh: 99+).
 */
export default function Badge({
  count = 0,
  max = 99,
  variant = "amber",
  size = "md",
  pulse = false,
  showZero = false,
  title,
  className = "",
}) {
  /* Sembunyikan badge saat nol, kecuali diminta tampil */
  if (count <= 0 && !showZero) return null;

  const display = count > max ? `${max}+` : String(count);

  return (
    <span
      className="relative inline-flex shrink-0"
      title={title || `${count} item`}
    >
      {pulse && (
        <span
          className={`absolute inset-0 rounded-full ${pingColors[variant]} animate-ping`}
          aria-hidden="true"
        />
      )}
      <motion.span
        key={display}
        initial={{ scale: 0.3, opacity: 0, rotate: -14 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 520, damping: 17 }}
        className={`inline-flex items-center justify-center rounded-full border-2 font-black leading-none ${variants[variant]} ${sizes[size]} ${className}`}
      >
        {display}
      </motion.span>
    </span>
  );
}
