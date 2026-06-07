"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;
    const img = new window.Image();
    img.onload = () => {
      if (bg) {
        bg.style.backgroundImage = `url("${img.src}")`;
        bg.classList.remove("fallback");
      }
    };
    img.src = "https://source.unsplash.com/1600x1000/?navagio,zakynthos,turquoise,beach";
  }, []);

  return (
    <header className="hero" id="hero">
      <div ref={bgRef} className="hero__bg fallback" id="heroBg" />
      <div className="hero__veil" />
      <div className="hero__frame" />

      <div className="hero__inner">
        <div className="hero__coord">37.78° N · 20.84° E · Mer Ionienne</div>
        <span className="hero__script">Notre</span>
        <h1>Zakynthos</h1>
        <div className="hero__sub">
          <span className="ln" />
          <span>été grec, 2026</span>
          <span className="ln" />
        </div>
      </div>

      <div className="hero__stamp">
        <div>
          <b>Zante</b>
          <small>Été · MMXXV</small>
        </div>
      </div>

      <div className="scrollcue">
        <span>Découvrir</span>
        <span className="bar" />
      </div>
    </header>
  );
}
