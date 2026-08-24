import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import {
  FaStar,
  FaTree,
  FaUsers,
  FaLandmark,
  FaHandshake,
  FaCalendarAlt,
  FaSearch,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

/* ── Gallery data ── */
const categories = [
  { id: "all", label: "Semua", icon: FaStar },
  { id: "alam", label: "Alam", icon: FaTree },
  { id: "kegiatan", label: "Kegiatan", icon: FaUsers },
  { id: "budaya", label: "Budaya", icon: FaLandmark },
  { id: "sosial", label: "Sosial", icon: FaHandshake },
  { id: "acara", label: "Acara", icon: FaCalendarAlt },
];

const galleryItems = [
  {
    id: 1,
    title: "Hamparan Sawah Hijau",
    category: "alam",
    desc: "Pemandangan sawah nan hijau membentang di kaki bukit",
    color: "from-emerald-600 to-green-800",
    icon: FaTree,
  },
  {
    id: 2,
    title: "Gotong Royong Bersama",
    category: "kegiatan",
    desc: "Warga bergotong royong membersihkan lingkungan nagari",
    color: "from-amber-600 to-orange-800",
    icon: FaUsers,
  },
  {
    id: 3,
    title: "Tari Piring Tradisional",
    category: "budaya",
    desc: "Penampilan tari piring dalam acara adat nagari",
    color: "from-purple-600 to-indigo-800",
    icon: FaLandmark,
  },
  {
    id: 4,
    title: "Bakti Sosial Nagari",
    category: "sosial",
    desc: "Kegiatan bakti sosial untuk warga kurang mampu",
    color: "from-pink-600 to-rose-800",
    icon: FaHandshake,
  },
  {
    id: 5,
    title: "Musyawarah Nagari",
    category: "acara",
    desc: "Musyawarah tahunan nagari yang dihadiri seluruh elemen masyarakat",
    color: "from-blue-600 to-cyan-800",
    icon: FaCalendarAlt,
  },
  {
    id: 6,
    title: "Bukit di Pagi Hari",
    category: "alam",
    desc: "Kabut tipis menyelimuti perbukitan di pagi hari",
    color: "from-teal-600 to-emerald-800",
    icon: FaTree,
  },
  {
    id: 7,
    title: "Lomba 17 Agustusan",
    category: "kegiatan",
    desc: "Kemeriahan lomba peringatan HUT RI di lapangan nagari",
    color: "from-red-600 to-rose-800",
    icon: FaUsers,
  },
  {
    id: 8,
    title: "Upacara Adat",
    category: "budaya",
    desc: "Prosesi upacara adat yang dihadiri tokoh masyarakat",
    color: "from-violet-600 to-fuchsia-800",
    icon: FaLandmark,
  },
  {
    id: 9,
    title: "Jembatan Gantung",
    category: "alam",
    desc: "Jembatan gantung yang menjadi akses utama antar jorong",
    color: "from-green-600 to-lime-800",
    icon: FaTree,
  },
  {
    id: 10,
    title: "Posyandu Balita",
    category: "sosial",
    desc: "Pelayanan posyandu rutin untuk balita di nagari",
    color: "from-pink-500 to-red-800",
    icon: FaHandshake,
  },
  {
    id: 11,
    title: "Pelantikan Perangkat Nagari",
    category: "acara",
    desc: "Pelantikan perangkat nagari periode baru",
    color: "from-blue-700 to-indigo-900",
    icon: FaCalendarAlt,
  },
  {
    id: 12,
    title: "Sungai Jernih",
    category: "alam",
    desc: "Sungai dengan air jernih yang mengalir di tengah nagari",
    color: "from-cyan-600 to-blue-800",
    icon: FaTree,
  },
  {
    id: 13,
    title: "Pasar Nagari",
    category: "kegiatan",
    desc: "Suasana pasar nagari yang ramai setiap hari minggu",
    color: "from-yellow-600 to-orange-800",
    icon: FaUsers,
  },
  {
    id: 14,
    title: "Makan Bajamba",
    category: "budaya",
    desc: "Tradisi makan bajamba sebagai simbol kebersamaan",
    color: "from-amber-700 to-yellow-900",
    icon: FaLandmark,
  },
  {
    id: 15,
    title: "Panen Raya",
    category: "kegiatan",
    desc: "Panen raya padi yang disyukuri bersama warga",
    color: "from-lime-600 to-green-800",
    icon: FaUsers,
  },
  {
    id: 16,
    title: "Peringatan Hari Besar Islam",
    category: "acara",
    desc: "Peringatan Maulid Nabi di Masjid Nagari",
    color: "from-emerald-700 to-teal-900",
    icon: FaCalendarAlt,
  },
];

/* ── Direction variants for entrance animation ── */
const DIRECTIONS = [
  { x: -400, y: -60 }, // kiri atas
  { x: 400, y: 80 }, // kanan bawah
  { x: -80, y: -350 }, // atas
  { x: 100, y: 380 }, // bawah
  { x: -350, y: -250 }, // kiri atas diagonal
  { x: 350, y: -200 }, // kanan atas
  { x: -250, y: 300 }, // kiri bawah
  { x: 300, y: 280 }, // kanan bawah
  { x: -200, y: -200 }, // diagonal kiri atas
  { x: 200, y: -300 }, // diagonal kanan atas
  { x: -300, y: 150 }, // kiri
  { x: 250, y: -150 }, // kanan
];

/* ── Float type for continuous animation ── */
const FLOAT_TYPES = [
  { x: 10, y: 0, dur: 3.5 }, // goyang kiri-kanan
  { x: 0, y: 12, dur: 3.0 }, // naik-turun
  { x: 8, y: 8, dur: 4.0 }, // diagonal
  { x: -12, y: 6, dur: 3.8 }, // diagonal kiri
  { x: 6, y: -10, dur: 3.2 }, // diagonal kanan atas
  { x: -8, y: -8, dur: 4.5 }, // diagonal kiri atas
  { x: 14, y: 0, dur: 4.2 }, // goyang kiri-kanan lambat
  { x: 0, y: -14, dur: 3.6 }, // naik-turun lambat
  { x: 10, y: -6, dur: 3.3 }, // campuran
  { x: -6, y: 10, dur: 3.9 }, // campuran
  { x: 7, y: 7, dur: 5.0 }, // diagonal lambat
  { x: -10, y: -10, dur: 4.8 }, // diagonal lambat
];

function pick(arr, i) {
  return arr[i % arr.length];
}

/* ── Individual Gallery Card ── */
function GalleryCard({ item, index }) {
  const isMobile = window.innerWidth < 640;
  const cardRef = useRef(null);
  const floatRef = useRef(null);

  /* ── Entrance animation (GSAP + ScrollTrigger) ── */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const dir = isMobile ? { x: 0, y: 20 } : pick(DIRECTIONS, index);

    const delayOffset = isMobile ? 0 : (index % 4) * 0.08;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          x: dir.x,
          y: dir.y,
          opacity: 0,
          scale: 0.85,
          rotation: gsap.utils.random(-8, 8),
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: gsap.utils.random(0.8, 1.2),
          ease: "power4.out",
          delay: delayOffset,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          onComplete: () => {
            if (isMobile) return;

            const float = pick(FLOAT_TYPES, index);

            floatRef.current = gsap.to(el, {
              x: float.x,
              y: float.y,
              duration: float.dur,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: gsap.utils.random(0, 0.5),
            });
          },
        },
      );
    }, el);

    return () => {
      ctx.revert();
      if (floatRef.current) {
        floatRef.current.kill();
        floatRef.current = null;
      }
    };
  }, [index, isMobile]);

  const IconComponent = item.icon;

  return (
    <div
      ref={cardRef}
      className="group relative cursor-pointer transform-gpu will-change-transform"
    >
      <div className="relative flex h-85 flex-col border-2 border-stone-700/70 bg-stone-900/60 p-5 transition-all duration-300 ease-out hover:border-amber-600/40 hover:bg-stone-900/80">
        {/* Gradient background placeholder */}
        <div
          className={`relative h-44 w-full bg-linear-to-br ${item.color} overflow-hidden border border-stone-700/40 sm:h-48`}
        >
          {/* Decorative pattern overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.3)_0%,transparent_50%)]" />
          </div>

          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center border-2 border-white/20 bg-white/10 transition-all duration-300 group-hover:scale-110 group-hover:border-amber-300/40 group-hover:bg-white/15">
              <IconComponent className="h-8 w-8 text-white/80" />
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute left-3 top-3">
            <span className="border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/80">
              {item.category}
            </span>
          </div>
        </div>

        {/* Card content */}
        <div className="flex flex-1 flex-col pt-4">
          <h3 className="text-sm font-bold leading-snug text-white">
            {item.title}
          </h3>
          <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-stone-400">
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Galeri() {
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const galleryRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  /* ── Floating particles ── */
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3 - 0.1,
      alpha: Math.random() * 0.35 + 0.08,
    }));
    let animId;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 191, 36, ${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    animId = requestAnimationFrame(draw);
    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── Hero entrance ── */
  useEffect(() => {
    const hero = heroContentRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      const title = hero.querySelector("[data-hero-title]");
      const subtitle = hero.querySelector("[data-hero-subtitle]");
      const badge = hero.querySelector("[data-hero-badge]");
      const line = hero.querySelector("[data-hero-line]");
      const search = hero.querySelector("[data-hero-search]");

      if (badge) {
        gsap.fromTo(
          badge,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 },
        );
      }
      if (title) {
        gsap.fromTo(
          title,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power4.out",
            delay: 0.4,
          },
        );
      }
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power3.out", delay: 0.7 },
        );
      }
      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.9 },
        );
      }
      if (search) {
        gsap.fromTo(
          search,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 1.1,
          },
        );
      }
    }, hero);

    return () => ctx.revert();
  }, []);

  /* ── Filter ── */
  const filteredItems = galleryItems.filter((item) => {
    const matchCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="relative min-h-screen ">
      {/* ── Background Canvas ── */}
      <canvas
        ref={bgCanvasRef}
        className="fixed inset-0 pointer-events-none w-full h-full z-0"
      />

      {/* ══════════════════════════════════════════
          HERO SECTION
         ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative z-10 flex min-h-[60vh] items-center justify-center pt-28 pb-16 sm:pt-32 sm:pb-20"
      >
        {/* Decorative glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-amber-500/3 blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-75 h-75 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

        <div
          ref={heroContentRef}
          className="relative mx-auto max-w-3xl px-4 text-center"
        >
          {/* Badge */}
          <div
            data-hero-badge
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-5 py-1.5 text-xs uppercase tracking-[0.2em] text-amber-400/80"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Galeri
          </div>

          {/* Title */}
          <h1
            data-hero-title
            className="text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            Galeri
            <br />
            <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              Nagari
            </span>
          </h1>

          {/* Decorative line */}
          <div
            data-hero-line
            className="mx-auto my-6 h-0.5 w-32 origin-center rounded-full bg-linear-to-r from-transparent via-amber-400/60 to-transparent sm:my-8 sm:w-48"
          />

          {/* Subtitle */}
          <p
            data-hero-subtitle
            className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base"
          >
            Jelajahi momen-momen berharga Nagari Tanjuang Baringin. Dari
            kegiatan sehari-hari hingga acara budaya, setiap gambar menceritakan
            kisah yang tak terlupakan.
          </p>

          {/* ── Search Bar ── */}
          <div data-hero-search className="mx-auto mt-8 max-w-xl">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari momen atau kegiatan..."
                className="w-full rounded-xl border border-white/10 bg-white/4 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-amber-500/30 focus:bg-white/6 focus:shadow-lg focus:shadow-amber-500/5"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GALLERY SECTION
         ══════════════════════════════════════════ */}
      <section
        id="Galeri"
        ref={galleryRef}
        className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:pb-32"
      >
        {/* ── Category Filter ── */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm shadow-amber-500/10"
                      : "bg-white/3 text-slate-400 border border-white/5 hover:bg-white/6 hover:text-slate-300"
                  }`}
                >
                  <Icon
                    className={`h-3 w-3 ${
                      isActive ? "text-amber-400" : "text-slate-500"
                    }`}
                  />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Gallery Grid ── */}
        {/* ================= MOBILE SLIDER ================= */}
        <div className="block sm:hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1.05}
            spaceBetween={12}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
          >
            {filteredItems.map((item, index) => (
              <SwiperSlide key={item.id}>
                <GalleryCard item={item} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ================= DESKTOP GRID ================= */}
        <div className="hidden sm:grid grid-cols-2 gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item, index) => (
            <GalleryCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
