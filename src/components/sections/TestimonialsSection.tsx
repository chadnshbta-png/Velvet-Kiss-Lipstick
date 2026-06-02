"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Isabelle M.",
    role: "Creative Director, Paris",
    quote:
      "Velvet Kiss isn't a product — it is armour. The moment I wear Crimson Reverie, I become untouchable.",
    shade: "Crimson Reverie",
    rating: 5,
    rotate: -1.8,
    driftX: 6,
    driftY: 12,
    driftDuration: 4.2,
  },
  {
    id: 2,
    name: "Sofia A.",
    role: "Model, Milan",
    quote:
      "I have tried every luxury lipstick. Nothing compares to the way Velvet Kiss holds colour through a 14-hour show.",
    shade: "Noir Obsession",
    rating: 5,
    rotate: 1.2,
    driftX: -8,
    driftY: 9,
    driftDuration: 5.1,
  },
  {
    id: 3,
    name: "Camille R.",
    role: "Editor, Vogue France",
    quote:
      "The Gold Séduction catches every light in the room. I wore it to the Met — three photographers asked what I had on my lips.",
    shade: "Gold Séduction",
    rating: 5,
    rotate: -0.8,
    driftX: 5,
    driftY: 14,
    driftDuration: 3.8,
  },
  {
    id: 4,
    name: "Yuki T.",
    role: "Beauty Influencer, Tokyo",
    quote:
      "The formula is unlike anything I have experienced. Moisturising, long-lasting, and the scent is absolutely divine.",
    shade: "Blush Nocturne",
    rating: 5,
    rotate: 1.8,
    driftX: -6,
    driftY: 10,
    driftDuration: 4.7,
  },
  {
    id: 5,
    name: "Amara O.",
    role: "Entrepreneur, Lagos",
    quote:
      "When I open that velvet case and hold the tube, I already feel elevated. It is the ritual that sets my day.",
    shade: "Crimson Reverie",
    rating: 5,
    rotate: -1.2,
    driftX: 7,
    driftY: 11,
    driftDuration: 4.4,
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const floatTweens = useRef<gsap.core.Tween[]>([]);
  const driftXTweens = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ── Header ── */
      gsap.fromTo(
        headerRef.current
          ? Array.from(headerRef.current.querySelectorAll(".tm-word"))
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
          end: `+=${totalWidth * 1.3}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      /* ── Cards entrance ── */
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      cards.forEach((card, i) => {
        // Initial entrance from below
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, rotateZ: 0 },
          {
            y: 0,
            opacity: 1,
            rotateZ: TESTIMONIALS[i].rotate,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: `top+=${i * 60} top`,
              toggleActions: "play none none none",
            },
            delay: i * 0.06,
          }
        );

        /* ── Continuous multi-axis drift ── */
        const t = TESTIMONIALS[i];

        const yTween = gsap.to(card, {
          y: `+=${t.driftY}`,
          rotateZ: `+=${0.6 + (i % 2) * 0.7}`,
          duration: t.driftDuration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.35,
        });
        floatTweens.current.push(yTween);

        // Subtle horizontal drift — offset phase per card
        const xTween = gsap.to(card, {
          x: `+=${t.driftX}`,
          duration: t.driftDuration * 1.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5 + 0.8,
        });
        driftXTweens.current.push(xTween);
      });
    }, section);

    return () => {
      floatTweens.current.forEach((t) => t.kill());
      driftXTweens.current.forEach((t) => t.kill());
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
      {/* Subtle warm accent — mauve glow at right, barely perceptible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 70% 50%, rgba(100,38,60,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Section header */}
      <div className="vk-section-header">
        <div className="vk-strip">
          <span className="vk-strip-num">05</span>
          <div className="vk-strip-line" />
          <span className="vk-strip-label">Voices</span>
        </div>

        <div ref={headerRef} aria-label="They Speak">
          {["They", "Speak."].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <div
                className="tm-word font-display italic"
                style={{
                  fontSize: "var(--t-display)",
                  lineHeight: 0.95,
                  color:
                    i === 1 ? "var(--color-rose)" : "var(--color-ivory)",
                  display: "block",
                }}
              >
                {word}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div className="overflow-hidden" style={{ paddingBottom: "5rem" }}>
        <div
          ref={trackRef}
          className="flex items-center scrollbar-hide"
          style={{
            width: "max-content",
            gap: "clamp(1.5rem, 3vw, 2.5rem)",
            paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
            paddingRight: "clamp(1.5rem, 5vw, 5rem)",
            alignItems: "flex-start",
            paddingTop: "2rem",
            paddingBottom: "3rem",
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="flex-shrink-0 gpu"
              style={{
                width: "clamp(280px, 82vw, 400px)",
                opacity: 0,
                marginTop: i % 2 === 0 ? 0 : "clamp(2.5rem, 5vw, 4rem)",
              }}
              onMouseEnter={(e) => {
                const cardEl = e.currentTarget;
                const fi = cardRefs.current.indexOf(cardEl);
                // Pause drift
                floatTweens.current[fi]?.pause();
                driftXTweens.current[fi]?.pause();
                gsap.to(cardEl, {
                  scale: 1.04,
                  y: -12,
                  rotateZ: 0,
                  boxShadow:
                    "0 32px 80px rgba(139,0,0,0.2), 0 8px 24px rgba(46,16,32,0.3)",
                  duration: 0.5,
                  ease: "power3.out",
                });
                // Card inner border
                const inner = cardEl.querySelector(".card-inner") as HTMLElement;
                if (inner) {
                  gsap.to(inner, {
                    borderColor: "rgba(201,168,152,0.45)",
                    duration: 0.4,
                  });
                }
              }}
              onMouseLeave={(e) => {
                const cardEl = e.currentTarget;
                const fi = cardRefs.current.indexOf(cardEl);
                gsap.to(cardEl, {
                  scale: 1,
                  y: 0,
                  rotateZ: t.rotate,
                  boxShadow: "none",
                  duration: 0.6,
                  ease: "power3.out",
                  onComplete: () => {
                    floatTweens.current[fi]?.play();
                    driftXTweens.current[fi]?.play();
                  },
                });
                const inner = cardEl.querySelector(".card-inner") as HTMLElement;
                if (inner) {
                  gsap.to(inner, {
                    borderColor: "rgba(201,168,152,0.14)",
                    duration: 0.4,
                  });
                }
              }}
            >
              <div
                className="card-inner flex flex-col border relative overflow-hidden"
                style={{
                  backgroundColor: "rgba(13,9,16,0.96)",
                  borderColor: "rgba(201,168,152,0.14)",
                  backdropFilter: "blur(12px)",
                  padding: "clamp(2rem, 3.5vw, 3rem)",
                  gap: "var(--sp-4)",                   /* 32px — clear breathing between each element */
                }}
              >
                {/* Ambient quote mark */}
                <div
                  className="absolute -top-3 -left-1 font-display select-none pointer-events-none"
                  style={{
                    fontSize: "9rem",
                    color: "rgba(201,168,152,0.035)",
                    lineHeight: 1,
                  }}
                >
                  "
                </div>

                {/* Stars */}
                <div className="flex gap-1 text-xs">{stars(t.rating)}</div>

                {/* Quote */}
                <blockquote
                  className="font-display italic leading-relaxed relative z-10"
                  style={{
                    fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                    color: "var(--color-ivory)",
                    lineHeight: 1.65,
                  }}
                >
                  "{t.quote}"
                </blockquote>

                {/* Shade tag */}
                <div
                  className="inline-flex items-center gap-2 self-start"
                  style={{
                    border: "1px solid rgba(201,168,152,0.2)",
                    padding: "7px 18px",
                  }}
                >
                  <span
                    className="text-xs tracking-[0.22em] uppercase font-accent"
                    style={{ color: "var(--color-gold)", fontWeight: 300 }}
                  >
                    {t.shade}
                  </span>
                </div>

                {/* Author */}
                <div
                  className="flex items-center gap-4 border-t"
                  style={{ borderColor: "rgba(201,168,152,0.1)", paddingTop: "var(--sp-3)" }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center border font-display italic flex-shrink-0"
                    style={{
                      borderColor: "rgba(201,168,152,0.3)",
                      color: "var(--color-gold)",
                      fontSize: "0.95rem",
                      backgroundColor: "rgba(201,168,152,0.06)",
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p
                      className="font-body text-sm"
                      style={{ color: "var(--color-champagne)" }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-xs font-accent mt-0.5"
                      style={{ color: "rgba(237,213,200,0.35)", fontWeight: 300 }}
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
