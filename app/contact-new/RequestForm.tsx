"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bike, CarFront, Check, CheckCircle2, ChevronDown, CircleHelp, LoaderCircle, LockKeyhole, MessageCircle, Phone, RotateCcw } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { cities, serviceOptions, symptoms } from "./content";
import { BOOKING_SELECTION_EVENT, type BookingSelection } from "./booking";
import { buildPayload, emptyDetails, normalizeMobile, requestMessage, sendContactRequest, type ContactDetails, type Delivery } from "./request";
import type { CoverageCity } from "./CoverageExplorer";
import styles from "./contact-new.module.css";

type Props = { phone: string; phoneDisplay: string; whatsappNumber: string; coverage: CoverageCity[] };
const subscribeHydration = () => () => {};
const clientHydration = () => true;
const serverHydration = () => false;
export default function RequestForm({ phone, phoneDisplay, whatsappNumber, coverage }: Props) {
  const hydrated = useSyncExternalStore(subscribeHydration, clientHydration, serverHydration);
  const [details, setDetails] = useState<ContactDetails>(emptyDetails);
  const [helperOpen, setHelperOpen] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error" | Delivery>("idle");
  const [copied, setCopied] = useState(false);
  const mountedAt = useRef(0);
  const sending = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const mounted = useRef(true);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const set = (key: keyof ContactDetails, value: string) => {
    setDetails(previous => ({ ...previous, [key]: value }));
    if (key === "phone") setPhoneError("");
    setCopied(false);
  };
  useEffect(() => {
    mounted.current = true; mountedAt.current = Date.now();
    function receive(event: Event) {
      if (sending.current) return;
      const selection = (event as CustomEvent<BookingSelection>).detail;
      setDetails(previous => ({ ...previous, ...selection }));
      setStatus("idle"); setSuggestion("");
    }
    window.addEventListener(BOOKING_SELECTION_EVENT, receive);
    return () => { mounted.current = false; controller.current?.abort(); window.removeEventListener(BOOKING_SELECTION_EVENT, receive); };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    if (!normalizeMobile(details.phone)) {
      setPhoneError("Enter a valid 10-digit Indian mobile number, with or without +91.");
      formRef.current?.querySelector<HTMLInputElement>("#request-phone")?.focus(); return;
    }
    sending.current = true; setStatus("sending");
    controller.current = new AbortController();
    const timeout = window.setTimeout(() => controller.current?.abort(), 20000);
    try {
      // Respect the existing endpoint's timing check, including autofilled forms.
      const elapsed = Date.now() - mountedAt.current;
      if (elapsed < 1250) await new Promise(resolve => window.setTimeout(resolve, 1250 - elapsed));
      if (!mounted.current) return;
      const payload = buildPayload(details, Date.now() - mountedAt.current, window.location.href, document.referrer);
      const delivery = await sendContactRequest(payload, controller.current.signal);
      if (!mounted.current) return;
      setStatus(delivery);
      trackEvent(delivery === "received" ? "generate_lead" : "lead_duplicate", { form_type: "Contact New — Service Request", page_path: "/contact-new" });
      requestAnimationFrame(() => { headingRef.current?.focus({ preventScroll: true }); headingRef.current?.scrollIntoView({ block: "start", behavior: "instant" }); });
    } catch {
      if (mounted.current) {
        setStatus("error");
        trackEvent("lead_submit_failed", { page_path: "/contact-new" });
      }
    } finally { window.clearTimeout(timeout); sending.current = false; }
  }
  const whatsapp = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(requestMessage(details))}`;
  const areas = coverage.find(city => city.name === details.city)?.areas ?? [];
  const delivered = status === "received" || status === "earlier-request";

  return <div className={styles.bookingCard} id="contact-form">
    <div className={styles.bookingTop}><span><span className={styles.smallDot} />LET’S ARRANGE YOUR HELP</span><span>No online payment</span></div>
    <h2 ref={headingRef} tabIndex={-1} id="contact-booking-title" className={styles.formHeading}>{status === "received" ? "Your request is with us." : status === "earlier-request" ? "Let’s check your earlier request." : "Where do you need us?"}</h2>
    <p className={styles.formIntro}>{delivered ? "Our team confirms availability, assistance, and charges with you." : "Share a few details. Our team will take it from here."}</p>
    {delivered ? <div className={styles.receipt}>
      <CheckCircle2 size={42} strokeWidth={1.3} aria-hidden="true" />
      <p role="status">{status === "received" ? "Your service enquiry was received. This is a request for assistance; the team still needs to confirm your booking." : "This number has an earlier or recent enquiry. Call or WhatsApp to check its status or add these details."}</p>
      <dl><div><dt>Mobile</dt><dd>+91 {normalizeMobile(details.phone)}</dd></div><div><dt>Location</dt><dd>{[details.locality, details.city].filter(Boolean).join(", ")}</dd></div><div><dt>Help needed</dt><dd>{details.vehicle} · {details.service}</dd></div></dl>
      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={styles.whatsappButton}><MessageCircle size={18} aria-hidden="true" />Continue on WhatsApp<ArrowUpRight size={16} aria-hidden="true" /></a>
      <p>Need assistance now? <a href={`tel:${phone}`}>Call {phoneDisplay}</a>.</p>
      <button type="button" className={styles.backButton} onClick={() => { setDetails(emptyDetails); setStatus("idle"); setSuggestion(""); setHelperOpen(false); setCopied(false); }}><RotateCcw size={14} aria-hidden="true" />Start another request</button>
    </div> : <form ref={formRef} onSubmit={submit} method="post" aria-busy={status === "sending"}>
      <fieldset disabled={status === "sending"} className={styles.formFields}>
        <fieldset className={styles.timingField}><legend className={styles.srOnly}>When do you need help?</legend><div>{[{ value: "Roadside help", label: "I need help now" }, { value: "Scheduled service", label: "Plan a service" }].map(option => <label key={option.value} className={details.timing === option.value ? styles.activeTiming : ""}><input type="radio" name="timing" checked={details.timing === option.value} onChange={() => set("timing", option.value)} />{option.label}</label>)}</div></fieldset>
        <fieldset className={styles.vehicleField}><legend>Your vehicle</legend><div>{[{ name: "Car", Icon: CarFront }, { name: "Bike / scooter", Icon: Bike }].map(({ name, Icon }) => <label key={name} className={details.vehicle === name ? styles.selectedVehicle : ""}><input type="radio" name="vehicle" value={name} checked={details.vehicle === name} onChange={() => set("vehicle", name)} /><Icon size={22} strokeWidth={1.6} aria-hidden="true" /><span>{name}</span>{details.vehicle === name && <Check size={15} aria-hidden="true" />}</label>)}</div></fieldset>
        <div className={styles.fieldGrid}><div className={styles.field}><label htmlFor="request-phone">Mobile number <span>*</span></label><div className={styles.phoneInput}><span aria-hidden="true">+91</span><input id="request-phone" name="phone" type="tel" inputMode="tel" required maxLength={20} autoComplete="tel-national" value={details.phone} onChange={event => set("phone", event.target.value)} placeholder="10-digit mobile number" aria-invalid={!!phoneError} aria-describedby={phoneError ? "phone-error" : "phone-note"} /></div>{phoneError && <p id="phone-error" className={styles.fieldError} role="alert">{phoneError}</p>}</div><div className={styles.field}><label htmlFor="request-city">Your city <span>*</span></label><div className={styles.selectWrap}><select id="request-city" name="city" required autoComplete="address-level2" value={details.city} onChange={event => { set("city", event.target.value); set("locality", ""); }}><option value="" disabled>Select city</option>{cities.map(city => <option key={city.slug}>{city.name}</option>)}</select><ChevronDown size={16} aria-hidden="true" /></div></div></div>
        <div className={styles.field}><label htmlFor="request-locality">Locality or nearby landmark <span className={styles.optional}>Optional</span></label><input id="request-locality" name="area" list="contact-area-suggestions" maxLength={100} autoComplete="address-line2" value={details.locality} onChange={event => set("locality", event.target.value)} placeholder="Area, apartment or nearby landmark" /><datalist id="contact-area-suggestions">{areas.map(area => <option key={area.slug} value={area.name} />)}</datalist></div>
        <div className={styles.field}><label htmlFor="request-service">What do you need help with?</label><div className={styles.selectWrap}><select id="request-service" name="service" value={details.service} onChange={event => { set("service", event.target.value); setSuggestion(""); }}>{serviceOptions.map(service => <option key={service}>{service}</option>)}</select><ChevronDown size={16} aria-hidden="true" /></div></div>
        <div className={styles.serviceHelper}><button type="button" aria-expanded={helperOpen} aria-controls="service-picker" onClick={() => setHelperOpen(!helperOpen)}><CircleHelp size={15} aria-hidden="true" />Help me choose a service<ChevronDown size={14} aria-hidden="true" /></button><div id="service-picker" hidden={!helperOpen} className={styles.helperBody}><p>Choose what you noticed. This selects a service; a technician checks the cause.</p><div>{symptoms.map(symptom => <button type="button" key={symptom.label} aria-pressed={suggestion === symptom.explanation} onClick={() => { set("service", symptom.service); setSuggestion(symptom.explanation); }}>{symptom.label}</button>)}</div><p role="status" className={styles.suggestion}>{suggestion}</p></div></div>
        <details className={styles.extraDetails}><summary><span>Add your name, vehicle model or a note</span><span>Optional <ChevronDown size={14} aria-hidden="true" /></span></summary><div><div className={styles.fieldGrid}><div className={styles.field}><label htmlFor="request-name">Your name</label><input id="request-name" name="name" maxLength={100} autoComplete="name" value={details.name} onChange={event => set("name", event.target.value)} placeholder="Your name" /></div><div className={styles.field}><label htmlFor="request-model">Vehicle model</label><input id="request-model" name="vehicle_model" maxLength={100} value={details.model} onChange={event => set("model", event.target.value)} placeholder={details.vehicle === "Car" ? "Hyundai i20" : "Honda Activa"} /></div></div><div className={styles.field}><label htmlFor="request-message">What happened?</label><textarea id="request-message" name="message" rows={2} maxLength={800} value={details.message} onChange={event => set("message", event.target.value)} placeholder="Describe the problem or tell us your preferred service time." /></div></div></details>
        {status === "error" && <div className={styles.deliveryError} role="alert"><strong>We couldn’t confirm delivery.</strong><p>Your details are still here. The request may have reached us. Call or share these details on WhatsApp to check before trying again.</p><div><a href={`tel:${phone}`}><Phone size={15} aria-hidden="true" />Call the team</a><a href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} aria-hidden="true" />Send on WhatsApp</a></div><button type="button" onClick={async () => { try { await navigator.clipboard.writeText(requestMessage(details)); setCopied(true); } catch { setCopied(false); } }}>Copy my request</button><span role="status">{copied ? "Request copied." : ""}</span></div>}
        <button type="submit" disabled={!hydrated || status === "sending"} className={styles.submitButton}>{status === "sending" ? <><span>Sending your request…</span><LoaderCircle className={styles.spinner} size={18} aria-hidden="true" /></> : <><span>{status === "error" ? "Try sending again" : "Request a mechanic"}</span><ArrowRight size={19} aria-hidden="true" /></>}</button>
        <p id="phone-note" className={styles.submitNote}>Our team will call to confirm. No payment is collected here.</p>
        <a className={styles.formWhatsapp} href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden="true" />Prefer WhatsApp? Send these details<ArrowUpRight size={14} aria-hidden="true" /></a>
      </fieldset>
    </form>}
    <p className={styles.formFoot}><LockKeyhole size={13} aria-hidden="true" /><span>By requesting help, you agree Fiixup may contact you about this enquiry. <Link href="/privacy-policy">Privacy policy</Link></span></p>
    <noscript><p className={styles.fieldNote}>Please <a href={`tel:${phone}`}>call Fiixup</a> or <a href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">WhatsApp our team</a> to arrange assistance. The online form requires JavaScript.</p></noscript>
  </div>;
}
