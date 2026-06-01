"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "@/lib/gsap-config";

const TOTAL_FRAMES = 240;
const FRAME_PATH = (i: number) =>
  `/frame/First-${String(i).padStart(4, "0")}.png`;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef({ current: 0 });

  const headlineRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    /* ── Pre-load all frames ── */
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;
    let loadedCount = 0;

    const drawFrame = (index: number) => {
      const img = images[index];
      if (!img || !img.complete) return;
      const w = canvas.width;
      const h = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(w / iw, h / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const sx = (w - sw) / 2;
      const sy = (h - sh) / 2;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, sx, sy, sw, sh);
    };

    drawFrame(0);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i + 1);
      img.onload = () => {
        images[i] = img;
        loadedCount++;
        if (i === 0) drawFrame(0);
      };
    }

    /* ── ScrollTrigger: scrub frames ── */
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 5}`,
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(self.progress * TOTAL_FRAMES)
        );
        if (frameIndex !== frameRef.current.current) {
          frameRef.current.current = frameIndex;
          drawFrame(frameIndex);
        }
      },
    });

    /* ── Hero text entrance ── */
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      headlineRef.current,
      { y: 60, opacity: 0, filter: "blur(12px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.6, ease: "power4.out" }
    )
      .fromTo(
        sublineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=1"
      )
      .fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.8"
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.4"
      );

    /* ── Parallax text fade on scroll ── */
    const section = sectionRef.current;
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${window.innerHeight * 1.5}`,
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        const elems = [
          headlineRef.current,
          sublineRef.current,
          taglineRef.current,
          ctaRef.current,
          scrollHintRef.current,
        ];
        elems.forEach((el) => {
          if (!el) return;
          const ty = p * -120;
          const op = 1 - p * 2.5;
          gsap.set(el, { y: ty, opacity: Math.max(0, op) });
        });
        if (overlayRef.current) {
          gsap.set(overlayRef.current, { opacity: p * 0.7 });
        }
      },
    });

    /* ── Scroll hint bounce ── */
    gsap.to(scrollHintRef.current, {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "sine.inOut",
    });

    return () => {
      st.kill();
      ScrollTrigger.getAll().forEach((s) => s.kill());
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: "var(--color-black)" }}
    >
      {/* Canvas — frame sequence */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full gpu"
        style={{ objectFit: "cover" }}
      />

      {/* Depth overlay — vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(10,6,8,0.65) 100%)",
        }}
      />

      {/* Scroll-progress overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "var(--color-black)", opacity: 0 }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        {/* Pre-headline */}
        <p
          ref={taglineRef}
          className="text-xs tracking-[0.5em] uppercase font-accent mb-6 opacity-0"
          style={{ color: "var(--color-gold)", fontWeight: 300 }}
        >
          Maison de Beauté · Est. 2024
        </p>

        {/* Main headline */}
        <div
          ref={headlineRef}
          className="overflow-hidden opacity-0"
        >
          <h1
            className="font-display italic leading-none"
            style={{
              fontSize: "clamp(4rem, 14vw, 14rem)",
              color: "var(--color-ivory)",
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
              textShadow: "0 0 80px rgba(201,169,110,0.15)",
            }}
          >
            Velvet
            <br />
            <span
              style={{
                color: "var(--color-gold)",
                WebkitTextStroke: "0",
              }}
            >
              Kiss
            </span>
          </h1>
        </div>

        {/* Sub headline */}
        <div ref={sublineRef} className="mt-6 opacity-0">
          <p
            className="text-sm md:text-base tracking-[0.4em] uppercase font-accent"
            style={{ color: "var(--color-blush)", fontWeight: 200 }}
          >
            Where desire meets
            <span style={{ color: "var(--color-gold)", marginLeft: 8 }}>
              perfection
            </span>
          </p>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-10 opacity-0">
          <button
            className="text-xs tracking-[0.35em] uppercase font-accent px-10 py-4 relative overflow-hidden group"
            style={{
              border: "1px solid rgba(201,169,110,0.5)",
              color: "var(--color-champagne)",
              fontWeight: 300,
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                borderColor: "var(--color-gold)",
                color: "var(--color-black)",
                backgroundColor: "var(--color-gold)",
                duration: 0.3,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                borderColor: "rgba(201,169,110,0.5)",
                color: "var(--color-champagne)",
                backgroundColor: "transparent",
                duration: 0.3,
              });
            }}
          >
            Discover the Collection
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-8 flex items-end justify-between"
      >
        <p
          className="text-xs tracking-[0.2em] uppercase font-accent"
          style={{ color: "rgba(245,230,200,0.4)", fontWeight: 300 }}
        >
          Scroll to explore
        </p>

        <div ref={scrollHintRef} className="opacity-0 flex flex-col items-center gap-2">
          <span
            className="text-xs tracking-widest font-accent"
            style={{ color: "var(--color-gold)", fontSize: "0.6rem" }}
          >
            ↓
          </span>
          <div
            className="w-px h-12"
            style={{ background: "linear-gradient(to bottom, var(--color-gold), transparent)" }}
          />
        </div>

        <p
          className="text-xs tracking-[0.2em] uppercase font-accent hidden md:block"
          style={{ color: "rgba(245,230,200,0.4)", fontWeight: 300 }}
        >
          Luxury Lipstick
        </p>
      </div>

      {/* Corner decoration */}
      <div
        className="absolute top-28 left-8 hidden md:block"
        style={{ color: "rgba(201,169,110,0.3)" }}
      >
        <div className="w-16 h-px" style={{ backgroundColor: "currentColor" }} />
        <div className="w-px h-16" style={{ backgroundColor: "currentColor" }} />
      </div>
      <div
        className="absolute top-28 right-8 hidden md:block"
        style={{ color: "rgba(201,169,110,0.3)" }}
      >
        <div className="w-16 h-px ml-auto" style={{ backgroundColor: "currentColor" }} />
        <div className="w-px h-16 ml-auto" style={{ backgroundColor: "currentColor" }} />
      </div>
    </section>
  );
}
