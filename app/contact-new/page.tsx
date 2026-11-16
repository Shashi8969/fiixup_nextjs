import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown, Clock3, Headphones, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Wrench } from "lucide-react";
import { SITE_URL } from "@/lib/constants";
import { getPublicSiteSettings } from "@/lib/site-settings";
import { getSmartNearbyAreaHubs } from "@/lib/smart-internal-links";
import { cities, faqs } from "./content";
import MiloLauncher from "./MiloLauncher";
import RequestForm from "./RequestForm";
import CoverageExplorer from "./CoverageExplorer";
import { MobileContactDock, ServiceChoices } from "./ContactActions";
import styles from "./contact-new.module.css";

const title = "Contact Fiixup | Book Car & Bike Repair, Roadside Assistance";
const description = "Call, WhatsApp or request a mechanic with Fiixup. Doorstep car and bike repair and 24/7 roadside assistance in supported areas of Bengaluru, Mumbai, Hyderabad and Chennai.";
const pageUrl = `${SITE_URL}/contact-new`;
export const metadata: Metadata = {
  title, description, keywords: [], alternates: { canonical: pageUrl },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  openGraph: { title, description, url: pageUrl, siteName: "Fiixup", type: "website", locale: "en_IN", images: [{ url: `${pageUrl}/opengraph-image`, width: 1200, height: 630, alt: "Contact Fiixup for car and bike repair. Let's get you moving." }] },
  twitter: { card: "summary_large_image", title, description, images: [`${pageUrl}/opengraph-image`] },
};

export default async function ContactNewPage() {
  const [settings, coverage] = await Promise.all([
    getPublicSiteSettings(),
    Promise.all(cities.map(async city => ({ ...city, areas: await getSmartNearbyAreaHubs(city.slug, undefined, 80).catch(() => []) }))),
  ]);
  const whatsapp = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Fiixup, I need help with my vehicle. My city and locality are: ")}`;
  const bookingWhatsapp = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Fiixup, I need help with an existing booking. My booking reference (if available): ")}`;
  const address = [settings.addressStreet, settings.addressLocality, settings.addressRegion, settings.addressPostalCode].filter(Boolean).join(", ");
  const graph = { "@context": "https://schema.org", "@graph": [
    { "@type": "ContactPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: title, description, inLanguage: "en-IN", isPartOf: { "@id": `${SITE_URL}/#website` }, about: { "@id": `${SITE_URL}/#organization` }, mainEntity: { "@id": `${SITE_URL}/#organization` }, breadcrumb: { "@id": `${pageUrl}#breadcrumb` } },
    { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Fiixup", url: SITE_URL, telephone: settings.mainPhone, email: settings.mainEmail, contactPoint: [{ "@type": "ContactPoint", telephone: settings.mainPhone, contactType: "roadside assistance", areaServed: cities.map(city => ({ "@type": "City", name: city.name })), hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" } }, { "@type": "ContactPoint", email: settings.mainEmail, contactType: "customer support" }] },
    { "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Contact Fiixup", item: pageUrl }] },
  ] };

  return <article className={styles.page} id="fiixup-contact-new">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />
    <div className={styles.heroShell}><div className={styles.container}>
      <div className={styles.topline}><nav aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Contact Fiixup</span></nav><Link href="/contact">Compare current page<ArrowUpRight size={14} aria-hidden="true" /></Link></div>
      <section className={styles.hero} aria-labelledby="contact-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span />YOUR CAR. YOUR BIKE. OUR NEXT PRIORITY.</p>
          <h1 id="contact-title">Contact Fiixup.<br /><span>Let’s get you<br className={styles.desktopBreak} /> moving.</span></h1>
          <p className={styles.heroIntro}>At home, at work, or on the roadside. Tell us what happened and where you are. We’ll help arrange the right next step.</p>
          <div className={styles.heroActions}><a className={styles.callButton} href={`tel:${settings.mainPhone}`}><Phone size={18} aria-hidden="true" /><span>Call {settings.mainPhoneDisplay}</span><ArrowUpRight size={16} aria-hidden="true" /></a><a href={whatsapp} className={styles.whatsappButton} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} aria-hidden="true" />WhatsApp us<ArrowUpRight size={15} aria-hidden="true" /></a></div>
          <p className={styles.urgentNote}><Clock3 size={14} aria-hidden="true" />24/7 roadside assistance · For urgent help, call directly.</p>
          <figure className={styles.heroPhoto}><Image src="/assets/carservice.webp" width={700} height={300} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 42vw, 550px" alt="A mechanic inspecting a car engine under the open bonnet" priority /><figcaption><span className={styles.photoMark}><Wrench size={19} strokeWidth={1.4} aria-hidden="true" /></span><div><strong>Care that comes to you.</strong><span>Car &amp; bike support at your location</span></div><ArrowUpRight size={20} aria-hidden="true" /></figcaption></figure>
          <div className={styles.heroCities}><MapPin size={14} aria-hidden="true" /><p>Bengaluru · Mumbai · Hyderabad · Chennai<br /><span>Selected localities. Availability confirmed for each request.</span></p><a href="#coverage" aria-label="Explore service cities and areas"><ArrowDown size={18} aria-hidden="true" /></a></div>
        </div>
        <RequestForm phone={settings.mainPhone} phoneDisplay={settings.mainPhoneDisplay} whatsappNumber={settings.whatsappNumber} coverage={coverage} />
      </section>
    </div></div>

    <div className={`${styles.container} ${styles.promiseLine}`}><p><Clock3 size={19} strokeWidth={1.5} aria-hidden="true" /><span><strong>An estimate for your location</strong>Confirmed after we review your request</span></p><p><ShieldCheck size={20} strokeWidth={1.5} aria-hidden="true" /><span><strong>You approve additional work</strong>Extra paid repairs and parts explained first</span></p><p><Headphones size={20} strokeWidth={1.5} aria-hidden="true" /><span><strong>People you can talk to</strong>Call, message or ask Milo for guidance</span></p></div>

    <section className={`${styles.section} ${styles.container}`} aria-labelledby="service-heading"><div className={styles.sectionTitle}><div><p className={styles.eyebrow}>START WITH THE PROBLEM, NOT THE PART</p><h2 id="service-heading">What’s keeping you<br />from your next journey?</h2></div><p>You don’t need to diagnose it. Pick what you’ve noticed and we’ll add it to your request.</p></div><ServiceChoices /></section>

    <section className={styles.coverageSection} id="coverage" aria-labelledby="coverage-heading"><div className={styles.container}><div className={styles.sectionTitle}><div><p className={styles.eyebrow}><span />NEAR YOUR HOME. NEAR YOUR DAY.</p><h2 id="coverage-heading">Your city. Your neighbourhood.<br /><span>A place to start.</span></h2></div><p>Explore listed localities, find your location on the map, and send the team your exact area.</p></div><CoverageExplorer cities={coverage} /></div></section>

    <section className={`${styles.section} ${styles.container} ${styles.processSection}`} aria-labelledby="next-heading"><div className={styles.processIntro}><p className={styles.eyebrow}>A CLEARER WAY TO GET HELP</p><h2 id="next-heading">Less wondering.<br />More knowing<br /><span>what comes next.</span></h2><p>Your request starts a conversation with our team. We keep the next step practical.</p><a href="#contact-form" className={styles.textLink}>Arrange your assistance<ArrowUpRight size={17} aria-hidden="true" /></a></div><ol className={styles.process}><li><span>01</span><div><h3>Share the essentials</h3><p>Your contact number, location, vehicle and the problem. Call directly if you need urgent help.</p></div></li><li><span>02</span><div><h3>Agree on the arrangement</h3><p>We discuss suitable assistance, available resources, an arrival estimate, and applicable charges.</p></div></li><li><span>03</span><div><h3>Understand the work</h3><p>A technician checks the vehicle. Additional paid work is explained before you approve it.</p></div></li></ol></section>

    <section className={styles.assistantSection} aria-labelledby="assistant-heading"><div className={`${styles.container} ${styles.assistantGrid}`}><div className={styles.assistantArt} aria-hidden="true"><div className={styles.miloIdentity}><span><MessageCircle size={23} strokeWidth={1.5} /></span><div><strong>Milo</strong><small>FIIXUP’S AI ASSISTANT</small></div></div><div className={styles.conversationQuestion}>What should I share when I request a mechanic?</div><div className={styles.conversationAnswer}>Your vehicle, location and what you noticed are a useful start.<span>Illustrative conversation</span></div><div className={styles.chatLine}><span>Ask about services &amp; coverage</span><ArrowRight size={16} /></div></div><div className={styles.assistantCopy}><p className={styles.eyebrow}>A LITTLE GUIDANCE GOES A LONG WAY</p><h2 id="assistant-heading">A question before<br />you book? Ask Milo.</h2><p>Understand services, explore coverage, or find out what to share with the team. Milo helps you find your way.</p><MiloLauncher /><p className={styles.aiBoundary}>For urgent assistance, call our team. A technician assesses the fault; our team confirms your booking and charges.</p></div></div></section>

    <section className={`${styles.section} ${styles.container} ${styles.supportSection}`} aria-labelledby="support-heading"><div className={styles.supportIntro}><p className={styles.eyebrow}>HERE FOR THE WHOLE JOURNEY</p><h2 id="support-heading">Already a customer?<br />Let’s pick up<br /><span>where we left off.</span></h2><p>Share your booking reference, if available, and the number used for your request. It helps the team find the right conversation.</p><div className={styles.historyNote}><span>2000 → 2020 → TODAY</span><p>Quick Mechanic, our HSR Layout garage, began in 2000. We started Fiixup as a separate company in 2020 to bring car and bike care to your location.</p><Link href="/about-new">Meet Fiixup<ArrowUpRight size={14} aria-hidden="true" /></Link></div></div><div className={styles.supportRoutes}><a href={bookingWhatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={24} strokeWidth={1.4} aria-hidden="true" /><div><h3>An update on your booking</h3><p>Check the status, discuss a change, or add information.</p><span>Message the team</span></div><ArrowUpRight size={19} aria-hidden="true" /></a><a href={`mailto:${settings.mainEmail}?subject=${encodeURIComponent("Help after a Fiixup service")}`}><Wrench size={24} strokeWidth={1.4} aria-hidden="true" /><div><h3>Help after your service</h3><p>Tell us what was done and what you’ve noticed since.</p><span>{settings.mainEmail}</span></div><ArrowUpRight size={19} aria-hidden="true" /></a><a href={`mailto:${settings.mainEmail}`}><Mail size={24} strokeWidth={1.4} aria-hidden="true" /><div><h3>Something else on your mind?</h3><p>A general question, feedback, or a different enquiry.</p><span>Email Fiixup</span></div><ArrowUpRight size={19} aria-hidden="true" /></a></div></section>

    {address && <section className={`${styles.container} ${styles.address}`} aria-labelledby="address-heading"><div><MapPin size={27} strokeWidth={1.3} aria-hidden="true" /><div><p className={styles.eyebrow}>OUR BENGALURU CONTACT ADDRESS</p><h2 id="address-heading">Prefer to find us on a map?</h2><address>{address}</address></div></div><div><p>For doorstep service, share your vehicle’s location. Please call before travelling to this address.</p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer">Open contact address in Maps<ArrowUpRight size={16} aria-hidden="true" /></a></div></section>}

    <section className={`${styles.section} ${styles.container} ${styles.faqGrid}`} aria-labelledby="faq-heading"><div><p className={styles.eyebrow}>A FEW USEFUL ANSWERS</p><h2 id="faq-heading">Before you<br />get in touch.</h2><p>Contact, coverage, and booking details, made clear.</p><Link href="/faq" className={styles.textLink}>More questions, answered<ArrowUpRight size={16} aria-hidden="true" /></Link></div><div className={styles.faqs}>{faqs.map(faq => <details key={faq.question}><summary><span>{faq.question}</span><ChevronDown size={17} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></section>

    <section className={styles.closing} aria-labelledby="closing-heading"><div className={`${styles.container} ${styles.closingInner}`}><div><p className={styles.eyebrow}>A BREAKDOWN SHOULDN’T TAKE OVER YOUR DAY.</p><h2 id="closing-heading">Let’s take the<br /><span>next step together.</span></h2><p>Car or bike. At your doorstep or on the roadside. Start with a conversation.</p></div><div><a className={styles.callButton} href={`tel:${settings.mainPhone}`}><Phone size={18} aria-hidden="true" />Call Fiixup<ArrowUpRight size={18} aria-hidden="true" /></a><a className={styles.closingWhatsapp} href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} aria-hidden="true" />Or talk to us on WhatsApp<ArrowRight size={16} aria-hidden="true" /></a></div></div></section>
    <MobileContactDock phone={settings.mainPhone} whatsapp={whatsapp} />
  </article>;
}
