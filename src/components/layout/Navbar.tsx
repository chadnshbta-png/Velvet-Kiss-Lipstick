"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "@/lib/gsap-config";

const NAV_LINKS = [
  { label: "Story",       href: "#about" },
  { label: "Rituals",     href: "#services" },
  { label: "Collection",  href: "#products" },
  { label: "Film",        href: "#video" },
  { label: "Voices",      href: "#testimonials" },
];

export default function Navbar() {
  const navRef       = useRef<HTMLElement>(null);
  const navBgRef     = useRef<HTMLDivElement>(null);
  const linkRefs     = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuRef      = useRef<HTMLDivElement>(null);
  const menuItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const menuBotRef   = useRef<HTMLDivElement>(null);
  const line1Ref     = useRef<HTMLSpanElement>(null);
  const line2Ref     = useRef<HTMLSpanElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  /* ─────────────────────────────────────────
     Boot animations + scroll backdrop
  ───────────────────────────────────────── */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    /* Entrance */
    gsap.fromTo(
      nav,
      { y: -90, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.7, ease: "power4.out", delay: 0.5 }
    );

    /* Scroll: fade-in glass backdrop */
    const bgST = ScrollTrigger.create({
      start: "top -70",
      onEnter: () =>
        gsap.to(navBgRef.current, { opacity: 1, duration: 0.65, ease: "power2.out" }),
      onLeaveBack: () =>
        gsap.to(navBgRef.current, { opacity: 0, duration: 0.65, ease: "power2.out" }),
    });

    /* Nav link hover — growing centre underline */
    const cleanups: (() => void)[] = [];
    linkRefs.current
      .filter((el): el is HTMLAnchorElement => el !== null)
      .forEach((link) => {
        const ul = link.querySelector<HTMLElement>(".nav-ul");

        const onEnter = () => {
          gsap.to(link, { color: "var(--color-ivory)", duration: 0.28 });
          if (ul) gsap.to(ul, { scaleX: 1, duration: 0.42, ease: "power3.out" });
        };
        const onLeave = () => {
          gsap.to(link, { color: "rgba(44,31,34,0.46)", duration: 0.28 });
          if (ul) gsap.to(ul, { scaleX: 0, duration: 0.32, ease: "power2.in" });
        };

        link.addEventListener("mouseenter", onEnter);
        link.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          link.removeEventListener("mouseenter", onEnter);
          link.removeEventListener("mouseleave", onLeave);
        });
      });

    return () => {
      bgST.kill();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  /* ─────────────────────────────────────────
     Mobile menu
  ───────────────────────────────────────── */
  const openMenu = () => {
    setMenuOpen(true);
    const items = menuItemRefs.current.filter((el): el is HTMLLIElement => el !== null);

    gsap.set(menuRef.current, { pointerEvents: "all" });
    gsap.to(menuRef.current, { opacity: 1, duration: 0.55, ease: "power2.out" });
    gsap.set(items, { y: 70, opacity: 0 });
    gsap.to(items, {
      y: 0, opacity: 1,
      stagger: 0.08, duration: 0.95, ease: "power4.out", delay: 0.12,
    });
    gsap.set(menuBotRef.current, { y: 28, opacity: 0 });
    gsap.to(menuBotRef.current, {
      y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.52,
    });

    /* Lines → X */
    gsap.to(line1Ref.current, { y: 6, rotate: 45,  duration: 0.42, ease: "power3.inOut" });
    gsap.to(line2Ref.current, { y: -5, rotate: -45, left: 0, width: "100%", duration: 0.42, ease: "power3.inOut" });
  };

  const closeMenu = () => {
    const items = menuItemRefs.current.filter((el): el is HTMLLIElement => el !== null);
    const all   = [...items, menuBotRef.current].filter(Boolean);

    gsap.to(all, { y: -36, opacity: 0, stagger: 0.04, duration: 0.32, ease: "power2.in" });
    gsap.to(menuRef.current, {
      opacity: 0, duration: 0.42, ease: "power2.in", delay: 0.18,
      onComplete: () => {
        setMenuOpen(false);
        gsap.set(menuRef.current, { pointerEvents: "none" });
      },
    });

    /* X → Lines */
    gsap.to(line1Ref.current, { y: 0, rotate: 0, duration: 0.42, ease: "power3.inOut" });
    gsap.to(line2Ref.current, { y: 0, rotate: 0, left: "25%", width: "75%", duration: 0.42, ease: "power3.inOut" });
  };

  const toggleMenu = () => (menuOpen ? closeMenu() : openMenu());

  /* ─────────────────────────────────────────
     Render
  ───────────────────────────────────────── */
  return (
    <>
      {/* ══════════════════════ NAVBAR ══════════════════════ */}
      <nav
        ref={navRef}
        style={{
          position: "fixed", top: 0, left: 0, right: 0,
          zIndex: 100, opacity: 0,
        }}
      >
        {/* Glass backdrop — animated in on scroll */}
        <div
          ref={navBgRef}
          style={{
            position: "absolute", inset: 0, opacity: 0,
            backgroundColor: "rgba(250, 246, 241, 0.92)",
            backdropFilter: "blur(22px) saturate(140%)",
            WebkitBackdropFilter: "blur(22px) saturate(140%)",
            borderBottom: "1px solid rgba(155, 30, 50, 0.10)",
            pointerEvents: "none",
          }}
        />

        {/* Content row */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "var(--container-pad)",
            paddingRight: "var(--container-pad)",
            height: "5rem",
          }}
        >

          {/* ── Logo ── */}
          <a
            href="#hero"
            style={{ textDecoration: "none", flexShrink: 0, lineHeight: 1 }}
            onMouseEnter={(e) => gsap.to(e.currentTarget, { opacity: 0.68, duration: 0.3 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { opacity: 1, duration: 0.3 })}
          >
            <span
              className="font-display italic"
              style={{
                fontSize: "clamp(1.25rem, 1.7vw, 1.55rem)",
                color: "var(--color-ivory)",
                letterSpacing: "0.01em",
                lineHeight: 1,
              }}
            >
              Velvet
              <span style={{ color: "var(--color-gold)" }}> Kiss</span>
            </span>
          </a>

          {/* ── Desktop nav — truly centred via absolute ── */}
          <ul
            className="hidden md:flex"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              alignItems: "center",
              gap: "clamp(2rem, 3.5vw, 3.5rem)",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <li key={link.label}>
                <a
                  ref={(el) => { linkRefs.current[i] = el; }}
                  href={link.href}
                  style={{
                    position: "relative",
                    fontFamily: "var(--font-accent)",
                    fontSize: "var(--t-label)",
                    fontWeight: 300,
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    color: "rgba(44,31,34,0.46)",
                    textDecoration: "none",
                    display: "block",
                    paddingBottom: "4px",
                  }}
                >
                  {link.label}

                  {/* Hover underline — GSAP controlled */}
                  <span
                    className="nav-ul"
                    style={{
                      position: "absolute",
                      bottom: 0, left: 0, right: 0,
                      height: "1px",
                      backgroundColor: "var(--color-gold)",
                      transform: "scaleX(0)",
                      transformOrigin: "center",
                      display: "block",
                    }}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* ── Right group ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--sp-4)",
              flexShrink: 0,
            }}
          >

            {/* Desktop CTA */}
            <button
              className="hidden md:flex vk-btn vk-btn-sm vk-btn-ghost"
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, {
                  backgroundColor: "var(--color-gold)",
                  color: "#FAF6F1",
                  borderColor: "var(--color-gold)",
                  duration: 0.35,
                })
              }
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget, {
                  backgroundColor: "transparent",
                  color: "var(--color-gold)",
                  borderColor: "rgba(155,30,50,0.38)",
                  duration: 0.35,
                })
              }
            >
              Shop Now
            </button>

            {/* Mobile trigger — 44×44px tap area wrapping the two elegant lines */}
            <button
              className="flex md:hidden"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{
                /* 44×44 minimum touch target (WCAG 2.5.5) */
                width: "2.75rem",
                height: "2.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "none",
                border: "none",
                cursor: "none",
                flexShrink: 0,
                padding: 0,
              }}
            >
              {/* Lines container — 24×12px, centred inside the tap area */}
              <div style={{ position: "relative", width: "1.5rem", height: "0.75rem", flexShrink: 0 }}>
                <span
                  ref={line1Ref}
                  style={{
                    position: "absolute",
                    top: 0, left: 0,
                    width: "100%", height: "1px",
                    backgroundColor: "var(--color-gold)",
                  }}
                />
                <span
                  ref={line2Ref}
                  style={{
                    position: "absolute",
                    bottom: 0, left: "25%",
                    width: "75%", height: "1px",
                    backgroundColor: "var(--color-gold)",
                  }}
                />
              </div>
            </button>

          </div>
        </div>
      </nav>

      {/* ══════════════════ FULLSCREEN MOBILE MENU ══════════════════ */}
      <div
        ref={menuRef}
        style={{
          position: "fixed", inset: 0,
          zIndex: 99,
          opacity: 0,
          pointerEvents: "none",
          backgroundColor: "var(--color-black)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "var(--container-pad)",
          paddingRight: "var(--container-pad)",
          paddingTop: "6rem",
          paddingBottom: "3rem",
          overflow: "hidden",
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background:
              "radial-gradient(ellipse 80% 60% at 92% 8%, rgba(155,30,50,0.07) 0%, transparent 65%)",
          }}
        />

        {/* Large editorial navigation links */}
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            position: "relative",
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.label}
              ref={(el) => { menuItemRefs.current[i] = el; }}
              style={{ marginBottom: "clamp(0.25rem, 1.5vh, 0.75rem)" }}
            >
              <a
                href={link.href}
                onClick={closeMenu}
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(3rem, 12vw, 6rem)",
                  color: "var(--color-ivory)",
                  textDecoration: "none",
                  display: "block",
                  lineHeight: 1.08,
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) =>
                  gsap.to(e.currentTarget, {
                    color: "var(--color-gold)",
                    x: 16,
                    duration: 0.38,
                    ease: "power2.out",
                  })
                }
                onMouseLeave={(e) =>
                  gsap.to(e.currentTarget, {
                    color: "var(--color-ivory)",
                    x: 0,
                    duration: 0.38,
                    ease: "power2.out",
                  })
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Bottom bar — CTA + brand line */}
        <div
          ref={menuBotRef}
          style={{
            marginTop: "clamp(2rem, 7vh, 5rem)",
            paddingTop: "clamp(1.5rem, 4vh, 2.5rem)",
            borderTop: "1px solid rgba(155,30,50,0.12)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--sp-5)",
          }}
        >
          <button
            className="vk-btn vk-btn-md vk-btn-outline"
            style={{ alignSelf: "flex-start" }}
            onClick={closeMenu}
          >
            Shop the Collection
          </button>

          <p
            style={{
              fontFamily: "var(--font-accent)",
              fontSize: "var(--t-label)",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "rgba(44,31,34,0.28)",
              fontWeight: 300,
            }}
          >
            Maison de Beauté · Est. 2024
          </p>
        </div>
      </div>
    </>
  );
}
