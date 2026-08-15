import { useCallback, useEffect, useState } from "react";
import { faqService } from "../services/faq";

/**
 * Statistik FAQ asli dari database (data dummy tidak dihitung).
 * - totalCount   : jumlah seluruh FAQ yang masuk ke database.
 * - pendingCount : jumlah FAQ yang masih berstatus PENDING (belum dijawab).
 * Otomatis refresh saat event "faq:changed" di-dispatch
 * (misal setelah admin menjawab/menghapus FAQ atau pengaduan baru masuk).
 */
export function useFaqStats() {
  const [totalCount, setTotalCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await faqService.getAllFaqs();
        if (!active) return;
        setTotalCount(data.length);
        setPendingCount(
          data.filter((item) => item.status === "PENDING").length,
        );
      } catch (error) {
        if (!active) return;
        console.error("Gagal memuat statistik FAQ:", error);
        setTotalCount(0);
        setPendingCount(0);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    window.addEventListener("faq:changed", load);
    return () => {
      active = false;
      window.removeEventListener("faq:changed", load);
    };
  }, []);

  const refresh = useCallback(() => {
    window.dispatchEvent(new Event("faq:changed"));
  }, []);

  return { totalCount, pendingCount, loading, refresh };
}
