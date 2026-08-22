import { useMemo, useState, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrashAlt,
  FaBoxOpen,
  FaImage,
  FaPlusCircle,
  FaMinusCircle,
} from "react-icons/fa";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileAlt } from "react-icons/fa";
import { useAdminData } from "../../context/useAdminData";
import { useToast } from "../../components/admin/ui/useToast";
import Modal from "../../components/admin/ui/Modal";
import ConfirmDialog from "../../components/admin/ui/ConfirmDialog";
import { Input, Textarea } from "../../components/admin/ui/FormControls";
import Button from "../../components/admin/ui/Button";
import { produkService } from "../../services/produk";
import Pagination from "../../components/admin/ui/pagination";

const emptyForm = {
  badge: "",
  title: "",
  subtitle: "",
  description: "",
  highlights: [""],

  cover: "",
  coverPreview: "",

  filePath: null,

  buttonText: "Unduh File",
};

const isFileImage = (file) =>
  file && file.type && file.type.startsWith("image/");

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const ALLOWED_FILE_TYPES = [
  "application/pdf",

  "application/msword",

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  "application/vnd.ms-excel",

  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const formatFileSize = (bytes) => {
  if (!bytes) return "-";

  const kb = bytes / 1024;

  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  return `${(kb / 1024).toFixed(2)} MB`;
};

const getFileIcon = (file) => {
  if (!file) return FaFileAlt;

  if (file.type.includes("pdf")) {
    return FaFilePdf;
  }

  if (
    file.type.includes("word") ||
    file.name.endsWith(".doc") ||
    file.name.endsWith(".docx")
  ) {
    return FaFileWord;
  }

  if (
    file.type.includes("excel") ||
    file.name.endsWith(".xls") ||
    file.name.endsWith(".xlsx")
  ) {
    return FaFileExcel;
  }

  return FaFileAlt;
};

export default function AdminProduk() {
  const { produk: dummyProduk } = useAdminData();
  const [apiProduk, setApiProduk] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const toast = useToast();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  /* ── Ambil data API (fallback ke dummy bila backend belum siap) ── */
  const loadProduk = async () => {
    try {
      const data = await produkService.getAllProduk();

      const formatted = data.map((item) => ({
        id: item.id,
        badge: item.badge ?? "",
        title: item.title ?? "",
        subtitle: item.subtitle ?? "",
        description: item.description ?? "",
        highlights: item.highlights ?? [],
        cover: item.cover ?? "",
        filePath: item.filePath ?? "",
        buttonText: item.buttonText ?? "",
        source: "database",
      }));

      setApiProduk(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadProduk();
    };

    fetchData();
  }, []);

  const produk = useMemo(
    () => [...apiProduk, ...dummyProduk],
    [dummyProduk, apiProduk],
  );

  /* ── Filter + cari ── */
  const filteredProduk = useMemo(() => {
    const q = search.trim().toLowerCase();
    return produk.filter((item) => {
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchSearch;
    });
  }, [produk, search]);

  /* ── Pagination ── */
  const totalPages = Math.ceil(filteredProduk.length / itemsPerPage);

  const paginatedProduk = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProduk.slice(start, end);
  }, [filteredProduk, currentPage]);

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
      badge: item.badge || "",
      title: item.title || "",
      subtitle: item.subtitle || "",
      description: item.description || "",

      highlights:
        item.highlights && item.highlights.length > 0
          ? [...item.highlights]
          : [""],

      cover: item.cover || "",

      coverPreview: item.cover?.startsWith("/uploads")
        ? `${import.meta.env.VITE_ASSET_URL}${item.cover}`
        : item.cover || "",
      filePath: item.filePath || "",

      buttonText: item.buttonText || "Unduh File",
    });
    setFormErrors({});
    setModalOpen(true);
  };

  /* ── Validasi ── */
  const validate = () => {
    const errors = {};
    if (!form.title.trim()) errors.title = "Judul produk wajib diisi.";
    if (!form.description.trim())
      errors.description = "Deskripsi produk wajib diisi.";
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

      formData.append("badge", form.badge.trim());

      formData.append("title", form.title.trim());

      formData.append("subtitle", form.subtitle.trim());

      formData.append("description", form.description.trim());

      formData.append("buttonText", form.buttonText.trim());

      formData.append(
        "highlights",
        JSON.stringify(form.highlights.map((h) => h.trim()).filter(Boolean)),
      );

      if (form.cover instanceof File) {
        formData.append("cover", form.cover);
      }

      if (form.filePath instanceof File) {
        formData.append("file", form.filePath);
      }

      if (editingId) {
        await produkService.updateProduk(editingId, formData);

        toast.success("Produk berhasil diperbarui");
      } else {
        await produkService.createProduk(formData);

        toast.success("Produk berhasil ditambahkan");
      }

      await loadProduk();

      setModalOpen(false);
      setEditingId(null);
      setForm(emptyForm);
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Gagal menyimpan produk");
    }
  };

  /* ── Hapus ── */
  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);

      await produkService.deleteProduk(deleteTarget.id);

      await loadProduk();

      toast.success("Produk berhasil dihapus");

      setDeleteTarget(null);
    } catch (error) {
      console.error(error);

      toast.error("Gagal menghapus produk");
    } finally {
      setDeleting(false);
    }
  };

  /* ── Poin unggulan (highlights) ── */
  const updateHighlight = (index, value) => {
    setForm((prev) => {
      const next = [...prev.highlights];
      next[index] = value;
      return { ...prev, highlights: next };
    });
  };

  const addHighlight = () => {
    setForm((prev) => ({ ...prev, highlights: [...prev.highlights, ""] }));
  };

  const removeHighlight = (index) => {
    setForm((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  /* ── Upload cover → preview via URL.createObjectURL ── */
  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isFileImage(file)) {
      toast.error("File harus berupa gambar (jpg, png, webp).", {
        title: "File Tidak Valid",
      });
      e.target.value = "";
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,

      cover: file,

      coverPreview: objectUrl,
    }));
    toast.info("Cover berhasil dimuat. Klik Simpan untuk menyimpan.", {
      title: "Cover Siap",
    });
  };

  /* ── Upload file (PDF, DOC, XLS) → simpan path di form.filePath ── */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error("File harus berupa PDF, DOC, DOCX, XLS, atau XLSX.", {
        title: "Format Tidak Didukung",
      });

      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Ukuran file maksimal 10MB.", {
        title: "File Terlalu Besar",
      });

      e.target.value = "";
      return;
    }

    setForm((prev) => ({
      ...prev,
      filePath: file,
    }));

    toast.success("File berhasil dipilih.", {
      title: "Upload Siap",
    });
  };

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Kelola Produk
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            {produk.length} produk tersimpan. Data dummy tetap dipertahankan.
          </p>
        </div>
        <Button icon={FaPlus} className="cursor-pointer" onClick={openAdd}>
          Tambah Produk
        </Button>
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
            placeholder="Cari judul, subjudul, atau deskripsi produk..."
            className="w-full rounded-lg border border-white/10 bg-white/4 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-amber-500/40 focus:bg-white/6"
          />
        </div>
      </div>

      {/* ── Tabel Produk ── */}
      <div className="flex min-h-110 flex-col">
        <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/2">
          <div className="admin-scroll overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-white/2 text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="px-5 py-3.5 font-bold">Produk</th>
                  <th className="px-5 py-3.5 font-bold">Deskripsi</th>
                  <th className="px-5 py-3.5 text-right font-bold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProduk.length > 0 ? (
                  paginatedProduk.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-white/3 last:border-b-0 transition-colors hover:bg-white/2"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/3">
                            {item.cover ? (
                              <img
                                src={
                                  item.cover?.startsWith("/uploads")
                                    ? `${import.meta.env.VITE_ASSET_URL}${item.cover}`
                                    : item.cover
                                }
                                alt={item.title}
                                onClick={() =>
                                  setPreviewImage(
                                    item.cover?.startsWith("/uploads")
                                      ? `${import.meta.env.VITE_ASSET_URL}${item.cover}`
                                      : item.cover,
                                  )
                                }
                                className="h-full w-full cursor-zoom-in object-cover transition-transform duration-300 hover:scale-110"
                              />
                            ) : (
                              <FaImage className="h-4 w-4 text-slate-600" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-white">
                              {item.title || "-"}
                            </p>
                            <p className="text-xs text-slate-500">
                              {item.subtitle || "-"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="max-w-md px-5 py-4">
                        <p className="line-clamp-2 text-xs leading-relaxed text-slate-400">
                          {item.description || "-"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        {item.isDummy ? (
                          <div className="flex justify-end">
                            <span className="text-slate-500">-</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
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
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-5 py-14 text-center">
                      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-white/5 bg-white/2">
                        <FaSearch className="h-5 w-5 text-slate-600" />
                      </div>
                      <p className="text-sm font-semibold text-white">
                        Tidak ada produk ditemukan
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Coba ubah kata kunci pencarian .
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
          title={editingId ? "Edit Produk" : "Tambah Produk"}
          subtitle="Isi konten produk sesuai yang akan ditampilkan di halaman publik"
          icon={FaBoxOpen}
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
                {editingId ? "Simpan Perubahan" : "Tambah Produk"}
              </Button>
            </>
          }
        >
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* ── Cover ── */}
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Cover Produk
              </label>
              <div className="flex items-center gap-4">
                <div className="flex h-24 w-36 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-white/10 bg-white/3">
                  {form.cover ? (
                    <img
                      src={
                        form.coverPreview
                          ? form.coverPreview
                          : form.cover?.startsWith?.("/uploads")
                            ? `${import.meta.env.VITE_ASSET_URL}${form.cover}`
                            : form.cover
                      }
                      alt="Preview Cover"
                      onClick={() =>
                        setPreviewImage(
                          form.coverPreview
                            ? form.coverPreview
                            : form.cover?.startsWith?.("/uploads")
                              ? `${import.meta.env.VITE_ASSET_URL}${form.cover}`
                              : form.cover,
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
                    {form.cover ? "Ganti Cover" : "Upload Cover"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleCoverChange}
                    />
                  </label>
                  {form.cover && (
                    <button
                      type="button"
                      onClick={() =>
                        setForm({ ...form, cover: "", coverPreview: "" })
                      }
                      className="text-xs font-semibold text-red-300 cursor-pointer hover:text-red-200"
                    >
                      Hapus Cover
                    </button>
                  )}
                  <p className="text-[10px] text-slate-500">
                    Pilih file gambar untuk pratinjau. (Aktivitas upload ke
                    server belum aktif.)
                  </p>
                </div>
              </div>
            </div>

            {/* ── Badge  ── */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Label Badge"
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
                placeholder="cth: Publikasi Resmi Nagari"
              />
            </div>

            {/* ── Judul + Subjudul ── */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Judul Produk"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="cth: Indeks Desa Tahun 2025"
                error={formErrors.title}
              />
              <Input
                label="Subjudul"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                placeholder="cth: Nagari Tanjuang Baringin"
              />
            </div>

            {/* ── Deskripsi ── */}
            <Textarea
              label="Deskripsi"
              required
              rows={5}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Tulis deskripsi produk..."
              error={formErrors.description}
            />

            {/* ── Poin unggulan ── */}
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Poin Unggulan
              </label>
              <div className="space-y-2">
                {form.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-1">
                      <Input
                        value={highlight}
                        onChange={(e) => updateHighlight(index, e.target.value)}
                        placeholder={`Poin ${index + 1} — cth: Alat ukur kemajuan nagari`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      disabled={form.highlights.length <= 1}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-red-300 transition-all hover:border-red-500/30 hover:bg-red-500/10 disabled:pointer-events-none disabled:opacity-30"
                      aria-label={`Hapus poin ${index + 1}`}
                    >
                      <FaMinusCircle className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addHighlight}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200"
              >
                <FaPlusCircle className="h-3.5 w-3.5 cursor-pointer" />
                Tambah Poin
              </button>
            </div>

            {/* ── Tombol + File ── */}
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                File Produk (Opsional)
              </label>

              <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-white/10 bg-white/3 px-4 py-4 text-center transition-all hover:border-amber-500/30 hover:bg-white/5">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Upload File
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    PDF, DOC, DOCX, XLS, XLSX • Maks. 10MB
                  </p>
                </div>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              {/* PREVIEW FILE */}
              {form.filePath && typeof form.filePath === "object" && (
                <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  {(() => {
                    const FileIcon = getFileIcon(form.filePath);

                    return (
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 text-amber-300">
                          <FileIcon className="h-6 w-6" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white">
                            {form.filePath.name}
                          </p>

                          <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-400">
                            <span>{formatFileSize(form.filePath.size)}</span>

                            <span>{form.filePath.type}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="mt-4 flex gap-2">
                    {form.filePath.type === "application/pdf" && (
                      <button
                        type="button"
                        onClick={() =>
                          window.open(
                            URL.createObjectURL(form.filePath),
                            "_blank",
                          )
                        }
                        className="rounded-lg cursor-pointer border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-500/20"
                      >
                        Preview PDF
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          filePath: "",
                        }))
                      }
                      className="rounded-lg cursor-pointer border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300 hover:bg-red-500/20"
                    >
                      Hapus File
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </Modal>

        {/* ── Konfirmasi hapus ── */}
        <ConfirmDialog
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
          loading={deleting}
          title="Hapus Produk ini?"
          message={`Produk "${deleteTarget ? truncate(deleteTarget.title, 60) : ""}" akan dihapus secara permanen.`}
        />

        {/* ── Preview Cover Image ── */}
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
