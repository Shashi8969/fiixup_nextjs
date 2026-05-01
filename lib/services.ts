// lib/services.ts
// ─────────────────────────────────────────────────────────────────────────────
// ALL DATA IS HERE — no hardcoding in components.
// To update a service page: edit this file only.
// Future: replace array with API/DB fetch keeping the same ServiceData shape.
// ─────────────────────────────────────────────────────────────────────────────
import type { ServiceData } from "./models/service.model";

const services: ServiceData[] = [

  // ══════════════════════════════════════════════════════════════════════════
  // BIKE SERVICES
  // ══════════════════════════════════════════════════════════════════════════

  {
    slug: "bike-service-at-home",
    title: "Bike Service at Home — Doorstep Two-Wheeler Servicing",
    shortTitle: "Bike General Service",
    category: "bike",
    icon: "Bike",
    tagline: "Complete bike servicing at your home or office — no garage, no waiting.",
    description:
      "Fiixup's doorstep bike service brings a certified mechanic to your home, office, or apartment parking in Bengaluru and Chennai. We handle full two-wheeler servicing for all brands — Honda, Bajaj, TVS, Royal Enfield, Yamaha, Hero, KTM, Suzuki, and more. Our service includes engine oil change, air filter cleaning, chain lubrication, brake adjustment, spark plug check, and tyre pressure — everything a full garage service covers, delivered right where your bike is parked. Starting from ₹349 with a 30-day warranty.",
    price: "₹349",
    priceNumeric: 349,
    duration: "1–2 hrs",
    stats: [
      { value: "30 min", label: "Avg. Arrival" },
      { value: "4.9★", label: "Rating" },
      { value: "30-day", label: "Warranty" },
      { value: "24/7", label: "Available" },
    ],
    heroChecks: [
      "Certified & verified mechanics",
      "Transparent pricing — no surprises",
      "All bike brands covered",
      "30-day service warranty",
    ],
    features: [
      "Engine oil drain & refill with correct-grade oil",
      "Air filter cleaning or replacement",
      "Chain cleaning, lubrication & tension adjustment",
      "Brake pad & shoe inspection & adjustment",
      "Tyre pressure check & top-up",
      "Spark plug inspection & replacement",
      "30-day service warranty included",
    ],
    pricingRows: [
      { label: "Basic Service (labour only)", vehicle: "bike", priceFrom: 349, note: "Oil & filter extra" },
      { label: "Full Service with Oil Change", vehicle: "bike", priceFrom: 599, note: "Mineral oil included" },
      { label: "Full Service — Semi-Synthetic Oil", vehicle: "bike", priceFrom: 799, note: "Semi-synthetic included" },
      { label: "Premium Service (Royal Enfield / KTM)", vehicle: "bike", priceFrom: 999, note: "Correct grade oil included" },
      { label: "Scooter Full Service", vehicle: "bike", priceFrom: 499, note: "Activa, Jupiter, Access, etc." },
    ],
    competitorPricing: [
      { competitor: "Local Garage", theirPrice: "₹800–1,200", ourPrice: "₹349–999", advantage: "Up to 40% cheaper" },
      { competitor: "Authorized Service Centre", theirPrice: "₹1,500–3,500", ourPrice: "₹349–999", advantage: "Save ₹1,000+" },
      { competitor: "Other Doorstep Apps", theirPrice: "₹699–1,299", ourPrice: "₹349–999", advantage: "Best doorstep price" },
    ],
    pricingDisclaimer: "Prices are indicative. Final quote confirmed before work starts. No hidden charges.",
    bikeBrands: ["Honda Activa", "Honda Shine", "Honda CB300R", "Bajaj Pulsar", "Bajaj Dominar", "TVS Apache", "TVS Jupiter", "Royal Enfield Classic", "Royal Enfield Bullet", "Royal Enfield Meteor", "Royal Enfield Himalayan", "Yamaha R15", "Yamaha FZ", "Hero Splendor", "Hero HF Deluxe", "KTM Duke 200", "KTM Duke 390", "Suzuki Access", "Suzuki Gixxer"],
    guide: {
      title: "The Complete Guide to Bike Servicing in Bengaluru & Chennai",
      intro: "Regular bike servicing is the single most cost-effective thing you can do to extend your motorcycle or scooter's lifespan. India's city roads — potholed, dusty, and often waterlogged — put bikes under stress that many riders underestimate. This guide covers everything you need to know about how often to service your bike, what a full service includes, and why doorstep service is now the smarter choice for Bengaluru and Chennai riders.",
      sections: [
        {
          heading: "How Often Should You Service Your Bike?",
          body: "Most bike manufacturers recommend a service every 3,000 km for mineral oil bikes, or every 5,000 km for semi-synthetic oil bikes. For riders who use their bike daily for commuting in heavy city traffic — like Electronic City to Koramangala or Anna Nagar to OMR — the heat and stop-start conditions degrade oil faster than highway driving. A practical rule: service every 3 months or 3,000 km, whichever comes first. If you notice reduced fuel efficiency, a heavier clutch pull, or a slightly rougher idle before your service interval, don't wait — book early.",
        },
        {
          heading: "What Does a Full Bike Service Include?",
          body: "A complete doorstep bike service at Fiixup covers engine oil drain and refill with the manufacturer-recommended oil grade, oil filter replacement (if due), air filter cleaning or replacement, chain cleaning and lubrication with correct chain lube, chain tension adjustment, brake pad and shoe inspection with adjustment or replacement, tyre pressure check and inflation, spark plug inspection and replacement, throttle and clutch cable lubrication, and a full health check with a written report. We also check the battery terminals, all lights, and horn — things most garages skip.",
        },
        {
          heading: "Choosing the Right Engine Oil for Your Bike",
          body: "Selecting the correct oil viscosity is critical. Royal Enfield models require 15W-50, KTM Duke and RC require 10W-40, most Honda and Bajaj bikes use 10W-30 or 10W-40, and most scooters use 10W-30. Using the wrong grade leads to premature engine wear. Fiixup's technicians are trained on manufacturer specifications for every popular Indian bike model and will never fill the wrong oil. We carry mineral, semi-synthetic, and fully synthetic grades.",
        },
        {
          heading: "Doorstep Bike Service vs. Garage Service",
          body: "The traditional garage model requires you to ride your bike — which may already have issues — to a service centre, wait for hours or come back the next day, and pay for the overhead of a physical shop. Doorstep service eliminates all of this. Fiixup's technician comes to your home, apartment parking, or office within 60 minutes, completes the full service in under 2 hours, and charges 20–40% less than an authorized service centre for equivalent work. Our mechanics are background-verified and carry professional tools — not a back-alley operation.",
        },
        {
          heading: "Top SEO Keywords for Bike Service in Bengaluru & Chennai",
          body: "Riders in Bengaluru most commonly search for: bike service near me Bengaluru, doorstep bike service Bangalore, bike mechanic near me HSR Layout, bike mechanic near me Koramangala, Royal Enfield service near me Bengaluru, KTM service near me Bangalore. In Chennai: bike service near me Chennai, two wheeler service near me Chennai, bike mechanic near me Anna Nagar, bike mechanic near me OMR, doorstep bike service Chennai. Fiixup covers all these areas and more.",
        },
      ],
      conclusion: "A well-serviced bike is safer, more fuel-efficient, and holds its resale value better. Whether you ride a Honda Activa for your daily commute or a Royal Enfield for weekend trips on Nandi Hills, Fiixup brings professional servicing to your door — saving you time, money, and the hassle of garage visits.",
    },
    testimonials: [
      { name: "Karthik S.", area: "HSR Layout, Bengaluru", vehicle: "Royal Enfield Classic 350", rating: 5, text: "Got my RE serviced right in my apartment parking. The mechanic explained every step, used correct 15W-50 oil, and the bike feels like new. Saved ₹800 vs my authorised dealer.", date: "April 2026" },
      { name: "Divya R.", area: "Koramangala, Bengaluru", vehicle: "Honda Activa 6G", rating: 5, text: "Called at 10am, mechanic arrived by 11am at my office basement. Full service done in 1.5 hrs. Transparent billing — not a rupee more than quoted.", date: "March 2026" },
      { name: "Sanjay M.", area: "Anna Nagar, Chennai", vehicle: "Bajaj Pulsar NS200", rating: 5, text: "My Pulsar was jerky and consuming more fuel. Fiixup's mechanic did a full service, cleaned the carburetor, and adjusted the chain. Completely solved. Excellent service.", date: "April 2026" },
      { name: "Lakshmi P.", area: "OMR, Chennai", vehicle: "TVS Jupiter", rating: 5, text: "Never knew doorstep bike service was this good. Mechanic wore gloves, cleaned up after himself, and gave me a detailed report. Will only use Fiixup from now.", date: "March 2026" },
    ],
    faqs: [
      { q: "How much does a doorstep bike service cost?", a: "A basic doorstep bike service starts from ₹349. Full service with oil change, chain, air filter, and spark plug starts from ₹599. You get a detailed quote before work begins — no hidden charges." },
      { q: "How often should I get my bike serviced?", a: "Every 3,000–5,000 km or every 3 months, whichever comes first. For heavy city or delivery use, service every 2,500 km." },
      { q: "Do you service Royal Enfield, KTM, and other premium bikes?", a: "Yes. We service all popular brands including Royal Enfield (Bullet, Classic, Meteor, Himalayan), KTM (Duke, Adventure, RC), Yamaha R15, and all others." },
      { q: "Can I book same-day doorstep bike service?", a: "Yes. Same-day doorstep bike service slots are available in Bengaluru and Chennai. Book on our website or call your city's helpline." },
      { q: "Is the service available inside gated societies and apartments?", a: "Yes. Share the gate entry details when booking and our technician handles the rest. We service bikes inside apartment complexes, housing societies, and office campuses." },
      { q: "What oil grade do you use for my bike?", a: "We use the manufacturer-recommended oil grade for your exact bike model — 15W-50 for Royal Enfield, 10W-40 for KTM, 10W-30 for most Honda and Bajaj bikes. We never use the wrong grade." },
      { q: "Is there a warranty on the bike service?", a: "Yes. All bike servicing comes with a 30-day warranty. If any covered issue recurs within 30 days, we fix it free of charge." },
    ],
    metaTitle: "Bike Service at Home | Doorstep Two-Wheeler Servicing in Bengaluru & Chennai",
    metaDescription: "Get complete bike servicing at your doorstep in Bengaluru & Chennai. Certified mechanics for Honda, Bajaj, Royal Enfield, TVS, KTM & all brands. 24/7 available. Starting ₹349. Book now.",
    metaKeywords: "bike service at home, doorstep bike service bangalore, two wheeler service near me, mobile bike mechanic, bike servicing at home, motorcycle service near me, scooter service at home, bike mechanic near me, two wheeler servicing near me, bike general service, doorstep two wheeler service, home bike service, bike service near me bengaluru, bike service near me chennai",
    relatedSlugs: ["bike-oil-change-at-home", "bike-brake-clutch-repair", "bike-chain-sprocket-service", "bike-battery-replacement-at-home"],
  },

  {
    slug: "bike-oil-change-at-home",
    title: "Bike Oil Change at Home | Doorstep Engine Oil Service",
    shortTitle: "Bike Oil Change",
    category: "bike",
    icon: "Droplet",
    tagline: "Fresh engine oil in 20 minutes — we come to you.",
    description:
      "Fiixup's doorstep bike oil change service brings a certified technician to your location with the correct-grade engine oil for your specific bike model. Regular oil changes extend engine life, improve fuel efficiency, and prevent costly breakdowns. We handle oil drain, refill, and oil filter replacement for all two-wheeler brands — Honda Activa, Royal Enfield, Bajaj Pulsar, TVS Apache, Yamaha, KTM, and every popular Indian bike and scooter. The job is done in under 30 minutes with no mess left behind. Starting from ₹249.",
    price: "₹249",
    priceNumeric: 249,
    duration: "20–30 min",
    stats: [
      { value: "20 min", label: "Service Time" },
      { value: "4.9★", label: "Rating" },
      { value: "₹249", label: "Starting Price" },
      { value: "24/7", label: "Available" },
    ],
    heroChecks: [
      "Correct oil grade for your exact model",
      "Zero mess — spill-free disposal kit",
      "All popular brands in stock",
      "Done in under 30 minutes",
    ],
    features: [
      "Engine oil drain & refill with OEM-grade oil",
      "Oil filter replacement (if due)",
      "Correct oil grade for your exact bike model",
      "Mineral, semi-synthetic & fully synthetic options",
      "Oil level check & top-up after fill",
      "Next service reminder sticker fitted",
      "Zero mess — we carry a disposal kit",
    ],
    pricingRows: [
      { label: "Bike Oil Change (Mineral, labour + oil)", vehicle: "bike", priceFrom: 249, note: "10W-30 / 10W-40 mineral" },
      { label: "Bike Oil Change + Filter Replacement", vehicle: "bike", priceFrom: 399, note: "Oil filter included" },
      { label: "Semi-Synthetic Oil Change", vehicle: "bike", priceFrom: 449, note: "Semi-synthetic included" },
      { label: "Royal Enfield / KTM Oil Change", vehicle: "bike", priceFrom: 549, note: "15W-50 / 10W-40 specific" },
      { label: "Fully Synthetic Oil Change", vehicle: "bike", priceFrom: 699, note: "Full synthetic included" },
    ],
    competitorPricing: [
      { competitor: "Local Mechanic", theirPrice: "₹350–600", ourPrice: "₹249–699", advantage: "Same price, at your door" },
      { competitor: "Authorized Service Centre", theirPrice: "₹800–1,800", ourPrice: "₹249–699", advantage: "Save up to ₹1,100" },
      { competitor: "Quick Lube Shops", theirPrice: "₹400–700", ourPrice: "₹249–699", advantage: "Doorstep convenience free" },
    ],
    pricingDisclaimer: "Oil grade and filter compatibility confirmed before starting. All prices include labour. No hidden charges.",
    bikeBrands: ["Honda Activa", "Honda Shine", "Bajaj Pulsar", "Bajaj Dominar", "TVS Apache", "TVS Jupiter", "Royal Enfield Classic 350", "Royal Enfield Bullet 350", "Royal Enfield Himalayan", "Yamaha FZ-S", "Yamaha R15", "Hero Splendor", "Hero HF Deluxe", "KTM Duke 200", "KTM Duke 390", "Suzuki Access", "Suzuki Gixxer", "Ola S1 (accessory battery)"],
    guide: {
      title: "Complete Guide to Bike Engine Oil Change in Bengaluru & Chennai",
      intro: "Engine oil is your bike's lifeblood. Changing it on schedule is the cheapest and most effective maintenance you can do. This guide covers everything — from how often to change, which oil grade to use, what happens if you skip it, and why doorstep oil change is now the most convenient option for Bengaluru and Chennai bikers.",
      sections: [
        {
          heading: "How Often Should You Change Bike Engine Oil?",
          body: "The interval depends on the oil type. Mineral oil (the most common): change every 2,000–3,000 km. Semi-synthetic: every 4,000–5,000 km. Fully synthetic: every 6,000–8,000 km. For city riders in Bengaluru and Chennai who do a lot of stop-start traffic, the heat and short trips degrade oil faster — lean towards the shorter end of these intervals. Check the oil level every month — if it looks black or falls below the minimum mark, change it immediately regardless of kilometres.",
        },
        {
          heading: "Which Oil Grade Does My Bike Need?",
          body: "Using the correct viscosity is non-negotiable. Royal Enfield Classic 350, Bullet 350, Meteor 350: 15W-50. KTM Duke 200/390, RC 390, Adventure 390: 10W-40. Honda Activa 6G, Honda Shine, Honda CB300R: 10W-30. Bajaj Pulsar NS200, RS200: 10W-40. TVS Apache RTR 160/200: 10W-40. Yamaha R15 V4: 10W-40. Hero Splendor: 20W-50 (older models), 10W-30 (newer models). Fiixup's technicians know the correct grade for every model — they never fill blindly.",
        },
        {
          heading: "Signs Your Bike Oil Needs Changing Right Now",
          body: "Dark or black oil on the dipstick (fresh oil is amber). Oil level below the minimum mark on the sight glass. Engine running noisier than usual (tapping or clattering sounds). Fuel efficiency dropping noticeably. Bike feeling sluggish or heavy throttle response. Mileage increasing past your service interval. Any of these signs means book an oil change today — waiting makes engine wear compound exponentially.",
        },
        {
          heading: "What Happens If You Don't Change Your Bike Oil?",
          body: "Old, degraded oil loses its lubrication properties. Metal engine components start grinding against each other, generating heat and wear particles. These particles contaminate the remaining oil, accelerating the damage. Over weeks, this leads to increased fuel consumption, power loss, engine overheating, and ultimately — seized engine components requiring an expensive engine rebuild. An oil change costs ₹249–699. An engine rebuild costs ₹15,000–80,000. The math is obvious.",
        },
      ],
      conclusion: "Regular oil changes are the lowest-cost, highest-impact maintenance for any bike. With Fiixup's doorstep oil change service in Bengaluru and Chennai, there's no excuse to skip — book online, our technician arrives at your location in under an hour, and the job is done in 20–30 minutes without disturbing your day.",
    },
    testimonials: [
      { name: "Arjun K.", area: "Whitefield, Bengaluru", vehicle: "KTM Duke 390", rating: 5, text: "Used the correct 10W-40 for my Duke, done in 25 minutes at my apartment. Mechanic even checked the filter and advised replacement next time. Clean, professional job.", date: "April 2026" },
      { name: "Meera T.", area: "Velachery, Chennai", vehicle: "Honda Activa 6G", rating: 5, text: "My Activa oil was way overdue. Fiixup came home, drained the old oil cleanly and filled the right grade. Zero mess in my parking. Loved the reminder sticker they put!", date: "March 2026" },
    ],
    faqs: [
      { q: "How much does a bike oil change cost at home?", a: "Bike oil change starts from ₹249 including labour. Oil filter replacement is charged separately if required. Full pricing is confirmed before work begins." },
      { q: "How often should I change my bike's engine oil?", a: "Every 2,000–3,000 km for mineral oil, or every 5,000–6,000 km for semi-synthetic or fully synthetic oil. Check your owner's manual for your specific model." },
      { q: "What oil grades do you carry?", a: "We carry 10W-30, 10W-40, 15W-50, and 20W-50 grades suitable for all Indian bike and scooter models." },
      { q: "Can you change oil for Royal Enfield and KTM bikes?", a: "Yes. We carry manufacturer-recommended oil grades for Royal Enfield (15W-50), KTM (10W-40), and all premium bike models." },
      { q: "Is the old oil disposed safely?", a: "Yes. We carry sealed waste oil bags and dispose of the old oil responsibly — no oil spill in your parking space." },
    ],
    metaTitle: "Bike Oil Change at Home | Doorstep Engine Oil Service Bengaluru & Chennai",
    metaDescription: "Doorstep bike oil change by certified mechanics in Bengaluru & Chennai. All brands — Activa, Pulsar, Royal Enfield, KTM, Yamaha. Done in 30 min. Starting ₹249. Book now.",
    metaKeywords: "bike oil change at home, doorstep bike oil change, two wheeler oil change near me, motorcycle oil change at home, bike engine oil change near me, scooter oil change at home, bike oil service near me, two wheeler oil service, bike oil change cost, mobile bike oil change, bike oil change bangalore, bike oil change chennai",
    relatedSlugs: ["bike-service-at-home", "bike-engine-repair", "bike-chain-sprocket-service"],
  },

  {
    slug: "bike-battery-jumpstart-near-me",
    title: "Bike Battery Jump Start Near Me | 24/7 Service",
    shortTitle: "Bike Jump Start",
    category: "battery",
    icon: "Zap",
    tagline: "Bike battery dead? Jump start at your location in under 30 minutes.",
    description:
      "Fiixup provides 24/7 doorstep bike and scooter battery jump start service for all two-wheeler brands — Honda Activa, Royal Enfield, Bajaj Pulsar, TVS Jupiter, KTM Duke, Yamaha, Hero, and more. Our technician arrives with professional portable jump start equipment, safely starts your bike, and tests the battery health to prevent future breakdown. If the battery is beyond recovery, we carry replacement units for most popular models. No extra charge for night call-outs. Starting from ₹299.",
    price: "₹299",
    priceNumeric: 299,
    duration: "20–45 min",
    stats: [
      { value: "30 min", label: "Avg. Arrival" },
      { value: "24/7", label: "Available" },
      { value: "₹299", label: "Starting Price" },
      { value: "All Brands", label: "Supported" },
    ],
    heroChecks: [
      "Safe professional jump start equipment",
      "Battery health test included",
      "No extra night/weekend charge",
      "Replacement available if needed",
    ],
    features: [
      "Safe doorstep bike jump start",
      "Battery voltage & health test",
      "Charging system (regulator/rectifier) check",
      "Battery terminal cleaning",
      "Immediate battery replacement if required",
      "All bike & scooter brands supported",
      "24/7 — including nights & weekends",
    ],
    pricingRows: [
      { label: "Bike Battery Jump Start", vehicle: "bike", priceFrom: 299, note: "Includes battery health test" },
      { label: "Scooter Jump Start", vehicle: "bike", priceFrom: 299, note: "Activa, Jupiter, Access, etc." },
      { label: "Jump Start + Battery Replacement", vehicle: "bike", priceFrom: 799, note: "Battery cost included" },
    ],
    competitorPricing: [
      { competitor: "Roadside Mechanic", theirPrice: "₹300–600", ourPrice: "₹299", advantage: "Same price, faster & safer" },
      { competitor: "Battery Shop", theirPrice: "₹500–800 (with tow)", ourPrice: "₹299", advantage: "We come to you" },
      { competitor: "Other Roadside Apps", theirPrice: "₹399–599", ourPrice: "₹299", advantage: "Save ₹100–300" },
    ],
    pricingDisclaimer: "Jump start price is fixed at ₹299. Battery replacement (if needed) quoted separately before fitting.",
    bikeBrands: ["Honda Activa", "Honda Shine", "Bajaj Pulsar", "Royal Enfield Classic", "Royal Enfield Bullet", "TVS Jupiter", "Yamaha FZ", "Hero Splendor", "KTM Duke", "Suzuki Access", "Ola S1", "Ather 450X", "TVS iQube"],
    guide: {
      title: "Complete Guide to Bike Battery Jump Start & Replacement in Bengaluru & Chennai",
      intro: "A dead bike battery is one of the most frustrating experiences — especially when you're running late for work or stuck in an unfamiliar area at night. This guide explains why bike batteries fail, how to safely jump start a bike, what battery health check reveals, and when to replace rather than jump start.",
      sections: [
        {
          heading: "Why Do Bike Batteries Die Suddenly?",
          body: "The most common causes: leaving lights or indicators on overnight (parasitic drain), a battery that is 2+ years old and has lost capacity, a failing regulator/rectifier that overcharges or undercharges the battery, infrequent use (bikes parked for weeks discharge faster), and extreme heat — Chennai and Bengaluru summers above 35°C accelerate battery degradation significantly. A battery that fails once is warning you — if it fails again within a month, replacement is overdue.",
        },
        {
          heading: "Is It Safe to Jump Start a Modern Bike?",
          body: "Yes, when done correctly with the right equipment. Consumer jump cables carry risks of voltage spikes that can damage the bike's ECU and sensitive electronics. Fiixup's technicians use professional-grade jump start packs with surge protection and current-limiting circuits, making the process safe for all modern bikes including fuel-injected models like Royal Enfield Meteor, KTM Duke 390, and Yamaha R15 V4.",
        },
        {
          heading: "Jump Start vs. Battery Replacement — How to Decide",
          body: "After a jump start, our technician runs a battery load test. A healthy battery will hold charge and the load test reading will stay above 12.4V under load. If the battery drops below 11.5V under load, it cannot reliably hold a charge and will fail again soon — typically within days. In this case, replacement is strongly advised. We always show you the test results on our meter so you can make an informed decision — never pressured.",
        },
        {
          heading: "How Long Does a Bike Battery Last?",
          body: "In Indian climatic conditions — particularly in hot cities like Chennai and Bengaluru — a bike battery typically lasts 2–3 years. Signs of a battery nearing end of life: slow or hesitant self-start, dim headlights even with the engine running, a battery that drains overnight even when the bike is parked with no lights on, and a battery that needs frequent jump starts.",
        },
      ],
      conclusion: "Whether it's a dead battery at 3am in Indiranagar or a slow-start scooter in your Chennai apartment parking, Fiixup's 24/7 bike jump start service reaches you in under 30 minutes — with no extra night surcharge. Call now and get moving.",
    },
    testimonials: [
      { name: "Rahul N.", area: "Indiranagar, Bengaluru", vehicle: "Royal Enfield Classic 350", rating: 5, text: "Bike battery died at 11pm. Fiixup arrived in 28 minutes, jump started it, tested the battery, and told me honestly it needed replacement. Replaced on the spot. No drama.", date: "April 2026" },
      { name: "Pooja S.", area: "T. Nagar, Chennai", vehicle: "Honda Activa 6G", rating: 5, text: "Activa wouldn't start in the morning. Fiixup came in 25 minutes, jump started it, and found the regulator was also weak. Fixed everything. Very professional.", date: "March 2026" },
    ],
    faqs: [
      { q: "How much does bike jump start service cost near me?", a: "Bike battery jump start starts from ₹299. Battery replacement, if needed, is charged separately and quoted before fitting." },
      { q: "My bike's self-start isn't working — can you help?", a: "Yes. Most self-start failures are due to a weak or dead battery. Our technician jump starts the bike and tests the full electrical system to find the root cause." },
      { q: "Can you jump start an electric scooter?", a: "Electric scooter battery systems are different from conventional bikes. We handle basic 12V accessory battery jump starts on some EV scooters — call us to confirm for your model." },
      { q: "How do I know if my bike battery is dead or if it's another issue?", a: "If the self-start clicks once or is silent, the battery is likely dead. If it cranks slowly, the battery is weak. If it cranks fine but doesn't start, it's likely a fuel or spark issue — our mechanic diagnoses all three on-site." },
      { q: "Is jump start service available at night?", a: "Yes. Available 24/7 with no extra charge for nights, weekends, or public holidays." },
    ],
    metaTitle: "Bike Battery Jump Start Near Me | 24/7 Service Bengaluru & Chennai | Fiixup",
    metaDescription: "Bike battery dead? 24/7 doorstep jump start service for all brands — Activa, Royal Enfield, Pulsar, KTM & more in Bengaluru & Chennai. Arrives in 30 min. Starting ₹299. Call now.",
    metaKeywords: "bike battery jump start near me, bike jump start near me, two wheeler battery jump start, scooter jump start near me, bike battery dead near me, bike battery boost near me, motorcycle jump start near me, bike self start not working near me, bike jump start service near me, bike jump start bangalore, bike jump start chennai",
    relatedSlugs: ["bike-battery-replacement-at-home", "bike-electrical-repair", "bike-breakdown-service"],
  },

  {
    slug: "bike-battery-replacement-at-home",
    title: "Bike Battery Replacement at Home | Doorstep Service",
    shortTitle: "Bike Battery Replacement",
    category: "battery",
    icon: "Battery",
    tagline: "New bike battery fitted at your location — fresh start, no hassle.",
    description:
      "Fiixup's doorstep bike battery replacement service brings a certified technician with a replacement battery for your specific two-wheeler model. A failing battery causes self-start issues, dim headlights, and unexpected breakdowns. Our technician tests your existing battery first using a professional load tester, confirms it needs replacement, and fits the correct new battery for your bike or scooter brand. We carry batteries for Honda, Bajaj, TVS, Royal Enfield, Yamaha, KTM, Hero, and all popular scooters including electric models. Starting from ₹799 (battery inclusive).",
    price: "₹799",
    priceNumeric: 799,
    duration: "20–40 min",
    stats: [
      { value: "30 min", label: "Avg. Arrival" },
      { value: "30-day", label: "Warranty" },
      { value: "₹799", label: "Starting (incl. battery)" },
      { value: "All Brands", label: "Covered" },
    ],
    heroChecks: [
      "Battery health test before replacement",
      "OEM-matched battery supplied & fitted",
      "30-day battery warranty",
      "Old battery safely disposed",
    ],
    features: [
      "Battery load test before replacement",
      "Correct battery for your bike model supplied & fitted",
      "Old battery safely removed & disposed",
      "Terminal cleaning & anti-corrosion treatment",
      "Charging system check after fitting",
      "All bike & scooter brands supported",
      "30-day battery warranty",
    ],
    pricingRows: [
      { label: "Scooter Battery Replacement (Activa, Jupiter)", vehicle: "bike", priceFrom: 799, note: "Battery + fitting included" },
      { label: "Commuter Bike Battery (Splendor, Shine)", vehicle: "bike", priceFrom: 899, note: "Battery + fitting included" },
      { label: "Sports Bike Battery (Pulsar, Apache, FZ)", vehicle: "bike", priceFrom: 999, note: "Battery + fitting included" },
      { label: "Royal Enfield Battery Replacement", vehicle: "bike", priceFrom: 1299, note: "Battery + fitting included" },
      { label: "KTM / Premium Bike Battery", vehicle: "bike", priceFrom: 1499, note: "Battery + fitting included" },
    ],
    competitorPricing: [
      { competitor: "Battery Shop (+ towing cost)", theirPrice: "₹1,200–2,000", ourPrice: "₹799–1,499", advantage: "No towing needed" },
      { competitor: "Authorized Service Centre", theirPrice: "₹1,500–2,500", ourPrice: "₹799–1,499", advantage: "Save up to ₹1,000" },
      { competitor: "Local Mechanic", theirPrice: "₹900–1,400", ourPrice: "₹799–1,499", advantage: "Warranty + verified parts" },
    ],
    pricingDisclaimer: "Price includes battery + fitting. Battery brand and capacity confirmed for your exact bike model before purchase. 30-day warranty on all batteries.",
    bikeBrands: ["Honda Activa", "Honda Shine", "Honda CB300R", "Bajaj Pulsar", "Bajaj CT100", "TVS Jupiter", "TVS Apache", "Royal Enfield Classic 350", "Royal Enfield Bullet", "Yamaha FZ", "Yamaha R15", "Hero Splendor", "Hero HF Deluxe", "KTM Duke 200/390", "Suzuki Access", "Suzuki Gixxer"],
    guide: {
      title: "Bike Battery Replacement Guide — When to Replace & What to Choose",
      intro: "Most Indian bike owners only think about the battery when it fails completely. But there are early warning signs — and knowing them can help you avoid being stranded. This guide covers everything about bike battery replacement: when to replace, how to choose the right battery, and why doorstep replacement is the smartest option in Bengaluru and Chennai.",
      sections: [
        {
          heading: "Signs Your Bike Battery Needs Replacement (Not Just a Jump Start)",
          body: "A jump start is a temporary fix. If your battery shows these signs, it needs replacement: Slow or sluggish self-start even after a recent jump start. Battery drains overnight when parked with all switches off. Headlights dim noticeably when the engine idles. The battery requires jump starts more than once a month. Battery is 2+ years old and you've had any issues. Our load tester measures the battery's actual capacity — if it's below 70% of rated capacity, replacement is recommended.",
        },
        {
          heading: "Which Battery Is Right for My Bike?",
          body: "Batteries are specified by their capacity (Ah) and physical dimensions. Honda Activa 6G uses a 5Ah sealed battery. Royal Enfield 350 uses a 12Ah battery. KTM Duke 390 uses an 8Ah AGM battery. Using the wrong capacity — especially a lower Ah — causes the electrical system to work harder and shortens both battery and regulator/rectifier life. Fiixup's technicians match the correct battery to your exact model from our database before fitting.",
        },
        {
          heading: "Sealed vs. Conventional Batteries — Which Should You Choose?",
          body: "Most modern bikes use maintenance-free sealed lead-acid (MF SLA) or AGM batteries. These don't require water top-ups and are sealed against leaks. Conventional flooded batteries (requiring periodic distilled water) are found in older bike models. Fiixup supplies both types. For modern bikes, we always recommend sealed MF or AGM batteries for reliability and zero maintenance.",
        },
      ],
      conclusion: "Don't wait until your bike refuses to start. If your battery is 2+ years old or showing slow-start symptoms, book a battery health test — Fiixup checks it for free when you book any other service. Doorstep battery replacement in Bengaluru and Chennai means you get a new, correctly-matched battery fitted at your home in under 40 minutes.",
    },
    testimonials: [
      { name: "Suresh B.", area: "JP Nagar, Bengaluru", vehicle: "Royal Enfield Meteor 350", rating: 5, text: "Battery died suddenly. Fiixup came with the correct 12Ah battery for my Meteor, did a load test to confirm it was dead, and replaced it in 30 minutes. Excellent service.", date: "April 2026" },
      { name: "Ananya V.", area: "Adyar, Chennai", vehicle: "TVS Jupiter", rating: 5, text: "My Jupiter's self-start had become very slow. They came, tested the battery, said it was at 40% capacity, and replaced it on the spot. Starts perfectly now.", date: "March 2026" },
    ],
    faqs: [
      { q: "How much does bike battery replacement cost at home?", a: "Bike battery replacement starts from ₹799 (battery + fitting included). Price varies by battery size and brand. Full quote before fitting." },
      { q: "How do I know if my bike battery needs replacement?", a: "Slow or no self-start, dim headlights even after a recent jump start, battery that won't hold charge overnight, or a battery over 2 years old in a hot city like Chennai or Bengaluru." },
      { q: "How long does a bike battery last?", a: "Typically 2–3 years in Indian climatic conditions. Heat-intensive cities reduce battery life faster." },
      { q: "Do you provide a warranty on the battery?", a: "Yes. 30-day warranty on all batteries we supply and fit. If the battery has any manufacturing defect, we replace it free." },
    ],
    metaTitle: "Bike Battery Replacement at Home | Doorstep Service Bengaluru & Chennai",
    metaDescription: "Bike battery dead or weak? Doorstep bike battery replacement for all brands in Bengaluru & Chennai. Supply & fit at your location. 30-day warranty. Starting ₹799. Book now.",
    metaKeywords: "bike battery replacement at home, bike battery replacement near me, two wheeler battery replacement, scooter battery replacement near me, doorstep bike battery service, motorcycle battery replacement near me, bike battery change near me, bike battery replacement cost, mobile bike battery service, bike battery bangalore, bike battery chennai",
    relatedSlugs: ["bike-battery-jumpstart-near-me", "bike-electrical-repair", "bike-service-at-home"],
  },

  {
    slug: "bike-brake-clutch-repair",
    title: "Bike Brake & Clutch Repair at Doorstep",
    shortTitle: "Bike Brake & Clutch",
    category: "bike",
    icon: "Settings",
    tagline: "Spongy brakes or stiff clutch? Fixed safely at your doorstep.",
    description:
      "Fiixup's doorstep bike brake and clutch repair service keeps your two-wheeler safe and responsive. Worn brakes are a leading cause of bike accidents in India — our certified technicians inspect, adjust, and replace brake pads, shoes, discs, and clutch cables at your home or office. We handle drum brakes, hydraulic disc brakes, and all clutch types for every popular Indian bike and scooter brand. A spongy brake pedal, grinding sounds, or a slipping clutch are signs to call us immediately. Starting from ₹399.",
    price: "₹399",
    priceNumeric: 399,
    duration: "1–2 hrs",
    stats: [
      { value: "30 min", label: "Avg. Arrival" },
      { value: "4.9★", label: "Rating" },
      { value: "₹399", label: "Starting Price" },
      { value: "All Brands", label: "Covered" },
    ],
    heroChecks: [
      "Safety-critical — don't delay",
      "Disc & drum brake specialists",
      "Hydraulic brake bleeding included",
      "30-day warranty on all repairs",
    ],
    features: [
      "Brake pad & shoe inspection & replacement",
      "Hydraulic disc brake bleeding & fluid top-up",
      "Drum brake adjustment & lining replacement",
      "Clutch cable adjustment & replacement",
      "Clutch plate wear inspection",
      "Brake lever & perch repair",
      "All bike & scooter brands supported",
    ],
    pricingRows: [
      { label: "Brake Adjustment (front or rear)", vehicle: "bike", priceFrom: 199, note: "Labour only" },
      { label: "Drum Brake Pad/Shoe Replacement", vehicle: "bike", priceFrom: 399, note: "Parts extra" },
      { label: "Disc Brake Pad Replacement", vehicle: "bike", priceFrom: 499, note: "OEM pads included" },
      { label: "Hydraulic Disc Brake Bleeding", vehicle: "bike", priceFrom: 349, note: "Brake fluid included" },
      { label: "Clutch Cable Replacement", vehicle: "bike", priceFrom: 299, note: "Cable included" },
      { label: "Full Brake + Clutch Service", vehicle: "bike", priceFrom: 799, note: "Front, rear & clutch" },
    ],
    competitorPricing: [
      { competitor: "Local Bike Shop", theirPrice: "₹500–900", ourPrice: "₹399–799", advantage: "Doorstep + warranty" },
      { competitor: "Authorized Service Centre", theirPrice: "₹1,000–2,500", ourPrice: "₹399–799", advantage: "Save up to ₹1,700" },
      { competitor: "Other Mobile Mechanics", theirPrice: "₹600–1,000", ourPrice: "₹399–799", advantage: "Better price, same quality" },
    ],
    pricingDisclaimer: "Parts are charged separately at transparent market rates. Labour pricing shown above. Full quote confirmed before work starts.",
    bikeBrands: ["Honda Activa", "Honda CB300R", "Bajaj Pulsar NS200", "Bajaj Dominar 400", "TVS Apache RTR 200", "Royal Enfield Classic 350", "Royal Enfield Himalayan", "Yamaha R15", "Yamaha MT-15", "KTM Duke 390", "Suzuki Gixxer SF", "Hero Xtreme 160R"],
    guide: {
      title: "Bike Brake & Clutch Repair — Safety Guide for Bengaluru & Chennai Riders",
      intro: "Brakes are the most safety-critical component on any bike. In India's dense city traffic and rain-slicked roads, well-maintained brakes are the difference between a close call and an accident. This guide covers everything about bike brake types, warning signs, and clutch maintenance for riders in Bengaluru and Chennai.",
      sections: [
        {
          heading: "Warning Signs Your Bike Brakes Need Immediate Attention",
          body: "Do not ignore these: Squealing or grinding sounds when you apply brakes. Reduced stopping power — bike takes longer to stop than before. Brake lever or pedal feels spongy or goes all the way to the handlebar/footpeg. Bike pulls to one side when braking. Vibration through the lever or pedal when braking. Visible grooves or scoring on the brake disc. Any of these signs means the brakes are dangerous — stop riding and call Fiixup immediately.",
        },
        {
          heading: "Drum Brakes vs. Disc Brakes — What You Need to Know",
          body: "Drum brakes (found on older bikes and scooters) use brake shoes pressed against the inside of a drum. They require periodic adjustment as the shoes wear. Disc brakes (standard on modern bikes) use hydraulic callipers pressing brake pads against a rotor for much better stopping power. Disc brakes require brake fluid changes every 2 years as the fluid absorbs moisture and loses effectiveness. Hydraulic disc brakes should never be bled without proper equipment — Fiixup's technicians carry professional bleeding kits.",
        },
        {
          heading: "Common Clutch Problems and What Causes Them",
          body: "Clutch cable too tight or loose: causes difficulty engaging or disengaging gears. Cable snap: bike won't move at all. Clutch plates worn: clutch slips under acceleration — the engine revs but the bike doesn't accelerate proportionally. Oil-soaked clutch plates: bike creeps forward in gear even with clutch pulled. Most clutch cable issues are resolved in under 30 minutes at your doorstep. Clutch plate replacement requires more time but is also possible on-site for most bike models.",
        },
      ],
      conclusion: "Brake and clutch safety cannot be deferred. If your bike is showing any warning signs, book Fiixup's doorstep brake and clutch service in Bengaluru or Chennai today. Our technicians arrive within 60 minutes with OEM-grade brake pads, discs, and clutch components to restore your bike's safety on the spot.",
    },
    testimonials: [
      { name: "Vikram L.", area: "Koramangala, Bengaluru", vehicle: "KTM Duke 390", rating: 5, text: "Front disc brake was vibrating badly. Fiixup bled the hydraulic system and replaced the pads at my apartment. Brakes feel like new. Professional and fast.", date: "April 2026" },
      { name: "Preethi R.", area: "Nungambakkam, Chennai", vehicle: "Honda Activa 6G", rating: 5, text: "Clutch was very stiff and brakes were squealing. Fiixup fixed both in one visit. They even showed me the worn pads before replacing. Very transparent.", date: "March 2026" },
    ],
    faqs: [
      { q: "How do I know if my bike brakes need replacement?", a: "Squealing or grinding sounds, reduced stopping power, brake lever or pedal going all the way down, or visible wear on brake pads are clear signs. Don't wait — book immediately." },
      { q: "Do you service hydraulic disc brakes?", a: "Yes. We bleed hydraulic disc brakes, top up brake fluid, and replace pads for all disc brake-equipped bikes and scooters." },
      { q: "Can clutch issues be fixed at home?", a: "Cable-related clutch issues (adjustment, cable replacement) are fixed on the spot in under an hour. Clutch plate replacement is also possible at your doorstep for most bike models." },
      { q: "How much does bike brake pad replacement cost?", a: "Brake pad replacement starts from ₹199 per axle (labour). Parts are charged separately at transparent rates — full quote before work begins." },
    ],
    metaTitle: "Bike Brake & Clutch Repair at Doorstep Bengaluru & Chennai | Fiixup",
    metaDescription: "Spongy brakes or stiff clutch? Doorstep bike brake pad replacement & clutch repair in Bengaluru & Chennai. All brands. Safe, fast & affordable. Starting ₹399. Book now.",
    metaKeywords: "bike brake repair near me, bike brake pad replacement at home, two wheeler brake service, clutch repair near me, bike disc brake repair, motorcycle brake service near me, bike clutch adjustment near me, doorstep brake repair, bike brake pad replacement cost, scooter brake service near me, bike brake bangalore, bike brake chennai",
    relatedSlugs: ["bike-service-at-home", "bike-suspension-tyre-service", "bike-electrical-repair"],
  },

  {
    slug: "bike-engine-repair",
    title: "Bike Engine Repair at Doorstep | All Brands",
    shortTitle: "Bike Engine Repair",
    category: "bike",
    icon: "Cog",
    tagline: "Knocking engine? Power loss? We diagnose & fix it on the spot.",
    description:
      "Fiixup's mobile bike engine repair service sends a certified two-wheeler mechanic to your location to diagnose and repair engine problems for all motorcycle and scooter brands. Whether you hear a knocking sound, notice power loss, see excessive smoke, feel vibrations, or experience oil leaks — our technicians carry diagnostic tools and common engine parts to fix most issues on the spot. We service all brands: Royal Enfield, Honda, Bajaj, TVS, KTM, Yamaha, Hero, and more. For major overhauls, we arrange towing to our partner workshop. Starting from ₹599.",
    price: "₹599",
    priceNumeric: 599,
    duration: "1–4 hrs",
    stats: [
      { value: "30 min", label: "Avg. Arrival" },
      { value: "4.9★", label: "Rating" },
      { value: "₹599", label: "Starting Price" },
      { value: "All Brands", label: "Covered" },
    ],
    heroChecks: [
      "On-spot engine diagnosis",
      "Common parts carried in service van",
      "Towing arranged if needed",
      "30-day repair warranty",
    ],
    features: [
      "Engine noise & vibration diagnosis",
      "Piston, valve & gasket inspection",
      "Carburettor cleaning & tuning",
      "Fuel injection system service",
      "Oil leak detection & repair",
      "Overheating diagnosis & coolant service",
      "Performance tuning & power restoration",
    ],
    pricingRows: [
      { label: "Engine Diagnosis & Report", vehicle: "bike", priceFrom: 299, note: "Credited towards repair" },
      { label: "Carburettor Cleaning & Tuning", vehicle: "bike", priceFrom: 599, note: "Parts extra if needed" },
      { label: "Valve Adjustment", vehicle: "bike", priceFrom: 499, note: "Labour only" },
      { label: "Oil Leak Repair", vehicle: "bike", priceFrom: 699, note: "Gasket/seal cost extra" },
      { label: "Engine Performance Tuning", vehicle: "bike", priceFrom: 799, note: "All makes supported" },
    ],
    competitorPricing: [
      { competitor: "Authorized Workshop", theirPrice: "₹1,500–5,000", ourPrice: "₹599–1,500", advantage: "60% cheaper, same quality" },
      { competitor: "Local Mechanic", theirPrice: "₹700–2,000", ourPrice: "₹599–1,500", advantage: "Doorstep + warranty" },
      { competitor: "Other Mobile Services", theirPrice: "₹800–2,500", ourPrice: "₹599–1,500", advantage: "Best mobile rate" },
    ],
    pricingDisclaimer: "Diagnosis charge is credited towards repair cost. Parts quoted separately. No hidden charges.",
    bikeBrands: ["Royal Enfield Classic 350", "Royal Enfield Bullet 350", "Royal Enfield Himalayan 450", "KTM Duke 200/390", "Bajaj Pulsar NS200", "Honda CB300R", "Yamaha R15 V4", "TVS Apache RTR 200 4V", "Suzuki Gixxer SF", "Honda Activa 6G", "Bajaj Chetak Electric"],
    guide: {
      title: "Bike Engine Problems — Causes, Diagnosis & Repair Guide",
      intro: "Engine problems are the most feared and misunderstood category of bike issues. Many riders continue riding with a knocking engine or power loss, hoping it resolves itself — it never does, and delay always makes it worse and more expensive. This guide helps you identify engine symptoms early and understand what they mean.",
      sections: [
        {
          heading: "Common Bike Engine Symptoms & Their Causes",
          body: "Knocking or tapping sound: worn piston rings, low oil, or a loose rocker arm. Excessive smoke (blue): burning engine oil — worn valve seals or piston rings. Excessive smoke (black): rich fuel mixture — dirty air filter or faulty carburetor/FI injector. Sudden power loss: clogged carburetor jets, faulty fuel pump, or spark plug failure. Engine overheating: low coolant (liquid-cooled bikes), clogged fins (air-cooled), or low engine oil. Rough idle or stalling: carburetor cleaning needed, idle speed adjustment, or air-fuel mixture off.",
        },
        {
          heading: "Carburettor vs. Fuel Injection — Which Does Your Bike Have?",
          body: "Older bikes and many budget commuters still use carburettors — a mechanical device that mixes air and fuel. Carb problems (clogging, flooding, air leak) are common and fixable on-site. Modern bikes from 2017 onwards increasingly use Fuel Injection (FI) — electronically controlled for better efficiency and lower emissions. FI bikes require OBD diagnostics to read fault codes. Fiixup carries OBD scanners for FI bikes and conventional carb tools for carburetor-equipped models.",
        },
        {
          heading: "When Does Bike Engine Repair Require a Workshop?",
          body: "Most minor engine issues — carb cleaning, valve adjustment, oil seal replacement, oil leak repairs — are handled at your doorstep in 1–4 hours. Major work that requires workshop equipment: full engine disassembly (piston/ring replacement), cylinder reboring, crankshaft bearing replacement. In these cases, Fiixup arranges towing to our partner workshop and gives you a transparent quote before any work begins.",
        },
      ],
      conclusion: "Never ignore engine warning signs. A knocking sound today costs ₹599 to diagnose and fix. The same problem ignored for a month can cost ₹15,000 in engine rebuild costs. Call Fiixup — we diagnose honestly and fix only what's needed.",
    },
    testimonials: [
      { name: "Amit G.", area: "BTM Layout, Bengaluru", vehicle: "Royal Enfield Himalayan 450", rating: 5, text: "Himalayan was knocking at low RPM. Fiixup diagnosed a valve clearance issue, adjusted it on the spot. Knocked no more. Very knowledgeable about REs.", date: "April 2026" },
      { name: "Ravi S.", area: "Porur, Chennai", vehicle: "Bajaj Pulsar NS200", rating: 5, text: "Bike was losing power and running rich. Mechanic cleaned the carburetor, adjusted the air-fuel mixture. Power restored completely. Great job.", date: "March 2026" },
    ],
    faqs: [
      { q: "What are signs my bike engine needs repair?", a: "Knocking or tapping sounds, excessive smoke from exhaust, sudden power loss, abnormal vibrations, engine overheating, or oil leaking onto the ground are all warning signs. Don't delay — call Fiixup." },
      { q: "Can you repair scooter engines too?", a: "Yes. We repair engines for all scooters — Honda Activa, TVS Jupiter, Suzuki Access, Yamaha Fascino, Bajaj Chetak, and more." },
      { q: "My bike engine is making a knocking noise — is it serious?", a: "Yes. Knocking usually signals low oil, worn piston rings, or a loose component. Don't ride further — call our mechanic for an immediate on-site diagnosis." },
      { q: "How long does bike engine repair take?", a: "Minor repairs (carb cleaning, valve adjustment) take 1–2 hours on-site. Major engine work may require a follow-up or workshop visit which we arrange for you." },
    ],
    metaTitle: "Bike Engine Repair at Doorstep Bengaluru & Chennai | All Brands | Fiixup",
    metaDescription: "Bike engine knocking or losing power? Expert doorstep engine repair for all brands — Royal Enfield, Bajaj, Honda, KTM in Bengaluru & Chennai. 24/7 service. Starting ₹599.",
    metaKeywords: "bike engine repair near me, motorcycle engine repair at home, two wheeler engine repair, doorstep bike engine repair, bike engine knocking repair, scooter engine repair near me, Royal Enfield engine repair, bike engine overhaul near me, mobile bike engine mechanic, motorcycle engine service near me, bike engine repair bangalore, bike engine repair chennai",
    relatedSlugs: ["bike-service-at-home", "bike-oil-change-at-home", "bike-electrical-repair"],
  },

  {
    slug: "bike-electrical-repair",
    title: "Bike Electrical Repair at Doorstep | Battery, Lights & Wiring",
    shortTitle: "Bike Electrical Repair",
    category: "bike",
    icon: "Zap",
    tagline: "Battery, lights, wiring — all electrical issues fixed at your location.",
    description:
      "Fiixup provides complete bike electrical repair at your doorstep — from dead batteries and faulty wiring to broken headlights, indicator problems, and starter motor failures. Our certified technicians carry multi-meters, battery testers, and electrical parts for all popular two-wheeler brands. Most electrical issues — dead self-start, dim headlight, non-functioning horn, or short circuits — are diagnosed and fixed on the spot without needing a garage visit. Available 24/7 across Bengaluru and Chennai. Starting from ₹299.",
    price: "₹299",
    priceNumeric: 299,
    duration: "30–90 min",
    stats: [
      { value: "30 min", label: "Avg. Arrival" },
      { value: "24/7", label: "Available" },
      { value: "₹299", label: "Starting Price" },
      { value: "All Brands", label: "Covered" },
    ],
    heroChecks: [
      "Multi-meter & battery tester on-site",
      "Most issues fixed in one visit",
      "All wiring & lighting issues covered",
      "24/7 emergency available",
    ],
    features: [
      "Battery health test & replacement",
      "Self-start & starter motor repair",
      "Headlight, tail light & indicator repair",
      "Horn & switch repair",
      "Wiring short circuit diagnosis & repair",
      "Speedometer & instrument cluster fix",
      "Charging system (regulator/rectifier) check",
    ],
    pricingRows: [
      { label: "Electrical Diagnosis", vehicle: "bike", priceFrom: 149, note: "Credited towards repair" },
      { label: "Headlight / Tail Light Repair", vehicle: "bike", priceFrom: 299, note: "Bulb cost extra" },
      { label: "Horn / Indicator Repair", vehicle: "bike", priceFrom: 249, note: "Parts extra if needed" },
      { label: "Wiring Short Circuit Repair", vehicle: "bike", priceFrom: 499, note: "Complex wiring extra" },
      { label: "Regulator/Rectifier Replacement", vehicle: "bike", priceFrom: 799, note: "Part cost included" },
      { label: "Self-Start Motor Repair", vehicle: "bike", priceFrom: 699, note: "Parts extra" },
    ],
    competitorPricing: [
      { competitor: "Auto Electrician Shop", theirPrice: "₹500–1,200", ourPrice: "₹299–799", advantage: "Doorstep + faster" },
      { competitor: "Authorized Service Centre", theirPrice: "₹800–2,500", ourPrice: "₹299–799", advantage: "Save up to ₹1,700" },
      { competitor: "Other Mobile Services", theirPrice: "₹400–1,000", ourPrice: "₹299–799", advantage: "Competitive price" },
    ],
    pricingDisclaimer: "Diagnosis fee credited against repair. Parts costs quoted separately before purchase. No hidden charges.",
    bikeBrands: ["Honda Activa", "Honda Shine", "Bajaj Pulsar", "TVS Jupiter", "Royal Enfield Classic", "Royal Enfield Meteor", "Yamaha FZ", "Hero Splendor", "KTM Duke", "Suzuki Access"],
    guide: {
      title: "Bike Electrical Problems — Complete Diagnosis & Repair Guide",
      intro: "Electrical problems are the most common reason bikes refuse to start or develop erratic behaviour. Unlike mechanical issues which often develop gradually, electrical failures can be sudden. This guide covers the most common bike electrical problems and how our technicians diagnose and fix them at your doorstep.",
      sections: [
        {
          heading: "Most Common Bike Electrical Problems",
          body: "Bike won't start (self-start clicks or silent): Dead or weak battery is the cause 80% of the time. Check: headlights dim when starting? Battery is the issue. Headlights, indicators not working: Blown fuse or faulty relay — a 5-minute fix. Bulb failure — parts carried by our technician. Wiring harness damage (common after accidents or rodent damage). Charging system not working: Battery drains within a day of being charged. Caused by a failed regulator/rectifier (the voltage regulator). A common fault in bikes over 3 years old. Speedometer not working: Usually a broken speedometer cable on older bikes, or a faulty sensor on digital instruments.",
        },
        {
          heading: "How Fiixup Diagnoses Bike Electrical Issues",
          body: "Our technicians use a digital multi-meter to measure battery voltage (should be 12.6V+ fully charged), test charging output at the regulator (should be 13.5–14.5V at idle), check for voltage drops across wiring connectors (indicating corrosion or loose joints), test continuity across fuses and relays, and use a power probe to trace short circuits. This systematic approach finds the root cause — not just the symptom — so the fix is permanent.",
        },
      ],
      conclusion: "Bike electrical issues rarely self-resolve. A dim indicator today can become a complete electrical failure next week. Fiixup's mobile electricians reach your location in Bengaluru and Chennai within 30–60 minutes and resolve most electrical issues on the spot. Call now for a free preliminary diagnosis.",
    },
    testimonials: [
      { name: "Naveen K.", area: "Marathahalli, Bengaluru", vehicle: "Yamaha FZ-S V3", rating: 5, text: "All my indicators stopped working suddenly. Fiixup traced it to a blown relay in 15 minutes and replaced it. Cost ₹349 total. Couldn't be simpler.", date: "April 2026" },
      { name: "Deepa M.", area: "Perambur, Chennai", vehicle: "TVS Jupiter", rating: 5, text: "Scooter battery was draining overnight. Mechanic found the regulator was faulty, replaced it. Battery holds charge perfectly now. Great detective work!", date: "March 2026" },
    ],
    faqs: [
      { q: "My bike won't start — can you fix it at home?", a: "Yes. Most no-start issues are electrical — dead battery, faulty starter motor, or a blown fuse — and are resolved at your doorstep within an hour." },
      { q: "Do you carry batteries for all bike brands?", a: "We carry batteries for Honda, Bajaj, TVS, Yamaha, Royal Enfield, KTM, Hero, and most popular bike models." },
      { q: "My bike's self-start is not working but kickstart works — what's the issue?", a: "This usually points to a weak battery, a faulty starter motor, or a bad relay. Our mechanic tests all three on the spot and fixes the root cause." },
      { q: "How much does bike electrical repair cost?", a: "Electrical diagnosis starts from ₹149. Repairs like battery replacement, headlight fix, or wiring repair are priced separately based on parts required — all quoted before work starts." },
    ],
    metaTitle: "Bike Electrical Repair at Doorstep Bengaluru & Chennai | Fiixup",
    metaDescription: "Bike battery dead or lights not working? Doorstep bike electrical repair — battery, wiring, self-start & more in Bengaluru & Chennai. All brands. 24/7. Starting ₹299.",
    metaKeywords: "bike electrical repair near me, bike battery replacement at home, two wheeler electrical repair, bike self start not working, bike headlight repair near me, motorcycle electrical repair near me, bike wiring repair, bike battery dead repair near me, doorstep bike electrical service, bike electrical bangalore, bike electrical chennai",
    relatedSlugs: ["bike-battery-jumpstart-near-me", "bike-battery-replacement-at-home", "bike-engine-repair"],
  },

  {
    slug: "bike-chain-sprocket-service",
    title: "Bike Chain & Sprocket Service at Doorstep",
    shortTitle: "Chain & Sprocket",
    category: "bike",
    icon: "Cog",
    tagline: "Loose, rusted, or stretched chain? Replaced in minutes at your location.",
    description:
      "A worn or poorly lubricated chain is one of the most common causes of power loss, jerky acceleration, and dangerous riding. Fiixup's doorstep bike chain and sprocket service covers cleaning, lubrication, tension adjustment, and complete chain-sprocket kit replacement for all motorcycle and scooter brands. Our technicians arrive with the correct chain size and sprocket specs for your bike model, complete the replacement on-site, and test ride to confirm proper tension. Starting from ₹199.",
    price: "₹199",
    priceNumeric: 199,
    duration: "30–60 min",
    stats: [
      { value: "30 min", label: "Service Time" },
      { value: "4.9★", label: "Rating" },
      { value: "₹199", label: "Starting Price" },
      { value: "All Brands", label: "Covered" },
    ],
    heroChecks: [
      "Correct chain size for your model",
      "Tension test ride after service",
      "OEM-grade chain & sprocket kits",
      "Done in under 1 hour",
    ],
    features: [
      "Chain cleaning & degreasing",
      "Chain lubrication with quality chain lube",
      "Chain tension adjustment",
      "Chain wear measurement & advice",
      "Full chain & sprocket kit replacement",
      "Sprocket bolt torque check",
      "All bike & scooter brands covered",
    ],
    pricingRows: [
      { label: "Chain Cleaning & Lubrication", vehicle: "bike", priceFrom: 199, note: "Labour + lube included" },
      { label: "Chain Tension Adjustment", vehicle: "bike", priceFrom: 199, note: "Labour only" },
      { label: "Chain Replacement Only", vehicle: "bike", priceFrom: 499, note: "OEM chain included" },
      { label: "Full Chain + Sprocket Kit", vehicle: "bike", priceFrom: 899, note: "Chain + both sprockets" },
      { label: "Royal Enfield Chain Kit", vehicle: "bike", priceFrom: 1299, note: "RE-specific heavy-duty chain" },
    ],
    competitorPricing: [
      { competitor: "Local Workshop", theirPrice: "₹700–1,500", ourPrice: "₹199–1,299", advantage: "Save up to 40%" },
      { competitor: "Authorized Service Centre", theirPrice: "₹1,200–2,500", ourPrice: "₹199–1,299", advantage: "Save ₹1,000+" },
      { competitor: "Other Mobile Mechanics", theirPrice: "₹500–1,200", ourPrice: "₹199–1,299", advantage: "Doorstep convenience" },
    ],
    pricingDisclaimer: "Chain & sprocket kit prices vary by bike model. Labour is included. Full quote before work starts.",
    bikeBrands: ["Royal Enfield Classic 350", "Royal Enfield Bullet 350", "KTM Duke 200/390", "Bajaj Pulsar NS200", "Yamaha R15", "Honda CB300R", "TVS Apache 200 4V", "Suzuki Gixxer", "Hero Xtreme 160R", "Bajaj Dominar 400"],
    guide: {
      title: "Bike Chain & Sprocket Maintenance Guide — How to Know When to Replace",
      intro: "The chain and sprocket set transfers all your engine's power to the rear wheel. A worn, loose, or dry chain causes power loss, rough acceleration, and — if it snaps — a dangerous loss of control. This guide covers how to identify chain wear, when to replace vs. just lubricate, and what a doorstep chain service includes.",
      sections: [
        {
          heading: "How to Check If Your Bike Chain Needs Replacement",
          body: "The simplest test: push the chain sideways at the midpoint (between the front and rear sprocket). A healthy chain moves less than 1cm sideways. More than 2cm means it's worn. Other signs: visible rust or tight links that don't flex smoothly, chain sag more than 3cm at midpoint, skipping or jumping on the sprocket under acceleration, chain slapping the swingarm. Our mechanic uses a chain wear gauge for a precise measurement — never guesswork.",
        },
        {
          heading: "When Should You Replace the Chain + Sprocket Together?",
          body: "Always replace the front sprocket, rear sprocket, and chain together as a kit. Installing a new chain on worn sprockets causes the new chain to wear out 3–4x faster than normal. A new sprocket on a worn chain has the same effect. The industry standard is to replace all three together — which our kit pricing reflects. The only exception: if the chain is only dirty and the sprockets are healthy, cleaning and lubrication extends the life of the whole set.",
        },
        {
          heading: "How Often Should You Lubricate the Chain?",
          body: "Every 500–700 km in normal conditions. More frequently after riding in rain (water washes out lubricant) or in dusty conditions. Use a proper chain lube — not WD-40, which is a water displacer, not a lubricant. Applying WD-40 as chain lube is one of the most common mistakes that accelerates chain wear. Fiixup uses professional chain lubricant that penetrates the rollers and provides a durable protective film.",
        },
      ],
      conclusion: "A clean, correctly-tensioned, well-lubricated chain improves fuel efficiency, smoothens acceleration, and is safer. Fiixup's doorstep chain service in Bengaluru and Chennai takes under 60 minutes — book today and your bike will feel noticeably smoother by tomorrow.",
    },
    testimonials: [
      { name: "Siddharth P.", area: "Sarjapur Road, Bengaluru", vehicle: "KTM Duke 390", rating: 5, text: "Chain was slapping the swingarm badly. Mechanic measured wear, confirmed it needed replacement, and fitted the correct O-ring chain kit. Perfect tension. Excellent.", date: "April 2026" },
      { name: "Kavitha M.", area: "Vadapalani, Chennai", vehicle: "Bajaj Pulsar NS200", rating: 5, text: "Chain was rusted and noisy. Fiixup cleaned it, lubricated it, and adjusted the tension at my apartment in 35 minutes. Bike runs so much smoother now.", date: "March 2026" },
    ],
    faqs: [
      { q: "How do I know if my bike chain needs replacement?", a: "A stretched chain sags more than 2–3 cm at mid-point, skips gears, makes a slapping sound, or shows rusting and tight links. Our mechanic measures it accurately on-site." },
      { q: "How much does bike chain replacement cost?", a: "Chain cleaning and lubrication starts from ₹199. Full chain and sprocket kit replacement starts from ₹899 including parts, depending on the bike model." },
      { q: "How often should I lubricate my bike chain?", a: "Every 500–700 km in dry conditions. More frequently after rain or if riding in dusty environments." },
      { q: "Should I replace chain and sprockets together?", a: "Yes. Always replace the full kit — front sprocket, rear sprocket, and chain — together for the best result and longest lifespan." },
    ],
    metaTitle: "Bike Chain & Sprocket Service at Doorstep Bengaluru & Chennai | Fiixup",
    metaDescription: "Loose or rusted bike chain? Doorstep chain cleaning, lubrication & sprocket replacement in Bengaluru & Chennai. All brands. Fast & affordable. Starting ₹199. Book now.",
    metaKeywords: "bike chain replacement near me, motorcycle chain service at home, bike chain lubrication near me, two wheeler chain sprocket replacement, bike chain adjustment near me, doorstep bike chain service, bike chain kit replacement near me, motorcycle chain repair near me, scooter chain service near me, bike chain bangalore, bike chain chennai",
    relatedSlugs: ["bike-service-at-home", "bike-brake-clutch-repair", "bike-suspension-tyre-service"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CAR SERVICES
  // ══════════════════════════════════════════════════════════════════════════

  {
    slug: "car-service-at-home",
    title: "Car Service at Home | Doorstep Car Servicing in Bengaluru & Chennai",
    shortTitle: "Car General Service",
    category: "car",
    icon: "Car",
    tagline: "Complete car servicing at your home or office — skip the garage queue.",
    description:
      "Fiixup's doorstep car service brings certified mechanics to your home, office, or parking lot for complete four-wheeler servicing without the garage wait. We handle all makes and models — Maruti Suzuki, Hyundai, Tata, Honda, Toyota, Kia, MG, Mahindra, Volkswagen, Skoda, Renault, and more. Our mobile car service van carries all oils, filters, and common parts to complete a full periodic service on the spot. Engine oil change, filter replacement, fluid top-ups, brake inspection, and full health check — all done at your location. Starting from ₹999.",
    price: "₹999",
    priceNumeric: 999,
    duration: "1–3 hrs",
    stats: [
      { value: "60 min", label: "Avg. Arrival" },
      { value: "4.9★", label: "Rating" },
      { value: "30-day", label: "Warranty" },
      { value: "24/7", label: "Available" },
    ],
    heroChecks: [
      "All car brands & models covered",
      "OEM-grade oils & genuine filters",
      "Written health report provided",
      "30-day service warranty",
    ],
    features: [
      "Engine oil drain & refill (correct grade)",
      "Oil, air & cabin air filter replacement",
      "All fluid levels checked & topped up",
      "Brake system inspection",
      "Tyre pressure & tread depth check",
      "Battery health test",
      "Full vehicle health report provided",
    ],
    pricingRows: [
      { label: "Basic Car Service (Oil + Filter)", vehicle: "car", priceFrom: 999, note: "Mineral oil + labour" },
      { label: "Standard Full Service", vehicle: "car", priceFrom: 1999, note: "Oil, filters, fluids, inspection" },
      { label: "Comprehensive Service (Hatchback)", vehicle: "car", priceFrom: 2499, note: "Full check + synthetic oil" },
      { label: "Comprehensive Service (SUV / Sedan)", vehicle: "car", priceFrom: 3499, note: "Full check + synthetic oil" },
      { label: "Premium / Luxury Car Service", vehicle: "car", priceFrom: 4999, note: "BMW, Mercedes, Audi etc." },
    ],
    competitorPricing: [
      { competitor: "Maruti True Value Service", theirPrice: "₹2,500–5,000", ourPrice: "₹999–3,499", advantage: "Save up to 40%" },
      { competitor: "Hyundai HMSI Service", theirPrice: "₹2,800–5,500", ourPrice: "₹999–3,499", advantage: "Doorstep + cheaper" },
      { competitor: "GoMechanic / Others", theirPrice: "₹1,500–3,000", ourPrice: "₹999–3,499", advantage: "Same quality, doorstep" },
      { competitor: "Local Garage", theirPrice: "₹1,200–2,500", ourPrice: "₹999–3,499", advantage: "Warranty + verified parts" },
    ],
    pricingDisclaimer: "Prices include labour. Oil and filter costs included as shown. Any additional parts quoted before fitting. 30-day warranty on all services.",
    carBrands: ["Maruti Swift", "Maruti Baleno", "Maruti Brezza", "Hyundai i20", "Hyundai Creta", "Tata Nexon", "Tata Punch", "Honda City", "Honda Amaze", "Toyota Innova", "Toyota Fortuner", "Kia Seltos", "Kia Sonet", "MG Hector", "Mahindra XUV700", "Mahindra Thar", "Volkswagen Taigun", "Skoda Slavia", "Renault Kwid", "Nissan Magnite"],
    guide: {
      title: "The Complete Car Servicing Guide for Bengaluru & Chennai Car Owners",
      intro: "Regular car servicing is essential for safety, reliability, and protecting the resale value of your vehicle. Yet most car owners in India go over their service intervals — often because getting to a service centre is inconvenient. Fiixup's doorstep car service eliminates that barrier. This guide covers what a full car service includes, how often you need it, and what to expect.",
      sections: [
        {
          heading: "How Often Should You Service Your Car?",
          body: "Most modern cars require servicing every 10,000 km or 6 months (whichever comes first) for standard oil, or every 15,000 km / 12 months for fully synthetic oil. For city driving in Bengaluru and Chennai — frequent stop-start traffic, AC running constantly, short trips — we recommend sticking to the kilometre interval rather than the time interval. Heavy AC use and short trips degrade engine oil faster than highway driving.",
        },
        {
          heading: "What Does a Full Car Service Include?",
          body: "A comprehensive Fiixup doorstep car service covers: Engine oil drain and refill with manufacturer-recommended grade (5W-30, 5W-40, 15W-40 depending on model). Oil filter replacement. Air filter inspection and replacement. Cabin air filter inspection and replacement. Coolant level check and top-up. Brake fluid level check. Power steering fluid check (if applicable). Windscreen washer fluid top-up. Tyre pressure check and inflation. Brake pad thickness measurement. Battery voltage test. Full undercarriage visual inspection. Written report of any issues found.",
        },
        {
          heading: "What Oil Grade Does My Car Need?",
          body: "Maruti Swift, Baleno, WagonR (petrol, K-series): 5W-30 fully synthetic. Hyundai i20, Creta (petrol): 5W-30 or 5W-40. Tata Nexon (petrol): 5W-40. Honda City (petrol): 0W-20 or 5W-30. Toyota Innova Crysta (diesel): 15W-40. Kia Seltos (petrol): 5W-30. Diesel cars generally: 15W-40 (for older models) or 5W-40 (modern common rail diesel). Fiixup's database has the correct spec for every Indian car model — we never fill the wrong grade.",
        },
        {
          heading: "Doorstep Car Service vs. Authorized Service Centre — Cost Comparison",
          body: "An authorized Maruti service centre typically charges ₹2,500–5,000 for a full service including oil change. A Hyundai HMSI service can cost ₹2,800–5,500. With Fiixup's doorstep service, the same standard of service starts from ₹999–3,499 depending on your car model — with OEM-grade parts and a 30-day warranty. You also save the time and cost of transporting the car, waiting at the service centre, and collecting it.",
        },
      ],
      conclusion: "Don't skip your car service due to the inconvenience of getting to a garage. With Fiixup, a certified mechanic comes to your home in Bengaluru or Chennai with all the tools, oils, and filters for your car model. Same quality as an authorized centre, at better prices, with zero hassle.",
    },
    testimonials: [
      { name: "Rohit V.", area: "Koramangala, Bengaluru", vehicle: "Hyundai Creta 1.5T", rating: 5, text: "Saved ₹2,000 vs my Hyundai authorized centre. Mechanic used the correct 5W-30 synthetic, replaced air and cabin filters, gave me a detailed report. Couldn't be happier.", date: "April 2026" },
      { name: "Sunita B.", area: "Nungambakkam, Chennai", vehicle: "Maruti Swift Dzire", rating: 5, text: "First time using Fiixup. Mechanic came to my apartment, did the full service in 2.5 hours. Very professional. Car engine is noticeably smoother. Booking again next service.", date: "March 2026" },
      { name: "Prasad K.", area: "Electronic City, Bengaluru", vehicle: "Tata Nexon EV", rating: 5, text: "They handled the 12V battery service and brake check on my Nexon EV. Very knowledgeable about EVs. Quick and professional.", date: "April 2026" },
      { name: "Fathima A.", area: "Anna Nagar, Chennai", vehicle: "Kia Seltos", rating: 5, text: "Perfect service at my home. Mechanic arrived on time, completed everything in 2 hours, and WhatsApped me the service report. Transparent and professional.", date: "April 2026" },
    ],
    faqs: [
      { q: "How much does a doorstep car service cost?", a: "Basic car service starts from ₹999. Full comprehensive service ranges from ₹1,999–₹3,499 depending on make, model, and age. Full pricing is given before work starts." },
      { q: "Which car brands do you service at home?", a: "All popular brands — Maruti, Hyundai, Tata, Honda, Toyota, Kia, MG, Mahindra, Volkswagen, Skoda, Renault, Nissan, and more." },
      { q: "Do you use genuine parts?", a: "Yes. We use OEM-grade or high-quality aftermarket parts. Genuine brand parts can be sourced on request." },
      { q: "Is there a warranty on the service?", a: "Yes. All car servicing comes with a 30-day warranty. If any covered issue recurs within 30 days, we fix it free of charge." },
      { q: "Can I book same-day doorstep car service?", a: "Yes. Same-day slots are available in Bengaluru and Chennai. Book on the website or call your city helpline." },
      { q: "Do you service diesel cars?", a: "Yes. We service all diesel car models including Innova Crysta, Creta diesel, Nexon diesel, and XUV700 diesel with the correct 15W-40 or 5W-40 diesel oil." },
    ],
    metaTitle: "Car Service at Home Bengaluru & Chennai | Doorstep Car Servicing | Fiixup",
    metaDescription: "Complete car servicing at your home in Bengaluru & Chennai. Certified mechanics for Maruti, Hyundai, Tata, Toyota & all brands. Starting ₹999. 30-day warranty. Book now.",
    metaKeywords: "car service at home, doorstep car service bangalore, car servicing near me, mobile car service, car mechanic at home, doorstep car servicing chennai, car service near me, home car service, car repair at home, mobile car mechanic near me, car general service at home, doorstep car repair bangalore",
    relatedSlugs: ["car-oil-change-at-home", "car-brake-service", "car-ac-service-repair", "car-engine-diagnostics"],
  },

  {
    slug: "car-battery-jumpstart-near-me",
    title: "Car Battery Jump Start Near Me | 24/7 Emergency Jump Start",
    shortTitle: "Car Jump Start",
    category: "battery",
    icon: "Zap",
    tagline: "Dead car battery? We jump start it at your location in 30 minutes.",
    description:
      "Fiixup provides 24/7 doorstep car battery jump start service across Bengaluru and Chennai. Whether your car won't start in your apartment parking, at the office, or on the roadside — our technician arrives with professional jump start equipment and safely restores your vehicle within 30–60 minutes. We also test your battery health after the jump start and advise whether replacement is needed. All car brands and models supported. No extra night or weekend charge. Starting from ₹399.",
    price: "₹399",
    priceNumeric: 399,
    duration: "30–60 min",
    stats: [
      { value: "30 min", label: "Avg. Arrival" },
      { value: "24/7", label: "Available" },
      { value: "₹399", label: "Starting Price" },
      { value: "All Cars", label: "Supported" },
    ],
    heroChecks: [
      "Professional surge-protected equipment",
      "Battery health test after jump",
      "No extra night surcharge",
      "Battery replacement available on spot",
    ],
    features: [
      "Professional jump start with surge-protected equipment",
      "Battery health test & voltage check after jump",
      "Alternator output check",
      "Battery terminal cleaning & tightening",
      "All car makes & models supported",
      "Immediate battery replacement if needed",
      "24/7 — no extra charge for nights or weekends",
    ],
    pricingRows: [
      { label: "Car Battery Jump Start", vehicle: "car", priceFrom: 399, note: "Battery health test included" },
      { label: "Jump Start + Battery Replacement (Hatchback)", vehicle: "car", priceFrom: 1999, note: "Battery + fitting included" },
      { label: "Jump Start + Battery Replacement (Sedan/SUV)", vehicle: "car", priceFrom: 2499, note: "Battery + fitting included" },
    ],
    competitorPricing: [
      { competitor: "Roadside Mechanic", theirPrice: "₹500–800", ourPrice: "₹399", advantage: "Cheaper + professional equipment" },
      { competitor: "Towing Service", theirPrice: "₹1,000–2,500 (tow + repair)", ourPrice: "₹399", advantage: "No towing needed" },
      { competitor: "Other Roadside Apps", theirPrice: "₹499–699", ourPrice: "₹399", advantage: "Save ₹100–300" },
    ],
    pricingDisclaimer: "Jump start is fixed at ₹399. Battery replacement quoted separately only if needed and confirmed by health test.",
    carBrands: ["Maruti Swift", "Maruti Baleno", "Maruti Brezza", "Hyundai i20", "Hyundai Creta", "Tata Nexon", "Honda City", "Toyota Innova", "Toyota Fortuner", "Kia Seltos", "MG Hector", "Mahindra XUV700", "Volkswagen Taigun", "Skoda Slavia", "BMW 3 Series", "Mercedes C-Class"],
    guide: {
      title: "Car Battery Jump Start Guide — What to Do When Your Car Won't Start",
      intro: "A dead car battery is one of the most common vehicle problems — affecting millions of car owners every year in India. Whether you left the lights on overnight, your battery is old, or there's an underlying charging system fault, this guide tells you exactly what to do and what happens during a professional jump start.",
      sections: [
        {
          heading: "How to Know Your Car Battery Is Dead (Not a Different Problem)",
          body: "Signs of a dead battery: Engine makes a rapid clicking sound when you turn the key (low power, starter solenoid clicking). Engine cranks slowly and struggles to start. Dashboard lights are very dim or don't come on at all. Headlights are extremely dim. Car is completely silent with no interior lights. Compare: if the engine cranks at normal speed but won't start, the issue is likely fuel or ignition, not the battery. Our technician tests the battery voltage first to confirm before jump starting.",
        },
        {
          heading: "Why Professional Jump Starting Is Safer Than DIY",
          body: "Most people think jump cables from another car are fine. They work, but they carry a risk of voltage spikes that can damage the ECU, alternator, and other sensitive electronics — particularly in modern cars with multiple computer systems. Professional jump start packs with current limiting and surge protection eliminate this risk. For modern cars like Hyundai Creta, Tata Nexon, Kia Seltos, and all European cars, professional equipment is strongly recommended.",
        },
        {
          heading: "After the Jump Start — What Our Technician Checks",
          body: "After a successful jump start, we don't just leave. We run a battery load test to measure actual battery capacity, test alternator output to confirm the battery is charging correctly (should be 13.5–14.5V at idle), check battery terminal corrosion and tightness, and advise you honestly on the battery's remaining lifespan. If the battery load test shows below 70% capacity, we recommend replacement and can do it on the spot.",
        },
      ],
      conclusion: "Whether it's 6am in your apartment parking or 11pm on a Bengaluru street, Fiixup's car battery jump start service reaches you in 30–60 minutes with the right equipment. No waiting for a tow truck, no guesswork, no damage to your car's electronics.",
    },
    testimonials: [
      { name: "Anand R.", area: "BTM Layout, Bengaluru", vehicle: "Hyundai Creta", rating: 5, text: "Car wouldn't start at 7am when I was late for a meeting. Fiixup arrived in 27 minutes. Jump started it professionally, found the battery was only 2 years old and fine. Back on the road in 45 minutes total.", date: "April 2026" },
      { name: "Kavya S.", area: "Velachery, Chennai", vehicle: "Maruti Swift", rating: 5, text: "Left the interior light on overnight. Dead battery. Fiixup came at 8am, jump started, tested the battery (healthy), and left. ₹399 total. Excellent.", date: "March 2026" },
    ],
    faqs: [
      { q: "How much does a car jump start service cost near me?", a: "Car battery jump start service starts from ₹399. If the battery needs replacement, we quote the battery price separately before fitting." },
      { q: "How do I know if my car battery is dead?", a: "Signs: the engine clicks but won't crank, headlights are very dim, the dashboard doesn't light up, or the car is completely silent when you turn the key." },
      { q: "Will a jump start fix my car permanently?", a: "A jump start gets you moving. If your battery is old or has a dead cell, it will drain again soon. Our technician tests battery health after the jump and tells you honestly if replacement is needed." },
      { q: "Can you replace my car battery at home after the jump start?", a: "Yes. We carry replacement batteries for most popular car models and can fit them at your location immediately after the jump start." },
      { q: "Is jump start service available at night?", a: "Yes. Our jump start service is available 24 hours a day, 7 days a week including nights, weekends, and public holidays — with no extra night surcharge." },
    ],
    metaTitle: "Car Battery Jump Start Near Me | 24/7 Emergency Service Bengaluru & Chennai",
    metaDescription: "Dead car battery? Emergency jump start at your location in Bengaluru & Chennai — home, office or roadside. 30–60 min arrival. All car brands. Starting ₹399. Call now.",
    metaKeywords: "car battery jump start near me, car jump start near me, battery boost near me, jump start service near me, car battery dead near me, battery jump start near me 24 hours, emergency jump start near me, car won't start near me, battery jumpstart service near me, car jump start bangalore, car jump start chennai",
    relatedSlugs: ["car-battery-replacement-at-home", "car-breakdown-service", "roadside-assistance-near-me"],
  },

  {
    slug: "car-battery-replacement-at-home",
    title: "Car Battery Replacement at Home | Doorstep Service",
    shortTitle: "Car Battery Replacement",
    category: "battery",
    icon: "Battery",
    tagline: "New car battery fitted at your home or office in under an hour.",
    description:
      "Fiixup's doorstep car battery replacement service sends a certified technician to your location with a replacement battery matched to your car's specification. A dead or weak battery is the leading cause of unexpected car breakdowns in India — particularly in cities like Bengaluru and Chennai where extreme heat degrades batteries faster. Our technician tests your existing battery first, confirms replacement is needed, fits the new battery, clears any ECU adaptation warnings, and safely disposes of the old unit. All car brands. Starting from ₹1,999 (battery inclusive).",
    price: "₹1,999",
    priceNumeric: 1999,
    duration: "30–60 min",
    stats: [
      { value: "45 min", label: "Avg. Service Time" },
      { value: "30-day", label: "Warranty" },
      { value: "₹1,999", label: "Starting (incl. battery)" },
      { value: "All Cars", label: "Covered" },
    ],
    heroChecks: [
      "Battery health test before replacement",
      "OEM-matched battery supplied & fitted",
      "ECU reset included",
      "Old battery safely disposed",
    ],
    features: [
      "Battery health test before replacement decision",
      "OEM or brand-matched battery supplied & fitted",
      "Old battery safely removed & disposed",
      "Battery terminal cleaning & corrosion treatment",
      "ECU reset & adaptation if required",
      "All car brands & models supported",
      "30-day battery warranty",
    ],
    pricingRows: [
      { label: "Hatchback Battery Replacement (Swift, i20)", vehicle: "car", priceFrom: 1999, note: "Battery + fitting included" },
      { label: "Sedan Battery Replacement (City, Dzire)", vehicle: "car", priceFrom: 2299, note: "Battery + fitting included" },
      { label: "SUV Battery Replacement (Creta, Seltos)", vehicle: "car", priceFrom: 2699, note: "Battery + fitting included" },
      { label: "Large SUV (Fortuner, Endeavour, XUV700)", vehicle: "car", priceFrom: 3499, note: "Battery + fitting included" },
      { label: "Premium/Luxury Car (BMW, Mercedes, Audi)", vehicle: "car", priceFrom: 4999, note: "AGM battery + ECU adaptation" },
    ],
    competitorPricing: [
      { competitor: "Battery Shop (Exide/Amaron dealer)", theirPrice: "₹2,500–4,000 + fitting", ourPrice: "₹1,999–4,999", advantage: "Doorstep + same brands" },
      { competitor: "Authorized Service Centre", theirPrice: "₹3,500–8,000", ourPrice: "₹1,999–4,999", advantage: "Save up to 40%" },
      { competitor: "Other Mobile Services", theirPrice: "₹2,500–5,000", ourPrice: "₹1,999–4,999", advantage: "Best mobile rate" },
    ],
    pricingDisclaimer: "All prices include battery supply, fitting, terminal cleaning, and ECU reset. 30-day warranty. Full quote before work starts.",
    carBrands: ["Maruti Swift", "Maruti Baleno", "Hyundai i20", "Hyundai Creta", "Tata Nexon", "Honda City", "Toyota Innova", "Kia Seltos", "MG Hector", "Mahindra XUV700", "Volkswagen Taigun", "BMW 3 Series", "Mercedes C-Class", "Audi A4", "Toyota Fortuner"],
    guide: {
      title: "Car Battery Replacement Guide — Signs, Costs & What to Expect",
      intro: "Car batteries in Indian cities typically last 3–5 years — but heat-intensive cities like Chennai and Bengaluru reduce this to 2–4 years. Knowing when to replace before you're stranded can save you significant time and money. This guide covers everything about car battery replacement.",
      sections: [
        {
          heading: "Signs Your Car Battery Needs Replacement",
          body: "Slow engine crank — engine turns over slowly when starting. Battery warning light on dashboard. Frequent jump starts needed (more than once in 2 weeks). Electrical accessories behaving erratically — radio resets, windows slow, AC performance drops. Visible corrosion (white or blue powder) on battery terminals. Battery case looks swollen or bloated (due to heat). Battery is 3+ years old in Bengaluru or Chennai heat. Our technician runs a professional load test — the only accurate way to know if replacement is truly needed.",
        },
        {
          heading: "Which Battery Brand Should You Choose?",
          body: "Top battery brands in India for cars: Exide — the market leader, widely available, excellent warranty. Amaron (Amara Raja) — very popular, strong performance in Indian heat conditions. Luminous — good value option. SF Sonic — reliable budget option. For luxury cars (BMW, Mercedes, Audi), we use genuine AGM (Absorbent Glass Mat) batteries that are specifically designed for the stop-start and regenerative braking systems in these cars. Standard lead-acid batteries cannot handle these loads.",
        },
        {
          heading: "ECU Adaptation After Battery Replacement — Why It Matters",
          body: "Some modern cars — particularly BMW, Mercedes-Benz, Audi, and newer Volkswagen/Skoda models — require an ECU battery adaptation after replacement. This tells the car's power management system the capacity of the new battery so it can charge it correctly. Skipping this step on these cars causes overcharging, premature battery failure, and electrical glitches. Fiixup's technicians carry OBD2 adapters with battery registration capability for all major European car brands.",
        },
      ],
      conclusion: "Don't wait until your car refuses to start. Book Fiixup's doorstep car battery replacement in Bengaluru or Chennai — we bring the correct battery for your car, test the old one first (to confirm replacement is needed), fit and adapt the new one, and dispose of the old battery responsibly. The whole process takes under an hour.",
    },
    testimonials: [
      { name: "Venkat S.", area: "Whitefield, Bengaluru", vehicle: "BMW 3 Series 320i", rating: 5, text: "BMW battery needed ECU adaptation after replacement. Fiixup brought the right AGM battery and had an OBD adapter. Proper adaptation done. Excellent — no dealer visit needed.", date: "April 2026" },
      { name: "Priya N.", area: "T. Nagar, Chennai", vehicle: "Hyundai Creta", rating: 5, text: "Battery died in my parking. Fiixup came with Amaron battery, tested the old one (confirmed dead), and replaced it in 40 minutes. Great service, correct warranty too.", date: "March 2026" },
    ],
    faqs: [
      { q: "How much does car battery replacement cost at home?", a: "Car battery replacement starts from ₹1,999 (battery + fitting included). Price varies by battery brand and car model. Full quote before fitting." },
      { q: "How long does a car battery last?", a: "Typically 3–5 years in normal conditions. Indian summer heat and frequent short trips reduce battery life. If your battery is 3+ years old and shows slow starts, book a health check." },
      { q: "Do you carry batteries for luxury cars like BMW and Mercedes?", a: "Yes. We carry AGM and EFB batteries for BMW, Mercedes-Benz, Audi, and other premium cars. These cars require ECU adaptation after battery replacement — we handle that on-site." },
      { q: "Will replacing the battery reset my car settings?", a: "Some cars reset radio presets and window positions after battery replacement. Our technician performs an ECU re-adaptation to minimise any lost settings where possible." },
    ],
    metaTitle: "Car Battery Replacement at Home Bengaluru & Chennai | Doorstep Service | Fiixup",
    metaDescription: "Get your car battery replaced at home in Bengaluru & Chennai. Doorstep service with OEM battery supply & fitting. All car brands. 30-day warranty. Starting ₹1,999. Book now.",
    metaKeywords: "car battery replacement at home, car battery replacement near me, doorstep car battery service, car battery change near me, mobile car battery replacement, car battery fitting at home, car battery near me, car battery replacement cost, new car battery at home, car battery replacement bangalore, car battery replacement chennai",
    relatedSlugs: ["car-battery-jumpstart-near-me", "car-service-at-home", "car-breakdown-service"],
  },

  {
    slug: "car-brake-service",
    title: "Car Brake Service & Brake Pad Replacement at Home",
    shortTitle: "Car Brake Service",
    category: "car",
    icon: "Car",
    tagline: "Safe brakes save lives — professional brake service at your doorstep.",
    description:
      "Fiixup provides complete doorstep car brake inspection, brake pad replacement, disc rotor check, and brake fluid flush for all car makes and models in Bengaluru and Chennai. Worn brakes are one of the most dangerous vehicle conditions on Indian roads — squealing sounds, a spongy pedal, or increased stopping distance are signs to act immediately. Our certified technicians arrive with brake pads, shoes, and brake fluid for your specific car model and complete the full brake service at your home or office without any garage visit. Starting from ₹799.",
    price: "₹799",
    priceNumeric: 799,
    duration: "1–2 hrs",
    stats: [
      { value: "60 min", label: "Avg. Arrival" },
      { value: "Safety", label: "Priority #1" },
      { value: "₹799", label: "Starting Price" },
      { value: "All Cars", label: "Covered" },
    ],
    heroChecks: [
      "Front & rear brake inspection",
      "OEM-grade brake pads supplied",
      "ABS system check included",
      "30-day warranty on all work",
    ],
    features: [
      "Full brake system inspection (front & rear)",
      "Brake pad & disc replacement",
      "Drum brake shoe inspection & replacement",
      "Brake fluid flush & refill",
      "ABS sensor inspection",
      "Brake calliper cleaning & lubrication",
      "Post-service brake performance test",
    ],
    pricingRows: [
      { label: "Brake Inspection (Front + Rear)", vehicle: "car", priceFrom: 299, note: "Credited against repair" },
      { label: "Brake Pad Replacement (1 Axle)", vehicle: "car", priceFrom: 799, note: "OEM pads included" },
      { label: "Brake Pad Replacement (Both Axles)", vehicle: "car", priceFrom: 1399, note: "Front + rear pads included" },
      { label: "Brake Fluid Flush & Refill", vehicle: "car", priceFrom: 699, note: "DOT 3 or DOT 4 fluid included" },
      { label: "Disc Rotor Resurfacing", vehicle: "car", priceFrom: 999, note: "Per axle" },
      { label: "Complete Brake Service (Pads + Fluid + Calliper)", vehicle: "car", priceFrom: 2499, note: "Full front + rear" },
    ],
    competitorPricing: [
      { competitor: "Authorized Service Centre", theirPrice: "₹2,000–5,000", ourPrice: "₹799–2,499", advantage: "Save up to 60%" },
      { competitor: "Local Brake Shop", theirPrice: "₹1,000–2,500", ourPrice: "₹799–2,499", advantage: "Doorstep + warranty" },
      { competitor: "Other Mobile Services", theirPrice: "₹1,200–3,000", ourPrice: "₹799–2,499", advantage: "Competitive price" },
    ],
    pricingDisclaimer: "Brake pad, disc, and fluid costs are included in pricing shown. Any additional parts (calliper, ABS sensor) quoted separately. 30-day warranty.",
    carBrands: ["Maruti Swift", "Maruti Brezza", "Hyundai i20", "Hyundai Creta", "Tata Nexon", "Honda City", "Toyota Innova", "Kia Seltos", "MG Hector", "Mahindra XUV700", "Volkswagen Taigun", "Skoda Slavia", "Toyota Fortuner", "BMW 3 Series", "Mercedes C-Class"],
    guide: {
      title: "Car Brake Service Guide — Warning Signs, Types & Maintenance",
      intro: "Your car's brakes are its most critical safety system. In India's dense city traffic — Bengaluru's ORR, Chennai's Anna Salai, Koramangala's junction — reliable brakes are non-negotiable. This guide covers brake warning signs, brake types, service intervals, and what a full brake service involves.",
      sections: [
        {
          heading: "Warning Signs Your Car Brakes Need Immediate Service",
          body: "Act immediately if you notice: Squealing or grinding sound when braking — worn brake pads exposing the metal backing plate on the disc. Spongy or soft brake pedal — air in the hydraulic system or brake fluid leak. Brake pedal pulsation — warped disc rotor causing vibration through the pedal. Car pulling to one side when braking — a sticking calliper or uneven pad wear. Dashboard brake warning light illuminated. Increased braking distance — much longer to stop than before. Burning smell after driving — overheating brakes due to sticking calliper.",
        },
        {
          heading: "Disc Brakes vs. Drum Brakes in Cars",
          body: "Most modern cars have disc brakes on the front and either disc or drum brakes on the rear. Disc brakes: A calliper squeezes brake pads onto a spinning disc rotor. More efficient, better heat dissipation. Pads should be replaced when pad thickness drops below 3mm. Drum brakes (rear of budget cars): Brake shoes press outward against the inside of a drum. Require periodic adjustment. Drum brake shoes last 40,000–60,000 km with proper maintenance.",
        },
        {
          heading: "How Often Should Car Brake Fluid Be Changed?",
          body: "Brake fluid is hygroscopic — it absorbs moisture from the air over time. As moisture content increases, the boiling point drops, causing brake fade during heavy braking. Recommendation: change brake fluid every 2 years regardless of kilometres, or when the fluid appears dark brown (fresh fluid is clear/light yellow). This is one of the most commonly skipped maintenance items — and one of the most safety-critical.",
        },
      ],
      conclusion: "Don't delay brake service. A squealing brake ignored for a week becomes a metal-on-metal grind that damages the disc rotor — adding ₹1,500–3,000 to your repair cost. Book Fiixup's doorstep brake service in Bengaluru or Chennai — our mechanic arrives within 60 minutes with brake pads matched to your car model.",
    },
    testimonials: [
      { name: "Suresh M.", area: "Bannerghatta Road, Bengaluru", vehicle: "Tata Nexon", rating: 5, text: "Brakes were squealing badly. Fiixup replaced front pads and flushed the fluid at my home. No more noise, pedal feels firm. Very professional mechanic.", date: "April 2026" },
      { name: "Lakshmi K.", area: "Adyar, Chennai", vehicle: "Honda City", rating: 5, text: "Brake pedal was going too deep. Mechanic found the front pads were worn through. Replaced both axle pads and bled the fluid. Perfect brakes now.", date: "March 2026" },
    ],
    faqs: [
      { q: "How do I know if my car brakes need servicing?", a: "Squealing or grinding sounds when braking, a spongy or low brake pedal, the car pulling to one side when braking, or longer stopping distances are all warning signs." },
      { q: "How much does car brake pad replacement cost?", a: "Brake pad replacement starts from ₹799 per axle including labour and OEM pads. Full both-axle service starts from ₹1,399." },
      { q: "How long does a doorstep brake service take?", a: "Typically 1–2 hours for a full front and rear brake service at your location." },
      { q: "Do you use original brake pads?", a: "We use OEM-grade or high-quality aftermarket brake pads matched to your car's specification. Genuine OEM parts can be sourced on request." },
    ],
    metaTitle: "Car Brake Service & Pad Replacement at Home Bengaluru & Chennai | Fiixup",
    metaDescription: "Car brakes squealing or spongy? Expert doorstep brake pad replacement & brake service in Bengaluru & Chennai. All car models. 24/7 available. Starting ₹799. Book now.",
    metaKeywords: "car brake service near me, brake pad replacement at home, car brake repair near me, doorstep brake service, car brake pad replacement cost, car brake check near me, mobile car brake repair, disc brake service near me, car brake fluid change, brake repair near me, car brake bangalore, car brake chennai",
    relatedSlugs: ["car-service-at-home", "car-engine-diagnostics", "car-general-repair"],
  },

  {
    slug: "car-ac-service-repair",
    title: "Car AC Service & Repair at Doorstep | Gas Recharge",
    shortTitle: "Car AC Service",
    category: "car",
    icon: "Wind",
    tagline: "AC not cooling? Gas recharge & full AC repair done at your location.",
    description:
      "Fiixup's doorstep car AC service and repair covers gas (refrigerant) recharge, compressor health check, condenser and evaporator inspection, cabin air filter replacement, and cooling performance testing — all at your home or office in Bengaluru and Chennai. AC not cooling is the most commonly searched car problem in India during summer. Our technicians carry R-134a and R-1234yf refrigerant for all car models and complete most AC re-gassing and repairs in under 90 minutes. Available 24/7. Starting from ₹899.",
    price: "₹899",
    priceNumeric: 899,
    duration: "1–2 hrs",
    stats: [
      { value: "60 min", label: "Avg. Arrival" },
      { value: "24/7", label: "Available" },
      { value: "₹899", label: "Starting Price" },
      { value: "All Cars", label: "Covered" },
    ],
    heroChecks: [
      "R-134a & R-1234yf gas available",
      "Compressor & leak test included",
      "Cabin air filter replacement",
      "Performance test after service",
    ],
    features: [
      "AC refrigerant gas recharge (R-134a / R-1234yf)",
      "Compressor health & pressure check",
      "Condenser & evaporator inspection",
      "AC leak detection & repair",
      "Cabin air filter cleaning or replacement",
      "AC cooling performance test",
      "Blower & vent inspection",
    ],
    pricingRows: [
      { label: "AC Gas Recharge (R-134a)", vehicle: "car", priceFrom: 899, note: "Gas + service included" },
      { label: "AC Gas Recharge (R-1234yf newer cars)", vehicle: "car", priceFrom: 1499, note: "Gas + service included" },
      { label: "AC Service + Cabin Filter Replacement", vehicle: "car", priceFrom: 1299, note: "Gas + filter included" },
      { label: "AC Compressor Check + Regas", vehicle: "car", priceFrom: 1499, note: "Full diagnosis + regas" },
      { label: "Full AC Repair (condenser/evaporator/compressor)", vehicle: "car", priceFrom: 3999, note: "Parts quoted separately" },
    ],
    competitorPricing: [
      { competitor: "Authorized Service Centre (AC service)", theirPrice: "₹2,500–5,000", ourPrice: "₹899–1,499", advantage: "Save up to 70%" },
      { competitor: "Local AC Repair Shop", theirPrice: "₹1,200–2,500", ourPrice: "₹899–1,499", advantage: "Doorstep + cheaper" },
      { competitor: "GoMechanic AC service", theirPrice: "₹1,099–2,499", ourPrice: "₹899–1,499", advantage: "Best doorstep price" },
    ],
    pricingDisclaimer: "Gas recharge price includes refrigerant gas + service. Compressor, condenser, or evaporator replacements quoted separately. 30-day warranty.",
    carBrands: ["Maruti Swift", "Maruti Baleno", "Maruti Brezza", "Hyundai i20", "Hyundai Creta", "Tata Nexon", "Honda City", "Toyota Innova", "Kia Seltos", "MG Hector", "Mahindra XUV700", "Volkswagen Taigun"],
    guide: {
      title: "Car AC Not Cooling — Complete Diagnosis & Repair Guide for Indian Summer",
      intro: "In Bengaluru and Chennai summers, a non-functioning car AC isn't just uncomfortable — it's a health risk. AC problems are the most common car complaint from March to June in South India. This guide covers why car ACs stop cooling, how to diagnose the issue, and what different types of AC repairs involve.",
      sections: [
        {
          heading: "Why Is My Car AC Not Cooling?",
          body: "The most common causes, in order of frequency: Low refrigerant gas — the most common cause (60% of cases). Gas leaks out over time from microleaks in hoses and seals. Dirty condenser — the condenser (front of radiator) collects road dust and debris, reducing heat exchange. Faulty compressor — the compressor pressurises the refrigerant. If it's worn or has a seized clutch, the AC doesn't work. Faulty expansion valve or orifice tube — controls refrigerant flow. Cabin air filter clogged — restricts airflow through the evaporator, reducing cooling at vents. Refrigerant leak — a significant crack or disconnected hose leads to total loss of cooling quickly.",
        },
        {
          heading: "R-134a vs. R-1234yf — Which Gas Does Your Car Use?",
          body: "R-134a has been the standard AC refrigerant for Indian cars for over 20 years and is still used in most cars manufactured before 2022. R-1234yf is the newer, low-GWP (global warming potential) refrigerant used in newer European cars and some recent Indian car models from 2022 onwards — including certain variants of Volkswagen Taigun, Skoda Slavia, and premium cars. R-1234yf costs significantly more than R-134a. Our technician identifies your car's refrigerant type from the sticker under the bonnet before charging — never mixing refrigerants.",
        },
        {
          heading: "When Does a Car AC Need More Than a Recharge?",
          body: "If your AC gas runs out again within 1–2 months of a recharge, you have a refrigerant leak. A leak test (using UV dye or electronic leak detector) identifies the source — usually a hose joint, the compressor shaft seal, or the evaporator inside the dashboard. Compressor issues: if you hear a rattling or loud clicking when the AC is switched on, or the compressor clutch doesn't engage (no 'click' sound from the engine bay), the compressor may need replacement — a more significant job that we quote transparently.",
        },
      ],
      conclusion: "Don't suffer the Bengaluru or Chennai summer in a hot car. If your car AC has stopped cooling or is blowing warm air, Fiixup's doorstep AC service gets your cooling working again in under 2 hours — at your home, office, or apartment parking.",
    },
    testimonials: [
      { name: "Girish P.", area: "HSR Layout, Bengaluru", vehicle: "Hyundai Creta", rating: 5, text: "AC was barely cooling in Bengaluru May heat. Fiixup recharged the R-134a, cleaned the condenser, and replaced the cabin filter. Blowing icy cold now. Excellent job.", date: "April 2026" },
      { name: "Nithya R.", area: "Anna Nagar, Chennai", vehicle: "Maruti Baleno", rating: 5, text: "AC stopped working completely in Chennai summer. Fiixup found a gas leak at the expansion valve, repaired the leak, and recharged. Cool again in 2 hours. Lifesaver!", date: "April 2026" },
    ],
    faqs: [
      { q: "Why is my car AC not cooling?", a: "The most common causes are low refrigerant gas, a leaking AC system, a faulty compressor, or a dirty condenser. Our technician diagnoses the exact cause at your location." },
      { q: "How much does car AC gas recharge cost?", a: "AC gas recharge starts from ₹899 (R-134a). R-1234yf recharge starts from ₹1,499. Additional parts quoted separately before work begins." },
      { q: "How often should car AC gas be recharged?", a: "In ideal conditions, car AC gas lasts 3–5 years. If cooling starts to reduce before that, there may be a slow refrigerant leak that needs fixing." },
      { q: "Do you carry refrigerant gas for all car models?", a: "Yes. We carry R-134a for most cars manufactured before 2022 and R-1234yf for newer models. We confirm compatibility before service." },
    ],
    metaTitle: "Car AC Service & Gas Recharge at Home Bengaluru & Chennai | Fiixup",
    metaDescription: "Car AC not cooling? Doorstep AC service, gas recharge & repair for all car models in Bengaluru & Chennai. 24/7 available. Starting ₹899. Book now.",
    metaKeywords: "car AC service near me, car AC repair at home, car AC gas recharge near me, car AC not cooling repair, AC service near me, doorstep AC repair, car air conditioning service near me, car AC gas refill near me, mobile AC repair car, car AC check near me, car AC bangalore, car AC chennai",
    relatedSlugs: ["car-service-at-home", "car-engine-diagnostics", "car-general-repair"],
  },

  {
    slug: "car-engine-diagnostics",
    title: "Car Engine Diagnostics at Home | OBD2 Scan & Check Engine Light",
    shortTitle: "Engine Diagnostics",
    category: "car",
    icon: "Gauge",
    tagline: "Check engine light on? We scan & diagnose at your location.",
    description:
      "Fiixup's doorstep car engine diagnostic service uses professional-grade OBD2 scanners to read fault codes, identify sensor failures, and detect performance issues — all at your home or office in Bengaluru and Chennai. A check engine light or MIL warning should never be ignored. Our certified technicians provide a transparent diagnostic report and fix most issues on the spot. Honest diagnosis, no guesswork, no unnecessary upselling. Starting from ₹399.",
    price: "₹399",
    priceNumeric: 399,
    duration: "30–60 min",
    stats: [
      { value: "60 min", label: "Avg. Arrival" },
      { value: "OBD2", label: "Professional Scan" },
      { value: "₹399", label: "Starting Price" },
      { value: "All Cars", label: "Covered" },
    ],
    heroChecks: [
      "Professional OBD2 scanner — all car models",
      "Written diagnostic report provided",
      "Most common fixes done on spot",
      "Fault codes cleared after repair",
    ],
    features: [
      "Professional OBD2 computer scan",
      "Full fault code reading & explanation",
      "Engine, transmission & ABS system check",
      "Emission system diagnosis",
      "Fuel system & oxygen sensor check",
      "Written diagnostic report provided",
      "On-spot repair where possible",
    ],
    pricingRows: [
      { label: "OBD2 Scan + Diagnostic Report", vehicle: "car", priceFrom: 399, note: "Credited towards repair" },
      { label: "Scan + Sensor Replacement (O2, MAF etc.)", vehicle: "car", priceFrom: 999, note: "Common sensors included" },
      { label: "Full System Scan (Engine + ABS + Airbag)", vehicle: "car", priceFrom: 599, note: "Complete report" },
    ],
    competitorPricing: [
      { competitor: "Authorized Service Centre Diagnosis", theirPrice: "₹800–2,000", ourPrice: "₹399", advantage: "Save up to 80%" },
      { competitor: "Local Garage OBD Scan", theirPrice: "₹400–700", ourPrice: "₹399", advantage: "Doorstep + same price" },
      { competitor: "Other Mobile Diagnostic Services", theirPrice: "₹499–899", ourPrice: "₹399", advantage: "Best mobile rate" },
    ],
    pricingDisclaimer: "Diagnostic fee credited against repair cost. Parts for repairs quoted separately before purchase. No hidden charges.",
    carBrands: ["Maruti Swift", "Maruti Baleno", "Hyundai i20", "Hyundai Creta", "Tata Nexon", "Honda City", "Toyota Innova", "Kia Seltos", "MG Hector", "Mahindra XUV700", "Volkswagen Taigun", "BMW 3 Series", "Mercedes C-Class"],
    guide: {
      title: "Car Check Engine Light & OBD2 Diagnostics — Complete Guide",
      intro: "The check engine light (also called MIL — Malfunction Indicator Lamp) illuminates when your car's onboard computer detects a fault in the engine, emission system, or transmission. Many drivers either panic or ignore it. The right response is to get a proper OBD2 scan as soon as possible. This guide explains what different fault codes mean and when you can wait vs. when you must stop driving immediately.",
      sections: [
        {
          heading: "What Does the Check Engine Light Mean?",
          body: "The check engine light covers a wide range of faults. Solid check engine light: Non-urgent but requires attention. Common causes: loose fuel cap (tighten and see if it goes off after a few drives), faulty oxygen sensor (affects fuel efficiency), catalytic converter issue (emission failure), spark plug or ignition coil problem. Flashing check engine light: URGENT — stop driving if possible. A flashing MIL means active engine misfiring that can damage the catalytic converter within minutes. This needs immediate attention.",
        },
        {
          heading: "Most Common OBD2 Fault Codes in Indian Cars",
          body: "P0420 — Catalytic converter efficiency below threshold: Common in older cars. Causes increased emissions. P0300-P0304 — Engine misfire: Can be caused by faulty spark plugs, ignition coils, or fuel injectors. P0171/P0174 — System running lean: Air-fuel mixture too lean — faulty MAF sensor, vacuum leak, or fuel pressure issue. P0440/P0442 — EVAP system leak: Loose fuel cap is the most common cause. B1 codes — ABS, airbag, or body system faults. Fiixup's scanner reads all generic (OBD2) and manufacturer-specific codes for all Indian car brands.",
        },
        {
          heading: "Can You Drive With the Check Engine Light On?",
          body: "Solid check engine light: Usually safe for short distances (1–2 days maximum). Book a scan immediately. Don't use this as an excuse to defer for weeks. Flashing check engine light: Do not drive. Pull over safely and call Fiixup. Serious misfiring can destroy a catalytic converter worth ₹20,000–80,000 within minutes of continued driving.",
        },
      ],
      conclusion: "A check engine light is your car communicating a problem. An OBD2 scan by Fiixup costs ₹399 at your doorstep in Bengaluru or Chennai and takes 30 minutes. The same scan at an authorized service centre often costs ₹800–2,000 and requires leaving your car for the day. Book Fiixup and get a transparent written report of what's wrong.",
    },
    testimonials: [
      { name: "Ramkumar T.", area: "Marathahalli, Bengaluru", vehicle: "Volkswagen Taigun", rating: 5, text: "Check engine light came on. Fiixup scanned it, found a P0420 code, explained it clearly, and advised on next steps. Professional, honest, and half the price of a VW dealer scan.", date: "April 2026" },
      { name: "Sindhu V.", area: "Porur, Chennai", vehicle: "Hyundai i20", rating: 5, text: "Engine light was on for a week and I was scared. Fiixup came, scanned, found only a loose fuel cap. Fixed in 2 minutes, code cleared. Charged ₹399 only. Very honest.", date: "March 2026" },
    ],
    faqs: [
      { q: "What does the check engine light mean?", a: "It can indicate anything from a loose fuel cap (minor) to an oxygen sensor failure, catalytic converter issue, or engine misfire (serious). Our OBD2 scan tells you the exact code and meaning." },
      { q: "Can I drive with the check engine light on?", a: "If the light is solid (not flashing), it's usually safe for short distances. A flashing check engine light means stop driving immediately and call us — it indicates active engine damage." },
      { q: "Do you fix the issue after diagnosing?", a: "Yes. Most common issues — sensor replacements, loose connections, minor repairs — are fixed on the spot. Complex repairs are quoted and scheduled." },
      { q: "Will the check engine light go away after fixing?", a: "Yes. After fixing the root cause, our technician clears the fault codes with the OBD2 scanner and verifies the light has gone off." },
    ],
    metaTitle: "Car Engine Diagnostics at Home Bengaluru & Chennai | OBD2 Scan | Fiixup",
    metaDescription: "Check engine light on? Expert OBD2 car engine diagnostics at your doorstep in Bengaluru & Chennai. Honest report. All car models. Starting ₹399. Book now.",
    metaKeywords: "car engine diagnostics near me, OBD2 scan near me, check engine light repair near me, car diagnostic service at home, car fault code reading near me, mobile car diagnostics, car computer scan near me, engine diagnostic test at home, car warning light check near me, car engine check bangalore, car diagnostics chennai",
    relatedSlugs: ["car-service-at-home", "car-general-repair", "car-brake-service"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TOWING
  // ══════════════════════════════════════════════════════════════════════════

  {
    slug: "car-towing-service-near-me",
    title: "Car Towing Service Near Me | 24/7 Flatbed Towing Bengaluru & Chennai",
    shortTitle: "Car Towing Service",
    category: "towing",
    icon: "Truck",
    tagline: "Stuck on the road? Our tow truck reaches you in 30–60 minutes, 24/7.",
    description:
      "Fiixup provides 24/7 flatbed and crane car towing service across Bengaluru and Chennai. Whether your car broke down on the highway, was involved in an accident, has a dead engine, or is simply immovable — our tow trucks are dispatched immediately and reach you in 30–60 minutes. We use flatbed tow trucks for all-wheel-drive, low-clearance, and luxury cars to prevent any drivetrain damage during transport. Transparent pricing before any movement — no hidden charges. Starting from ₹499.",
    price: "₹499",
    priceNumeric: 499,
    duration: "30–60 min arrival",
    stats: [
      { value: "30–60 min", label: "Avg. Arrival" },
      { value: "24/7", label: "Available" },
      { value: "₹499", label: "Starting Price" },
      { value: "Flatbed", label: "Safe Transport" },
    ],
    heroChecks: [
      "Flatbed towing — safest for all cars",
      "No extra night/weekend charge",
      "Highway & expressway coverage",
      "Insurance coordination support",
    ],
    features: [
      "Flatbed towing — safest for AWD, luxury & low-clearance cars",
      "Crane & wheel-lift towing for standard cars",
      "Accident & emergency recovery",
      "Highway & expressway towing coverage",
      "Tow to workshop or destination of your choice",
      "Insurance coordination support",
      "24/7 availability — no extra night charge",
    ],
    pricingRows: [
      { label: "City Towing (within 10 km)", vehicle: "car", priceFrom: 499, note: "Flatbed included" },
      { label: "City Towing (10–25 km)", vehicle: "car", priceFrom: 799, note: "Per trip" },
      { label: "Highway / Long Distance Towing", vehicle: "car", priceFrom: 35, note: "Per km after 25 km" },
      { label: "SUV / Large Vehicle Towing", vehicle: "car", priceFrom: 699, note: "City rate" },
      { label: "Accident Recovery Towing", vehicle: "car", priceFrom: 799, note: "Includes on-site stabilisation" },
    ],
    competitorPricing: [
      { competitor: "Local Towing Services", theirPrice: "₹800–1,500 (city)", ourPrice: "₹499–799", advantage: "Save up to 40%" },
      { competitor: "Insurance Towing (when applicable)", theirPrice: "Often hours wait", ourPrice: "30–60 min", advantage: "Faster arrival" },
      { competitor: "Breakdown Recovery Apps", theirPrice: "₹700–1,200", ourPrice: "₹499–799", advantage: "Better price" },
    ],
    pricingDisclaimer: "Towing price confirmed before dispatch. No movement without your approval of the quote. No hidden night/weekend surcharges.",
    carBrands: ["Maruti Suzuki", "Hyundai", "Tata", "Honda", "Toyota", "Kia", "MG", "Mahindra", "Volkswagen", "Skoda", "BMW", "Mercedes-Benz", "Audi", "Jeep", "Ford"],
    guide: {
      title: "Car Towing Service Guide — What to Do When Your Car Breaks Down",
      intro: "Breaking down is stressful — especially on a busy Bengaluru outer ring road or Chennai's OMR. Knowing what to do in those first few minutes, and having a reliable towing service number saved, makes all the difference. This guide covers breakdown safety, towing types, and what to expect from Fiixup's towing service.",
      sections: [
        {
          heading: "What to Do Immediately When Your Car Breaks Down",
          body: "1. Don't panic. 2. If possible, steer the car to the road shoulder or a safe parking area. 3. Switch on hazard lights immediately. 4. If on a highway, exit the car and stand behind the crash barrier — not between the car and traffic. 5. Call Fiixup. Share your exact location (drop a Google Maps pin). 6. Don't attempt to push the car in heavy traffic. 7. Keep hazard lights on until the tow truck arrives.",
        },
        {
          heading: "Flatbed vs. Wheel-Lift Towing — Which Is Better for Your Car?",
          body: "Flatbed towing: Your car is driven (or winched) onto a flat platform and transported with all four wheels off the ground. Best for: all-wheel-drive (AWD) cars, 4WD vehicles, low-clearance sports cars, luxury cars (BMW, Mercedes, Audi), automatics, and any car with undercarriage damage. Wheel-lift towing: Only the front or rear wheels are lifted, with the other pair dragging on the road. Suitable for: short-distance towing of standard front-wheel-drive cars with no undercarriage damage. Fiixup uses flatbed towing by default to ensure zero risk of drivetrain damage.",
        },
        {
          heading: "Can You Tow an Automatic Car with Wheel-Lift?",
          body: "For automatic transmission cars, towing with rear wheels down (connected to the driveshaft) can cause serious transmission damage. Flatbed towing is mandatory for automatics being towed more than 1–2 km. Fiixup uses flatbed carriers for all automatic transmission cars as standard practice.",
        },
      ],
      conclusion: "Save Fiixup's number: 8197459732. When your car breaks down in Bengaluru or Chennai, one call dispatches our nearest flatbed tow truck to your exact GPS location. We arrive in 30–60 minutes, quote the price transparently before moving, and tow you to your chosen destination.",
    },
    testimonials: [
      { name: "Kiran B.", area: "Outer Ring Road, Bengaluru", vehicle: "Toyota Fortuner", rating: 5, text: "Fortuner broke down on ORR at 9pm. Fiixup flatbed arrived in 40 minutes. Professional driver, secure loading, no damage. Quoted price before moving. Excellent towing service.", date: "April 2026" },
      { name: "Mangala R.", area: "OMR, Chennai", vehicle: "Hyundai Creta", rating: 5, text: "Tyre burst on OMR. Fiixup towed me to the nearest workshop. Driver was calm and professional. Price was exactly as quoted. Will call them every time.", date: "March 2026" },
    ],
    faqs: [
      { q: "How much does car towing cost near me?", a: "Car towing within city limits starts from ₹499. Highway and long-distance towing is charged per kilometre after 25 km. A transparent quote is provided before the truck moves." },
      { q: "How fast can a tow truck reach me?", a: "Typically 30–60 minutes within city limits. For highway breakdowns we aim for 45 minutes from the nearest available truck." },
      { q: "Is flatbed towing better for my car?", a: "Yes. Flatbed towing lifts all four wheels off the ground, preventing any drivetrain, transmission, or undercarriage damage. We recommend it for all AWD, 4WD, automatic, and luxury cars." },
      { q: "Where will you tow my car?", a: "To any destination you choose — nearest workshop, Fiixup partner workshop, or your home. We tow to wherever is most convenient for you." },
      { q: "Do you tow accident-damaged cars?", a: "Yes. We handle accident recovery and towing 24/7 and can coordinate with your insurance company for cashless towing where applicable." },
    ],
    metaTitle: "Car Towing Service Near Me | 24/7 Flatbed Towing Bengaluru & Chennai | Fiixup",
    metaDescription: "Need car towing near you in Bengaluru or Chennai? 24/7 flatbed tow truck service. Arrives in 30–60 min. Starting ₹499. Call now.",
    metaKeywords: "car towing service near me, tow truck near me, car towing near me, flatbed towing near me, 24 hour towing near me, emergency towing near me, car breakdown towing, accident towing near me, highway towing service, vehicle towing near me, car towing bangalore, car towing chennai",
    relatedSlugs: ["bike-towing-service-near-me", "roadside-assistance-near-me", "car-breakdown-service"],
  },

  {
    slug: "bike-towing-service-near-me",
    title: "Bike Towing Service Near Me | 24/7 Two-Wheeler Towing",
    shortTitle: "Bike Towing Service",
    category: "towing",
    icon: "Truck",
    tagline: "Bike breakdown? Our two-wheeler carrier reaches you fast, anytime.",
    description:
      "Fiixup provides 24/7 bike and scooter towing service using dedicated two-wheeler carriers that transport your motorcycle or scooter safely without any damage. We tow all bike brands — Honda, Bajaj, Royal Enfield, TVS, KTM, Yamaha, Hero, Suzuki, and all scooters including electric models. Whether you've broken down on a highway, in a narrow lane, or in a parking lot, our bike towing team is dispatched immediately and arrives within 30–60 minutes. Transparent pricing. No hidden charges. Starting from ₹299.",
    price: "₹299",
    priceNumeric: 299,
    duration: "30–60 min arrival",
    stats: [
      { value: "30–60 min", label: "Avg. Arrival" },
      { value: "24/7", label: "Available" },
      { value: "₹299", label: "Starting Price" },
      { value: "All Bikes", label: "Covered" },
    ],
    heroChecks: [
      "Dedicated two-wheeler carriers",
      "Heavy bikes (RE, KTM) covered",
      "Electric scooters handled with care",
      "No extra night/weekend charge",
    ],
    features: [
      "Dedicated two-wheeler carriers for all bikes & scooters",
      "Safe loading & securing — no damage guaranteed",
      "All bike brands including Royal Enfield, KTM & electrics",
      "City, highway & expressway coverage",
      "Tow to workshop or your chosen location",
      "24/7 — no extra night or weekend charge",
      "Live technician tracking after booking",
    ],
    pricingRows: [
      { label: "Bike Towing (within 10 km)", vehicle: "bike", priceFrom: 299, note: "Two-wheeler carrier" },
      { label: "Bike Towing (10–25 km)", vehicle: "bike", priceFrom: 499, note: "Per trip" },
      { label: "Highway / Long Distance Bike Towing", vehicle: "bike", priceFrom: 25, note: "Per km after 25 km" },
      { label: "Heavy Bike Towing (RE, KTM, Kawasaki)", vehicle: "bike", priceFrom: 399, note: "City rate" },
    ],
    competitorPricing: [
      { competitor: "Local Auto Rickshaw Tow", theirPrice: "₹400–700", ourPrice: "₹299–499", advantage: "Safer + cheaper" },
      { competitor: "Roadside Mechanic Tow", theirPrice: "₹500–900", ourPrice: "₹299–499", advantage: "Professional carrier" },
      { competitor: "Other Towing Apps", theirPrice: "₹399–699", ourPrice: "₹299–499", advantage: "Best price" },
    ],
    pricingDisclaimer: "Towing price confirmed before dispatch. No movement without quote approval. No hidden charges.",
    bikeBrands: ["Honda Activa", "Honda Shine", "Bajaj Pulsar", "Royal Enfield Classic", "Royal Enfield Bullet", "Royal Enfield Himalayan", "TVS Jupiter", "Yamaha FZ", "Hero Splendor", "KTM Duke", "KTM Adventure", "Suzuki Access", "Ola S1", "Ather 450X", "TVS iQube"],
    guide: {
      title: "Bike Towing Guide — What to Do When Your Bike Breaks Down",
      intro: "A bike breakdown in the middle of a busy Bengaluru intersection or on the Chennai coastal road is both stressful and potentially dangerous. Knowing the right steps and having Fiixup's number ready makes the situation manageable. This guide covers what to do, how bike towing works, and how we handle different bike types.",
      sections: [
        {
          heading: "Safety First — What to Do When Your Bike Breaks Down",
          body: "1. Pull to the left of the road immediately. 2. Switch on hazard indicators if your bike has them. 3. If your bike is blocking traffic, try to push it to the roadside with help — never leave it in a moving lane. 4. For highway breakdowns: walk to the shoulder, stand away from the road, and call for help. 5. Call Fiixup: 8197459732. Share your exact location via Google Maps pin. 6. Don't attempt to flag down trucks or unknown vehicles for towing — use a verified service.",
        },
        {
          heading: "How We Tow Bikes Safely — Including Heavy Motorcycles",
          body: "We use purpose-built two-wheeler carriers with loading ramps, wheel chocks, and tie-down straps to secure bikes during transport. For heavy motorcycles like Royal Enfield (200+ kg), KTM Adventure, and Kawasaki Versys — which can tip or shift in transit — we use additional securing points and check all straps before departure. Electric scooters like Ola S1 and Ather 450X are loaded with the main power switch off to prevent any inadvertent motor engagement during loading.",
        },
      ],
      conclusion: "Whether it's a scooter with a dead battery or a Royal Enfield with a seized engine, Fiixup's dedicated bike towing service in Bengaluru and Chennai arrives within 30–60 minutes and transports your bike safely to your chosen destination. Save our number: 8197459732.",
    },
    testimonials: [
      { name: "Aditya V.", area: "Bannerghatta Road, Bengaluru", vehicle: "Royal Enfield Himalayan 450", rating: 5, text: "Himalayan broke down with a suspected engine issue. Fiixup towing arrived in 35 minutes with a proper bike carrier. RE was loaded securely, zero damage. Excellent.", date: "April 2026" },
      { name: "Geetha P.", area: "ECR, Chennai", vehicle: "Honda Activa", rating: 5, text: "Activa stopped on ECR. Fiixup towed it to my nearby mechanic in 30 minutes. Affordable, professional, and the bike had no scratches. Thank you Fiixup.", date: "March 2026" },
    ],
    faqs: [
      { q: "How much does bike towing cost near me?", a: "Bike towing within city limits starts from ₹299. Long-distance and highway towing is charged per kilometre with a transparent quote upfront." },
      { q: "Do you tow heavy bikes like Royal Enfield and KTM?", a: "Yes. Our two-wheeler carriers handle all bike types including heavy motorcycles like Royal Enfield, KTM Adventure, and Kawasaki." },
      { q: "Do you tow electric scooters?", a: "Yes. We tow Ola S1, Ather 450X, TVS iQube, Bajaj Chetak, and all electric two-wheelers. We handle EVs with care to avoid damage to the battery pack." },
      { q: "How fast can you reach me for bike towing?", a: "Typically within 30–60 minutes in city areas. For highway breakdowns, we dispatch the nearest available carrier immediately." },
    ],
    metaTitle: "Bike Towing Service Near Me | 24/7 Two-Wheeler Towing Bengaluru & Chennai",
    metaDescription: "Bike breakdown? 24/7 doorstep bike towing for all brands — Royal Enfield, Bajaj, KTM, scooters & EVs in Bengaluru & Chennai. Arrives in 30–60 min. Starting ₹299. Call now.",
    metaKeywords: "bike towing service near me, two wheeler towing near me, motorcycle towing near me, bike breakdown towing, scooter towing near me, bike tow near me, bike towing near me 24 hours, two wheeler tow truck near me, Royal Enfield towing service, bike towing bangalore, bike towing chennai",
    relatedSlugs: ["car-towing-service-near-me", "roadside-assistance-near-me", "bike-battery-jumpstart-near-me"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PUNCTURE
  // ══════════════════════════════════════════════════════════════════════════

  {
    slug: "car-puncture-repair-near-me",
    title: "Car Puncture Repair Near Me | 24/7 Tyre Repair Service",
    shortTitle: "Car Puncture Repair",
    category: "puncture",
    icon: "AlertTriangle",
    tagline: "Flat car tyre? We come to your location and fix it in 20 minutes.",
    description:
      "Fiixup's 24/7 car puncture repair and tyre service comes to your exact location in Bengaluru and Chennai — on the road, in your parking lot, at home, or on the highway. No need to search for an open puncture shop at midnight. Our technician arrives with portable tyre-changing equipment, puncture repair kits, and spare tyre fitting tools. We handle tubeless and tube-type tyre punctures, tyre bursts, slow leaks, and flat tyre replacement for all car models. Transparent pricing, no hidden charges. Starting from ₹199.",
    price: "₹199",
    priceNumeric: 199,
    duration: "20–40 min",
    stats: [
      { value: "30 min", label: "Avg. Arrival" },
      { value: "24/7", label: "Available" },
      { value: "₹199", label: "Starting Price" },
      { value: "All Cars", label: "Covered" },
    ],
    heroChecks: [
      "Permanent plug-and-patch repair",
      "Spare tyre fitting included",
      "No extra night surcharge",
      "Highway & city coverage",
    ],
    features: [
      "Tubeless tyre puncture repair (plug & patch)",
      "Tube-type tyre puncture repair",
      "Spare tyre fitting & torque check",
      "Tyre pressure check & inflation",
      "Tyre burst assessment & replacement advice",
      "Valve repair & replacement",
      "All car models supported",
    ],
    pricingRows: [
      { label: "Tubeless Tyre Puncture Repair", vehicle: "car", priceFrom: 199, note: "Plug + patch" },
      { label: "Tube-Type Tyre Puncture Repair", vehicle: "car", priceFrom: 249, note: "Inner tube repair" },
      { label: "Spare Tyre Fitting", vehicle: "car", priceFrom: 149, note: "Labour only" },
      { label: "Tyre Valve Replacement", vehicle: "car", priceFrom: 99, note: "Valve + fitting" },
      { label: "Slow Leak Detection + Repair", vehicle: "car", priceFrom: 299, note: "Leak test + plug-patch" },
    ],
    competitorPricing: [
      { competitor: "Roadside Puncture Shop", theirPrice: "₹150–300", ourPrice: "₹199", advantage: "Comes to you — no pushing" },
      { competitor: "Tyre Shop (after towing)", theirPrice: "₹500–1,500 (tow + repair)", ourPrice: "₹199", advantage: "No towing cost" },
      { competitor: "Other Mobile Services", theirPrice: "₹299–499", ourPrice: "₹199", advantage: "Best price" },
    ],
    pricingDisclaimer: "Puncture repair price is fixed. Tyre replacement (if needed) quoted separately based on tyre brand and size.",
    carBrands: ["Maruti Swift", "Maruti Brezza", "Maruti Baleno", "Hyundai i20", "Hyundai Creta", "Tata Nexon", "Honda City", "Toyota Innova", "Kia Seltos", "MG Hector", "Mahindra XUV700", "Volkswagen Taigun"],
    guide: {
      title: "Car Tyre Puncture Guide — What to Do & How to Stay Safe",
      intro: "A flat tyre is one of the most common roadside emergencies in India. Bengaluru's construction-strewn roads and Chennai's coastal debris are particularly hard on tyres. This guide tells you exactly what to do when you have a flat tyre, how to stay safe, and what a professional puncture repair involves.",
      sections: [
        {
          heading: "What to Do When You Get a Flat Tyre",
          body: "1. Don't brake suddenly. Ease off the accelerator and steer gently to the left road shoulder. 2. Switch on hazard lights. 3. If on a highway, exit the car through the passenger-side door (away from traffic) and stand behind the crash barrier. 4. Do not attempt to change the tyre yourself on a highway — it's extremely dangerous. 5. Call Fiixup: 8197459732. Share your exact location. 6. In a parking lot or low-traffic area, you can fit the spare tyre if you know how — call us to confirm proper torque after fitting.",
        },
        {
          heading: "Tubeless vs. Tube-Type Tyre Puncture — How They're Repaired",
          body: "Tubeless tyres (standard on modern cars): Can often be repaired with a plug-and-patch method from the inside. A small nail or screw puncture is repaired in 15–20 minutes on-site. Tube-type tyres (older cars, some spare tyres): The tyre must be removed from the rim, the inner tube located, the hole found, the tube patched, and the tyre refitted. Takes 30–45 minutes. Note: A tyre repaired with only a plug (no patch from inside) is a temporary fix. Fiixup's technicians do a proper internal patch for a permanent repair wherever possible.",
        },
        {
          heading: "When Is a Punctured Tyre Beyond Repair?",
          body: "A tyre cannot be safely repaired if: The puncture is in the tyre sidewall (the repair would be structurally unsafe). The hole is larger than 6mm in diameter. There are multiple punctures close together. The tyre has been driven flat for more than 1 km (internal sidewall damage). The tread depth is below 1.6mm (the legal minimum). In any of these cases, our technician advises tyre replacement and can arrange it at your location or tow you to a tyre shop.",
        },
      ],
      conclusion: "A car puncture at midnight or on a highway doesn't have to ruin your day. Fiixup's 24/7 puncture repair service in Bengaluru and Chennai reaches you in 30 minutes — wherever you are — and fixes most punctures permanently in under 30 minutes. No towing, no garage visit, no hassle.",
    },
    testimonials: [
      { name: "Varun K.", area: "Sarjapur Road, Bengaluru", vehicle: "Tata Nexon", rating: 5, text: "Nail in my rear tyre in my apartment basement. Fiixup came in 25 minutes, plug-and-patched it from inside, inflated properly. ₹199 total. Perfect service.", date: "April 2026" },
      { name: "Rekha S.", area: "Velachery, Chennai", vehicle: "Maruti Brezza", rating: 5, text: "Slow puncture — tyre kept losing air every morning. Fiixup found a tiny valve leak and the actual puncture hole. Fixed both. No more air loss. Thank you!", date: "March 2026" },
    ],
    faqs: [
      { q: "How much does car puncture repair cost near me?", a: "Car tyre puncture repair starts from ₹199 for a standard tubeless repair. Tyre replacement (if needed) is quoted separately based on tyre brand and model." },
      { q: "Is there a 24-hour puncture repair near me?", a: "Yes. Fiixup is available 24/7 — your car puncture is fixed at your location day or night with no extra night surcharge." },
      { q: "Can you repair a tyre burst on the highway?", a: "If the tyre is repairable (nail puncture, small cut), we fix it on the spot. If the tyre is irreparably damaged from a blowout, we advise tyre replacement and can arrange it or tow you to safety." },
      { q: "My tyre has a slow puncture — can you find and fix it?", a: "Yes. We submerge or spray-test the tyre to locate even tiny slow leaks, then repair them using a plug-and-patch kit for a permanent fix." },
    ],
    metaTitle: "Car Puncture Repair Near Me | 24/7 Tyre Repair Bengaluru & Chennai | Fiixup",
    metaDescription: "Flat car tyre? 24/7 doorstep puncture repair at your location in Bengaluru & Chennai. All car models. Tubeless & tube-type. Starting ₹199. Call now.",
    metaKeywords: "car puncture repair near me, flat tyre repair near me, tyre puncture repair near me, car tyre repair near me, puncture shop near me open now, 24 hour puncture repair near me, doorstep puncture repair, car flat tyre service near me, tyre repair near me, car puncture bangalore, car puncture chennai",
    relatedSlugs: ["bike-puncture-repair-near-me", "tyre-replacement-at-home", "roadside-assistance-near-me"],
  },

  {
    slug: "bike-puncture-repair-near-me",
    title: "Bike Puncture Repair Near Me | 24/7 Two-Wheeler Tyre Repair",
    shortTitle: "Bike Puncture Repair",
    category: "puncture",
    icon: "AlertTriangle",
    tagline: "Bike tyre flat? We come to you anytime — no pushing required.",
    description:
      "Fiixup's 24/7 doorstep bike puncture repair service is your nearest open puncture shop — without the shop. Whether you're stuck with a flat tyre at midnight, in a parking lot, or on the highway in Bengaluru or Chennai, our technician comes to your exact location with tube and tubeless puncture repair tools. We fix punctures for all bikes and scooters — Honda Activa, TVS Jupiter, Royal Enfield, Bajaj Pulsar, KTM, Yamaha, Hero, and all others. No extra night charge. Starting from ₹99.",
    price: "₹99",
    priceNumeric: 99,
    duration: "15–30 min",
    stats: [
      { value: "30 min", label: "Avg. Arrival" },
      { value: "24/7", label: "Available" },
      { value: "₹99", label: "Starting Price" },
      { value: "All Bikes", label: "Covered" },
    ],
    heroChecks: [
      "Cheapest 24/7 doorstep option",
      "Tubeless & tube-type both covered",
      "No pushing your bike required",
      "No extra night surcharge",
    ],
    features: [
      "Tubeless tyre puncture repair (plug method)",
      "Tube-type tyre puncture repair",
      "Valve repair & replacement",
      "Tyre pressure check & inflation",
      "Tyre assessment — replace or repair advice",
      "All bike & scooter brands supported",
      "24/7 — no extra charge for night repairs",
    ],
    pricingRows: [
      { label: "Tubeless Bike Tyre Puncture Repair", vehicle: "bike", priceFrom: 99, note: "Plug method" },
      { label: "Tube-Type Bike Tyre Puncture Repair", vehicle: "bike", priceFrom: 149, note: "Tube patch" },
      { label: "Tyre Valve Replacement", vehicle: "bike", priceFrom: 79, note: "Valve + fitting" },
      { label: "Puncture + Tyre Pressure Service", vehicle: "bike", priceFrom: 149, note: "Repair + pressure check all wheels" },
    ],
    competitorPricing: [
      { competitor: "Roadside Puncture Wala", theirPrice: "₹80–150", ourPrice: "₹99", advantage: "Comes to you, no pushing" },
      { competitor: "Open Puncture Shop (if found)", theirPrice: "₹100–200", ourPrice: "₹99", advantage: "24/7 at your location" },
      { competitor: "Other Doorstep Services", theirPrice: "₹149–299", ourPrice: "₹99", advantage: "Lowest doorstep price" },
    ],
    pricingDisclaimer: "₹99 flat rate for standard tubeless puncture repair. Tube-type and replacement quoted separately if needed.",
    bikeBrands: ["Honda Activa 6G", "Honda Shine", "Bajaj Pulsar", "Bajaj CT100", "TVS Jupiter", "TVS Apache", "Royal Enfield Classic 350", "Yamaha FZ", "Hero Splendor", "KTM Duke", "Suzuki Access"],
    guide: {
      title: "Bike Puncture Repair Guide — What to Do & When to Replace",
      intro: "Bike punctures are the most common roadside emergency for two-wheeler riders in India. Bengaluru's construction zones and Chennai's ECR have claimed thousands of tyres. This guide tells you how to handle a puncture safely, what repair options exist, and when replacement is the smarter choice.",
      sections: [
        {
          heading: "What to Do When Your Bike Gets a Flat Tyre",
          body: "1. Don't brake suddenly — the tyre may fold under sudden braking. Ease off the throttle and hold the handlebars firmly. 2. Steer gently to the road shoulder. 3. Switch on hazard lights (if equipped) or use your phone's torch to signal other vehicles at night. 4. Do not ride on a flat tyre — even 500 metres can destroy a tubeless tyre's bead, turning a ₹100 repair into a ₹2,000 tyre replacement. 5. Call Fiixup: 8197459732.",
        },
        {
          heading: "Tubeless vs. Tube-Type Bike Tyres — Repair Differences",
          body: "Most modern scooters and motorcycles from 2015 onwards have tubeless tyres. Tubeless puncture repair: The technician removes the nail/screw, inserts a rubber plug into the hole from the outside, and inflates the tyre. Takes 10–15 minutes. Some punctures also receive a patch from inside for a more permanent fix. Tube-type tyres (older bikes, some budget commuters): The wheel must be removed, the tyre pried off the rim, the inner tube located and patched, and everything reassembled. Takes 25–40 minutes.",
        },
      ],
      conclusion: "A bike puncture at midnight doesn't mean pushing your scooter to the nearest open shop. Call Fiixup — our technician comes to your exact location in Bengaluru or Chennai, fixes the puncture in under 30 minutes, and charges ₹99–149. That's less than an auto ride home.",
    },
    testimonials: [
      { name: "Ranjith A.", area: "Koramangala, Bengaluru", vehicle: "Bajaj Pulsar NS200", rating: 5, text: "Tyre went flat at 11:30pm in Koramangala. Fiixup arrived in 20 minutes. Plug repair done in 15 minutes. ₹99 total. Absolutely brilliant service.", date: "April 2026" },
      { name: "Sowmya V.", area: "Chromepet, Chennai", vehicle: "Honda Activa", rating: 5, text: "Flat tyre in my apartment parking. Mechanic came up to the basement, repaired it on the spot. Didn't even need to move the scooter. Incredible.", date: "March 2026" },
    ],
    faqs: [
      { q: "How much does bike puncture repair cost near me?", a: "Bike tyre puncture repair starts from ₹99 for tubeless and ₹149 for tube-type repairs. Tyre replacement is quoted separately if needed." },
      { q: "Is there a puncture shop near me open at night?", a: "Fiixup is available 24/7 for bike puncture repair. Instead of searching for a shop open at 2am, call us and we come to your exact location." },
      { q: "My bike tyre burst on the highway — what should I do?", a: "Do not brake suddenly. Ease off the throttle, grip the handlebars firmly, and steer to the shoulder. Switch on hazard lights and call Fiixup. We tow or repair on the spot." },
      { q: "Do you repair tyres inside apartments and gated communities?", a: "Yes. We enter your society with the technician's ID and fix the puncture in your basement or parking — no need to push the bike to a shop." },
    ],
    metaTitle: "Bike Puncture Repair Near Me | 24/7 Tyre Repair Bengaluru & Chennai | Fiixup",
    metaDescription: "Bike tyre flat? 24/7 doorstep puncture repair in Bengaluru & Chennai. All bikes & scooters. Tubeless & tube-type. Starting ₹99. Call now.",
    metaKeywords: "bike puncture repair near me, two wheeler puncture repair near me, bike tyre puncture near me, scooter puncture repair near me, puncture shop near me 24 hours, bike flat tyre repair near me, doorstep bike puncture repair, motorcycle puncture repair near me, bike tyre repair near me, bike puncture bangalore, bike puncture chennai",
    relatedSlugs: ["car-puncture-repair-near-me", "tyre-replacement-at-home", "bike-battery-jumpstart-near-me"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ROADSIDE ASSISTANCE
  // ══════════════════════════════════════════════════════════════════════════

  {
    slug: "roadside-assistance-near-me",
    title: "Roadside Assistance Near Me | 24/7 Emergency Vehicle Help",
    shortTitle: "Roadside Assistance",
    category: "roadside",
    icon: "MapPin",
    tagline: "Broken down? One call brings help to your exact location in 30 minutes.",
    description:
      "Fiixup's 24/7 emergency roadside assistance service covers breakdown repair, battery jump start, tyre puncture, towing, and on-site mechanical fixes for both bikes and cars across Bengaluru and Chennai. Whether you've stalled on a city road, a national highway, or an expressway — our certified technician is dispatched immediately to your GPS location. We fix most breakdowns on the spot without towing. Transparent pricing, live technician tracking, no hidden charges. Available every day of the year including holidays. Starting from ₹299.",
    price: "₹299",
    priceNumeric: 299,
    duration: "30–60 min arrival",
    stats: [
      { value: "30 min", label: "Avg. Arrival" },
      { value: "24/7", label: "365 Days" },
      { value: "₹299", label: "Starting Price" },
      { value: "Bikes & Cars", label: "Covered" },
    ],
    heroChecks: [
      "Jump start, puncture, towing & repair",
      "Highway & city road coverage",
      "Live technician tracking",
      "No holiday or night surcharge",
    ],
    features: [
      "Emergency breakdown repair on the spot",
      "Battery jump start & replacement",
      "Tyre puncture repair & spare fitting",
      "Towing arranged if repair not possible",
      "Fuel delivery for vehicles that ran out of petrol",
      "Covers city roads, highways & expressways",
      "24/7 — 365 days including all public holidays",
    ],
    pricingRows: [
      { label: "Emergency Roadside Assistance Call-Out", vehicle: "both", priceFrom: 299, note: "Diagnosis + minor fixes" },
      { label: "Battery Jump Start (car)", vehicle: "car", priceFrom: 399, note: "Included in call-out price" },
      { label: "Tyre Puncture Repair (bike)", vehicle: "bike", priceFrom: 99, note: "Standard tubeless repair" },
      { label: "Tyre Puncture Repair (car)", vehicle: "car", priceFrom: 199, note: "Standard tubeless repair" },
      { label: "Towing Arranged (if repair not possible)", vehicle: "both", priceFrom: 299, note: "Separate towing charge applies" },
    ],
    competitorPricing: [
      { competitor: "Insurance RSA (average wait)", theirPrice: "1–3 hrs wait", ourPrice: "30–60 min", advantage: "2–3x faster" },
      { competitor: "Other RSA Apps", theirPrice: "₹399–799", ourPrice: "₹299", advantage: "Save ₹100–500" },
      { competitor: "Local Mechanic on Call", theirPrice: "₹500–1,000", ourPrice: "₹299", advantage: "Cheaper + professional" },
    ],
    pricingDisclaimer: "Call-out fee covers arrival and diagnosis. Individual services (jump start, puncture, towing) priced per service as shown. No hidden charges.",
    carBrands: ["All car brands covered"],
    bikeBrands: ["All bike & scooter brands covered"],
    guide: {
      title: "24/7 Roadside Assistance Guide — Be Prepared Before You Need It",
      intro: "Vehicle breakdowns happen without warning — typically at the worst possible time. Having a roadside assistance service saved on your phone is as important as car insurance. This guide covers what roadside assistance includes, what to do in different breakdown scenarios, and why Fiixup is the right choice for Bengaluru and Chennai vehicle owners.",
      sections: [
        {
          heading: "What Does Roadside Assistance Cover?",
          body: "Fiixup's roadside assistance covers: Battery jump start (for both cars and bikes). Flat tyre repair or spare tyre fitting. Emergency on-site mechanical repair (starter failure, fuel system issue, broken belt). Minor electrical repairs (blown fuse, disconnected wire). Towing to a workshop if on-site repair is not possible. Fuel delivery if you run out of petrol. Lock-out assistance in some cases. We fix the majority of breakdowns on the spot without the need for towing — saving you time and money.",
        },
        {
          heading: "Highway Breakdown — The Right Steps",
          body: "On highways and expressways, safety is the highest priority. Move to the emergency lane or hard shoulder immediately. Switch on hazard lights. Do not stand in the emergency lane — move behind the crash barrier. Do not leave vehicle valuables in an abandoned car on the highway. Call Fiixup: 8197459732. Share your exact highway location (km marker + direction). Our technician is dispatched with priority for highway breakdowns.",
        },
        {
          heading: "Why Fiixup Roadside Assistance Is Better Than Insurance RSA",
          body: "Most car insurance policies include roadside assistance, but the average response time for insurer RSA services in Indian cities is 1–3 hours. Fiixup's average response time is 30–60 minutes — and we charge transparently rather than hiding costs in insurance premiums. For residents of Bengaluru and Chennai, Fiixup RSA is also significantly cheaper as a pay-per-use service compared to annual RSA subscriptions that most people never fully utilise.",
        },
      ],
      conclusion: "Save Fiixup's number before you need it: 8197459732. When something goes wrong on the road — at 3am on a highway or in your apartment parking — one call dispatches our nearest certified technician to your exact location. We fix most breakdowns on the spot. 24/7, 365 days.",
    },
    testimonials: [
      { name: "Sriram N.", area: "ORR, Bengaluru", vehicle: "Kia Seltos", rating: 5, text: "Engine overheated on ORR at peak hour. Fiixup arrived in 35 minutes, diagnosed a low coolant level, refilled it, and I was back on the road in under an hour. Incredible service.", date: "April 2026" },
      { name: "Priya D.", area: "ECR, Chennai", vehicle: "Honda Activa", rating: 5, text: "Scooter stopped dead on ECR. Fiixup came in 25 minutes — dead battery. Jump started it, replaced the battery on spot. So relieved. Highly recommend.", date: "March 2026" },
    ],
    faqs: [
      { q: "What does roadside assistance near me include?", a: "Our roadside assistance covers jump start, puncture repair, on-site breakdown repair, towing, spare tyre fitting, and minor mechanical fixes — all at your location." },
      { q: "How fast does roadside assistance arrive?", a: "Typically within 30–60 minutes in city areas. For highway breakdowns we dispatch the nearest available technician immediately." },
      { q: "Is roadside assistance available on highways and expressways?", a: "Yes. We cover all major national highways, outer ring roads, and expressways in Bengaluru (ORR, NICE Road) and Chennai (OMR, ECR, NH44)." },
      { q: "Is roadside assistance available on public holidays?", a: "Yes. Fiixup operates 24/7, 365 days a year — including all national and state public holidays, festivals, and weekends." },
      { q: "Can I get roadside assistance for both my bike and car?", a: "Yes. Our roadside assistance covers all two-wheelers and four-wheelers." },
    ],
    metaTitle: "Roadside Assistance Near Me | 24/7 Emergency Help Bengaluru & Chennai | Fiixup",
    metaDescription: "Broken down? 24/7 roadside assistance for bikes & cars in Bengaluru & Chennai. Jump start, puncture, towing & on-site repair. Arrives in 30 min. Starting ₹299. Call now.",
    metaKeywords: "roadside assistance near me, emergency roadside assistance near me, 24 hour roadside assistance near me, roadside help near me, car breakdown assistance near me, vehicle breakdown service near me, emergency car help near me, roadside recovery near me, car broke down near me, roadside assistance bangalore, roadside assistance chennai",
    relatedSlugs: ["car-breakdown-service", "car-battery-jumpstart-near-me", "car-towing-service-near-me"],
  },

  {
    slug: "car-breakdown-service",
    title: "Car Breakdown Service Near Me | 24/7 Emergency Repair",
    shortTitle: "Car Breakdown Service",
    category: "roadside",
    icon: "AlertTriangle",
    tagline: "Car broken down? Our mechanic reaches you in 30 minutes, day or night.",
    description:
      "Fiixup's 24/7 car breakdown service dispatches a certified mobile mechanic to your location immediately in Bengaluru and Chennai — whether you've stalled in traffic, broken down on a highway, or your car simply won't start. Our technician carries tools and common parts to diagnose and fix most car breakdowns on the spot: dead battery, overheating, tyre puncture, engine misfire, starter failure, fuel system issues, and more. If the repair requires a workshop, we arrange safe towing and stay with you. All car brands. Starting from ₹299.",
    price: "₹299",
    priceNumeric: 299,
    duration: "30–90 min",
    stats: [
      { value: "30 min", label: "Avg. Arrival" },
      { value: "24/7", label: "Available" },
      { value: "80%", label: "Fixed On-Spot" },
      { value: "All Cars", label: "Covered" },
    ],
    heroChecks: [
      "Mobile mechanic with tools & parts",
      "Most breakdowns fixed on the spot",
      "Highway & city road coverage",
      "Towing arranged if needed",
    ],
    features: [
      "Emergency on-site breakdown diagnosis & repair",
      "Battery jump start & replacement",
      "Overheating — coolant top-up & diagnosis",
      "Tyre puncture repair & spare fitting",
      "Fuel system issue diagnosis",
      "Towing arranged if needed",
      "All car brands & highway coverage",
    ],
    pricingRows: [
      { label: "Breakdown Call-Out (Diagnosis)", vehicle: "car", priceFrom: 299, note: "Credited towards repair" },
      { label: "Battery Jump Start", vehicle: "car", priceFrom: 399, note: "Included in call-out" },
      { label: "Overheating Coolant Top-Up", vehicle: "car", priceFrom: 349, note: "Coolant included" },
      { label: "Flat Tyre / Spare Fitting", vehicle: "car", priceFrom: 199, note: "At breakdown location" },
      { label: "Emergency On-Site Repair", vehicle: "car", priceFrom: 499, note: "Labour, parts extra" },
    ],
    competitorPricing: [
      { competitor: "Auto Club / Insurance RSA", theirPrice: "1–3 hr wait", ourPrice: "30–60 min", advantage: "3x faster" },
      { competitor: "Local Roadside Mechanic", theirPrice: "₹500–1,500", ourPrice: "₹299–499", advantage: "Cheaper + professional" },
      { competitor: "Other Breakdown Apps", theirPrice: "₹499–899", ourPrice: "₹299", advantage: "Save up to ₹600" },
    ],
    pricingDisclaimer: "Call-out fee covers arrival and diagnosis. Repairs priced separately and confirmed before work starts. Towing charged separately if required.",
    carBrands: ["All car brands and models covered"],
    guide: {
      title: "Car Breakdown Guide — What to Do in Every Scenario",
      intro: "A car breakdown can happen anywhere — on Bengaluru's ORR at rush hour, on Chennai's ECR late at night, or in your office parking. Knowing what to do in the first few minutes can prevent accidents and make the recovery faster. This guide covers the most common breakdown scenarios and the right response to each.",
      sections: [
        {
          heading: "Car Won't Start — Most Common Causes",
          body: "Dead or weak battery (most common — clicking sound or silence). Bad starter motor (grinding sound but engine won't crank). Fuel pump failure (engine cranks normally but won't start). Empty fuel tank (surprisingly common). Immobiliser or key fob issue (engine cranks but immediately dies). Blown main fuse. Our mechanic diagnoses all of these systematically with OBD2 scanner, multimeter, and physical inspection — and fixes the root cause on the spot.",
        },
        {
          heading: "Car Overheating — What to Do",
          body: "1. Pull over immediately and switch off the engine. Do not open the radiator cap while hot — pressurised coolant will spray out. 2. Switch on hazard lights. 3. Let the engine cool for at least 30 minutes. 4. Call Fiixup. Do not attempt to drive an overheating car — engine seizure can occur within minutes. Common causes: low coolant level (leak), blocked radiator, faulty thermostat, broken cooling fan, blown head gasket (most severe). Our mechanic diagnoses the cause and adds coolant, clears blockages, or replaces the thermostat on-site.",
        },
        {
          heading: "Car Stalled in the Middle of Traffic",
          body: "First priority: safety. If the car cannot be moved, switch on hazard lights and stay inside the car with seatbelt on. Call Fiixup for immediate assistance. If in a safe position to push the car, ask bystanders to help push to the road shoulder before calling us. Do not leave the car blocking a lane for more than a few minutes — in Indian city traffic this creates serious accident risk.",
        },
      ],
      conclusion: "Breakdowns are stressful but manageable with the right help. Fiixup's 24/7 car breakdown service in Bengaluru and Chennai reaches you in 30–60 minutes with a fully equipped mobile mechanic who fixes 80% of breakdowns on the spot — so you're back on the road fast.",
    },
    testimonials: [
      { name: "Ashwin K.", area: "Hebbal, Bengaluru", vehicle: "Maruti Brezza", rating: 5, text: "Car stalled in Hebbal flyover traffic at 8am. Called Fiixup, they came in 30 minutes. Diagnosed a faulty fuel pump relay. Fixed on the spot. Crisis averted.", date: "April 2026" },
      { name: "Meera T.", area: "Anna Salai, Chennai", vehicle: "Honda City", rating: 5, text: "Engine started overheating on Anna Salai. Pulled over, called Fiixup. Mechanic arrived in 25 minutes, topped up the coolant and found a hose leak. Fixed in an hour.", date: "March 2026" },
    ],
    faqs: [
      { q: "My car just stopped in the middle of the road — what should I do?", a: "Steer safely to the side, switch on hazard lights, and call Fiixup immediately. Do not leave the car in a moving lane. Our technician reaches you in 30–60 minutes." },
      { q: "Can you fix a car breakdown on the highway?", a: "Yes. We cover all major highways and expressways. For highway breakdowns, park in the emergency lane, switch on hazard lights, and call us — we dispatch immediately." },
      { q: "My car is overheating — should I call you?", a: "Yes. Pull over immediately and switch off the engine. Do not open the radiator cap while hot. Call Fiixup — overheating can cause severe engine damage if driven further." },
      { q: "Is car breakdown service available at night?", a: "Yes. Our service is available 24/7 with no extra charge for night call-outs — including late nights, early mornings, and weekends." },
    ],
    metaTitle: "Car Breakdown Service Near Me | 24/7 Emergency Repair Bengaluru & Chennai",
    metaDescription: "Car broken down? 24/7 emergency car breakdown service in Bengaluru & Chennai. Mobile mechanic at your location. All brands. Starting ₹299. Call now.",
    metaKeywords: "car breakdown service near me, car broke down near me, emergency car repair near me, car breakdown near me, car won't start near me, mobile car mechanic near me, 24 hour car mechanic near me, car stalled near me, car breakdown bangalore, car breakdown chennai",
    relatedSlugs: ["roadside-assistance-near-me", "car-battery-jumpstart-near-me", "car-towing-service-near-me"],
  },

  {
    slug: "mobile-mechanic-near-me",
    title: "Mobile Mechanic Near Me | Doorstep Car & Bike Repair",
    shortTitle: "Mobile Mechanic",
    category: "mechanic",
    icon: "Wrench",
    tagline: "A certified mechanic at your door — faster and cheaper than a garage.",
    description:
      "Fiixup's on-demand mobile mechanic service sends a certified vehicle technician to your home, office, apartment, or roadside location for car and bike repair in Bengaluru and Chennai. Our mobile mechanics carry professional-grade tools, OBD2 diagnostic equipment, and common spare parts in a fully equipped service van. Whether you need an oil change, brake service, electrical repair, engine diagnostics, AC service, or a tyre change — we complete most jobs at your location in one visit. No garage queues, no transport stress, and at prices that are often lower than a traditional workshop. Available 24/7. Starting from ₹299.",
    price: "₹299",
    priceNumeric: 299,
    duration: "30 min–3 hrs",
    stats: [
      { value: "30 min", label: "Avg. Arrival" },
      { value: "4.9★", label: "Rating" },
      { value: "30-day", label: "Warranty" },
      { value: "24/7", label: "Available" },
    ],
    heroChecks: [
      "Certified & background-verified mechanics",
      "OBD2 scanner & professional tools",
      "30-day warranty on all repairs",
      "Transparent pricing — no surprises",
    ],
    features: [
      "Certified & background-verified mechanics",
      "Fully equipped service van — tools & common parts",
      "OBD2 diagnostic scanner for cars",
      "Oil change, brake, AC, electrical & more",
      "Live mechanic tracking after booking",
      "Transparent quote before work starts",
      "30-day warranty on all repairs",
    ],
    pricingRows: [
      { label: "Mobile Mechanic Call-Out (any service)", vehicle: "both", priceFrom: 299, note: "Call-out fee towards service" },
      { label: "Bike General Service (doorstep)", vehicle: "bike", priceFrom: 349, note: "Full service" },
      { label: "Car General Service (doorstep)", vehicle: "car", priceFrom: 999, note: "Full service" },
      { label: "Emergency Mobile Mechanic", vehicle: "both", priceFrom: 499, note: "Priority dispatch" },
    ],
    competitorPricing: [
      { competitor: "Traditional Garage", theirPrice: "₹500–3,000 + transport", ourPrice: "₹299+", advantage: "No transport cost" },
      { competitor: "Authorized Service Centre", theirPrice: "₹1,500–8,000", ourPrice: "₹299+", advantage: "Save 30–60%" },
      { competitor: "Other Mobile Mechanic Apps", theirPrice: "₹499–999", ourPrice: "₹299+", advantage: "Best price + warranty" },
    ],
    pricingDisclaimer: "Call-out fee credited against service charge. All pricing confirmed before work starts. 30-day warranty on all work.",
    carBrands: ["All car brands covered"],
    bikeBrands: ["All bike & scooter brands covered"],
    guide: {
      title: "Mobile Mechanic Near Me — Complete Guide to Doorstep Vehicle Repair",
      intro: "The mobile mechanic model is growing rapidly in Indian cities — and for good reason. Getting your car or bike serviced traditionally means taking time off work, arranging transport, waiting at a service centre for hours, and paying for the overheads of a physical garage. Fiixup's mobile mechanics in Bengaluru and Chennai eliminate all of this. This guide explains how it works, what to expect, and why it's the smarter choice for most vehicle owners.",
      sections: [
        {
          heading: "What Can a Mobile Mechanic Do That a Garage Can't?",
          body: "The honest answer: most things. A mobile mechanic can perform oil and filter changes, brake services, battery replacements, tyre changes, electrical repairs, AC re-gassing, engine diagnostics, chain and sprocket service, and full periodic servicing — all at your location. The few things that genuinely require a workshop are major engine rebuilds (piston/ring replacement), cylinder boring, full paint jobs, and bodywork. For everything else, a professional mobile mechanic with the right tools is equivalent to a garage.",
        },
        {
          heading: "How to Know If a Mobile Mechanic Is Trustworthy",
          body: "The biggest concern about mobile mechanics is trust. At Fiixup, every mechanic is: Certified — passed a technical assessment in their specialty. Background-verified — identity and criminal record checked. Rated — every job is reviewed by the customer, and mechanics maintain visible ratings. Insured — covered for accidental damage during service. You receive your mechanic's name, photo, experience level, and real customer rating before they arrive — so you know exactly who is coming to your home.",
        },
        {
          heading: "Is a Mobile Mechanic Cheaper Than a Garage?",
          body: "For most services, yes — by 20–40%. Mobile mechanics have lower overhead costs (no property rent, lower staff costs) and compete on service quality rather than location. Fiixup's transparent pricing model means you see the cost before work starts — no surprise bills. You also save the indirect cost of getting your vehicle to and from a garage, which in Indian cities can involve towing fees, auto-rickshaw costs, or losing half a day of work.",
        },
      ],
      conclusion: "A Fiixup mobile mechanic in Bengaluru or Chennai is at your door in 30–60 minutes, does the same job as a garage, charges less, and comes with a 30-day warranty. Book via the website, WhatsApp, or call 8197459732.",
    },
    testimonials: [
      { name: "Rajiv M.", area: "Indiranagar, Bengaluru", vehicle: "Multiple (Car + Bike)", rating: 5, text: "Use Fiixup for both my Creta and my R15. The mechanic knows both vehicles well, always on time, and honest about what's needed. Best mobile mechanic service in Bengaluru.", date: "April 2026" },
      { name: "Shanthi P.", area: "Kilpauk, Chennai", vehicle: "Maruti Baleno", rating: 5, text: "Avoided 3 hours at the Maruti service centre by calling Fiixup. Full service done at my apartment in 2 hours. Same quality, half the price. Will not go back to the authorised centre.", date: "March 2026" },
    ],
    faqs: [
      { q: "Is a mobile mechanic reliable?", a: "Yes. Fiixup's mobile mechanics are certified, background-verified, and carry professional-grade tools. Every repair comes with a 30-day warranty — the same or better than most garages." },
      { q: "Is a mobile mechanic cheaper than a garage?", a: "Usually yes. Mobile mechanics have lower overhead costs and we price competitively. You also save towing fees and time. All prices are quoted transparently before work starts." },
      { q: "What jobs can a mobile mechanic do?", a: "Most common repairs: oil change, brake service, battery replacement, AC re-gas, puncture repair, chain service, electrical diagnosis, engine diagnostics, and full servicing — all at your location." },
      { q: "Can I see my mechanic's profile and rating before they arrive?", a: "Yes. After booking you receive your assigned mechanic's name, photo, experience, and real customer rating so you know who to expect." },
      { q: "How do I book a mobile mechanic near me?", a: "Book via our website, call 8197459732, or WhatsApp us. We confirm the booking within minutes and share a live ETA." },
    ],
    metaTitle: "Mobile Mechanic Near Me | Doorstep Car & Bike Repair Bengaluru & Chennai",
    metaDescription: "Book a certified mobile mechanic near you in Bengaluru & Chennai. Doorstep car & bike repair at home or office. 30-day warranty. Cheaper than a garage. Starting ₹299. Book now.",
    metaKeywords: "mobile mechanic near me, doorstep mechanic near me, mechanic at home near me, on demand mechanic near me, mobile car mechanic near me, mobile bike mechanic near me, home mechanic near me, mechanic near me, mobile mechanic bangalore, mobile mechanic chennai",
    relatedSlugs: ["car-service-at-home", "bike-service-at-home", "roadside-assistance-near-me"],
  },

];

export default services;

// ── Helper functions ──────────────────────────────────────────────────────────

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: ServiceData["category"]) {
  return services.filter((s) => s.category === category);
}

export function getRelatedServices(slug: string) {
  const service = getServiceBySlug(slug);
  if (!service) return [];
  return service.relatedSlugs
    .map((s) => getServiceBySlug(s))
    .filter(Boolean) as ServiceData[];
}

// Pre-filtered exports
export const bikeServices     = getServicesByCategory("bike");
export const carServices      = getServicesByCategory("car");
export const towingServices   = getServicesByCategory("towing");
export const batteryServices  = getServicesByCategory("battery");
export const punctureServices = getServicesByCategory("puncture");
export const roadsideServices = getServicesByCategory("roadside");
export const mechanicServices = getServicesByCategory("mechanic");

export const allServicesOrdered: ServiceData[] = [
  ...bikeServices,
  ...carServices,
  ...towingServices,
  ...batteryServices,
  ...punctureServices,
  ...roadsideServices,
  ...mechanicServices,
];
