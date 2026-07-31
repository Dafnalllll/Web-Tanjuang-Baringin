import { useState, useEffect } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-8 right-8 z-50
        w-11 h-11 flex items-center justify-center
        bg-emerald-800/40 backdrop-blur-sm
        text-amber-400/70
        border border-amber-500/15
        rounded-lg
        shadow-sm shadow-black/20
        hover:bg-emerald-700/50 hover:border-amber-400/30
        hover:text-amber-300/90
        hover:shadow-md hover:shadow-black/30
        active:scale-90 active:bg-emerald-700/60
        transition-all duration-350 ease-out
        cursor-pointer
        ${isVisible ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-4"}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
