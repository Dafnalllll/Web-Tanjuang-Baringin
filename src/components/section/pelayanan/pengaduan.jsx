import { useRef, useState } from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaFileUpload,
  FaCheckCircle,
  FaBullhorn,
  FaRegClock,
  FaEnvelope,
  FaHome,
} from "react-icons/fa";
import { MdFeedback } from "react-icons/md";

import SectionHeader from "../lembaga/shared/sectionheader";
import useSectionAnimation from "../lembaga/shared/useSectionanimation";
import CustomSelect from "../../admin/ui/customselected";
import { faqService } from "../../../services/faq";

/* ─── Data Jenis Pengaduan ─── */
const kategoriPengaduan = [
  "Umum",
  "Administrasi",
  "Pelayanan",
  "Pemerintahan",
  "Dokumen",
];

const alurPengaduan = [
  {
    step: "01",
    title: "Isi Form",
    desc: "Lengkapi data diri dan rincian pengaduan pada formulir.",
  },
  {
    step: "02",
    title: "Verifikasi",
    desc: "Perangkat nagari memverifikasi kelengkapan data pengaduan.",
  },
  {
    step: "03",
    title: "Tindak Lanjut",
    desc: "Pengaduan diteruskan ke bidang terkait untuk ditindaklanjuti.",
  },
  {
    step: "04",
    title: "Penyelesaian",
    desc: "Hasil penanganan disampaikan maksimal 7 hari kerja.",
  },
];

/* ─── Input Group ─── */
function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">
        {label}
        {required && <span className="text-amber-400">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-red-400">
          <FaBullhorn className="h-2.5 w-2.5" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (hasError) =>
  `w-full rounded-xl border bg-white/4 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:bg-white/6 focus:shadow-lg ${
    hasError
      ? "border-red-500/40 focus:border-red-500/50 focus:shadow-red-500/5"
      : "border-white/10 focus:border-amber-500/30 focus:shadow-amber-500/5"
  }`;

/* ─── Form Field Components ─── */
function withIcon(Icon) {
  return function IconicInput(props) {
    const { hasError, ...rest } = props;
    return (
      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
        <input {...rest} className={`${inputClass(hasError)} pl-11`} />
      </div>
    );
  };
}

const NameInput = withIcon(FaUser);
const PhoneInput = withIcon(FaPhoneAlt);
const AddressInput = withIcon(FaMapMarkerAlt);

/* ─── Sidebar Info Card ─── */
function InfoSidebar() {
  return (
    <aside className="flex flex-col gap-6">
      {/* Alur Pengaduan */}
      <div className="border-2 border-stone-700/70 bg-stone-900/60 p-6">
        <h4 className="mb-5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-amber-400">
          <FaRegClock className="h-3.5 w-3.5" />
          Alur Pengaduan
        </h4>

        <ol className="space-y-5">
          {alurPengaduan.map((item) => (
            <li key={item.step} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-amber-600/30 bg-amber-900/20 text-xs font-black text-amber-400">
                {item.step}
              </span>
              <div>
                <p className="text-sm font-bold text-white">{item.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-stone-400">
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Kontak */}
      <div className="border-2 border-stone-700/70 bg-stone-900/60 p-6">
        <h4 className="mb-5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-amber-400">
          <FaBullhorn className="h-3.5 w-3.5" />
          Saluran Lain
        </h4>

        <ul className="space-y-4 text-sm">
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-white/10 bg-white/4 text-amber-400/80">
              <FaHome className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="font-bold text-white">Kantor Wali Nagari</p>
              <p className="mt-0.5 text-xs leading-relaxed text-stone-400">
                Kantor Wali Nagari Tanjuang Baringin, Senin–Jumat 08.00–16.00
                WIB
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-white/10 bg-white/4 text-amber-400/80">
              <FaPhoneAlt className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="font-bold text-white">Telepon / WhatsApp</p>
              <p className="mt-0.5 text-xs leading-relaxed text-stone-400">
                +6285323441781
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-white/10 bg-white/4 text-amber-400/80">
              <FaEnvelope className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="font-bold text-white">Email</p>
              <p className="mt-0.5 text-xs leading-relaxed text-stone-400">
                nagaritanjuangbaringin@gmail.com
              </p>
            </div>
          </li>
        </ul>

        <div className="mt-5 border-t border-white/5 pt-4">
          <p className="text-[11px] leading-relaxed text-stone-500">
            Setiap pengaduan akan ditindaklanjuti maksimal{" "}
            <span className="font-bold text-amber-400/80">7 hari kerja</span>{" "}
            setelah diterima.
          </p>
        </div>
      </div>
    </aside>
  );
}

/* ─── Success Panel ─── */
function SuccessPanel({ onReset }) {
  return (
    <div data-sec className="mx-auto max-w-2xl pt-4">
      <div className="flex flex-col items-center border-2 border-amber-600/30 bg-stone-900/60 px-6 py-14 text-center sm:px-12">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10">
          <FaCheckCircle className="h-8 w-8 text-amber-400" />
        </div>

        <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl">
          Pengaduan Berhasil Dikirim
        </h3>

        <div className="mx-auto my-5 h-0.5 w-16 bg-amber-600/30" />

        <p className="max-w-md text-sm leading-relaxed text-stone-400">
          Terima kasih atas partisipasi Anda. Pengaduan Anda telah diterima dan
          akan ditindaklanjuti oleh perangkat nagari maksimal 7 hari kerja. Jika
          diperlukan, kami akan menghubungi Anda melalui nomor telepon yang
          telah dilampirkan.
        </p>

        <button
          onClick={onReset}
          className="mt-8 inline-flex items-center gap-2 border border-amber-600/40 bg-amber-900/20 px-6 py-3 text-xs font-bold uppercase tracking-wider text-amber-400 transition-all duration-300 hover:bg-amber-800/40 hover:text-amber-300 cursor-pointer"
        >
          <FaPaperPlane className="h-3.5 w-3.5" />
          Kirim Pengaduan Baru
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
    MAIN COMPONENT
   ════════════════════════════════════════ */
export default function Pengaduan() {
  const sectionRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    telepon: "",
    alamat: "",
    kategori: "",
    isi: "",
    lampiran: null,
  });

  const [errors, setErrors] = useState({});

  useSectionAnimation(sectionRef);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Batasi NIK hanya angka, maks 16 digit
    const nextValue = value;

    setForm((prev) => ({ ...prev, [name]: nextValue }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, lampiran: file }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.nama.trim()) {
      nextErrors.nama = "Nama lengkap wajib diisi.";
    }

    if (!form.telepon.trim()) {
      nextErrors.telepon = "Nomor telepon wajib diisi.";
    } else if (!/^[0-9+\-\s]{9,15}$/.test(form.telepon.trim())) {
      nextErrors.telepon = "Nomor telepon tidak valid.";
    }

    if (!form.alamat.trim()) {
      nextErrors.alamat = "Alamat / jorong wajib diisi.";
    }

    if (!form.kategori) {
      nextErrors.kategori = "Pilih kategori pengaduan.";
    }

    if (!form.isi.trim()) {
      nextErrors.isi = "Isi pengaduan wajib diisi.";
    } else if (form.isi.trim().length < 20) {
      nextErrors.isi = "Isi pengaduan minimal 20 karakter agar jelas.";
    }

    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", form.nama.trim());
      formData.append("phone", form.telepon.trim());
      formData.append("address", form.alamat.trim());
      formData.append("category", form.kategori);
      formData.append("question", form.isi.trim());

      if (form.lampiran) {
        formData.append("file", form.lampiran);
      }

      await faqService.createFaq(formData);

      window.dispatchEvent(new Event("faq:changed"));

      setIsSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(error);

      alert(error.message || "Gagal mengirim pengaduan");
    }
  };

  const handleReset = () => {
    setForm({
      nama: "",
      telepon: "",
      alamat: "",
      kategori: "",
      isi: "",
      lampiran: null,
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section ref={sectionRef} className="relative z-10">
      <div data-sec>
        <SectionHeader
          icon={MdFeedback}
          title="Form Pengaduan"
          subtitle="Sampaikan keluhan, aspirasi, atau saran Anda kepada Pemerintah Nagari Tanjuang Baringin. Seluruh pengaduan akan ditindaklanjuti oleh perangkat nagari."
        />

        {isSubmitted ? (
          <SuccessPanel onReset={handleReset} />
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* ── Form ── */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="border-2 border-stone-700/70 bg-stone-900/60 p-6 sm:p-8 lg:col-span-2"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Nama Lengkap" required error={errors.nama}>
                  <NameInput
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    placeholder="Nama sesuai KTP"
                    hasError={Boolean(errors.nama)}
                  />
                </Field>

                <Field label="No. Telepon / WA" required error={errors.telepon}>
                  <PhoneInput
                    name="telepon"
                    inputMode="tel"
                    value={form.telepon}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    hasError={Boolean(errors.telepon)}
                  />
                </Field>

                <Field label="Alamat / Jorong" required error={errors.alamat}>
                  <AddressInput
                    name="alamat"
                    value={form.alamat}
                    onChange={handleChange}
                    placeholder="Nama jorong & RT"
                    hasError={Boolean(errors.alamat)}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field
                    label="Kategori Pengaduan"
                    required
                    error={errors.kategori}
                  >
                    <div className="relative">
                      <CustomSelect
                        options={kategoriPengaduan}
                        value={form.kategori}
                        placeholder="Pilih kategori pengaduan..."
                        error={Boolean(errors.kategori)}
                        onChange={(selected) => {
                          setForm((prev) => ({
                            ...prev,
                            kategori: selected,
                          }));

                          setErrors((prev) => ({
                            ...prev,
                            kategori: undefined,
                          }));
                        }}
                      />
                    </div>
                  </Field>
                </div>

                <div className="sm:col-span-2">
                  <Field label="Isi Pengaduan" required error={errors.isi}>
                    <textarea
                      name="isi"
                      rows={6}
                      value={form.isi}
                      onChange={handleChange}
                      placeholder="Uraikan keluhan atau aspirasi Anda secara jelas dan lengkap..."
                      className={`${inputClass(Boolean(errors.isi))} resize-y`}
                    />
                    <p className="mt-1.5 text-right text-[11px] text-stone-500">
                      {form.isi.length} karakter
                    </p>
                  </Field>
                </div>

                <div className="sm:col-span-2">
                  <Field label="Lampiran (opsional)">
                    <label className="group flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-white/15 bg-white/2 px-4 py-4 transition-all duration-200 hover:border-amber-500/30 hover:bg-white/4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 bg-white/4 text-amber-400/80 transition-colors group-hover:border-amber-500/30 group-hover:text-amber-300">
                        <FaFileUpload className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        {form.lampiran ? (
                          <>
                            <span className="block truncate text-sm font-semibold text-white">
                              {form.lampiran.name}
                            </span>
                            <span className="mt-0.5 block text-[11px] text-stone-500">
                              {Math.round(form.lampiran.size / 1024)} KB —{" "}
                              {(form.lampiran.type || "file").split("/")[1] ||
                                "file"}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="block text-sm font-semibold text-slate-300">
                              Klik untuk mengunggah bukti pendukung
                            </span>
                            <span className="mt-0.5 block text-[11px] text-stone-500">
                              Format gambar, PDF, atau dokumen. Maksimal 5 MB.
                            </span>
                          </>
                        )}
                      </span>
                      <span className="shrink-0 border border-white/10 bg-white/4 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors group-hover:border-amber-500/30 group-hover:text-amber-300">
                        {form.lampiran ? "Ganti" : "Pilih File"}
                      </span>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                        onChange={handleFile}
                        className="hidden"
                      />
                    </label>
                  </Field>
                </div>
              </div>

              {/* ── Submit ── */}
              <div className="mt-7 flex flex-col gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11px] leading-relaxed text-stone-500">
                  Data Anda dijamin kerahasiaannya dan hanya digunakan untuk
                  menindaklanjuti pengaduan ini.
                </p>

                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center justify-center gap-2 border-2 border-amber-600/50 bg-amber-600/15 px-7 py-3.5 text-xs font-black uppercase tracking-widest text-amber-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-600/25 hover:text-amber-200 hover:shadow-lg hover:shadow-amber-900/30 cursor-pointer"
                >
                  <FaPaperPlane className="h-3.5 w-3.5" />
                  Kirim Pengaduan
                </button>
              </div>
            </form>

            {/* ── Sidebar ── */}
            <InfoSidebar />
          </div>
        )}
      </div>
    </section>
  );
}
