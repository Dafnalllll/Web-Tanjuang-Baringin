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

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Entrance animation
    tl.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.6, y: 60 },
      { opacity: 1, scale: 1, y: 0, duration: 1 },
    )
      .fromTo(
        ring1Ref.current,
        { opacity: 0, rotate: -180, scale: 0.5 },
        { opacity: 1, rotate: 45, scale: 1, duration: 0.8 },
        "-=0.6",
      )
      .fromTo(
        ring2Ref.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.6 },
        "-=0.5",
      )
      .fromTo(
        imgRef.current,
        { opacity: 0, scale: 0.4, rotate: -15 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.5",
      );

    // Hover animations: float + scale
    const floatAnim = gsap.to(cardRef.current, {
      y: -10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      paused: true,
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
    };

    const handleMouseLeave = () => {
      floatAnim.reverse();
      gsap.to(imgRef.current, { scale: 1, duration: 0.4, ease: "power3.out" });
      gsap.to(ring1Ref.current, {
        borderColor: "#1e3a5f",
        opacity: 0.2,
        duration: 0.4,
      });
      gsap.to(ring2Ref.current, {
        borderColor: "#4ade80",
        opacity: 0.1,
        duration: 0.4,
      });
    };

    const el = cardRef.current;
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    // Delayed ring spin loop
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
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      {/* Main card */}
      <div
        ref={containerRef}
        className="opacity-0 group relative z-10 w-full max-w-[320px] cursor-pointer px-4 py-6 sm:max-w-90 sm:px-10 sm:py-10 lg:px-16 lg:py-14"
      >
        {/* Image container with ring */}
        <div ref={cardRef} className="relative mx-auto w-fit">
          {/* Decorative ring */}
          <div
            ref={ring1Ref}
            className="absolute -inset-2 rounded-full border-2 border-dashed border-[#1e3a5f]/20 sm:-inset-3"
          />
          <div
            ref={ring2Ref}
            className="absolute -inset-3 rounded-full border border-[#4ade80]/10 sm:-inset-5"
          />
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="relative block focus:outline-none"
            aria-label="Ke halaman utama"
          >
            <img
              ref={imgRef}
              src={tanjuangPhoto}
              alt="Tanjuang Baringin"
              className="relative mx-auto h-32 w-32 rounded-full object-cover shadow-lg ring-4 ring-[#1e3a5f]/10 sm:h-44 sm:w-44"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
