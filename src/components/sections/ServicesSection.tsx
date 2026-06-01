"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "@/lib/gsap-config";

const SERVICES = [
  {
    id: "01",
    title: "The Ritual",
    subtitle: "Lip Treatment",
    description:
      "A deeply nourishing ceremony that transforms your lips. Infused with hyaluronic spheres and 24K gold leaf, this treatment sculpts and perfects.",
    icon: "✦",
    accent: "var(--color-gold)",
  },
  {
    id: "02",
    title: "The Colour",
    subtitle: "Custom Shade",
    description:
      "Our master colourists blend a bespoke shade uniquely yours. From deep crimson to barely-there blush — your lip colour, your identity.",
    icon: "◈",
    accent: "var(--color-rose)",
  },
  {
    id: "03",
    title: "The Finish",
    subtitle: "Luxury Formula",
    description:
      "Velvet matte, glass gloss, satin sheeer — our finish atelier ensures your lips command every room, from dawn to midnight.",
    icon: "◉",
    accent: "var(--color-blush)",
  },
  {
    id: "04",
    title: "The Essence",
    subtitle: "Fragrance Story",
    description:
      "Each shade carries a signature scent note. Rose de Grasse, Oud Noire, Jasmin Absolue — wear a fragrance on your lips.",
    icon: "✧",
    accent: "var(--color-champagne)",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ── Header reveal ── */
      const headerWords = headerRef.current?.querySelectorAll(".h-word");
      if (headerWords) {
        gsap.fromTo(
          headerWords,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            stagger: 0.08,
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
            },
          }
        );
      }

      /* ── Cards choreography — pinned scroll ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsWrapRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 4}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Initial state — all cards hidden
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(cards, { opacity: 0, scale: 0.8, y: 80, rotateX: 15 });
      gsap.set(cards[0], { x: 0 });
      gsap.set(cards[1], { x: -300 });
      gsap.set(cards[2], { x: 300 });
      gsap.set(cards[3], { x: 0, y: 120 });

      // Step 1: Center card rises
      tl.to(cards[0], {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        duration: 0.5,
        ease: "power3.out",
      });

      // Step 2: Left card slides in
      tl.to(
        cards[1],
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          duration: 0.45,
          ease: "power3.out",
        },
        "+=0.1"
      );

      // Step 3: Right card slides in
      tl.to(
        cards[2],
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          duration: 0.45,
          ease: "power3.out",
        },
        "-=0.3"
      );

      // Step 4: Cards reposition to a diamond/row
      tl.to(
        cards[0],
        { x: 0, y: -40, scale: 0.92, duration: 0.4, ease: "power2.inOut" },
        "+=0.1"
      );
      tl.to(
        cards[1],
        { x: -320, y: 0, scale: 0.88, duration: 0.4, ease: "power2.inOut" },
        "<"
      );
      tl.to(
        cards[2],
        { x: 320, y: 0, scale: 0.88, duration: 0.4, ease: "power2.inOut" },
        "<"
      );

      // Step 5: Fourth card rises
      tl.to(
        cards[3],
        {
          opacity: 1,
          scale: 0.88,
          y: 40,
          rotateX: 0,
          duration: 0.4,
          ease: "power3.out",
        },
        "-=0.1"
      );

      // Step 6: All spread to final grid
      tl.to(
        cards[0],
        { x: -480, y: -120, scale: 1, duration: 0.5, ease: "power3.inOut" },
        "+=0.15"
      );
      tl.to(
        cards[1],
        { x: -160, y: 120, scale: 1, duration: 0.5, ease: "power3.inOut" },
        "<"
      );
      tl.to(
        cards[2],
        { x: 160, y: -60, scale: 1, duration: 0.5, ease: "power3.inOut" },
        "<"
      );
      tl.to(
        cards[3],
        { x: 480, y: 80, scale: 1, duration: 0.5, ease: "power3.inOut" },
        "<"
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
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
            02
          </div>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, var(--color-gold), transparent)" }} />
          <p className="text-xs tracking-[0.4em] uppercase font-accent" style={{ color: "var(--color-gold)", fontWeight: 300 }}>
            Our Rituals
          </p>
        </div>

        <div ref={headerRef} aria-label="The Velvet Rituals">
          {["The Velvet", "Rituals"].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <div
                className="h-word font-display italic"
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 9rem)",
                  lineHeight: 0.95,
                  color: i === 0 ? "var(--color-ivory)" : "var(--color-gold)",
                  display: "block",
                }}
              >
                {word}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pinned cards stage */}
      <div
        ref={cardsWrapRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "var(--color-deep)", perspective: "1200px" }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,0,0,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Cards */}
        {SERVICES.map((service, i) => (
          <div
            key={service.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="absolute gpu"
            style={{
              width: "clamp(240px, 28vw, 320px)",
              opacity: 0,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="relative p-8 h-full flex flex-col gap-5 border group"
              style={{
                backgroundColor: "rgba(18, 13, 15, 0.9)",
                borderColor: "rgba(201,169,110,0.15)",
                backdropFilter: "blur(12px)",
                minHeight: 280,
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  borderColor: service.accent,
                  boxShadow: `0 0 40px ${service.accent}22`,
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
              {/* Card number */}
              <div
                className="absolute top-4 right-6 font-display italic"
                style={{ fontSize: "4rem", color: "rgba(201,169,110,0.06)", lineHeight: 1 }}
              >
                {service.id}
              </div>

              {/* Icon */}
              <div
                className="text-2xl"
                style={{ color: service.accent }}
              >
                {service.icon}
              </div>

              {/* Title */}
              <div>
                <h3
                  className="font-display italic"
                  style={{ fontSize: "1.8rem", color: "var(--color-ivory)", lineHeight: 1.1 }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-xs tracking-[0.3em] uppercase font-accent mt-1"
                  style={{ color: service.accent, fontWeight: 300 }}
                >
                  {service.subtitle}
                </p>
              </div>

              {/* Description */}
              <p
                className="font-body leading-relaxed text-sm mt-auto"
                style={{ color: "rgba(245,230,200,0.55)" }}
              >
                {service.description}
              </p>

              {/* Bottom line */}
              <div
                className="h-px w-0 group-hover:w-full transition-all duration-700"
                style={{ backgroundColor: service.accent }}
              />
            </div>
          </div>
        ))}

        {/* Scroll progress indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
          style={{ color: "rgba(201,169,110,0.4)" }}
        >
          <div className="w-8 h-px" style={{ backgroundColor: "currentColor" }} />
          <p className="text-xs tracking-[0.3em] uppercase font-accent" style={{ fontSize: "0.6rem", fontWeight: 300 }}>
            Scroll to discover
          </p>
          <div className="w-8 h-px" style={{ backgroundColor: "currentColor" }} />
        </div>
      </div>
    </section>
  );
}
