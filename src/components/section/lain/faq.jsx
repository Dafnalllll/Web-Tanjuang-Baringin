import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaQuestionCircle,
  FaChevronDown,
  FaFileAlt,
  FaIdCard,
  FaLandmark,
  FaHandshake,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaSearch,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const faqCategories = [
  { id: "umum", label: "Umum", icon: FaQuestionCircle },
  { id: "administrasi", label: "Administrasi", icon: FaIdCard },
  { id: "pelayanan", label: "Pelayanan", icon: FaHandshake },
  { id: "pemerintahan", label: "Pemerintahan", icon: FaLandmark },
  { id: "dokumen", label: "Dokumen & Regulasi", icon: FaFileAlt },
];

const faqData = [
  {
    category: "umum",
    q: "Apa itu Nagari Tanjuang Baringin?",
    a: "Nagari Tanjuang Baringin adalah salah satu nagari yang terletak di Kecamatan Lubuk Sikaping, Kabupaten Pasaman, Provinsi Sumatera Barat. Nagari ini memiliki sejarah panjang yang berakar pada adat dan budaya Minangkabau, serta terus berkembang menuju nagari modern berbasis digital.",
  },
  {
    category: "umum",
    q: "Di mana lokasi Nagari Tanjuang Baringin?",
    a: "Nagari Tanjuang Baringin berada di Kecamatan Lubuk Sikaping, Kabupaten Pasaman, Provinsi Sumatera Barat. Nagari ini terdiri dari beberapa jorong yang tersebar di wilayah dengan pemandangan alam khas perbukitan dan persawahan nan hijau.",
  },
  {
    category: "umum",
    q: "Berapa jumlah penduduk Nagari Tanjuang Baringin?",
    a: "Data jumlah penduduk dapat diperoleh melalui kantor Wali Nagari atau melalui halaman Data Nagari di website resmi ini. Informasi kependudukan diperbarui secara berkala setiap tahun.",
  },
  {
    category: "umum",
    q: "Apa visi dan misi Nagari Tanjuang Baringin?",
    a: "Visi dan misi Nagari Tanjuang Baringin dirumuskan oleh Pemerintahan Nagari bersama BAMUS dan masyarakat, yang mencakup pembangunan infrastruktur, peningkatan pelayanan publik, pemberdayaan ekonomi kreatif, dan pelestarian budaya. Detail lengkap dapat dilihat di halaman Visi & Misi.",
  },
  {
    category: "administrasi",
    q: "Bagaimana cara mengurus Kartu Keluarga (KK)?",
    a: 'Pengurusan Kartu Keluarga dapat dilakukan di kantor Wali Nagari dengan membawa dokumen asli dan fotokopi: (1) Surat pengantar dari Ketua Jorong, (2) Fotokopi KK lama, (3) Fotokopi KTP pemohon, (4) Surat keterangan pindah (jika pindah domisili). Proses biasanya selesai dalam 3–7 hari kerja.',
  },
  {
    category: "administrasi",
    q: "Bagaimana cara membuat KTP Elektronik?",
    a: "Pembuatan KTP Elektronik dapat dilakukan di kantor Wali Nagari dengan syarat: berusia minimal 17 tahun atau sudah menikah, membawa fotokopi KK dan surat pengantar dari Ketua Jorong. Perekaman data dilakukan di kantor nagari dan KTP elektronik akan diterbitkan dalam waktu 7–14 hari kerja.",
  },
  {
    category: "administrasi",
    q: "Bagaimana prosedur pembuatan Akta Kelahiran?",
    a: "Pembuatan Akta Kelahiran memerlukan: (1) Surat keterangan lahir dari bidan/rumah sakit, (2) Fotokopi KK dan KTP kedua orang tua, (3) Surat pengantar dari Ketua Jorong. Dokumen kemudian diproses melalui Dinas Kependudukan dan Pencatatan Sipil. Pelayanan ini gratis untuk batas waktu tertentu setelah kelahiran.",
  },
  {
    category: "administrasi",
    q: "Apakah bisa mengurus administrasi secara online?",
    a: "Ya, Nagari Tanjuang Baringin telah memiliki sistem pelayanan administrasi online untuk beberapa jenis dokumen. Anda dapat mengaksesnya melalui halaman Pelayanan Administrasi di website ini. Namun, untuk proses verifikasi dan pengambilan dokumen fisik tetap diperlukan kunjungan ke kantor nagari.",
  },
  {
    category: "pelayanan",
    q: "Apa saja jam pelayanan kantor Wali Nagari?",
    a: "Kantor Wali Nagari Tanjuang Baringin buka setiap hari Senin–Jumat pukul 08.00–16.00 WIB, dengan istirahat pukul 12.00–13.00 WIB. Untuk hari Sabtu dan Minggu tutup, kecuali untuk pelayanan darurat yang telah diatur sebelumnya.",
  },
  {
    category: "pelayanan",
    q: "Bagaimana cara menyampaikan pengaduan atau aspirasi?",
    a: "Masyarakat dapat menyampaikan pengaduan atau aspirasi melalui: (1) Kotak saran yang tersedia di kantor nagari, (2) Halaman Pengaduan di website ini, (3) Langsung menghubungi perangkat nagari, (4) Melalui musyawarah jorong atau nagari. Setiap pengaduan akan ditindaklanjuti maksimal 7 hari kerja.",
  },
  {
    category: "pelayanan",
    q: "Apakah ada layanan pengurusan surat keterangan tidak mampu?",
    a: "Ya, Nagari Tanjuang Baringin menyediakan layanan pembuatan Surat Keterangan Tidak Mampu (SKTM) bagi warga yang memenuhi syarat. Dokumen ini dapat digunakan untuk keperluan pengobatan, beasiswa, atau bantuan sosial lainnya. Silakan datang ke kantor nagari dengan membawa surat pengantar dari Ketua Jorong.",
  },
  {
    category: "pelayanan",
    q: "Bisakah masyarakat umum mendapatkan data nagari?",
    a: "Tentu. Sesuai dengan prinsip keterbukaan informasi publik, Nagari Tanjuang Baringin menyediakan data nagari seperti data kependudukan, anggaran, dan pembangunan yang dapat diakses melalui halaman Data Nagari atau dengan mengajukan permohonan informasi ke PPID Nagari.",
  },
  {
    category: "pemerintahan",
    q: "Siapa Wali Nagari Tanjuang Baringin saat ini?",
    a: "Informasi mengenai Wali Nagari dan jajaran perangkat nagari dapat dilihat pada halaman Struktur Pemerintahan. Halaman ini memuat informasi lengkap tentang kepemimpinan nagari beserta tugas dan fungsi masing-masing perangkat.",
  },
  {
    category: "pemerintahan",
    q: "Apa itu BAMUS dan apa perannya?",
    a: "BAMUS (Badan Musyawarah Nagari) adalah lembaga perwakilan masyarakat nagari yang berfungsi sebagai mitra pemerintah nagari dalam penetapan Peraturan Nagari (PerNag), pengawasan penyelenggaraan pemerintahan nagari, serta penampung dan penyalur aspirasi masyarakat.",
  },
  {
    category: "pemerintahan",
    q: "Berapa jumlah jorong di Nagari Tanjuang Baringin?",
    a: "Nagari Tanjuang Baringin terdiri dari beberapa jorong yang masing-masing dipimpin oleh seorang Ketua Jorong (KJ). Informasi lengkap mengenai jumlah dan nama jorong dapat ditemukan pada halaman Data Nagari atau dengan menghubungi kantor Wali Nagari.",
  },
  {
    category: "dokumen",
    q: "Bagaimana cara mengakses peraturan nagari?",
    a: "Peraturan Nagari (PerNag) yang telah ditetapkan dapat diakses melalui halaman PPID > Regulasi. Dokumen-dokumen ini disediakan dalam format PDF untuk memudahkan masyarakat mengunduh dan mempelajarinya. PerNag yang tersedia mencakup berbagai aspek penyelenggaraan pemerintahan nagari.",
  },
  {
    category: "dokumen",
    q: "Apakah laporan keuangan nagari dipublikasikan?",
    a: "Ya, sebagai wujud transparansi dan akuntabilitas, laporan keuangan dan laporan kinerja Nagari Tanjuang Baringin dipublikasikan secara berkala. Masyarakat dapat mengaksesnya melalui halaman PPID > Laporan Kinerja atau mengajukan permohonan informasi langsung ke kantor nagari.",
  },
];

/* ── Individual FAQ Accordion Item ── */
function AccordionItem({ item, index, isOpen, onToggle }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: contentRef.current.scrollHeight + 24,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <div
      data-faq-item
      className="group border-b border-white/5 last:border-b-0"
    >
      <button
        onClick={() => onToggle(index)}
        className="flex w-full items-start gap-4 px-5 py-5 text-left transition-all duration-200 hover:bg-white/2 sm:px-6 sm:py-6"
        aria-expanded={isOpen}
      >
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
          <FaQuestionCircle className="h-3.5 w-3.5" />
        </span>

        <div className="min-w-0 flex-1">
          <span
            className={`block text-sm font-semibold leading-snug transition-colors duration-200 sm:text-base ${
              isOpen ? "text-amber-300" : "text-slate-300 group-hover:text-white"
            }`}
          >
            {item.q}
          </span>
        </div>

        <span
          className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? "border-amber-500/40 bg-amber-500/10 text-amber-400 rotate-180"
              : "border-white/10 text-slate-500 group-hover:border-white/20 group-hover:text-slate-300"
          }`}
        >
          <FaChevronDown className="h-2.5 w-2.5" />
        </span>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-5 pb-6 sm:px-6 sm:pb-7">
          <div className="ml-11 pl-0">
            <div className="h-px w-full bg-linear-to-r from-amber-500/10 to-transparent mb-4" />
            <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
              {item.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const faqSectionRef = useRef(null);
  const searchInputRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState("umum");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

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
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 }
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
          }
        );
      }
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power3.out", delay: 0.7 }
        );
      }
      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.9 }
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
          }
        );
      }
    }, hero);

    return () => ctx.revert();
  }, []);

  /* ── Scroll reveal for FAQ items ── */
  useEffect(() => {
    const section = faqSectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll("[data-reveal]");
      items.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          onEnter: () => {
            gsap.fromTo(
              el,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
            );
          },
          once: true,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  /* ── Filter + Search ── */
  const filteredFaqs = faqData.filter((item) => {
    const matchCategory = activeCategory === "all" || item.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="relative min-h-screen bg-emerald-950 overflow-hidden">
      {/* ── Background Canvas ── */}
      <canvas
        ref={bgCanvasRef}
        className="fixed inset-0 pointer-events-none w-full h-full z-0"
      />

      {/* ════════════════════════════════════════
          HERO SECTION
         ════════════════════════════════════════ */}
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
            Lainnya
          </div>

          {/* Title */}
          <h1
            data-hero-title
            className="text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            Pusat
            <br />
            <span className="bg-linear-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              Bantuan
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
            Temukan jawaban atas pertanyaan-pertanyaan yang sering diajukan
            tentang Nagari Tanjuang Baringin. Jika Anda tidak menemukan yang
            dicari, jangan ragu untuk menghubungi kami.
          </p>

          {/* ── Search Bar ── */}
          <div data-hero-search className="mx-auto mt-8 max-w-xl">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setOpenIndex(null);
                }}
                placeholder="Cari pertanyaan..."
                className="w-full rounded-xl border border-white/10 bg-white/4 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-amber-500/30 focus:bg-white/6 focus:shadow-lg focus:shadow-amber-500/5"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FAQ SECTION
         ════════════════════════════════════════ */}
      <section
        ref={faqSectionRef}
        className="relative z-10 mx-auto max-w-4xl px-4 pb-24 sm:pb-32"
      >
        {/* ── Category Tabs ── */}
        <div data-reveal className="mb-10">
          <div className="flex flex-wrap gap-2">
            {faqCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIndex(null);
                  }}
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

        {/* ── FAQ Accordion ── */}
        <div data-reveal>
          {filteredFaqs.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/2">
              {filteredFaqs.map((item, idx) => (
                <AccordionItem
                  key={`${item.category}-${idx}`}
                  item={item}
                  index={idx}
                  isOpen={openIndex === idx}
                  onToggle={handleToggle}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/2 px-6 py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10">
                <FaSearch className="h-6 w-6 text-amber-400/70" />
              </div>
              <h3 className="text-lg font-bold text-white">Tidak ditemukan</h3>
              <p className="mt-2 max-w-md text-sm text-slate-400">
                Tidak ada pertanyaan yang sesuai dengan pencarian "{searchQuery}
                ". Coba gunakan kata kunci lain atau pilih kategori yang
                berbeda.
              </p>
            </div>
          )}
        </div>

        {/* ── Contact CTA ── */}
        <div data-reveal className="mt-12">
          <div className="rounded-2xl border border-white/5 bg-linear-to-br from-amber-500/4 to-transparent px-6 py-10 text-center sm:px-12">
            <h3 className="text-lg font-bold text-white sm:text-xl">
              Tidak menemukan jawaban?
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Hubungi kami melalui kontak di bawah ini, kami siap membantu.
            </p>

            <div className="mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href="tel:+6281234567890"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/4 px-5 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-amber-500/30 hover:bg-amber-500/5 hover:text-amber-300"
              >
                <FaPhoneAlt className="h-3.5 w-3.5" />
                Hubungi Telepon
              </a>
              <a
                href="mailto:info@tanjuangbaringin.go.id"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/4 px-5 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-amber-500/30 hover:bg-amber-500/5 hover:text-amber-300"
              >
                <FaEnvelope className="h-3.5 w-3.5" />
                Kirim Email
              </a>
              <a
                href="/lainnya/kontak"
                className="flex items-center justify-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-5 py-3 text-sm font-semibold text-amber-300 transition-all duration-200 hover:bg-amber-500/20 hover:shadow-sm hover:shadow-amber-500/20"
              >
                <FaMapMarkerAlt className="h-3.5 w-3.5" />
                Kunjungi Kami
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
