function SectionHeader({ title, subtitle, badge, description }) {
  return (
    <div className="mb-24 text-center" data-section-header>
      {badge && (
        <div
          data-header-badge
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/80"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          {badge}
        </div>
      )}

      <h2
        data-header-title
        className="text-4xl font-black tracking-tight text-white md:text-5xl"
      >
        {title}{" "}
        <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
          {subtitle}
        </span>
      </h2>

      {(title || subtitle) && (
        <div
          data-header-line
          className="mx-auto mt-5 h-0.5 w-20 rounded-full bg-amber-400/60"
        />
      )}

      {description && (
        <p
          data-header-desc
          className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-stone-400 md:text-base"
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
