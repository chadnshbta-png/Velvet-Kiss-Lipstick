"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const FOOTER_LINKS = {
  Collection: ["Crimson Reverie", "Blush Nocturne", "Gold Séduction", "Noir Obsession", "All Shades"],
  Rituals: ["Lip Treatment", "Custom Shade", "The Finish", "Fragrance Story"],
  Maison: ["Our Story", "Atelier", "Sustainability", "Press", "Careers"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Settings", "Accessibility"],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      /* ── Top line expand ── */
      gsap.fromTo(
        topLineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: { trigger: footer, start: "top 85%" },
        }
      );

      /* ── Logo ── */
      gsap.fromTo(
        logoRef.current,
        { y: 40, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: footer, start: "top 80%" },
        }
      );

      /* ── Columns stagger ── */
      const cols = colRefs.current.filter(Boolean) as HTMLDivElement[];
      gsap.fromTo(
        cols,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: footer, start: "top 75%" },
        }
      );

      /* ── Big text reveal ── */
      gsap.fromTo(
        bigTextRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: { trigger: bigTextRef.current, start: "top 90%" },
        }
      );

      /* ── Bottom bar ── */
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: bottomRef.current, start: "top 95%" },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--color-deep)" }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 20% 80%, rgba(139,0,0,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Top line */}
      <div
        ref={topLineRef}
        className="h-px w-full"
        style={{ background: "linear-gradient(to right, var(--color-gold), rgba(201,168,152,0.3), transparent)" }}
      />

      <div className="container mx-auto px-8 md:px-16 max-w-7xl pt-20 pb-10">
        {/* Logo + tagline */}
        <div ref={logoRef} className="mb-16 opacity-0">
          <h2
            className="font-display italic"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              color: "var(--color-ivory)",
              lineHeight: 1,
            }}
          >
            Velvet
            <span style={{ color: "var(--color-gold)" }}> Kiss</span>
          </h2>
          <p
            className="text-xs tracking-[0.5em] uppercase font-accent mt-3"
            style={{ color: "rgba(201,168,152,0.5)", fontWeight: 300 }}
          >
            Maison de Beauté · Est. 2024 · Paris
          </p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
          {Object.entries(FOOTER_LINKS).map(([category, links], i) => (
            <div
              key={category}
              ref={(el) => { colRefs.current[i] = el; }}
              className="opacity-0"
            >
              <h4
                className="text-xs tracking-[0.4em] uppercase font-accent mb-6"
                style={{ color: "var(--color-gold)", fontWeight: 400 }}
              >
                {category}
              </h4>
              <ul className="space-y-3 list-none">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm font-body transition-colors duration-300"
                      style={{ color: "rgba(245,230,200,0.45)" }}
                      onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, { color: "var(--color-champagne)", x: 4, duration: 0.25 });
                      }}
                      onMouseLeave={(e) => {
                        gsap.to(e.currentTarget, { color: "rgba(245,230,200,0.45)", x: 0, duration: 0.25 });
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="py-10 border-t border-b mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          style={{ borderColor: "rgba(201,168,152,0.1)" }}
        >
          <div>
            <h3
              className="font-display italic"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "var(--color-ivory)", lineHeight: 1.2 }}
            >
              The Inner Circle
            </h3>
            <p className="font-body text-sm mt-2" style={{ color: "rgba(245,230,200,0.45)" }}>
              First access to new shades, private events, and the world of Velvet Kiss.
            </p>
          </div>
          <div className="flex gap-0">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-4 bg-transparent border text-sm font-body outline-none"
              style={{
                borderColor: "rgba(201,168,152,0.2)",
                color: "var(--color-ivory)",
                fontFamily: "var(--font-body)",
              }}
            />
            <button
              className="px-8 py-4 text-xs tracking-[0.3em] uppercase font-accent"
              style={{
                backgroundColor: "var(--color-gold)",
                color: "var(--color-black)",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => gsap.to(e.currentTarget, { backgroundColor: "var(--color-champagne)", duration: 0.3 })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { backgroundColor: "var(--color-gold)", duration: 0.3 })}
            >
              Join
            </button>
          </div>
        </div>

        {/* Big decorative text */}
        <div ref={bigTextRef} className="overflow-hidden opacity-0 mb-12">
          <div
            className="font-display italic select-none pointer-events-none"
            style={{
              fontSize: "clamp(4rem, 14vw, 16rem)",
              color: "rgba(201,168,152,0.04)",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
              whiteSpace: "nowrap",
            }}
          >
            Velvet Kiss
          </div>
        </div>

        {/* Bottom bar */}
        <div
          ref={bottomRef}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t opacity-0"
          style={{ borderColor: "rgba(201,168,152,0.08)" }}
        >
          <p
            className="text-xs font-accent"
            style={{ color: "rgba(245,230,200,0.25)", fontWeight: 300, letterSpacing: "0.1em" }}
          >
            © 2024 Velvet Kiss Maison de Beauté. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-6">
            {["Instagram", "TikTok", "Pinterest", "LinkedIn"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs tracking-[0.2em] uppercase font-accent"
                style={{ color: "rgba(245,230,200,0.25)", fontWeight: 300 }}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { color: "var(--color-gold)", duration: 0.3 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { color: "rgba(245,230,200,0.25)", duration: 0.3 })}
              >
                {social}
              </a>
            ))}
          </div>

          <p
            className="text-xs font-accent"
            style={{ color: "rgba(245,230,200,0.25)", fontWeight: 300, letterSpacing: "0.1em" }}
          >
            Crafted with desire
          </p>
        </div>
      </div>
    </footer>
  );
}
