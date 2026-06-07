"use client";
import { useEffect, useRef, useState } from "react";
import { ZAK_CATS } from "../data/places";

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onScroll() {
      setSolid(window.scrollY > 60);
      const y = window.scrollY + 130;
      let cur = "";
      document.querySelectorAll<HTMLElement>("section[id], .carte[id]").forEach((s) => {
        if (s.offsetTop <= y) cur = s.id;
      });
      setActiveSection(cur);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <nav ref={navRef} className={`nav${solid ? " solid" : ""}`} id="nav">
      <a href="#hero" className="nav__brand">
        <span className="dot" />
        <b>Zakynthos</b>
      </a>

      <div className={`nav__links${open ? " open" : ""}`} id="navlinks">
        {[
          { href: "#vols", label: "Vols" },
          { href: "#plages", label: "Plages" },
          { href: "#restaurants", label: "Restaurants" },
          { href: "#bars", label: "Bars & Coucher de soleil" },
          { href: "#sites", label: "Sites & Nature" },
          { href: "#carte", label: "Carte" },
        ].map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className={activeSection === href.slice(1) ? "active" : ""}
            onClick={closeMenu}
          >
            {label}
          </a>
        ))}
      </div>

      <button
        className="nav__burger"
        id="burger"
        aria-label="Menu"
        onClick={() => setOpen((o) => !o)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>
    </nav>
  );
}
