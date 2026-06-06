"use client";
import { ZAK_CATS } from "../data/places";

interface Props {
  filterCat: string;
  filterTier: string;
  filterCoup: boolean;
  totalVisible: number;
  onCatChange: (v: string) => void;
  onTierChange: (v: string) => void;
  onCoupChange: (v: boolean) => void;
}

export default function FilterBar({
  filterCat,
  filterTier,
  filterCoup,
  totalVisible,
  onCatChange,
  onTierChange,
  onCoupChange,
}: Props) {
  const cats: [string, string][] = [
    ["all", "Tout"],
    ...ZAK_CATS.map((c) => [c.id, c.label] as [string, string]),
  ];

  return (
    <div className="filterbar" id="filterbar">
      <div className="wrap">
        <div className="filterbar__inner">
          <div className="fgroup">
            {cats.map(([v, l]) => (
              <button
                key={v}
                className={`chip${filterCat === v ? " active" : ""}`}
                onClick={() => onCatChange(v)}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="fdiv" />
          <div className="fgroup">
            <button
              className={`chip coup${filterCoup ? " active" : ""}`}
              onClick={() => onCoupChange(!filterCoup)}
            >
              🔥 Coup de cœur
            </button>
          </div>
        </div>
        <div className="filter-count">
          {totalVisible > 0
            ? `${totalVisible} lieu${totalVisible > 1 ? "x" : ""} à découvrir`
            : ""}
        </div>
      </div>
    </div>
  );
}
