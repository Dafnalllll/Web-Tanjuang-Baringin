import { FaUserCircle } from "react-icons/fa";

export default function PersonCard({ person }) {
  return (
    <div
      data-card
      className="group relative border-2 border-stone-700/70 bg-stone-900/60 p-5 transition-all duration-300 hover:border-amber-600/40 hover:bg-stone-900/80 hover:-translate-y-1 cursor-pointer"
    >
      {/* Foto */}
      <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center overflow-hidden border-2 border-stone-700 bg-stone-800/80 transition-all duration-300 group-hover:border-amber-600/40">
        {person.foto ? (
          <img
            src={person.foto}
            alt={person.nama || person.jabatan}
            className="h-full w-full object-cover transition-transform duration-300"
            style={{
              objectPosition: `${person.fotoPositionX || "center"} ${person.fotoPositionY || "center"}`,
              transform: `scale(${person.fotoScale || 1})`,
            }}
          />
        ) : (
          <div className="flex flex-col items-center gap-1 text-stone-600">
            <FaUserCircle className="h-12 w-12" />
            <span className="text-[9px] uppercase tracking-widest">Foto</span>
          </div>
        )}
      </div>

      {/* Nama */}
      <p className="mb-1 flex min-h-10 items-center justify-center text-center text-sm font-bold leading-snug text-white">
        {person.nama || (
          <span className="text-xs font-normal italic text-stone-600">
            — nama belum diisi —
          </span>
        )}
      </p>

      {/* Jabatan */}
      <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-amber-400/80">
        {person.jabatan}
      </p>
    </div>
  );
}
