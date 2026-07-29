import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useSectionAnimation(sectionRef) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header Animation */

      const headers = gsap.utils.toArray("[data-section-header]");

      headers.forEach((header) => {
        const badge = header.querySelector("[data-header-badge]");
        const title = header.querySelector("[data-header-title]");
        const line = header.querySelector("[data-header-line]");
        const desc = header.querySelector("[data-header-desc]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: header,
            start: "top 82%",
            once: true,
          },
        });

        if (badge) {
          tl.from(badge, {
            opacity: 0,
            y: -20,
            scale: 0.9,
            duration: 0.45,
            ease: "back.out(1.7)",
          });
        }

        if (title) {
          tl.from(
            title,
            {
              opacity: 0,
              y: 40,
              filter: "blur(10px)",
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.15",
          );
        }

        if (line) {
          tl.from(
            line,
            {
              scaleX: 0,
              transformOrigin: "center",
              duration: 0.45,
              ease: "power2.out",
            },
            "-=0.2",
          );
        }

        if (desc) {
          tl.from(
            desc,
            {
              opacity: 0,
              y: 20,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.15",
          );
        }
      });

      /* Card Animation */

      const cards = gsap.utils.toArray("[data-card]");

      cards.forEach((card, i) => {
        gsap.set(card, {
          opacity: 0,
          y: 50,
          scale: 0.96,
        });

        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.05,
          ease: "power3.out",

          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,

            onEnter: () => {
              const counter = card.querySelector("[data-counter]");

              if (counter) {
                const obj = { value: 0 };

                gsap.to(obj, {
                  value: Number(counter.dataset.value),
                  duration: 1.4,

                  onUpdate: () => {
                    const numberNode = counter.childNodes[0];

                    if (numberNode) {
                      numberNode.nodeValue = `${Math.floor(obj.value)} `;
                    }
                  },
                });
              }

              const progress = card.querySelector("[data-progress]");

              if (progress) {
                gsap.to(progress, {
                  width: progress.dataset.width + "%",
                  duration: 1.2,
                  ease: "power3.out",
                });
              }
            },
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);
}
