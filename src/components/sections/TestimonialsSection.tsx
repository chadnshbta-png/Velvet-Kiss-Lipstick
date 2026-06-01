"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "@/lib/gsap-config";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Isabelle M.",
    role: "Creative Director, Paris",
    quote:
      "Velvet Kiss isn't a product — it is armour. The moment I wear Crimson Reverie, I become untouchable.",
    shade: "Crimson Reverie",
    rating: 5,
    offset: { x: -8, y: -4, rotate: -2 },
  },
  {
    id: 2,
    name: "Sofia A.",
    role: "Model, Milan",
    quote:
      "I have tried every luxury lipstick. Nothing compares to the way Velvet Kiss holds colour through a 14-hour show.",
    shade: "Noir Obsession",
    rating: 5,
    offset: { x: 6, y: 2, rotate: 1.5 },
  },
  {
    id: 3,
    name: "Camille R.",
    role: "Editor, Vogue France",
    quote:
      "The Gold Séduction catches every light in the room. I wore it to the Met — three photographers asked what I had on my lips.",
    shade: "Gold Séduction",
    rating: 5,
    offset: { x: -4, y: 6, rotate: -1 },
  },
  {
    id: 4,
    name: "Yuki T.",
    role: "Beauty Influencer, Tokyo",
    quote:
      "The formula is unlike anything I have experienced. Moisturising, long-lasting, and the scent is absolutely divine.",
    shade: "Blush Nocturne",
    rating: 5,
    offset: { x: 8, y: -2, rotate: 2 },
  },
  {
    id: 5,
    name: "Amara O.",
    role: "Entrepreneur, Lagos",
    quote:
      "When I open that velvet case and hold the tube, I already feel elevated. It is the ritual that sets my day.",
    shade: "Crimson Reverie",
    rating: 5,
    offset: { x: -6, y: 4, rotate: -1.5 },
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const floatTweens = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ── Header ── */
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".tm-word"),
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

      /* ── Horizontal scroll track ── */
      const track = trackRef.current;
      if (!track) return;

      const totalWidth = track.scrollWidth - track.offsetWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalWidth * 1.2}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      /* ── Cards reveal as they enter horizontal view ── */
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, rotateZ: 0 },
          {
            y: 0,
            opacity: 1,
            rotateZ: card.dataset.rotate ? parseFloat(card.dataset.rotate) : 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: `top+=${i * 80} top`,
              toggleActions: "play none none none",
            },
            delay: i * 0.08,
          }
        );

        /* ── Continuous subtle float ── */
        const tween = gsap.to(card, {
          y: `+=${6 + (i % 3) * 4}`,
          rotateZ: `+=${0.5 + (i % 2) * 0.5}`,
          duration: 3 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
        floatTweens.current.push(tween);
      });
    }, section);

    return () => {
      floatTweens.current.forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  const stars = (n: number) =>
    Array.from({ length: n }, (_, i) => (
      <span key={i} style={{ color: "var(--color-gold)" }}>
        ✦
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--color-black)", minHeight: "100vh" }}
    >
      {/* Bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 70% 50%, rgba(196,30,58,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Section header */}
      <div className="container mx-auto px-8 md:px-16 max-w-7xl pt-32 pb-20">
        <div className="flex items-center gap-6 mb-12">
          <div
            className="font-display italic"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "rgba(201,169,110,0.2)", lineHeight: 1 }}
          >
            05
          </div>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, var(--color-gold), transparent)" }} />
          <p className="text-xs tracking-[0.4em] uppercase font-accent" style={{ color: "var(--color-gold)", fontWeight: 300 }}>
            Voices
          </p>
        </div>

        <div ref={headerRef} aria-label="They Speak">
          {["They", "Speak."].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <div
                className="tm-word font-display italic"
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 9rem)",
                  lineHeight: 0.95,
                  color: i === 1 ? "var(--color-rose)" : "var(--color-ivory)",
                  display: "block",
                }}
              >
                {word}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal scroll cards */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center gap-8 px-16"
          style={{ width: "max-content", paddingBottom: "4rem" }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              data-rotate={t.offset.rotate}
              className="flex-shrink-0 relative gpu"
              style={{
                width: "clamp(300px, 32vw, 400px)",
                opacity: 0,
                marginTop: i % 2 === 0 ? 0 : 60,
              }}
            >
              <div
                className="p-8 flex flex-col gap-6 border relative overflow-hidden"
                style={{
                  backgroundColor: "rgba(18,13,15,0.95)",
                  borderColor: "rgba(201,169,110,0.15)",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    borderColor: "rgba(201,169,110,0.4)",
                    boxShadow: "0 20px 60px rgba(139,0,0,0.15)",
                    duration: 0.4,
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    borderColor: "rgba(201,169,110,0.15)",
                    boxShadow: "none",
                    duration: 0.4,
                  });
                }}
              >
                {/* Large quote mark */}
                <div
                  className="absolute -top-2 -left-2 font-display"
                  style={{ fontSize: "8rem", color: "rgba(201,169,110,0.04)", lineHeight: 1 }}
                >
                  "
                </div>

                {/* Stars */}
                <div className="flex gap-1 text-xs">{stars(t.rating)}</div>

                {/* Quote */}
                <blockquote
                  className="font-display italic leading-relaxed"
                  style={{
                    fontSize: "1.15rem",
                    color: "var(--color-ivory)",
                    lineHeight: 1.6,
                  }}
                >
                  "{t.quote}"
                </blockquote>

                {/* Shade tag */}
                <div
                  className="inline-flex items-center gap-2 self-start"
                  style={{
                    border: "1px solid rgba(201,169,110,0.2)",
                    padding: "4px 12px",
                  }}
                >
                  <span
                    className="text-xs tracking-[0.2em] uppercase font-accent"
                    style={{ color: "var(--color-gold)", fontWeight: 300 }}
                  >
                    {t.shade}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-2 border-t" style={{ borderColor: "rgba(201,169,110,0.1)" }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border font-display italic"
                    style={{
                      borderColor: "rgba(201,169,110,0.3)",
                      color: "var(--color-gold)",
                      fontSize: "1rem",
                      backgroundColor: "rgba(201,169,110,0.05)",
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-body text-sm" style={{ color: "var(--color-champagne)" }}>
                      {t.name}
                    </p>
                    <p
                      className="text-xs font-accent"
                      style={{ color: "rgba(245,230,200,0.35)", fontWeight: 300 }}
                    >
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
