import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import tanjuangPhoto from "../assets/tanjuangbaringin.webp";

export default function TanjuangBaringin() {
  const navigate = useNavigate();

  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const imgRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    // Entrance Animation
    tl.fromTo(
      containerRef.current,
      {
        opacity: 0,
        scale: 0.6,
        y: 60,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
      },
    )
      .fromTo(
        ring1Ref.current,
        {
          opacity: 0,
          rotate: -180,
          scale: 0.5,
        },
        {
          opacity: 1,
          rotate: 45,
          scale: 1,
          duration: 0.8,
        },
        "-=0.6",
      )
      .fromTo(
        ring2Ref.current,
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
        },
        "-=0.5",
      )
      .fromTo(
        imgRef.current,
        {
          opacity: 0,
          scale: 0.4,
          rotate: -15,
        },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.5",
      )
      .fromTo(
        hintRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.2",
      );

    // Floating Logo
    const floatAnim = gsap.to(cardRef.current, {
      y: -10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      paused: true,
    });

    // Elegant Hint
    const hintAnim = gsap.to(hintRef.current, {
      y: -5,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const handleMouseEnter = () => {
      floatAnim.play();

      gsap.to(imgRef.current, {
        scale: 1.15,
        duration: 0.4,
        ease: "back.out(1.7)",
      });

      gsap.to(ring1Ref.current, {
        borderColor: "#22c55e",
        opacity: 0.8,
        duration: 0.4,
      });

      gsap.to(ring2Ref.current, {
        borderColor: "#4ade80",
        opacity: 1,
        duration: 0.4,
      });

      gsap.to(hintRef.current, {
        opacity: 1,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      floatAnim.reverse();

      gsap.to(imgRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
      });

      gsap.to(ring1Ref.current, {
        borderColor: "#fbbf24",
        opacity: 0.55,
        duration: 0.4,
      });

      gsap.to(ring2Ref.current, {
        borderColor: "#fde68a",
        opacity: 0.25,
        duration: 0.4,
      });
    };

    const el = cardRef.current;

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    // Rotating Ring
    gsap.to(ring1Ref.current, {
      rotate: 405,
      duration: 10,
      repeat: -1,
      ease: "none",
      delay: 1.5,
    });

    return () => {
      tl.kill();
      floatAnim.kill();
      hintAnim.kill();

      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-emerald-950 overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      {/* ───────────────────────────────────────────── */}
      {/* Background Texture */}
      {/* ───────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fcd34d' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* ───────────────────────────────────────────── */}
      {/* Decorative Blobs */}
      {/* ───────────────────────────────────────────── */}
      <div className="pointer-events-none absolute -left-32 top-20 h-112 w-md rounded-full bg-amber-400/10 blur-[140px]" />

      <div className="pointer-events-none absolute -right-40 bottom-32 h-96 w-[24rem] rounded-full bg-emerald-400/10 blur-[120px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-400/10 blur-[100px]" />

      {/* ───────────────────────────────────────────── */}
      {/* Main Content */}
      {/* ───────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-[320px] px-4 py-6 opacity-0 sm:max-w-md sm:px-10 sm:py-10 lg:px-16 lg:py-14"
      >
        {/* Logo */}
        <div
          ref={cardRef}
          className="group relative mx-auto w-fit cursor-pointer"
        >
          {/* Ring 1 */}
          <div
            ref={ring1Ref}
            className="absolute -inset-3 rounded-full border-2 border-dashed border-amber-300/60"
          />

          {/* Ring 2 */}
          <div
            ref={ring2Ref}
            className="absolute -inset-5 rounded-full border border-amber-200/25"
          />

          <button
            type="button"
            onClick={() => navigate("/home")}
            aria-label="Masuk ke halaman utama"
            className="relative block rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
          >
            <img
              ref={imgRef}
              src={tanjuangPhoto}
              alt="Lambang Nagari Tanjuang Baringin"
              className="h-36 w-36 rounded-full object-cover cursor-pointer shadow-2xl ring-4 ring-[#1e3a5f]/10 transition-shadow duration-300 sm:h-48 sm:w-48"
            />
          </button>
        </div>

        {/* Elegant Instruction */}
        <div ref={hintRef} className="mt-10 text-center opacity-0">
          <p className="text-sm font-medium text-amber-100/85">
            Klik Lambang Nagari
          </p>

          <p className="mt-1 text-xs tracking-[0.3em] text-amber-300/70 uppercase">
            untuk memasuki website
          </p>
        </div>
      </div>
    </div>
  );
}
