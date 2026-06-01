"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "@/lib/gsap-config";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ── Background pulse ── */
      gsap.to(bgRef.current, {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      /* ── Staggered reveal ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
        },
      });

      tl.fromTo(
        numberRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      tl.fromTo(
        preRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

      [line1Ref, line2Ref, line3Ref].forEach((ref, i) => {
        const words = ref.current?.querySelectorAll(".cta-word");
        if (!words) return;
        tl.fromTo(
          words,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            stagger: 0.05,
            duration: 1.2,
            ease: "power4.out",
          },
          `-=${i === 0 ? 0.3 : 0.8}`
        );
      });

      tl.fromTo(
        ctaGroupRef.current?.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );

      tl.fromTo(
        decorRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.6)" },
        "-=0.8"
      );

      /* ── Gold line decoration animation ── */
      gsap.fromTo(
        section.querySelectorAll(".cta-line"),
        { scaleX: 0, transformOrigin: "center" },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 60%" },
          stagger: 0.1,
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const words = {
    line1: ["Own", "The"],
    line2: ["Room."],
    line3: ["Own", "The", "Moment."],
  };

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-32"
      style={{ backgroundColor: "var(--color-black)" }}
    >
      {/* Background gradient pulse */}
      <div
        ref={bgRef}
        className="absolute inset-0 gpu"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,0,0,0.15) 0%, rgba(10,6,8,0) 70%)",
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Center decorative circle */}
      <div
        ref={decorRef}
        className="absolute gpu"
        style={{
          width: "min(60vw, 600px)",
          height: "min(60vw, 600px)",
          borderRadius: "50%",
          border: "1px solid rgba(201,169,110,0.06)",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <div
          className="absolute inset-6 rounded-full"
          style={{ border: "1px solid rgba(201,169,110,0.04)" }}
        />
        <div
          className="absolute inset-12 rounded-full"
          style={{ border: "1px solid rgba(201,169,110,0.03)" }}
        />
      </div>

      <div className="container mx-auto px-8 md:px-16 max-w-7xl relative z-10">
        {/* Section number + line */}
        <div className="flex items-center gap-6 mb-16">
          <div
            ref={numberRef}
            className="font-display italic opacity-0"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "rgba(201,169,110,0.2)", lineHeight: 1 }}
          >
            06
          </div>
          <div className="cta-line flex-1 h-px" style={{ background: "linear-gradient(to right, var(--color-gold), transparent)" }} />
        </div>

        {/* Pre-label */}
        <p
          ref={preRef}
          className="text-xs tracking-[0.6em] uppercase font-accent mb-8 opacity-0"
          style={{ color: "var(--color-gold)", fontWeight: 300 }}
        >
          Your Signature Awaits
        </p>

        {/* Large typographic headline */}
        <div className="text-left md:text-center">
          <div ref={line1Ref} aria-label="Own The">
            <div className="flex flex-wrap gap-4 md:justify-center">
              {words.line1.map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <div
                    className="cta-word font-display italic"
                    style={{
                      fontSize: "clamp(5rem, 15vw, 16rem)",
                      lineHeight: 0.88,
                      color: "var(--color-ivory)",
                      display: "block",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {word}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={line2Ref} aria-label="Room.">
            <div className="overflow-hidden">
              <div
                className="cta-word font-display italic"
                style={{
                  fontSize: "clamp(5rem, 15vw, 16rem)",
                  lineHeight: 0.88,
                  color: "var(--color-gold)",
                  display: "block",
                  letterSpacing: "-0.03em",
                  textShadow: "0 0 120px rgba(201,169,110,0.15)",
                }}
              >
                {words.line2[0]}
              </div>
            </div>
          </div>

          <div ref={line3Ref} aria-label="Own The Moment.">
            <div className="flex flex-wrap gap-4 md:justify-center">
              {words.line3.map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <div
                    className="cta-word font-display italic"
                    style={{
                      fontSize: "clamp(3rem, 8vw, 9rem)",
                      lineHeight: 1,
                      color: i === 0 ? "rgba(245,230,200,0.5)" : i === 1 ? "rgba(245,230,200,0.3)" : "rgba(245,230,200,0.15)",
                      display: "block",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {word}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA group */}
        <div
          ref={ctaGroupRef}
          className="mt-16 flex flex-col sm:flex-row items-center gap-6 md:justify-center"
        >
          <MagneticButton
            className="relative overflow-hidden text-sm tracking-[0.35em] uppercase font-accent px-12 py-5 gpu"
            style={{
              backgroundColor: "var(--color-gold)",
              color: "var(--color-black)",
              fontWeight: 500,
            } as React.CSSProperties}
          >
            <span className="relative z-10">Shop the Collection</span>
            <div
              className="absolute inset-0 gpu"
              style={{
                background: "linear-gradient(135deg, var(--color-champagne) 0%, var(--color-gold) 50%, var(--color-crimson) 100%)",
                opacity: 0,
                transition: "opacity 0.4s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "1"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "0"; }}
            />
          </MagneticButton>

          <MagneticButton
            className="text-sm tracking-[0.35em] uppercase font-accent px-12 py-5 border"
            style={{
              borderColor: "rgba(201,169,110,0.4)",
              color: "var(--color-champagne)",
              fontWeight: 300,
            } as React.CSSProperties}
          >
            Book a Consultation
          </MagneticButton>
        </div>

        {/* Bottom divider */}
        <div className="cta-line mt-20 h-px w-full" style={{ background: "linear-gradient(to right, transparent, var(--color-gold), transparent)" }} />

        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs tracking-[0.3em] uppercase font-accent" style={{ color: "rgba(245,230,200,0.25)", fontWeight: 300 }}>
            Free worldwide shipping
          </p>
          <p className="text-xs tracking-[0.3em] uppercase font-accent" style={{ color: "rgba(245,230,200,0.25)", fontWeight: 300 }}>
            Luxury packaging
          </p>
          <p className="text-xs tracking-[0.3em] uppercase font-accent hidden md:block" style={{ color: "rgba(245,230,200,0.25)", fontWeight: 300 }}>
            30-day returns
          </p>
        </div>
      </div>
    </section>
  );
}
