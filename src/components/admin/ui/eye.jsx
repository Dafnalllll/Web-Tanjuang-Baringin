import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function PasswordInput({
  value,
  onChange,
  placeholder,
  className = "",
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-xl  border border-white/10 bg-black/20 px-4 py-3 pr-12 text-white outline-none transition focus:border-amber-400 ${className}`}
        {...rest}
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={
          showPassword ? "Sembunyikan password" : "Tampilkan password"
        }
        aria-pressed={showPassword}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 transition hover:text-amber-400"
      >
        {showPassword ? (
          <MdVisibilityOff className="h-5 w-5 cursor-pointer" />
        ) : (
          <MdVisibility className="h-5 w-5 cursor-pointer" />
        )}
      </button>
    </div>
  );
}
