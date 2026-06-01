"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "@/lib/gsap-config";

const PRODUCTS = [
  {
    id: 1,
    name: "Crimson Reverie",
    shade: "#8B0000",
    finish: "Velvet Matte",
    price: "£85",
    src: "/images/71EweNGgrHL.jpg",
    tagline: "The signature shade",
  },
  {
    id: 2,
    name: "Blush Nocturne",
    shade: "#E8B4B8",
    finish: "Satin Sheer",
    price: "£85",
    src: "/images/51OrZ+4Rn7L._AC_UF350,350_QL80_.jpg",
    tagline: "Barely-there luxury",
  },
  {
    id: 3,
    name: "Gold Séduction",
    shade: "#C9A96E",
    finish: "Glass Gloss",
    price: "£90",
    src: "/images/download.webp",
    tagline: "24K brilliance",
  },
  {
    id: 4,
    name: "Noir Obsession",
    shade: "#1a0a0f",
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
  const activeIndex = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ── Header ── */
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".ph-word"),
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.08,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
        }
      );

      /* ── Stacked card reveal with scroll-driven showcase ── */
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const total = cards.length;

      // Initial stack — all cards at different depths
      cards.forEach((card, i) => {
        gsap.set(card, {
          y: i * 12,
          scale: 1 - i * 0.04,
          rotateX: -i * 3,
          opacity: i === 0 ? 1 : 0.6 - i * 0.1,
          zIndex: total - i,
          transformOrigin: "bottom center",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: `+=${window.innerHeight * (total + 1)}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        // Each card flies in from the right rotating slightly
        tl.fromTo(
          card,
          {
            x: 600,
            y: 0,
            rotateY: 25,
            scale: 0.85,
            opacity: 0,
            zIndex: total + i,
          },
          {
            x: 0,
            y: 0,
            rotateY: 0,
            scale: 1,
            opacity: 1,
            zIndex: total + i,
            duration: 0.6,
            ease: "power4.out",
          }
        );

        // Previous card shrinks to the right
        tl.to(
          cards[i - 1],
          {
            x: 120,
            scale: 0.9,
            opacity: 0.3,
            rotateY: -8,
            duration: 0.6,
            ease: "power3.inOut",
          },
          "<0.1"
        );
      });
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
      <div className="container mx-auto px-8 md:px-16 max-w-7xl pt-32 pb-20">
        <div className="flex items-center gap-6 mb-12">
          <div
            className="font-display italic"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "rgba(201,169,110,0.2)", lineHeight: 1 }}
          >
            03
          </div>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, var(--color-gold), transparent)" }} />
          <p className="text-xs tracking-[0.4em] uppercase font-accent" style={{ color: "var(--color-gold)", fontWeight: 300 }}>
            The Collection
          </p>
        </div>

        <div ref={headerRef}>
          {["The", "Collection"].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <div
                className="ph-word font-display italic"
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 9rem)",
                  lineHeight: 0.95,
                  color: i === 1 ? "var(--color-gold)" : "var(--color-ivory)",
                  display: "block",
                }}
              >
                {word}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stacked cards stage */}
      <div
        ref={stageRef}
        className="relative w-full h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-deep)", perspective: "1000px" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,169,110,0.05) 0%, transparent 70%)",
          }}
        />

        {/* Cards container */}
        <div
          className="relative gpu"
          style={{ width: "clamp(300px, 38vw, 480px)", height: "clamp(420px, 55vh, 620px)", transformStyle: "preserve-3d" }}
        >
          {PRODUCTS.map((product, i) => (
            <div
              key={product.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute inset-0 gpu"
              style={{ transformStyle: "preserve-3d", transformOrigin: "bottom center" }}
            >
              <div
                className="w-full h-full flex flex-col overflow-hidden border"
                style={{
                  backgroundColor: "var(--color-deep)",
                  borderColor: "rgba(201,169,110,0.2)",
                }}
              >
                {/* Image area */}
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
                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, var(--color-deep) 0%, transparent 40%)`,
                    }}
                  />
                  {/* Shade dot */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: product.shade, borderColor: "rgba(201,169,110,0.4)" }}
                    />
                  </div>
                  {/* Number */}
                  <div
                    className="absolute top-4 left-4 font-display italic"
                    style={{ fontSize: "3rem", color: "rgba(201,169,110,0.1)", lineHeight: 1 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Info area */}
                <div className="px-6 py-5 flex flex-col gap-1">
                  <p
                    className="text-xs tracking-[0.3em] uppercase font-accent"
                    style={{ color: "var(--color-gold)", fontWeight: 300 }}
                  >
                    {product.tagline}
                  </p>
                  <h3
                    className="font-display italic"
                    style={{ fontSize: "1.6rem", color: "var(--color-ivory)", lineHeight: 1.2 }}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-3">
                    <p
                      className="text-xs tracking-[0.2em] uppercase font-accent"
                      style={{ color: "rgba(245,230,200,0.4)", fontWeight: 300 }}
                    >
                      {product.finish}
                    </p>
                    <p
                      className="font-display"
                      style={{ fontSize: "1.2rem", color: "var(--color-champagne)" }}
                    >
                      {product.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating dots nav */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {PRODUCTS.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: i === 0 ? "var(--color-gold)" : "rgba(201,169,110,0.2)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
