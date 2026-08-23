import { useEffect, useMemo, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaUserTie,
  FaImage,
  FaUserCircle,
} from "react-icons/fa";
import { useToast } from "../../components/admin/ui/useToast";
import { strukturLevels } from "../../data/strukturSeed";
import Modal from "../../components/admin/ui/Modal";
import ConfirmDialog from "../../components/admin/ui/ConfirmDialog";
import { Input } from "../../components/admin/ui/FormControls";
import Button from "../../components/admin/ui/Button";
import { aparaturService } from "../../services/aparatur";
import CustomSelect from "../../components/admin/ui/customselected";

const emptyForm = {
  nama: "",
  jabatan: "",
  level: "pimpinan",
  foto: null,
  fotoPreview: "",
};

const levelColors = {
  pimpinan: "border-amber-500/30 text-amber-300",
  kasi: "border-sky-500/30 text-sky-300",
  kaur: "border-violet-500/30 text-violet-300",
  staf: "border-emerald-500/30 text-emerald-300",
  jorong: "border-orange-500/30 text-orange-300",
  petugas: "border-rose-500/30 text-rose-300",
};

const isFileImage = (file) =>
  file && file.type && file.type.startsWith("image/");

export default function AdminStruktur() {
  const toast = useToast();

  const [struktur, setStruktur] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadStruktur = async () => {
    const data = await aparaturService.getAllAparatur();

    setStruktur(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        await loadStruktur();
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const [levelFilter, setLevelFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const levelSelectOptions = strukturLevels.map((level) => level.label);

  /* ── Filter ── */
  const filteredStruktur = useMemo(() => {
    if (levelFilter === "all") return struktur;
    return struktur.filter((item) => item.level === levelFilter);
  }, [struktur, levelFilter]);

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
      nama: item.nama || "",
      jabatan: item.jabatan || "",
      level: item.level || "pimpinan",
      foto: null,
      fotoPreview: item.foto
        ? `${import.meta.env.VITE_ASSET_URL}${item.foto}`
        : "",
    });
    setFormErrors({});
    setModalOpen(true);
  };

  /* ── Validasi ── */
  const validate = () => {
    const errors = {};
    if (!form.jabatan.trim()) errors.jabatan = "Jabatan wajib diisi.";
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

      formData.append("nama", form.nama);
      formData.append("jabatan", form.jabatan);
      formData.append("level", form.level);

      if (form.foto instanceof File) {
        formData.append("foto", form.foto);
      }

      if (editingId) {
        await aparaturService.updateAparatur(editingId, formData);

        toast.success("Data berhasil diperbarui");
      } else {
        await aparaturService.createAparatur(formData);

        toast.success("Data berhasil ditambahkan");
      }

      await loadStruktur();

      setModalOpen(false);
    } catch (error) {
      toast.error(error.message);
    }

    setModalOpen(false);
  };

  /* ── Hapus ── */
  const handleConfirmDelete = () => {
    setDeleting(true);
    setTimeout(async () => {
      await aparaturService.deleteAparatur(deleteTarget.id);
      await loadStruktur();
      toast.success(`${deleteTarget.nama || deleteTarget.jabatan} dihapus.`, {
        title: "Dihapus",
      });
      setDeleteTarget(null);
      setDeleting(false);
    }, 400);
  };

  /* ── Upload foto → preview via URL.createObjectURL ── */
  const handleFileChange = (e) => {
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
      foto: file,
      fotoPreview: objectUrl,
    }));
    toast.info("Foto berhasil dimuat. Klik Simpan untuk menyimpan.", {
      title: "Foto Siap",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-slate-400">Memuat data aparatur...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Kelola Struktur
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            {struktur.length} perangkat nagari tersimpan. Data dummy tetap
            dipertahankan.
          </p>
        </div>
        <Button icon={FaPlus} className="cursor-pointer" onClick={openAdd}>
          Tambah Perangkat
        </Button>
      </div>

      {/* ── Filter level ── */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setLevelFilter("all")}
          className={`inline-flex rounded-full cursor-pointer border px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
            levelFilter === "all"
              ? "border-amber-500/40 bg-amber-500/15 text-amber-300"
              : "border-white/10 bg-white/3 text-slate-400 hover:bg-white/6 hover:text-slate-300"
          }`}
        >
          Semua ({struktur.length})
        </button>
        {strukturLevels.map((level) => {
          const count = struktur.filter((i) => i.level === level.id).length;
          return (
            <button
              key={level.id}
              onClick={() => setLevelFilter(level.id)}
              className={`inline-flex cursor-pointer rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
                levelFilter === level.id
                  ? levelColors[level.id]
                  : "border-white/10 bg-white/3 text-slate-400 hover:bg-white/6 hover:text-slate-300"
              }`}
            >
              {level.label} ({count})
            </button>
          );
        })}
      </div>

      {/* ── Grid kartu ── */}
      {filteredStruktur.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredStruktur.map((item) => (
            <PersonAdminCard
              key={item.id}
              item={item}
              onEdit={() => openEdit(item)}
              onDelete={() => setDeleteTarget(item)}
              onPreview={setPreviewImage}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/5 bg-white/2 py-14 text-center">
          <p className="text-sm font-semibold text-white">
            Tidak ada perangkat pada level ini.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Pilih level lain atau tambah data baru.
          </p>
        </div>
      )}

      {/* ── Modal tambah/edit ── */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Edit Perangkat" : "Tambah Perangkat"}
        icon={FaUserTie}
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
              className="border-amber-500/30 cursor-pointer bg-amber-500/15 text-amber-300 hover:bg-amber-500/25"
            >
              {editingId ? "Simpan Perubahan" : "Tambah Perangkat"}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* ── Foto ── */}
          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Foto
            </label>
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-white/10 bg-white/3">
                {form.fotoPreview ? (
                  <img
                    src={form.fotoPreview}
                    alt="Preview"
                    onClick={() => setPreviewImage(form.fotoPreview)}
                    className="h-full w-full cursor-zoom-in object-cover transition hover:scale-105"
                  />
                ) : (
                  <FaUserCircle className="h-8 w-8 text-slate-600" />
                )}
              </div>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/4 px-3.5 py-2 text-xs font-semibold text-slate-300 transition-all hover:bg-white/10 hover:text-white">
                <FaImage className="h-3.5 w-3.5" />
                {form.foto ? "Ganti Foto" : "Upload Foto"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {form.foto && (
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      foto: null,
                      fotoPreview: "",
                    })
                  }
                  className="text-xs font-semibold text-white cursor-pointer border border-white/10 bg-red-500/20 px-3.5 py-2 rounded-lg transition-all hover:bg-red-500/30 hover:text-white"
                >
                  Hapus Foto
                </button>
              )}
            </div>
            <p className="mt-1.5 text-[10px] text-slate-500">
              Pilih file gambar untuk pratinjau. (Aktivitas upload ke server
              belum aktif.)
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Nama Lengkap"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              placeholder="cth: RONALD YULMASRI"
            />
            <Input
              label="Jabatan"
              required
              value={form.jabatan}
              onChange={(e) => setForm({ ...form, jabatan: e.target.value })}
              placeholder="cth: Wali Nagari"
              error={formErrors.jabatan}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Level
            </label>

            <CustomSelect
              value={
                strukturLevels.find((item) => item.id === form.level)?.label
              }
              placeholder="Pilih Level"
              options={levelSelectOptions}
              onChange={(selectedLabel) => {
                const selected = strukturLevels.find(
                  (item) => item.label === selectedLabel,
                );

                if (selected) {
                  setForm((prev) => ({
                    ...prev,
                    level: selected.id,
                  }));
                }
              }}
            />
          </div>
        </form>
      </Modal>

      {/* ── Preview foto ── */}
      {previewImage && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-h-[80vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-3 -right-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition hover:scale-110"
            >
              ✕
            </button>

            <img
              src={previewImage}
              alt="Preview"
              className="max-h-[85vh] max-w-[90vw] rounded-2xl border border-white/10 shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* ── Konfirmasi hapus ── */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        loading={deleting}
        title="Hapus Perangkat ini?"
        message={
          deleteTarget
            ? `${deleteTarget.nama || "(tanpa nama)"} — ${deleteTarget.jabatan} akan dihapus secara permanen.`
            : ""
        }
      />
    </div>
  );
}

/* ─── Kartu person admin ─── */
function PersonAdminCard({ item, onEdit, onDelete, onPreview }) {
  const levelStyle = levelColors[item.level] || levelColors.pimpinan;

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/5 bg-white/2 transition-all hover:-translate-y-0.5 hover:border-white/10 hover:shadow-lg hover:shadow-black/30">
      {/* Foto */}
      <div className="relative h-36 overflow-hidden border-b border-white/5 bg-white/3">
        {item.foto ? (
          <img
            src={`${import.meta.env.VITE_ASSET_URL}${item.foto}`}
            alt={item.nama || item.jabatan}
            onClick={() =>
              onPreview(`${import.meta.env.VITE_ASSET_URL}${item.foto}`)
            }
            className="h-full w-full cursor-zoom-in object-cover transition duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FaUserCircle className="h-12 w-12 text-slate-700" />
          </div>
        )}

        {/* Badge level */}
        <span
          className={`absolute top-3 left-3 inline-flex rounded-full border bg-emerald-950/80 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm ${levelStyle}`}
        >
          {item.level}
        </span>

        {/* Aksi cepat */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          <button
            onClick={onEdit}
            onDoubleClick={onPreview}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-emerald-950/80 text-slate-300 backdrop-blur-sm transition-all hover:border-amber-500/40 hover:text-amber-300"
            aria-label="Edit"
          >
            <FaEdit className="h-3 w-3 cursor-pointer" />
          </button>
          <button
            onClick={onDelete}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-emerald-950/80 text-slate-300 backdrop-blur-sm transition-all hover:border-red-500/40 hover:text-red-300"
            aria-label="Hapus"
          >
            <FaTrashAlt className="h-3 w-3 cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="truncate text-sm font-bold text-white">
          {item.nama || (
            <span className="text-xs font-normal italic text-slate-600">
              — nama belum diisi —
            </span>
          )}
        </p>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-amber-400/80">
          {item.jabatan}
        </p>
      </div>
    </div>
  );
}
