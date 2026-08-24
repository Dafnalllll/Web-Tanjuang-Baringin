import { useCallback, useState } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import { ToastContext } from "./toastContext";

/* ─── Ikon & warna per tipe ─── */
const toastStyles = {
  success: {
    icon: FaCheckCircle,
    iconClass: "text-emerald-400",
    bar: "bg-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-950/95",
  },
  error: {
    icon: FaExclamationTriangle,
    iconClass: "text-red-400",
    bar: "bg-red-400",
    border: "border-red-500/30",
    bg: "bg-red-950/95",
  },
  warning: {
    icon: FaExclamationTriangle,
    iconClass: "text-amber-400",
    bar: "bg-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-950/95",
  },
  info: {
    icon: FaInfoCircle,
    iconClass: "text-sky-400",
    bar: "bg-sky-400",
    border: "border-sky-500/30",
    bg: "bg-sky-950/95",
  },
};

const toastTitles = {
  success: "Berhasil",
  error: "Gagal",
  warning: "Perhatian",
  info: "Informasi",
};

let toastIdCounter = 0;

/* ─── Provider ─── */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (type = "info", message = "", opts = {}) => {
      const id = ++toastIdCounter;
      const duration = opts.duration ?? 4000;
      const toast = { id, type, message, title: opts.title };

      setToasts((prev) => [...prev.slice(-4), toast]);

      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
      return id;
    },
    [dismiss],
  );

  const api = {
    success: (message, opts) => show("success", message, opts),
    error: (message, opts) => show("error", message, opts),
    warning: (message, opts) => show("warning", message, opts),
    info: (message, opts) => show("info", message, opts),
    dismiss,
  };

  return (
    <ToastContext.Provider value={api}>
      {children}

      {/* ── Container ── */}
      <div className="pointer-events-none fixed top-5 right-5 z-100 flex w-full max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/* ─── Item ─── */
function ToastItem({ toast, onDismiss }) {
  const style = toastStyles[toast.type] || toastStyles.info;
  const Icon = style.icon;

  return (
    <div
      className={`pointer-events-auto relative overflow-hidden rounded-xl border ${style.border} ${style.bg} backdrop-blur-xl shadow-2xl shadow-black/50`}
    >
      {/* Progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 ${style.bar}`}
        style={{
          animation: "toast-progress 4s linear forwards",
        }}
      />
      {/* Accent bar kiri */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${style.bar}`} />

      <div className="flex items-start gap-3 py-3.5 pl-5 pr-3.5">
        <span className={`mt-0.5 ${style.iconClass}`}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-white">
            {toast.title || toastTitles[toast.type]}
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-300">
            {toast.message}
          </p>
        </div>
        <button
          onClick={() => onDismiss(toast.id)}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Tutup notifikasi"
        >
          <FaTimes className="h-3 w-3 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
