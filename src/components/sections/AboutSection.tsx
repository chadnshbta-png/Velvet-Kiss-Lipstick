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

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ── Section number + line entrance ── */
      gsap.fromTo(
        numberRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 1.8,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );

      /* ── Title words reveal ── */
      const titleWords = titleRef.current?.querySelectorAll(".word-unit");
      if (titleWords) {
        gsap.fromTo(
          titleWords,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            stagger: 0.08,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: { trigger: titleRef.current, start: "top 82%" },
          }
        );
      }

      /* ── Video parallax zoom ── */
      gsap.fromTo(
        videoWrapRef.current,
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        }
      );

      /* ── Video entrance ── */
      gsap.fromTo(
        videoWrapRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.6,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        }
      );

      /* ── Progressive content blocks ── */
      // Section outer height: 500vh, sticky height: 100vh → scrollable inner: 400vh
      // Divide 400vh across 4 blocks, each gets 100vh of scroll to be active
      const blocks = blockRefs.current.filter(Boolean) as HTMLDivElement[];
      const segmentCount = blocks.length; // 4
      const scrollableH = window.innerHeight * (segmentCount); // 400vh

      // Block 0: visible immediately on scroll into view
      gsap.set(blocks[0], { opacity: 1, y: 0 });
      gsap.set(blocks.slice(1), { opacity: 0, y: 70 });

      blocks.forEach((block, i) => {
        const segStart = (i / segmentCount) * scrollableH;
        const segEnd = ((i + 1) / segmentCount) * scrollableH;
        const midpoint = (segStart + segEnd) / 2;

        // Each block: enter at 20% of its segment, exit at 80%
        if (i > 0) {
          // Enter this block
          ScrollTrigger.create({
            trigger: section,
            start: `top+=${segStart + scrollableH * 0.05 / segmentCount} top`,
            end: `top+=${segStart + scrollableH * 0.22 / segmentCount} top`,
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

        // Exit this block (if not last)
        if (i < blocks.length - 1) {
          ScrollTrigger.create({
            trigger: section,
            start: `top+=${midpoint + scrollableH * 0.1 / segmentCount} top`,
            end: `top+=${segEnd} top`,
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

      /* ── Stats section ── */
      gsap.fromTo(
        statsRef.current?.querySelectorAll(".stat-item") ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
        }
      );

      /* ── Autoplay video when in view ── */
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => videoRef.current?.play().catch(() => {}),
        onLeave: () => videoRef.current?.pause(),
        onEnterBack: () => videoRef.current?.play().catch(() => {}),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        height: "500vh",
        backgroundColor: "var(--color-black)",
        position: "relative",
      }}
    >
      {/* Sticky container: full viewport, split 55/45 */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "grid",
          gridTemplateColumns: "55% 45%",
          overflow: "hidden",
        }}
      >
        {/* ── LEFT: scroll-driven editorial content ── */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: "clamp(3rem, 6vh, 5rem) clamp(2rem, 5vw, 4rem) clamp(3rem, 6vh, 5rem) clamp(2rem, 6vw, 5rem)",
            overflow: "hidden",
            zIndex: 2,
          }}
        >
          {/* Section header strip */}
          <div className="flex items-center gap-5 mb-10">
            <div
              ref={numberRef}
              className="font-display italic opacity-0"
              style={{
                fontSize: "clamp(2rem, 4vw, 4rem)",
                color: "rgba(201,168,152,0.2)",
                lineHeight: 1,
              }}
            >
              01
            </div>
            <div
              ref={lineRef}
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(to right, var(--color-gold), transparent)",
                transformOrigin: "left",
              }}
            />
            <p
              className="text-xs tracking-[0.4em] uppercase font-accent"
              style={{ color: "var(--color-gold)", fontWeight: 300 }}
            >
              Our Story
            </p>
          </div>

          {/* Permanent title */}
          <div ref={titleRef} className="mb-16" aria-label="The Art of Desire">
            {["The Art", "of", "Desire"].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <div
                  className="word-unit font-display italic"
                  style={{
                    fontSize: "clamp(3rem, 5.5vw, 6rem)",
                    color:
                      i === 1 ? "var(--color-gold)" : "var(--color-ivory)",
                    lineHeight: 1.0,
                    display: "block",
                  }}
                >
                  {word}
                </div>
              </div>
            ))}
          </div>

          {/* Content blocks — absolute positioned, swap on scroll */}
          <div style={{ position: "relative", flex: 1 }}>
            {CONTENT_BLOCKS.map((block, i) => (
              <div
                key={i}
                ref={(el) => {
                  blockRefs.current[i] = el;
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  opacity: i === 0 ? 1 : 0,
                }}
              >
                {/* Block label */}
                <p
                  className="text-xs tracking-[0.4em] uppercase font-accent mb-4"
                  style={{ color: block.accent, fontWeight: 300 }}
                >
                  {block.label}
                </p>

                {/* Block heading */}
                <h3
                  className="font-display italic mb-5"
                  style={{
                    fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                    color: "var(--color-ivory)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {block.heading}
                </h3>

                {/* Divider */}
                <div
                  className="mb-6 w-16 h-px"
                  style={{ backgroundColor: block.accent, opacity: 0.5 }}
                />

                {/* Body copy */}
                <p
                  className="font-body leading-relaxed"
                  style={{
                    color: "rgba(250,246,240,0.7)",
                    fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                    letterSpacing: "0.02em",
                    maxWidth: "38ch",
                  }}
                >
                  {block.body}
                </p>

                {/* Progress dots */}
                <div className="flex items-center gap-2 mt-8">
                  {CONTENT_BLOCKS.map((_, j) => (
                    <div
                      key={j}
                      style={{
                        width: j === i ? "2rem" : "0.4rem",
                        height: "1px",
                        backgroundColor:
                          j === i ? block.accent : "rgba(201,168,152,0.2)",
                        transition: "width 0.4s",
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Stats — at bottom of left panel */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 border-t"
            style={{
              borderColor: "rgba(201,168,152,0.1)",
              paddingTop: "clamp(1.5rem, 3vh, 2.5rem)",
              gap: "clamp(1rem, 3vw, 2.5rem)",
              marginTop: "clamp(1.5rem, 3vh, 2rem)",
            }}
          >
            {[
              { value: "48", unit: "Shades", label: "Curated" },
              { value: "24K", unit: "Gold", label: "Infused" },
              { value: "99", unit: "%", label: "Natural" },
            ].map((stat) => (
              <div key={stat.label} className="stat-item opacity-0">
                {/* Number + unit on separate lines for clean hierarchy */}
                <div
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                    color: "var(--color-gold)",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <p
                  className="font-accent"
                  style={{
                    fontSize: "var(--t-caption)",
                    color: "var(--color-blush)",
                    fontWeight: 300,
                    letterSpacing: "0.12em",
                    marginTop: "0.3rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  {stat.unit}
                </p>
                <p
                  className="font-accent"
                  style={{
                    fontSize: "var(--t-label)",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(237,213,200,0.35)",
                    fontWeight: 300,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: sticky video ── */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Video */}
          <div
            ref={videoWrapRef}
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0,
            }}
          >
            <video
              ref={videoRef}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source
                src="/video/Create_a_single_continuous_sho.mp4"
                type="video/mp4"
              />
              <source
                src="/video/Create_a_vertical_luxury (1).mp4"
                type="video/mp4"
              />
            </video>

            {/* Left fade — blends video into left content */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, var(--color-black) 0%, rgba(8,5,8,0.5) 18%, transparent 40%)",
                pointerEvents: "none",
              }}
            />

            {/* Bottom fade */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, var(--color-black) 0%, transparent 25%)",
                pointerEvents: "none",
              }}
            />

            {/* Subtle color grade overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(46,16,32,0.25) 0%, transparent 60%)",
                mixBlendMode: "multiply",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Side rotated label */}
          <div
            className="absolute right-5 top-1/2 hidden lg:block"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              color: "rgba(201,168,152,0.25)",
              fontSize: "0.5rem",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              fontFamily: "var(--font-accent)",
              fontWeight: 300,
              transform: "rotate(180deg) translateY(50%)",
              zIndex: 10,
            }}
          >
            The Story of Velvet Kiss
          </div>
        </div>
      </div>
    </section>
  );
}
