import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      {/* Previous */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="flex h-9 w-9  cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <FaChevronLeft className="h-3 w-3" />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex h-9 w-9 items-center justify-center cursor-pointer rounded-lg border text-sm font-semibold transition-all ${
            currentPage === page
              ? "border-amber-500/30 bg-amber-500/15 text-amber-300"
              : "border-white/10 bg-white/5 text-slate-300 hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-300"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center cursor-pointer justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <FaChevronRight className="h-3 w-3" />
      </button>
    </div>
  );
}
