import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  FaQuestionCircle,
  FaUserTie,
  FaPlus,
  FaEdit,
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPencilAlt,
  FaBoxOpen,
} from "react-icons/fa";
import { useAdminData } from "../../context/useAdminData";
import { useFaqStats } from "../../context/useFaqStats";
import { useToast } from "../../components/admin/ui/useToast";
import Modal from "../../components/admin/ui/Modal";
import Alert from "../../components/admin/ui/Alert";
import Button from "../../components/admin/ui/Button";
import { produkService } from "../../services/produk";

export default function Dashboard() {
  const { faqs, struktur } = useAdminData();
  const { totalCount } = useFaqStats();
  const toast = useToast();

  const [demoModal, setDemoModal] = useState(false);
  const [totalProduk, setTotalProduk] = useState(0);

  const totalStruktur = struktur.length;
  const totalFaq = faqs.length;

  const DUMMY_PRODUK_COUNT = 1;

  useEffect(() => {
    const loadProdukCount = async () => {
      try {
        const data = await produkService.getAllProduk();
        setTotalProduk(data.length + DUMMY_PRODUK_COUNT);
      } catch {
        setTotalProduk(DUMMY_PRODUK_COUNT);
      }
    };

    loadProdukCount();
  }, []);

  const levelCounts = struktur.reduce((acc, item) => {
    acc[item.level] = (acc[item.level] || 0) + 1;
    return acc;
  }, {});

  const categoryCounts = faqs.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const stats = [
    {
      label: "Total FAQ",
      value: totalFaq + totalCount,
      icon: FaQuestionCircle,
      to: "/admin/faq",
      color: "border-amber-500/25 bg-amber-500/10 text-amber-400",
    },
    {
      label: "Total Perangkat",
      value: totalStruktur,
      icon: FaUserTie,
      to: "/admin/struktur",
      color: "border-emerald-500/25 bg-emerald-500/10 text-emerald-400",
    },
    {
      label: "Total Produk",
      value: totalProduk,
      icon: FaBoxOpen,
      to: "/admin/produk",
      color: "border-blue-500/25 bg-blue-500/10 text-blue-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Dashboard Admin
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Kelola konten website Nagari Tanjuang Baringin
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin/faq?new=1"
            className="inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/15 px-4 py-2.5 text-xs font-bold text-amber-300 transition-all hover:bg-amber-500/25"
          >
            <FaPlus className="h-3 w-3" />
            Jawab FAQ
          </Link>
          <Link
            to="/admin/struktur?new=1"
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/15 px-4 py-2.5 text-xs font-bold text-emerald-300 transition-all hover:bg-emerald-500/25"
          >
            <FaPlus className="h-3 w-3" />
            Tambah Perangkat
          </Link>
        </div>
      </div>

      {/* ── Alert demo ── */}
      <Alert type="info" title="Informasi" dismissible className="max-w-3xl">
        Data yang tampil di halaman ini masih menggunakan data dummy. Gunakan
        menu FAQ dan Struktur untuk menambah, mengubah, atau menghapus konten.
      </Alert>

      {/* ── Kartu statistik ── */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.to}
            className={`group flex items-center gap-4 rounded-2xl border ${stat.color} p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30`}
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-xl border ${stat.color}`}
            >
              <stat.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xl font-black text-white">
                  {stat.value}
                </span>
              </div>
              <p className="mt-1 text-xs font-semibold text-slate-400">
                {stat.label}
              </p>
            </div>
            <FaPencilAlt className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-60" />
          </Link>
        ))}
      </div>

      {/* ── Demo komponen UI ── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Demo Modal & Toast */}
        <div className="rounded-2xl border border-white/5 bg-white/2 p-5">
          <h2 className="text-sm font-bold text-white">Komponen UI</h2>
          <p className="mt-1 text-xs text-slate-400">
            Coba modal, toast, dan alert yang tersedia di panel admin.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 ">
            <Button
              icon={FaInfoCircle}
              className="cursor-pointer"
              onClick={() => toast.info("Ini adalah toast informasi.")}
            >
              Toast Info
            </Button>
            <Button
              variant="success"
              icon={FaCheckCircle}
              className="cursor-pointer"
              onClick={() =>
                toast.success("Data berhasil disimpan!", { title: "Tersimpan" })
              }
            >
              Toast Sukses
            </Button>
            <Button
              variant="danger"
              icon={FaExclamationTriangle}
              className="cursor-pointer"
              onClick={() =>
                toast.error("Terjadi kesalahan saat menyimpan.", {
                  title: "Gagal",
                })
              }
            >
              Toast Error
            </Button>
            <Button
              icon={FaEdit}
              className="cursor-pointer"
              onClick={() => setDemoModal(true)}
            >
              Buka Modal
            </Button>
          </div>
        </div>

        {/* Ringkasan kategori */}
        <div className="rounded-2xl border border-white/5 bg-white/2 p-5">
          <h2 className="text-sm font-bold text-white">Ringkasan Kategori</h2>
          <p className="mt-1 text-xs text-slate-400">
            Distribusi konten per kategori.
          </p>
          <div className="mt-4 space-y-3">
            {Object.entries(categoryCounts).map(([key, count]) => (
              <div key={key} className="flex items-center gap-3">
                <span className="w-28 truncate text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {faqCategoryLabel(key)}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-amber-500/70 to-amber-400"
                    style={{ width: `${(count / totalFaq) * 100}%` }}
                  />
                </div>
                <span className="w-6 text-right text-xs font-bold text-white">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Modal demo ── */}
      <Modal
        isOpen={demoModal}
        onClose={() => setDemoModal(false)}
        title="Contoh Modal"
        icon={FaInfoCircle}
        footer={
          <>
            <Button
              variant="secondary"
              className="cursor-pointer"
              onClick={() => setDemoModal(false)}
            >
              Tutup
            </Button>
            <Button
              className="cursor-pointer"
              onClick={() => {
                setDemoModal(false);
                toast.success("Aksi contoh berhasil dijalankan.", {
                  title: "Sukses",
                });
              }}
            >
              Simpan
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-300">
            Ini adalah komponen modal reusable yang dipakai di seluruh halaman
            admin. Modal mendukung ukuran berbeda, lock scroll, dan tombol Esc.
          </p>
          <div className="rounded-xl border border-white/5 bg-white/2 p-4">
            <Alert type="warning">
              Klik di luar modal atau tekan Esc untuk menutup modal ini.
            </Alert>
          </div>
        </div>
      </Modal>

      {/* ── Level struktur quick view ── */}
      <div className="rounded-2xl border border-white/5 bg-white/2 p-5">
        <h2 className="text-sm font-bold text-white">Perangkat per Level</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Object.entries(levelCounts).map(([level, count]) => (
            <div
              key={level}
              className="rounded-xl border border-white/5 bg-white/2 px-4 py-3 text-center"
            >
              <p className="text-xl font-black text-amber-300">{count}</p>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {strukturLevelLabel(level)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Helper label ─── */
function faqCategoryLabel(id) {
  const labels = {
    umum: "Umum",
    administrasi: "Administrasi",
    pelayanan: "Pelayanan",
    pemerintahan: "Pemerintahan",
    dokumen: "Dokumen",
  };
  return labels[id] || id;
}

function strukturLevelLabel(id) {
  const labels = {
    pimpinan: "Pimpinan",
    kasi: "Kasi",
    kaur: "Kaur",
    staf: "Staf",
    jorong: "Jorong",
    petugas: "Petugas",
  };
  return labels[id] || id;
}
