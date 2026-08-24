import { useMemo, useState, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrashAlt,
  FaImages,
  FaImage,
} from "react-icons/fa";
import { useToast } from "../../components/admin/ui/useToast";
import Modal from "../../components/admin/ui/Modal";
import ConfirmDialog from "../../components/admin/ui/ConfirmDialog";
import { Input, Textarea } from "../../components/admin/ui/FormControls";
import Button from "../../components/admin/ui/Button";
import { galeriService } from "../../services/galeri";
import Pagination from "../../components/admin/ui/pagination";

const emptyForm = {
  title: "",
  category: "",
  desc: "",
  image: null,
  imagePreview: "",
};

const CATEGORIES = [
  { id: "alam", label: "Alam" },
  { id: "kegiatan", label: "Kegiatan" },
  { id: "budaya", label: "Budaya" },
  { id: "sosial", label: "Sosial" },
  { id: "acara", label: "Acara" },
];

const isFileImage = (file) =>
  file && file.type && file.type.startsWith("image/");

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

const resolveImageUrl = (src) =>
  src?.startsWith("/uploads")
    ? `${import.meta.env.VITE_ASSET_URL}${src}`
    : src;

export default function AdminGaleri() {
  const [apiGaleri, setApiGaleri] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;
  const toast = useToast();

  const [search, setSearch] = useState("");
  const [filterKategori, setFilterKategori] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  /* ── Ambil data API ── */
  const loadGaleri = async () => {
    try {
      const data = await galeriService.getAllGaleri();

      const formatted = data.map((item) => ({
        id: item.id,
        title: item.title ?? "",
        category: item.category ?? "",
        desc: item.desc ?? "",
        image: item.image ?? item.imageUrl ?? "",
        source: "database",
      }));

      setApiGaleri(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadGaleri();
    };

    fetchData();
  }, []);

  /* ── Filter kategori + cari ── */
  const filteredGaleri = useMemo(() => {
    const q = search.trim().toLowerCase();
    return apiGaleri.filter((item) => {
      const matchKategori =
        filterKategori === "all" || item.category === filterKategori;
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q);
      return matchKategori && matchSearch;
    });
  }, [apiGaleri, search, filterKategori]);

  /* ── Pagination ── */
  const totalPages = Math.ceil(filteredGaleri.length / itemsPerPage);

  const paginatedGaleri = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredGaleri.slice(start, end);
  }, [filteredGaleri, currentPage]);

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
    setForm({
      title: item.title || "",
      category: item.category || "",
      desc: item.desc || "",
      image: item.image || "",
      imagePreview: resolveImageUrl(item.image) || "",
    });
    setFormErrors({});
    setModalOpen(true);
  };

  /* ── Validasi ── */
  const validate = () => {
    const errors = {};
    if (!form.title.trim()) errors.title = "Judul galeri wajib diisi.";
    if (!form.category.trim()) errors.category = "Kategori wajib dipilih.";
    if (!form.desc.trim()) errors.desc = "Deskripsi wajib diisi.";
    if (!editingId && !form.image)
      errors.image = "Gambar wajib diunggah untuk galeri baru.";
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

    try {
      const formData = new FormData();

      formData.append("title", form.title.trim());
      formData.append("category", form.category.trim());
      formData.append("desc", form.desc.trim());

      if (form.image instanceof File) {
        formData.append("image", form.image);
      }

      if (editingId) {
        await galeriService.updateGaleri(editingId, formData);

        toast.success("Galeri berhasil diperbarui");
      } else {
        await galeriService.createGaleri(formData);

        toast.success("Galeri berhasil ditambahkan");
      }

      await loadGaleri();

      setModalOpen(false);
      setEditingId(null);
      setForm(emptyForm);
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Gagal menyimpan galeri");
    }
  };

  /* ── Hapus ── */
  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);

      await galeriService.deleteGaleri(deleteTarget.id);

      await loadGaleri();

      toast.success("Galeri berhasil dihapus");

      setDeleteTarget(null);
    } catch (error) {
      console.error(error);

      toast.error("Gagal menghapus galeri");
    } finally {
      setDeleting(false);
    }
  };

  /* ── Upload gambar → preview via URL.createObjectURL ── */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isFileImage(file)) {
      toast.error("File harus berupa gambar (jpg, png, webp).", {
        title: "File Tidak Valid",
      });
      e.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Ukuran gambar maksimal 5MB.", {
        title: "File Terlalu Besar",
      });
      e.target.value = "";
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      image: file,
      imagePreview: objectUrl,
    }));

    toast.info("Gambar berhasil dimuat. Klik Simpan untuk menyimpan.", {
      title: "Gambar Siap",
    });
  };

  const removeImage = () => {
    setForm((prev) => ({ ...prev, image: "", imagePreview: "" }));
  };

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Kelola Galeri
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            {apiGaleri.length} foto tersimpan di galeri nagari.
          </p>
        </div>
        <Button icon={FaPlus} className="cursor-pointer" onClick={openAdd}>
          Tambah Foto
        </Button>
      </div>

      {/* ── Toolbar: cari + filter kategori ── */}
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
            placeholder="Cari judul atau deskripsi foto..."
            className="w-full rounded-lg border border-white/10 bg-white/4 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-amber-500/40 focus:bg-white/6"
          />
        </div>

        <select
          value={filterKategori}
          onChange={(e) => {
            setFilterKategori(e.target.value);
            setCurrentPage(1);
          }}
          className="cursor-pointer rounded-lg border border-white/10 bg-white/4 px-3.5 py-2.5 text-sm font-semibold text-slate-300 outline-none transition-all focus:border-amber-500/40 focus:bg-white/6"
        >
          <option value="all">Semua Kategori</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* ── Grid Galeri ── */}
      <div className="flex min-h-110 flex-col">
        {paginatedGaleri.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {paginatedGaleri.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-xl border border-white/5 bg-white/2 transition-colors hover:border-amber-500/20"
              >
                {/* Gambar */}
                <div className="relative h-36 w-full overflow-hidden bg-white/3 sm:h-40">
                  {item.image ? (
                    <img
                      src={resolveImageUrl(item.image)}
                      alt={item.title}
                      onClick={() => setPreviewImage(resolveImageUrl(item.image))}
                      className="h-full w-full cursor-zoom-in object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <FaImage className="h-8 w-8 text-slate-600" />
                    </div>
                  )}

                  {/* Badge kategori */}
                  {item.category && (
                    <span className="absolute left-2 top-2 rounded-md border border-white/10 bg-black/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/80 backdrop-blur-sm">
                      {item.category}
                    </span>
                  )}
                </div>

                {/* Konten */}
                <div className="space-y-2 p-3">
                  <p className="truncate text-sm font-semibold text-white">
                    {item.title || "-"}
                  </p>
                  <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">
                    {item.desc || "-"}
                  </p>

                  {/* Aksi */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => openEdit(item)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition-all hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-300"
                      aria-label={`Edit ${item.title}`}
                    >
                      <FaEdit className="h-3.5 w-3.5 cursor-pointer" />
                    </button>

                    <button
                      onClick={() => setDeleteTarget(item)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
                      aria-label={`Hapus ${item.title}`}
                    >
                      <FaTrashAlt className="h-3.5 w-3.5 cursor-pointer" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/2 px-5 py-14 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-white/5 bg-white/2">
              <FaImages className="h-5 w-5 text-slate-600" />
            </div>
            <p className="text-sm font-semibold text-white">
              Tidak ada foto ditemukan
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Coba ubah kata kunci pencarian atau filter kategori.
            </p>
          </div>
        )}

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
          title={editingId ? "Edit Foto" : "Tambah Foto"}
          subtitle="Isi konten galeri sesuai yang akan ditampilkan di halaman publik"
          icon={FaImages}
          size="lg"
          footer={
            <>
              <Button
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setModalOpen(false)}
              >
                Batal
              </Button>
              <Button
                onClick={handleSubmit}
                icon={editingId ? FaEdit : FaPlus}
                className="border-amber-500/30 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 cursor-pointer"
              >
                {editingId ? "Simpan Perubahan" : "Tambah Foto"}
              </Button>
            </>
          }
        >
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* ── Gambar ── */}
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Gambar Galeri
              </label>
              <div className="flex items-center gap-4">
                <div className="flex h-28 w-44 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-white/10 bg-white/3">
                  {form.imagePreview || form.image ? (
                    <img
                      src={form.imagePreview || resolveImageUrl(form.image)}
                      alt="Preview Gambar"
                      onClick={() =>
                        setPreviewImage(
                          form.imagePreview || resolveImageUrl(form.image),
                        )
                      }
                      className="h-full w-full cursor-zoom-in object-cover transition-all duration-300 hover:scale-105"
                    />
                  ) : (
                    <FaImage className="h-8 w-8 text-slate-600" />
                  )}
                </div>
                <div className="flex flex-col items-start gap-1.5">
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/4 px-3.5 py-2 text-xs font-semibold text-slate-300 transition-all hover:bg-white/10 hover:text-white">
                    <FaImage className="h-3.5 w-3.5" />
                    {form.image ? "Ganti Gambar" : "Upload Gambar"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                  {form.image && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="cursor-pointer text-xs font-semibold text-red-300 hover:text-red-200"
                    >
                      Hapus Gambar
                    </button>
                  )}
                  <p className="text-[10px] text-slate-500">
                    JPG, PNG, WEBP • Maks. 5MB
                  </p>
                  {formErrors.image && (
                    <p className="text-[11px] font-semibold text-red-400">
                      {formErrors.image}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Judul + Kategori ── */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Judul Foto"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="cth: Gotong Royong Bersama"
                error={formErrors.title}
              />

              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Kategori <span className="text-red-400">*</span>
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className={`w-full cursor-pointer rounded-lg border bg-white/4 px-3.5 py-2.5 text-sm text-white outline-none transition-all focus:border-amber-500/40 focus:bg-white/6 ${
                    formErrors.category
                      ? "border-red-500/50"
                      : "border-white/10"
                  }`}
                >
                  <option value="" disabled className="bg-emerald-950">
                    Pilih kategori...
                  </option>
                  {CATEGORIES.map((cat) => (
                    <option
                      key={cat.id}
                      value={cat.id}
                      className="bg-emerald-950"
                    >
                      {cat.label}
                    </option>
                  ))}
                </select>
                {formErrors.category && (
                  <p className="mt-1 text-[11px] font-semibold text-red-400">
                    {formErrors.category}
                  </p>
                )}
              </div>
            </div>

            {/* ── Deskripsi ── */}
            <Textarea
              label="Deskripsi"
              required
              rows={4}
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              placeholder="Tulis deskripsi singkat tentang foto ini..."
              error={formErrors.desc}
            />
          </form>
        </Modal>

        {/* ── Konfirmasi hapus ── */}
        <ConfirmDialog
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
          loading={deleting}
          title="Hapus Foto ini?"
          message={`Foto "${deleteTarget ? truncate(deleteTarget.title, 60) : ""}" akan dihapus secara permanen.`}
        />

        {/* ── Preview Gambar ── */}
        {previewImage && (
          <div
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
            onClick={() => setPreviewImage(null)}
          >
            <div
              className="relative max-h-[80vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute cursor-pointer -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition hover:bg-red-600"
              >
                ✕
              </button>

              <img
                src={previewImage}
                alt="Preview"
                className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Helper ─── */
function truncate(text, max) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max)}…` : text;
}
