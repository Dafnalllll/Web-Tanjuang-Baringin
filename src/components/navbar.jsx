import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import tanjuangLogo from "../assets/tanjuangbaringin.webp";
import {
  MdHome,
  MdHistoryEdu,
  MdMiscellaneousServices,
  MdOutlineDescription,
  MdStorefront,
  MdGroups,
  MdPeople,
  MdPublic,
  MdLocationOn,
  MdBadge,
  MdArticle,
  MdGavel,
  MdAssessment,
  MdBusiness,
  MdFamilyRestroom,
  MdVolunteerActivism,
  MdPhotoLibrary,
  MdContactMail,
  MdQuiz,
} from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  {
    to: "/home",
    label: "Beranda",
    icon: MdHome,
  },

  {
    label: "Tentang Nagari",
    children: [
      {
        to: "/about/sejarah",
        label: "Sejarah",
        icon: MdHistoryEdu,
      },
      {
        to: "/home#visi-misi",
        label: "Visi & Misi",
        icon: MdOutlineDescription,
      },
      {
        to: "/about/struktur",
        label: "SOTK",
        icon: MdGroups,
      },
    ],
  },

  {
    label: "Data Nagari",
    children: [
      {
        to: "/data-nagari/geografi",
        label: "Geografi",
        icon: MdLocationOn,
      },
      {
        to: "/data-nagari/penduduk",
        label: "Penduduk",
        icon: MdPeople,
      },
      {
        to: "/data-nagari/ekonomi",
        label: "Ekonomi",
        icon: MdBusiness,
      },
    ],
  },

  {
    label: "Pelayanan",
    children: [
      {
        to: "/pelayanan/administrasi",
        label: "Administrasi",
        icon: MdBadge,
      },
      {
        to: "/pelayanan/umum",
        label: "Pelayanan Umum",
        icon: MdMiscellaneousServices,
      },
      {
        to: "/pelayanan/pengaduan",
        label: "Pengaduan",
        icon: MdArticle,
      },
    ],
  },

  {
    label: "PPID",
    children: [
      {
        to: "/ppid/informasi",
        label: "Informasi Publik",
        icon: MdPublic,
      },
      {
        to: "/ppid/regulasi",
        label: "Regulasi",
        icon: MdGavel,
      },
      {
        to: "/ppid/kinerja",
        label: "Laporan Kinerja",
        icon: MdAssessment,
      },
    ],
  },

  {
    to: "/produk-nagari",
    label: "Produk Nagari",
    icon: MdStorefront,
  },

  {
    label: "Lembaga Nagari",
    children: [
      {
        to: "/lembaga/bamus",
        label: "Bamus",
        icon: MdGroups,
      },
      {
        to: "/lembaga/lpmn",
        label: "LPMN",
        icon: MdBusiness,
      },
      {
        to: "/lembaga/niniak-mamak",
        label: "Niniak Mamak",
        icon: MdPeople,
      },
      {
        to: "/lembaga/bundo-kanduang",
        label: "Bundo Kanduang",
        icon: MdFamilyRestroom,
      },
      {
        to: "/lembaga/pkk",
        label: "PKK",
        icon: MdVolunteerActivism,
      },
      {
        to: "/lembaga/bumnag",
        label: "BUMNAG",
        icon: MdStorefront,
      },
      {
        to: "/lembaga/karang-taruna",
        label: "Karang Taruna",
        icon: MdGroups,
      },
    ],
  },

  {
    label: "Lainnya",
    children: [
      {
        to: "/home#Galeri",
        label: "Galeri",
        icon: MdPhotoLibrary,
      },
      {
        to: "/lainnya/kontak",
        label: "Kontak Kami",
        icon: MdContactMail,
      },
      {
        to: "/lainnya/faq",
        label: "FAQ",
        icon: MdQuiz,
      },
    ],
  },
];

/* ─── Dropdown Link Item ─── */
function DropdownLink({ to, label, icon: Icon, onNav }) {
  return (
    <Link
      to={to}
      onClick={onNav}
      className="group flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-white/5 hover:text-white"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-amber-400/70 transition-colors group-hover:bg-amber-500/15 group-hover:text-amber-300">
        <Icon className="h-4 w-4" />
      </span>
      <span>{label}</span>
    </Link>
  );
}

/* ─── Desktop Dropdown ─── */
function DesktopDropdown({ item, isOpen, onClose, isActive }) {
  const ddRef = useRef(null);
  const menuRef = useRef(null);

  /* ── GSAP enter/exit ── */
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (isOpen) {
      gsap.set(menu, {
        display: "block",
        pointerEvents: "auto",
      });

      gsap.fromTo(
        menu,
        {
          opacity: 0,
          y: 6,
          scaleY: 0.92,
          transformOrigin: "top center",
        },
        {
          opacity: 1,
          y: 0,
          scaleY: 1,
          duration: 0.3,
          ease: "power3.out",
        },
      );
    } else {
      gsap.to(menu, {
        opacity: 0,
        y: 4,
        scaleY: 0.95,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(menu, {
            display: "none",
            pointerEvents: "none",
          });
        },
      });
    }
  }, [isOpen]);

  /* ── Click outside ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (ddRef.current && !ddRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  return (
    <div ref={ddRef} className="relative">
      <button
        type="button"
        className={`relative flex items-center gap-1 rounded-lg px-3.5 py-2 text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer duration-200 ${
          isActive ? "text-amber-300" : "text-slate-400 hover:text-white"
        }`}
      >
        {item.label}
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        <span
          data-bar
          className="absolute bottom-0 left-2.5 right-2.5 h-0.75 origin-left rounded-full bg-linear-to-r from-amber-400 to-yellow-300 scale-x-0"
        />
      </button>

      <div
        ref={menuRef}
        className="absolute top-full left-1/2 z-50 hidden pt-3 -translate-x-1/2"
      >
        <div className="w-56 rounded-xl border border-white/10 bg-emerald-950/95 backdrop-blur-xl p-2 shadow-2xl shadow-black/60">
          {/* Decorative top line */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-3 w-px bg-linear-to-b from-amber-400/60 to-transparent" />
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-2 w-16 rounded-full bg-linear-to-r from-transparent via-amber-400/20 to-transparent blur-sm" />

          {item.children.map((child) => (
            <DropdownLink
              key={child.to}
              to={child.to}
              label={child.label}
              icon={child.icon}
              onNav={onClose}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile Dropdown ─── */
function MobileDropdown({ item, isActive, onNav }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;
    if (open) {
      gsap.set(contentRef.current, { display: "block" });
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, height: 0 },
        { opacity: 1, height: "auto", duration: 0.35, ease: "power3.out" },
      );
    } else {
      gsap.to(contentRef.current, {
        opacity: 0,
        height: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => gsap.set(contentRef.current, { display: "none" }),
      });
    }
  }, [open]);

  return (
    <div>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-linear-to-r from-amber-500/15 to-amber-500/5 text-amber-300 font-bold border border-amber-500/20"
            : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
        }`}
      >
        <span className="flex items-center gap-3">
          <span
            className={`flex h-2 w-2 rounded-full transition-all ${
              isActive
                ? "bg-amber-400 shadow-sm shadow-amber-400/50"
                : "bg-slate-600 group-hover:bg-slate-400"
            }`}
          />
          {item.label}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="h-4 w-4 text-slate-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>
      <div ref={contentRef} className="overflow-hidden hidden">
        <div className="ml-5 border-l border-white/5 pl-3 pt-1 pb-2 space-y-0.5">
          {item.children.map((child) => {
            const Icon = child.icon;

            return (
              <Link
                key={child.to}
                to={child.to}
                onClick={onNav}
                className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 transition-all hover:bg-white/5 hover:text-white"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded bg-white/5 text-amber-400/60 group-hover:bg-amber-500/15 group-hover:text-amber-300">
                  <Icon className="h-3.5 w-3.5" />
                </span>

                {child.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Navbar ─── */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const closeTimeout = useRef(null);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const navItemsRef = useRef([]);
  const { pathname } = useLocation();

  /* ── Scroll detection ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top -50px",
        onEnter: () => setScrolled(true),
        onLeaveBack: () => setScrolled(false),
      });
    }, headerRef.current);
    return () => ctx.revert();
  }, []);

  /* ── Header entrance ── */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.1 },
    );
  }, []);

  /* ── Logo entrance ── */
  useEffect(() => {
    if (!logoRef.current) return;
    gsap.fromTo(
      logoRef.current,
      { x: -30, opacity: 0, scale: 0.9 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.25,
      },
    );
  }, []);

  /* ── Floating particles ── */
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3 - 0.1,
      alpha: Math.random() * 0.4 + 0.1,
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

  /* ── Stagger nav items ── */
  useEffect(() => {
    const items = navItemsRef.current.filter(Boolean);
    if (!items.length) return;
    gsap.fromTo(
      items,
      { y: -18, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
        stagger: 0.05,
        delay: 0.55,
      },
    );
  }, []);

  /* ── Active indicator ── */
  useEffect(() => {
    navItemsRef.current.forEach((wrapper) => {
      if (!wrapper) return;
      const linkEl = wrapper.querySelector("a, span");
      const bar = wrapper.querySelector("[data-bar]");
      if (!linkEl || !bar) return;
      const href = linkEl.getAttribute("href");
      const isActive = href ? pathname.startsWith(href) : false;
      gsap.to(bar, {
        scaleX: isActive ? 1 : 0,
        duration: 0.4,
        ease: "back.out(2.5)",
        overwrite: "auto",
      });
    });
  }, [pathname]);

  const isActive = (to) => pathname === to;
  const isParentActive = (item) =>
    item.children
      ? item.children.some((c) => pathname.startsWith(c.to))
      : pathname === item.to;

  const handleDropdown = (idx) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }

    setOpenDropdown(idx);
  };

  const handleCloseDropdown = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 180);
  };

  return (
    <>
      {/* ── Mobile backdrop ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-emerald-950/85 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            : "bg-emerald-950"
        }`}
      >
        {/* ── Canvas particles ── */}
        <canvas
          ref={bgCanvasRef}
          className="absolute inset-0 pointer-events-none w-full h-full"
        />

        {/* ── Bottom shimmer ── */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-500/30 to-transparent" />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
          {/* ── Logo ── */}
          <Link
            to="/"
            ref={logoRef}
            className="group flex items-center gap-3.5 shrink-0"
          >
            <div className="relative flex h-12 w-12 items-center justify-center  transition-all duration-300 group-hover:-translate-y-0.5 overflow-hidden">
              <div className="absolute inset-0 " />
              <img
                src={tanjuangLogo}
                alt="Tanjuang Baringin"
                className="relative h-16 w-16 object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-black tracking-[0.06em] text-white">
                TANJUANG BARINGIN
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden items-center gap-0.5 sm:flex">
            {navItems.map((item, i) => (
              <div
                key={item.label || item.to}
                ref={(el) => (navItemsRef.current[i] = el)}
              >
                {item.children ? (
                  <div
                    onMouseEnter={() => handleDropdown(i)}
                    onMouseLeave={handleCloseDropdown}
                  >
                    <DesktopDropdown
                      item={item}
                      isOpen={openDropdown === i}
                      onClose={handleCloseDropdown}
                      isActive={isParentActive(item)}
                    />
                  </div>
                ) : (
                  <Link
                    to={item.to}
                    className={`relative block rounded-lg px-3.5 py-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-200 ${
                      isActive(item.to)
                        ? "text-amber-300"
                        : "text-slate-400 hover:text-white"
                    }`}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        y: -2,
                        duration: 0.25,
                        ease: "back.out(2)",
                        overwrite: "auto",
                      });
                      gsap.to(e.currentTarget.querySelector("[data-glow]"), {
                        opacity: 1,
                        scale: 1,
                        duration: 0.25,
                        ease: "power2.out",
                        overwrite: "auto",
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        y: 0,
                        duration: 0.2,
                        ease: "power2.out",
                        overwrite: "auto",
                      });
                      gsap.to(e.currentTarget.querySelector("[data-glow]"), {
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.2,
                        ease: "power2.out",
                        overwrite: "auto",
                      });
                    }}
                  >
                    <span
                      data-glow
                      className="absolute inset-0 rounded-lg bg-white/5 opacity-0 scale-90 pointer-events-none"
                    />
                    <span className="relative z-10">{item.label}</span>
                    <span
                      data-bar
                      className="absolute bottom-0 left-2.5 right-2.5 h-0.75 origin-left rounded-full bg-linear-to-r from-amber-400 to-yellow-300 scale-x-0"
                    />
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* ── Hamburger ── */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-amber-400/40 hover:bg-white/10 sm:hidden"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          >
            <div className="flex flex-col items-center gap-0.75">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="block h-[2.5px] w-4.5 rounded-full bg-amber-400/80 origin-center"
              />
              <motion.span
                animate={
                  menuOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                className="block h-[2.5px] w-4.5 rounded-full bg-amber-400/80"
              />
              <motion.span
                animate={
                  menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }
                }
                className="block h-[2.5px] w-4.5 rounded-full bg-amber-400/80 origin-center"
              />
            </div>
          </motion.button>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-95 bg-emerald-950 shadow-2xl sm:hidden overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
              <div className="flex items-center gap-3">
                <img
                  src={tanjuangLogo}
                  alt="Tanjuang Baringin"
                  className="h-10 w-10 rounded-md object-cover"
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-[9px] font-medium tracking-[0.15em] text-amber-400/80 uppercase">
                    Tanjuang Baringin
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-all hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-400"
                aria-label="Tutup"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-0.5 px-4 pt-5 pb-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label || item.to}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 + 0.1, ease: "easeOut" }}
                >
                  {item.children ? (
                    <MobileDropdown
                      item={item}
                      isActive={isParentActive(item)}
                      onNav={() => setMenuOpen(false)}
                    />
                  ) : (
                    <Link
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive(item.to)
                          ? "bg-linear-to-r from-amber-500/15 to-amber-500/5 text-amber-300 font-bold border border-amber-500/20"
                          : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
                      }`}
                    >
                      <span
                        className={`flex h-2 w-2 rounded-full transition-all duration-200 ${
                          isActive(item.to)
                            ? "bg-amber-400 shadow-sm shadow-amber-400/50"
                            : "bg-slate-600 group-hover:bg-slate-400"
                        }`}
                      />
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
