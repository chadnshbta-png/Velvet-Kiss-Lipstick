"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "@/lib/gsap-config";

const TOTAL_FRAMES = 240;
const FRAME_PATH = (i: number) =>
  `/frame/First-${String(i).padStart(4, "0")}.png`;

// Text reveals at ~78–97% of hero scroll progress (near frame 226)

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
  const bottomBarRef = useRef<HTMLDivElement>(null);

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
        if (i === 0) drawFrame(0);
      };
    }

    /* ── Set all text to hidden initially ── */
    gsap.set(
      [taglineRef.current, headlineRef.current, sublineRef.current, ctaRef.current, scrollHintRef.current, bottomBarRef.current],
      { opacity: 0 }
    );

    /* ── Set 3D initial positions for cinematic emergence ── */
    gsap.set(headlineRef.current, {
      z: -500,
      scale: 0.6,
      filter: "blur(28px)",
    });
    gsap.set(taglineRef.current, {
      z: -300,
      scale: 0.78,
      filter: "blur(18px)",
    });
    gsap.set(sublineRef.current, {
      z: -350,
      scale: 0.75,
      filter: "blur(20px)",
    });
    gsap.set(ctaRef.current, { y: 50 });
    gsap.set(scrollHintRef.current, { y: 10 });

    /* ── ScrollTrigger: scrub frames ── */
    const heroScrollDist = window.innerHeight * 5;

    const frameST = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${heroScrollDist}`,
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
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

    /* ── Cinematic text emergence — scroll-driven z-space reveal ── */
    // Starts at 78% of hero scroll, fully revealed at 97%
    // Maps to frame range: ~187–233 (near First-0226)
    const textTl = gsap.timeline({ paused: true });

    textTl
      .to(taglineRef.current, {
        opacity: 1,
        z: 0,
        scale: 1,
        filter: "blur(0px)",
        ease: "none",
        duration: 0.35,
      })
      .to(
        headlineRef.current,
        {
          opacity: 1,
          z: 0,
          scale: 1,
          filter: "blur(0px)",
          ease: "none",
          duration: 0.45,
        },
        0.08
      )
      .to(
        sublineRef.current,
        {
          opacity: 1,
          z: 0,
          scale: 1,
          filter: "blur(0px)",
          ease: "none",
          duration: 0.35,
        },
        0.18
      )
      .to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          ease: "none",
          duration: 0.25,
        },
        0.32
      )
      .to(
        scrollHintRef.current,
        {
          opacity: 1,
          y: 0,
          ease: "none",
          duration: 0.2,
        },
        0.45
      )
      .to(
        bottomBarRef.current,
        {
          opacity: 1,
          ease: "none",
          duration: 0.15,
        },
        0.5
      );

    // Scroll window: 78%–97% of total hero scroll distance
    const textST = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: `top+=${heroScrollDist * 0.78} top`,
      end: `top+=${heroScrollDist * 0.97} top`,
      scrub: 1.8,
      onUpdate: (self) => {
        textTl.progress(self.progress);
      },
    });

    /* ── Subtle overlay darkens as text appears ── */
    const overlayST = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: `top+=${heroScrollDist * 0.75} top`,
      end: `top+=${heroScrollDist * 0.98} top`,
      scrub: true,
      onUpdate: (self) => {
        if (overlayRef.current) {
          gsap.set(overlayRef.current, { opacity: self.progress * 0.35 });
        }
      },
    });

    /* ── Scroll hint bounce ── */
    gsap.to(scrollHintRef.current, {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut",
    });

    return () => {
      frameST.kill();
      textST.kill();
      overlayST.kill();
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
      />

      {/* Soft edge vignette — keeps canvas content centred and readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(7,4,7,0.65) 100%)",
        }}
      />

      {/* Bottom fade — integrates hero into page scroll */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 70%, rgba(7,4,7,0.55) 100%)",
        }}
      />

      {/* Scroll-progress overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "var(--color-black)", opacity: 0 }}
      />

      {/* 3D perspective container — enables z-space emergence */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
      >
        {/* Pre-headline tagline */}
        <p
          ref={taglineRef}
          className="vk-strip-label mb-6"
          style={{ color: "var(--color-gold)" }}
        >
          Maison de Beauté · Est. 2024
        </p>

        {/* Main headline */}
        <div ref={headlineRef}>
          <h1
            className="font-display italic leading-none"
            style={{
              fontSize: "var(--t-hero)",
              color: "var(--color-ivory)",
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
              textShadow: "0 0 100px rgba(201,168,152,0.12)",
            }}
          >
            Velvet
            <br />
            <span style={{ color: "var(--color-gold)" }}>Kiss</span>
          </h1>
        </div>

        {/* Sub headline */}
        <div ref={sublineRef} className="mt-9">
          <p
            className="font-accent uppercase tracking-[0.4em]"
            style={{
              fontSize: "var(--t-caption)",
              color: "var(--color-blush)",
              fontWeight: 200,
            }}
          >
            Where desire meets
            <span style={{ color: "var(--color-gold)", marginLeft: 8 }}>
              perfection
            </span>
          </p>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-14">
          <button
            className="vk-btn vk-btn-md vk-btn-outline"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                borderColor: "var(--color-gold)",
                color: "var(--color-black)",
                backgroundColor: "var(--color-gold)",
                duration: 0.38,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                borderColor: "rgba(201,168,152,0.38)",
                color: "var(--color-champagne)",
                backgroundColor: "transparent",
                duration: 0.38,
              });
            }}
          >
            Discover the Collection
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        ref={bottomBarRef}
        className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-8 flex items-end justify-between"
      >
        <p
          className="text-xs tracking-[0.2em] uppercase font-accent"
          style={{ color: "rgba(237,213,200,0.35)", fontWeight: 300 }}
        >
          Scroll to explore
        </p>

        <div ref={scrollHintRef} className="flex flex-col items-center gap-2">
          <span
            className="font-accent"
            style={{ color: "var(--color-gold)", fontSize: "0.6rem" }}
          >
            ↓
          </span>
          <div
            className="w-px h-12"
            style={{
              background:
                "linear-gradient(to bottom, var(--color-gold), transparent)",
            }}
          />
        </div>

        <p
          className="text-xs tracking-[0.2em] uppercase font-accent hidden md:block"
          style={{ color: "rgba(237,213,200,0.35)", fontWeight: 300 }}
        >
          Luxury Lipstick
        </p>
      </div>

      {/* Corner decorations */}
      <div
        className="absolute top-28 left-8 hidden md:block"
        style={{ color: "rgba(201,168,152,0.25)" }}
      >
        <div className="w-14 h-px" style={{ backgroundColor: "currentColor" }} />
        <div className="w-px h-14" style={{ backgroundColor: "currentColor" }} />
      </div>
      <div
        className="absolute top-28 right-8 hidden md:block"
        style={{ color: "rgba(201,168,152,0.25)" }}
      >
        <div className="w-14 h-px ml-auto" style={{ backgroundColor: "currentColor" }} />
        <div className="w-px h-14 ml-auto" style={{ backgroundColor: "currentColor" }} />
      </div>
    </section>
  );
}
