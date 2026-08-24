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
import CustomSelect from "../../components/admin/ui/customselected";
import Button from "../../components/admin/ui/Button";
import { galeriService } from "../../services/galeri";
import Pagination from "../../components/admin/ui/pagination";
import { getMediaUrl } from "../../utils/media";

const emptyForm = {
  judul: "",
  kategoriId: "",
  deskripsi: "",
  tanggalAcara: "",
  lokasi: "",
  gambar: null,
  imagePreview: "",
};

const isFileImage = (file) =>
  file && file.type && file.type.startsWith("image/");

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export default function AdminGaleri() {
  const [apiGaleri, setApiGaleri] = useState([]);
  const [kategoriOptions, setKategoriOptions] = useState([]);
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
        judul: item.judul ?? "",
        kategoriId: item.kategoriId ?? "",
        kategori: item.kategori?.slug ?? "",
        kategoriNama: item.kategori?.nama ?? "",
        deskripsi: item.deskripsi ?? "",
        gambar: item.gambar ?? "",
        tanggalAcara: item.tanggalAcara ?? "",
        lokasi: item.lokasi ?? "",
        source: "database",
      }));

      setApiGaleri(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadGaleri();

        const kategori = await galeriService.getKategoriGaleri();

        setKategoriOptions(kategori);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  /* ── Filter kategori + cari ── */
  const filteredGaleri = useMemo(() => {
    const q = search.trim().toLowerCase();
    return apiGaleri.filter((item) => {
      const matchKategori =
        filterKategori === "all" || item.kategori === filterKategori;
      const matchSearch =
        !q ||
        item.judul.toLowerCase().includes(q) ||
        item.deskripsi.toLowerCase().includes(q);
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
      judul: item.judul || "",
      kategoriId: item.kategoriId || "",
      deskripsi: item.deskripsi || "",
      tanggalAcara: item.tanggalAcara ? item.tanggalAcara.slice(0, 16) : "",
      lokasi: item.lokasi || "",
      gambar: item.gambar || "",
      imagePreview: getMediaUrl(item.gambar) || "",
    });
    setFormErrors({});
    setModalOpen(true);
  };

  /* ── Validasi ── */
  const validate = () => {
    const errors = {};
    if (!form.judul.trim()) errors.judul = "Judul galeri wajib diisi.";

    if (!form.kategoriId) errors.kategoriId = "Kategori wajib dipilih.";

    if (!form.deskripsi.trim()) errors.deskripsi = "Deskripsi wajib diisi.";

    if (!editingId && !form.gambar) errors.gambar = "Gambar wajib diunggah";
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

      formData.append("judul", form.judul.trim());
      formData.append("deskripsi", form.deskripsi.trim());
      formData.append("kategoriId", form.kategoriId);

      if (form.tanggalAcara) {
        formData.append("tanggalAcara", form.tanggalAcara);
      }

      if (form.lokasi) {
        formData.append("lokasi", form.lokasi.trim());
      }

      if (form.gambar instanceof File) {
        formData.append("gambar", form.gambar);
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
      gambar: file,
      imagePreview: objectUrl,
    }));

    toast.info("Gambar berhasil dimuat. Klik Simpan untuk menyimpan.", {
      title: "Gambar Siap",
    });
  };

  const removeImage = () => {
    setForm((prev) => ({ ...prev, gambar: "", imagePreview: "" }));
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
      <div className="space-y-4">
        {/* Search */}
        <div className="max-w-7xl">
          <div className="relative">
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
        </div>

        {/* Filter */}
        <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap">
          <button
            onClick={() => {
              setFilterKategori("all");
              setCurrentPage(1);
            }}
            className={`w-full md:w-auto cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
              filterKategori === "all"
                ? "border-amber-500/40 bg-amber-500/15 text-amber-300"
                : "border-white/10 bg-white/3 text-slate-400 hover:bg-white/6 hover:text-slate-300"
            }`}
          >
            Semua ({apiGaleri.length})
          </button>

          {kategoriOptions.map((cat) => {
            const count = apiGaleri.filter(
              (item) => item.kategori === cat.slug,
            ).length;

            return (
              <button
                key={cat.slug}
                onClick={() => {
                  setFilterKategori(cat.slug);
                  setCurrentPage(1);
                }}
                className={`w-full md:w-auto cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                  filterKategori === cat.slug
                    ? "border-amber-500/40 bg-amber-500/15 text-amber-300"
                    : "border-white/10 bg-white/3 text-slate-400 hover:bg-white/6 hover:text-slate-300"
                }`}
              >
                {cat.nama} ({count})
              </button>
            );
          })}
        </div>
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
                  {item.gambar ? (
                    <img
                      src={getMediaUrl(item.gambar)}
                      alt={item.judul || "Foto Galeri"}
                      onClick={() => setPreviewImage(getMediaUrl(item.gambar))}
                      className="h-full w-full cursor-zoom-in object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <FaImage className="h-8 w-8 text-slate-600" />
                    </div>
                  )}

                  {/* Badge kategori */}
                  {item.kategori && (
                    <span className="absolute left-2 top-2 rounded-md border border-white/10 bg-black/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/80 backdrop-blur-sm">
                      {item.kategoriNama || item.kategori || "-"}
                    </span>
                  )}
                </div>

                {/* Konten */}
                <div className="space-y-2 p-3">
                  <p className="truncate text-sm font-semibold text-white">
                    {item.judul || "-"}
                  </p>
                  <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">
                    {item.deskripsi || "-"}
                  </p>

                  {/* Aksi */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => openEdit(item)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition-all hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-300"
                      aria-label={`Edit ${item.judul || "-"}`}
                    >
                      <FaEdit className="h-3.5 w-3.5 cursor-pointer" />
                    </button>

                    <button
                      onClick={() => setDeleteTarget(item)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
                      aria-label={`Hapus ${item.judul || "-"}`}
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
                  {form.imagePreview || form.gambar ? (
                    <img
                      src={form.imagePreview || getMediaUrl(form.gambar)}
                      alt="Preview Gambar"
                      onClick={() =>
                        setPreviewImage(
                          form.imagePreview || getMediaUrl(form.gambar),
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
                    {form.gambar ? "Ganti Gambar" : "Upload Gambar"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                  {form.gambar && (
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
                  {formErrors.gambar && (
                    <p className="text-[11px] font-semibold text-red-400">
                      {formErrors.gambar}
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
                value={form.judul}
                onChange={(e) => setForm({ ...form, judul: e.target.value })}
                placeholder="cth: Gotong Royong Bersama"
                error={formErrors.judul}
              />

              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Kategori <span className="text-red-400">*</span>
                </label>
                <CustomSelect
                  value={form.kategoriId}
                  placeholder="Pilih kategori..."
                  error={!!formErrors.kategoriId}
                  options={kategoriOptions.map((item) => ({
                    value: item.id,
                    label: item.nama,
                  }))}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      kategoriId: value,
                    })
                  }
                />
                {formErrors.kategoriId && (
                  <p className="mt-1 text-[11px] font-semibold text-red-400">
                    {formErrors.kategoriId}
                  </p>
                )}
              </div>
            </div>

            {/* ── Lokasi + Tanggal Acara ── */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Lokasi"
                value={form.lokasi}
                onChange={(e) =>
                  setForm({
                    ...form,
                    lokasi: e.target.value,
                  })
                }
                placeholder="Contoh: Lapangan Nagari"
              />

              <Input
                label="Tanggal Acara"
                type="datetime-local"
                value={form.tanggalAcara}
                onChange={(e) =>
                  setForm({
                    ...form,
                    tanggalAcara: e.target.value,
                  })
                }
              />
            </div>

            {/* ── Deskripsi ── */}
            <Textarea
              label="Deskripsi"
              required
              rows={4}
              value={form.deskripsi}
              onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
              placeholder="Tulis deskripsi singkat tentang foto ini..."
              error={formErrors.deskripsi}
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
          message={`Foto "${deleteTarget ? truncate(deleteTarget.judul, 60) : ""}" akan dihapus secara permanen.`}
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
