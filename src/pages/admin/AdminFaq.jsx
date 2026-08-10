import { useMemo, useState } from "react";
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
import { Input, Textarea, Select } from "../../components/admin/ui/FormControls";
import Button from "../../components/admin/ui/Button";

const emptyForm = { category: "umum", q: "", a: "" };

export default function AdminFaq() {
  const { faqs, addFaq, updateFaq, deleteFaq } = useAdminData();
  const toast = useToast();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  /* ── Filter + cari ── */
  const filteredFaqs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return faqs.filter((item) => {
      const matchCategory = categoryFilter === "all" || item.category === categoryFilter;
      const matchSearch =
        !q ||
        item.q.toLowerCase().includes(q) ||
        item.a.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [faqs, search, categoryFilter]);

  /* ── Buka modal tambah ── */
  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormErrors({});
    setModalOpen(true);
  };

  /* ── Buka modal edit ── */
  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({ category: item.category, q: item.q, a: item.a });
    setFormErrors({});
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      toast.error("Periksa kembali form yang belum diisi.", { title: "Validasi Gagal" });
      return;
    }

    const data = {
      category: form.category,
      q: form.q.trim(),
      a: form.a.trim(),
    };

    if (editingId) {
      updateFaq(editingId, data);
      toast.success("FAQ berhasil diperbarui.", { title: "Diperbarui" });
    } else {
      addFaq(data);
      toast.success("FAQ baru berhasil ditambahkan.", { title: "Ditambahkan" });
    }

    setModalOpen(false);
  };

  /* ── Hapus ── */
  const handleConfirmDelete = () => {
    setDeleting(true);
    // Simulasi proses hapus singkat
    setTimeout(() => {
      deleteFaq(deleteTarget.id);
      toast.success(`FAQ "${truncate(deleteTarget.q, 40)}" dihapus.`, { title: "Dihapus" });
      setDeleteTarget(null);
      setDeleting(false);
    }, 400);
  };

  const categoryLabel = (id) =>
    faqCategories.find((c) => c.id === id)?.label || id;

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">Kelola FAQ</h1>
          <p className="mt-1 text-xs text-slate-400">
            {faqs.length} pertanyaan tersimpan. Data dummy tetap dipertahankan.
          </p>
        </div>
        <Button icon={FaPlus} onClick={openAdd}>
          Tambah FAQ
        </Button>
      </div>

      {/* ── Toolbar: cari + filter ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari pertanyaan atau jawaban..."
            className="w-full rounded-lg border border-white/10 bg-white/4 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-amber-500/40 focus:bg-white/6"
          />
        </div>
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="sm:w-56"
        >
          <option value="all">Semua Kategori</option>
          {faqCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </Select>
      </div>

      {/* ── Tabel FAQ ── */}
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/2">
        <div className="admin-scroll overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/2 text-[10px] uppercase tracking-widest text-slate-500">
                <th className="px-5 py-3.5 font-bold">Pertanyaan</th>
                <th className="px-5 py-3.5 font-bold">Kategori</th>
                <th className="px-5 py-3.5 text-right font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-white/3 last:border-b-0 transition-colors hover:bg-white/2"
                  >
                    <td className="max-w-md px-5 py-4">
                      <p className="truncate font-semibold text-white">{item.q}</p>
                      <p className="mt-1 truncate text-xs text-slate-500">{item.a}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                        {categoryLabel(item.category)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
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
                    <p className="text-sm font-semibold text-white">Tidak ada FAQ ditemukan</p>
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

      {/* ── Modal tambah/edit ── */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Edit FAQ" : "Tambah FAQ"}
        icon={FaQuestionCircle}
        size="lg"
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
              {editingId ? "Simpan Perubahan" : "Tambah FAQ"}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Select
            label="Kategori"
            required
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {faqCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </Select>

          <Input
            label="Pertanyaan"
            required
            value={form.q}
            onChange={(e) => setForm({ ...form, q: e.target.value })}
            placeholder="Tulis pertanyaan..."
            error={formErrors.q}
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
  );
}

/* ─── Helper ─── */
function truncate(text, max) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max)}…` : text;
}
