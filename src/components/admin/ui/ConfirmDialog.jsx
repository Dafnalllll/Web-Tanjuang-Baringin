import { useEffect } from "react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Yakin ingin menghapus?",
  message = "Data yang dihapus tidak dapat dikembalikan.",
  confirmText = "Ya, Hapus",
  cancelText = "Batal",
  loading = false,
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

  return (
    <div className="fixed inset-0 z-90 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-emerald-950/95 shadow-2xl shadow-black/60 backdrop-blur-xl animate-modal-in">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-red-400/70 to-transparent" />

        <div className="px-6 pt-6 pb-4 text-center">
          {/* Ikon */}
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-red-500/25 bg-red-500/10">
            <FaExclamationTriangle className="h-6 w-6 text-red-400" />
          </div>

          <h3 className="text-base font-bold text-white">{title}</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            {message}
          </p>
        </div>

        {/* Aksi */}
        <div className="flex items-center justify-end gap-3 border-t border-white/5 bg-white/2 px-6 py-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/4 px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            <FaTimes className="h-3 w-3 " />
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/15 px-4 py-2 text-xs font-bold text-red-300 transition-all hover:bg-red-500/25 hover:text-red-200 disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-red-300/40 border-t-red-300" />
                Menghapus...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
