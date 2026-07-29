function StatCard({ children, className = "", ...props }) {
  return (
    <div
      {...props}
      className={`group relative cursor-pointer border-2 border-stone-800/60 bg-stone-900/40 p-7 transition-all duration-300 hover:bg-stone-900/60 ${className}`}
    >
      <div className="absolute top-0 right-0 h-6 w-6 border-t border-r border-amber-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-amber-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {children}
    </div>
  );
}

export default StatCard;
