import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaMapPin,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import tanjuangLogo from "../assets/tanjuangbaringin.webp";
import Tabaring from "../assets/footer/tabaringpov.webp";

gsap.registerPlugin(ScrollTrigger);

const footerMenus = [
  {
    title: "Tentang Nagari",
    links: [
      { to: "/about/sejarah", label: "Sejarah" },
      { to: "/home#visi-misi", label: "Visi & Misi" },
      { to: "/about/struktur", label: "SOTK" },
    ],
  },
  {
    title: "Data Nagari",
    links: [
      { to: "/data-nagari/geografi", label: "Geografi" },
      { to: "/data-nagari/penduduk", label: "Penduduk" },
      { to: "/data-nagari/ekonomi", label: "Ekonomi" },
    ],
  },
  {
    title: "Pelayanan",
    links: [
      { to: "/pelayanan/administrasi", label: "Administrasi" },
      { to: "/pelayanan/pengaduan", label: "Pengaduan" },
    ],
  },
  {
    title: "Lembaga Nagari",
    links: [
      { to: "/lembaga/bamus", label: "Bamus" },
      { to: "/lembaga/lpmn", label: "LPMN" },
      { to: "/lembaga/niniak-mamak", label: "Niniak Mamak" },
      { to: "/lembaga/bundo-kanduang", label: "Bundo Kanduang" },
      { to: "/lembaga/pkk", label: "PKK" },
      { to: "/lembaga/bumnag", label: "BUMNAG" },
      { to: "/lembaga/karang-taruna", label: "Karang Taruna" },
    ],
  },
  {
    title: "Lainnya",
    links: [
      { to: "/home#Galeri", label: "Galeri" },
      { to: "/lainnya/faq", label: "FAQ" },
    ],
  },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "power3.out" },
  },
};

const socialLinks = [
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/nagari_tanjuang_baringin/",
    label: "Instagram",
  },
  {
    icon: FaYoutube,
    href: "https://youtube.com/@nagaritanjuangbaringin4754",
    label: "YouTube",
  },
  {
    icon: FaFacebook,
    href: "https://web.facebook.com/nagaritanjuang.baringin",
    label: "Facebook",
  },
  {
    icon: FaEnvelope,
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=nagaritanjuangbaringin@gmail.com",
    label: "Email",
  },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/6285323441781",
    label: "WhatsApp",
  },
];

export default function Footer() {
  const footerRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const shimmerRef = useRef(null);

  /* ── Floating particles ── */
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25 - 0.08,
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

  /* ── GSAP entrance animations ── */
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      /* Shimmer line: expand from center */
      gsap.fromTo(
        shimmerRef.current,
        { scaleX: 0, transformOrigin: "center" },
        { scaleX: 1, duration: 1.2, ease: "power3.out", delay: 0.3 },
      );

      /* Animate each column on scroll */
      const columns = footer.querySelectorAll("[data-col]");
      columns.forEach((col, i) => {
        ScrollTrigger.create({
          trigger: col,
          start: "top bottom-=80",
          onEnter: () => {
            gsap.fromTo(
              col,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out",
                delay: i * 0.12,
              },
            );
          },
          once: true,
        });
      });

      /* Divider line: draw from center */
      const dividerLine = footer.querySelector("[data-divider-line]");
      if (dividerLine) {
        ScrollTrigger.create({
          trigger: dividerLine,
          start: "top bottom-=60",
          onEnter: () => {
            gsap.fromTo(
              dividerLine,
              { scaleX: 0, transformOrigin: "left" },
              { scaleX: 1, duration: 0.8, ease: "power3.out" },
            );
          },
          once: true,
        });
      }

      /* Copyright fade up */
      const copyright = footer.querySelector("[data-copyright]");
      if (copyright) {
        ScrollTrigger.create({
          trigger: copyright,
          start: "top bottom-=40",
          onEnter: () => {
            gsap.fromTo(
              copyright,
              { y: 12, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
                delay: 0.2,
              },
            );
          },
          once: true,
        });
      }
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-emerald-950 text-slate-400 overflow-hidden"
    >
      {/* ── Canvas particles ── */}
      <canvas
        ref={bgCanvasRef}
        className="absolute inset-0 pointer-events-none w-full h-full"
      />

      {/* ── Top shimmer line ── */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden">
        <div
          ref={shimmerRef}
          className="h-px bg-linear-to-r from-transparent via-amber-500/35 to-transparent"
        />
      </div>

      <motion.div
        className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.6fr_1fr]">
          {/* Brand */}
          <motion.div data-col variants={itemVariants} className="space-y-5">
            <Link
              to="/"
              className="group flex flex-col items-center gap-4 sm:flex-row sm:items-start"
            >
              <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-white/2 transition-all duration-300 group-hover:border-amber-500/30 group-hover:shadow-lg group-hover:shadow-amber-500/5">
                <img
                  src={tanjuangLogo}
                  alt="Tanjuang Baringin"
                  className="h-24 w-24 object-cover"
                />
              </div>
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left leading-tight">
                <span className="text-base font-black tracking-[0.06em] text-white transition-colors group-hover:text-amber-300">
                  TANJUANG BARINGIN
                </span>
                <span className="mt-0.5 text-xs tracking-[0.12em] text-slate-500 uppercase">
                  Nagari
                </span>
              </div>
            </Link>
            <p className="text-center text-xs leading-relaxed text-slate-500 sm:text-left">
              Nagari Tanjuang Baringin, Kecamatan Lubuk Sikaping, Kabupaten
              Pasaman, Provinsi Sumatera Barat.
            </p>
          </motion.div>

          {/* Navigasi */}
          <motion.div
            data-col
            variants={itemVariants}
            className="space-y-5 text-center sm:text-left"
          >
            <h4 className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300 sm:justify-start">
              <span className="h-px w-4 bg-amber-400/40" />
              Navigasi
            </h4>

            <>
              {/* ================= MOBILE ================= */}
              <div className="space-y-5 md:hidden">
                {/* Baris 1 */}
                <div className="grid grid-cols-2 gap-x-4">
                  {footerMenus
                    .filter(
                      (g) =>
                        g.title === "Tentang Nagari" ||
                        g.title === "Data Nagari",
                    )
                    .map((group) => (
                      <div key={group.title} className="text-center">
                        <h5
                          className="
                          mb-1
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-wide
                          text-amber-400
                        "
                        >
                          {group.title}
                        </h5>

                        <ul className="space-y-0.5">
                          {group.links.map((link) => (
                            <li key={link.to}>
                              <Link
                                to={link.to}
                                className="
                                flex items-center justify-center gap-2
                                text-xs text-slate-500
                                hover:text-amber-400
                              "
                              >
                                <span className="h-1 w-1 rounded-full bg-slate-600" />
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>

                {/* Baris 2 */}
                <div className="grid grid-cols-2 gap-x-4">
                  {footerMenus
                    .filter(
                      (g) => g.title === "Pelayanan" || g.title === "Lainnya",
                    )
                    .map((group) => (
                      <div key={group.title} className="text-center">
                        <h5
                          className="
                          mb-1
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-wide
                          text-amber-400
                        "
                        >
                          {group.title}
                        </h5>

                        <ul className="space-y-0.5">
                          {group.links.map((link) => (
                            <li key={link.to}>
                              <Link
                                to={link.to}
                                className="
                                flex items-center justify-center gap-2
                                text-xs text-slate-500
                                hover:text-amber-400
                              "
                              >
                                <span className="h-1 w-1 rounded-full bg-slate-600" />
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>

                {/* Baris 3 */}
                <div className="flex justify-center">
                  {footerMenus
                    .filter((g) => g.title === "Lembaga Nagari")
                    .map((group) => (
                      <div key={group.title} className="text-center">
                        <h5
                          className="
                          mb-1
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-wide
                          text-amber-400
                        "
                        >
                          {group.title}
                        </h5>

                        <ul className="space-y-0.5">
                          {group.links.map((link) => (
                            <li key={link.to}>
                              <Link
                                to={link.to}
                                className="
                                flex items-center justify-center gap-2
                                text-xs text-slate-500
                                hover:text-amber-400
                              "
                              >
                                <span className="h-1 w-1 rounded-full bg-slate-600" />
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>

              {/* ================= DESKTOP ================= */}
              <div className="hidden md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-6">
                {footerMenus.map((group) => (
                  <div
                    key={group.title}
                    className={`
                    text-left
                    ${group.title === "Lainnya" ? "-mt-28" : ""}
                  `}
                  >
                    <h5
                      className="
                      mb-2
                      border-l-2 border-amber-400
                      pl-2
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-amber-300
                    "
                    >
                      {group.title}
                    </h5>

                    <ul className="space-y-1.5">
                      {group.links.map((link) => (
                        <li key={link.to}>
                          <Link
                            to={link.to}
                            className="
                            flex items-center gap-2
                            text-xs text-slate-500
                            transition-colors duration-300
                            hover:text-amber-400
                          "
                          >
                            <span className="h-1 w-1 rounded-full bg-slate-600" />
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          </motion.div>

          {/* Contact */}
          <motion.div
            data-col
            variants={itemVariants}
            className="space-y-4 text-center sm:text-left"
          >
            <h4 className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300 sm:justify-start">
              <span className="h-px w-4 bg-amber-400/40" />
              Hubungi Kami
            </h4>
            <ul className="space-y-3 text-xs text-slate-500 flex flex-col items-center sm:items-start">
              <motion.li
                className="flex items-start gap-2.5"
                whileHover={{
                  x: 3,
                  transition: { type: "spring", stiffness: 300, damping: 18 },
                }}
              >
                <FaMapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400/60" />
                <span>
                  Jalan Syekh Mahmoed No.11 C, Tanjuang Baringin, Kec. Lubuk
                  Sikaping, Kabupaten Pasaman, Sumatera Barat, 26318.
                </span>
              </motion.li>
              <motion.li
                className="flex items-center gap-2.5"
                whileHover={{
                  x: 3,
                  transition: { type: "spring", stiffness: 300, damping: 18 },
                }}
              >
                <FaEnvelope className="h-4 w-4 shrink-0 text-amber-400/60" />
                <span>nagaritanjuangbaringin@gmail.com</span>
              </motion.li>
            </ul>

            {/* ── Social Media ── */}
            <div className="pt-2">
              <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-slate-300 sm:text-left">
                Sosial Media
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                {socialLinks.map(({ icon: Icon, href, label }) => {
                  const isMail = href.startsWith("mailto:");

                  return (
                    <motion.a
                      key={label}
                      href={href}
                      target={isMail ? "_self" : "_blank"}
                      rel={isMail ? undefined : "noopener noreferrer"}
                      aria-label={label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-200 hover:border-amber-400/40 hover:bg-amber-500/10 hover:text-amber-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  );
                })}{" "}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div
              data-divider-line
              className="w-full border-t border-white/5 origin-left"
            />
          </div>
          <div className="relative flex justify-center">
            <motion.span
              className="bg-emerald-950 px-4 text-xs text-slate-600"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              &#9670;
            </motion.span>
          </div>
        </div>

        {/* ── Copyright ── */}
        <div
          data-copyright
          className="relative flex items-center justify-center py-4"
        >
          <p className="text-center text-[11px] text-slate-600">
            &copy; {new Date().getFullYear()} Tanjuang Baringin. All rights
            reserved.
            <span className="mx-2">•</span>
            Designed & Developed by{" "}
            <span className="font-medium text-amber-400">
              KKN REGULER II TANJUANG BARINGIN 2026 UNIVERSITAS ANDALAS
            </span>
          </p>

          <img
            src={Tabaring}
            alt="Developer Logo"
            className="
            absolute
            left-1/2
            -bottom-4
            -translate-x-1/2
            translate-y-1/2
            h-18
            w-auto
            object-contain
            pointer-events-none
            select-none

            md:left-auto
            md:bottom-auto
            md:right-22.5
            md:top-1/2
            md:translate-x-0
            md:-translate-y-1/2
            md:h-34
          "
          />
        </div>
      </motion.div>
    </footer>
  );
}
