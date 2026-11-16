"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Map, MapPin, Search } from "lucide-react";
import CityDrawing from "./CityDrawing";
import { openBooking } from "./booking";
import styles from "./contact-new.module.css";

export type CoverageCity = { name: string; slug: string; note: string; areas: { name: string; slug: string; href: string }[] };
export default function CoverageExplorer({ cities }: { cities: CoverageCity[] }) {
  const [active, setActive] = useState(cities[0].slug);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const city = cities.find(item => item.slug === active) ?? cities[0];
  const filtered = city.areas.filter(area => area.name.toLowerCase().includes(query.trim().toLowerCase()));
  const mapQuery = [selected, city.name, "India"].filter(Boolean).join(", ");
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed&z=${selected ? 14 : 11}`;
  const externalMap = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  return <div className={styles.coverageExplorer}>
    <div className={styles.citySwitch} role="group" aria-label="Choose a service city">{cities.map(item => <button type="button" key={item.slug} aria-pressed={active === item.slug} onClick={() => { setActive(item.slug); setQuery(""); setSelected(""); setMapLoaded(false); }}><CityDrawing city={item.slug} /><span>{item.name}<small>{item.note}</small></span><ArrowUpRight size={17} aria-hidden="true" /></button>)}</div>
    <div className={styles.coverageBody}>
      <div className={styles.areaPanel}>
        <div className={styles.areaHeading}><div><span>DOORSTEP &amp; ROADSIDE SUPPORT</span><h3>Find your area in {city.name}.</h3></div><MapPin size={24} strokeWidth={1.5} aria-hidden="true" /></div>
        <label className={styles.areaSearch}><Search size={18} aria-hidden="true" /><span className={styles.srOnly}>Search listed areas in {city.name}</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search your area or neighbourhood" /></label>
        <p className={styles.areaLabel} role="status">{query ? `${filtered.length} matching listed ${filtered.length === 1 ? "area" : "areas"}` : "CHOOSE A LISTED AREA"}</p>
        <div className={styles.areaChips}>{filtered.slice(0, 12).map(area => <button type="button" key={area.slug} aria-pressed={selected === area.name} onClick={() => { setSelected(selected === area.name ? "" : area.name); setMapLoaded(false); }}>{area.name}{selected === area.name && <Check size={13} aria-hidden="true" />}</button>)}</div>
        {filtered.length === 0 && <p className={styles.areaEmpty}>Can’t see your area? Enter your locality in the request form. Our team will check whether assistance can be arranged.</p>}
        {!query && city.areas.length > 12 && <p className={styles.areaMore}>Showing 12 areas. Search above to find more listed localities.</p>}
        <div className={styles.areaBooking}><button type="button" onClick={() => openBooking({ city: city.name, locality: selected })}>Request help in {selected || city.name}<ArrowRight size={17} aria-hidden="true" /></button><p>Availability depends on your exact location, the service and technician resources.</p></div>
        <Link className={styles.textLink} href={`/${city.slug}`}>Explore {city.name} services<ArrowUpRight size={15} aria-hidden="true" /></Link>
      </div>
      <div className={styles.mapPanel}>
        <div className={styles.mapCanvas}>{mapLoaded ? <iframe key={mapQuery} title={`Reference map of ${mapQuery}`} src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /> : <>
          <svg className={styles.mapStreets} viewBox="0 0 660 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><pattern id="coverage-streets" width="116" height="92" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)"><rect width="116" height="92" fill="#e8eef1" /><path d="M0 0h116M0 0v92M0 46h116M58 0v92" stroke="#fff" strokeWidth="7" /><rect x="11" y="12" width="34" height="21" fill="#d6e5dd" rx="3" /><rect x="70" y="57" width="33" height="21" fill="#dce4ee" rx="3" /></pattern></defs><rect width="660" height="460" fill="url(#coverage-streets)" /><path d="M-30 360C80 400 160 260 240 300S380 340 450 200 620 190 690 60" stroke="#fff" strokeWidth="34" fill="none" /><path d="M-30 360C80 400 160 260 240 300S380 340 450 200 620 190 690 60" stroke="#b1c9ea" strokeWidth="19" fill="none" /><path d="M160-40c10 100 80 140 70 210s-60 160-30 340" stroke="#b7d3e5" strokeWidth="14" fill="none" /></svg>
          <div className={styles.mapPlaceholder}><div className={styles.mapPin}><MapPin size={25} aria-hidden="true" /></div><strong>{selected || city.name}</strong><span>Explore your location</span><button type="button" onClick={() => setMapLoaded(true)}><Map size={16} aria-hidden="true" />Load {city.name} map<ArrowUpRight size={14} aria-hidden="true" /></button><small>Illustration · Google Maps loads only when opened</small></div>
        </>}</div>
        <div className={styles.mapCaption}><p><MapPin size={15} aria-hidden="true" />{selected ? `${selected}, ${city.name}` : `${city.name} city reference map`}</p><a href={externalMap} target="_blank" rel="noopener noreferrer">Open Maps<ArrowUpRight size={14} aria-hidden="true" /></a></div>
        <p className={styles.mapBoundary}>The map helps you describe your location. It does not show live technicians, branches or guaranteed service coverage.</p>
      </div>
    </div>
    <nav className={styles.cityLinks} aria-label="All city service pages">{cities.map(item => <Link href={`/${item.slug}`} key={item.slug}>{item.name} services<ArrowUpRight size={13} aria-hidden="true" /></Link>)}</nav>
  </div>;
}
