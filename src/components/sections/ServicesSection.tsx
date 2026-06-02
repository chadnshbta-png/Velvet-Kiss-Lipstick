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
    accentRgb: "201,168,152",
  },
  {
    id: "02",
    title: "The Colour",
    subtitle: "Custom Shade",
    description:
      "Our master colourists blend a bespoke shade uniquely yours. From deep crimson to barely-there blush — your lip colour, your identity.",
    icon: "◈",
    accent: "var(--color-rose)",
    accentRgb: "196,30,58",
  },
  {
    id: "03",
    title: "The Finish",
    subtitle: "Luxury Formula",
    description:
      "Velvet matte, glass gloss, satin sheer — our finish atelier ensures your lips command every room, from dawn to midnight.",
    icon: "◉",
    accent: "var(--color-blush)",
    accentRgb: "232,180,184",
  },
  {
    id: "04",
    title: "The Essence",
    subtitle: "Fragrance Story",
    description:
      "Each shade carries a signature scent note. Rose de Grasse, Oud Noire, Jasmin Absolue — wear a fragrance on your lips.",
    icon: "✧",
    accent: "var(--color-champagne)",
    accentRgb: "237,213,200",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

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
            stagger: 0.1,
            duration: 1.6,
            ease: "power4.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 82%" },
          }
        );
      }

      /* ── Cards: one at a time, sequential reveal ── */
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const total = cards.length;

      // All cards start hidden except first
      gsap.set(cards, { opacity: 0, y: 90, scale: 0.88, filter: "blur(8px)" });

      // Scroll distance: 1.8 * vh per card = generous breathing room
      const perCard = window.innerHeight * 1.8;
      const totalDist = perCard * (total + 0.5);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: `+=${totalDist}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        const offset = i * (1 / total);
        const exitStart = offset + 0.65 / total * total;

        // Enter: rise from below, unblur
        tl.fromTo(
          card,
          { opacity: 0, y: 90, scale: 0.88, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.18,
            ease: "power3.out",
          },
          offset
        );

        // Hold (implicit — card stays while progress moves through hold zone)

        // Exit: drift up and fade (except last card)
        if (i < total - 1) {
          tl.to(
            card,
            {
              opacity: 0,
              y: -70,
              scale: 0.94,
              filter: "blur(6px)",
              duration: 0.16,
              ease: "power2.in",
            },
            exitStart
          );
        }
      });

      /* ── Counter + progress bar sync ── */
      ScrollTrigger.create({
        trigger: stageRef.current,
        start: "top top",
        end: `+=${totalDist}`,
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.min(total - 1, Math.floor(self.progress * total));
          if (counterRef.current) {
            counterRef.current.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
          }
          if (progressBarRef.current) {
            gsap.set(progressBarRef.current, {
              scaleX: (idx + 1) / total,
              transformOrigin: "left",
            });
          }
        },
      });
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
      {/* Section header — sits above pinned stage */}
      <div className="vk-section-header">
        <div className="vk-strip">
          <span className="vk-strip-num">02</span>
          <div className="vk-strip-line" />
          <span className="vk-strip-label">Our Rituals</span>
        </div>

        <div ref={headerRef} aria-label="The Velvet Rituals">
          {["The Velvet", "Rituals"].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <div
                className="h-word font-display italic"
                style={{
                  fontSize: "var(--t-display)",
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

      {/* Pinned stage — full viewport, one card at a time */}
      <div
        ref={stageRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundColor: "var(--color-deep)",
          perspective: "1400px",
        }}
      >
        {/* Subtle stage accent — single soft centre glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(90,18,38,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Cards — centered, one visible at a time */}
        {SERVICES.map((service, i) => (
          <div
            key={service.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute gpu"
            style={{
              width: "clamp(300px, 38vw, 540px)",
              opacity: 0,
            }}
          >
            <div
              className="relative flex flex-col border"
              style={{
                backgroundColor: "rgba(13, 9, 16, 0.92)",
                borderColor: `rgba(${service.accentRgb},0.18)`,
                backdropFilter: "blur(16px)",
                padding: "clamp(2rem,4vw,3.5rem)",
                minHeight: "clamp(320px, 44vh, 480px)",
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  borderColor: service.accent,
                  boxShadow: `0 0 60px rgba(${service.accentRgb},0.14), inset 0 0 40px rgba(${service.accentRgb},0.04)`,
                  duration: 0.5,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  borderColor: `rgba(${service.accentRgb},0.18)`,
                  boxShadow: "none",
                  duration: 0.5,
                });
              }}
            >
              {/* Large ghost number */}
              <div
                className="absolute top-5 right-7 font-display italic select-none pointer-events-none"
                style={{
                  fontSize: "5.5rem",
                  color: `rgba(${service.accentRgb},0.05)`,
                  lineHeight: 1,
                }}
              >
                {service.id}
              </div>

              {/* Icon */}
              <div
                className="mb-6 text-3xl"
                style={{ color: service.accent }}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3
                className="font-display italic mb-1"
                style={{
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  color: "var(--color-ivory)",
                  lineHeight: 1.1,
                }}
              >
                {service.title}
              </h3>
              <p
                className="text-xs tracking-[0.35em] uppercase font-accent mb-7"
                style={{ color: service.accent, fontWeight: 300 }}
              >
                {service.subtitle}
              </p>

              {/* Divider */}
              <div
                className="mb-7 h-px"
                style={{
                  background: `linear-gradient(to right, rgba(${service.accentRgb},0.4), transparent)`,
                }}
              />

              {/* Description */}
              <p
                className="font-body leading-relaxed mt-auto"
                style={{
                  color: "rgba(250,246,240,0.6)",
                  fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
                  letterSpacing: "0.02em",
                  maxWidth: "40ch",
                }}
              >
                {service.description}
              </p>
            </div>
          </div>
        ))}

        {/* Bottom HUD: counter + progress */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{ width: "clamp(160px, 20vw, 240px)" }}
        >
          <div
            ref={counterRef}
            className="font-accent text-xs tracking-[0.4em]"
            style={{ color: "rgba(201,168,152,0.4)", fontWeight: 300 }}
          >
            01 / 04
          </div>
          <div
            className="w-full h-px"
            style={{ backgroundColor: "rgba(201,168,152,0.1)" }}
          >
            <div
              ref={progressBarRef}
              className="h-full gpu"
              style={{
                backgroundColor: "var(--color-gold)",
                transformOrigin: "left",
                transform: "scaleX(0.25)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
