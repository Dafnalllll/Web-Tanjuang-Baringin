export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "border-amber-500/30 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 hover:text-amber-200",
    secondary:
      "border-white/10 bg-white/4 text-slate-300 hover:bg-white/10 hover:text-white",
    danger:
      "border-red-500/30 bg-red-500/15 text-red-300 hover:bg-red-500/25 hover:text-red-200",
    success:
      "border-emerald-500/30 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 hover:text-emerald-200",
    ghost: "border-transparent bg-transparent text-slate-400 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[11px] gap-1.5",
    md: "px-4 py-2.5 text-xs gap-2",
    lg: "px-6 py-3 text-sm gap-2",
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg border font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </button>
  );
}
