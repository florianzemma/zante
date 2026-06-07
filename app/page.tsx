"use client";
import { useMemo, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import FlightsSection from "./components/FlightsSection";
import FilterBar from "./components/FilterBar";
import Section from "./components/Section";
import MapSection from "./components/MapSection";
import Footer from "./components/Footer";
import { ZAK_DATA, ZAK_CATS } from "./data/places";

export default function Home() {
  const [filterCat, setFilterCat] = useState("all");
  const [filterTier, setFilterTier] = useState("all");
  const [filterCoup, setFilterCoup] = useState(false);

  const totalVisible = useMemo(() => {
    return ZAK_DATA.filter((d) => {
      if (filterCat !== "all" && d.cat !== filterCat) return false;
      if (filterTier !== "all" && d.tier !== filterTier) return false;
      if (filterCoup && !d.coup) return false;
      return true;
    }).length;
  }, [filterCat, filterTier, filterCoup]);

  return (
    <>
      <Nav />
      <Hero />
      <Intro />
      <FlightsSection />
      <FilterBar
        filterCat={filterCat}
        filterTier={filterTier}
        filterCoup={filterCoup}
        totalVisible={totalVisible}
        onCatChange={setFilterCat}
        onTierChange={setFilterTier}
        onCoupChange={setFilterCoup}
      />
      <main id="sections">
        {ZAK_CATS.map((cat, ci) => (
          <Section
            key={cat.id}
            cat={cat}
            catIndex={ci}
            items={ZAK_DATA.filter((d) => d.cat === cat.id)}
            filterCat={filterCat}
            filterTier={filterTier}
            filterCoup={filterCoup}
          />
        ))}
      </main>
      <MapSection />
      <Footer />
    </>
  );
}
