"use client";
import { useEffect, useRef } from "react";
import Tile from "./Tile";
import type { Cat, Place } from "../data/places";

interface Props {
  cat: Cat;
  catIndex: number;
  items: Place[];
  filterCat: string;
  filterTier: string;
  filterCoup: boolean;
}

export default function Section({ cat, catIndex, items, filterCat, filterTier, filterCoup }: Props) {
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add("in"); obs.disconnect(); }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const catHidden = filterCat !== "all" && filterCat !== cat.id;
  const visibleItems = items.filter((d) => {
    if (filterTier !== "all" && d.tier !== filterTier) return false;
    if (filterCoup && !d.coup) return false;
    return true;
  });

  if (catHidden) return null;

  return (
    <section className="section" id={cat.id}>
      <div className="wrap">
        <div ref={headRef} className="shead reveal">
          <div className="shead__l">
            <div className="shead__num">0{catIndex + 1}</div>
            <div className="shead__txt">
              <span className="kicker">{cat.kicker}</span>
              <h2>{cat.title}</h2>
            </div>
          </div>
          <p className="shead__intro">{cat.intro}</p>
        </div>

        <div className="masonry" data-grid={cat.id}>
          {visibleItems.map((d, i) => (
            <Tile key={d.id} place={d} index={i} />
          ))}
        </div>

        {visibleItems.length === 0 && (
          <p className="empty-note show">Aucun lieu ne correspond à ce filtre.</p>
        )}
      </div>
    </section>
  );
}
