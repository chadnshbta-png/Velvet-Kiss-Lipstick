"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLParagraphElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);
  const text3Ref = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const sideTextRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ── Background parallax ── */
      gsap.to(bgRef.current, {
        y: "-20%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(layer1Ref.current, {
        y: "-8%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(layer2Ref.current, {
        y: "5%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      /* ── Section number ── */
      gsap.fromTo(
        numberRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );

      /* ── Decorative line ── */
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 1.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        }
      );

      /* ── Title reveal ── */
      const titleWords = titleRef.current?.querySelectorAll(".word-unit");
      if (titleWords) {
        gsap.fromTo(
          titleWords,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            stagger: 0.06,
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
            },
          }
        );
      }

      /* ── Paragraph reveals ── */
      [text1Ref, text2Ref, text3Ref].forEach((ref, i) => {
        gsap.fromTo(
          ref.current,
          { y: 40, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
            },
            delay: i * 0.1,
          }
        );
      });

      /* ── Image frame ── */
      gsap.fromTo(
        imageFrameRef.current,
        { scale: 0.85, opacity: 0, filter: "blur(10px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.6,
          ease: "power4.out",
          scrollTrigger: {
            trigger: imageFrameRef.current,
            start: "top 80%",
          },
        }
      );

      /* ── Stats counter ── */
      gsap.fromTo(
        statsRef.current?.querySelectorAll(".stat-item") ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
        }
      );

      /* ── Side text rotated ── */
      gsap.fromTo(
        sideTextRef.current,
        { opacity: 0, x: 20 },
        {
          opacity: 0.3,
          x: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const titleWords = ["The Art", "of", "Desire"];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen overflow-hidden py-32 md:py-48"
      style={{ backgroundColor: "var(--color-black)" }}
    >
      {/* Layered backgrounds */}
      <div
        ref={bgRef}
        className="absolute inset-0 gpu"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(139,0,0,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        ref={layer1Ref}
        className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 gpu"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,169,110,0.04) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      <div
        ref={layer2Ref}
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 gpu"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(196,30,58,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* Side rotated text */}
      <div
        ref={sideTextRef}
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:block"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          color: "var(--color-gold)",
          fontSize: "0.55rem",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          fontFamily: "var(--font-accent)",
          fontWeight: 300,
          transform: "rotate(180deg) translateY(50%)",
          opacity: 0,
        }}
      >
        The Story of Velvet Kiss
      </div>

      <div className="container mx-auto px-8 md:px-16 max-w-7xl">
        {/* Section number + line */}
        <div className="flex items-center gap-6 mb-20">
          <div
            ref={numberRef}
            className="font-display italic opacity-0"
            style={{
              fontSize: "clamp(3rem, 6vw, 5rem)",
              color: "rgba(201,169,110,0.2)",
              lineHeight: 1,
            }}
          >
            01
          </div>
          <div
            ref={lineRef}
            className="flex-1 h-px"
            style={{ background: "linear-gradient(to right, var(--color-gold), transparent)", transformOrigin: "left" }}
          />
          <p
            className="text-xs tracking-[0.4em] uppercase font-accent"
            style={{ color: "var(--color-gold)", fontWeight: 300 }}
          >
            Our Story
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: text column */}
          <div>
            {/* Title */}
            <div ref={titleRef} aria-label="The Art of Desire">
              {titleWords.map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <div
                    className="word-unit font-display italic"
                    style={{
                      fontSize: "clamp(3.5rem, 7vw, 7rem)",
                      color: i === 1 ? "var(--color-gold)" : "var(--color-ivory)",
                      lineHeight: 1.0,
                      display: "block",
                    }}
                  >
                    {word}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 space-y-6">
              <p
                ref={text1Ref}
                className="font-body leading-relaxed opacity-0"
                style={{
                  color: "rgba(245,230,200,0.75)",
                  fontSize: "1.05rem",
                  letterSpacing: "0.02em",
                }}
              >
                Born from the intersection of haute couture and sensory art,
                Velvet Kiss is not merely a lipstick — it is a declaration. Each
                shade is a mood distilled into pigment, a feeling crystallised
                into form.
              </p>
              <p
                ref={text2Ref}
                className="font-body leading-relaxed opacity-0"
                style={{
                  color: "rgba(245,230,200,0.55)",
                  fontSize: "0.95rem",
                  letterSpacing: "0.02em",
                }}
              >
                We source only the rarest ingredients — Moroccan rose wax,
                Damascus oud extract, and 24-karat gold micro-particles — to
                create a formula that nourishes as it adorns.
              </p>
              <p
                ref={text3Ref}
                className="font-body leading-relaxed opacity-0"
                style={{
                  color: "rgba(245,230,200,0.4)",
                  fontSize: "0.9rem",
                  letterSpacing: "0.02em",
                }}
              >
                Every tube is hand-finished. Every shade is named after a
                feeling. Because luxury is not an object — it is an experience.
              </p>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="mt-14 grid grid-cols-3 gap-8"
            >
              {[
                { value: "48", unit: "Shades", label: "Curated" },
                { value: "24K", unit: "Gold", label: "Infused" },
                { value: "99", unit: "%", label: "Natural" },
              ].map((stat) => (
                <div key={stat.label} className="stat-item opacity-0">
                  <div
                    className="font-display"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3.5rem)",
                      color: "var(--color-gold)",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                    <span style={{ color: "var(--color-blush)", fontSize: "60%" }}>
                      {stat.unit}
                    </span>
                  </div>
                  <p
                    className="text-xs tracking-[0.25em] uppercase font-accent mt-1"
                    style={{ color: "rgba(245,230,200,0.4)", fontWeight: 300 }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image frame */}
          <div className="relative flex items-start justify-center mt-8 md:mt-0">
            <div
              ref={imageFrameRef}
              className="relative opacity-0 gpu"
              style={{ width: "100%", maxWidth: 480 }}
            >
              {/* Outer frame decoration */}
              <div
                className="absolute -inset-3 border"
                style={{ borderColor: "rgba(201,169,110,0.15)" }}
              />
              <div
                className="absolute -top-6 -left-6 w-12 h-12"
                style={{ borderTop: "2px solid var(--color-gold)", borderLeft: "2px solid var(--color-gold)" }}
              />
              <div
                className="absolute -bottom-6 -right-6 w-12 h-12"
                style={{ borderBottom: "2px solid var(--color-gold)", borderRight: "2px solid var(--color-gold)" }}
              />

              {/* Image placeholder with luxury gradient */}
              <div
                className="w-full aspect-[3/4] relative overflow-hidden"
                style={{ backgroundColor: "var(--color-deep)" }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(139,0,0,0.3) 0%, rgba(10,6,8,0.8) 50%, rgba(201,169,110,0.1) 100%)",
                  }}
                />
                {/* Decorative center element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="font-display italic"
                      style={{
                        fontSize: "6rem",
                        color: "rgba(201,169,110,0.12)",
                        lineHeight: 1,
                      }}
                    >
                      VK
                    </div>
                    <div
                      className="w-16 h-px mx-auto my-4"
                      style={{ backgroundColor: "rgba(201,169,110,0.2)" }}
                    />
                    <p
                      className="text-xs tracking-[0.4em] uppercase font-accent"
                      style={{ color: "rgba(201,169,110,0.3)", fontWeight: 300 }}
                    >
                      Maison de Beauté
                    </p>
                  </div>
                </div>

                {/* Shimmer effect */}
                <div
                  className="absolute inset-0 gpu"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, rgba(201,169,110,0.04) 50%, transparent 60%)",
                    animation: "shimmer 4s ease-in-out infinite",
                  }}
                />
              </div>

              {/* Caption */}
              <div className="mt-4 flex items-center justify-between">
                <p
                  className="text-xs tracking-[0.25em] uppercase font-accent"
                  style={{ color: "rgba(201,169,110,0.5)", fontWeight: 300 }}
                >
                  The Atelier
                </p>
                <p
                  className="text-xs font-body italic"
                  style={{ color: "rgba(245,230,200,0.3)" }}
                >
                  Paris, 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
