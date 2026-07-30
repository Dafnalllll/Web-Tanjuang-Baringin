export default function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="mb-10 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center border-2 border-amber-600/30 bg-amber-900/20">
        <Icon className="h-6 w-6 text-amber-400" />
      </div>

      <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
        {title}
      </h3>

      {subtitle && (
        <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-stone-500">
          {subtitle}
        </p>
      )}

      <div className="mx-auto mt-3 h-0.5 w-16 bg-amber-600/30" />
    </div>
  );
}
