"use client";
import { useEffect, useRef, useState } from "react";
import { ZAK_DATA, ZAK_CATS } from "../data/places";

const VB = { w: 1000, h: 940 };
const BB = { lng0: 20.60, lng1: 20.98, lat0: 37.655, lat1: 37.935 };
const toX = (lng: number) => ((lng - BB.lng0) / (BB.lng1 - BB.lng0)) * VB.w;
const toY = (lat: number) => ((BB.lat1 - lat) / (BB.lat1 - BB.lat0)) * VB.h;

const COAST: [number, number][] = [
  [150, 70], [95, 165], [64, 258], [108, 360], [158, 520], [196, 645],
  [320, 800], [461, 892], [600, 845], [738, 782], [948, 782],
  [862, 632], [820, 556], [792, 500], [864, 392], [762, 300],
  [684, 286], [470, 212], [325, 190], [212, 122],
];

function smoothClosed(pts: [number, number][]) {
  const n = pts.length;
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i];
    const p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return d + "Z";
}

const COAST_PATH = smoothClosed(COAST);

function buildGrid() {
  const lines: React.ReactNode[] = [];
  for (let gx = 0; gx <= VB.w; gx += 125)
    lines.push(<line key={`v${gx}`} className="grid-l" x1={gx} y1={0} x2={gx} y2={VB.h} />);
  for (let gy = 0; gy <= VB.h; gy += 125)
    lines.push(<line key={`h${gy}`} className="grid-l" x1={0} y1={gy} x2={VB.w} y2={gy} />);
  return lines;
}

const GRID_LINES = buildGrid();

export default function MapSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drawn, setDrawn] = useState(false);
  const [mapSrc, setMapSrc] = useState("https://maps.google.com/maps?q=Zakynthos&z=10&output=embed");
  const carteRef = useRef<HTMLElement>(null);
  const listScrollRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = carteRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setDrawn(true); obs.disconnect(); }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    for (const ref of [headRef, gridRef]) {
      const el = ref.current;
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { el.classList.add("in"); obs.disconnect(); } },
        { threshold: 0.1 }
      );
      obs.observe(el);
    }
  }, []);

  function selectSpot(id: string, fromPin: boolean) {
    setSelectedId(id);
    const d = ZAK_DATA.find((x) => x.id === id);
    if (!d) return;
    setMapSrc(`https://maps.google.com/maps?q=${d.coords[0]},${d.coords[1]}&z=13&output=embed`);
    if (fromPin) {
      const btn = listScrollRef.current?.querySelector<HTMLElement>(`[data-id="${id}"]`);
      const sc = listScrollRef.current;
      if (btn && sc) sc.scrollTo({ top: btn.offsetTop - sc.offsetTop - 80, behavior: "smooth" });
    }
  }

  return (
    <section className="carte" id="carte" ref={carteRef}>
      <div className="wrap">
        <div ref={headRef} className="shead reveal">
          <div className="shead__l">
            <div className="shead__num">05</div>
            <div className="shead__txt">
              <span className="kicker">S&apos;orienter</span>
              <h2>La carte de l&apos;île</h2>
            </div>
          </div>
          <p className="shead__intro">Chaque épingle, un souvenir à venir. Touchez un lieu pour le retrouver.</p>
        </div>

        <div ref={gridRef} className="carte__grid reveal">
          <div className="mapcard">
            <svg
              className={`island${drawn ? " drawn" : ""}`}
              viewBox={`0 0 ${VB.w} ${VB.h}`}
              role="img"
              aria-label="Carte stylisée de Zakynthos"
            >
              <rect className="sea-fill" x={0} y={0} width={VB.w} height={VB.h} />
              {GRID_LINES}
              <path className="coast" d={COAST_PATH} />
              <text className="label-isle" x={500} y={475} textAnchor="middle">ZÁKYNTHOS</text>

              <g transform="translate(905,120)">
                <circle className="compass" r={34} />
                <path
                  className="compass"
                  d="M0,-30 L7,0 L0,30 L-7,0 Z"
                  fill="rgba(184,146,78,.25)"
                />
                <text className="compass-n" x={0} y={-40} textAnchor="middle">N</text>
              </g>

              {ZAK_DATA.map((d) => {
                const x = toX(d.coords[1]);
                const y = toY(d.coords[0]);
                const end = x > VB.w * 0.6;
                const sel = selectedId === d.id;
                return (
                  <g
                    key={d.id}
                    className={`pin${d.coup ? " coup" : ""}${sel ? " sel" : ""}`}
                    transform={`translate(${x.toFixed(1)},${y.toFixed(1)})`}
                    onClick={() => selectSpot(d.id, true)}
                  >
                    <circle className="ring" r={6} />
                    <circle className="dot" r={d.coup ? 6 : 4.5} />
                    <text
                      className="pin__label"
                      x={end ? -12 : 12}
                      y={4}
                      textAnchor={end ? "end" : "start"}
                    >
                      {d.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="maplist">
            <span className="kicker">Tous les lieux</span>
            <h3>Points d&apos;intérêt</h3>
            <div className="maplist__scroll" ref={listScrollRef}>
              <div>
                {ZAK_CATS.map((c) =>
                  ZAK_DATA.filter((d) => d.cat === c.id).map((d) => (
                    <button
                      key={d.id}
                      className={`mli${d.coup ? " coup" : ""}${selectedId === d.id ? " sel" : ""}`}
                      data-id={d.id}
                      onClick={() => selectSpot(d.id, false)}
                    >
                      <span className="mli__dot" />
                      <span className="mli__name">{d.name}</span>
                      <span className="mli__cat">{c.label}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
            <div className="embed-wrap">
              <iframe
                id="mapframe"
                title="Carte Google de Zakynthos"
                loading="lazy"
                src={mapSrc}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
