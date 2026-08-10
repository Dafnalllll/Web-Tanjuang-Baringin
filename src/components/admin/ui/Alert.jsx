import { useState } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

const alertStyles = {
  success: {
    icon: FaCheckCircle,
    iconClass: "text-emerald-400",
    border: "border-emerald-500/25",
    bg: "bg-emerald-950/60",
  },
  error: {
    icon: FaExclamationTriangle,
    iconClass: "text-red-400",
    border: "border-red-500/25",
    bg: "bg-red-950/60",
  },
  warning: {
    icon: FaExclamationTriangle,
    iconClass: "text-amber-400",
    border: "border-amber-500/25",
    bg: "bg-amber-950/60",
  },
  info: {
    icon: FaInfoCircle,
    iconClass: "text-sky-400",
    border: "border-sky-500/25",
    bg: "bg-sky-950/60",
  },
};

export default function Alert({
  type = "info",
  title,
  children,
  dismissible = false,
  className = "",
}) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const style = alertStyles[type] || alertStyles.info;
  const Icon = style.icon;

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border ${style.border} ${style.bg} px-4 py-3.5 ${className}`}
      role="alert"
    >
      <span className={`mt-0.5 shrink-0 ${style.iconClass}`}>
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div className="min-w-0 flex-1">
        {title && <p className="text-sm font-bold text-white">{title}</p>}
        <div className={`text-xs leading-relaxed text-slate-300 ${title ? "mt-0.5" : ""}`}>
          {children}
        </div>
      </div>
      {dismissible && (
        <button
          onClick={() => setVisible(false)}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Tutup alert"
        >
          <FaTimes className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
