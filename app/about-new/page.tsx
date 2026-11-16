import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, BatteryCharging, Bike, CarFront, Check, ChevronDown, Clock3, MapPin, Phone, Search, ShieldCheck, Truck, Wrench } from "lucide-react";
import { MAIN_EMAIL, MAIN_PHONE, MAIN_PHONE_DISPLAY, SITE_URL } from "@/lib/constants";
import { cities, faqs, priorities, services } from "./content";
import PageEffects from "./PageEffects";
import styles from "./about-new.module.css";

const title = "About Fiixup | Our Workshop Roots & Doorstep Car and Bike Care";
const description = "Meet Fiixup: doorstep car and bike repair and 24/7 roadside assistance since 2020, built on the experience of Quick Mechanic, our Bengaluru garage established in 2000.";
const pageUrl = `${SITE_URL}/about-new`;

// Keep the comparison draft out of search. Change the route and indexing
// settings together only when this design is adopted for the main About page.
export const metadata: Metadata = {
  title, description,
  keywords: [],
  alternates: { canonical: pageUrl },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  openGraph: { title, description, url: pageUrl, siteName: "Fiixup", type: "website", locale: "en_IN", images: [{ url: `${pageUrl}/opengraph-image`, width: 1200, height: 630, alt: "Fiixup. Workshop roots. Doorstep care. Quick Mechanic established 2000; Fiixup established 2020." }] },
  twitter: { card: "summary_large_image", title, description, images: [`${pageUrl}/opengraph-image`] },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "AboutPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: title, description, inLanguage: "en-IN", isPartOf: { "@id": `${SITE_URL}/#website` }, mainEntity: { "@id": `${SITE_URL}/#organization` }, about: { "@id": `${SITE_URL}/#organization` }, mentions: [{ "@id": `${pageUrl}#jakir` }, { "@id": `${pageUrl}#quick-mechanic` }], breadcrumb: { "@id": `${pageUrl}#breadcrumb` } },
    { "@type": "Organization", "@id": `${pageUrl}#quick-mechanic`, name: "Quick Mechanic", foundingDate: "2000", telephone: MAIN_PHONE, description: "Quick Mechanic is our garage in HSR Layout, Bengaluru, established in 2000. Fiixup was started as a separate company in 2020. Both businesses use the same contact number." },
    { "@type": "Person", "@id": `${pageUrl}#jakir`, name: "Md. Jakir Hussain", jobTitle: "Mobile mechanic", worksFor: { "@id": `${SITE_URL}/#organization` }, url: `${pageUrl}#people`, description: "Fiixup mobile mechanic with practical workshop experience at Quick Mechanic in HSR Layout, Bengaluru. Began learning automotive repair around 2004." },
    { "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "About Fiixup", item: pageUrl }] },
  ],
};
const sections = [["Our story", "story"], ["How we work", "model"], ["Our people", "people"], ["On a call", "on-call"], ["Our focus", "focus"], ["Questions", "questions"]] as const;
const ServiceIcons = [CarFront, Bike, BatteryCharging, CircleTyre, Truck, Wrench];
function CircleTyre({ size = 22, ...props }: React.ComponentProps<typeof Wrench>) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="m8 4 1 3m6 10 1 3M4 8l3 1m10 6 3 1M4 16l3-1m10-6 3-1M8 20l1-3m6-10 1-3" /></svg>;
}
function Label({ number, children }: { number?: string; children: React.ReactNode }) {
  return <p className={styles.label}>{number && <span>{number}</span>}{children}</p>;
}
function SectionTitle({ number, label, id, children }: { number: string; label: string; id: string; children: React.ReactNode }) {
  return <div><Label number={number}>{label}</Label><h2 id={id}>{children}</h2></div>;
}

export default function AboutNewPage() {
  return (
    <article className={styles.page} id="fiixup-about-next">
      <PageEffects />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <header className={`${styles.hero} ${styles.container}`}>
        <div className={styles.topline}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span aria-hidden="true">/</span><span>About Fiixup</span></nav>
          <Link href="/about" className={styles.compare}>Design preview <span>·</span> Current About page <ArrowUpRight size={14} aria-hidden="true" /></Link>
        </div>
        <div className={styles.heroGrid}>
          <div><Label>About Fiixup · Since 2020</Label><h1>Workshop roots.<br /><span>Doorstep care.</span></h1></div>
          <div className={styles.heroIntro}><p>We make car and bike repair easier to reach. At home, at work, or when the road has other plans.</p><p className={styles.heroDefinition}>Fiixup is a doorstep vehicle repair company providing 24/7 roadside assistance in supported parts of Bengaluru, Mumbai, Hyderabad, and Chennai.</p><Link className={styles.button} href="/contact#contact-form">Get help with your vehicle <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        </div>
        <div className={styles.heroMedia}>
          <figure className={styles.heroPhoto}><Image src="/assets/Car mechanic.webp" alt="A mechanic inspecting components under a car bonnet" width={948} height={1421} preload sizes="(max-width: 700px) 100vw, (max-width: 1200px) 65vw, 790px" /><figcaption><span>Hands-on vehicle care</span><a href="#story">Discover our beginnings <ArrowDown size={16} aria-hidden="true" /></a></figcaption></figure>
          <div className={styles.heroNote}><div className={styles.noteTop}><Clock3 size={20} strokeWidth={1.5} aria-hidden="true" /><span>WHEN THE UNEXPECTED HAPPENS</span></div><p className={styles.hours}>24<span>/</span>7</p><div><strong>Roadside assistance.</strong><p>A starting problem. A puncture. A breakdown. Tell us where you are and what happened.</p><a href={`tel:${MAIN_PHONE}`}>Talk to Fiixup <ArrowUpRight size={17} aria-hidden="true" /></a></div><span className={styles.noteFoot}>Availability &amp; arrival estimate confirmed for your location.</span></div>
        </div>
        <div className={styles.originLine}><p><strong>Our foundation</strong> Quick Mechanic garage · 2000</p><ArrowRight size={18} aria-hidden="true" /><p><strong>Our next chapter</strong> Fiixup, a separate company · 2020</p></div>
      </header>

      <nav className={styles.sectionNav} aria-label="Explore this About page"><div className={styles.container}><span>Inside Fiixup</span><div>{sections.map(([label, id]) => <a key={id} href={`#${id}`} data-section-link>{label}</a>)}</div><a href="#coverage" className={styles.navCities}>Our cities <ArrowUpRight size={14} aria-hidden="true" /></a></div></nav>

      <section id="story" className={`${styles.section} ${styles.container}`} aria-labelledby="story-heading">
        <div className={styles.sectionHead}><SectionTitle number="01" label="Our beginnings" id="story-heading">It started with<br />a Bengaluru garage.</SectionTitle><div className={styles.headCopy}><p>Before Fiixup, we were running Quick Mechanic in HSR Layout. The workshop taught us that good repair starts with listening, checking, and understanding the fault.</p><p>In 2020, we started a separate company to bring that practical experience closer to the customer. That company is Fiixup.</p></div></div>
        <div className={styles.history}>
          <div className={styles.historyBridge} aria-hidden="true"><span>THE EXPERIENCE BEHIND THE IDEA</span><ArrowRight size={20} /></div>
          <ol className={styles.historyChapters}>
            <li><span className={styles.year}>2000<span aria-hidden="true">.</span></span><div className={styles.chapterLine}><Wrench size={21} aria-hidden="true" /><span>THE WORKSHOP</span></div><h3>Quick Mechanic</h3><p>Our garage is established in HSR Layout, Bengaluru. Real vehicles, everyday problems, and hands-on repair become the foundation of our experience.</p><span className={styles.historyPlace}><MapPin size={14} aria-hidden="true" />HSR Layout, Bengaluru</span></li>
            <li><span className={styles.year}>2020<span aria-hidden="true">.</span></span><div className={styles.chapterLine}><CarFront size={22} aria-hidden="true" /><span>THE DOORSTEP COMPANY</span></div><h3>Fiixup</h3><p>We start Fiixup as a separate company for doorstep car and bike repair and 24/7 roadside assistance, using technology to make requesting help easier.</p><span className={styles.historyPlace}><MapPin size={14} aria-hidden="true" />Started in Bengaluru, India</span></li>
          </ol>
          <div className={styles.historyToday}><span>AND TODAY</span><p>Workshop experience. Mobile assistance.<br /><strong>A practical next step for your vehicle.</strong></p><a href="#model" aria-label="See how Fiixup works"><ArrowDown size={23} aria-hidden="true" /></a></div>
        </div>
        <aside className={styles.sharedNumber}><Phone size={18} aria-hidden="true" /><p><strong>Two businesses. The same contact number.</strong> We use <a href={`tel:${MAIN_PHONE}`}>{MAIN_PHONE_DISPLAY}</a> for Quick Mechanic and Fiixup, including the Quick Mechanic Google Business Profile. Quick Mechanic is our garage; Fiixup is our separate doorstep and roadside assistance company.</p></aside>
      </section>

      <section id="model" className={`${styles.section} ${styles.model}`} aria-labelledby="model-heading"><div className={styles.container}>
        <div className={styles.sectionHead}><SectionTitle number="02" label="How Fiixup works" id="model-heading">How our doorstep<br />service works.</SectionTitle><div className={styles.headCopy}><p>Start with the symptoms. You do not need to know which part has failed. We review the request, arrange suitable assistance, and explain the next step.</p><p>Our aim is straightforward: less confusion for you, and a repair decision based on what the vehicle needs.</p></div></div>
        <div className={styles.serviceDiagram}>
          <div className={styles.diagramTop}><span>FROM YOUR REQUEST TO THE NEXT STEP</span><span>CAR · MOTORCYCLE · SCOOTER</span></div>
          <ol className={styles.journey}>
            <li><span className={styles.stepNumber}>01</span><div className={styles.stepIcon}><MapPin size={28} strokeWidth={1.4} aria-hidden="true" /></div><h3>Share what happened</h3><p>Your location, vehicle model, and symptoms help us review the request and confirm availability and an arrival estimate.</p><span className={styles.stepArrow} aria-hidden="true"><ArrowRight size={21} /></span></li>
            <li><span className={styles.stepNumber}>02</span><div className={styles.stepIcon}><Search size={28} strokeWidth={1.4} aria-hidden="true" /></div><h3>Inspect &amp; explain</h3><p>The technician performs relevant checks and explains the findings. More testing is discussed when the cause is unclear.</p><span className={styles.stepArrow} aria-hidden="true"><ArrowRight size={21} /></span></li>
            <li><span className={styles.stepNumber}>03</span><div className={styles.stepIcon}><ShieldCheck size={28} strokeWidth={1.4} aria-hidden="true" /></div><h3>You approve the work</h3><p>Options, parts, additional labour, and charges are explained before extra paid work. You decide how to proceed.</p></li>
          </ol>
          <div className={styles.outcomeLabel}><span>THEN, THE SUITABLE NEXT STEP</span></div>
          <div className={styles.outcomes}><div><Wrench size={23} aria-hidden="true" /><div><h3>Care at your location</h3><p>Suitable checks, maintenance, and repairs at home, at work, or roadside.</p></div></div><div><Truck size={25} aria-hidden="true" /><div><h3>Workshop or recovery support</h3><p>When safety, specialist equipment, or the repair scope calls for it.</p></div></div></div>
          <p className={styles.diagramFoot}>After the work: understand what was done, what to watch for, and any applicable warranty or follow-up guidance.</p>
        </div>
        <div className={styles.serviceIndexHead}><h3>What we can help with</h3><Link href="/services" className={styles.textLink}>All Fiixup services <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        <div className={styles.serviceIndex}>{services.map((service, index) => { const Icon = ServiceIcons[index]; return <Link href={service.href} className={styles.serviceRow} key={service.title}><Icon size={23} strokeWidth={1.5} aria-hidden="true" /><div><h4>{service.title}</h4><p>{service.text}</p></div><ArrowUpRight size={20} aria-hidden="true" /></Link>; })}</div>
      </div></section>

      <section id="people" className={`${styles.section} ${styles.container}`} aria-labelledby="people-heading">
        <div className={styles.peopleGrid}>
          <div className={styles.peopleVisual}><figure><Image src="/assets/Motercycle_repair.webp" alt="Hands using a tool to maintain a motorcycle engine" width={612} height={408} sizes="(max-width: 760px) 100vw, 45vw" /><figcaption>Hands-on motorcycle maintenance</figcaption></figure><div className={styles.craftLine}><span>LEARN THE SYSTEM.</span><span>UNDERSTAND THE SYMPTOM.</span><span>CHECK THE CAUSE.</span></div></div>
          <div className={styles.peopleCopy}><SectionTitle number="03" label="The people behind the work" id="people-heading">Meet one of our<br />mobile mechanics.</SectionTitle><div className={styles.personIdentity}><span className={styles.personMark} aria-hidden="true"><Wrench size={25} strokeWidth={1.4} /></span><div><h3>Md. Jakir Hussain</h3><p>Mobile mechanic · Fiixup</p></div></div><p>With a mechanic for a father, Jakir began learning automotive repair around 2004. Basic workshop tasks grew into experience with punctures, brakes, clutches, motorcycle maintenance, car mechanical systems, and electrical problems.</p><p>Much of his professional experience developed at our Quick Mechanic garage in Bengaluru. Today, he brings that workshop understanding to Fiixup’s mobile service.</p><p className={styles.peopleLesson}><span>THE WORKSHOP LESSON</span>A starting fault is not automatically a new battery. The cause could be a connection, a fuse, the starter, or something else. <strong>Relevant checks come first.</strong></p></div>
        </div>
      </section>

      <section id="on-call" className={`${styles.section} ${styles.fieldStory}`} aria-labelledby="case-heading"><div className={styles.container}>
        <div className={styles.fieldHeading}><SectionTitle number="04" label="A real service account" id="case-heading">Four in the morning.<br />A car that would not start.</SectionTitle><p>HSR Layout, Bengaluru<br /><time dateTime="2026-10-02">2 October 2026</time><br /><span>Battery &amp; starting assistance</span></p></div>
        <div className={styles.caseGrid}>
          <div className={styles.caseVisual}>
            <svg className={styles.clockFace} viewBox="0 0 300 300" role="img" aria-labelledby="clock-title"><title id="clock-title">Around four o’clock in the morning</title><circle cx="150" cy="150" r="132" /><circle cx="150" cy="150" r="114" />{Array.from({length:12},(_,i)=><line key={i} x1="150" y1="27" x2="150" y2={i%3===0?"42":"35"} transform={`rotate(${i*30} 150 150)`} />)}<path d="M150 150V62" className={styles.minuteHand} /><path d="m150 150 61 35" className={styles.hourHand} /><circle cx="150" cy="150" r="6" className={styles.clockPin} /><text x="150" y="209" textAnchor="middle">4:00 AM</text></svg>
            <p>The car had been parked overnight.<br /><strong>By morning, it would not start.</strong></p><div className={styles.caseAssignment}><span>ATTENDING MECHANIC</span><strong>Md. Jakir Hussain</strong></div>
          </div>
          <ol className={styles.caseSteps}>
            <li><span>01 / THE CHECKS</span><h3>Look beyond the symptom</h3><p>Jakir checked the battery and connections, considering possible wiring and connection-related faults before recommending the next step.</p></li>
            <li><span>02 / THE ASSISTANCE</span><h3>A discharged battery. A successful start.</h3><p>A discharged battery was identified. Suitable jump-start assistance got the car started. It did not establish that the underlying battery or charging system was permanently repaired.</p></li>
            <li><span>03 / THE GUIDANCE</span><h3>Explain what happens next</h3><p>The battery was under its manufacturer’s warranty. The customer was advised to monitor the problem and use the applicable warranty support if it returned.</p></li>
            <li className={styles.caseFollowup}><Check size={20} aria-hidden="true" /><div><span>FOLLOW-UP · 3 OCTOBER 2026</span><p>The customer reported that the car was working properly.</p></div></li>
          </ol>
        </div>
      </div></section>

      <section id="focus" className={`${styles.section} ${styles.container}`} aria-labelledby="focus-heading">
        <div className={styles.focusGrid}><div className={styles.focusIntro}><SectionTitle number="05" label="What we are building towards" id="focus-heading">What we’re<br />working on now.</SectionTitle><p>Our goal is to make dependable vehicle care easier to access. These are the priorities guiding how we improve Fiixup.</p><div className={styles.focusPrinciple}><span>OUR DIRECTION</span><p>Experienced people.<br />Useful technology.<br /><strong>Real service capacity.</strong></p></div></div><ol className={styles.priorities}>{priorities.map((item,index)=><li key={item.title}><span>0{index+1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol></div>
      </section>

      <section id="coverage" className={`${styles.section} ${styles.coverage}`} aria-labelledby="coverage-heading"><div className={styles.container}>
        <div className={styles.sectionHead}><SectionTitle number="06" label="Where we help" id="coverage-heading">Find Fiixup<br />in your city.</SectionTitle><div className={styles.headCopy}><p>We support requests in selected localities across these cities. Share the actual location so our team can confirm a suitable service, available resources, and an arrival estimate.</p></div></div>
        <div className={styles.cityIndex}>{cities.map((city,index)=><Link href={city.href} key={city.name}><span className={styles.cityNumber}>0{index+1} <MapPin size={17} aria-hidden="true" /></span><h3>{city.name}</h3><p>{city.alternate}</p><span className={styles.cityCta}>Explore local services <ArrowUpRight size={19} aria-hidden="true" /></span></Link>)}</div><p className={styles.coverageNote}>City pages describe doorstep and roadside coverage. They do not mean we have a walk-in garage in every neighbourhood. Our Quick Mechanic garage is in HSR Layout, Bengaluru.</p>
      </div></section>

      <section id="questions" className={`${styles.section} ${styles.container} ${styles.faqGrid}`} aria-labelledby="faq-heading"><div><SectionTitle number="07" label="Useful to know" id="faq-heading">Questions<br />about Fiixup.</SectionTitle><p className={styles.faqIntro}>About our beginnings, our service, and what to expect when you contact us.</p><a className={styles.textLink} href={`mailto:${MAIN_EMAIL}`}>Ask our team <ArrowUpRight size={17} aria-hidden="true" /></a></div><div className={styles.faqs}>{faqs.map(faq=><details key={faq.question}><summary><span>{faq.question}</span><ChevronDown size={19} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></section>

      <section className={styles.closing} aria-labelledby="closing-heading"><div className={`${styles.container} ${styles.closingGrid}`}><div><Label>For the everyday. And the unexpected.</Label><h2 id="closing-heading">Need help with<br /><span>your car or bike?</span></h2><p>Share your vehicle, location, and symptoms. We’ll help you understand the suitable next step.</p></div><div className={styles.closingActions}><Link className={styles.button} href="/contact#contact-form">Request vehicle assistance <ArrowUpRight size={19} aria-hidden="true" /></Link><a href={`tel:${MAIN_PHONE}`}><Phone size={18} aria-hidden="true" />{MAIN_PHONE_DISPLAY}</a><span>24/7 roadside assistance</span></div></div></section>
    </article>
  );
}
