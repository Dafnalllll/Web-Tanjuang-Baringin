import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./loading";

/**
 * Menampilkan layar loading (animated) setiap kali route berubah.
 * Durasi di-otak-atik agar terasa halus, tidak terlalu lama.
 */
export default function RouteTransition({ children, duration = 1200 }) {
  const { pathname } = useLocation();
  const [showLoader, setShowLoader] = useState(true);
  const isFirstRender = useRef(true);

  /* ── Tampilkan loader saat navigasi berpindah ── */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setShowLoader(true);
    const timeoutId = setTimeout(() => setShowLoader(false), duration);
    return () => clearTimeout(timeoutId);
  }, [pathname, duration]);

  /* ── Sembunyikan loader setelah render pertama ── */
  useEffect(() => {
    const timeoutId = setTimeout(() => setShowLoader(false), duration);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AnimatePresence>
        {showLoader && <LoadingScreen />}
      </AnimatePresence>
      {children}
    </>
  );
}
