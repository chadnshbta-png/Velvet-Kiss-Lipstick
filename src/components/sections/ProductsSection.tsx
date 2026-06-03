"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap-config";

const PRODUCTS = [
  {
    id: 1,
    name: "Crimson Reverie",
    shade: "#8B0000",
    shadeRgb: "139,0,0",
    finish: "Velvet Matte",
    price: "£85",
    src: "/images/71EweNGgrHL.jpg",
    tagline: "The signature shade",
  },
  {
    id: 2,
    name: "Blush Nocturne",
    shade: "#E8B4B8",
    shadeRgb: "232,180,184",
    finish: "Satin Sheer",
    price: "£85",
    src: "/images/51OrZ+4Rn7L._AC_UF350,350_QL80_.jpg",
    tagline: "Barely-there luxury",
  },
  {
    id: 3,
    name: "Gold Séduction",
    shade: "#C9A898",
    shadeRgb: "201,168,152",
    finish: "Glass Gloss",
    price: "£90",
    src: "/images/download.webp",
    tagline: "24K brilliance",
  },
  {
    id: 4,
    name: "Noir Obsession",
    shade: "#1a0a0f",
    shadeRgb: "26,10,15",
    finish: "Deep Matte",
    price: "£85",
    src: "/images/images (3).jpg",
    tagline: "For the bold",
  },
];

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ── Header ── */
      gsap.fromTo(
        headerRef.current
          ? Array.from(headerRef.current.querySelectorAll(".ph-word"))
          : [],
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.1,
          duration: 1.6,
          ease: "power4.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 82%" },
        }
      );

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const total = cards.length;

      // Initial stack — cards sit at depth before animation
      cards.forEach((card, i) => {
        gsap.set(card, {
          y: i * 14,
          scale: 1 - i * 0.038,
          opacity: i === 0 ? 1 : 0,
          zIndex: total - i,
          transformOrigin: "bottom center",
        });
      });

      /* Build timeline — parameterised by scroll distance per card */
      const buildProductTimeline = (perCard: number) => {
        const totalDist = perCard * (total + 0.6);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top top",
            end: `+=${totalDist}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });

        cards.forEach((card, i) => {
          if (i === 0) return;

          tl.fromTo(card,
            { x: 500, rotateY: 18, scale: 0.88, opacity: 0, zIndex: total + i },
            { x: 0, rotateY: 0, scale: 1, opacity: 1, zIndex: total + i, duration: 0.55, ease: "power4.out" }
          );
          tl.to(cards[i - 1],
            { x: -80, scale: 0.92, opacity: 0, rotateY: -5, filter: "blur(4px)", duration: 0.45, ease: "power3.inOut" },
            "<0.08"
          );
          tl.call(() => {
            dotRefs.current.forEach((dot, j) => {
              if (!dot) return;
              gsap.to(dot, {
                backgroundColor: j === i ? "var(--color-gold)" : "rgba(44,31,34,0.18)",
                width: j === i ? "1.5rem" : "0.375rem",
                duration: 0.4,
              });
            });
            if (labelRef.current) labelRef.current.textContent = PRODUCTS[i].name;
          }, [], "<0.1");
        });
      }; // end buildProductTimeline

      /* matchMedia: mobile 1.4×vh/card, desktop 2.2×vh/card */
      const mm = gsap.matchMedia();
      mm.add("(max-width: 767px)", () => { buildProductTimeline(window.innerHeight * 1.4); return () => {}; });
      mm.add("(min-width: 768px)", () => { buildProductTimeline(window.innerHeight * 2.2); return () => {}; });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--color-black)" }}
    >
      {/* Header */}
      <div className="vk-section-header">
        <div className="vk-strip">
          <span className="vk-strip-num">03</span>
          <div className="vk-strip-line" />
          <span className="vk-strip-label">The Collection</span>
        </div>

        <div ref={headerRef}>
          {["The", "Collection"].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <div
                className="ph-word font-display italic"
                style={{
                  fontSize: "var(--t-display)",
                  lineHeight: 0.95,
                  color:
                    i === 1 ? "var(--color-gold)" : "var(--color-ivory)",
                  display: "block",
                }}
              >
                {word}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage */}
      <div
        ref={stageRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundColor: "var(--color-deep)",
          perspective: "1200px",
        }}
      >
        {/* Subtle stage accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 40%, rgba(155,30,50,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Cards stack */}
        <div
          className="relative gpu"
          style={{
            width: "clamp(280px, 86vw, 480px)",
            height: "clamp(400px, 60vh, 660px)",
            transformStyle: "preserve-3d",
          }}
        >
          {PRODUCTS.map((product, i) => (
            <div
              key={product.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute inset-0 gpu"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="w-full h-full flex flex-col overflow-hidden border"
                style={{
                  backgroundColor: "rgba(255,250,246,0.98)",
                  borderColor: `rgba(${product.shadeRgb},0.28)`,
                  boxShadow: "0 4px 24px rgba(44,31,34,0.08), 0 1px 8px rgba(44,31,34,0.04)",
                }}
              >
                {/* Image */}
                <div className="relative flex-1 overflow-hidden">
                  <Image
                    src={product.src}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 480px"
                    priority={i === 0}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {/* Bottom gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, var(--color-deep) 0%, transparent 45%)`,
                    }}
                  />
                  {/* Side vignette */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, rgba(${product.shadeRgb},0.15) 0%, transparent 50%)`,
                    }}
                  />

                  {/* Shade swatch */}
                  <div className="absolute top-5 right-5 flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{
                        backgroundColor: product.shade,
                        borderColor: "rgba(44,31,34,0.22)",
                      }}
                    />
                  </div>

                  {/* Ghost number */}
                  <div
                    className="absolute top-4 left-5 font-display italic select-none"
                    style={{
                      fontSize: "3.5rem",
                      color: "rgba(44,31,34,0.07)",
                      lineHeight: 1,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Info */}
                <div
                  style={{
                    padding: "clamp(1rem,2.5vh,1.5rem) clamp(1.2rem,2.5vw,1.8rem)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                  }}
                >
                  <p
                    className="text-xs tracking-[0.3em] uppercase font-accent"
                    style={{ color: "var(--color-gold)", fontWeight: 300 }}
                  >
                    {product.tagline}
                  </p>
                  <h3
                    className="font-display italic"
                    style={{
                      fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
                      color: "var(--color-ivory)",
                      lineHeight: 1.15,
                    }}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <p
                      className="text-xs tracking-[0.2em] uppercase font-accent"
                      style={{
                        color: "rgba(44,31,34,0.45)",
                        fontWeight: 300,
                      }}
                    >
                      {product.finish}
                    </p>
                    <p
                      className="font-display"
                      style={{
                        fontSize: "1.25rem",
                        color: "var(--color-gold)",
                      }}
                    >
                      {product.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right nav — dots + current name */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-end gap-4">
          <div className="flex flex-col gap-3 items-end">
            {PRODUCTS.map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                className="h-px rounded-full"
                style={{
                  width: i === 0 ? "1.5rem" : "0.375rem",
                  backgroundColor:
                    i === 0
                      ? "var(--color-gold)"
                      : "rgba(44,31,34,0.18)",
                  transition: "all 0.4s",
                }}
              />
            ))}
          </div>
          <div
            ref={labelRef}
            className="font-display italic text-right"
            style={{
              fontSize: "0.75rem",
              color: "rgba(44,31,34,0.40)",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              marginTop: "0.5rem",
            }}
          >
            {PRODUCTS[0].name}
          </div>
        </div>
      </div>
    </section>
  );
}
