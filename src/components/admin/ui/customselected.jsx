import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaCheck } from "react-icons/fa";

export default function CustomSelect({
  options = [],
  value,
  placeholder = "Pilih...",
  onChange,
  error = false,
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => {
          const nextOpen = !open;

          setOpen(nextOpen);

          if (nextOpen) {
            setTimeout(() => {
              wrapperRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }, 50);
          }
        }}
        className={`
        flex w-full items-center justify-between text-white cursor-pointer
        rounded-xl border px-4 py-3 text-left
        transition-all duration-300
        ${error ? "border-red-500/50" : "border-white/10 hover:border-amber-500/40"}
        bg-white/4
      `}
      >
        <span className={value ? "text-white" : "text-slate-500"}>
          {value || placeholder}
        </span>

        <FaChevronDown
          className={`
          transition-all duration-300
          ${open ? "rotate-180 text-amber-400" : "text-slate-400"}
        `}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
          absolute z-50 mt-2 w-full
          overflow-hidden rounded-xl
          border border-white/10
          bg-emerald-950
          shadow-2xl
          origin-top
          animate-[dropdown_0.25s_ease-out]
        "
        >
          {options.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className="
                flex w-full items-center
                justify-between px-4 py-3
                text-left text-white
                transition-colors
                hover:bg-amber-500/10 cursor-pointer
              "
            >
              {item}

              {value === item && <FaCheck className="text-amber-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
