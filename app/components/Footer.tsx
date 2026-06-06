"use client";
import { useEffect, useRef } from "react";

export default function Footer() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("in"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <footer className="footer">
      <div className="wrap">
        <div ref={cardRef} className="postcard reveal">
          <div className="postcard__l">
            <p className="postcard__quote">
              « L&apos;été grec ne se raconte pas,<br />il se vit. »
            </p>
            <div className="postcard__by">
              Florian &amp; Alexandra
              <small>Zakynthos · Été 2025</small>
            </div>
          </div>
          <div className="postcard__divider" />
          <div className="postcard__r">
            <div className="stamp2">
              <div className="stamp2__in">
                <span>Z</span>
              </div>
            </div>
            <div className="postmark">Îles Ioniennes · Ελλάδα</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
