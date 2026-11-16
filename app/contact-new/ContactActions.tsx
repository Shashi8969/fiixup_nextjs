"use client";

import { useEffect, useState } from "react";
import { ArrowRight, BatteryCharging, CircleHelp, Disc3, Gauge, MessageCircle, Phone, Truck, Wrench } from "lucide-react";
import { openBooking } from "./booking";
import styles from "./contact-new.module.css";

const choices = [
  { label: "Won’t start", note: "Starting & battery help", service: "Starting / battery assistance", Icon: BatteryCharging },
  { label: "Flat tyre", note: "Puncture & tyre support", service: "Puncture / tyre assistance", Icon: Disc3 },
  { label: "Something’s wrong", note: "Repair & fault checks", service: "Repair / diagnosis", Icon: Gauge },
  { label: "Service is due", note: "Care at your doorstep", service: "Maintenance / service", Icon: Wrench },
  { label: "Need towing", note: "Vehicle recovery help", service: "Towing / recovery", Icon: Truck },
  { label: "Not sure yet", note: "We’ll help you choose", service: "Help me choose", Icon: CircleHelp },
];
export function ServiceChoices() {
  return <div className={styles.serviceChoices}>{choices.map(({ label, note, service, Icon }) => <button type="button" key={label} onClick={() => openBooking({ service })}><Icon size={27} strokeWidth={1.4} aria-hidden="true" /><strong>{label}</strong><span>{note}</span><ArrowRight size={16} aria-hidden="true" /></button>)}</div>;
}
export function MobileContactDock({ phone, whatsapp }: { phone: string; whatsapp: string }) {
  const [formVisible, setFormVisible] = useState(false);
  useEffect(() => {
    const form = document.getElementById("contact-form");
    if (!form) return;
    const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { rootMargin: "-90px 0px -60px 0px" });
    observer.observe(form); return () => observer.disconnect();
  }, []);
  return <nav aria-label="Quick contact options" className={`${styles.mobileDock} ${formVisible ? styles.dockHidden : ""}`}><a href={`tel:${phone}`}><Phone size={18} aria-hidden="true" /><span>Call</span></a><a href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" /><span>WhatsApp</span></a><button type="button" onClick={() => openBooking()}>Request help<ArrowRight size={16} aria-hidden="true" /></button></nav>;
}
