"use client";
import { useEffect, useRef, useState } from "react";
import type { Place } from "../data/places";

const THEMES = [
  "linear-gradient(165deg,#5FC9D6,#2A8FA8 52%,#14627E)",
  "linear-gradient(165deg,#2E89A6,#1E5E8C 55%,#0E3A5C)",
  "linear-gradient(165deg,#F0C079,#C4714A 55%,#7A4A6B)",
  "linear-gradient(165deg,#CFC08C,#8E9466 52%,#566049)",
  "linear-gradient(165deg,#C7E9EC,#5BB8C4 50%,#1E6F86)",
  "linear-gradient(165deg,#E0A074,#B5573E 55%,#5C3B52)",
  "linear-gradient(165deg,#EAF2F2,#9CC7D6 48%,#2E7E9E)",
  "linear-gradient(165deg,#7FD0CF,#3FA9B8 52%,#175E73)",
];
const RATIOS = ["r34", "r45", "r11", "r43", "r45", "r34"];

const initial = (n: string) => n.replace(/^(L'|Le |La |Les )/i, "").charAt(0);
const mapsLink = ([lat, lng]: [number, number]) =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
const unsplash = (q: string) =>
  `https://source.unsplash.com/800x1000/?${encodeURIComponent(q)}`;

function Stars({ n }: { n: number }) {
  return (
    <div className="tile__stars" aria-label={`${n}/5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={i < n ? "on" : "off"}>
          <path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.8 6.1 20.8l1.2-6.6L2.5 9l6.6-.9z" />
        </svg>
      ))}
    </div>
  );
}

interface Props {
  place: Place;
  index: number;
}

export default function Tile({ place: d, index }: Props) {
  const theme = THEMES[index % THEMES.length];
  const ratio = RATIOS[index % RATIOS.length];
  const [open, setOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const tileRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = tileRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".maps-btn")) return;
    if (window.matchMedia("(hover: hover)").matches) return;
    e.preventDefault();
    setOpen((o) => !o);
  };

  return (
    <article
      ref={tileRef}
      className={`tile reveal ${ratio}${open ? " open" : ""}`}
      data-cat={d.cat}
      data-tier={d.tier}
      data-coup={String(d.coup)}
      tabIndex={0}
      onClick={handleClick}
    >
      <div className="tile__media">
        <div className="tile__grad" style={{ background: theme }}>
          <div className="tile__sun" />
          <b>{initial(d.name)}</b>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={`tile__img${imgLoaded ? " loaded" : ""}`}
          alt={`${d.name}, Zakynthos`}
          loading="lazy"
          src={unsplash(d.q)}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <div className="tile__scrim" />
      </div>

      {d.coup && <div className="tile__coup">🔥 Coup de cœur</div>}
      <span className="tile__badge">{d.badge}</span>

      <div className="tile__cap">
        <div className="tile__name">{d.name}</div>
        <div className="tile__sub">{d.sub}</div>
        <div className="tile__meta">
          <Stars n={d.stars} />
          <span className="tile__dot" />
          <span className="tile__price">{d.price}</span>
        </div>
      </div>

      <div className="tile__reveal">
        <div className="rn">{d.name}</div>
        <div className="rs">{d.sub}</div>
        <p>{d.desc}</p>
        {d.details && (
          <ul className="tile__chips">
            {d.details.map((x) => <li key={x}>{x}</li>)}
          </ul>
        )}
        <div className="rprice">{d.price} · {d.priceNote}</div>
        <a
          className="maps-btn"
          href={mapsLink(d.coords)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
          </svg>
          Voir sur Maps
        </a>
      </div>
    </article>
  );
}
