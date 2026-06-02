"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "@/lib/gsap-config";

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const textRevealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* matchMedia: mobile 2×vh, desktop 4×vh */
      let pinDist = window.innerHeight * 4;
      const mm = gsap.matchMedia();
      mm.add("(max-width: 767px)", () => { pinDist = window.innerHeight * 2; return () => {}; });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: `+=${pinDist}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Phase 1: Logo appears with depth
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.82, filter: "blur(12px)", y: 20 },
        { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 0.28, ease: "power3.out" }
      );

      // Phase 2: Video wrapper appears small
      tl.fromTo(
        videoWrapRef.current,
        { opacity: 0, scale: 0.55, y: 50 },
        { opacity: 1, scale: 0.55, y: 0, duration: 0.22, ease: "power3.out" },
        "+=0.06"
      );

      // Phase 3: Video expands to near-fullscreen (88vw)
      tl.to(
        videoWrapRef.current,
        {
          scale: 1,
          borderRadius: 0,
          duration: 0.65,
          ease: "power3.inOut",
        },
        "+=0.04"
      );

      // Logo fades as video expands
      tl.to(
        logoRef.current,
        { opacity: 0, y: -50, scale: 0.9, duration: 0.22, ease: "power2.in" },
        "<0.08"
      );

      // Overlay adds subtle warmth
      tl.to(
        overlayRef.current,
        { opacity: 0.45, duration: 0.35, ease: "power2.out" },
        "<"
      );

      // Caption reveals
      tl.fromTo(
        captionRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.28, ease: "power3.out" },
        "-=0.12"
      );

      // Word-by-word text
      tl.fromTo(
        textRevealRef.current
          ? Array.from(textRevealRef.current.querySelectorAll(".tr-word"))
          : [],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, stagger: 0.04, duration: 0.28, ease: "power2.out" },
        "-=0.1"
      );

      /* ── Header animation ── */
      gsap.fromTo(
        section.querySelectorAll(".vs-word"),
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.09,
          duration: 1.6,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 77%" },
        }
      );

      /* ── Autoplay video ── */
      ScrollTrigger.create({
        trigger: videoWrapRef.current,
        start: "top 85%",
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
      id="video"
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--color-black)" }}
    >
      {/* Section header */}
      <div className="vk-section-header">
        <div className="vk-strip">
          <span className="vk-strip-num">04</span>
          <div className="vk-strip-line" />
          <span className="vk-strip-label">The Film</span>
        </div>

        <div aria-label="The Story Unfolds">
          {["The Story", "Unfolds"].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <div
                className="vs-word font-display italic"
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

      {/* Pinned cinematic showcase */}
      <div
        ref={wrapRef}
        className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: "var(--color-deep)" }}
      >
        {/* Cinematic centre focus — single minimal glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(70,14,30,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Brand logo — shown before video expands */}
        <div
          ref={logoRef}
          className="absolute z-10 text-center"
          style={{ opacity: 0 }}
        >
          <div
            className="font-display italic"
            style={{
              fontSize: "clamp(3rem, 7vw, 7rem)",
              color: "var(--color-ivory)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textShadow: "0 0 80px rgba(201,168,152,0.18)",
            }}
          >
            Velvet
            <span style={{ color: "var(--color-gold)" }}> Kiss</span>
          </div>
          <div className="flex items-center gap-4 mt-5 justify-center">
            <div
              className="h-px w-16"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--color-gold))",
              }}
            />
            <p
              className="text-xs tracking-[0.5em] uppercase font-accent"
              style={{ color: "var(--color-gold)", fontWeight: 300 }}
            >
              The Film
            </p>
            <div
              className="h-px w-16"
              style={{
                background:
                  "linear-gradient(to left, transparent, var(--color-gold))",
              }}
            />
          </div>
        </div>

        {/* Video wrapper — expands from 55% to 88% viewport width */}
        <div
          ref={videoWrapRef}
          className="absolute gpu overflow-hidden"
          style={{
            width: "min(88vw, 1440px)",
            height: "min(56.25vw, 810px)",   /* 16:9 on mobile, capped at 810px on wide screens */
            borderRadius: "6px",
            border: "1px solid rgba(201,168,152,0.15)",
            opacity: 0,
            transformOrigin: "center center",
          }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
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

          {/* Warm color grade */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(46,16,32,0.2) 0%, transparent 50%)",
              mixBlendMode: "multiply",
            }}
          />

          {/* Scroll overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: "var(--color-black)", opacity: 0 }}
          />
        </div>

        {/* Caption — appears over expanded video */}
        <div
          ref={captionRef}
          className="absolute bottom-14 left-1/2 -translate-x-1/2 text-center z-10"
          style={{ opacity: 0 }}
        >
          <div ref={textRevealRef}>
            {["A", "film", "for", "those", "who", "dare", "to", "be", "desired"].map(
              (word, i) => (
                <span
                  key={i}
                  className="tr-word font-display italic inline-block mr-3"
                  style={{
                    fontSize: "clamp(1rem, 2.5vw, 2.2rem)",
                    color:
                      i % 3 === 1
                        ? "var(--color-gold)"
                        : "var(--color-ivory)",
                    opacity: 0,
                  }}
                >
                  {word}
                </span>
              )
            )}
          </div>
        </div>

        {/* Muted indicator */}
        <div
          className="absolute bottom-8 right-8 flex items-center gap-2 z-10"
          style={{ color: "rgba(237,213,200,0.35)" }}
        >
          <div className="flex items-end gap-0.5 h-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-0.5"
                style={{
                  backgroundColor: "currentColor",
                  height: `${i * 25}%`,
                  animation: `soundBar ${0.5 + i * 0.1}s ease-in-out infinite alternate`,
                }}
              />
            ))}
          </div>
          <span
            className="text-xs tracking-widest font-accent"
            style={{ fontWeight: 300, fontSize: "0.6rem" }}
          >
            MUTED
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes soundBar {
          from { transform: scaleY(0.4); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
