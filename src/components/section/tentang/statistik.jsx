import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Map,
  Building2,
  Users,
  House,
  Home,
  BadgeCheck,
  HeartPulse,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const statistics = [
  {
    title: "Luas Wilayah",
    value: "56.530",
    unit: "Ha",
    icon: Map,
  },
  {
    title: "Jumlah Jorong",
    value: "3",
    unit: "Jorong",
    icon: Building2,
  },
  {
    title: "Jumlah Penduduk",
    value: "6.268",
    unit: "Jiwa",
    icon: Users,
  },
  {
    title: "Jumlah KK",
    value: "2.288",
    unit: "KK",
    icon: House,
  },
  {
    title: "Jumlah Rumah",
    value: "1.159",
    unit: "Rumah",
    icon: Home,
  },
  {
    title: "IDM 2025",
    value: "89,76%",
    unit: "Mandiri",
    icon: BadgeCheck,
  },
  {
    title: "Stunting 2025",
    value: "0,127%",
    unit: "Sangat Rendah",
    icon: HeartPulse,
  },
];

/* ─── Parse a value string into a displayable numeric target for counting ─── */
function parseValue(raw) {
  // "56.530" → { prefix: "", numeric: 56530, suffix: "" }
  // "89,76%" → { prefix: "", numeric: 89.76, suffix: "%" }
  // "0,127%" → { prefix: "", numeric: 0.127, suffix: "%" }
  // "3" → { prefix: "", numeric: 3, suffix: "" }

  const suffixMatch = raw.match(/%+/g);
  const suffix = suffixMatch ? suffixMatch[0] : "";
  const clean = raw.replace(/%/g, "").replace(/\./g, "").replace(",", ".");
  const numeric = parseFloat(clean);
  return { numeric: isNaN(numeric) ? 0 : numeric, suffix };
}

/* ─── Format number with Indonesian thousand separators ─── */
function formatCount(value, raw) {
  const hasComma = raw.includes(",");
  const hasDot = raw.includes(".") && !raw.includes("%");
  const isPercent = raw.includes("%");

  let display;
  if (isPercent) {
    // Show decimal places matching original
    const decimals = raw.replace(",", ".").split(".")[1]?.length || 0;
    display = value.toFixed(decimals);
  } else if (hasComma) {
    const decimals = raw.split(",")[1]?.length || 0;
    display = value.toFixed(decimals);
  } else if (hasDot) {
    // Indonesian thousands: 56530 → "56.530"
    display = Math.round(value).toLocaleString("id-ID");
  } else {
    display = Math.round(value).toLocaleString("id-ID");
  }
  return display;
}

export default function Statistik() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll("[data-stat-card]");
      if (!cards) return;

      cards.forEach((card, i) => {
        const valueEl = card.querySelector("[data-stat-value]");
        const raw = card.getAttribute("data-raw-value") || "";
        const { numeric, suffix } = parseValue(raw);

        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          once: true,
          onEnter: () => {
            /* ── Card entrance ── */
            gsap.fromTo(
              card,
              { y: 40, opacity: 0, scale: 0.95 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "power3.out",
                delay: i * 0.08,
              }
            );

            /* ── Number counting ── */
            if (valueEl && numeric > 0) {
              gsap.fromTo(
                valueEl,
                { textContent: 0 },
                {
                  textContent: numeric,
                  duration: 1.8,
                  ease: "power2.out",
                  delay: 0.3 + i * 0.08,
                  snap: { textContent: 1 },
                  onUpdate() {
                    const val = parseFloat(valueEl.textContent);
                    valueEl.textContent = formatCount(val, raw) + suffix;
                  },
                  onComplete() {
                    valueEl.textContent = raw;
                  },
                }
              );
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="statistik"
      ref={sectionRef}
      className="relative overflow-hidden bg-emerald-950"
    >
      {/* ── Background texture ── */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fcd34d' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Organic shape blobs ── */}
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-amber-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 -right-40 w-80 h-80 rounded-full bg-yellow-800/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-emerald-900/10 blur-[80px] pointer-events-none" />

      <div className="relative z-10 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* ── Heading ── */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/80">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Data Tahun 2025
            </div>

            <h2 className="mt-5 text-4xl font-black tracking-tight text-white md:text-5xl">
              Statistik{" "}
              <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
                Nagari
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-stone-500">
              Gambaran umum kondisi Nagari Tanjuang Baringin berdasarkan data
              terbaru tahun 2025.
            </p>

            <div className="mx-auto mt-5 h-0.5 w-20 rounded-full bg-amber-400/60" />
          </div>

          {/* ── Grid ── */}
          <div
            ref={gridRef}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {statistics.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  data-stat-card
                  data-raw-value={item.value}
                  className="group relative border-2 border-stone-800/60 bg-stone-900/40 p-7 transition-all duration-300 hover:border-amber-600/40 hover:bg-stone-900/60"
                >
                  {/* ── Corner accents ── */}
                  <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* ── Icon ── */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center border-2 border-stone-700 bg-stone-800/60 transition-all duration-300 group-hover:border-amber-600/40">
                    <Icon className="h-7 w-7 text-amber-400/80" />
                  </div>

                  {/* ── Title ── */}
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-stone-500">
                    {item.title}
                  </p>

                  {/* ── Value ── */}
                  <h3
                    data-stat-value
                    className="mt-2 text-4xl font-black text-white tabular-nums"
                  >
                    {item.value}
                  </h3>

                  {/* ── Unit ── */}
                  <p className="mt-2 text-xs font-medium text-stone-500">
                    {item.unit}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
