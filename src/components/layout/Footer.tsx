"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const NAV_COLUMNS = [
  {
    heading: "Collection",
    links: ["Crimson Reverie", "Blush Nocturne", "Gold Séduction", "Noir Obsession", "All Shades"],
  },
  {
    heading: "Rituals",
    links: ["Lip Treatment", "Custom Shade", "The Finish", "Fragrance Story"],
  },
  {
    heading: "Maison",
    links: ["Our Story", "Atelier", "Sustainability", "Press"],
  },
];

const SOCIALS = ["Instagram", "Pinterest", "TikTok"];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      /* Top line */
      gsap.fromTo(
        topLineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1, duration: 1.8, ease: "power3.out",
          scrollTrigger: { trigger: footer, start: "top 90%" },
        }
      );

      /* Logo */
      gsap.fromTo(
        logoRef.current,
        { y: 30, opacity: 0, filter: "blur(6px)" },
        {
          y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: footer, start: "top 85%" },
        }
      );

      /* Nav columns stagger */
      const cols = navRef.current ? Array.from(navRef.current.children) : [];
      gsap.fromTo(
        cols,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: footer, start: "top 80%" },
        }
      );

      /* Big ghost text */
      gsap.fromTo(
        bigTextRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.6, ease: "power4.out",
          scrollTrigger: { trigger: bigTextRef.current, start: "top 92%" },
        }
      );

      /* Bottom bar */
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: bottomRef.current, start: "top 96%" },
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
      {/* Very subtle background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 15% 90%, rgba(80,14,30,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Top separator */}
      <div
        ref={topLineRef}
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, var(--color-gold), rgba(201,168,152,0.2), transparent)",
        }}
      />

      <div
        className="vk-container"
        style={{
          paddingTop:    "clamp(5rem, 8vh, 8rem)",
          paddingBottom: "clamp(3rem, 5vh, 4rem)",
        }}
      >
        {/* ── Brand block ── */}
        <div
          ref={logoRef}
          className="opacity-0"
          style={{ marginBottom: "clamp(4rem, 7vh, 6rem)" }}
        >
          <h2
            className="font-display italic"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              color: "var(--color-ivory)",
              lineHeight: 1,
              letterSpacing: "-0.01em",
            }}
          >
            Velvet
            <span style={{ color: "var(--color-gold)" }}> Kiss</span>
          </h2>
          <p
            className="font-accent"
            style={{
              fontSize: "var(--t-label)",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "rgba(201,168,152,0.38)",
              fontWeight: 300,
              marginTop: "var(--sp-3)",
            }}
          >
            Maison de Beauté · Est. 2024 · Paris
          </p>
        </div>

        {/* ── Navigation columns ── */}
        <div
          ref={navRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(2rem, 5vw, 5rem)",
            marginBottom: "clamp(5rem, 8vh, 7rem)",
          }}
        >
          {NAV_COLUMNS.map(({ heading, links }) => (
            <div key={heading}>
              <p
                className="font-accent"
                style={{
                  fontSize: "var(--t-label)",
                  letterSpacing: "0.42em",
                  textTransform: "uppercase",
                  color: "var(--color-gold)",
                  fontWeight: 400,
                  marginBottom: "var(--sp-4)",
                }}
              >
                {heading}
              </p>
              <ul
                className="list-none"
                style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)" }}
              >
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body"
                      style={{
                        fontSize: "var(--t-body)",
                        color: "rgba(250,246,240,0.38)",
                        display: "block",
                        letterSpacing: "0.02em",
                      }}
                      onMouseEnter={(e) =>
                        gsap.to(e.currentTarget, {
                          color: "var(--color-ivory)",
                          x: 6,
                          duration: 0.3,
                        })
                      }
                      onMouseLeave={(e) =>
                        gsap.to(e.currentTarget, {
                          color: "rgba(250,246,240,0.38)",
                          x: 0,
                          duration: 0.3,
                        })
                      }
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Ghost brand name ── */}
        <div
          ref={bigTextRef}
          className="overflow-hidden opacity-0"
          style={{ marginBottom: "clamp(3rem, 5vh, 4.5rem)" }}
        >
          <div
            className="font-display italic select-none pointer-events-none"
            style={{
              fontSize: "clamp(4rem, 14vw, 16rem)",
              color: "rgba(201,168,152,0.035)",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
              whiteSpace: "nowrap",
            }}
          >
            Velvet Kiss
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          ref={bottomRef}
          className="opacity-0"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--sp-4)",
          }}
        >
          {/* Top rule */}
          <div
            className="h-px w-full"
            style={{ backgroundColor: "rgba(201,168,152,0.08)" }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "var(--sp-3)",
              paddingTop: "var(--sp-2)",
            }}
          >
            <p
              className="font-accent"
              style={{
                fontSize: "var(--t-label)",
                color: "rgba(245,230,200,0.22)",
                fontWeight: 300,
                letterSpacing: "0.12em",
              }}
            >
              © 2024 Velvet Kiss. All rights reserved.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-5)" }}>
              {SOCIALS.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="font-accent"
                  style={{
                    fontSize: "var(--t-label)",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(245,230,200,0.22)",
                    fontWeight: 300,
                  }}
                  onMouseEnter={(e) =>
                    gsap.to(e.currentTarget, { color: "var(--color-gold)", duration: 0.3 })
                  }
                  onMouseLeave={(e) =>
                    gsap.to(e.currentTarget, {
                      color: "rgba(245,230,200,0.22)",
                      duration: 0.3,
                    })
                  }
                >
                  {s}
                </a>
              ))}
            </div>

            <p
              className="font-accent"
              style={{
                fontSize: "var(--t-label)",
                color: "rgba(245,230,200,0.22)",
                fontWeight: 300,
                letterSpacing: "0.12em",
              }}
            >
              Crafted with desire
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
