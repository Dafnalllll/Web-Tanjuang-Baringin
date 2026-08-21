import { useMemo, useState, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrashAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import { useAdminData } from "../../context/useAdminData";
import { useToast } from "../../components/admin/ui/useToast";
import { faqCategories } from "../../data/faqSeed";
import Modal from "../../components/admin/ui/Modal";
import ConfirmDialog from "../../components/admin/ui/ConfirmDialog";
import { Textarea } from "../../components/admin/ui/FormControls";
import CustomSelect from "../../components/admin/ui/customselected";
import Button from "../../components/admin/ui/Button";
import { faqService } from "../../services/faq";
import Pagination from "../../components/admin/ui/pagination";

const emptyForm = { category: "umum", q: "", a: "" };

export default function AdminFaq() {
  const { faqs: dummyFaqs, updateFaq, deleteFaq } = useAdminData();
  const [apiFaqs, setApiFaqs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const toast = useToast();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadFaqs = async () => {
    try {
      const data = await faqService.getAllFaqs();

      const formatted = data.map((item) => ({
        id: item.id,

        name: item.name,
        phone: item.phone,
        address: item.address,

        category: item.category ?? "umum",

        q: item.question,
        a: item.answer ?? "",

        file: item.file,

        status: item.status,

        source: "database",
      }));

      setApiFaqs(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadFaqs();
    };

    fetchData();
  }, []);

  const faqs = useMemo(() => {
    return [...apiFaqs, ...dummyFaqs];
  }, [dummyFaqs, apiFaqs]);

  /* ── Filter + cari ── */
  const filteredFaqs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return faqs.filter((item) => {
      const matchCategory =
        categoryFilter === "all" || item.category === categoryFilter;
      const matchSearch =
        !q ||
        item.q.toLowerCase().includes(q) ||
        item.a.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [faqs, search, categoryFilter]);

  /* ── Pagination ── */
  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);

  const paginatedFaqs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    const end = start + itemsPerPage;

    return filteredFaqs.slice(start, end);
  }, [filteredFaqs, currentPage]);

  /* ── Buka modal edit ── */
  const openEdit = (item) => {
    setFormErrors({});
    setEditingId(item.id);

    setForm({
      name: item.name,
      phone: item.phone,
      address: item.address,

      category: item.category,

      q: item.q,
      a: item.a,

      file: item.file,
    });

    setModalOpen(true);
  };

  /* ── Validasi ── */
  const validate = () => {
    const errors = {};
    if (!form.q.trim()) errors.q = "Pertanyaan wajib diisi.";
    if (!form.a.trim()) errors.a = "Jawaban wajib diisi.";
    return errors;
  };

  /* ── Simpan ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      toast.error("Periksa kembali form yang belum diisi.", {
        title: "Validasi Gagal",
      });
      return;
    }

    const data = {
      category: form.category,
      q: form.q.trim(),
      a: form.a.trim(),
    };

    if (!editingId) {
      toast.error("FAQ tidak ditemukan.", {
        title: "Error",
      });
      return;
    }

    const currentFaq = faqs.find((item) => item.id === editingId);

    if (currentFaq?.source === "database") {
      await faqService.updateFaq(editingId, {
        category: data.category,
        answer: data.a,
      });

      await loadFaqs();
    } else {
      updateFaq(editingId, data);
    }

    window.dispatchEvent(new Event("faq:changed"));

    toast.success("Jawaban berhasil disimpan.", {
      title: "Berhasil",
    });

    setModalOpen(false);
  };

  /* ── Hapus ── */
  const handleConfirmDelete = async () => {
    setDeleting(true);
    if (deleteTarget.source === "database") {
      await faqService.deleteFaq(deleteTarget.id);
      await loadFaqs();
    } else {
      deleteFaq(deleteTarget.id);
    }
    window.dispatchEvent(new Event("faq:changed"));
    toast.success(`FAQ "${truncate(deleteTarget.q, 40)}" dihapus.`, {
      title: "Dihapus",
    });
    setDeleteTarget(null);
    setDeleting(false);
  };

  const categoryLabel = (id) =>
    faqCategories.find((c) => c.id === id)?.label || id;

  const categoryOptions = [
    {
      value: "all",
      label: "Semua Kategori",
    },
    ...faqCategories.map((cat) => ({
      value: cat.id,
      label: cat.label,
    })),
  ];

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Kelola FAQ
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            {faqs.length} pertanyaan tersimpan. Data dummy tetap dipertahankan.
          </p>
        </div>
      </div>

      {/* ── Toolbar: cari + filter ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari pertanyaan atau jawaban..."
            className="w-full rounded-lg border border-white/10 bg-white/4 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-amber-500/40 focus:bg-white/6"
          />
        </div>
        <div className="sm:w-56">
          <CustomSelect
            value={
              categoryOptions.find((item) => item.value === categoryFilter)
                ?.label
            }
            placeholder="Semua Kategori"
            options={categoryOptions.map((item) => item.label)}
            onChange={(selectedLabel) => {
              const selected = categoryOptions.find(
                (item) => item.label === selectedLabel,
              );

              setCategoryFilter(selected?.value || "all");
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* ── Tabel FAQ ── */}
      <div className="flex min-h-110 flex-col">
        <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/2">
          <div className="admin-scroll overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-white/2 text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="px-5 py-3.5 font-bold">Pengirim</th>
                  <th className="px-5 py-3.5 font-bold">Pertanyaan</th>
                  <th className="px-5 py-3.5 font-bold">Kategori</th>
                  <th className="px-5 py-3.5 font-bold">Status</th>
                  <th className="px-5 py-3.5 text-right font-bold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedFaqs.length > 0 ? (
                  paginatedFaqs.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-white/3 last:border-b-0 transition-colors hover:bg-white/2"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-white">
                          {item.name || "-"}
                        </p>

                        <p className="text-xs text-slate-500">
                          {item.phone || "-"}
                        </p>
                      </td>

                      <td className="max-w-md px-5 py-4">
                        <p className="truncate font-semibold text-white">
                          {item.q}
                        </p>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {item.address}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                          {categoryLabel(item.category)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase
                          ${
                            item.status === "PENDING"
                              ? "bg-yellow-500/10 text-yellow-300"
                              : "bg-green-500/10 text-green-300"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {item.source === "database" ? (
                            <>
                              <button
                                onClick={() => openEdit(item)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition-all hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-300"
                                aria-label={`Edit ${item.q}`}
                              >
                                <FaEdit className="h-3.5 w-3.5" />
                              </button>

                              <button
                                onClick={() => setDeleteTarget(item)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
                                aria-label={`Hapus ${item.q}`}
                              >
                                <FaTrashAlt className="h-3.5 w-3.5" />
                              </button>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-slate-500">
                              -
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-5 py-14 text-center">
                      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-white/5 bg-white/2">
                        <FaSearch className="h-5 w-5 text-slate-600" />
                      </div>
                      <p className="text-sm font-semibold text-white">
                        Tidak ada FAQ ditemukan
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Coba ubah kata kunci pencarian atau filter kategori.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Pagination ── */}
        <div className="mt-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* ── Modal tambah/edit ── */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Jawab Pengaduan"
          subtitle="Periksa detail pengaduan masyarakat sebelum memberikan jawaban"
          icon={FaQuestionCircle}
          size="faq"
          footer={
            <>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Batal
              </Button>
              <Button
                onClick={handleSubmit}
                icon={editingId ? FaEdit : FaPlus}
                className="border-amber-500/30 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25"
              >
                Simpan Jawaban
              </Button>
            </>
          }
        >
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h4 className="mb-3 font-semibold text-white">
                Informasi Pengaduan
              </h4>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-500">Nama</p>
                  <p className="text-sm text-white">{form.name || "-"}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">No. HP</p>
                  <p className="text-sm text-white">{form.phone || "-"}</p>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-xs text-slate-500">Alamat</p>
                <p className="text-sm text-white">{form.address || "-"}</p>
              </div>

              {form.file && (
                <div className="mt-3">
                  <a
                    href={`http://localhost:3001${form.file}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-sm text-amber-300 hover:bg-amber-500/20"
                  >
                    Lihat Lampiran
                  </a>
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Kategori
              </label>

              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white">
                {faqCategories.find((cat) => cat.id === form.category)?.label ??
                  form.category}
              </div>
            </div>

            <Textarea
              label="Pertanyaan dari Masyarakat"
              rows={4}
              value={form.q}
              readOnly
            />

            <Textarea
              label="Jawaban"
              required
              rows={5}
              value={form.a}
              onChange={(e) => setForm({ ...form, a: e.target.value })}
              placeholder="Tulis jawaban lengkap..."
              error={formErrors.a}
            />
          </form>
        </Modal>

        {/* ── Konfirmasi hapus ── */}
        <ConfirmDialog
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
          loading={deleting}
          title="Hapus FAQ ini?"
          message={`FAQ "${deleteTarget ? truncate(deleteTarget.q, 60) : ""}" akan dihapus secara permanen.`}
        />
      </div>
    </div>
  );
}

/* ─── Helper ─── */
function truncate(text, max) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max)}…` : text;
}
