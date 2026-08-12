import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Reset scroll position ke atas setiap kali route berubah.
 * Link ber-hash (mis. /home#visi-misi) dilewati selama elemen target-nya
 * ada, supaya penanganan scroll-to-section di halaman tetap berjalan.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      if (document.getElementById(id)) return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
