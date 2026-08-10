import { useMemo, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaUserTie,
  FaWhatsapp,
  FaImage,
  FaUserCircle,
} from "react-icons/fa";
import { useAdminData } from "../../context/useAdminData";
import { useToast } from "../../components/admin/ui/useToast";
import { strukturLevels } from "../../data/strukturSeed";
import Modal from "../../components/admin/ui/Modal";
import ConfirmDialog from "../../components/admin/ui/ConfirmDialog";
import { Input, Select } from "../../components/admin/ui/FormControls";
import Button from "../../components/admin/ui/Button";

const emptyForm = {
  nama: "",
  jabatan: "",
  level: "pimpinan",
  whatsapp: "",
  foto: "",
  fotoPositionY: "center",
};

const levelColors = {
  pimpinan: "border-amber-500/30 text-amber-300",
  kasi: "border-sky-500/30 text-sky-300",
  kaur: "border-violet-500/30 text-violet-300",
  staf: "border-emerald-500/30 text-emerald-300",
  jorong: "border-orange-500/30 text-orange-300",
  petugas: "border-rose-500/30 text-rose-300",
};

const isFileImage = (file) => file && file.type && file.type.startsWith("image/");

export default function AdminStruktur() {
  const { struktur, addStruktur, updateStruktur, deleteStruktur } = useAdminData();
  const toast = useToast();

  const [levelFilter, setLevelFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

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
      whatsapp: item.whatsapp || "",
      foto: item.foto || "",
      fotoPositionY: item.fotoPositionY || "center",
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      toast.error("Periksa kembali form yang belum diisi.", { title: "Validasi Gagal" });
      return;
    }

    const data = {
      nama: form.nama.trim(),
      jabatan: form.jabatan.trim(),
      level: form.level,
      whatsapp: form.whatsapp.trim(),
      foto: form.foto,
      fotoPositionY: form.fotoPositionY || "center",
    };

    if (editingId) {
      updateStruktur(editingId, data);
      toast.success(`${data.nama || data.jabatan} berhasil diperbarui.`, { title: "Diperbarui" });
    } else {
      addStruktur(data);
      toast.success(`${data.nama || data.jabatan} berhasil ditambahkan.`, { title: "Ditambahkan" });
    }

    setModalOpen(false);
  };

  /* ── Hapus ── */
  const handleConfirmDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      deleteStruktur(deleteTarget.id);
      toast.success(`${deleteTarget.nama || deleteTarget.jabatan} dihapus.`, { title: "Dihapus" });
      setDeleteTarget(null);
      setDeleting(false);
    }, 400);
  };

  /* ── Upload foto → preview via URL.createObjectURL ── */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isFileImage(file)) {
      toast.error("File harus berupa gambar (jpg, png, webp).", { title: "File Tidak Valid" });
      e.target.value = "";
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, foto: objectUrl }));
    toast.info("Foto berhasil dimuat. Klik Simpan untuk menyimpan.", { title: "Foto Siap" });
  };

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">Kelola Struktur</h1>
          <p className="mt-1 text-xs text-slate-400">
            {struktur.length} perangkat nagari tersimpan. Data dummy tetap dipertahankan.
          </p>
        </div>
        <Button icon={FaPlus} onClick={openAdd}>
          Tambah Perangkat
        </Button>
      </div>

      {/* ── Filter level ── */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setLevelFilter("all")}
          className={`inline-flex rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
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
              className={`inline-flex rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
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
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/5 bg-white/2 py-14 text-center">
          <p className="text-sm font-semibold text-white">Tidak ada perangkat pada level ini.</p>
          <p className="mt-1 text-xs text-slate-500">Pilih level lain atau tambah data baru.</p>
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
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              icon={editingId ? FaEdit : FaPlus}
              className="border-amber-500/30 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25"
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
                {form.foto ? (
                  <img src={form.foto} alt="Preview" className="h-full w-full object-cover" />
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
                  onClick={() => setForm({ ...form, foto: "" })}
                  className="text-xs font-semibold text-red-300 hover:text-red-200"
                >
                  Hapus Foto
                </button>
              )}
            </div>
            <p className="mt-1.5 text-[10px] text-slate-500">
              Pilih file gambar untuk pratinjau. (Aktivitas upload ke server belum aktif.)
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select
              label="Level"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
            >
              {strukturLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.label}
                </option>
              ))}
            </Select>
            <Input
              label="Nomor WhatsApp"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              placeholder="cth: +6281234567890"
            />
          </div>

          <Input
            label="Posisi Foto (CSS object-position)"
            value={form.fotoPositionY}
            onChange={(e) => setForm({ ...form, fotoPositionY: e.target.value })}
            placeholder="cth: center, -20px, -30px"
          />
        </form>
      </Modal>

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
function PersonAdminCard({ item, onEdit, onDelete }) {
  const levelStyle = levelColors[item.level] || levelColors.pimpinan;

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/5 bg-white/2 transition-all hover:-translate-y-0.5 hover:border-white/10 hover:shadow-lg hover:shadow-black/30">
      {/* Foto */}
      <div className="relative h-36 overflow-hidden border-b border-white/5 bg-white/3">
        {item.foto ? (
          <img
            src={item.foto}
            alt={item.nama || item.jabatan}
            className="h-full w-full object-cover"
            style={{ objectPosition: `center ${item.fotoPositionY || "center"}` }}
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
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-emerald-950/80 text-slate-300 backdrop-blur-sm transition-all hover:border-amber-500/40 hover:text-amber-300"
            aria-label="Edit"
          >
            <FaEdit className="h-3 w-3" />
          </button>
          <button
            onClick={onDelete}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-emerald-950/80 text-slate-300 backdrop-blur-sm transition-all hover:border-red-500/40 hover:text-red-300"
            aria-label="Hapus"
          >
            <FaTrashAlt className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="truncate text-sm font-bold text-white">
          {item.nama || <span className="text-xs font-normal italic text-slate-600">— nama belum diisi —</span>}
        </p>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-amber-400/80">
          {item.jabatan}
        </p>
        <div className="mt-3 flex items-center gap-1.5 border-t border-white/5 pt-3">
          {item.whatsapp ? (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400/80">
              <FaWhatsapp className="h-3 w-3" />
              {item.whatsapp}
            </span>
          ) : (
            <span className="text-[10px] italic text-slate-600">Nomor belum diisi</span>
          )}
        </div>
      </div>
    </div>
  );
}
