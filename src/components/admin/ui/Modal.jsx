import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function Modal({
  isOpen,
  onClose,
  title,
  icon: Icon,
  children,
  footer,
  size = "md",
}) {
  /* ── Lock scroll & tombol Esc ── */
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClass = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  }[size] || "max-w-xl";

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-emerald-950/95 shadow-2xl shadow-black/60 backdrop-blur-xl animate-modal-in ${sizeClass}`}
        style={{ maxHeight: "90vh" }}
      >
        {/* Accent line atas */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-amber-400/70 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-400">
                <Icon className="h-4 w-4" />
              </span>
            )}
            <h3 className="text-base font-bold text-white">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-all hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-400"
            aria-label="Tutup modal"
          >
            <FaTimes className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="admin-scroll overflow-y-auto px-6 py-5" style={{ maxHeight: "calc(90vh - 140px)" }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-white/5 bg-white/2 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
