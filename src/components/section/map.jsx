import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaRoad,
  FaGlobeAsia,
  FaExternalLinkAlt,
} from "react-icons/fa";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

gsap.registerPlugin(ScrollTrigger);

/* ── Koordinat Kantor Wali Nagari Tanjuang Baringin ── */
const NAGARI_COORDS = [-0.105, 100.055];

/* ── Custom SVG Marker ── */
const createCustomIcon = () =>
  L.divIcon({
    className: "",
    html: `
      <div class="marker-pin">
        <svg viewBox="0 0 24 36" width="38" height="42" style="filter:drop-shadow(0 6px 16px rgba(0,0,0,0.6));">
          <defs>
            <linearGradient id="pinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#fbbf24"/>
              <stop offset="100%" stop-color="#d97706"/>
            </linearGradient>
          </defs>
          <path d="M12 1C5.9 1 1 6.1 1 12.3c0 9.3 11 23.7 11 23.7s11-14.4 11-23.7C23 6.1 18.1 1 12 1z" fill="url(#pinGrad)" stroke="#b45309" stroke-width="0.8"/>
          <circle cx="12" cy="12" r="5.5" fill="#064e3b" stroke="#047857" stroke-width="0.5"/>
          <circle cx="12" cy="12" r="2.5" fill="#fbbf24" opacity="0.9"/>
          <circle cx="12" cy="12" r="2" fill="#064e3b"/>
        </svg>
        <div style="position:absolute;top:10px;left:50%;transform:translateX(-50%);width:8px;height:8px;border-radius:50%;background:#fbbf24;box-shadow:0 0 14px rgba(251,191,36,0.9),0 0 40px rgba(251,191,36,0.3);"></div>
      </div>
    `,
    iconSize: [38, 42],
    iconAnchor: [19, 42],
    popupAnchor: [0, -50],
  });

/* ── Pulsing ring around marker ── */
function PulseRing() {
  const map = useMap();

  useEffect(() => {
    const outer = L.circle(NAGARI_COORDS, {
      radius: 600,
      color: "#f59e0b",
      fillColor: "#f59e0b",
      fillOpacity: 0.06,
      weight: 1.2,
      opacity: 0.25,
    }).addTo(map);

    const inner = L.circle(NAGARI_COORDS, {
      radius: 200,
      color: "#fbbf24",
      fillColor: "#fbbf24",
      fillOpacity: 0.08,
      weight: 1.5,
      opacity: 0.3,
    }).addTo(map);

    return () => {
      map.removeLayer(outer);
      map.removeLayer(inner);
    };
  }, [map]);

  return null;
}

/* ── AnimatedMap: flyTo on mount ── */
function AnimatedMap() {
  const map = useMap();

  useEffect(() => {
    const timeout = setTimeout(() => {
      map.flyTo(NAGARI_COORDS, 15.5, { duration: 2.5, ease: "easeOut" });
    }, 600);
    return () => clearTimeout(timeout);
  }, [map]);

  return <PulseRing />;
}

/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */
const locationInfo = [
  {
    icon: FaMapMarkerAlt,
    label: "Alamat",
    value:
      "Jalan Syekh Mahmoed No.11 C, Tanjuang Baringin, Kec. Lubuk Sikaping, Kab. Pasaman, Sumatera Barat 26318",
  },
  { icon: FaRoad, label: "Kecamatan", value: "Lubuk Sikaping" },
  { icon: FaGlobeAsia, label: "Provinsi", value: "Sumatera Barat" },
  {
    icon: FaClock,
    label: "Jam Operasional",
    value: "Senin – Jumat, 08:00 – 16:00 WIB",
  },
  { icon: FaPhone, label: "Telepon", value: "085323441781" },
  {
    icon: FaEnvelope,
    label: "Email",
    value: "nagaritanjuangbaringin@gmail.com",
  },
];

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function MapSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const infoGridRef = useRef(null);
  const mapWrapRef = useRef(null);

  /* ── GSAP entrance animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Header stagger ── */
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll("[data-anim]"),
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      /* ── Map container fade-up ── */
      if (mapWrapRef.current) {
        gsap.fromTo(
          mapWrapRef.current,
          { y: 50, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: mapWrapRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      /* ── Info cards stagger ── */
      if (infoGridRef.current) {
        const cards = infoGridRef.current.querySelectorAll("[data-card]");
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { x: 30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              delay: i * 0.06,
              ease: "power3.out",
              scrollTrigger: {
                trigger: infoGridRef.current,
                start: "top 88%",
                once: true,
              },
            },
          );
        });

        /* last child (action button) */
        const btn = infoGridRef.current.querySelector("[data-action]");
        if (btn) {
          gsap.fromTo(
            btn,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: cards.length * 0.06 + 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: infoGridRef.current,
                start: "top 88%",
                once: true,
              },
            },
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="lokasi"
      ref={sectionRef}
      className="relative overflow-hidden bg-emerald-950"
    >
      {/* ── Background texture ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fcd34d' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Organic blobs ── */}
      <div className="pointer-events-none absolute -left-48 top-40 h-150 w-150 rounded-full bg-amber-900/10 blur-[160px]" />
      <div className="pointer-events-none absolute -right-48 bottom-20 h-112.5 w-112.5 rounded-full bg-emerald-800/15 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/3 top-1/3 h-64 w-64 rounded-full bg-yellow-800/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        {/* ════════════════════════════════════════════
            HEADER
           ════════════════════════════════════════════ */}
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div
            data-anim
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-300 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
            Lokasi & Peta
          </div>

          {/* Title */}
          <h2
            data-anim
            className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Temukan <span className="text-amber-400">Kami</span>
          </h2>

          {/* Subtitle */}
          <p
            data-anim
            className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400"
          >
            Kantor Wali Nagari Tanjuang Baringin terletak di jantung Kecamatan
            Lubuk Sikaping, Kabupaten Pasaman — siap melayani masyarakat dengan
            pelayanan prima.
          </p>
        </div>

        {/* ════════════════════════════════════════════
            MAIN GRID
           ════════════════════════════════════════════ */}
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          {/* ── Map Column (3/5) ── */}
          <div ref={mapWrapRef} className="lg:col-span-3">
            <div className="group relative h-95 w-full overflow-hidden rounded-2xl border border-white/6 shadow-2xl shadow-black/40 sm:h-120 lg:h-135">
              <MapContainer
                center={NAGARI_COORDS}
                zoom={14}
                scrollWheelZoom={true}
                className="h-full w-full"
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <AnimatedMap />
                <Marker position={NAGARI_COORDS} icon={createCustomIcon()}>
                  <Popup>
                    <div className="min-w-45 font-sans">
                      <p className="mb-1 font-black text-emerald-900">
                        🏛️ Kantor Wali Nagari
                      </p>
                      <p className="text-[11px] leading-relaxed text-slate-600">
                        Tanjuang Baringin
                        <br />
                        Kec. Lubuk Sikaping
                        <br />
                        Kab. Pasaman, Sumbar
                      </p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>

              {/* ── Inset ring ── */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/6" />

              {/* ── Bottom-left hint ── */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-medium text-slate-400 backdrop-blur-sm border border-white/6">
                <span className="text-amber-400">🔄</span>
                Scroll & zoom untuk eksplorasikan
              </div>

              {/* ── Top-right decorative angle ── */}
              <div className="pointer-events-none absolute right-3 top-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  className="text-amber-400/30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M1 1h18v18M1 1v18" />
                </svg>
              </div>
            </div>
          </div>

          {/* ── Info Cards Column (2/5) ── */}
          <div ref={infoGridRef} className="lg:col-span-2">
            <div className="space-y-2.5">
              {locationInfo.map((item) => (
                <motion.div
                  key={item.label}
                  data-card
                  className="group flex items-start gap-3.5 rounded-xl border border-white/4 bg-white/20 p-3.5 transition-all duration-300 hover:border-amber-500/20 hover:bg-amber-500/4"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-500/20">
                    <item.icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-200">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── Google Maps button ── */}
            <motion.a
              data-action
              href={`https://www.google.com/maps/@0.1081081,100.1803585,14z?entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2.5 rounded-xl border border-amber-400/20 bg-amber-500/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-amber-300 transition-all duration-300 hover:border-amber-400/35 hover:bg-amber-500/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaMapMarkerAlt className="h-3.5 w-3.5" />
              Buka di Google Maps
              <FaExternalLinkAlt className="h-2.5 w-2.5 opacity-60" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
