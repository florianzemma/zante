"use client";
import { useEffect, useRef } from "react";
import { ALLER, RETOUR, ALLER_LAYOVER, RETOUR_LAYOVER, type Flight } from "../data/flights";

const PlaneSVG = () => (
  <svg className="ticket__plane" viewBox="0 0 24 24">
    <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0011.5 2 1.5 1.5 0 0010 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);

function Ticket({ flight }: { flight: Flight }) {
  return (
    <div className="ticket">
      <div className="ticket__main">
        <div className="ticket__top">
          <span className="ticket__airline">
            {flight.operator ? (
              <>{flight.operator} <span className="ticket__pour">pour {flight.airline}</span></>
            ) : flight.airline}
          </span>
          <span className="ticket__num">{flight.number}</span>
        </div>
        <div className="ticket__route">
          <div className="ticket__city">
            <div className="ticket__iata">{flight.from.code}</div>
            <div className="ticket__cname">{flight.from.airport}</div>
            <div className="ticket__hour">{flight.departure}</div>
          </div>
          <div className="ticket__path">
            <span className="ticket__dash" />
            <PlaneSVG />
            <span className="ticket__dash" />
          </div>
          <div className="ticket__city ticket__city--r">
            <div className="ticket__iata">{flight.to.code}</div>
            <div className="ticket__cname">{flight.to.airport}</div>
            <div className="ticket__hour">{flight.arrival}</div>
          </div>
        </div>
        <div className="ticket__tags">
          {flight.terminal && (
            <div className="ticket__t">
              <label>Terminal</label>
              <span>{flight.terminal}</span>
            </div>
          )}
          <div className="ticket__t">
            <label>Classe</label>
            <span>{flight.cabin}</span>
          </div>
          <div className="ticket__t">
            <label>Statut</label>
            <span className="st-ok">Confirmé</span>
          </div>
        </div>
      </div>
      <div className="ticket__perf" />
      <div className="ticket__stub">
        <div className="ticket__sf">{flight.number}</div>
        <div className="ticket__sd">
          <b>{flight.dateShort.day}</b>
          <small>{flight.dateShort.month}</small>
        </div>
        <div className="ticket__sc">✓</div>
      </div>
    </div>
  );
}

export default function FlightsSection() {
  const allerRef  = useRef<HTMLDivElement>(null);
  const retourRef = useRef<HTMLDivElement>(null);
  const headRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = [headRef.current, allerRef.current, retourRef.current].filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="vols" id="vols">
      <div className="wrap">
        <div ref={headRef} className="vols__head reveal">
          <div className="meander center" />
          <h2>Nos vols</h2>
          <p>Lyon — Munich — Zakynthos, aller-retour par les airs.</p>
        </div>

        <div ref={allerRef} className="vols__group reveal">
          <div className="vols__dir">
            <span className="vols__arrow">→</span>
            <span className="kicker">Aller · 27 août 2026</span>
          </div>
          <Ticket flight={ALLER[0]} />
          <div className="vols__esc">
            <span className="vols__esc-l" />
            <span className="vols__esc-t">Escale {ALLER_LAYOVER.airport} · {ALLER_LAYOVER.duration}</span>
            <span className="vols__esc-l" />
          </div>
          <Ticket flight={ALLER[1]} />
        </div>

        <div ref={retourRef} className="vols__group reveal">
          <div className="vols__dir">
            <span className="vols__arrow vols__arrow--ret">←</span>
            <span className="kicker">Retour · 7 septembre 2026</span>
          </div>
          <Ticket flight={RETOUR[0]} />
          <div className="vols__esc">
            <span className="vols__esc-l" />
            <span className="vols__esc-t">Escale {RETOUR_LAYOVER.airport} · {RETOUR_LAYOVER.duration}</span>
            <span className="vols__esc-l" />
          </div>
          <Ticket flight={RETOUR[1]} />
        </div>

        <p className="vols__note">Tous les horaires sont en heure locale.</p>
      </div>
    </section>
  );
}
