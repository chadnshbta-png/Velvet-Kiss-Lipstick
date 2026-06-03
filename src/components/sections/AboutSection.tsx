"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "@/lib/gsap-config";

const CONTENT_BLOCKS = [
  {
    label: "Introduction",
    heading: "Born from desire",
    body: "Born from the intersection of haute couture and sensory art, Velvet Kiss is not merely a lipstick — it is a declaration. Each shade is a mood distilled into pigment, a feeling crystallised into form.",
    accent: "var(--color-gold)",
  },
  {
    label: "Vision",
    heading: "Beauty as language",
    body: "We believe beauty is the most intimate form of self-expression. A single shade can shift your posture, alter your presence, rewrite the story of a room the moment you enter.",
    accent: "var(--color-blush)",
  },
  {
    label: "Mission",
    heading: "Rare ingredients",
    body: "We source only the rarest ingredients — Moroccan rose wax, Damascus oud extract, and 24-karat gold micro-particles — to create a formula that nourishes as it adorns. Every tube is hand-finished in Paris.",
    accent: "var(--color-mauve)",
  },
  {
    label: "Craftsmanship",
    heading: "The atelier",
    body: "Every shade is named after a feeling. Every formula is tested against the harshest of lights. Because luxury is not an object — it is an experience, and we obsess over every detail of yours.",
    accent: "var(--color-champagne)",
  },
];

const STATS = [
  { value: "48",  unit: "Shades", label: "Curated"  },
  { value: "24K", unit: "Gold",   label: "Infused"  },
  { value: "99",  unit: "%",      label: "Natural"  },
];

export default function AboutSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  /* Desktop refs */
  const stickyRef   = useRef<HTMLDivElement>(null);
  const blockRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const videoWrapRef= useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLDivElement>(null);
  const numberRef   = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ══════════════════════════════════════════
         MOBILE  ≤ 767px
         Simple stagger reveals — no sticky/complex
      ══════════════════════════════════════════ */
      mm.add("(max-width: 767px)", () => {
        /* Content blocks entrance */
        const mobileBlocks = section.querySelectorAll<HTMLElement>(".mob-block");
        gsap.set(mobileBlocks, { y: 28, opacity: 0 });
        gsap.to(mobileBlocks, {
          y: 0, opacity: 1,
          stagger: 0.14, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 72%" },
        });

        /* Stats entrance */
        const mobileStats = section.querySelectorAll<HTMLElement>(".mob-stat");
        gsap.set(mobileStats, { y: 20, opacity: 0 });
        gsap.to(mobileStats, {
          y: 0, opacity: 1,
          stagger: 0.1, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 55%" },
        });

        return () => {};
      });

      /* ══════════════════════════════════════════
         DESKTOP  ≥ 768px
         Full sticky scroll-driven block switching
      ══════════════════════════════════════════ */
      mm.add("(min-width: 768px)", () => {
        /* Section number + line */
        gsap.fromTo(numberRef.current, { x: -50, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        });
        gsap.fromTo(lineRef.current, { scaleX: 0, transformOrigin: "left" }, {
          scaleX: 1, duration: 1.8, ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        });

        /* Title words */
        const titleWords = titleRef.current?.querySelectorAll(".word-unit");
        if (titleWords) {
          gsap.fromTo(titleWords, { y: "110%", opacity: 0 }, {
            y: "0%", opacity: 1, stagger: 0.08, duration: 1.5, ease: "power4.out",
            scrollTrigger: { trigger: titleRef.current, start: "top 82%" },
          });
        }

        /* Video */
        gsap.fromTo(videoWrapRef.current, { scale: 1.08 }, {
          scale: 1, ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 2 },
        });
        gsap.fromTo(videoWrapRef.current, { opacity: 0, x: 60 }, {
          opacity: 1, x: 0, duration: 1.6, ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        });

        /* Progressive content blocks */
        const blocks = blockRefs.current.filter(Boolean) as HTMLDivElement[];
        const segmentCount = blocks.length;
        const scrollableH = window.innerHeight * segmentCount;

        gsap.set(blocks[0], { opacity: 1, y: 0 });
        gsap.set(blocks.slice(1), { opacity: 0, y: 70 });

        blocks.forEach((block, i) => {
          const segStart = (i / segmentCount) * scrollableH;
          const segEnd   = ((i + 1) / segmentCount) * scrollableH;
          const midpoint = (segStart + segEnd) / 2;

          if (i > 0) {
            ScrollTrigger.create({
              trigger: section,
              start: `top+=${segStart + scrollableH * 0.05 / segmentCount} top`,
              end:   `top+=${segStart + scrollableH * 0.22 / segmentCount} top`,
              scrub: 1.2,
              onUpdate: (self) => {
                gsap.set(block, {
                  opacity: self.progress,
                  y: (1 - self.progress) * 70,
                  filter: `blur(${(1 - self.progress) * 6}px)`,
                });
              },
            });
          }

          if (i < blocks.length - 1) {
            ScrollTrigger.create({
              trigger: section,
              start: `top+=${midpoint + scrollableH * 0.1 / segmentCount} top`,
              end:   `top+=${segEnd} top`,
              scrub: 1.2,
              onUpdate: (self) => {
                gsap.set(block, {
                  opacity: 1 - self.progress,
                  y: self.progress * -50,
                  filter: `blur(${self.progress * 4}px)`,
                });
              },
            });
          }
        });

        /* Stats */
        gsap.fromTo(
          statsRef.current?.querySelectorAll(".stat-item") ?? [],
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
          }
        );

        /* Autoplay video */
        ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          onEnter: () => videoRef.current?.play().catch(() => {}),
          onLeave: () => videoRef.current?.pause(),
          onEnterBack: () => videoRef.current?.play().catch(() => {}),
        });

        return () => {};
      });
    }, section);

    return () => ctx.revert();
  }, []);

  /* ─── Shared stat renderer ─── */
  const StatItem = ({ value, unit, label, isMobile }: typeof STATS[0] & { isMobile?: boolean }) => (
    <div className={isMobile ? "mob-stat" : "stat-item opacity-0"}>
      <div className="font-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "var(--color-gold)", lineHeight: 1 }}>
        {value}
      </div>
      <p className="font-accent" style={{ fontSize: "var(--t-caption)", color: "var(--color-mauve)", fontWeight: 300, letterSpacing: "0.12em", marginTop: "0.3rem", marginBottom: "0.25rem" }}>
        {unit}
      </p>
      <p className="font-accent" style={{ fontSize: "var(--t-label)", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(44,31,34,0.40)", fontWeight: 300 }}>
        {label}
      </p>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ backgroundColor: "var(--color-black)" }}
    >
      {/* ══════════════════════════════════════════
          MOBILE LAYOUT  — hidden on md+
          Single column, all 4 blocks visible
      ══════════════════════════════════════════ */}
      <div className="about-mobile" style={{ display: "none" }}>
        <div style={{
          padding: "var(--section-top) var(--container-pad) var(--sp-8)",
          maxWidth: "var(--container-max)",
          margin: "0 auto",
        }}>
          {/* Strip */}
          <div className="vk-strip">
            <span className="vk-strip-num" style={{ opacity: 0.18 }}>01</span>
            <div className="vk-strip-line" />
            <span className="vk-strip-label">Our Story</span>
          </div>

          {/* Title */}
          <div style={{ marginBottom: "var(--sp-6)" }}>
            {["The Art", "of", "Desire"].map((word, i) => (
              <div key={i} className="font-display italic" style={{
                fontSize: "clamp(3rem, 14vw, 5.5rem)",
                color: i === 1 ? "var(--color-gold)" : "var(--color-ivory)",
                lineHeight: 1.0, display: "block",
              }}>
                {word}
              </div>
            ))}
          </div>

          {/* Content blocks — all visible, stacked */}
          {CONTENT_BLOCKS.map((block, i) => (
            <div
              key={i}
              className="mob-block"
              style={{
                marginBottom: i < CONTENT_BLOCKS.length - 1 ? "var(--sp-7)" : "var(--sp-8)",
                paddingBottom: i < CONTENT_BLOCKS.length - 1 ? "var(--sp-7)" : 0,
                borderBottom: i < CONTENT_BLOCKS.length - 1 ? "1px solid rgba(44,31,34,0.10)" : "none",
              }}
            >
              <p className="font-accent" style={{ fontSize: "var(--t-label)", letterSpacing: "0.4em", textTransform: "uppercase", color: block.accent, fontWeight: 300, marginBottom: "var(--sp-2)" }}>
                {block.label}
              </p>
              <h3 className="font-display italic" style={{ fontSize: "clamp(1.8rem, 6vw, 2.4rem)", color: "var(--color-ivory)", lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "var(--sp-3)", fontWeight: 600 }}>
                {block.heading}
              </h3>
              <div style={{ width: "2.5rem", height: "1px", backgroundColor: block.accent, opacity: 0.45, marginBottom: "var(--sp-3)" }} />
              <p className="font-body" style={{ color: "rgba(44,31,34,0.70)", fontSize: "var(--t-body)", letterSpacing: "0.02em", lineHeight: 1.75, maxWidth: "42ch" }}>
                {block.body}
              </p>
            </div>
          ))}

          {/* Stats */}
          <div style={{
            borderTop: "1px solid rgba(44,31,34,0.10)",
            paddingTop: "var(--sp-4)",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "var(--sp-3)",
          }}>
            {STATS.map(stat => <StatItem key={stat.label} {...stat} isMobile />)}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP LAYOUT — hidden on mobile
          500vh sticky two-column grid
      ══════════════════════════════════════════ */}
      <div className="about-desktop" style={{ height: "500vh" }}>
        <div
          ref={stickyRef}
          style={{
            position: "sticky", top: 0, height: "100vh",
            display: "grid", gridTemplateColumns: "55% 45%",
            overflow: "hidden",
          }}
        >
          {/* Left: scroll-driven editorial content */}
          <div style={{
            position: "relative",
            display: "flex", flexDirection: "column",
            padding: "clamp(3rem,6vh,5rem) clamp(2rem,5vw,4rem) clamp(3rem,6vh,5rem) clamp(2rem,6vw,5rem)",
            overflow: "hidden", zIndex: 2,
          }}>
            {/* Strip */}
            <div className="flex items-center gap-5 mb-10">
              <div ref={numberRef} className="vk-strip-num opacity-0">01</div>
              <div ref={lineRef} className="vk-strip-line" />
              <p className="vk-strip-label">Our Story</p>
            </div>

            {/* Title */}
            <div ref={titleRef} className="mb-16" aria-label="The Art of Desire">
              {["The Art", "of", "Desire"].map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <div className="word-unit font-display italic" style={{
                    fontSize: "clamp(3rem, 5.5vw, 6rem)",
                    color: i === 1 ? "var(--color-gold)" : "var(--color-ivory)",
                    lineHeight: 1.0, display: "block",
                  }}>
                    {word}
                  </div>
                </div>
              ))}
            </div>

            {/* Content blocks container */}
            <div style={{ position: "relative", flex: 1 }}>
              {CONTENT_BLOCKS.map((block, i) => (
                <div key={i} ref={(el) => { blockRefs.current[i] = el; }} style={{
                  position: "absolute", inset: 0,
                  display: "flex", flexDirection: "column", justifyContent: "flex-start",
                  opacity: i === 0 ? 1 : 0,
                }}>
                  <p className="font-accent mb-4" style={{ fontSize: "var(--t-label)", letterSpacing: "0.4em", textTransform: "uppercase", color: block.accent, fontWeight: 300 }}>
                    {block.label}
                  </p>
                  <h3 className="font-display italic mb-5" style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", color: "var(--color-ivory)", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                    {block.heading}
                  </h3>
                  <div className="mb-6 w-16 h-px" style={{ backgroundColor: block.accent, opacity: 0.5 }} />
                  <p className="font-body leading-relaxed" style={{ color: "rgba(44,31,34,0.72)", fontSize: "clamp(0.9rem,1.2vw,1.05rem)", letterSpacing: "0.02em", maxWidth: "38ch" }}>
                    {block.body}
                  </p>
                  <div className="flex items-center gap-2 mt-8">
                    {CONTENT_BLOCKS.map((_, j) => (
                      <div key={j} style={{ width: j === i ? "2rem" : "0.4rem", height: "1px", backgroundColor: j === i ? block.accent : "rgba(44,31,34,0.15)", transition: "width 0.4s" }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 border-t" style={{
              borderColor: "rgba(44,31,34,0.10)",
              paddingTop: "clamp(1.5rem,3vh,2.5rem)",
              gap: "clamp(1rem,3vw,2.5rem)",
              marginTop: "clamp(1.5rem,3vh,2rem)",
            }}>
              {STATS.map(stat => <StatItem key={stat.label} {...stat} />)}
            </div>
          </div>

          {/* Right: sticky video */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            <div ref={videoWrapRef} style={{ position: "absolute", inset: 0, opacity: 0 }}>
              <video ref={videoRef} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted loop playsInline preload="metadata">
                <source src="/video/Create_a_single_continuous_sho.mp4" type="video/mp4" />
                <source src="/video/Create_a_vertical_luxury (1).mp4" type="video/mp4" />
              </video>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, var(--color-black) 0%, rgba(250,246,241,0.55) 18%, transparent 40%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--color-black) 0%, transparent 25%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(155,30,50,0.07) 0%, transparent 60%)", mixBlendMode: "multiply", pointerEvents: "none" }} />
            </div>
            <div className="absolute right-5 top-1/2 hidden lg:block" style={{ writingMode: "vertical-rl", textOrientation: "mixed", color: "rgba(155,30,50,0.28)", fontSize: "0.5rem", letterSpacing: "0.45em", textTransform: "uppercase", fontFamily: "var(--font-accent)", fontWeight: 300, transform: "rotate(180deg) translateY(50%)", zIndex: 10 }}>
              The Story of Velvet Kiss
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
