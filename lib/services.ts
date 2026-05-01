// lib/services.ts
// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for ALL service data.
// • Original 20+ services kept exactly as-is (all optional new fields absent).
// • Key high-traffic services enriched with pricing, guide, testimonials.
// • To enrich any service: add the optional fields below — no component change.
// ─────────────────────────────────────────────────────────────────────────────

import type { ServiceData, BrandEntry, CompetitorRow, PricingRow } from "./models/service.model";

// ── Shared data (reduces repetition) ─────────────────────────────────────────

const DEFAULT_COMPETITORS: CompetitorRow[] = [
  { name: "Local Garage",       price: "₹800–₹1,500",  arrivalTime: "Next day",      warranty: "None",     doorstep: false },
  { name: "Authorised Centre",  price: "₹1,500–₹4,000",arrivalTime: "3–7 days",      warranty: "3 months", doorstep: false },
  { name: "Fiixup",             price: "From ₹299",    arrivalTime: "30–60 minutes", warranty: "30 days",  doorstep: true  },
];

const CAR_BRANDS_RICH: BrandEntry[] = [
  { name: "Maruti Suzuki", models: ["Swift", "Baleno", "Dzire", "Ertiga", "Brezza", "Alto"] },
  { name: "Hyundai",       models: ["i20", "Creta", "Venue", "Verna", "Alcazar"] },
  { name: "Tata",          models: ["Nexon", "Punch", "Harrier", "Safari", "Tiago", "Nexon EV"] },
  { name: "Honda",         models: ["City", "Amaze", "WR-V", "Jazz"] },
  { name: "Toyota",        models: ["Innova Crysta", "Fortuner", "Glanza", "Urban Cruiser Hyryder"] },
  { name: "Kia",           models: ["Seltos", "Sonet", "Carens", "EV6"] },
  { name: "MG",            models: ["Hector", "ZS EV", "Astor", "Gloster"] },
  { name: "Mahindra",      models: ["Scorpio-N", "XUV700", "Thar", "Bolero", "XUV400"] },
  { name: "Volkswagen",    models: ["Polo", "Virtus", "Taigun"] },
  { name: "Skoda",         models: ["Slavia", "Kushaq", "Octavia"] },
  { name: "Renault",       models: ["Kwid", "Triber", "Kiger"] },
  { name: "Nissan",        models: ["Magnite", "Kicks"] },
];

const BIKE_BRANDS_RICH: BrandEntry[] = [
  { name: "Honda",         models: ["Activa 6G", "Shine 100", "CB300R", "Hornet 2.0", "SP125"] },
  { name: "Bajaj",         models: ["Pulsar 150", "Pulsar NS200", "Dominar 400", "Platina", "Avenger"] },
  { name: "TVS",           models: ["Jupiter", "Apache RTR 160", "Ntorq 125", "Raider 125", "iQube EV"] },
  { name: "Royal Enfield", models: ["Classic 350", "Bullet 350", "Meteor 350", "Himalayan", "Hunter 350"] },
  { name: "Yamaha",        models: ["R15 V4", "FZ-S V3", "MT-15", "Fascino 125", "Ray ZR"] },
  { name: "Hero",          models: ["Splendor Plus", "HF Deluxe", "Glamour", "Xpulse 200", "Xtreme 160R"] },
  { name: "Suzuki",        models: ["Access 125", "Burgman Street", "Gixxer 250"] },
  { name: "KTM",           models: ["Duke 200", "Duke 390", "RC 390", "Adventure 390"] },
];

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES — all 20+ services, enriched where specified
// ─────────────────────────────────────────────────────────────────────────────

const services: ServiceData[] = [

  // ══ BIKE SERVICES ══════════════════════════════════════════════════════════

  {
    slug: "bike-service-at-home",
    title: "Bike Service at Home — Doorstep Two-Wheeler Servicing",
    shortTitle: "Bike General Service",
    category: "bike",
    icon: "Bike",
    tagline: "Complete bike servicing at your home or office — no garage, no waiting.",
    description:
      "Fiixup's doorstep bike service brings a certified mechanic to your home, office, or apartment parking in Bengaluru, Chennai, Hyderabad, and Mumbai. We handle full two-wheeler servicing for all brands — Honda, Bajaj, TVS, Royal Enfield, Yamaha, Hero, KTM, Suzuki, and more. Our service includes engine oil change, air filter cleaning, chain lubrication, brake adjustment, spark plug check, and tyre pressure — everything a full garage service covers, delivered right where your bike is parked. Starting from ₹349 with a 30-day warranty.",
    price: "₹349",
    duration: "1–2 hrs",
    features: [
      "Engine oil drain & refill with correct-grade oil",
      "Air filter cleaning or replacement",
      "Chain cleaning, lubrication & tension adjustment",
      "Brake pad & shoe inspection & adjustment",
      "Tyre pressure check & top-up",
      "Spark plug inspection & replacement",
      "30-day service warranty included",
    ],
    // ── NEW ENRICHED FIELDS ──────────────────────────────────────────────────
    pricing: {
      rows: [
        { label: "Bike Basic Service (labour only)",              priceFrom: 349,  note: "oil & parts extra" },
        { label: "Bike Full Service with Engine Oil",             priceFrom: 599,  priceTo: 899, highlight: true },
        { label: "Scooter Full Service (Activa, Jupiter etc.)",   priceFrom: 549,  priceTo: 799 },
        { label: "Premium Bike Service (RE, KTM, Yamaha R15)",    priceFrom: 899,  priceTo: 1499 },
        { label: "Air Filter Replacement",                        priceFrom: 149,  note: "filter cost extra" },
        { label: "Spark Plug Replacement",                        priceFrom: 99,   note: "plug cost extra" },
        { label: "Chain Cleaning & Lubrication",                  priceFrom: 149 },
      ] as PricingRow[],
      competitors: DEFAULT_COMPETITORS,
      disclaimer: "Prices are indicative. Final quote confirmed before work starts — no surprise charges.",
    },
    benefits: [
      { icon: "Clock",  title: "Saves 3+ Hours",      body: "No travel, no waiting. The mechanic comes to your location at a time you choose." },
      { icon: "Shield", title: "30-Day Warranty",     body: "Every service is backed by a 30-day warranty. Issue recurs? We fix it free of charge." },
      { icon: "Award",  title: "Certified Mechanics", body: "All technicians are trained, certified, and background-verified before joining Fiixup." },
      { icon: "Tag",    title: "No Hidden Costs",     body: "Full itemised quote before work begins. The price you approve is the price you pay." },
    ],
    bikeBrands: BIKE_BRANDS_RICH,
    testimonials: [
      { name: "Karthik M.",   location: "HSR Layout, Bengaluru",   vehicle: "Honda Activa 6G",      rating: 5, review: "Booked at 9am, mechanic arrived by 10am. Full service done in my apartment parking. Genuine oil used and invoice provided. Will definitely use again.", date: "March 2026", verified: true },
      { name: "Divya R.",     location: "Anna Nagar, Chennai",     vehicle: "TVS Jupiter",          rating: 5, review: "Super convenient! Scooter serviced in my office basement. No garage queues, very professional and clean work.", date: "April 2026", verified: true },
      { name: "Rohan Pillai", location: "Koramangala, Bengaluru",  vehicle: "Royal Enfield Meteor", rating: 5, review: "They showed me the used oil before draining and explained every step. Transparent service I can trust.", date: "February 2026", verified: true },
    ],
    guide: {
      title: "The Complete Guide to Doorstep Bike Service in Bengaluru & Chennai",
      intro: "Your bike is your daily companion — and like any machine, it needs regular care to perform safely and efficiently. This guide covers what's included in a full bike service, how often to service, what warning signs to watch for, and why doorstep bike servicing beats a traditional garage visit in every way.",
      sections: [
        {
          heading: "What Is Included in a Doorstep Bike Service?",
          body: "A complete doorstep bike service covers engine oil drain and refill with the correct grade for your model, air filter cleaning or replacement, chain cleaning with degreaser and lubrication with quality chain lube, brake system inspection including pads, shoes, and hydraulic fluid, spark plug check and replacement if needed, tyre pressure set to manufacturer specification, and all nuts and bolts checked for tightness. A written service report is provided after completion.",
          tips: [
            "Always ask for the invoice listing each part used and its quantity.",
            "Check the oil grade used matches your owner manual — it matters for engine longevity.",
            "Request a test idle by the mechanic before he leaves to confirm everything is working.",
          ],
        },
        {
          heading: "How Often Should You Service Your Bike?",
          body: "The standard recommendation for city riding in Bengaluru and Chennai is every 3,000 km or 3 months, whichever comes first. City riding is harder on engines than highway riding due to constant stop-and-go, idle time in traffic, and heat. For Royal Enfield and KTM, follow the manufacturer-specific interval. For delivery riders clocking 50+ km per day, service every 2,000–2,500 km is advisable. Scooters like Honda Activa and TVS Jupiter should be serviced every 3 months regardless of mileage.",
          tips: [
            "Set a calendar reminder at every 3,000 km or 3 months.",
            "Never delay an oil change beyond 500 km after the due date.",
            "If you ride in rain regularly, shorten chain lubrication to every 300–400 km.",
          ],
        },
        {
          heading: "Engine Oil: The Most Important Maintenance Item",
          body: "Engine oil lubricates moving metal parts, removes heat, and carries away contaminants. Old oil stops doing these jobs — leading to increased wear, reduced power, and engine damage. For most Indian bikes, 10W-30 or 10W-40 mineral oil is standard. Royal Enfield requires 15W-50 for their larger engines. KTM and performance bikes benefit from semi-synthetic or fully synthetic oil. At Fiixup, our technicians carry the correct oil grade for your specific bike model — never a generic substitute.",
        },
        {
          heading: "Common Bike Problems Between Services",
          body: "Watch for these warning signs between scheduled services: A rattling or knocking engine sound often indicates low oil or worn piston rings. A slipping clutch means the engine revs but the bike doesn't accelerate proportionally. Spongy brakes mean reduced braking pressure. Chain slap means the chain is stretched and needs adjustment. Difficult self-start is usually a battery or carburetor issue. Excessive fuel consumption is often caused by a dirty air filter, incorrect tyre pressure, or carburetor issues.",
          tips: [
            "Address brake and tyre issues immediately — they affect safety directly.",
            "Chain slap is dangerous at high speeds — don't ignore it.",
          ],
        },
        {
          heading: "Why Doorstep Bike Service Is Better Than a Garage",
          body: "Traditional garages in Bengaluru and Chennai come with frustrations: travel time, long queues of 2–4 hours, lack of transparency, and anxiety about leaving your vehicle unattended. Doorstep service eliminates every problem. You book a time, the mechanic arrives, all work is done in front of you, and you get a digital service record. In Bengaluru, where traffic adds 45–60 minutes to any garage trip, doorstep service saves a full working morning. Fiixup's mechanics use the same professional tools as a good garage — the only difference is the location.",
        },
        {
          heading: "Bike Service Tips for Bengaluru Riders",
          body: "Bengaluru's roads present different challenges. Whitefield and Electronic City bikes need more frequent air filter changes due to construction dust. Koramangala and Indiranagar bikes suffer pothole damage — suspension checks are priority. HSR Layout and BTM Layout residents often have basement parking which Fiixup technicians are fully equipped to work in. In monsoon months (June–September), increase chain lubrication frequency to every 300 km to prevent rust.",
        },
        {
          heading: "Bike Service Tips for Chennai Riders",
          body: "Chennai's coastal climate affects bikes differently. Salt air in areas like Besant Nagar, ECR, and Anna Nagar causes faster battery terminal corrosion and chain rust. Apply anti-corrosion spray to battery terminals every 6 months. The extreme summer heat (April–June) degrades engine oil faster — consider shortening oil change intervals to 2,500 km in peak summer. During Northeast Monsoon flooding, never attempt to start a waterlogged bike — call Fiixup immediately.",
          tips: [
            "Check tyre pressure fortnightly in Chennai summers — heat over-inflates tyres causing blowouts.",
            "Waterlogged engine: DO NOT crank it. Call Fiixup for immediate assistance.",
          ],
        },
      ],
      conclusion: "Regular doorstep bike service with Fiixup is the easiest way to keep your two-wheeler in peak condition without sacrificing your time. Our certified mechanics bring the garage to you — with full transparency, genuine parts, and a 30-day warranty. Book your next service today.",
    },
    relatedSlugs: ["bike-oil-change-at-home", "bike-brake-clutch-repair", "bike-battery-jumpstart-near-me"],
    faqs: [
      { q: "How much does a doorstep bike service cost?", a: "A basic doorstep bike service starts from ₹349. Full service with oil change, chain, air filter, and spark plug starts from ₹599. You get a detailed quote before work begins — no hidden charges." },
      { q: "How often should I get my bike serviced?", a: "Every 3,000–5,000 km or every 3 months, whichever comes first. For heavy city or delivery use, service every 2,500 km." },
      { q: "Do you service Royal Enfield, KTM, and other premium bikes?", a: "Yes. We service all popular brands including Royal Enfield (Bullet, Classic, Meteor, Himalayan), KTM (Duke, Adventure, RC), Yamaha R15, and all others." },
      { q: "Can I book same-day doorstep bike service?", a: "Yes. Same-day slots are available across Bengaluru, Chennai, Hyderabad, and Mumbai. Book on our website or call your city's helpline." },
      { q: "Is the service available inside gated societies and apartments?", a: "Yes. Share gate entry details when booking — our technician handles the rest including apartment complexes and office campuses." },
      { q: "What oil does Fiixup use for my bike?", a: "We use the manufacturer-recommended oil grade for your specific bike. We carry 10W-30, 10W-40, 15W-50, and synthetic options. The grade is confirmed before filling." },
      { q: "Do you provide a service report after completing the work?", a: "Yes. A digital service report listing all work done, parts used, and next service due date is sent via WhatsApp after every service." },
    ],
    metaTitle: "Bike Service at Home | Doorstep Two-Wheeler Servicing — Fiixup",
    metaDescription: "Complete bike servicing at your doorstep in Bengaluru, Chennai & more. Certified mechanics for Honda, Bajaj, Royal Enfield, TVS, KTM & all brands. 30-day warranty. Starting ₹349. Book now.",
    metaKeywords: "bike service at home, doorstep bike service, two wheeler service near me, mobile bike mechanic, bike servicing at home Bengaluru, motorcycle service near me, scooter service at home, bike mechanic near me, two wheeler servicing Chennai, bike general service, doorstep two wheeler service, home bike service",
  },

  {
    slug: "bike-oil-change-at-home",
    title: "Bike Oil Change at Home | Doorstep Engine Oil Service",
    shortTitle: "Bike Oil Change",
    category: "bike",
    icon: "Droplets",
    tagline: "Fresh engine oil in 20 minutes — we come to you.",
    description:
      "Fiixup's doorstep bike oil change service brings a certified technician to your location with the correct-grade engine oil for your specific bike model. Regular oil changes extend engine life, improve fuel efficiency, and prevent costly breakdowns. We handle oil drain, refill, and oil filter replacement for all two-wheeler brands — Honda Activa, Royal Enfield, Bajaj Pulsar, TVS Apache, Yamaha, KTM, and every popular Indian bike and scooter. The job is done in under 30 minutes with no mess left behind. Starting from ₹249.",
    price: "₹249",
    duration: "20–30 min",
    features: [
      "Engine oil drain & refill with OEM-grade oil",
      "Oil filter replacement (if due)",
      "Correct oil grade for your exact bike model",
      "Mineral, semi-synthetic & fully synthetic options",
      "Oil level check & top-up after fill",
      "Next service reminder sticker fitted",
      "Zero mess — we carry a disposal kit",
    ],
    pricing: {
      rows: [
        { label: "Bike Oil Change (labour only)",         priceFrom: 249, note: "oil cost extra" },
        { label: "Bike Oil Change + Mineral Oil",         priceFrom: 399, highlight: true },
        { label: "Bike Oil Change + Semi-Synthetic Oil",  priceFrom: 549 },
        { label: "Bike Oil Change + Fully Synthetic Oil", priceFrom: 699 },
        { label: "Oil Filter Replacement (with oil change)", priceFrom: 149, note: "filter cost extra" },
        { label: "Royal Enfield Oil Change (15W-50)",     priceFrom: 699 },
        { label: "KTM / Performance Bike Oil Change",     priceFrom: 799 },
      ] as PricingRow[],
      competitors: DEFAULT_COMPETITORS,
      disclaimer: "Oil grade confirmed for your bike before work begins. Final price quoted upfront.",
    },
    benefits: [
      { icon: "Zap",    title: "Improved Fuel Economy", body: "Fresh oil reduces engine friction, directly improving fuel efficiency by 5–10%." },
      { icon: "Clock",  title: "Done in 20 Minutes",    body: "The fastest doorstep oil change you'll find. Book, we arrive, we're done." },
      { icon: "Shield", title: "Engine Life Extended",  body: "Regular oil changes are the single biggest factor in extending engine life beyond 1 lakh km." },
      { icon: "Award",  title: "Correct Grade Always",  body: "We use manufacturer-specified oil grade for your exact bike model — never a generic substitute." },
    ],
    bikeBrands: BIKE_BRANDS_RICH,
    testimonials: [
      { name: "Suresh T.",  location: "Indiranagar, Bengaluru", vehicle: "Bajaj Pulsar 150", rating: 5, review: "Super quick! 25 minutes flat. Used the correct 10W-30 oil for my Pulsar and showed me the old oil before disposal. Clean work, no mess on my parking floor.", date: "March 2026", verified: true },
      { name: "Preethi V.", location: "Velachery, Chennai",     vehicle: "Honda Activa 6G", rating: 5, review: "Perfect service. The technician even stuck the next oil change reminder sticker. This is the way bike servicing should work.", date: "April 2026", verified: true },
    ],
    guide: {
      title: "Complete Guide to Bike Engine Oil Changes in India: When, Why and How",
      intro: "Engine oil is the single most important maintenance item for your bike. This guide covers the right oil grade for every popular Indian bike, how often to change, the difference between mineral and synthetic oil, and why doorstep oil change is the smartest choice for city riders in Bengaluru and Chennai.",
      sections: [
        {
          heading: "Why Engine Oil Changes Matter More Than You Think",
          body: "Engine oil does four critical jobs simultaneously: it lubricates metal surfaces to reduce friction and wear, acts as a coolant carrying heat away from the engine, cleans by suspending combustion byproducts, and provides a protective film preventing corrosion. Over time, oil breaks down through heat exposure and contamination. The additives that give oil its protective properties deplete. Metal particles from normal engine wear accumulate. The result is degraded oil that has lost most of its protective ability. Riding with old oil accelerates wear, reduces power, and can lead to serious engine damage.",
          tips: [
            "Check your oil level every 500 km — low oil is more immediately dangerous than old oil.",
            "Dark black oil colour is normal — it means the oil is doing its cleaning job.",
            "Milky or burnt-smelling oil are warning signs requiring immediate attention.",
          ],
        },
        {
          heading: "Oil Change Intervals for Every Popular Indian Bike",
          body: "Honda Activa: Every 2,000 km or 3 months, mineral 10W-30. Honda Shine/SP125: Every 3,000 km, 10W-30. Bajaj Pulsar 150/160: Every 3,000 km, 20W-40 or 10W-40. Bajaj Dominar 400: Every 5,000 km, 15W-50. Royal Enfield Classic/Bullet/Meteor 350: Every 3,000 km for first 3 services, then 5,000 km, 15W-50 SAE. Royal Enfield Himalayan: Every 5,000 km, 15W-50. KTM Duke 200/390: Every 5,000 km, semi-synthetic 10W-40. Yamaha R15 V4: Every 5,000 km, 10W-40 semi-synthetic. TVS Apache RTR 160/200: Every 3,000 km, 10W-30 or 10W-40. Hero Splendor Plus: Every 3,000 km, 10W-30.",
          tips: [
            "City stop-and-go riding degrades oil faster — use the lower end of your interval range.",
            "After monsoon flooding, change oil immediately even if the interval hasn't come — water contamination destroys oil quality.",
          ],
        },
        {
          heading: "Mineral vs Semi-Synthetic vs Fully Synthetic Oil",
          body: "Mineral oil is adequate for basic commuter bikes like Activa, Splendor, and Shine and is the most affordable. Semi-synthetic blends mineral base with synthetic components for better heat resistance — recommended for mid-range bikes like Pulsar, Apache, and FZ-S. Fully synthetic oil is engineered for maximum performance and required for high-performance bikes like KTM, Yamaha R15, and Royal Enfield 650 Twins. It lasts longer between changes but costs more. Using a lower grade than recommended shortens engine life. Using higher grade is generally safe.",
        },
        {
          heading: "What Happens During a Fiixup Doorstep Bike Oil Change",
          body: "Our technician arrives with the pre-confirmed oil grade and a drain pan. The engine is warmed for 2–3 minutes to thin the oil. The drain bolt is removed and all old oil drains into our disposal pan. The drain bolt washer is inspected and replaced if worn. The oil filter is inspected and replaced if due. The drain bolt is refitted with correct torque. Fresh oil is poured to the correct level and verified with the dipstick or sight glass. The engine is started and checked for leaks. Old oil is stored in our disposal container — never left at your premises.",
          tips: [
            "Ask the technician to show you the oil before disposal — very dark or metallic oil indicates engine health.",
            "The drain bolt should always use a new crush washer — ask if it was done.",
          ],
        },
      ],
      conclusion: "A regular bike oil change is the cheapest insurance against expensive engine repairs. With Fiixup's doorstep oil change service, there is no excuse to delay. We come to you in 20–30 minutes, use the correct oil, and leave zero mess. Book your oil change today.",
    },
    relatedSlugs: ["bike-service-at-home", "bike-engine-repair", "bike-battery-jumpstart-near-me"],
    faqs: [
      { q: "How much does a bike oil change cost at home?", a: "Bike oil change starts from ₹249 including labour. Oil cost is extra (₹150–₹400 depending on oil type). Full pricing confirmed before work starts." },
      { q: "How often should I change my bike's engine oil?", a: "Every 2,000–3,000 km for mineral oil, or every 5,000–6,000 km for semi-synthetic or fully synthetic oil. Check your owner's manual for your model." },
      { q: "What oil grades do you carry?", a: "We carry 10W-30, 10W-40, 15W-50, and 20W-50 grades suitable for all Indian bike and scooter models. Synthetic and semi-synthetic options available." },
      { q: "Can you change oil for Royal Enfield and KTM bikes?", a: "Yes. We carry manufacturer-recommended grades for Royal Enfield (15W-50), KTM (10W-40 semi-synthetic), and all premium bike models." },
      { q: "Is oil filter replacement included?", a: "Oil filter replacement is an add-on charged separately (filter cost + ₹99 labour). Our technician inspects the filter and advises if replacement is needed." },
    ],
    metaTitle: "Bike Oil Change at Home | Doorstep Engine Oil Service — Fiixup",
    metaDescription: "Doorstep bike oil change by certified mechanics in Bengaluru & Chennai. All brands — Activa, Pulsar, Royal Enfield, KTM, Yamaha. Done in 30 min. Starting ₹249. Book now.",
    metaKeywords: "bike oil change at home, doorstep bike oil change, two wheeler oil change near me, motorcycle oil change at home, bike engine oil change near me, scooter oil change at home, bike oil service near me, two wheeler oil service Bengaluru, bike oil change cost, mobile bike oil change Chennai",
  },

  {
    "slug": "bike-engine-repair",
    "title": "Bike Engine Repair at Doorstep | All Brands",
    "shortTitle": "Bike Engine Repair",
    "category": "bike",
    "icon": "Settings",
    "tagline": "Knocking engine? Power loss? We diagnose & fix it on the spot.",
    "description": "Fiixup's mobile bike engine repair service sends a certified two-wheeler mechanic to your location to diagnose and repair engine problems for all motorcycle and scooter brands. Whether you hear a knocking sound, notice power loss, see excessive smoke, feel vibrations, or experience oil leaks — our technicians carry diagnostic tools and common engine parts to fix most issues on the spot. We service all brands: Royal Enfield, Honda, Bajaj, TVS, KTM, Yamaha, Hero, and more. For major overhauls, we arrange towing to our partner workshop. Starting from ₹599.",
    "price": "₹599",
    "duration": "1–4 hrs",
    "features": [
      "Engine noise & vibration diagnosis",
      "Piston, valve & gasket inspection",
      "Carburettor cleaning & tuning",
      "Fuel injection system service",
      "Oil leak detection & repair",
      "Overheating diagnosis & coolant service",
      "Performance tuning & power restoration"
    ],
    "pricing": {
      "rows": [
        { "label": "Engine Diagnosis (on-site)",                  "priceFrom": 299, "note": "credited toward repair" },
        { "label": "Carburettor Cleaning & Tuning",               "priceFrom": 499, "highlight": true },
        { "label": "Valve Clearance Adjustment",                  "priceFrom": 599 },
        { "label": "Oil Leak Repair (gasket/seal)",               "priceFrom": 699, "note": "parts extra" },
        { "label": "Engine Oil Flush & Refill (post-repair)",     "priceFrom": 399 },
        { "label": "Royal Enfield Engine Service",                "priceFrom": 899, "priceTo": 1999 },
        { "label": "Engine Overhaul (major — workshop referral)", "priceFrom": 2999, "note": "towing arranged" }
      ],
      "competitors": [
        { "name": "Local Roadside Mechanic", "price": "₹500–₹2,000",  "arrivalTime": "You go to them", "warranty": "None",     "doorstep": false },
        { "name": "Authorised Service Centre","price": "₹1,500–₹5,000","arrivalTime": "3–7 days",       "warranty": "3 months", "doorstep": false },
        { "name": "Fiixup",                  "price": "From ₹299",    "arrivalTime": "30–60 minutes",  "warranty": "30 days",  "doorstep": true  }
      ],
      "disclaimer": "Diagnosis fee is credited toward the repair bill. Parts cost quoted separately and approved before fitting."
    },
    "benefits": [
      { "icon": "Search",  "title": "On-Spot Diagnosis",    "body": "Our mechanics arrive with professional diagnostic tools and identify the exact engine problem — no guesswork, no unnecessary parts replacement." },
      { "icon": "Clock",   "title": "Most Fixed in 1 Visit","body": "Carburettor cleaning, valve adjustment, oil leaks, and most common engine issues are resolved in a single doorstep visit." },
      { "icon": "Shield",  "title": "30-Day Warranty",      "body": "Every engine repair comes with a 30-day warranty. If the same issue returns, we fix it at zero cost." },
      { "icon": "Wrench",  "title": "All Brands Covered",   "body": "From Honda Activa scooters to Royal Enfield Himalayan and KTM Duke 390 — our mechanics are trained across all popular Indian bike brands." }
    ],
    "bikeBrands": [
      { "name": "Honda",         "models": ["Activa 6G", "Shine 100", "CB300R", "SP125", "Hornet 2.0"] },
      { "name": "Bajaj",         "models": ["Pulsar 150", "Pulsar NS200", "Dominar 400", "Platina", "Avenger"] },
      { "name": "TVS",           "models": ["Jupiter", "Apache RTR 160", "Ntorq 125", "Raider 125"] },
      { "name": "Royal Enfield", "models": ["Classic 350", "Bullet 350", "Meteor 350", "Himalayan", "Hunter 350"] },
      { "name": "Yamaha",        "models": ["R15 V4", "FZ-S V3", "MT-15", "Fascino 125"] },
      { "name": "Hero",          "models": ["Splendor Plus", "HF Deluxe", "Glamour", "Xpulse 200"] },
      { "name": "KTM",           "models": ["Duke 200", "Duke 390", "RC 390", "Adventure 390"] },
      { "name": "Suzuki",        "models": ["Access 125", "Burgman Street", "Gixxer 250"] }
    ],
    "testimonials": [
      {
        "name": "Aravind S.",
        "location": "Whitefield, Bengaluru",
        "vehicle": "Royal Enfield Classic 350",
        "rating": 5,
        "review": "My RE was knocking badly at startup. Called Fiixup at 8am, mechanic was here by 9:15. Diagnosed a valve clearance issue and fixed it in 90 minutes. Bike runs perfectly now. Transparent about every step.",
        "date": "March 2026",
        "verified": true
      },
      {
        "name": "Nisha T.",
        "location": "T Nagar, Chennai",
        "vehicle": "Honda Activa 6G",
        "rating": 5,
        "review": "My scooter was losing power badly on uphill roads. Fiixup mechanic cleaned the carburettor at my home parking. Massive difference in performance immediately. Quick, clean, affordable.",
        "date": "April 2026",
        "verified": true
      },
      {
        "name": "Vikram R.",
        "location": "Koramangala, Bengaluru",
        "vehicle": "KTM Duke 390",
        "rating": 5,
        "review": "Oil was leaking from the engine casing. Fiixup arrived, identified a blown gasket, and sourced the part same day. Repair done at my apartment in 2.5 hours. Genuinely impressive service.",
        "date": "February 2026",
        "verified": true
      }
    ],
    "guide": {
      "title": "Complete Guide to Bike Engine Problems: Diagnosis, Causes & Repair in India",
      "intro": "Your bike's engine is the most complex and critical component of the vehicle. When it starts misbehaving — through sounds, smells, smoke, or reduced performance — understanding the cause and acting quickly can be the difference between a minor repair and a complete engine overhaul. This guide covers every major bike engine problem Indian riders face, what causes them, and how Fiixup fixes them at your doorstep.",
      "sections": [
        {
          "heading": "The 8 Most Common Bike Engine Problems in India",
          "body": "Engine knocking or tapping sounds are the most frequent complaint — typically caused by low oil level, wrong oil grade, worn piston rings, or loose valve clearance. Power loss and sluggish acceleration often point to a dirty carburettor, clogged fuel injector, dirty air filter, or worn spark plug. Excessive smoke from the exhaust can be white (coolant leak into engine), blue (oil burning), or black (fuel running rich — carburettor issue). Engine overheating is especially common in Chennai summers and Bengaluru traffic jams — caused by low coolant, a blocked radiator (liquid-cooled bikes), or a stuck thermostat. Oil leaks around the engine casing, gaskets, or drain bolt area indicate worn seals or gaskets that require replacement. Difficulty starting — especially in cold mornings — is often a carburettor issue, weak battery, or a faulty starter motor. Vibrations at idle or specific RPMs can indicate a loose engine mounting bolt, worn engine mounts, or an out-of-balance crankshaft. Fuel consumption suddenly increasing without any change in riding habits usually points to a rich-running carburettor, air leak, or incorrect ignition timing.",
          "tips": [
            "Never ignore a knocking sound — continuing to ride with engine knock causes exponential damage within kilometers.",
            "If your bike suddenly loses power and the engine cuts out, switch off ignition immediately to prevent further damage.",
            "A sudden drop in fuel efficiency of more than 15% without reason always warrants a professional diagnosis."
          ]
        },
        {
          "heading": "Carburettor vs Fuel Injection: Diagnosis & Repair Differences",
          "body": "Older Indian bikes — most models manufactured before 2017 — use carburettors to mix air and fuel. Carburettors are mechanical devices that get clogged with fuel varnish deposits over time, especially if the bike sits unused for weeks. Symptoms of a dirty carburettor include difficulty starting, rough idle, power loss at mid-throttle, black smoke, and poor fuel economy. Carburettor cleaning involves removing the unit, disassembling jets and needles, soaking in carb cleaner, and reassembling with new gaskets — a 45–90 minute job our mechanics do at your doorstep. Modern bikes from 2017 onwards use fuel injection (FI), which is self-adjusting and less prone to clogging. FI problems typically involve faulty injectors, oxygen sensors, or throttle position sensors — diagnosed with an OBD tool. Both types are fully serviceable by Fiixup's mobile mechanics.",
          "tips": [
            "If your bike sits unused for more than 3 weeks, drain the carburettor float bowl to prevent fuel varnish buildup.",
            "A rough idle that smooths out after warming up is classic carburettor behaviour — schedule a cleaning.",
            "FI bikes with fault codes can self-diagnose — a flashing engine warning light means the ECU has stored a code our mechanic can read on-site."
          ]
        },
        {
          "heading": "Oil Leaks: Finding & Fixing the Source at Your Doorstep",
          "body": "Engine oil leaks are a leading cause of engine damage if left unaddressed — as the oil level drops, engine components run dry and wear accelerates. Common leak sources in Indian bikes include the engine oil drain bolt (worn crush washer or cross-threaded bolt), the oil filter housing (cracked or incorrectly torqued), the valve cover gasket (common in Royal Enfield and older Honda bikes), the crankcase gasket (appears as oil seeping from the engine casing split line), and the oil sight glass (cracked glass on bikes like Royal Enfield that use external sight windows). Our mechanic identifies the exact source during the on-site diagnosis, carries common gasket materials and drain bolt washers, and seals most leaks in a single visit. Major casing cracks or crankshaft seal leaks requiring engine disassembly are routed to our partner workshop with towing arranged.",
          "tips": [
            "A small oil spot under your parked bike is a red flag — don't wait for the oil warning light.",
            "Wipe the engine clean and run for 5 minutes to identify the exact leak point before calling Fiixup.",
            "Never top up oil repeatedly without fixing the leak — it treats the symptom, not the cause."
          ]
        },
        {
          "heading": "Engine Overheating: Causes, Prevention & Emergency Action",
          "body": "Engine overheating is a serious condition that can cause warped cylinder heads, blown head gaskets, and seized pistons if not addressed immediately. Air-cooled engines — which include most popular Indian bikes like Honda Activa, Bajaj Pulsar, Royal Enfield, Hero Splendor, and Yamaha FZ — rely on moving air to stay cool. Extended idling in Bengaluru or Chennai traffic jams, where the bike sits stationary for 15+ minutes, can cause heat buildup beyond safe operating limits. Liquid-cooled engines (KTM, CBR series, Yamaha R15 V4) use coolant and a radiator — overheating indicates low coolant, a leaking hose, a failed water pump, or a clogged radiator. If your temperature gauge rises into the red or the engine suddenly feels laboured and sluggish, pull over immediately, switch off the engine, and do NOT open the coolant cap until the engine cools for at least 20 minutes. Call Fiixup — attempting to ride an overheating engine to a garage causes far more damage than waiting for help.",
          "tips": [
            "For air-cooled bikes stuck in long traffic jams — switch off the engine if stationary for more than 10 minutes.",
            "Low engine oil accelerates overheating in air-cooled bikes — check oil level every week if you're a city rider.",
            "Never pour cold water on a hot engine — the thermal shock can crack the cylinder head."
          ]
        },
        {
          "heading": "Valve Clearance: The Often-Ignored Engine Service Item",
          "body": "Valve clearance (also called valve lash) is the gap between the valve tip and the rocker arm or camshaft. This gap must be within manufacturer specification for the engine to breathe correctly. Too tight: the valve doesn't close completely, causing compression loss, hard starting, and overheating. Too loose: the engine makes a distinctive tapping or clattering sound, especially at idle. Valve clearance tightens over time as the valve seat and stem wear — making it a service item that requires periodic checking. Royal Enfield bikes are particularly prone to valve clearance noise and require checking every 5,000 km. Honda CB series, Bajaj Dominar 400, and all KTM models also specify valve clearance checks at fixed intervals. Our mechanics perform valve clearance adjustment at your doorstep using feeler gauges — a precise, time-sensitive job that most local garages get wrong by estimating instead of measuring.",
          "tips": [
            "A new tapping sound after an oil change is often valve clearance related — not necessarily a serious problem.",
            "Valve clearance on Royal Enfield must be set cold (engine off for at least 4 hours) for accurate readings.",
            "If your bike passed a valve clearance check but still taps, ask the mechanic to check the rocker arm wear as well."
          ]
        },
        {
          "heading": "Royal Enfield Engine Issues: The Complete Bengaluru Owner's Guide",
          "body": "Royal Enfield motorcycles are the most popular premium bikes in Bengaluru and Chennai, and they come with a specific set of known engine characteristics that owners should understand. The Classic 350, Bullet 350, and Meteor 350 are air-cooled, single-cylinder engines with a characteristic loping idle and some mechanical noise at startup — this is normal. Abnormal signs include: persistent knocking under load, oil weeping from the rocker box cover, a sudden change in exhaust note, or the engine running rough at mid-throttle. The new-generation RE engine (J-series, from 2021 Classic 350 onwards) is significantly more refined — any unusual noise or vibration on this platform should be addressed promptly as it's less characteristic of 'RE personality' and more likely an actual issue. Common RE engine repairs our mechanics handle at your doorstep: rocker box gasket replacement (very common oil leak point), valve clearance adjustment, carburettor tuning on older RE models (pre-2021), and primary chain tension adjustment on B-series engines.",
          "tips": [
            "RE owners: use only 15W-50 oil — 10W-40 causes increased oil consumption and noise on RE engines.",
            "The first service at 500 km is critical for RE bikes — never skip it, even if the bike feels fine.",
            "A sudden metallic clatter on startup that disappears after warm-up is often primary chain slack on older RE models — an inexpensive fix if done early."
          ]
        }
      ],
      "conclusion": "Bike engine problems should never be ignored or 'ridden through.' Early diagnosis and repair always costs less than delayed repairs that allow damage to compound. Fiixup's doorstep bike engine repair service in Bengaluru and Chennai brings a certified mechanic to your location with the tools and parts to diagnose and resolve most engine problems in a single visit. Call +91 8197459732 now — the earlier we diagnose, the simpler and cheaper the fix."
    },
    "relatedSlugs": ["bike-service-at-home", "bike-oil-change-at-home", "bike-electrical-repair"],
    "faqs": [
      { "q": "What are signs my bike engine needs repair?", "a": "Knocking or tapping sounds, excessive smoke from exhaust, sudden power loss, abnormal vibrations, engine overheating, or oil leaking onto the ground. Don't delay — call Fiixup." },
      { "q": "Can you repair scooter engines too?", "a": "Yes. We repair engines for all scooters — Honda Activa, TVS Jupiter, Suzuki Access, Yamaha Fascino, Bajaj Chetak, and more." },
      { "q": "My bike engine is making a knocking noise — is it serious?", "a": "Yes. Knocking usually signals low oil, worn piston rings, or loose valve clearance. Don't ride further — call our mechanic for an immediate on-site diagnosis." },
      { "q": "How long does bike engine repair take?", "a": "Minor repairs (carb cleaning, valve adjustment) take 1–2 hours on-site. Major engine work may require a follow-up or workshop visit which we arrange." },
      { "q": "Do you carry engine parts for all bike brands?", "a": "We carry common parts — gaskets, seals, spark plugs, carburettor jets — for all popular brands. For specific or rare parts, we source same-day and schedule the repair." },
      { "q": "How much does bike engine repair cost at home?", "a": "Engine diagnosis starts from ₹299 (credited toward repair). Carburettor cleaning from ₹499, valve adjustment from ₹599, oil leak repair from ₹699. All costs quoted before work starts." },
      { "q": "Can Fiixup repair Royal Enfield engine issues at home?", "a": "Yes. We handle all common Royal Enfield engine issues — rocker box gasket leaks, valve clearance adjustment, carburettor tuning, and primary chain tension — at your doorstep." }
    ],
    "metaTitle": "Bike Engine Repair at Doorstep | All Brands | Fiixup",
    "metaDescription": "Bike engine knocking, losing power or leaking oil? Certified doorstep engine repair for all brands — Royal Enfield, Bajaj, Honda, KTM, TVS. 30-day warranty. Starting ₹299. Book now.",
    "metaKeywords": "bike engine repair near me, motorcycle engine repair at home, two wheeler engine repair, doorstep bike engine repair, bike engine knocking repair, scooter engine repair near me, Royal Enfield engine repair, bike engine overhaul near me, mobile bike engine mechanic, motorcycle engine service near me, bike engine diagnosis near me, bike carburettor cleaning near me, bike valve clearance adjustment, bike oil leak repair at home"
  },

  {
    "slug": "bike-brake-clutch-repair",
    "title": "Bike Brake & Clutch Repair at Doorstep | All Brands",
    "shortTitle": "Bike Brake & Clutch",
    "category": "bike",
    "icon": "Settings",
    "tagline": "Spongy brakes or stiff clutch? Fixed safely at your doorstep.",
    "description": "Fiixup's doorstep bike brake and clutch repair service keeps your two-wheeler safe and responsive. Worn brakes are a leading cause of bike accidents in India — our certified technicians inspect, adjust, and replace brake pads, shoes, discs, and clutch cables at your home or office. We handle drum brakes, hydraulic disc brakes, and all clutch types for every popular Indian bike and scooter brand. Starting from ₹399.",
    "price": "₹399",
    "duration": "1–2 hrs",
    "features": [
      "Brake pad & shoe inspection & replacement",
      "Hydraulic disc brake bleeding & fluid top-up",
      "Drum brake adjustment & lining replacement",
      "Clutch cable adjustment & replacement",
      "Clutch plate wear inspection",
      "Brake lever & perch repair",
      "All bike & scooter brands supported"
    ],
    "pricing": {
      "rows": [
        { "label": "Brake Inspection (front + rear)",            "priceFrom": 149, "note": "credited toward repair" },
        { "label": "Brake Pad Replacement (per axle, disc)",     "priceFrom": 199, "note": "pads extra", "highlight": true },
        { "label": "Drum Brake Shoe Replacement (per wheel)",    "priceFrom": 199, "note": "shoes extra" },
        { "label": "Hydraulic Brake Bleed & Fluid Top-up",       "priceFrom": 299 },
        { "label": "Clutch Cable Replacement",                   "priceFrom": 199, "note": "cable extra" },
        { "label": "Clutch Plate Replacement",                   "priceFrom": 799, "note": "plates extra" },
        { "label": "Full Brake & Clutch Service (all 4 corners)","priceFrom": 899, "priceTo": 1499 }
      ],
      "competitors": [
        { "name": "Local Garage",         "price": "₹500–₹1,500",  "arrivalTime": "You go to them", "warranty": "None",     "doorstep": false },
        { "name": "Authorised Centre",    "price": "₹800–₹2,500",  "arrivalTime": "2–5 days",       "warranty": "3 months", "doorstep": false },
        { "name": "Fiixup",              "price": "From ₹199",     "arrivalTime": "30–60 minutes",  "warranty": "30 days",  "doorstep": true  }
      ],
      "disclaimer": "Parts (brake pads, shoes, clutch cable) charged separately at transparent rates. Quoted before fitting."
    },
    "benefits": [
      { "icon": "Shield",       "title": "Safety First",          "body": "Brakes are the most safety-critical component on any bike. Our certified mechanics never cut corners — every brake job is test-verified before we leave." },
      { "icon": "Clock",        "title": "Same-Day Fix",          "body": "Most brake and clutch repairs are completed in 1–2 hours at your location. No overnight retention, no waiting." },
      { "icon": "CheckCircle",  "title": "30-Day Warranty",       "body": "All brake pad replacements, drum adjustments, and clutch cable work are covered by our 30-day service warranty." },
      { "icon": "Award",        "title": "All Brake Types Covered","body": "From basic drum brakes on Hero Splendor to Brembo-equipped KTM bikes — our mechanics are trained on every brake system used in Indian two-wheelers." }
    ],
    "bikeBrands": [
      { "name": "Honda",         "models": ["Activa 6G", "Shine", "CB300R", "SP125", "Hornet 2.0"] },
      { "name": "Bajaj",         "models": ["Pulsar 150", "Pulsar NS200", "Dominar 400", "Platina"] },
      { "name": "TVS",           "models": ["Jupiter", "Apache RTR 160", "Ntorq 125", "Raider 125"] },
      { "name": "Royal Enfield", "models": ["Classic 350", "Bullet 350", "Meteor 350", "Himalayan", "Hunter 350"] },
      { "name": "Yamaha",        "models": ["R15 V4", "FZ-S", "MT-15", "Fascino 125"] },
      { "name": "Hero",          "models": ["Splendor Plus", "HF Deluxe", "Glamour", "Xpulse 200"] },
      { "name": "KTM",           "models": ["Duke 200", "Duke 390", "RC 390", "Adventure 390"] },
      { "name": "Suzuki",        "models": ["Access 125", "Burgman Street", "Gixxer 250"] }
    ],
    "testimonials": [
      {
        "name": "Priya M.",
        "location": "HSR Layout, Bengaluru",
        "vehicle": "TVS Apache RTR 160",
        "rating": 5,
        "review": "My front disc brake was feeling spongy and the brake lever was going almost to the handlebar. Fiixup came to my office, bled the brakes and replaced the front pads in 45 minutes. Brakes feel like new. Wouldn't trust anyone else with safety-critical work.",
        "date": "April 2026",
        "verified": true
      },
      {
        "name": "Rahul B.",
        "location": "Velachery, Chennai",
        "vehicle": "Bajaj Pulsar NS200",
        "rating": 5,
        "review": "Clutch was slipping badly — the bike wouldn't accelerate proportionally to the throttle. Fiixup mechanic arrived, diagnosed worn clutch plates, sourced them same-day and fitted at my home. Back to full performance. Professional and honest.",
        "date": "March 2026",
        "verified": true
      },
      {
        "name": "Sunita K.",
        "location": "Indiranagar, Bengaluru",
        "vehicle": "Honda Activa 6G",
        "rating": 5,
        "review": "Drum brake on my Activa was grinding terribly. Mechanic came to my apartment basement, replaced the brake shoes, adjusted the cable tension and checked tyre pressure too. All done in 30 minutes. Perfect service.",
        "date": "February 2026",
        "verified": true
      }
    ],
    "guide": {
      "title": "Bike Brake & Clutch Repair in India: The Complete Safety Guide",
      "intro": "Brakes and clutch are the two most safety-critical mechanical systems on any motorcycle or scooter. A failing brake can cause a fatal accident. A slipping clutch can leave you stranded in traffic. This guide covers how to recognise brake and clutch problems early, what each repair involves, and why getting them fixed correctly by a certified mechanic matters far more than saving a few hundred rupees at an unreliable garage.",
      "sections": [
        {
          "heading": "How to Know Your Bike Brakes Need Immediate Service",
          "body": "Squealing or grinding sounds when applying brakes are the clearest warning sign — squealing indicates worn brake pad material approaching the metal backing plate, and grinding means metal-on-metal contact is already occurring, damaging your disc rotor. A brake lever or pedal that travels too far before resistance is felt (sometimes called 'spongy' brakes on hydraulic systems) indicates air in the brake fluid or a hydraulic leak. The bike pulling to one side under braking suggests uneven brake pad wear or a seized brake calliper on one wheel. Visible brake pad thickness below 2mm through the calliper inspection window means replacement is overdue. A burning smell after riding in traffic or on a downhill stretch indicates brake drag — the calliper is not fully releasing, causing constant friction and overheating.",
          "tips": [
            "Check your bike's brake pad thickness at every oil change — it takes 10 seconds and prevents a serious accident.",
            "Never ignore grinding brake sounds — every kilometer of riding with metal-on-metal contact deepens the groove in your disc rotor, adding ₹1,500–₹3,000 to the repair cost.",
            "After any hydraulic brake work, always test brake feel at low speed before riding in traffic."
          ]
        },
        {
          "heading": "Drum Brakes vs Disc Brakes: Service Requirements Compared",
          "body": "Drum brakes are used on the rear wheel of most budget bikes — Hero Splendor, Honda Activa, Bajaj Platina, TVS Jupiter — and on both wheels of older models. They use curved brake shoes that press outward against a rotating drum. Drum brakes require adjustment as the shoes wear (the brake lever cable slack increases), eventual shoe replacement, and occasional drum reconditioning if grooved. They are less susceptible to water ingress than disc brakes. Disc brakes use hydraulic callipers that squeeze brake pads against a rotor (disc). They offer superior stopping power and are standard on mid-to-premium bikes. They require periodic pad replacement, brake fluid changes every 2 years (as fluid absorbs moisture and its boiling point drops), calliper cleaning and lubrication, and disc rotor inspection for scoring or minimum thickness compliance. Never use DOT 3 brake fluid in a system specifying DOT 4 — the difference in boiling point is significant.",
          "tips": [
            "Drum brake adjustment is a free service item that many garages charge for — our mechanics include it in any brake service visit.",
            "Brake fluid should be clear to light yellow — if it looks dark brown, it needs flushing immediately.",
            "Never mix brake fluid brands or types in the same hydraulic system."
          ]
        },
        {
          "heading": "Clutch Problems: Slipping, Sticking & Cable Issues Explained",
          "body": "The clutch on Indian bikes falls into two categories: cable-operated (manual) and hydraulic. Most popular bikes — Honda Shine, Bajaj Pulsar series, Royal Enfield, Hero Glamour — use a cable-operated multi-plate wet clutch. Clutch slipping (engine revs but bike doesn't accelerate proportionally) indicates worn clutch plates that have lost their friction material. This requires clutch plate replacement — a 1.5–2 hour job at your doorstep. Clutch dragging (bike creeps forward even with clutch lever fully pulled) indicates incorrect cable free play, warped clutch plates, or a damaged clutch basket. Cable-related issues — a seized cable, fraying near the lever, or incorrect free play — are inexpensive to fix and resolve most clutch feel complaints. Hydraulic clutches (KTM, some RE models, premium bikes) occasionally need fluid bleeding when the feel becomes spongy. Most clutch cable issues are preventable with a small drop of lubricant applied at both cable ends every 6,000 km.",
          "tips": [
            "Never ride with a slipping clutch — the friction heat accelerates wear exponentially and can weld plates together.",
            "Clutch cable free play should be 2–3mm at the lever tip — check this at every service.",
            "A new clutch cable on old bikes often requires 500 km break-in before the stretch settles — slight lever adjustment after fitting is normal."
          ]
        },
        {
          "heading": "Bike Brake Service Cost in Bengaluru & Chennai: What to Expect",
          "body": "Understanding brake service costs helps you avoid being overcharged at garages. Front disc brake pad replacement (labour only): ₹199–₹299. Brake pads themselves cost ₹150–₹500 depending on brand — Brembo, TVS Genuine, EBC, or Chinese alternatives. Always ask what brand pads are being fitted. Rear drum brake shoe replacement (labour): ₹199. Shoes cost ₹80–₹200. Hydraulic brake fluid flush and bleed: ₹299–₹499 including fluid. Clutch cable replacement (labour): ₹149–₹199. Cable cost: ₹100–₹300 depending on OEM or aftermarket. Clutch plate set replacement: ₹799–₹1,499 labour depending on bike. Plates themselves: ₹500–₹2,500 depending on brand and bike. At Fiixup, every part used is shown to you before fitting and documented on your invoice — preventing the common garage trick of charging for quality parts but fitting cheaper alternatives.",
          "tips": [
            "Always ask for the brake pad brand before fitting — genuine or Brembo pads outperform generic alternatives on safety-critical applications.",
            "A complete brake service (front + rear) every 15,000–20,000 km is cheaper than a single accident.",
            "OEM clutch plate sets last longer than cheap alternatives — the ₹300 saving often costs ₹2,000 in early replacement."
          ]
        },
        {
          "heading": "ABS Bikes: Brake Service Differences You Should Know",
          "body": "All new Indian bikes with engine capacity above 125cc are mandatorily equipped with ABS (Anti-lock Braking System) as per government regulations. ABS-equipped bikes have wheel speed sensors, an ABS pump, and a modulator — components that require special attention during brake service. Never use brake system cleaner sprays near ABS wheel speed sensors — the chemical can damage the sensor coating. When bleeding hydraulic brakes on ABS-equipped bikes, the ABS module must be activated during the bleed process to purge all air from the ABS pump — a step many local garages skip, leaving residual air in the system. Our Fiixup mechanics are trained on ABS brake service procedures for all popular ABS-equipped Indian bikes including the Bajaj Pulsar 250, TVS Apache RTR 200 4V, Royal Enfield Hunter 350, Honda CB300R, KTM Duke 200/390, and Yamaha MT-15.",
          "tips": [
            "After any ABS brake work, perform the ABS test: find an empty road, brake hard enough to trigger ABS (feel the pulsing), and confirm it releases correctly.",
            "Never disable ABS — it is a safety system that reduces stopping distance on loose surfaces by 20–40%.",
            "ABS warning light on after brake service usually means air in the ABS module — call us for a re-bleed."
          ]
        }
      ],
      "conclusion": "Bike brakes and clutch are not maintenance items to defer or cut costs on — they directly determine your ability to control the vehicle and stay safe. With Fiixup's doorstep brake and clutch repair service in Bengaluru and Chennai, a certified mechanic comes to you, uses quality parts, and tests everything before leaving. 30-day warranty on all brake work. Book your service at fiixup.in or call +91 8197459732."
    },
    "relatedSlugs": ["bike-service-at-home", "bike-suspension-tyre-service", "bike-engine-repair"],
    "faqs": [
      { "q": "How do I know if my bike brakes need replacement?", "a": "Squealing or grinding sounds, reduced stopping power, brake lever or pedal going all the way down, or visible wear on brake pads are clear signs. Get them checked immediately." },
      { "q": "Do you service hydraulic disc brakes?", "a": "Yes. We bleed hydraulic disc brakes, top up brake fluid, and replace pads for all disc brake-equipped bikes and scooters including ABS models." },
      { "q": "Can clutch issues be fixed at home?", "a": "Cable-related clutch issues are fixed on the spot in under an hour. Clutch plate replacement is also possible at your doorstep for most bike models." },
      { "q": "How much does bike brake pad replacement cost?", "a": "Brake pad replacement starts from ₹199 per axle excluding parts. The technician quotes the full cost including parts before starting work." },
      { "q": "Do you service ABS brakes?", "a": "Yes. Our mechanics are trained on ABS brake service procedures and perform the correct ABS bleed process for all ABS-equipped Indian bikes." },
      { "q": "How often should bike brakes be replaced?", "a": "Brake pads typically last 8,000–15,000 km depending on riding style and road conditions. City riders in Bengaluru and Chennai typically need replacement every 10,000 km." },
      { "q": "Can you fix brakes for Royal Enfield bikes?", "a": "Yes. We service all Royal Enfield brake systems — front disc, rear drum, and twin disc setups on the 650 Twins. Our mechanics carry RE-specific brake pads and shoes." }
    ],
    "metaTitle": "Bike Brake & Clutch Repair at Doorstep | All Brands | Fiixup",
    "metaDescription": "Bike brakes squealing or clutch slipping? Certified doorstep brake pad replacement & clutch repair for all brands. ABS bikes supported. 30-day warranty. Starting ₹199. Book now.",
    "metaKeywords": "bike brake repair near me, bike brake pad replacement at home, two wheeler brake service, clutch repair near me, bike disc brake repair, motorcycle brake service near me, bike clutch adjustment near me, doorstep brake repair, bike brake pad replacement cost, scooter brake service near me, ABS brake service bike, bike hydraulic brake repair near me, bike clutch plate replacement at home, drum brake repair near me"
  },

  {
    "slug": "bike-electrical-repair",
    "title": "Bike Electrical Repair at Doorstep | Battery, Lights & Wiring",
    "shortTitle": "Bike Electrical Repair",
    "category": "bike",
    "icon": "Zap",
    "tagline": "Battery, lights, wiring — all electrical issues fixed at your location.",
    "description": "Fiixup provides complete bike electrical repair at your doorstep — from dead batteries and faulty wiring to broken headlights, indicator problems, and starter motor failures. Our certified technicians carry multi-meters, battery testers, and electrical parts for all popular two-wheeler brands. Most electrical issues are diagnosed and fixed on the spot. Available 24/7 across Bengaluru, Chennai, Hyderabad, and Mumbai. Starting from ₹299.",
    "price": "₹299",
    "duration": "30–90 min",
    "features": [
      "Battery health test & replacement",
      "Self-start & starter motor repair",
      "Headlight, tail light & indicator repair",
      "Horn & switch repair",
      "Wiring short circuit diagnosis & repair",
      "Speedometer & instrument cluster fix",
      "Charging system (regulator/rectifier) check"
    ],
    "pricing": {
      "rows": [
        { "label": "Electrical Diagnosis (on-site)",              "priceFrom": 99,  "note": "credited toward repair" },
        { "label": "Battery Replacement (supply + fit)",          "priceFrom": 799, "highlight": true, "note": "battery cost included" },
        { "label": "Starter Motor Repair",                        "priceFrom": 499 },
        { "label": "Headlight / Indicator Bulb Replacement",      "priceFrom": 149, "note": "bulb extra" },
        { "label": "Wiring Short Circuit Diagnosis & Repair",     "priceFrom": 399 },
        { "label": "Regulator Rectifier Replacement",             "priceFrom": 599, "note": "part extra" },
        { "label": "Speedometer Cable / Sensor Repair",           "priceFrom": 299 }
      ],
      "competitors": [
        { "name": "Local Electrician",    "price": "₹300–₹1,500",  "arrivalTime": "You go to them",  "warranty": "None",     "doorstep": false },
        { "name": "Authorised Centre",    "price": "₹500–₹2,500",  "arrivalTime": "1–3 days",        "warranty": "3 months", "doorstep": false },
        { "name": "Fiixup",              "price": "From ₹99",      "arrivalTime": "30–60 minutes",   "warranty": "30 days",  "doorstep": true  }
      ],
      "disclaimer": "Diagnosis fee of ₹99 is credited against the repair bill. Parts are quoted transparently before fitting."
    },
    "benefits": [
      { "icon": "Zap",         "title": "Multimeter Diagnosis",  "body": "Our mechanics use professional digital multimeters and battery load testers — not guesswork — to pinpoint the exact electrical fault before touching a wire." },
      { "icon": "Clock",       "title": "Most Fixed in 1 Hour",  "body": "Battery replacement, fuse fixes, headlight repairs, and most wiring issues are resolved in 30–60 minutes at your location." },
      { "icon": "Shield",      "title": "30-Day Warranty",       "body": "All electrical repairs including battery replacements, wiring fixes, and component swaps carry a 30-day warranty." },
      { "icon": "Phone",       "title": "24/7 for Emergencies",  "body": "Bike won't start at midnight? We dispatch a mobile electrician to your location any time — no extra charge for night call-outs." }
    ],
    "bikeBrands": [
      { "name": "Honda",         "models": ["Activa 6G", "Shine 100", "CB300R", "SP125", "Hornet 2.0"] },
      { "name": "Bajaj",         "models": ["Pulsar 150", "Pulsar NS200", "Dominar 400", "Platina", "Avenger"] },
      { "name": "TVS",           "models": ["Jupiter", "Apache RTR 160", "Ntorq 125", "Raider 125", "iQube EV"] },
      { "name": "Royal Enfield", "models": ["Classic 350", "Bullet 350", "Meteor 350", "Himalayan", "Hunter 350"] },
      { "name": "Yamaha",        "models": ["R15 V4", "FZ-S V3", "MT-15", "Fascino 125", "Ray ZR"] },
      { "name": "Hero",          "models": ["Splendor Plus", "HF Deluxe", "Glamour", "Xpulse 200", "Xtreme 160R"] },
      { "name": "KTM",           "models": ["Duke 200", "Duke 390", "RC 390", "Adventure 390"] },
      { "name": "Suzuki",        "models": ["Access 125", "Burgman Street", "Gixxer 250"] }
    ],
    "testimonials": [
      {
        "name": "Deepak R.",
        "location": "Koramangala, Bengaluru",
        "vehicle": "Yamaha FZ-S V3",
        "rating": 5,
        "review": "My FZ-S stopped charging — battery was dying after every 2 days of riding. Fiixup mechanic tested the regulator rectifier with a multimeter, confirmed it was faulty, sourced a new one and fitted it in my building parking within 2 hours. Charging system perfect now.",
        "date": "March 2026",
        "verified": true
      },
      {
        "name": "Kavitha L.",
        "location": "Anna Nagar, Chennai",
        "vehicle": "TVS Jupiter",
        "rating": 5,
        "review": "Self-start was completely dead on my Jupiter. Called Fiixup at 7:30am. Technician arrived by 8:15, replaced the battery with the correct Exide unit, checked the wiring, and was done by 8:45. Made it to office on time. Brilliant service.",
        "date": "April 2026",
        "verified": true
      },
      {
        "name": "Arjun N.",
        "location": "Whitefield, Bengaluru",
        "vehicle": "Royal Enfield Meteor 350",
        "rating": 5,
        "review": "Indicators on my Meteor were flashing erratically — sometimes fast, sometimes not at all. Fiixup diagnosed a faulty flasher relay and a corroded earth connection. Fixed both in 40 minutes at my office basement. Very thorough diagnosis.",
        "date": "January 2026",
        "verified": true
      }
    ],
    "guide": {
      "title": "Bike Electrical Problems: Complete Diagnosis & Repair Guide for Indian Riders",
      "intro": "Electrical problems are the most frustrating bike issues — invisible, intermittent, and often misdiagnosed by mechanics who rely on guesswork rather than instruments. This guide demystifies the most common bike electrical faults in India, explains how each is properly diagnosed, and tells you exactly what parts and repair costs to expect from a professional mobile electrician.",
      "sections": [
        {
          "heading": "Why Bike Batteries Fail Faster in Indian Cities",
          "body": "Two-wheeler batteries in Bengaluru and Chennai face a perfect storm of battery-killing conditions. The primary enemy is heat — battery chemistry degrades significantly faster above 35°C ambient temperature, and both cities regularly exceed this threshold for 6–8 months of the year. Chennai's coastal salt air additionally accelerates terminal corrosion. Short trips with frequent starts are the second major factor — the battery discharges on every start and requires 15–20 minutes of continuous riding at speed for the alternator to fully recharge it. City riders who take 5–10 minute trips never fully recharge their batteries, causing chronic undercharge and progressive sulfation (crystallisation of lead sulphate on battery plates) that permanently reduces capacity. Finally, parasitic drain — a small electrical load from a poorly wired accessory like a GPS mount, phone charger, or aftermarket alarm — can drain a battery overnight. Our mechanics test for all three causes using a battery load tester and multimeter before replacing anything.",
          "tips": [
            "If your bike sits unused for more than a week, use a battery maintainer (trickle charger) to prevent deep discharge.",
            "Battery terminal corrosion (white powder) can be cleaned with baking soda solution and a toothbrush — improves charging immediately.",
            "A battery that needs jump-starting more than twice in 3 months is at end-of-life — replace it before it strands you."
          ]
        },
        {
          "heading": "Self-Start Not Working: Diagnosing the Exact Cause",
          "body": "When the self-start fails, there are four possible causes — and the correct repair depends on identifying which one. Dead battery: the starter motor is completely silent or just clicks. Test: try kick-starting (if available) — if the bike starts, battery is the issue. Weak battery: the starter motor cranks slowly and labouredly. Test: check battery voltage — below 12V indicates low charge. Faulty starter motor: battery voltage is fine but the motor doesn't engage or makes grinding sounds. Starter relay failure: you hear a single click when pressing the start button but the motor doesn't engage. The relay is a small box near the battery that acts as a switch — it's a ₹150–₹300 part. Our mechanics test all four possibilities in sequence using a multimeter and load tester before recommending a repair — saving you from replacing an expensive starter motor when the real issue is a ₹250 relay.",
          "tips": [
            "A single loud click when pressing the start button almost always means a faulty starter relay — a cheap fix.",
            "Grinding sounds from the starter motor when the engine doesn't crank usually indicate a worn starter gear — not a battery issue.",
            "If kick-start works but self-start doesn't, test battery voltage — it should read 12.4V or higher when charged."
          ]
        },
        {
          "heading": "Charging System Failure: Regulator Rectifier & Alternator Issues",
          "body": "The charging system converts the alternator's AC output into DC current to charge the battery while the engine runs. It consists of the alternator (stator coil inside the engine), the regulator rectifier (an external component, usually near the battery), and the wiring connecting them. A failing regulator rectifier is the most common charging system failure — it stops converting AC to DC, leaving the battery to discharge as the bike runs. Symptoms: battery drains even though the bike is being ridden regularly, voltmeter (if fitted) reads below 13.5V at 4,000 RPM, headlights dim at low RPM, and multiple battery replacements within a year. A faulty stator coil — the alternator winding inside the engine — produces no output at all. Testing requires AC voltage measurement at the stator connector while the engine runs — a procedure our mechanics perform on-site. Most stator and regulator rectifier repairs are completed at your doorstep.",
          "tips": [
            "If you've replaced your bike battery twice in under a year, the charging system is likely the real problem.",
            "Regulator rectifier overheating (hot to touch after a ride) is an early sign of failure — mount location and airflow affect their lifespan.",
            "Never jump start a bike with a car — the car's 12V system can deliver far too much current and damage the bike's electrical components."
          ]
        },
        {
          "heading": "Wiring Short Circuits: How to Find Them Without Burning Your Bike",
          "body": "A wiring short circuit — where insulation breaks down and current flows through an unintended path — is the most dangerous bike electrical problem. Signs include: fuses blowing repeatedly, a burning smell from the wiring, lights flickering randomly, or the bike dying suddenly while riding. Short circuits generate heat that can melt wiring, burn electrical components, and in extreme cases cause bike fires. Never ride a bike with a repeatedly blowing fuse — a fuse that blows more than once is telling you there's an active short circuit that will eventually find another path. Our mechanics trace short circuits using a multimeter in continuity and resistance mode, checking systematically through the loom from fuse box outward. Common short circuit causes include: pinched wires under the seat or tank, corroded connector blocks, chafed wire insulation where it contacts the frame, and poorly installed aftermarket accessories wired without fuses.",
          "tips": [
            "Never replace a blown fuse with a higher-rated fuse — this removes the last line of protection against electrical fires.",
            "Aftermarket accessories (phone chargers, fog lights) must be wired through their own fused circuit — never splice directly into existing wires.",
            "A bike that starts fine on a cold morning but develops electrical issues after riding for 30 minutes has a heat-related short — the wiring problem only appears when hot."
          ]
        },
        {
          "heading": "Electric Scooter (EV) Electrical Issues: What's Different",
          "body": "Electric two-wheelers — Ola S1 Pro, Ather 450X, TVS iQube, Bajaj Chetak Electric, and Hero Vida — have fundamentally different electrical architectures from petrol bikes, but they still experience common electrical issues that our mechanics can diagnose and address. Charging port issues: the charging port can develop corrosion or physical damage, preventing a secure charging connection. Indicator and light failures: the 12V accessory systems on EVs use the same bulbs, relays, and wiring conventions as petrol bikes — our mechanics handle these identically. Battery management system (BMS) faults: the high-voltage traction battery is managed by a BMS that throws fault codes when it detects anomalies — our mechanics can read these codes and advise on next steps. For high-voltage traction battery repairs, we coordinate with the EV manufacturer's service network. General wiring, connector, and 12V system repairs are done fully at your doorstep.",
          "tips": [
            "Always plug and unplug EV charging connectors straight — angled insertion damages the charging port pins over time.",
            "If your EV loses range suddenly (more than 20% in a week), the BMS has likely detected a cell imbalance — don't ignore it.",
            "EV battery performance degrades in extreme heat — park in shade wherever possible during peak Chennai summer months."
          ]
        }
      ],
      "conclusion": "Bike electrical problems are best solved by a mechanic who measures rather than guesses. Fiixup's mobile bike electricians arrive at your location in Bengaluru or Chennai with professional instruments, identify the exact fault, and fix it with proper parts — not jugaad solutions. 30-day warranty on all electrical repairs. Book at fiixup.in or call +91 8197459732."
    },
    "relatedSlugs": ["bike-battery-jumpstart-near-me", "bike-battery-replacement-at-home", "bike-service-at-home"],
    "faqs": [
      { "q": "My bike won't start — can you fix it at home?", "a": "Yes. Most no-start issues are electrical — dead battery, faulty starter motor, or a blown fuse — and are resolved at your doorstep within an hour." },
      { "q": "Do you carry batteries for all bike brands?", "a": "We carry batteries for Honda, Bajaj, TVS, Yamaha, Royal Enfield, KTM, Hero, and most popular bike models. Battery is replaced and fitted in under 30 minutes." },
      { "q": "My bike's self-start is not working but kickstart works — what's the issue?", "a": "This usually points to a weak battery, a faulty starter relay (₹150–₹300 part), or a failing starter motor. Our mechanic tests all three on the spot with a multimeter." },
      { "q": "How much does bike electrical repair cost?", "a": "Electrical diagnosis starts from ₹99 (credited toward repair). Battery replacement from ₹799, wiring repair from ₹399, starter motor repair from ₹499. All quoted before work starts." },
      { "q": "My bike battery keeps dying even though I ride daily — what's wrong?", "a": "This is a charging system issue — either a faulty regulator rectifier or a failed stator coil. Our mechanic tests alternator output and charging voltage on-site to pinpoint the cause." },
      { "q": "Can you repair electric scooter electrical issues?", "a": "Yes. We handle 12V system repairs, indicator/light issues, charging port problems, and fault code reading on all popular EVs including Ola S1, Ather 450X, and TVS iQube." },
      { "q": "Is bike electrical repair available at night?", "a": "Yes. Our 24/7 bike electrical service is available including nights and weekends with no extra call-out charge." }
    ],
    "metaTitle": "Bike Electrical Repair at Doorstep | Battery, Lights & Wiring | Fiixup",
    "metaDescription": "Bike battery dead, lights not working or wiring short? Certified doorstep bike electrical repair — starter motor, regulator rectifier, indicators & more. 24/7. Starting ₹99. Book now.",
    "metaKeywords": "bike electrical repair near me, bike battery replacement at home, two wheeler electrical repair, bike self start not working, bike headlight repair near me, motorcycle electrical repair near me, bike wiring repair, bike battery dead repair near me, doorstep bike electrical service, bike battery jumpstart near me, bike regulator rectifier repair, bike starter motor repair near me, bike electrical fault diagnosis, scooter electrical repair near me"
  },

  {
    "slug": "bike-suspension-tyre-service",
    "title": "Bike Suspension & Tyre Service at Doorstep | All Brands",
    "shortTitle": "Suspension & Tyres",
    "category": "bike",
    "icon": "Settings",
    "tagline": "Rough ride or wobbly wheels? Fixed at your location.",
    "description": "Fiixup provides doorstep bike suspension inspection, fork oil change, shock absorber replacement, and tyre service for all motorcycle and scooter models. If you feel excessive bouncing, hear clunking over bumps, or notice your bike pulling to one side, our mobile mechanic comes to you with tools and parts to restore ride quality. Tyre replacement and tubeless repair also available. Starting from ₹399.",
    "price": "₹399",
    "duration": "1–3 hrs",
    "features": [
      "Front fork inspection & oil change",
      "Rear shock absorber inspection & replacement",
      "Tyre inspection, rotation & pressure check",
      "Tubeless tyre puncture repair",
      "Tyre replacement (all brands available)",
      "Wheel balancing",
      "Pothole & road damage assessment"
    ],
    "pricing": {
      "rows": [
        { "label": "Suspension Inspection (front + rear)",        "priceFrom": 199, "note": "credited toward repair" },
        { "label": "Front Fork Oil Change",                       "priceFrom": 499, "note": "fork oil extra", "highlight": true },
        { "label": "Rear Shock Absorber Replacement (per unit)",  "priceFrom": 599, "note": "shock extra" },
        { "label": "Tubeless Tyre Puncture Repair",               "priceFrom": 99 },
        { "label": "Tyre Replacement (supply + fit, per tyre)",   "priceFrom": 699, "note": "tyre brand-dependent" },
        { "label": "Wheel Balancing (per wheel)",                 "priceFrom": 99 },
        { "label": "Full Suspension Service (fork + rear + tyres)","priceFrom": 1299, "priceTo": 2499 }
      ],
      "competitors": [
        { "name": "Tyre Shop",          "price": "₹300–₹1,000",  "arrivalTime": "You go to them", "warranty": "None",     "doorstep": false },
        { "name": "Authorised Centre",  "price": "₹800–₹3,000",  "arrivalTime": "2–5 days",       "warranty": "3 months", "doorstep": false },
        { "name": "Fiixup",            "price": "From ₹99",      "arrivalTime": "30–60 minutes",  "warranty": "30 days",  "doorstep": true  }
      ],
      "disclaimer": "Tyre and suspension part costs quoted separately. All pricing confirmed before work starts."
    },
    "benefits": [
      { "icon": "Shield",      "title": "Ride Safety Restored",   "body": "Worn suspension and incorrect tyre pressure are leading causes of loss of control on Indian roads. We restore both to manufacturer specification." },
      { "icon": "Clock",       "title": "At Your Doorstep",       "body": "Fork oil change, shock replacement, and tyre fitting — all done at your home or office without lifting the bike onto a workshop stand." },
      { "icon": "Award",       "title": "All Tyre Brands",        "body": "We supply and fit MRF, CEAT, Apollo, Michelin, Pirelli, and Metzeler tyres for all popular Indian bikes and scooters." },
      { "icon": "CheckCircle", "title": "Pothole Damage Check",   "body": "After any pothole impact, our mechanic inspects wheel rims, tyre sidewalls, and fork alignment — damage that's invisible but affects handling." }
    ],
    "bikeBrands": [
      { "name": "Honda",         "models": ["Activa 6G", "Shine", "CB300R", "Hornet 2.0", "SP125"] },
      { "name": "Bajaj",         "models": ["Pulsar 150", "Pulsar NS200", "Dominar 400", "Avenger"] },
      { "name": "TVS",           "models": ["Jupiter", "Apache RTR 160/200", "Ntorq 125", "Raider 125"] },
      { "name": "Royal Enfield", "models": ["Classic 350", "Bullet 350", "Meteor 350", "Himalayan", "Hunter 350"] },
      { "name": "Yamaha",        "models": ["R15 V4", "FZ-S V3", "MT-15", "Fascino 125"] },
      { "name": "Hero",          "models": ["Splendor Plus", "Glamour", "Xpulse 200", "Xtreme 160R"] },
      { "name": "KTM",           "models": ["Duke 200", "Duke 390", "Adventure 390"] },
      { "name": "Suzuki",        "models": ["Access 125", "Burgman Street", "Gixxer 250"] }
    ],
    "testimonials": [
      {
        "name": "Sanjay M.",
        "location": "Marathahalli, Bengaluru",
        "vehicle": "KTM Duke 390",
        "rating": 5,
        "review": "My Duke's front forks were leaking oil and the ride was bottoming out on every speed breaker. Fiixup changed the fork oil and seals at my apartment in 2.5 hours. Ride quality transformed completely. Worth every rupee.",
        "date": "March 2026",
        "verified": true
      },
      {
        "name": "Meena P.",
        "location": "Adyar, Chennai",
        "vehicle": "TVS Jupiter",
        "rating": 5,
        "review": "Rear shock on my Jupiter was completely dead — every bump was going straight through to my spine. New shock fitted at home in 45 minutes. Fiixup even showed me the comparison between the old and new shock. Great transparency.",
        "date": "April 2026",
        "verified": true
      },
      {
        "name": "Rajan K.",
        "location": "BTM Layout, Bengaluru",
        "vehicle": "Royal Enfield Himalayan",
        "rating": 5,
        "review": "Needed a full suspension check after riding through a badly flooded road. Fiixup inspected fork alignment, both shocks, and all four tyre conditions. Gave me a honest report — only the rear tyre needed replacement. No unnecessary upselling.",
        "date": "February 2026",
        "verified": true
      }
    ],
    "guide": {
      "title": "Bike Suspension & Tyre Guide for Indian Riders: Bengaluru & Chennai Conditions",
      "intro": "India's roads are among the most demanding in the world for bike suspension and tyres. Bengaluru's notorious potholes and Chennai's monsoon flooding create conditions that would challenge even purpose-built off-road machines. This guide explains how suspension and tyres work, how to recognise when service is needed, and what specific challenges Bengaluru and Chennai riders face.",
      "sections": [
        {
          "heading": "How Bike Suspension Works and Why It Degrades",
          "body": "A motorcycle's suspension system serves two purposes: keeping the tyre in contact with the road surface for maximum traction, and isolating the rider from road impacts for comfort and control. The front suspension uses telescopic forks — two oil-filled tubes that compress and extend as the wheel hits bumps. Inside, fork oil provides damping (controls the speed of compression and rebound). Over time, fork oil breaks down, becomes contaminated with metal particles from the fork internals, and loses its viscosity — making forks feel harsh or springy rather than controlled. Fork seals (the rubber rings that prevent oil from leaking past the tubes) wear out and begin to seep oil down the fork legs — a visible sign of needed service. The rear suspension uses a coil spring shock absorber (or twin shocks on some bikes) with oil or nitrogen-based damping. Shock absorber oil breaks down similarly to fork oil, resulting in a 'dead' feel where the bike bounces rather than dampens. Royal Enfield Himalayan, KTM Adventure 390, and BMW G 310 GS — popular adventure bikes in Bengaluru's riding community — have more sophisticated multi-adjustable suspension that requires specific settings for on-road and off-road use.",
          "tips": [
            "Front fork oil should be changed every 10,000–15,000 km or whenever you notice oil on the fork legs.",
            "If your bike's front dives excessively under braking, fork oil viscosity has degraded — change it before it affects braking safety.",
            "Never ignore a leaking fork seal — oil on the front disc brake rotor reduces braking effectiveness dangerously."
          ]
        },
        {
          "heading": "Tyre Selection for Bengaluru & Chennai Roads: What Works Best",
          "body": "Bengaluru and Chennai roads demand different things from tyres. Bengaluru's primary challenge is the mix of smooth express corridors and pothole-riddled locality roads — a tyre with good sidewall stiffness resists damage from sharp pothole edges better than ultra-soft compound sport tyres. Chennai's challenge is the monsoon season — wet grip performance during October–December is crucial. For city commuting on standard bikes (Honda Activa, Bajaj Pulsar 150, Hero Splendor), MRF Zapper and CEAT SecuraDrive offer the best value-to-performance ratio. For premium bikes (Royal Enfield, TVS Apache RTR 200, Bajaj Dominar), CEAT Gripp X3 or Apollo Actigrip Excel provide better cornering stability. For performance bikes (KTM Duke, Yamaha R15 V4, Bajaj Pulsar NS200), Michelin Pilot Street 2 or Metzeler Sportec Street offer superior wet and dry grip. Tyre pressure is the single most important tyre maintenance item — incorrect pressure is responsible for accelerated wear, poor handling, and increased puncture risk. Check pressure cold (before riding) every 2 weeks.",
          "tips": [
            "Tubeless tyres allow you to continue riding slowly after a puncture — tube tyres deflate instantly and cause loss of control.",
            "After fitting new tyres, avoid aggressive cornering for the first 100 km — new tyres have a mould release agent that reduces initial grip.",
            "Tyre load index rating must match or exceed your bike's specifications — never fit a lower load rating tyre even if it's the same size."
          ]
        },
        {
          "heading": "Pothole Damage: What to Inspect After a Hard Impact",
          "body": "Bengaluru's roads — particularly in areas like Whitefield, Hebbal, and Sarjapur Road — are notorious for deep, irregular potholes that cause serious suspension and tyre damage. After hitting a significant pothole (the type that causes a loud bang or causes the handlebar to jolt), inspect the following within 24 hours. Tyre sidewall for a bulge (bubble) — a bulge means the internal carcass cords are broken and the tyre must be replaced immediately, as a bulge can burst without warning. Wheel rim for dents or cracks — even a small crack in an alloy rim causes slow air loss. Front fork alignment — hit the front brake hard while stationary and rock the bike forward; if the forks feel rough or binding, alignment is off. Handlebar alignment — a pothole can torque the front wheel off-centre without the rider noticing. Front and rear shock absorber for oil leakage after impact. Our mechanics perform a complete post-impact inspection if you're unsure — it takes 20 minutes and can prevent a dangerous failure.",
          "tips": [
            "A tyre sidewall bulge is not repairable — it is a structural failure that requires immediate tyre replacement.",
            "Bent wheel rims can often be trued (straightened) if caught early — a severely bent rim must be replaced.",
            "After a pothole impact, if the bike pulls to one side even when riding straight, front alignment is compromised."
          ]
        },
        {
          "heading": "Tyre Wear Patterns and What They Mean",
          "body": "Your tyre's wear pattern tells you a lot about your bike's setup and riding habits. Centre tread wear (the tyre wears fastest in the middle strip): caused by chronic over-inflation. The tyre bulges in the centre, reducing contact patch and grip in corners. Edge wear (tread wears fastest at the shoulders): caused by chronic under-inflation, allowing the tyre sidewalls to flex excessively. Also indicates aggressive cornering. Cupping or scalloping (uneven patches of wear alternating around the tyre): almost always caused by worn or poorly-damped suspension — the tyre bounces rather than rolling smoothly. One-sided wear (more wear on one side): indicates wheel misalignment or a riding habit of favouring one side in corners. Premature centre wear on the rear tyre: common in bikes with high-torque engines like Royal Enfield and KTM — consider a harder compound tyre or more frequent rotation.",
          "tips": [
            "Tyre depth should be above the tread wear indicator markers (small raised bars in the tread grooves) — below these, the tyre is legally and safely at end-of-life.",
            "A tyre with one-sided wear cannot be rotated to equalise it — the structural bias makes one side permanently weaker.",
            "Rear tyre wear is always faster than front on most bikes — expect to replace the rear tyre twice as often as the front."
          ]
        }
      ],
      "conclusion": "Suspension and tyre health directly determine how your bike handles, brakes, and feels in every riding condition. In cities like Bengaluru and Chennai where roads vary from smooth highways to cratered local streets, keeping your suspension serviced and tyres in good condition is essential for safety. Fiixup's doorstep suspension and tyre service brings professional-grade equipment to your location. Book at fiixup.in or call +91 8197459732."
    },
    "relatedSlugs": ["bike-brake-clutch-repair", "bike-service-at-home", "bike-puncture-repair-near-me"],
    "faqs": [
      { "q": "How do I know if my bike suspension needs repair?", "a": "Signs include excessive bouncing, clunking sounds over bumps, oil leaking from forks, uneven tyre wear, or the bike feeling unstable at speed." },
      { "q": "Can you replace bike tyres at my doorstep?", "a": "Yes. We carry tyre-changing equipment and stock tyres for popular bike and scooter models. We fit and balance at your location." },
      { "q": "How often should front fork oil be changed?", "a": "Every 10,000–15,000 km or if you notice oil leaking from the forks, or the front suspension feels harsh, spongy, or uncontrolled." },
      { "q": "My bike bounces a lot after hitting bumps — is the suspension worn?", "a": "Yes. Excessive rebound (the bike bouncing multiple times after a bump rather than settling quickly) means the shock absorber oil has degraded. Our mechanic tests this on-site." },
      { "q": "Which tyre brands do you supply?", "a": "MRF, CEAT, Apollo, Michelin, Pirelli, and Metzeler. We recommend the right brand and compound for your specific bike and riding conditions." },
      { "q": "Can you service Royal Enfield Himalayan suspension?", "a": "Yes. We service all RE Himalayan suspension components including the preload-adjustable rear shock and the front telescopic forks." },
      { "q": "My bike is pulling to one side — is it a suspension or alignment issue?", "a": "Both can cause this. Our mechanic checks tyre pressure balance, wheel alignment, fork alignment, and uneven tyre wear to identify the exact cause." }
    ],
    "metaTitle": "Bike Suspension & Tyre Service at Doorstep | All Brands | Fiixup",
    "metaDescription": "Rough ride or wobbly bike? Doorstep suspension service — fork oil change, shock replacement & tyre fitting. MRF, CEAT, Michelin available. 30-day warranty. Starting ₹99. Book now.",
    "metaKeywords": "bike suspension repair near me, motorcycle suspension service at home, bike shock absorber replacement, bike tyre replacement near me, doorstep bike tyre service, two wheeler suspension repair, bike fork oil change at home, motorcycle tyre fitting near me, bike tyre change at home, scooter suspension repair near me, bike fork seal replacement near me, bike tyre pressure service, motorcycle wheel alignment near me, bike suspension service cost"
  },

  {
    "slug": "bike-chain-sprocket-service",
    "title": "Bike Chain & Sprocket Service at Doorstep | All Brands",
    "shortTitle": "Chain & Sprocket",
    "category": "bike",
    "icon": "Settings",
    "tagline": "Loose, rusted, or stretched chain? Replaced in minutes at your location.",
    "description": "A worn or poorly lubricated chain is one of the most common causes of power loss, jerky acceleration, and dangerous riding. Fiixup's doorstep bike chain and sprocket service covers cleaning, lubrication, tension adjustment, and complete chain-sprocket kit replacement for all motorcycle and scooter brands. Starting from ₹199.",
    "price": "₹199",
    "duration": "30–60 min",
    "features": [
      "Chain cleaning & degreasing",
      "Chain lubrication with quality chain lube",
      "Chain tension adjustment",
      "Chain wear measurement & advice",
      "Full chain & sprocket kit replacement",
      "Sprocket bolt torque check",
      "All bike & scooter brands covered"
    ],
    "pricing": {
      "rows": [
        { "label": "Chain Cleaning & Lubrication",               "priceFrom": 199, "highlight": true },
        { "label": "Chain Tension Adjustment",                    "priceFrom": 149 },
        { "label": "Chain Replacement (labour only)",             "priceFrom": 299, "note": "chain extra" },
        { "label": "Full Chain & Sprocket Kit (supply + fit)",    "priceFrom": 999, "priceTo": 1999, "note": "kit brand-dependent" },
        { "label": "Front Sprocket Replacement (supply + fit)",   "priceFrom": 499 },
        { "label": "Rear Sprocket Replacement (supply + fit)",    "priceFrom": 699 },
        { "label": "Chain Guard Refit / Replacement",             "priceFrom": 199 }
      ],
      "competitors": [
        { "name": "Local Garage",       "price": "₹500–₹1,500",  "arrivalTime": "You go to them", "warranty": "None",     "doorstep": false },
        { "name": "Authorised Centre",  "price": "₹800–₹2,500",  "arrivalTime": "1–3 days",       "warranty": "3 months", "doorstep": false },
        { "name": "Fiixup",            "price": "From ₹199",     "arrivalTime": "30–60 minutes",  "warranty": "30 days",  "doorstep": true  }
      ],
      "disclaimer": "Chain and sprocket parts quoted separately based on your bike model. Final cost confirmed before fitting."
    },
    "benefits": [
      { "icon": "Zap",         "title": "Power Restored",         "body": "A clean, properly tensioned chain eliminates power loss at the rear wheel — you'll feel the improvement immediately after the first ride." },
      { "icon": "Shield",      "title": "Prevents Chain Snap",    "body": "A severely stretched or rusted chain can snap at speed — a dangerous failure. Regular service prevents this risk entirely." },
      { "icon": "Clock",       "title": "30-Minute Service",      "body": "Chain cleaning and lubrication is completed in 20–30 minutes at your doorstep. Full chain replacement takes 45–60 minutes." },
      { "icon": "Award",       "title": "Sprocket Life Extended", "body": "Proper chain tension and lubrication extends sprocket life by 40–60%. Replacing chain alone on worn sprockets wastes money." }
    ],
    "bikeBrands": [
      { "name": "Honda",         "models": ["Activa 6G", "Shine 100", "CB300R", "Hornet 2.0", "SP125"] },
      { "name": "Bajaj",         "models": ["Pulsar 150", "Pulsar NS200", "Dominar 400", "Platina", "Avenger"] },
      { "name": "TVS",           "models": ["Jupiter", "Apache RTR 160", "Ntorq 125", "Raider 125"] },
      { "name": "Royal Enfield", "models": ["Classic 350", "Bullet 350", "Meteor 350", "Himalayan", "Hunter 350"] },
      { "name": "Yamaha",        "models": ["R15 V4", "FZ-S V3", "MT-15", "Fascino 125"] },
      { "name": "Hero",          "models": ["Splendor Plus", "HF Deluxe", "Glamour", "Xpulse 200"] },
      { "name": "KTM",           "models": ["Duke 200", "Duke 390", "RC 390", "Adventure 390"] },
      { "name": "Suzuki",        "models": ["Access 125", "Burgman Street", "Gixxer 250"] }
    ],
    "testimonials": [
      {
        "name": "Abhinav S.",
        "location": "Electronic City, Bengaluru",
        "vehicle": "Bajaj Dominar 400",
        "rating": 5,
        "review": "Chain was slapping loudly on the swingarm and the bike was jerking at low speed. Fiixup mechanic measured the chain stretch with a proper gauge, confirmed it needed replacement, and fitted a new DID chain and sprocket set at my office parking in an hour. Transformed the riding experience.",
        "date": "March 2026",
        "verified": true
      },
      {
        "name": "Geetha R.",
        "location": "Velachery, Chennai",
        "vehicle": "Honda Shine SP125",
        "rating": 5,
        "review": "Chain was rusted solid from monsoon riding — completely neglected for 8 months. Fiixup cleaned and lubricated it, adjusted the tension, and showed me the correct slack to maintain. Quick, professional, and explained everything clearly.",
        "date": "April 2026",
        "verified": true
      }
    ],
    "guide": {
      "title": "Bike Chain & Sprocket Maintenance: The Complete Indian Rider's Guide",
      "intro": "The chain and sprocket are the final link in your bike's power delivery — converting engine rotation into rear wheel movement. They are also the most neglected maintenance items by Indian riders. This guide covers how to properly maintain your chain, how to identify when replacement is needed, and why getting chain work done correctly extends the life of both chain and sprockets significantly.",
      "sections": [
        {
          "heading": "How Often to Lubricate Your Bike Chain in Indian Conditions",
          "body": "The standard recommendation of lubricating every 500–700 km in dry conditions needs significant adjustment for Indian riding conditions. Bengaluru's monsoon season (June–September) and Chennai's North-East monsoon (October–December) mean bikes ride through standing water regularly — water washes chain lubricant off within 30–50 km of wet riding. During monsoon months, chain lubrication should happen every 200–300 km. In dusty conditions — common near construction zones in Whitefield, Electronic City, and Hebbal — dust sticks to chain lube and forms a grinding paste. O-ring and X-ring chains (used on Royal Enfield, KTM, Yamaha R15, and most premium bikes) have internal lubrication that extends service intervals, but the external rollers and side plates still require regular external lubrication. Always clean the chain before lubricating — applying fresh lube over dirty, gritty chain just traps the grit between the rollers.",
          "tips": [
            "Apply chain lube to the inner face of the chain (the side facing the sprocket) while slowly rotating the rear wheel — this gets lubricant into the rollers where it's needed.",
            "After applying lube, let it penetrate for 5 minutes before wiping off excess — excess lube on the outer chain flings onto the rear tyre and reduces grip.",
            "Aerosol chain lubes are convenient but thin — use a proper chain wax for longer-lasting protection between services."
          ]
        },
        {
          "heading": "How to Measure Chain Stretch and Know When to Replace",
          "body": "Chains stretch with use — the roller pins and side plates wear, increasing the distance between links. This stretching causes the chain to ride higher up the sprocket teeth rather than seating in the valley, accelerating sprocket wear dramatically. Measuring chain stretch requires a ruler or a dedicated chain wear indicator tool. For most 420, 428, and 520 pitch chains used on Indian bikes: measure 20 links along the chain with a ruler — a new chain should measure exactly 254mm (10 inches) per 20 links. A stretch of 2mm (256mm total) indicates the chain needs replacement. Professional mechanics use a dedicated chain wear gauge that slots into the rollers and reads a percentage of wear directly. At Fiixup, our mechanics always measure before recommending replacement — unlike many garages that replace on visual inspection alone. Always replace chain and both sprockets as a set — fitting a new chain on worn sprockets causes the new chain to wear at 2–3x normal rate.",
          "tips": [
            "A chain that you can pull away from the rear sprocket by more than half a tooth thickness is worn out.",
            "Never fit a new chain on worn sprockets — the mismatched pitch causes the new chain to skip and wear rapidly.",
            "Heavily rusted chains cannot be fully restored by lubrication — replacement is the only safe option."
          ]
        },
        {
          "heading": "Chain Tension: The Exact Setting for Every Popular Indian Bike",
          "body": "Incorrect chain tension causes premature wear, power loss, and in extreme cases, chain derailment. Too tight: the chain is under excessive stress, loading the gearbox output shaft bearing, and can snap. You'll feel resistance when rotating the rear wheel by hand. Too loose: the chain slaps the swingarm, creates a jerky throttle response, and can derail at high speed. Correct tension allows 20–25mm (approximately 2–2.5cm) of vertical chain movement at the mid-point between the two sprockets, measured from the bottom run of the chain. Specific settings: Honda Activa: 25–35mm slack. Bajaj Pulsar 150/160: 20–30mm. Royal Enfield 350: 25–35mm. KTM Duke 200/390: 15–25mm. Yamaha FZ-S/R15: 15–20mm. Always check tension at the tightest point of the chain's rotation — rotate the rear wheel and find the point where the chain is tightest, then measure tension there.",
          "tips": [
            "Check chain tension with the bike on a centre stand or paddock stand, with no rider weight on the bike.",
            "After adjusting chain tension, always retorque the rear axle nut to specification — a loose axle nut is a catastrophic safety failure.",
            "Chain tension changes as the suspension compresses — adjust with the swingarm in the position it occupies under normal riding load."
          ]
        }
      ],
      "conclusion": "A properly maintained chain and sprocket set is one of the cheapest performance upgrades available to any bike rider — it reduces power loss, improves acceleration, and prevents dangerous failures. Fiixup's doorstep chain service in Bengaluru and Chennai takes 20–60 minutes at your location. Book at fiixup.in or call +91 8197459732."
    },
    "relatedSlugs": ["bike-service-at-home", "bike-suspension-tyre-service", "bike-brake-clutch-repair"],
    "faqs": [
      { "q": "How do I know if my bike chain needs replacement?", "a": "A stretched chain sags more than 2–3 cm at mid-point, skips gears, makes a slapping sound on the swingarm, or shows rusting and tight links. Our mechanic measures stretch precisely with a chain gauge." },
      { "q": "How much does bike chain replacement cost?", "a": "Chain cleaning and lubrication starts from ₹199. Full chain and sprocket kit replacement starts from ₹999 including quality parts, depending on the bike model and kit brand." },
      { "q": "How often should I lubricate my bike chain?", "a": "Every 500–700 km in dry conditions. Every 200–300 km during monsoon season or after riding through rain or standing water." },
      { "q": "Do I need to replace sprockets with the chain?", "a": "Yes, always. Fitting a new chain on worn sprockets causes the new chain to wear out 2–3x faster. We always replace chain, front sprocket, and rear sprocket as a matched set." },
      { "q": "Can you fit a chain kit for Royal Enfield at my doorstep?", "a": "Yes. We carry chain and sprocket kits for all Royal Enfield models including Classic 350, Meteor 350, Himalayan, and Hunter 350." },
      { "q": "What type of chain lube do you use?", "a": "We use quality chain wax or O-ring-compatible spray lube depending on your chain type. Never petroleum-based products that degrade O-ring seals." }
    ],
    "metaTitle": "Bike Chain & Sprocket Service at Doorstep | All Brands | Fiixup",
    "metaDescription": "Loose, rusted or stretched bike chain? Doorstep chain cleaning, tensioning & sprocket kit replacement. All brands. Done in 30 min. Starting ₹199. Book now.",
    "metaKeywords": "bike chain replacement near me, motorcycle chain service at home, bike chain lubrication near me, two wheeler chain sprocket replacement, bike chain adjustment near me, doorstep bike chain service, bike chain kit replacement near me, motorcycle chain repair near me, scooter chain service near me, bike chain cost, bike chain stretch measurement, chain and sprocket kit near me, bike chain tension adjustment at home"
  },

  {
    "slug": "bike-regular-maintenance-plan",
    "title": "Scheduled Bike Maintenance Plan | Doorstep Service Bengaluru & Chennai",
    "shortTitle": "Bike Maintenance Plan",
    "category": "bike",
    "icon": "Shield",
    "tagline": "Keep your bike in peak condition with a scheduled doorstep maintenance plan.",
    "description": "Fiixup's scheduled bike maintenance plan delivers regular two-wheeler servicing to your home or office on a timetable that suits you — monthly, quarterly, or kilometre-based. Regular maintenance prevents breakdowns, improves fuel efficiency by up to 15%, and extends your bike's lifespan significantly. Our technicians track your complete service history, WhatsApp service reminders, and bring the correct oil and parts for your specific bike every time. Starting from ₹449 per visit.",
    "price": "₹449",
    "duration": "1–2 hrs",
    "features": [
      "Full bike health check & written report",
      "Engine oil & filter change",
      "Air filter service",
      "Chain, tyre & brake service",
      "Service history tracking & digital records",
      "WhatsApp reminders before next service",
      "Monthly, quarterly & km-based plans available"
    ],
    "pricing": {
      "rows": [
        { "label": "Quarterly Maintenance Visit (per visit)",    "priceFrom": 449, "note": "oil & parts extra" },
        { "label": "Monthly Quick Health Check",                 "priceFrom": 299 },
        { "label": "Annual Maintenance Plan (4 full services)", "priceFrom": 1499, "priceTo": 1999, "highlight": true },
        { "label": "Bi-monthly Deep Service Plan",              "priceFrom": 799, "note": "oil included" },
        { "label": "Km-based Plan (every 3,000 km)",            "priceFrom": 549, "note": "triggered by mileage" },
        { "label": "Premium Bike Plan (RE, KTM, Yamaha R15)",   "priceFrom": 799, "priceTo": 1299 }
      ],
      "competitors": [
        { "name": "DIY Maintenance",    "price": "Time + guesswork", "arrivalTime": "Your schedule",  "warranty": "None",     "doorstep": false },
        { "name": "Authorised AMC",     "price": "₹3,000–₹8,000/yr","arrivalTime": "You go to them", "warranty": "Covered",  "doorstep": false },
        { "name": "Fiixup Annual Plan", "price": "From ₹1,499/yr",  "arrivalTime": "At your door",   "warranty": "30 days",  "doorstep": true  }
      ],
      "disclaimer": "Plan prices cover labour. Oil and filter costs are separate and transparent. No lock-in contracts."
    },
    "benefits": [
      { "icon": "Shield",  "title": "Prevents Breakdowns",     "body": "Proactive maintenance catches problems — weak battery, worn brake pads, stretched chain — before they become roadside emergencies." },
      { "icon": "Zap",     "title": "15% Better Fuel Economy", "body": "Properly serviced bikes consistently return 10–15% better fuel efficiency. Over a year of daily commuting, this pays for your maintenance plan." },
      { "icon": "Clock",   "title": "Zero Effort for You",     "body": "We track your service schedule, send you WhatsApp reminders when service is due, and come to your location at a time you choose." },
      { "icon": "Award",   "title": "Complete Service History", "body": "Every visit is digitally recorded — oil grade used, parts replaced, next service due. Your bike's complete health record at your fingertips." }
    ],
    "bikeBrands": [
      { "name": "Honda",         "models": ["Activa 6G", "Shine 100", "CB300R", "Hornet 2.0", "SP125"] },
      { "name": "Bajaj",         "models": ["Pulsar 150", "Pulsar NS200", "Dominar 400", "Platina", "Avenger"] },
      { "name": "TVS",           "models": ["Jupiter", "Apache RTR 160", "Ntorq 125", "Raider 125", "iQube"] },
      { "name": "Royal Enfield", "models": ["Classic 350", "Bullet 350", "Meteor 350", "Himalayan", "Hunter 350"] },
      { "name": "Yamaha",        "models": ["R15 V4", "FZ-S V3", "MT-15", "Fascino 125", "Ray ZR"] },
      { "name": "Hero",          "models": ["Splendor Plus", "HF Deluxe", "Glamour", "Xpulse 200"] },
      { "name": "KTM",           "models": ["Duke 200", "Duke 390", "RC 390", "Adventure 390"] },
      { "name": "Suzuki",        "models": ["Access 125", "Burgman Street", "Gixxer 250"] }
    ],
    "testimonials": [
      {
        "name": "Kiran M.",
        "location": "HSR Layout, Bengaluru",
        "vehicle": "Yamaha FZ-S V3",
        "rating": 5,
        "review": "Signed up for Fiixup's quarterly plan 8 months ago. Three visits so far and not a single breakdown or surprise issue. They caught a worn brake pad and a chain that needed tensioning in the second visit — would never have noticed those myself. Worth every rupee.",
        "date": "April 2026",
        "verified": true
      },
      {
        "name": "Divya T.",
        "location": "Perambur, Chennai",
        "vehicle": "Honda Activa 6G",
        "rating": 5,
        "review": "The WhatsApp reminder system is genius — I always used to forget when service was due. Now Fiixup reminds me, I just confirm the slot, and the mechanic shows up at my apartment. My Activa runs perfectly. Fuel economy also noticeably better.",
        "date": "March 2026",
        "verified": true
      },
      {
        "name": "Rajiv P.",
        "location": "Indiranagar, Bengaluru",
        "vehicle": "Royal Enfield Classic 350",
        "rating": 5,
        "review": "I do 60 km daily on my Classic 350 for work. Fiixup's km-based maintenance plan is perfect for heavy riders like me. They come every 3,000 km like clockwork, use genuine RE 15W-50 oil, and give me a full written report. My RE has 45,000 km on it and runs like new.",
        "date": "February 2026",
        "verified": true
      }
    ],
    "guide": {
      "title": "Why Scheduled Bike Maintenance Saves You Money & Keeps You Safe: A Complete Guide",
      "intro": "The average Indian bike rider services their two-wheeler only when something goes wrong — a breakdown, a noise, or a warning light. This reactive approach costs significantly more over the bike's lifetime compared to a proactive maintenance schedule. This guide explains exactly how a scheduled maintenance plan works, what gets checked at each visit, and how much money and stress it saves over a year of city riding in Bengaluru or Chennai.",
      "sections": [
        {
          "heading": "The Real Cost of Reactive vs Proactive Bike Maintenance",
          "body": "The numbers tell a clear story. A stretched chain caught at 25,000 km costs ₹999–₹1,999 for a chain and sprocket kit replacement. The same chain, ignored until it snaps at 30,000 km, damages the rear sprocket beyond recovery and can damage the engine casing — total repair cost: ₹4,000–₹8,000. A brake pad replaced at ₹399 when worn to 2mm thickness prevents a ₹1,500–₹3,000 disc rotor replacement that becomes necessary when the pad backing plate digs into the rotor. An oil change at ₹549 performed on schedule prevents the kind of accelerated engine wear that leads to piston ring replacement at ₹5,000–₹15,000. A battery health check that identifies a weakening battery at ₹149 saves the ₹8,000–₹15,000 cost of a tow truck and emergency repair during a breakdown. Proactive maintenance doesn't just prevent expensive repairs — it also prevents the hidden costs of lost workdays, towing fees, and emergency mechanic call-outs at inconvenient hours.",
          "tips": [
            "Calculate your actual total bike cost of ownership including emergency repairs, towing, and lost time — it's almost always higher than maintenance costs.",
            "A bike that's serviced on schedule retains significantly higher resale value — documented service history adds ₹5,000–₹15,000 to a used bike's market value.",
            "Insurance claims often exclude damage caused by poor maintenance — a seized engine from oil neglect may not be covered."
          ]
        },
        {
          "heading": "What Gets Checked at Every Fiixup Maintenance Visit",
          "body": "A Fiixup scheduled maintenance visit is not just an oil change. Our technicians run through a 25-point health checklist at every visit. Engine: oil level and condition, coolant level (liquid-cooled bikes), fuel filter condition (carb bikes), air filter cleanliness, idle speed and throttle response. Drivetrain: chain condition, tension and lubrication, sprocket tooth condition, clutch cable free play and condition. Brakes: pad/shoe thickness front and rear, disc rotor condition, drum brake adjustment, brake fluid colour and level (hydraulic brakes), brake light function. Electrical: battery voltage, horn, headlight and tail light function, indicator function, engine kill switch operation. Tyres: pressure (both wheels), tread depth, sidewall condition, valve cap presence. Chassis: all visible nut and bolt tightness, handlebar alignment, mirror adjustment, footpeg and kickstand condition. A written report covering all 25 points is provided after every visit — with a clear pass, advisory, or action-required status for each item.",
          "tips": [
            "Keep every Fiixup service report — this is your bike's medical history and its single most important document at resale.",
            "An 'advisory' on a service report means the item is not yet critical but will need attention within the next service — budget for it in advance.",
            "Share the report with your family — especially if others ride your bike — so everyone knows the bike's current condition."
          ]
        },
        {
          "heading": "Maintenance Plan Options: Which One Is Right for You?",
          "body": "Choosing the right maintenance plan depends on how much you ride, what type of bike you own, and your personal schedule. Quarterly plan (every 3 months): ideal for moderate city commuters riding 20–40 km per day. Covers the oil change interval for most commuter bikes and catches most developing issues before they become problems. Monthly quick check: designed for heavy riders (delivery professionals, daily commuters doing 50+ km) who need more frequent monitoring. The mechanic checks oil level, tyre pressure, chain tension, and brake function — a 20-minute fast visit. Km-based plan (triggered at 3,000 km or 5,000 km milestones): the most scientific approach. The mechanic is called when your odometer hits the next service milestone. Best for Royal Enfield, KTM, and premium bike owners who follow manufacturer specifications precisely. Annual plan (4 full services per year): our most popular option for standard commuter bikes. Combines the quarterly visit schedule with a discounted bundle price and guaranteed same-day availability.",
          "tips": [
            "If you ride more than 40 km per day in city conditions, upgrade to a monthly or km-based plan — quarterly intervals will be too long.",
            "Premium bikes like Royal Enfield, KTM, and Yamaha R15 have shorter recommended service intervals — their maintenance plans should reflect this.",
            "During monsoon months, consider adding a mid-quarter chain service visit — monsoon riding degrades chain lubrication 3–5x faster than dry conditions."
          ]
        },
        {
          "heading": "Maintenance Tips for High-Mileage Bengaluru & Chennai Commuters",
          "body": "City commuters in Bengaluru and Chennai are among the most demanding riders for their bikes — frequent stop-and-go traffic, heat, and poor road conditions combine to accelerate wear on every component. For riders doing 1,000–1,500 km per month in city conditions: oil changes every 2,500 km (not the standard 3,000 km), chain lubrication every 300–400 km, brake pad checks every 5,000 km (not 10,000 km), battery terminal checks every 3 months to address corrosion in Chennai's humidity. For delivery riders doing 2,000+ km per month: oil changes every 2,000 km, chain lubrication every 200 km, tyre inspection weekly (delivery bikes carry extra weight and run tyres harder), brake pads monthly. Fiixup's km-based maintenance plan is specifically designed for high-mileage riders and adjusts visit frequency automatically based on your actual odometer readings.",
          "tips": [
            "A delivery bike running 2,000 km per month will wear out a chain in 8,000–10,000 km — budget for chain replacement twice a year.",
            "High-mileage bikes benefit from switching to synthetic engine oil — it lasts longer between changes and protects better at operating temperature.",
            "Tyres on delivery bikes should be checked for nail punctures weekly — the loading and route patterns increase puncture frequency significantly."
          ]
        }
      ],
      "conclusion": "A scheduled doorstep maintenance plan with Fiixup is the smartest investment a bike rider in Bengaluru or Chennai can make. Zero trips to a garage. Zero forgotten service dates. Zero surprise breakdowns. Just a certified mechanic at your door, on schedule, keeping your bike in peak condition all year round. Start your plan today at fiixup.in or call +91 8197459732."
    },
    "relatedSlugs": ["bike-service-at-home", "bike-oil-change-at-home", "bike-chain-sprocket-service"],
    "faqs": [
      { "q": "Can I set up a recurring bike maintenance schedule?", "a": "Yes. We offer monthly, quarterly, and kilometre-based maintenance plans. We track your bike's history and send WhatsApp reminders when service is due — you just confirm the slot." },
      { "q": "Does regular maintenance improve fuel efficiency?", "a": "Yes. A well-maintained bike typically delivers 10–15% better fuel efficiency due to proper oil viscosity, clean air filter, correct tyre pressure, and a clean chain." },
      { "q": "Can I pause or cancel my maintenance plan?", "a": "Yes. No lock-in contracts. You can pause, reschedule, or cancel any visit with 24 hours' notice. No penalties, no questions asked." },
      { "q": "What is included in a maintenance plan visit?", "a": "Every visit includes a 25-point health check, oil and filter change, air filter service, chain service, brake inspection, tyre pressure check, battery test, and a written digital service report." },
      { "q": "How much does the annual bike maintenance plan cost?", "a": "The annual plan (4 full services) starts from ₹1,499 covering labour for all 4 visits. Oil, filter, and parts are charged separately at transparent rates." },
      { "q": "Do you maintain Royal Enfield bikes on a plan?", "a": "Yes. We have specific plans for Royal Enfield owners using the manufacturer-recommended 15W-50 oil and RE-specific service intervals. Our RE-trained mechanics handle all RE models." },
      { "q": "Is a maintenance plan available for electric scooters?", "a": "Yes. EV maintenance plans focus on 12V battery check, brake service, tyre maintenance, charging port inspection, and firmware update check — the key EV-specific items." }
    ],
    "metaTitle": "Scheduled Bike Maintenance Plan | Doorstep Service Bengaluru & Chennai | Fiixup",
    "metaDescription": "Never miss a bike service again. Doorstep scheduled maintenance plans — quarterly, monthly & km-based. WhatsApp reminders. All brands. Prevent breakdowns. Starting ₹449. Book now.",
    "metaKeywords": "bike maintenance plan near me, scheduled bike service at home, two wheeler maintenance package, motorcycle maintenance plan, doorstep bike maintenance, bike service subscription, regular bike servicing near me, bike upkeep service near me, preventive bike maintenance, two wheeler annual maintenance contract, bike AMC near me, annual bike service plan, doorstep bike service plan, bike maintenance reminder service"
  },


  // ══ CAR SERVICES ═══════════════════════════════════════════════════════════

  {
    slug: "car-service-at-home",
    title: "Car Service at Home | Doorstep Car Servicing",
    shortTitle: "Car General Service",
    category: "car",
    icon: "Car",
    tagline: "Complete car servicing at your home or office — skip the garage queue.",
    description:
      "Fiixup's doorstep car service brings certified mechanics to your home, office, or parking lot for complete four-wheeler servicing. We handle all makes and models — Maruti Suzuki, Hyundai, Tata, Honda, Toyota, Kia, MG, Mahindra, Volkswagen, Skoda, Renault, and more. Our mobile car service van carries all oils, filters, and common parts to complete a full periodic service on the spot. Starting from ₹999.",
    price: "₹999",
    duration: "1–3 hrs",
    features: [
      "Engine oil drain & refill (correct grade for your car)",
      "Oil, air & cabin air filter replacement",
      "All fluid levels checked & topped up",
      "Brake system inspection (front & rear)",
      "Tyre pressure & tread depth check",
      "Battery health test",
      "Full vehicle health report provided",
    ],
    pricing: {
      rows: [
        { label: "Car Basic Service (labour only)",     priceFrom: 999,  note: "oil & parts extra" },
        { label: "Car Full Service with Engine Oil",    priceFrom: 1999, priceTo: 2999, highlight: true },
        { label: "Car Full Service — SUV (Creta, Seltos, Nexon)", priceFrom: 2499, priceTo: 3999 },
        { label: "Car Full Service — Premium (Fortuner, Hector)", priceFrom: 3499, priceTo: 5999 },
        { label: "Oil Filter Replacement",             priceFrom: 249, note: "filter cost extra" },
        { label: "Air Filter Replacement",             priceFrom: 299, note: "filter cost extra" },
        { label: "Cabin Air Filter Replacement",       priceFrom: 249, note: "filter cost extra" },
      ] as PricingRow[],
      competitors: [
        { name: "Local Garage",      price: "₹1,500–₹3,000",  arrivalTime: "Next day",     warranty: "None",     doorstep: false },
        { name: "Authorised Centre", price: "₹3,000–₹8,000",  arrivalTime: "3–5 days wait",warranty: "3 months", doorstep: false },
        { name: "Fiixup",            price: "From ₹999",       arrivalTime: "30–60 minutes",warranty: "30 days",  doorstep: true  },
      ],
      disclaimer: "Prices include labour. Oil and filter costs are quoted separately based on your car model.",
    },
    benefits: [
      { icon: "Clock",  title: "Saves Half a Day",    body: "No travel, no queue, no waiting. Pick a slot and the mechanic comes to you in under an hour." },
      { icon: "Shield", title: "30-Day Warranty",     body: "All car service work is backed by a 30-day warranty. Covered issue recurs? We fix it free." },
      { icon: "Award",  title: "Certified Mechanics", body: "Every Fiixup car mechanic is trained, certified, and background-verified before joining." },
      { icon: "Tag",    title: "Upfront Pricing",     body: "Full itemised cost — labour and parts — quoted and approved by you before work starts." },
    ],
    carBrands: CAR_BRANDS_RICH,
    testimonials: [
      { name: "Vikram S.",   location: "Whitefield, Bengaluru", vehicle: "Hyundai Creta 2021", rating: 5, review: "Booked a full service for my Creta. The mechanic arrived on time with all the right oil and filters. Did everything in 2 hours in my apartment parking. Transparent and professional.", date: "March 2026", verified: true },
      { name: "Anitha R.",   location: "Adyar, Chennai",        vehicle: "Maruti Baleno",      rating: 5, review: "Much cheaper than the Maruti service centre and done right at home. Saved me 4 hours and ₹1,500. Will never go back to a garage for routine service.", date: "April 2026", verified: true },
    ],
    guide: {
      title: "Complete Guide to Doorstep Car Service in Bengaluru & Chennai",
      intro: "A car service should be straightforward — not a half-day ordeal involving traffic, garage queues, and uncertainty about what was done. This guide covers everything about doorstep car servicing: what's included, service intervals for every popular car, how to read a service record, and why Fiixup's mobile car service is the smarter choice for Bengaluru and Chennai drivers.",
      sections: [
        {
          heading: "What Is Included in a Full Car Service?",
          body: "A complete doorstep car service includes engine oil drain and refill with manufacturer-recommended grade, oil filter replacement, air filter inspection and replacement if needed, cabin air filter inspection and replacement if needed, all fluid levels checked and topped up (coolant, brake fluid, power steering, washer), brake system inspection on all four wheels, tyre pressure checked and set to specification, battery health test, visual inspection of belts and hoses, and a full vehicle health report provided digitally. Spark plug inspection and replacement, timing belt checks, and AC service are available as add-ons.",
          tips: [
            "Keep your car's service booklet or request a digital service record after every visit.",
            "Ask the mechanic to explain any advisory items found — a good mechanic will show you rather than just tell you.",
            "Do not ignore an advisory for brake pad thickness — brakes are a safety item, not a 'wait and see' one.",
          ],
        },
        {
          heading: "Car Service Intervals: Every Popular Indian Car",
          body: "Maruti Suzuki Swift/Baleno/Dzire: Every 10,000 km or 12 months, 5W-30 or 5W-40. Hyundai i20/Creta/Venue: Every 10,000 km or 12 months, 5W-30 or 5W-40. Tata Nexon/Punch/Harrier: Every 7,500 km or 6 months (petrol), 5W-30. Tata Nexon EV: Reduced mechanical service — every 12 months, focus on brakes and tyres. Honda City/Amaze: Every 10,000 km or 12 months, 0W-20 or 5W-20 (check owner manual). Toyota Innova Crysta: Every 5,000 km or 6 months (diesel), 15W-40 or 10W-40. Kia Seltos/Sonet: Every 10,000 km or 12 months, 5W-30. MG Hector: Every 10,000 km or 12 months, 5W-30. Mahindra Thar/Scorpio-N: Every 7,500 km or 6 months, 15W-40 (diesel). Volkswagen/Skoda (TSI engine): Every 15,000 km or 12 months, 5W-40 longlife.",
          tips: [
            "Diesel cars need more frequent oil changes than petrol — their combustion generates more soot.",
            "In Bengaluru and Chennai traffic where engines idle frequently, use the lower end of the interval range.",
          ],
        },
        {
          heading: "Engine Oil Grades for Every Popular Indian Car",
          body: "Using the correct engine oil grade is not optional — it is critical for engine longevity and warranty compliance. Most modern petrol cars in India use 5W-30 or 5W-40. Older petrol engines (pre-2015) often use 10W-40 or 15W-40. Diesel cars commonly use 15W-40 or 10W-40. European cars (Volkswagen, Skoda, Audi) use longlife spec 5W-40 or 0W-40. EV and hybrid vehicles have reduced oil requirements but still need coolant and brake fluid service. At Fiixup, our technicians verify the correct oil grade for your specific car and year before filling — never guess.",
        },
        {
          heading: "Doorstep Car Service vs Garage: A Real Comparison for Indian Drivers",
          body: "In Bengaluru, a typical garage service visit costs you 3–5 hours: 45–60 minutes travel each way, 30–60 minutes waiting, and often overnight retention. In Chennai, authorised service centres charge ₹3,000–₹8,000 for a full service with waiting periods of 3–7 days. Fiixup's doorstep service completes most car services in 1.5–3 hours at your location, for ₹999–₹3,999 depending on model. You save travel time, travel cost, and your car is back to you the same session. All work is done in front of you — full transparency that no garage offers as standard.",
        },
        {
          heading: "Car Service Checklist: What to Verify After Every Service",
          body: "After your car service, verify these items before the technician leaves. Engine oil level correct on dipstick — not over-filled, not under-filled. Oil cap secured. All fluid caps secured — coolant, brake fluid, washer. No oil or fluid drops visible under the car. Engine starts cleanly with no new warning lights. Tyre pressures matching the door sticker specification. A service report or invoice in your hand listing every item serviced and every part used. If any item is missing from this list, ask before the technician packs up.",
          tips: [
            "Take a photo of the dipstick level and odometer at every service — creates your own reliable service record.",
            "A new engine oil smell for the first 100 km after an oil change is normal. Blue smoke after an oil change is not — call us.",
          ],
        },
      ],
      conclusion: "Doorstep car service with Fiixup removes every inconvenience of traditional garage servicing while matching or exceeding the quality. Transparent pricing, genuine parts, a 30-day warranty, and a service done at your location in under 3 hours. Book your car service today at fiixup.in or call +91 8197459732.",
    },
    relatedSlugs: ["car-oil-change-at-home", "car-brake-service", "car-engine-diagnostics"],
    faqs: [
      { q: "How much does a doorstep car service cost?", a: "Basic car service starts from ₹999. Full comprehensive service ranges from ₹1,999–₹4,999 depending on make, model, and age. Full pricing is given before work starts." },
      { q: "Which car brands do you service at home?", a: "All popular brands — Maruti, Hyundai, Tata, Honda, Toyota, Kia, MG, Mahindra, Volkswagen, Skoda, Renault, Nissan, and more." },
      { q: "Do you use genuine parts?", a: "Yes. We use OEM-grade or high-quality aftermarket parts. Genuine brand parts can be sourced on request." },
      { q: "Is there a warranty on the service?", a: "Yes. All car servicing comes with a 30-day warranty. If any covered issue recurs within 30 days, we fix it free of charge." },
      { q: "Can I book same-day doorstep car service?", a: "Yes. Same-day slots are available in Bengaluru, Chennai, Hyderabad, and Mumbai. Book on the website or call your city helpline." },
      { q: "How long does a full car service take at home?", a: "Most full car services take 1.5–3 hours at your location depending on the car model and work scope." },
      { q: "Do you service diesel and petrol cars?", a: "Yes. We service all petrol, diesel, CNG, hybrid, and electric vehicles. Oil grades and service items are confirmed for your specific fuel type and model." },
    ],
    metaTitle: "Car Service at Home | Doorstep Car Servicing — Fiixup",
    metaDescription: "Complete car servicing at your home or office. Certified mechanics for Maruti, Hyundai, Tata, Toyota & all brands. 30-day warranty. Starting ₹999. Book now.",
    metaKeywords: "car service at home, doorstep car service, car servicing near me, mobile car service, car mechanic at home, doorstep car servicing, car service near me, home car service, car repair at home, mobile car mechanic near me, car general service at home, doorstep car repair",
  },
  
  {
    "slug": "car-oil-change-at-home",
    "title": "Car Oil Change at Home | Doorstep Engine Oil Service",
    "shortTitle": "Car Oil Change",
    "category": "car",
    "icon": "Droplets",
    "tagline": "Fresh engine oil in 45 minutes — we come to your home or office.",
    "description": "Fiixup's doorstep car oil change service sends a certified mechanic to your location with the manufacturer-recommended engine oil grade for your car model. We carry 5W-30, 5W-40, 10W-40, and 15W-40 grades for all Indian car models, drain the old oil, replace the oil filter, and top up all related fluids in under an hour. Starting from ₹599.",
    "price": "₹599",
    "duration": "45–60 min",
    "features": [
      "Engine oil drain & refill (manufacturer-recommended grade)",
      "Oil filter replacement",
      "Engine oil level verification after fill",
      "Coolant & brake fluid level check",
      "Synthetic, semi-synthetic & mineral oil options",
      "Waste oil disposal — zero mess left behind",
      "Next service reminder sticker fitted"
    ],
    "pricing": {
      "rows": [
        { "label": "Car Oil Change (labour only)",                    "priceFrom": 599, "note": "oil & filter extra" },
        { "label": "Car Oil Change + Mineral Oil (5W-30 / 5W-40)",   "priceFrom": 999,  "priceTo": 1299, "highlight": true },
        { "label": "Car Oil Change + Semi-Synthetic Oil",             "priceFrom": 1299, "priceTo": 1799 },
        { "label": "Car Oil Change + Fully Synthetic Oil",            "priceFrom": 1699, "priceTo": 2499 },
        { "label": "SUV Oil Change (Creta, Seltos, Nexon, Harrier)",  "priceFrom": 1499, "priceTo": 2999 },
        { "label": "Diesel Car Oil Change (15W-40)",                  "priceFrom": 1199, "priceTo": 1999 },
        { "label": "Oil Filter Replacement (standalone)",             "priceFrom": 249,  "note": "filter cost extra" }
      ],
      "competitors": [
        { "name": "Local Garage",        "price": "₹800–₹2,000",  "arrivalTime": "You go to them",  "warranty": "None",     "doorstep": false },
        { "name": "Authorised Centre",   "price": "₹1,500–₹4,000","arrivalTime": "3–5 days wait",   "warranty": "3 months", "doorstep": false },
        { "name": "Fiixup",             "price": "From ₹599",     "arrivalTime": "45–60 minutes",   "warranty": "30 days",  "doorstep": true  }
      ],
      "disclaimer": "Oil and filter costs are quoted separately based on your car model and manufacturer specification. Final price confirmed before work starts."
    },
    "benefits": [
      { "icon": "Clock",        "title": "Done in 45 Minutes",    "body": "Our mechanic arrives with the correct oil grade pre-selected for your car. The full oil change — drain, filter, refill, verification — is completed in under an hour at your location." },
      { "icon": "Shield",       "title": "Engine Life Extended",  "body": "Regular oil changes are the single most impactful maintenance item for extending engine life. Fresh oil reduces friction, cleans combustion deposits, and prevents accelerated wear." },
      { "icon": "Award",        "title": "Correct Grade Always",  "body": "We cross-reference your car's make, model, year, and fuel type to confirm the exact oil grade before filling — never a generic substitute." },
      { "icon": "CheckCircle",  "title": "Zero Mess Guaranteed",  "body": "We use spill-free drain pans, drip mats, and sealed waste oil bags. Your parking floor is left exactly as we found it." }
    ],
    "carBrands": [
      { "name": "Maruti Suzuki", "models": ["Swift", "Baleno", "Dzire", "Ertiga", "Brezza", "Alto K10"] },
      { "name": "Hyundai",       "models": ["i20", "Creta", "Venue", "Verna", "Alcazar"] },
      { "name": "Tata",          "models": ["Nexon", "Punch", "Harrier", "Safari", "Tiago", "Nexon EV"] },
      { "name": "Honda",         "models": ["City", "Amaze", "WR-V", "Jazz", "Elevate"] },
      { "name": "Toyota",        "models": ["Innova Crysta", "Fortuner", "Glanza", "Urban Cruiser Hyryder"] },
      { "name": "Kia",           "models": ["Seltos", "Sonet", "Carens"] },
      { "name": "MG",            "models": ["Hector", "ZS EV", "Astor", "Gloster"] },
      { "name": "Mahindra",      "models": ["Scorpio-N", "XUV700", "Thar", "Bolero", "XUV400"] },
      { "name": "Volkswagen",    "models": ["Polo", "Virtus", "Taigun"] },
      { "name": "Skoda",         "models": ["Slavia", "Kushaq", "Octavia"] },
      { "name": "Renault",       "models": ["Kwid", "Triber", "Kiger"] },
      { "name": "Nissan",        "models": ["Magnite", "Kicks"] }
    ],
    "testimonials": [
      {
        "name": "Priya S.",
        "location": "Koramangala, Bengaluru",
        "vehicle": "Hyundai Creta 2022 (Petrol)",
        "rating": 5,
        "review": "Booked at 9am, mechanic arrived by 9:40 with the correct 5W-30 fully synthetic oil for my Creta. Changed oil and filter in my apartment basement, showed me the oil level on the dipstick before leaving. Zero mess. Saved me a 3-hour garage trip.",
        "date": "March 2026",
        "verified": true
      },
      {
        "name": "Suresh M.",
        "location": "Adyar, Chennai",
        "vehicle": "Maruti Suzuki Baleno (Diesel)",
        "rating": 5,
        "review": "Third time using Fiixup for oil change. Always on time, always the right oil grade. The mechanic checks the old oil before draining and shows me — great transparency. Will never go to a garage for oil change again.",
        "date": "April 2026",
        "verified": true
      },
      {
        "name": "Anand K.",
        "location": "Whitefield, Bengaluru",
        "vehicle": "Toyota Innova Crysta (Diesel)",
        "rating": 5,
        "review": "Innova diesel needs 15W-40 and the mechanic came prepared with the exact spec. Changed 6 litres, replaced the filter, checked coolant and brake fluid too. All done in 50 minutes in my office parking. Excellent service.",
        "date": "February 2026",
        "verified": true
      }
    ],
    "guide": {
      "title": "Complete Guide to Car Engine Oil Changes in India: Grade, Interval & Cost",
      "intro": "Engine oil is the lifeblood of your car's engine. It lubricates hundreds of moving metal surfaces simultaneously, removes heat from areas the cooling system cannot reach, suspends combustion byproducts, and prevents corrosion. When it degrades — through heat exposure, oxidation, and contamination — none of these functions work properly. This guide covers everything Indian car owners need to know about oil changes: the right grade for your car, how often to change, what synthetic vs mineral oil actually means, and why doorstep oil change makes sense for city drivers.",
      "sections": [
        {
          "heading": "Engine Oil Grades for Every Popular Indian Car",
          "body": "Maruti Suzuki Swift / Baleno / Dzire / Ertiga (Petrol): 5W-30 (1.2L, 1.5L K-series engines). Maruti Alto K10 / S-Presso: 5W-30 mineral. Hyundai i20 / Venue / Grand i10 (Petrol): 5W-30 or 5W-40. Hyundai Creta (Petrol 1.5L / 1.4L Turbo): 5W-30 or 0W-20 (turbo). Tata Nexon (Petrol): 0W-20 (manufacturer recommendation, do not substitute). Tata Punch / Tiago (Petrol): 5W-30. Honda City / Amaze (Petrol): 0W-20 or 5W-20 — check owner manual as Honda specifies thinner grades. Toyota Innova Crysta (Diesel): 15W-40. Toyota Fortuner (Diesel): 10W-40. Kia Seltos / Sonet (Petrol 1.5L): 5W-30 or 5W-40. Mahindra Scorpio-N / Thar (Diesel mHawk): 15W-40. Volkswagen / Skoda (TSI engines): 5W-40 longlife specification — do not use standard mineral oil. Renault Kwid (Petrol): 5W-40. All diesel cars not listed: 15W-40 is the standard unless otherwise specified in the owner manual.",
          "tips": [
            "Never use thicker oil than specified — a 15W-40 in an engine specifying 0W-20 increases internal friction and fuel consumption measurably.",
            "Do not use the same oil grade for petrol and diesel engines — their combustion chemistry and contamination profiles are different.",
            "When in doubt, the owner manual oil specification always overrides any garage recommendation."
          ]
        },
        {
          "heading": "Mineral vs Semi-Synthetic vs Fully Synthetic Oil: Which Is Right for Your Car?",
          "body": "Mineral oil is refined from crude petroleum with conventional additives. It is adequate for older, simpler engines and budget cars, but degrades faster with heat and requires more frequent changes (every 5,000 km). It is the least expensive option per litre. Semi-synthetic oil blends mineral base with synthetic components — typically 20–30% synthetic content. It offers better heat resistance, slightly longer change intervals (up to 7,500 km), and improved cold-start protection compared to mineral oil. It suits most mid-range Indian petrol cars. Fully synthetic oil is engineered at a molecular level for maximum performance, heat stability, and longevity. It handles extreme temperatures better, flows freely in cold starts (important during Bengaluru's cooler nights), and can extend change intervals to 10,000–15,000 km depending on the specification. It is required for turbocharged engines (Hyundai Creta Turbo, Kia Seltos Turbo, Volkswagen Taigun TSI, Skoda Kushaq) and strongly recommended for premium cars. Using mineral oil in a turbo engine causes rapid turbocharger bearing wear — the turbo spins at 150,000–200,000 RPM and requires the best available lubrication.",
          "tips": [
            "Turbo engines require fully synthetic oil — the turbocharger runs at temperatures and speeds that mineral oil cannot handle safely.",
            "Longlife synthetic oil (VW 507.00, BMW Longlife-04 spec) must be used in European cars specifying these standards — generic synthetic will not suffice.",
            "If you switch from mineral to synthetic oil, run one shorter interval change (3,000 km) to clean out accumulated deposits before switching to the full synthetic interval."
          ]
        },
        {
          "heading": "Car Oil Change Intervals: When Exactly Should You Change Oil?",
          "body": "The traditional 3-month or 5,000 km rule originated from mineral oil in older engines. Modern cars with synthetic oil can safely go 8,000–15,000 km between changes. However, Indian city driving conditions — especially in Bengaluru and Chennai — are significantly more demanding than the highway cycles used to set manufacturer intervals. Heavy stop-and-go traffic keeps engines at partial load and partial operating temperature for extended periods. Short trips of under 10 km prevent the engine from reaching full operating temperature, causing moisture and fuel vapour to remain in the oil rather than burning off. The oil degrades faster per kilometre in city conditions than on highways. Practical recommendation for Indian city drivers: Mineral oil — every 5,000 km or 6 months. Semi-synthetic — every 7,500 km or 6 months. Fully synthetic — every 10,000 km or 12 months. For vehicles used primarily for short city trips (under 10 km one-way), reduce these intervals by 20–25%.",
          "tips": [
            "The oil life monitor on newer cars (Kia, Hyundai, MG) considers actual driving conditions — trust it over simple mileage calculations.",
            "After any engine overheating incident, change the oil immediately regardless of mileage — heat-stressed oil has degraded additives.",
            "If your car has been sitting unused for 6+ months, change the oil before driving regularly again — stationary oil loses its additive package over time."
          ]
        },
        {
          "heading": "How to Check Your Car's Engine Oil Level at Home",
          "body": "Checking engine oil level between service visits takes 2 minutes and can prevent serious engine damage from running low. Park the car on a level surface and switch off the engine. Wait 5 minutes for oil to drain back to the sump. Open the bonnet and locate the oil dipstick — usually a bright yellow or orange ring handle. Pull the dipstick out fully and wipe it clean with a cloth. Reinsert it fully, then pull it out again. The oil film on the dipstick should sit between the MIN and MAX marks. If the level is at or below MIN, add the correct oil grade in small increments (100–200ml at a time) and recheck. Also note the oil colour: new oil is golden-amber. Slightly used oil becomes darker brown. Very dark, almost black oil is normal for diesel engines and is not necessarily a sign of problems — diesel combustion produces more soot. If the oil looks milky or has a frothy texture, this indicates coolant mixing with oil — stop driving immediately and call Fiixup.",
          "tips": [
            "Check oil level every 1,000–1,500 km between service visits — especially on high-mileage cars or sporty driving.",
            "Never overfill engine oil past the MAX mark — excess oil foams under high RPM and loses lubrication effectiveness.",
            "Milky oil is a serious emergency — it means a failed head gasket allowing coolant into the engine. Do not drive."
          ]
        },
        {
          "heading": "Why Doorstep Car Oil Change Is Smarter Than a Garage Visit in 2025",
          "body": "The traditional garage oil change experience in Indian cities involves planning the visit around traffic, waiting in queue behind other cars, sitting in an unfamiliar environment for 1–2 hours with no visibility into what's being done, and hoping that the oil grade and filter type used match what was specified and charged. Doorstep car oil change at home eliminates every single friction point. The mechanic comes to your home or office at a scheduled time. Work is done in your parking, in front of you. The oil container is shown to you before pouring — you can verify the grade and brand. The oil filter is shown both before fitting and after removal. The dipstick level is verified in front of you after filling. A digital invoice is sent to your phone listing every item used with its exact specification. You save 2–3 hours of your day, the fuel cost of driving to a garage, and the anxiety of leaving your car unattended.",
          "tips": [
            "Always photograph the oil container and filter box before the mechanic starts — creates a permanent record of what was used.",
            "Ask the mechanic to show you the used oil on a white cloth before disposal — colour and texture tell you a lot about engine condition.",
            "A quality oil change includes tightening the drain bolt to specification with a torque wrench — ask if this is done."
          ]
        }
      ],
      "conclusion": "Regular engine oil changes are the cheapest and most effective way to protect your car's engine from premature wear. With Fiixup's doorstep car oil change service in Bengaluru and Chennai, there is no excuse to delay — the mechanic comes to you in 45–60 minutes with the correct oil for your car, and leaves zero mess behind. Book at fiixup.in or call +91 8197459732."
    },
    "relatedSlugs": ["car-service-at-home", "car-brake-service", "car-engine-diagnostics"],
    "faqs": [
      { "q": "How often should I change my car oil?", "a": "Every 5,000–7,500 km for mineral oil, or every 8,000–10,000 km for synthetic oil. Always follow your car manufacturer's recommendation — our mechanic confirms this for your exact model." },
      { "q": "Which oil grade is right for my car?", "a": "Most modern Indian petrol cars use 5W-30 or 5W-40. Diesel cars typically use 15W-40. Turbo engines require fully synthetic 5W-40 or 0W-20. Our technician confirms the correct grade for your exact car before filling." },
      { "q": "How much does a doorstep car oil change cost?", "a": "Starting from ₹599 including labour. Oil and filter are charged separately based on your car model and oil type. Full pricing confirmed before work starts." },
      { "q": "Can you do car oil change in apartment basement parking?", "a": "Yes. We carry spill-free drain pans, drip mats, and sealed waste oil containers. Zero residue left in your parking space." },
      { "q": "What oil brands do you use?", "a": "We use Castrol, Mobil, Shell, and Motul — all top-tier oil brands. The specific brand and grade is confirmed for your car before filling and shown to you before pouring." },
      { "q": "Is oil filter replacement included?", "a": "Oil filter replacement is strongly recommended with every oil change and is quoted separately based on your car model. Our technician shows you the old and new filter." },
      { "q": "Can you change synthetic oil for turbo cars like Hyundai Creta Turbo or Kia Seltos?", "a": "Yes. We carry the correct fully synthetic oil for all turbocharged engines — Creta 1.4T, Seltos 1.4T, Taigun TSI, and all others. Turbo engines require fully synthetic oil and we never substitute." }
    ],
    "metaTitle": "Car Oil Change at Home | Doorstep Engine Oil Service — Fiixup",
    "metaDescription": "Get your car oil changed at home or office in 45 minutes. Correct oil grade for all car models — Maruti, Hyundai, Tata, Toyota & more. 30-day warranty. Starting ₹599. Book now.",
    "metaKeywords": "car oil change at home, doorstep car oil change, engine oil change near me, mobile car oil change, car engine oil service near me, oil change at home near me, doorstep engine oil change, car oil change cost, car oil change near me, home engine oil service, oil change and filter replacement near me, car oil change Bengaluru, car oil change Chennai, synthetic oil change at home, car engine oil change cost India"
  },

  {
    "slug": "car-brake-service",
    "title": "Car Brake Service & Brake Pad Replacement at Home | All Brands",
    "shortTitle": "Car Brake Service",
    "category": "car",
    "icon": "Car",
    "tagline": "Safe brakes save lives — professional brake service at your doorstep.",
    "description": "Fiixup provides complete doorstep car brake inspection, brake pad replacement, disc rotor check, and brake fluid flush for all car makes and models. Our certified technicians arrive with brake pads, shoes, and brake fluid for your specific car model and complete the full brake service at your home or office. Starting from ₹799.",
    "price": "₹799",
    "duration": "1–2 hrs",
    "features": [
      "Full brake system inspection (front & rear)",
      "Brake pad & disc replacement",
      "Drum brake shoe inspection & replacement",
      "Brake fluid flush & refill",
      "ABS sensor inspection",
      "Brake calliper cleaning & lubrication",
      "Post-service brake performance test"
    ],
    "pricing": {
      "rows": [
        { "label": "Brake Inspection (all 4 wheels)",               "priceFrom": 249, "note": "credited toward repair" },
        { "label": "Brake Pad Replacement — Front (per axle)",      "priceFrom": 799, "note": "pads extra", "highlight": true },
        { "label": "Brake Pad Replacement — Rear (per axle)",       "priceFrom": 699, "note": "pads extra" },
        { "label": "Drum Brake Shoe Replacement (per axle)",        "priceFrom": 599, "note": "shoes extra" },
        { "label": "Brake Fluid Flush & Refill (full system)",      "priceFrom": 499 },
        { "label": "Brake Calliper Cleaning & Lubrication",         "priceFrom": 399 },
        { "label": "Full Brake Service (front + rear + fluid)",     "priceFrom": 1999, "priceTo": 3499 }
      ],
      "competitors": [
        { "name": "Local Garage",        "price": "₹800–₹2,500",  "arrivalTime": "You go to them",  "warranty": "None",     "doorstep": false },
        { "name": "Authorised Centre",   "price": "₹1,500–₹5,000","arrivalTime": "2–5 days wait",   "warranty": "3 months", "doorstep": false },
        { "name": "Fiixup",             "price": "From ₹249",     "arrivalTime": "30–60 minutes",   "warranty": "30 days",  "doorstep": true  }
      ],
      "disclaimer": "Brake pad and shoe costs quoted separately based on your car model. OEM and aftermarket options available. All pricing confirmed before fitting."
    },
    "benefits": [
      { "icon": "Shield",       "title": "Safety Verified",          "body": "Every brake service ends with a performance test — we verify stopping distance, pedal feel, and brake balance before leaving your location." },
      { "icon": "Award",        "title": "OEM-Grade Pads",           "body": "We use OEM-grade or high-quality branded brake pads matched to your car's specification — never generic unbranded pads that compromise safety." },
      { "icon": "Clock",        "title": "1–2 Hours at Your Door",   "body": "Full front and rear brake service — pads, fluid, and calliper cleaning — completed at your home or office in under 2 hours." },
      { "icon": "CheckCircle",  "title": "ABS Compatible",           "body": "Our brake service procedures follow ABS-specific bleeding and pad replacement protocols for all modern cars with anti-lock braking systems." }
    ],
    "carBrands": [
      { "name": "Maruti Suzuki", "models": ["Swift", "Baleno", "Dzire", "Ertiga", "Brezza"] },
      { "name": "Hyundai",       "models": ["i20", "Creta", "Venue", "Verna", "Alcazar"] },
      { "name": "Tata",          "models": ["Nexon", "Punch", "Harrier", "Safari", "Tiago"] },
      { "name": "Honda",         "models": ["City", "Amaze", "WR-V", "Elevate"] },
      { "name": "Toyota",        "models": ["Innova Crysta", "Fortuner", "Glanza", "Urban Cruiser Hyryder"] },
      { "name": "Kia",           "models": ["Seltos", "Sonet", "Carens"] },
      { "name": "MG",            "models": ["Hector", "ZS EV", "Astor"] },
      { "name": "Mahindra",      "models": ["Scorpio-N", "XUV700", "Thar", "Bolero"] },
      { "name": "Volkswagen",    "models": ["Polo", "Virtus", "Taigun"] },
      { "name": "Skoda",         "models": ["Slavia", "Kushaq", "Octavia"] },
      { "name": "Renault",       "models": ["Kwid", "Triber", "Kiger"] },
      { "name": "Nissan",        "models": ["Magnite", "Kicks"] }
    ],
    "testimonials": [
      {
        "name": "Vikram N.",
        "location": "JP Nagar, Bengaluru",
        "vehicle": "Hyundai Creta 2021",
        "rating": 5,
        "review": "Front brakes were grinding badly and the car was pulling left under braking. Fiixup arrived with the correct Creta front brake pads, replaced both front pads and cleaned the callipers in 90 minutes at my apartment. Braking is now smooth and straight. Highly professional.",
        "date": "March 2026",
        "verified": true
      },
      {
        "name": "Rekha T.",
        "location": "Anna Nagar, Chennai",
        "vehicle": "Maruti Swift Dzire",
        "rating": 5,
        "review": "My Dzire brake pedal was going very low — nearly to the floor. Fiixup mechanic came, did a full inspection, found a brake fluid leak at the rear calliper, fixed the seal and flushed and refilled the full brake system. Done in 1.5 hours at home. Brakes feel completely restored.",
        "date": "April 2026",
        "verified": true
      },
      {
        "name": "Arun P.",
        "location": "Marathahalli, Bengaluru",
        "vehicle": "Toyota Fortuner 2022",
        "rating": 5,
        "review": "Full brake service on my Fortuner — front and rear pads plus brake fluid flush. Mechanic used genuine Toyota-spec pads and DOT 4 brake fluid. 2 hours in my driveway. Saved me a full-day trip to the Toyota service centre. Transparent, professional, and honest.",
        "date": "January 2026",
        "verified": true
      }
    ],
    "guide": {
      "title": "Car Brake Service Guide for Indian Drivers: Everything You Need to Know",
      "intro": "Car brakes are the most important safety system in any vehicle. Yet brake maintenance is consistently one of the most neglected aspects of car ownership in India — drivers often push well past warning signs before getting brakes checked. This guide covers everything about car brake service: how to recognise warning signs, what each repair involves, brake fluid importance, ABS considerations, and real cost comparisons across Bengaluru and Chennai.",
      "sections": [
        {
          "heading": "6 Warning Signs Your Car Brakes Need Immediate Service",
          "body": "Squealing or squeaking when braking: this is the brake pad wear indicator — a small metal tab engineered to contact the disc when pads reach minimum thickness and emit a high-pitched squeal as a deliberate warning. Do not ignore it — the next sound will be grinding. Grinding or metal-on-metal sound: the brake pad material has been completely consumed and the metal backing plate is now contacting the disc rotor directly. Every meter driven in this condition scores deeper grooves into the disc, which must then be machined or replaced at significantly higher cost. Spongy or low brake pedal: the pedal travels further than normal before resistance builds, or goes to near the floor. This indicates air in the brake hydraulic system (from a leak or improper brake fluid service) or severely worn brake pads. A complete loss of pedal resistance is a brake failure emergency — pull over immediately. Car pulling to one side under braking: indicates uneven brake pad wear (one side is more worn than the other), a seized brake calliper not releasing fully, or a brake system imbalance. This directly affects steering stability under emergency braking. Vibration or pulsation through the brake pedal: indicates a warped or uneven disc rotor — the thick and thin sections of the disc hit the brake pads alternately as it rotates, causing pulsation. Burning smell after braking in traffic: suggests brake drag — one or both callipers are not fully releasing after braking, causing continuous friction and overheating. This can eventually cause brake fluid boiling and temporary brake fade.",
          "tips": [
            "Never defer brake service past the squealing stage — the cost of a disc rotor replacement (₹2,000–₹6,000 per rotor) dwarfs the cost of a pad replacement (₹500–₹1,500 per axle).",
            "Check brake pad thickness through the calliper inspection window at every oil change — a 2mm visual check takes 10 seconds.",
            "If the brake pedal pulsates under light braking, it will be significantly worse under emergency braking — address it before it matters."
          ]
        },
        {
          "heading": "Brake Fluid: The Most Overlooked Safety Item in Indian Cars",
          "body": "Brake fluid is hygroscopic — it actively absorbs moisture from the air over time. As moisture content increases, the boiling point of the fluid drops significantly. In traffic conditions with frequent braking, brake calliper temperatures can exceed 150°C. If the brake fluid has a high moisture content, it can boil at these temperatures, creating vapour bubbles in the hydraulic lines. Vapour is compressible (unlike liquid), causing the brake pedal to go spongy or to the floor — brake fade or complete temporary brake failure. This is called vapour lock and is a known cause of serious accidents. Fresh DOT 4 brake fluid boils at 230°C. Brake fluid with 3% moisture content boils at approximately 155°C — a 33% reduction that can be reached by normal urban braking. Replace brake fluid every 2 years regardless of mileage — this is a time-based maintenance item, not mileage-based. In high-humidity coastal cities like Chennai, consider replacing every 18 months. Check the fluid colour: fresh DOT 4 is pale yellow. Dark brown or black fluid is significantly moisture-contaminated and must be flushed immediately.",
          "tips": [
            "Never top up brake fluid without knowing why the level has dropped — low brake fluid is almost always a sign of either a leak or severely worn brake pads (as the calliper piston extends further into the worn pad).",
            "Do not mix brake fluid brands or DOT specifications — always flush and fill with a single specification.",
            "After any brake work involving opening the hydraulic system, the system must be bled of air — incomplete bleeding results in a spongy pedal."
          ]
        },
        {
          "heading": "Disc Brakes vs Drum Brakes in Indian Cars: Service Differences",
          "body": "Most modern Indian cars have disc brakes on the front wheels and either disc or drum brakes on the rear. Front brakes perform approximately 70% of all braking work — they wear faster and require more frequent service. Disc brakes use hydraulic callipers that squeeze brake pads against a rotating disc rotor. They offer superior heat dissipation and consistent performance. Service items: pad replacement (every 30,000–50,000 km depending on driving style), disc rotor inspection for minimum thickness and scoring, calliper cleaning and pin lubrication (prevents calliper seizing), brake fluid condition. Drum brakes are still used on rear wheels of budget cars including Maruti Alto, WagonR, Swift (base variants), Honda Brio, and many others. They use curved brake shoes that press outward against a drum. They run cooler than discs but are less effective at high temperatures. Service items: shoe inspection and replacement (every 50,000–80,000 km), drum inner diameter measurement for wear limit, wheel cylinder inspection for leaks, self-adjuster mechanism check and lubrication. Replacing rear drum shoes without checking the drum for scoring results in rapid new shoe wear — our mechanics always inspect both.",
          "tips": [
            "Drum brakes adjusted too tight cause rear brake drag — you will notice the rear wheels are warm after a drive and fuel economy drops.",
            "Rear drum brake shoes last much longer than front disc pads — do not replace them prematurely just because the fronts were replaced.",
            "A brake calliper that is seized (stuck in applied position) causes severe uneven pad wear on one side — the car will also pull to that side under braking."
          ]
        },
        {
          "heading": "ABS and Brake Service: What Indian Car Owners Should Know",
          "body": "Anti-lock Braking System (ABS) is mandatory on all new passenger vehicles in India. ABS prevents wheel lockup under emergency braking by rapidly modulating brake pressure — this maintains steering control during hard braking and reduces stopping distances on loose surfaces. Brake pad replacement on ABS cars follows the same procedure as non-ABS cars. However, brake bleeding on ABS cars requires the ABS modulator to be cycled (actuated) during the bleed process to purge any air trapped in the ABS pump and valve body — a step that requires the correct procedure and in some cases a diagnostic tool to command. Omitting this step leaves residual air in the ABS module that causes a spongy pedal on initial brake application. ABS wheel speed sensors — small magnetic sensors near each wheel hub — can be damaged during brake service by mechanics who are not careful. A damaged ABS sensor triggers the ABS warning light and disables the ABS system. Our mechanics are trained specifically on ABS brake service procedures for all popular Indian car models.",
          "tips": [
            "If the ABS warning light comes on after a brake service, the ABS sensor wiring was likely disturbed or damaged during the work.",
            "ABS does not shorten stopping distance on dry roads for experienced drivers — it maintains steering control, which is its primary safety benefit.",
            "Never disable ABS manually — some drivers incorrectly believe it increases stopping performance in all conditions."
          ]
        },
        {
          "heading": "Brake Service Cost in Bengaluru & Chennai: Honest Price Comparison",
          "body": "Understanding real brake service costs prevents overcharging. Front disc brake pad replacement (labour): ₹399–₹799. Brake pads: ₹400–₹2,500 depending on brand (OEM, Brembo, TVS Genuine, or aftermarket). Front + rear disc pad replacement (labour): ₹799–₹1,499. Full brake fluid flush (labour + fluid): ₹499–₹899. Disc rotor replacement (labour): ₹599–₹999 per rotor. Rotors themselves: ₹800–₹3,500 per rotor depending on car. At authorised service centres in Bengaluru and Chennai, expect to pay 2–3x these labour rates, plus a premium on parts. A full front brake service at a Hyundai authorised centre typically costs ₹4,000–₹7,000. The identical work at Fiixup costs ₹1,500–₹3,000 using equivalent quality pads. The key advantage at Fiixup is that parts are shown to you before fitting — brand, specification, and part number visible — preventing the common practice of charging for premium parts but fitting cheaper alternatives.",
          "tips": [
            "Always ask for the brake pad brand name and part number before work starts — this holds the mechanic accountable.",
            "A brake inspection (₹249 at Fiixup) before committing to replacement saves money — it confirms whether replacement is genuinely needed.",
            "Brake pad bedding procedure after fitting: 5–10 moderate brake applications from 50 km/h to standstill — this transfers an even layer of pad material to the disc surface for optimal performance."
          ]
        }
      ],
      "conclusion": "Car brake service is not a maintenance item to defer, negotiate on, or economise by using the cheapest available parts. Brakes are the primary safety system that keeps you, your passengers, and other road users safe. Fiixup's certified mechanics use quality pads, perform ABS-correct procedures, verify performance after every service, and do it all at your doorstep with a 30-day warranty. Book your brake service at fiixup.in or call +91 8197459732."
    },
    "relatedSlugs": ["car-service-at-home", "car-oil-change-at-home", "car-general-repair"],
    "faqs": [
      { "q": "How do I know if my car brakes need servicing?", "a": "Squealing or grinding sounds when braking, a spongy or low brake pedal, the car pulling to one side, vibrations through the pedal, or longer stopping distances are all warning signs that require immediate attention." },
      { "q": "How much does car brake pad replacement cost?", "a": "Brake pad replacement starts from ₹799 per axle including labour. Pad cost depends on your car model and brand — quoted transparently before fitting. Full front + rear brake service from ₹1,999." },
      { "q": "How long does a doorstep brake service take?", "a": "Typically 1–2 hours for a full front and rear brake service at your location, including fluid flush and calliper cleaning." },
      { "q": "Do you use original brake pads?", "a": "We use OEM-grade or high-quality branded brake pads matched to your car's specification. Genuine OEM parts can be sourced on request. The brand and part number is confirmed before fitting." },
      { "q": "How often should brake fluid be changed?", "a": "Every 2 years regardless of mileage — brake fluid is a time-based maintenance item. In humid coastal cities like Chennai, every 18 months is recommended." },
      { "q": "Can you service ABS brakes at my doorstep?", "a": "Yes. Our mechanics are trained on ABS-specific brake bleeding procedures and handle all ABS-equipped Indian cars correctly, including ABS sensor protection during brake work." },
      { "q": "My car pulls to one side when braking — what's causing it?", "a": "This indicates uneven brake pad wear, a seized brake calliper on one side, or a brake system imbalance. Our mechanic inspects both sides and identifies the exact cause at your location." }
    ],
    "metaTitle": "Car Brake Service & Pad Replacement at Home | All Brands | Fiixup",
    "metaDescription": "Car brakes squealing or spongy? Expert doorstep brake pad replacement, disc brake service & fluid flush. All car models including ABS. 30-day warranty. Starting ₹249. Book now.",
    "metaKeywords": "car brake service near me, brake pad replacement at home, car brake repair near me, doorstep brake service, car brake pad replacement cost, car brake check near me, mobile car brake repair, disc brake service near me, car brake fluid change, brake repair near me, car brake inspection at home, ABS brake service near me, car brake fluid flush near me, car disc brake repair at home, car brake pad replacement Bengaluru, car brake service Chennai"
  },

  {
    "slug": "car-ac-service-repair",
    "title": "Car AC Service & Repair at Doorstep | Gas Recharge All Models",
    "shortTitle": "Car AC Service",
    "category": "car",
    "icon": "Wind",
    "tagline": "AC not cooling? Gas recharge & full AC repair done at your location.",
    "description": "Fiixup's doorstep car AC service and repair covers gas (refrigerant) recharge, compressor health check, condenser and evaporator inspection, cabin air filter replacement, and cooling performance testing — all at your home or office. Our technicians carry R-134a and R-1234yf refrigerant for all car models and complete most AC re-gassing and repairs in under 90 minutes. Starting from ₹899.",
    "price": "₹899",
    "duration": "1–2 hrs",
    "features": [
      "AC refrigerant gas recharge (R-134a / R-1234yf)",
      "Compressor health & pressure check",
      "Condenser & evaporator inspection",
      "AC leak detection & repair",
      "Cabin air filter cleaning or replacement",
      "AC cooling performance test",
      "Blower & vent inspection"
    ],
    "pricing": {
      "rows": [
        { "label": "AC Gas Recharge (R-134a)",                    "priceFrom": 899,  "highlight": true },
        { "label": "AC Gas Recharge (R-1234yf — newer cars)",    "priceFrom": 1499 },
        { "label": "AC System Leak Test",                        "priceFrom": 399 },
        { "label": "Cabin Air Filter Replacement",               "priceFrom": 249,  "note": "filter extra" },
        { "label": "Condenser Cleaning",                         "priceFrom": 499 },
        { "label": "AC Compressor Health Check",                 "priceFrom": 349 },
        { "label": "Full AC Service (gas + filter + condenser)", "priceFrom": 1499, "priceTo": 2499 }
      ],
      "competitors": [
        { "name": "Local Garage AC Shop",  "price": "₹800–₹2,500",  "arrivalTime": "You go to them",  "warranty": "None",     "doorstep": false },
        { "name": "Authorised Centre",     "price": "₹2,000–₹6,000","arrivalTime": "3–7 days wait",   "warranty": "3 months", "doorstep": false },
        { "name": "Fiixup",               "price": "From ₹349",     "arrivalTime": "60–90 minutes",   "warranty": "30 days",  "doorstep": true  }
      ],
      "disclaimer": "Refrigerant type (R-134a vs R-1234yf) confirmed before service. Compressor or condenser replacement quoted separately if required."
    },
    "benefits": [
      { "icon": "Wind",         "title": "Max Cooling Restored",    "body": "After a full AC gas recharge and system check, most cars return to original factory cooling performance — cold air within 3–5 minutes of switching on." },
      { "icon": "Search",       "title": "Root Cause Diagnosis",    "body": "We don't just top up gas and leave. We check system pressure, compressor function, and leak-test to find why the gas depleted — preventing a repeat failure." },
      { "icon": "Clock",        "title": "Done in 90 Minutes",      "body": "Full AC gas recharge, cabin filter replacement, and condenser cleaning — completed at your location in under 90 minutes." },
      { "icon": "Shield",       "title": "30-Day AC Warranty",      "body": "If cooling performance drops within 30 days of our AC service due to our workmanship, we return and fix it at no charge." }
    ],
    "carBrands": [
      { "name": "Maruti Suzuki", "models": ["Swift", "Baleno", "Dzire", "Ertiga", "Brezza"] },
      { "name": "Hyundai",       "models": ["i20", "Creta", "Venue", "Verna", "Alcazar"] },
      { "name": "Tata",          "models": ["Nexon", "Punch", "Harrier", "Safari", "Tiago"] },
      { "name": "Honda",         "models": ["City", "Amaze", "WR-V", "Elevate"] },
      { "name": "Toyota",        "models": ["Innova Crysta", "Fortuner", "Glanza"] },
      { "name": "Kia",           "models": ["Seltos", "Sonet", "Carens"] },
      { "name": "MG",            "models": ["Hector", "ZS EV", "Astor"] },
      { "name": "Mahindra",      "models": ["Scorpio-N", "XUV700", "Thar"] },
      { "name": "Volkswagen",    "models": ["Polo", "Virtus", "Taigun"] },
      { "name": "Skoda",         "models": ["Slavia", "Kushaq", "Octavia"] },
      { "name": "Renault",       "models": ["Kwid", "Triber", "Kiger"] },
      { "name": "Nissan",        "models": ["Magnite", "Kicks"] }
    ],
    "testimonials": [
      {
        "name": "Kavitha R.",
        "location": "Velachery, Chennai",
        "vehicle": "Hyundai Verna 2020",
        "rating": 5,
        "review": "AC was barely cooling even on full blast during peak Chennai summer. Fiixup mechanic came, checked the system pressure, found it was critically low on gas, recharged with R-134a and also cleaned the condenser that was blocked with dust. AC now blows ice cold. Brilliant service — did everything at my building parking.",
        "date": "April 2026",
        "verified": true
      },
      {
        "name": "Ramesh S.",
        "location": "Indiranagar, Bengaluru",
        "vehicle": "Tata Harrier 2022",
        "rating": 5,
        "review": "AC compressor was making a rattling noise and cooling had dropped. Fiixup diagnosed a failing AC compressor clutch and a leak at the high-pressure hose fitting. Fixed the fitting, recharged gas, and the compressor noise stopped. Transparent diagnosis with no unnecessary replacements pushed.",
        "date": "March 2026",
        "verified": true
      },
      {
        "name": "Meenakshi V.",
        "location": "T Nagar, Chennai",
        "vehicle": "Maruti Swift Dzire",
        "rating": 5,
        "review": "Cabin filter was completely clogged — mechanic showed it to me before replacing. Combined with an AC gas top-up, the difference in cabin cooling is night and day. Service done at home in 45 minutes. Very happy with Fiixup.",
        "date": "February 2026",
        "verified": true
      }
    ],
    "guide": {
      "title": "Car AC Not Cooling? Complete Guide to AC Service & Repair in India",
      "intro": "In Indian summers — particularly in Chennai where temperatures regularly exceed 38°C from March to June, and in Bengaluru where office parking lots turn into ovens — a car AC that stops cooling is not just uncomfortable. It is a health hazard. This guide covers every cause of car AC failure in Indian conditions, how each is diagnosed and repaired, and what to expect from a professional doorstep AC service.",
      "sections": [
        {
          "heading": "Why Car AC Stops Cooling: The 7 Most Common Causes in India",
          "body": "Low refrigerant gas is the most common cause — every car AC system loses a small amount of refrigerant annually through micro-leaks in seals and hose fittings. When levels drop below a threshold, cooling capacity falls dramatically. Symptoms: AC blows slightly cool but not cold, takes much longer to cool the cabin, compressor clicks on and off rapidly. Dirty or blocked condenser: the condenser sits behind the front grille and dissipates heat from the refrigerant. In Indian cities with heavy dust, pollution, and insect debris, condensers get blocked over 2–3 years, reducing cooling efficiency. Symptom: AC cools well at speed (more airflow through the condenser) but not at idle or in traffic. Faulty or weak compressor: the compressor pressurises the refrigerant to enable cooling. A failing compressor clutch (the magnetic coupling that engages the compressor) causes the AC to not engage at all. A worn compressor delivers insufficient pressure. Clogged cabin air filter: restricts airflow through the evaporator, reducing the volume of cold air entering the cabin. Very common in dusty Indian cities. Easy and cheap fix. AC refrigerant leak: a system with a leak loses gas faster than normal micro-leakage — the AC cools well immediately after re-gassing but stops cooling within weeks or months. The leak source must be found and sealed. Electrical failure: a blown AC fuse, faulty relay, or failed pressure switch prevents the compressor from engaging. The fan may blow but no cooling occurs. Evaporator issues: the evaporator inside the dashboard cools cabin air. A leaking evaporator or one that ices over causes initial cooling that stops after 10–15 minutes. Requires partial dashboard removal to access.",
          "tips": [
            "If your AC was recently re-gassed but stopped cooling within a month, there is an active refrigerant leak — not just low gas.",
            "AC performance drops in heavy traffic — if yours drops significantly more than expected, the condenser is likely partially blocked.",
            "A burning or musty smell from AC vents often indicates mould growth in the evaporator — cabin filter replacement and evaporator cleaning resolves this."
          ]
        },
        {
          "heading": "R-134a vs R-1234yf: Which Refrigerant Does Your Car Use?",
          "body": "Indian cars manufactured before 2017 almost universally use R-134a refrigerant — a hydrofluorocarbon (HFC) that has been the automotive AC standard since the 1990s. It is widely available and relatively affordable (₹150–₹300 per 100g). Cars manufactured after 2017, and particularly newer models from Hyundai (Creta 2020+), Kia (Seltos, Sonet), MG (Hector, Astor), Toyota (Hyryder), and Tata (new Nexon, Harrier facelift), increasingly use R-1234yf — a newer refrigerant with significantly lower global warming potential. R-1234yf is chemically different from R-134a and the two cannot be mixed. The filling equipment, hose fittings, and the refrigerant itself are different. R-1234yf costs significantly more per kilogram (₹800–₹1,500 per 100g) and requires specialised recovery and filling equipment. Our technicians confirm your car's refrigerant type from the underbonnet label before any service — never mix the two.",
          "tips": [
            "Check the AC label under your car's bonnet or in the owner manual — it states the refrigerant type and the exact fill quantity in grams.",
            "Never allow a workshop to substitute R-134a in a system designed for R-1234yf — it reduces system performance and is illegal in many jurisdictions.",
            "The fill quantity matters as much as the type — overfilling refrigerant reduces AC performance and stresses the compressor."
          ]
        },
        {
          "heading": "Car AC Service in Chennai: Why Annual Service Is Essential",
          "body": "Chennai's extreme summer climate — 8+ months of temperatures above 32°C and a peak of 38–42°C in April–May — places exceptional demands on car AC systems. The compressor runs almost continuously whenever the car is in use, versus intermittent operation in cooler climates. This continuous operation accelerates compressor wear, refrigerant micro-leakage, and cabin filter clogging. Chennai's coastal salt air also promotes faster corrosion of AC system components — particularly the condenser fins, which are thin aluminium and prone to corrosion near the coast (Besant Nagar, ECR, Nungambakkam, and Anna Nagar areas). Recommended AC service schedule for Chennai: Full AC service (gas check, condenser cleaning, cabin filter replacement) annually, ideally in February–March before peak summer. Cabin filter replacement every 6 months due to coastal dust and salt air. Compressor health check every 2 years. During monsoon (October–December), run AC on defrost mode for 10 minutes weekly to prevent mould growth in the evaporator.",
          "tips": [
            "Run AC for at least 10 minutes weekly even during cooler months — the compressor seals require regular lubrication from the refrigerant oil.",
            "If AC is not used for 3+ months, the refrigerant oil settles and the compressor can seize on first startup — a gradual restart (low AC setting for first few minutes) helps.",
            "Parking in shade where possible in Chennai summer dramatically reduces cabin temperature buildup, reducing the AC workload and extending component life."
          ]
        },
        {
          "heading": "Car AC Service in Bengaluru: Different Challenges from Chennai",
          "body": "Bengaluru's AC challenges differ from Chennai's. The city's altitude (920m) and historically milder climate means many drivers under-use and under-service their AC systems. However, Bengaluru's notorious traffic jams — the ORR at peak hours, Silk Board junction, KR Puram — cause extended idle periods where the AC compressor runs continuously without the cooling airflow of highway driving. This causes the AC compressor to work harder and the cabin temperature to recover more slowly than expected. Bengaluru's significant IT office population also creates parking lot heat soak — cars parked in outdoor office parking for 8–10 hours absorb enormous heat that the AC must then overcome. Condenser cleaning is particularly important for Bengaluru cars parked near construction sites in areas like Whitefield, Sarjapur Road, and Hebbal — construction dust blocks condenser fins rapidly. Recommended schedule for Bengaluru: AC gas check every 2 years. Cabin filter replacement every 6–9 months. Condenser cleaning every 12–18 months for cars near construction zones.",
          "tips": [
            "After entering a heat-soaked car, open all windows for 30–60 seconds before closing and running AC — this expels accumulated hot air and reduces AC recovery time significantly.",
            "Use the recirculate mode in Bengaluru traffic to keep the AC working on cooled cabin air rather than continuously cooling hot outside air.",
            "AC compressor clutch engagement can be confirmed by looking at the centre of the compressor — when AC is on, the inner disc should spin with the outer pulley."
          ]
        },
        {
          "heading": "Cabin Air Filter: The Cheapest AC Improvement You Can Make",
          "body": "The cabin air filter cleans all air entering the car's interior through the HVAC system — removing dust, pollen, pollution particles, and in some premium filter types, bacteria and allergens. A completely clogged cabin air filter does not just reduce AC efficiency — it also means every breath of air in your car cabin passes through a filter coated in months of accumulated pollution. In dusty Indian cities, cabin filters clog significantly faster than manufacturer recommendations (which are based on clean Western conditions). Typical replacement intervals: Bengaluru — every 12,000 km or 9–12 months. Chennai — every 8,000 km or 6–8 months near coastal areas. Hyderabad and Delhi — every 8,000 km due to high pollution and dust. The cabin filter on most popular Indian cars (Maruti Suzuki, Hyundai, Tata, Kia) is accessible without tools — it sits behind the glovebox or under the dashboard. Replacement takes 10–15 minutes at your doorstep. A premium activated carbon cabin filter (₹400–₹1,500) also removes odours and some gaseous pollutants — beneficial for drivers who frequently use congested roads with diesel truck traffic.",
          "tips": [
            "Pull out your cabin filter and hold it up to light — if you cannot see light through it easily, it is due for replacement.",
            "A musty smell from the AC vents that disappears within a few minutes is cabin filter and evaporator mould — replace the filter and run the AC on fresh air mode with windows down for 10 minutes to dry the evaporator.",
            "Activated carbon cabin filters cost 2–3x more than standard filters but remove petrol and diesel exhaust odours — beneficial for daily highway commuters."
          ]
        }
      ],
      "conclusion": "Car AC service should be a scheduled annual maintenance item in Indian conditions — not an emergency repair when the AC stops working during peak summer. Fiixup's doorstep AC service in Bengaluru and Chennai covers gas recharge, condenser cleaning, compressor check, and cabin filter replacement — all at your location in 90 minutes. Book before summer peaks at fiixup.in or call +91 8197459732."
    },
    "relatedSlugs": ["car-service-at-home", "car-engine-diagnostics", "car-general-repair"],
    "faqs": [
      { "q": "Why is my car AC not cooling?", "a": "The most common causes are low refrigerant gas, a blocked condenser, a faulty compressor, or a clogged cabin air filter. Our technician diagnoses the exact cause at your location using pressure gauges and system checks." },
      { "q": "How much does car AC gas recharge cost?", "a": "AC gas recharge (R-134a) starts from ₹899. R-1234yf for newer cars starts from ₹1,499. If additional parts like the compressor or condenser need replacement, those are quoted separately." },
      { "q": "How often should car AC gas be recharged?", "a": "In ideal conditions, car AC gas lasts 3–5 years. If cooling reduces before that, there is a slow refrigerant leak that must be found and sealed — not just topped up repeatedly." },
      { "q": "Do you carry refrigerant gas for all car models?", "a": "Yes. We carry R-134a for cars manufactured before 2017 and R-1234yf for newer Hyundai, Kia, MG, Toyota, and Tata models. We confirm your car's refrigerant type from the underbonnet label before service." },
      { "q": "How often should the cabin air filter be replaced?", "a": "Every 8,000–12,000 km or every 6–12 months depending on your city. In dusty areas or near construction zones, every 6 months. In Chennai near the coast, every 6–8 months." },
      { "q": "Can you fix a car AC compressor at my doorstep?", "a": "We can diagnose compressor health (clutch engagement, pressure output, noise) at your doorstep. Compressor replacement may require a workshop depending on the car model — we'll advise honestly and arrange towing if needed." },
      { "q": "My AC smells musty — what causes it?", "a": "Mould and bacteria growing in the evaporator or on a dirty cabin air filter. We replace the cabin filter and treat the evaporator with anti-mould spray — eliminates the smell permanently." }
    ],
    "metaTitle": "Car AC Service & Gas Recharge at Home | All Car Models | Fiixup",
    "metaDescription": "Car AC not cooling? Doorstep AC service — gas recharge, condenser cleaning & cabin filter. R-134a & R-1234yf available. All models. 30-day warranty. Starting ₹349. Book now.",
    "metaKeywords": "car AC service near me, car AC repair at home, car AC gas recharge near me, car AC not cooling repair, AC service near me, doorstep AC repair, car air conditioning service near me, car AC gas refill near me, mobile AC repair car, car AC check near me, car AC compressor repair near me, car AC gas recharge cost, cabin air filter replacement near me, car AC service Bengaluru, car AC service Chennai, car AC not cooling solution"
  },

  {
    "slug": "car-engine-diagnostics",
    "title": "Car Engine Diagnostics at Home | OBD2 Scan & Check Engine Light",
    "shortTitle": "Engine Diagnostics",
    "category": "car",
    "icon": "Search",
    "tagline": "Check engine light on? We scan & diagnose at your location.",
    "description": "Fiixup's doorstep car engine diagnostic service uses professional-grade OBD2 scanners to read fault codes, identify sensor failures, and detect performance issues — all at your location. A check engine light should never be ignored. Our certified technicians provide a transparent diagnostic report and fix most issues on the spot. Honest diagnosis, no guesswork, no unnecessary upselling. Starting from ₹399.",
    "price": "₹399",
    "duration": "30–60 min",
    "features": [
      "Professional OBD2 computer scan",
      "Full fault code reading & explanation",
      "Engine, transmission & ABS system check",
      "Emission system diagnosis",
      "Fuel system & oxygen sensor check",
      "Written diagnostic report provided",
      "On-spot repair where possible"
    ],
    "pricing": {
      "rows": [
        { "label": "OBD2 Engine Diagnostic Scan",              "priceFrom": 399, "highlight": true },
        { "label": "Full System Scan (engine + ABS + airbag)", "priceFrom": 599 },
        { "label": "Oxygen Sensor Replacement",                "priceFrom": 799, "note": "sensor extra" },
        { "label": "MAF Sensor Cleaning / Replacement",        "priceFrom": 499, "note": "part extra" },
        { "label": "Throttle Body Cleaning",                   "priceFrom": 599 },
        { "label": "Spark Plug Replacement (4-cylinder)",      "priceFrom": 599, "note": "plugs extra" },
        { "label": "Fault Code Clear + Re-test",               "priceFrom": 199 }
      ],
      "competitors": [
        { "name": "Local Garage",        "price": "₹500–₹1,500",  "arrivalTime": "You go to them",  "warranty": "None",     "doorstep": false },
        { "name": "Authorised Centre",   "price": "₹800–₹3,000",  "arrivalTime": "2–5 days wait",   "warranty": "3 months", "doorstep": false },
        { "name": "Fiixup",             "price": "From ₹399",     "arrivalTime": "30–60 minutes",   "warranty": "30 days",  "doorstep": true  }
      ],
      "disclaimer": "Diagnostic fee covers the OBD2 scan and full report. Repair costs quoted separately and approved before any work begins."
    },
    "benefits": [
      { "icon": "Search",       "title": "Exact Fault Identified",  "body": "Our professional OBD2 scanners read the specific fault code, not just a generic warning. You get the exact system, component, and error description — not a vague 'engine problem.'" },
      { "icon": "CheckCircle",  "title": "Honest Report",           "body": "We print or email you the full diagnostic report with every code found, its meaning, and our recommendation. No verbal-only diagnosis you can't verify." },
      { "icon": "Wrench",       "title": "Most Fixed On-Spot",      "body": "Common faults — oxygen sensor codes, MAF sensor issues, throttle body cleaning, loose connections — are fixed at your location immediately after diagnosis." },
      { "icon": "Shield",       "title": "All Systems Scanned",     "body": "We scan engine management, transmission control, ABS, airbag, and body control modules — a complete vehicle health picture, not just the engine light." }
    ],
    "carBrands": [
      { "name": "Maruti Suzuki", "models": ["Swift", "Baleno", "Dzire", "Ertiga", "Brezza", "Alto K10"] },
      { "name": "Hyundai",       "models": ["i20", "Creta", "Venue", "Verna", "Alcazar"] },
      { "name": "Tata",          "models": ["Nexon", "Punch", "Harrier", "Safari", "Tiago"] },
      { "name": "Honda",         "models": ["City", "Amaze", "WR-V", "Jazz", "Elevate"] },
      { "name": "Toyota",        "models": ["Innova Crysta", "Fortuner", "Glanza", "Urban Cruiser Hyryder"] },
      { "name": "Kia",           "models": ["Seltos", "Sonet", "Carens"] },
      { "name": "MG",            "models": ["Hector", "ZS EV", "Astor"] },
      { "name": "Mahindra",      "models": ["Scorpio-N", "XUV700", "Thar", "Bolero"] },
      { "name": "Volkswagen",    "models": ["Polo", "Virtus", "Taigun"] },
      { "name": "Skoda",         "models": ["Slavia", "Kushaq", "Octavia"] }
    ],
    "testimonials": [
      {
        "name": "Sanjay R.",
        "location": "Electronic City, Bengaluru",
        "vehicle": "Kia Seltos 2021",
        "rating": 5,
        "review": "Check engine light came on suddenly on my Seltos. Fiixup mechanic arrived with a proper scan tool, read the code — P0420 catalytic converter efficiency below threshold. Explained what it means, what options I have, and what the urgency level is. No upselling, no pressure. Exactly what a diagnostic service should be.",
        "date": "March 2026",
        "verified": true
      },
      {
        "name": "Lakshmi S.",
        "location": "Porur, Chennai",
        "vehicle": "Maruti Baleno 2019",
        "rating": 5,
        "review": "Engine light was on for 2 weeks — local garage said it needed a new oxygen sensor worth ₹3,500. Fiixup scan showed a loose wiring connector at the sensor, not a failed sensor. Mechanic tightened and secured the connector on the spot. Light off, ₹399 spent instead of ₹3,500. Incredible value.",
        "date": "April 2026",
        "verified": true
      },
      {
        "name": "Nitin A.",
        "location": "Koramangala, Bengaluru",
        "vehicle": "Hyundai Creta 2020",
        "rating": 5,
        "review": "Car was idling rough and the engine light was flashing. Fiixup came immediately — flashing engine light means serious. Scanned and found a cylinder 3 misfire code. Diagnosed a failed ignition coil, replaced it from their stock, drove off 45 minutes later. Professional emergency response.",
        "date": "February 2026",
        "verified": true
      }
    ],
    "guide": {
      "title": "Check Engine Light & OBD2 Diagnostics: Complete Guide for Indian Car Owners",
      "intro": "The check engine light (CEL) — officially called the Malfunction Indicator Lamp (MIL) — is the most misunderstood warning light in any car. It can mean anything from a loose fuel cap to a misfiring cylinder destroying the catalytic converter in real time. This guide explains exactly what the check engine light means, how OBD2 diagnostics work, the most common fault codes found in Indian cars, and what to do when the light comes on.",
      "sections": [
        {
          "heading": "Solid vs Flashing Check Engine Light: A Critical Difference",
          "body": "A solid (continuous, non-flashing) check engine light indicates a stored fault that requires attention but is not causing immediate active damage. The engine management system has detected a reading outside normal parameters — an oxygen sensor reading outside its expected range, a small evaporative emission leak, or a slightly misfiring cylinder — and has stored a fault code. The car is typically still driveable for short distances. A flashing or blinking check engine light is a different situation entirely. This indicates an active misfire severe enough to damage the catalytic converter in real time. The unburned fuel entering the catalytic converter at high temperatures can melt the catalyst substrate, destroying a component that costs ₹15,000–₹60,000 to replace. A flashing CEL requires immediate action: reduce engine load (no acceleration, no high RPM), pull over when safe, switch off the engine, and call Fiixup. Do not drive with a flashing check engine light to a garage.",
          "tips": [
            "A flashing check engine light is an emergency — treat it like a fire alarm, not a reminder.",
            "If the check engine light comes on alongside the temperature warning light, pull over immediately — this combination often indicates overheating plus engine damage.",
            "Some cars distinguish between amber (warning) and red (emergency) CEL — red always means stop immediately."
          ]
        },
        {
          "heading": "How OBD2 Diagnostics Work: What the Scanner Actually Reads",
          "body": "All cars sold in India after approximately 2005 are equipped with an OBD2 (On-Board Diagnostics 2) port — a standardised 16-pin connector typically located under the dashboard on the driver's side. The engine control unit (ECU) continuously monitors hundreds of sensor values and compares them against expected ranges. When a reading falls outside specification repeatedly, the ECU stores a Diagnostic Trouble Code (DTC) and illuminates the check engine light. A generic OBD2 scanner (the basic tools many mechanics use) reads only the stored DTC — a 5-character code like P0300 (random misfire detected). A professional-grade OBD2 scanner like those Fiixup technicians use reads: all stored and pending DTCs across all modules, live sensor data (oxygen sensor voltage, MAF airflow rate, throttle position, coolant temperature), freeze frame data (what the car was doing when the fault triggered), and manufacturer-specific codes beyond the generic standard. The difference between a professional scan (₹399) and a free generic scan at a tyre shop is the depth of information — live data reveals problems that stored codes alone miss.",
          "tips": [
            "Never clear DTCs without fixing the underlying fault — the code will return within driving cycles and you lose the freeze frame data that helps diagnosis.",
            "A pending code (not yet illuminating the CEL) means the fault has occurred once but not enough times to trigger the warning light — catch it early.",
            "Multiple DTCs appearing simultaneously often indicate one root cause — a skilled mechanic identifies which code triggered the cascade."
          ]
        },
        {
          "heading": "The 10 Most Common OBD2 Fault Codes in Indian Cars",
          "body": "P0300–P0304 (Engine Misfire): The most common serious codes. Indicates one or more cylinders are not firing correctly. Causes include worn spark plugs, failed ignition coils, fuel injector issues, or compression loss. A cylinder 1 misfire on a Maruti Suzuki, Hyundai i20, or Honda City is frequently caused by a failed ignition coil — a ₹1,500–₹3,000 repair. P0171 (System Too Lean): Oxygen sensor reports the engine is running too lean — more air than fuel. Common on Maruti Suzuki and Honda cars with vacuum leaks, dirty MAF sensors, or weak fuel pressure. P0420 / P0430 (Catalyst System Efficiency Below Threshold): Indicates the catalytic converter is not converting exhaust gases efficiently. May indicate a failing cat, exhaust leak before the downstream oxygen sensor, or an engine-running issue causing it (rich running, misfires). P0440–P0456 (Evaporative Emission Control System): Indicates a small or large fuel vapour leak from the fuel system — often as simple as a loose or faulty fuel cap. This is frequently the cause of a check engine light on otherwise perfectly running cars. P0101–P0103 (MAF Sensor): Mass Air Flow sensor out of range. Causes poor fuel economy, rough idle, and hesitation. Often correctable by cleaning the MAF sensor rather than replacement. P0340 (Camshaft Position Sensor): Common on Hyundai and Kia petrol engines. Causes no-start or intermittent stalling. P0562 (System Voltage Low): Battery or charging system voltage below 11.5V. Often the root cause of multiple other codes appearing simultaneously. Fixing the battery or alternator clears multiple codes at once.",
          "tips": [
            "If multiple unrelated codes appear simultaneously, check battery voltage first — low voltage generates spurious codes across all modules.",
            "An oxygen sensor code after an exhaust repair often indicates the new section was not welded air-tight — check for exhaust leaks before replacing the sensor.",
            "P0420 (catalyst efficiency) is one of the most misdiagnosed codes — expensive catalytic converter replacements are often prescribed when the actual cause is an upstream oxygen sensor or exhaust leak."
          ]
        },
        {
          "heading": "Diagnosing vs Repairing: What Our Mechanics Fix On the Spot",
          "body": "After completing the OBD2 scan and live data analysis, Fiixup mechanics fix many common issues at your doorstep in the same visit. Issues fixed on-spot: loose fuel cap (P0440 code — free fix), faulty oxygen sensor replacement (P0135, P0141, P0155, P0161), MAF sensor cleaning (P0101), throttle body cleaning (P0121, P2135), spark plug replacement (P0300 series), ignition coil replacement (P0300 series), vacuum line reconnection, loose battery terminal tightening (resolves spurious multi-code scenarios), and software fault code clearing after confirmed repairs. Issues requiring workshop follow-up: catalytic converter replacement, fuel injector replacement (requires professional cleaning equipment or new injectors), compression test findings indicating major engine wear, transmission-related DTCs requiring fluid service or component replacement, and airbag-related DTCs. Our technician clearly tells you which category your fault falls into — and if a workshop visit is needed, we arrange towing to a partner workshop.",
          "tips": [
            "A diagnosed and repaired fault should be confirmed by a drive cycle before considering the repair complete — the ECU must run through specific conditions to confirm the fault is resolved.",
            "If the check engine light returns within 50 km of clearing, the repair did not address the root cause.",
            "Ask for the post-repair scan results — a complete scan after repair confirms no remaining codes and shows live data within specification."
          ]
        }
      ],
      "conclusion": "A check engine light is never an event to ignore or defer. A ₹399 professional OBD2 scan at your doorstep tells you exactly what your car is experiencing and whether it needs urgent attention or can wait for scheduled service. Fiixup's diagnostic service in Bengaluru and Chennai includes a full report, honest recommendation, and on-spot repair for most common issues. Book at fiixup.in or call +91 8197459732."
    },
    "relatedSlugs": ["car-general-repair", "car-service-at-home", "car-breakdown-service"],
    "faqs": [
      { "q": "What does the check engine light mean?", "a": "It can indicate anything from a loose fuel cap (minor) to an oxygen sensor failure, catalytic converter issue, or engine misfire (serious). Our OBD2 scan tells you the exact fault code and its meaning." },
      { "q": "Can I drive with the check engine light on?", "a": "If the light is solid (not flashing), it's usually safe for short distances. A flashing check engine light means stop driving immediately — it indicates an active misfire damaging the catalytic converter." },
      { "q": "Do you fix the issue after diagnosing?", "a": "Yes. Most common issues — oxygen sensor replacement, MAF cleaning, spark plugs, ignition coils, loose connections — are fixed on the spot. Complex repairs are quoted and arranged." },
      { "q": "Will the check engine light go away after fixing?", "a": "Yes. After fixing the root cause, our technician clears the fault codes with the OBD2 scanner and verifies the light has gone off. A confirmation drive cycle is recommended." },
      { "q": "How much does an OBD2 car diagnostic scan cost?", "a": "A full OBD2 engine diagnostic scan starts from ₹399. Full system scan (engine + ABS + airbag + transmission) from ₹599. Repair costs quoted separately and approved before work starts." },
      { "q": "Can you diagnose Maruti Suzuki, Hyundai, Tata, and all other Indian car brands?", "a": "Yes. Our professional OBD2 scanners support all Indian car brands including manufacturer-specific codes beyond the standard OBD2 protocol for Maruti, Hyundai, Tata, Honda, Toyota, Kia, MG, Mahindra, VW, and Skoda." },
      { "q": "My car is running fine but the engine light is on — should I be worried?", "a": "Yes. Even a 'stored' code that doesn't affect driveability should be diagnosed — many serious issues (oxygen sensor degradation, small emission leaks) cause no immediate symptoms but worsen progressively." }
    ],
    "metaTitle": "Car Engine Diagnostics at Home | OBD2 Scan & Check Engine Light | Fiixup",
    "metaDescription": "Check engine light on? Expert OBD2 car engine diagnostics at your doorstep. All fault codes explained. Honest report. All car models. 30-day warranty. Starting ₹399. Book now.",
    "metaKeywords": "car engine diagnostics near me, OBD2 scan near me, check engine light repair near me, car diagnostic service at home, car fault code reading near me, mobile car diagnostics, car computer scan near me, engine diagnostic test at home, car warning light check near me, car engine check near me, OBD2 scanner car near me, car check engine light Bengaluru, car diagnostic scan Chennai, engine light on car repair near me, car ECU scan near me"
  },

  {
    "slug": "car-general-repair",
    "title": "Car Repair at Home | Doorstep Car Mechanic Service | All Brands",
    "shortTitle": "Car General Repair",
    "category": "car",
    "icon": "Wrench",
    "tagline": "Expert car repair at your doorstep — no garage visit needed.",
    "description": "Fiixup's doorstep car repair service covers everything from minor fixes to major mechanical repairs at your home, office, or roadside. Our certified mobile car mechanics handle engine work, suspension repair, steering issues, electrical faults, clutch service, and more for all car brands. We carry a fully stocked service van with common parts. Honest quotes before work starts. 30-day warranty on all repairs. Starting from ₹499.",
    "price": "₹499",
    "duration": "1–4 hrs",
    "features": [
      "Engine, suspension & steering repair",
      "Clutch & gearbox inspection",
      "Electrical fault diagnosis & repair",
      "Exhaust & emission system service",
      "Cooling system & radiator repair",
      "Genuine & OEM spare parts used",
      "30-day service warranty"
    ],
    "pricing": {
      "rows": [
        { "label": "Mechanic Call-Out + Diagnosis",              "priceFrom": 499,  "highlight": true },
        { "label": "Suspension Inspection & Bushing Replacement","priceFrom": 799,  "note": "parts extra" },
        { "label": "Clutch Inspection & Cable Adjustment",       "priceFrom": 499 },
        { "label": "Cooling System Check & Coolant Top-up",      "priceFrom": 399 },
        { "label": "Electrical Fault Diagnosis (OBD2 + multimeter)","priceFrom": 599 },
        { "label": "Alternator / Starter Motor Check",           "priceFrom": 349 },
        { "label": "Full Car Repair (complex, per day)",         "priceFrom": 1999, "note": "parts quoted separately" }
      ],
      "competitors": [
        { "name": "Local Garage",        "price": "₹500–₹3,000",  "arrivalTime": "You go to them",  "warranty": "None",     "doorstep": false },
        { "name": "Authorised Centre",   "price": "₹1,500–₹8,000","arrivalTime": "2–7 days",        "warranty": "3 months", "doorstep": false },
        { "name": "Fiixup",             "price": "From ₹499",     "arrivalTime": "30–60 minutes",   "warranty": "30 days",  "doorstep": true  }
      ],
      "disclaimer": "Diagnosis fee covers arrival and assessment. All repair costs — labour and parts — itemised and approved before work begins."
    },
    "benefits": [
      { "icon": "Wrench",       "title": "All Repairs Covered",     "body": "Engine, brakes, suspension, electrical, cooling, clutch, AC — our fully-equipped service vans handle the full range of car repairs that would otherwise require a garage visit." },
      { "icon": "Award",        "title": "Certified Mechanics",     "body": "Every Fiixup car mechanic is certified, trained across multiple car brands, and background-verified. You see their name and rating before they arrive." },
      { "icon": "Shield",       "title": "30-Day Warranty",         "body": "Every repair — from a simple sensor replacement to a full suspension overhaul — is covered by our 30-day warranty. Issue recurs? We fix it free." },
      { "icon": "Eye",          "title": "Full Transparency",       "body": "All work is performed in front of you. Parts are shown before fitting. Invoice lists every item by name, quantity, and cost. No black box, no surprises." }
    ],
    "carBrands": [
      { "name": "Maruti Suzuki", "models": ["Swift", "Baleno", "Dzire", "Ertiga", "Brezza", "Alto K10"] },
      { "name": "Hyundai",       "models": ["i20", "Creta", "Venue", "Verna", "Alcazar"] },
      { "name": "Tata",          "models": ["Nexon", "Punch", "Harrier", "Safari", "Tiago", "Nexon EV"] },
      { "name": "Honda",         "models": ["City", "Amaze", "WR-V", "Jazz", "Elevate"] },
      { "name": "Toyota",        "models": ["Innova Crysta", "Fortuner", "Glanza", "Urban Cruiser Hyryder"] },
      { "name": "Kia",           "models": ["Seltos", "Sonet", "Carens"] },
      { "name": "MG",            "models": ["Hector", "ZS EV", "Astor", "Gloster"] },
      { "name": "Mahindra",      "models": ["Scorpio-N", "XUV700", "Thar", "Bolero"] },
      { "name": "Volkswagen",    "models": ["Polo", "Virtus", "Taigun"] },
      { "name": "Skoda",         "models": ["Slavia", "Kushaq", "Octavia"] },
      { "name": "Renault",       "models": ["Kwid", "Triber", "Kiger"] },
      { "name": "Nissan",        "models": ["Magnite", "Kicks"] }
    ],
    "testimonials": [
      {
        "name": "Rohit M.",
        "location": "BTM Layout, Bengaluru",
        "vehicle": "Tata Nexon 2021",
        "rating": 5,
        "review": "Alternator failed — car was draining the battery every 2 days. Fiixup mechanic came, tested the alternator output with a multimeter, confirmed failure, sourced a remanufactured unit and fitted it at my apartment in 3 hours. Charging system perfect since. Fair price, quality work.",
        "date": "March 2026",
        "verified": true
      },
      {
        "name": "Sudha P.",
        "location": "Velachery, Chennai",
        "vehicle": "Honda City 2019",
        "rating": 5,
        "review": "My City had a terrible vibration at highway speed — felt like the wheels were about to come off. Fiixup diagnosed worn front strut mounts. Replaced both at my home in 2.5 hours. Vibration completely gone. Much cheaper than the Honda service centre quote and done right at home.",
        "date": "April 2026",
        "verified": true
      },
      {
        "name": "Karthik N.",
        "location": "Indiranagar, Bengaluru",
        "vehicle": "Maruti Ertiga 2020",
        "rating": 5,
        "review": "Clutch was slipping badly on my Ertiga — couldn't drive uphill without the engine screaming and no acceleration. Fiixup mechanic came, confirmed clutch plate wear, arranged to do the clutch replacement at my home over 4 hours. Now drives perfectly. Would not trust any other service.",
        "date": "January 2026",
        "verified": true
      }
    ],
    "guide": {
      "title": "Doorstep Car Repair in Bengaluru & Chennai: What Can Be Fixed at Your Home?",
      "intro": "The biggest misconception about mobile car repair is that it is limited to basic services like oil changes and tyre pumping. In reality, a well-equipped mobile mechanic can handle the vast majority of car repairs that Indian drivers encounter — from suspension overhauls to alternator replacements, clutch service, and electrical system repairs. This guide covers what can be done at your doorstep, what requires a workshop, and how Fiixup's certified mechanics deliver garage-quality work at your location.",
      "sections": [
        {
          "heading": "What Car Repairs Can Be Done at Your Doorstep?",
          "body": "The list of repairs genuinely possible at a doorstep location is larger than most drivers realise. Engine and mechanical: oil and filter change, spark plug replacement, ignition coil replacement, coolant flush and refill, thermostat replacement, timing belt inspection (but not replacement — requires engine-off work with specific tooling), alternator and starter motor replacement, power steering fluid flush. Electrical: battery replacement, alternator output testing, OBD2 fault code reading and clearing, oxygen sensor replacement, MAF sensor cleaning or replacement, fuse replacement, horn and light repair, window motor and regulator repair. Brakes: pad replacement (all four corners), drum shoe replacement, brake fluid flush and bleed, calliper cleaning and lubrication. Suspension: shock absorber replacement (front and rear), strut mount replacement, ball joint inspection, wheel bearing check (rotation test), tyre rotation and pressure setting. AC: refrigerant recharge, cabin filter replacement, condenser cleaning. Clutch (manual cars): cable adjustment and replacement, clutch master/slave cylinder replacement, and on many cars, even clutch plate replacement with the right lift equipment. Tyres: puncture repair, tyre replacement and fitting, wheel balancing.",
          "tips": [
            "Timing belt replacement requires the engine to be stopped in a specific position — a procedure requiring high-precision tools best done in a workshop.",
            "Gearbox and differential work requires draining large fluid volumes and potentially lifting the vehicle — typically workshop-only.",
            "Full engine rebuilds — including piston ring replacement, crankshaft work, and head gasket replacement with head resurfacing — are always workshop-level work."
          ]
        },
        {
          "heading": "Car Suspension Repair at Home: What's Involved",
          "body": "Suspension repairs are among the most impactful jobs our doorstep mechanics perform — and among the most commonly deferred by Indian drivers who attribute rough rides to road quality rather than suspension wear. Front shock absorber (strut) replacement: Struts on cars like Hyundai Creta, Maruti Swift, Honda City, and Tata Nexon can be replaced at your doorstep in 2–3 hours. The mechanic uses a hydraulic jack and stands to safely raise the car, removes the strut assembly, fits the new strut, and lowers the car. Post-replacement alignment check is recommended at a wheel alignment centre (not a doorstep procedure). Rear shock absorber replacement: Simpler than fronts on most Indian cars with independent rear suspension — typically 1.5–2 hours for both sides. Strut mounts / top mounts: These rubber and metal components at the top of the front strut fail silently — the symptoms are a clunking sound over bumps and a vague, wandering steering feel. Replacement is done as part of the strut service. Suspension bushings: Rubber bushings at control arm mounting points degrade with age and Bengaluru's pothole impacts. Bushing replacement requires pressing equipment that our vans carry — 2–4 hours depending on the car.",
          "tips": [
            "After any front suspension work, wheel alignment should be checked and corrected at an alignment centre — incorrect alignment after strut replacement causes rapid tyre wear.",
            "Shock absorbers should ideally be replaced in pairs (both fronts together or both rears together) — mismatched shock absorbers create uneven handling.",
            "A bounce test at each corner (press down hard on the car corner, release, and count bounces) — if it bounces more than 1.5 times before settling, that shock absorber is worn."
          ]
        },
        {
          "heading": "Car Cooling System: Overheating Prevention & Repair",
          "body": "Engine overheating is one of the most serious and expensive failures an Indian car owner can face — a severely overheated engine warps the cylinder head, blows the head gasket, and can seize pistons. The cooling system maintains engine temperature through a closed loop of coolant circulating between the engine block and the radiator. Common cooling system failures in Indian cars: Coolant leaks — from hoses, the radiator itself, the water pump, or the thermostat housing. A sweet smell in or around the car, or visible puddles of green or pink fluid under the car, indicate a coolant leak. Thermostat failure — a thermostat stuck closed prevents coolant from flowing to the radiator, causing rapid overheating. A thermostat stuck open causes the engine to never fully warm up — poor fuel economy and heater performance result. Radiator blockage — minerals from hard water (common in Bengaluru) block radiator tubes over years of service. Water pump failure — the water pump impeller circulates coolant. A worn or failed pump results in insufficient flow and overheating. Coolant flush and refill (replacing old coolant with fresh fluid) is a 45–60 minute doorstep job recommended every 40,000–60,000 km. Using distilled water and correct ratio coolant prevents the mineral deposits that cause radiator blockage.",
          "tips": [
            "Never open a hot radiator cap — the system is pressurised and scalding coolant will spray. Wait 30+ minutes after engine off.",
            "Use only the coolant colour specified for your car — mixing red and blue coolant causes chemical reactions that form gel and block the system.",
            "If your temperature gauge climbs above normal in traffic but returns to normal at speed, a clogged radiator or failing electric fan is likely — have it checked before it becomes a full overheating event."
          ]
        },
        {
          "heading": "Clutch Service at Your Doorstep: Manual Car Owners Guide",
          "body": "The clutch is one of the most used mechanical components in any manual transmission car — in heavy Bengaluru and Chennai traffic, the clutch may be engaged and disengaged thousands of times per day. Clutch plate wear is progressive — as the friction material on the clutch disc wears away, the clutch starts to slip (engine revs but the car doesn't accelerate proportionally). By the time drivers notice slipping, the clutch is often near end-of-life. Clutch replacement is a substantial mechanical job — the gearbox must be lowered or removed to access the clutch assembly. On most front-wheel-drive Indian cars (Maruti Swift, Hyundai i20, Honda City, Tata Nexon), this is achievable at your doorstep with proper equipment — our mechanics use transmission jacks and the correct tools to do this safely in 4–6 hours. Clutch cable adjustment (for cable-operated clutches on older cars): a simple, inexpensive job that restores correct clutch pedal free play and engagement point — often done as part of a regular service. Hydraulic clutch master cylinder bleeding: if the clutch pedal feels spongy or the engagement point shifts toward the floor, bleeding the hydraulic system restores proper feel — a 30–45 minute doorstep job.",
          "tips": [
            "Avoid riding the clutch pedal in traffic — resting your foot on the pedal causes continuous clutch wear even when not fully engaged.",
            "A clutch that slips on flat roads will fail completely on uphill stretches — never defer clutch replacement once slipping is confirmed.",
            "The clutch pressure plate and release bearing should always be replaced together with the clutch disc — replacing only the disc on a worn pressure plate results in premature failure."
          ]
        },
        {
          "heading": "Car Electrical Repair: Alternator, Battery & Wiring at Your Doorstep",
          "body": "Car electrical failures beyond simple battery issues are often misdiagnosed and over-priced at local garages. The charging system (alternator + battery + wiring) is the most common source of electrical repair work our mobile mechanics perform. Alternator failure: the alternator charges the battery while the engine runs. A failing alternator causes progressive battery drain — the battery discharges faster than it can be recharged, eventually leaving the car dead. Symptoms: battery warning light on dashboard, dimming headlights at idle, radio or infotainment display flickering. Our mechanic tests alternator output voltage (should read 13.5–14.5V at 2,000 RPM) and replaces the alternator at your doorstep for most popular Indian cars. Starter motor failure: clicking or grinding when turning the key, engine not cranking at all despite a charged battery. Starter motor replacement is a 1–2 hour doorstep job for most cars. Wiring short circuits and connector failures: corrosion at connector blocks, chafed wiring, and blown fuses cause a wide range of electrical symptoms. Our mechanics trace these systematically with a multimeter rather than replacing components at random.",
          "tips": [
            "A battery that tests fully charged but drains overnight has a parasitic draw — a battery drain test identifies which circuit is drawing current when the car is off.",
            "Modern alternators often fail gradually rather than suddenly — a battery warning light that appears only at idle but not at highway speed indicates early alternator failure.",
            "Remanufactured alternators and starter motors are a cost-effective alternative to new OEM parts — we use quality remanufactured units with warranties."
          ]
        }
      ],
      "conclusion": "Fiixup's doorstep car repair service in Bengaluru and Chennai brings the garage to your home — certified mechanics, professional tools, quality parts, and a 30-day warranty on everything we do. Most common car repairs are fully achievable at your parking spot, saving you the garage trip, the waiting time, and the uncertainty of unmonitored work. Book at fiixup.in or call +91 8197459732."
    },
    "relatedSlugs": ["car-service-at-home", "car-engine-diagnostics", "car-breakdown-service"],
    "faqs": [
      { "q": "Can you handle all types of car repairs at home?", "a": "We handle the vast majority of common repairs on-site — engine, electrical, brakes, suspension, cooling, clutch, AC, and more. For major overhauls (gearbox, engine rebuild) we arrange towing to a partner workshop." },
      { "q": "Do you carry spare parts?", "a": "Yes. Our service vans are stocked with common parts for all popular Indian car brands. For specific or rare parts, we source same-day from our parts network and schedule the repair." },
      { "q": "How much does car repair at home cost?", "a": "Starting from ₹499 for minor repairs and diagnosis. All costs — labour and parts — are itemised and quoted before any work begins. No surprises." },
      { "q": "Which car brands do you support?", "a": "All popular brands — Maruti, Hyundai, Tata, Honda, Toyota, Kia, MG, Mahindra, Volkswagen, Skoda, Renault, Nissan, and more. Our mechanics are trained across all major Indian car makes." },
      { "q": "Can you replace a car alternator at my home?", "a": "Yes. Alternator replacement is a 1.5–2 hour doorstep job for most Indian cars. We test the old alternator output before removing and fit a quality remanufactured or new unit with a warranty." },
      { "q": "Is car suspension repair possible at home?", "a": "Yes. Shock absorber replacement, strut mount replacement, and bushing replacement are all done at your doorstep with the correct jacking equipment. Post-service wheel alignment check at a nearby alignment centre is recommended." },
      { "q": "How long does doorstep car repair take?", "a": "It depends on the repair: oil change — 45 minutes. Brake service — 1–2 hours. Suspension work — 2–3 hours. Clutch replacement — 4–6 hours. Our mechanic gives you an accurate time estimate after the initial assessment." }
    ],
    "metaTitle": "Car Repair at Home | Doorstep Car Mechanic | All Brands | Fiixup",
    "metaDescription": "Expert car repair at your home or office. Mobile mechanics for engine, suspension, electrical, brakes, AC & clutch. All brands. 30-day warranty. Starting ₹499. Book now.",
    "metaKeywords": "car repair at home, doorstep car mechanic, mobile car mechanic near me, car mechanic at home near me, car repair near me, home car repair service, car mechanic near me, doorstep car repair service, mobile mechanic near me, on demand car mechanic, car repair service near me, car general repair at home, car suspension repair at home, car alternator replacement near me, car clutch repair at home, car electrical repair near me, doorstep car mechanic Bengaluru, car mechanic near me Chennai"
  },

  // ══ TOWING ═════════════════════════════════════════════════════════════════

  {
    slug: "car-towing-service-near-me",
    title: "Car Towing Service Near Me | 24/7 Flatbed Towing",
    shortTitle: "Car Towing Service",
    category: "towing",
    icon: "Truck",
    tagline: "Stuck on the road? Our tow truck reaches you in 30–60 minutes, 24/7.",
    description:
      "Fiixup provides 24/7 flatbed and crane car towing service across Bengaluru, Chennai, Hyderabad, and Mumbai. Whether your car broke down on the highway, was involved in an accident, has a dead engine, or is simply immovable — our tow trucks are dispatched immediately. We use flatbed tow trucks for all-wheel-drive, low-clearance, and luxury cars. Transparent pricing before any movement. Starting from ₹499.",
    price: "₹499",
    duration: "30–60 min arrival",
    features: [
      "Flatbed towing — safest for AWD, luxury & low-clearance cars",
      "Crane & wheel-lift towing for standard cars",
      "Accident & emergency recovery",
      "Highway & expressway towing coverage",
      "Tow to workshop or destination of your choice",
      "Insurance coordination support",
      "24/7 availability — no extra night charge",
    ],
    pricing: {
      rows: [
        { label: "Car Towing (within city, up to 10 km)", priceFrom: 499, highlight: true },
        { label: "Car Towing (11–25 km)",                  priceFrom: 799 },
        { label: "Car Towing (26–50 km)",                  priceFrom: 1299 },
        { label: "Highway Towing (per km beyond 10 km)",   priceFrom: 35, note: "₹35 per km" },
        { label: "Bike Towing (within city)",              priceFrom: 299 },
        { label: "Accident Recovery",                      priceFrom: 999 },
        { label: "Luxury / Low-Clearance Car Flatbed",     priceFrom: 799 },
      ] as PricingRow[],
      competitors: [
        { name: "Random Roadside Tow",  price: "₹1,500–₹3,000", arrivalTime: "Unpredictable",  warranty: "None",                      doorstep: true },
        { name: "Insurance RSA",        price: "Covered (slow)", arrivalTime: "1–4 hours",      warranty: "None",                      doorstep: true },
        { name: "Fiixup",               price: "From ₹499",      arrivalTime: "30–60 minutes",  warranty: "Safe delivery guaranteed",  doorstep: true },
      ],
      disclaimer: "Price is confirmed and locked before the tow truck moves. No negotiation at destination.",
    },
    benefits: [
      { icon: "Shield", title: "Flatbed = Zero Damage", body: "All 4 wheels lifted off the ground. No risk to transmission, driveshaft, or undercarriage on AWD or low-clearance cars." },
      { icon: "Clock",  title: "30–60 Min Arrival",     body: "Dispatched immediately to your GPS location. Live ETA shared after booking." },
      { icon: "Tag",    title: "Fixed Price Upfront",   body: "We quote and lock the price before the truck moves. No renegotiation at destination." },
      { icon: "MapPin", title: "City + Highway Cover",  body: "All major highways, expressways, and city roads covered — not just within city limits." },
    ],
    carBrands: CAR_BRANDS_RICH,
    testimonials: [
      { name: "Vivek N.",   location: "Marathahalli, Bengaluru", vehicle: "Kia Seltos 2022",  rating: 5, review: "Used the flatbed after my car got stuck on the ORR. Professional loading, no scratches. Price was exactly as quoted. Very reliable.", date: "February 2026", verified: true },
      { name: "Shalini P.", location: "Sholinganallur, Chennai", vehicle: "Tata Nexon EV",    rating: 5, review: "Needed EV-specific towing. They knew exactly how to load the Nexon. No dragging, no damage. Highly recommended for EV owners.", date: "March 2026", verified: true },
    ],
    guide: {
      title: "Car Towing in Bengaluru & Chennai: Complete Guide",
      intro: "Needing a tow truck is stressful — dealing with the wrong towing service makes it worse. This guide covers how to choose the right towing service, flatbed vs wheel-lift towing differences, what to do while waiting for the tow truck, and how Fiixup handles towing safely across Bengaluru and Chennai.",
      sections: [
        {
          heading: "Flatbed vs Wheel-Lift vs Crane Towing: Which Is Right?",
          body: "Flatbed towing loads the entire vehicle onto a flat platform — all four wheels off the ground. This is the safest method for all modern cars, especially AWD, 4WD, automatic transmission cars, EVs, luxury cars, and low-clearance vehicles. Wheel-lift towing picks up either the front or rear wheels, with the other pair rolling on the road. Acceptable for standard rear-wheel-drive or front-wheel-drive cars for short distances only. Never use wheel-lift for AWD, 4WD, or low-clearance cars. Crane towing is used for accident recovery when the car is in a ditch or inaccessible position. Fiixup uses flatbed trucks as the default for all modern cars.",
          tips: [
            "If you drive an AWD or 4WD car, insist on flatbed towing — wheel-lift on AWD cars destroys the transfer case.",
            "EVs should always be flatbed towed — rolling an EV on two wheels can damage the regenerative braking system.",
          ],
        },
        {
          heading: "What to Do While Waiting for the Tow Truck",
          body: "Move the car as far left as possible onto the shoulder or emergency lane. Switch on hazard lights immediately — this is the single most important safety action. If you have emergency triangles, place them 50–100 metres behind your car. Stay inside the car if you're on a highway. Do not attempt to push the car yourself in traffic. Know your exact location before calling — note the nearest milestone, exit number, or landmark.",
          tips: [
            "Keep reflective triangles in your car boot at all times.",
            "Save Fiixup's number (+91 8197459732) now — not when you're stranded.",
          ],
        },
        {
          heading: "Key Towing Routes in Bengaluru",
          body: "Fiixup's towing service in Bengaluru covers all major roads: ORR (Outer Ring Road), Bangalore-Mysore Expressway, Old Airport Road, Hosur Road (NH44), Tumkur Road, Hennur Road, and NICE Road. Common breakdown hotspots include the ORR near KR Puram, Hosur Road near Electronic City, and Bannerghatta Road. For apartment complexes, we have equipment to navigate tight basement entry points.",
        },
        {
          heading: "Key Towing Routes in Chennai",
          body: "In Chennai, Fiixup covers ECR (East Coast Road), OMR (Old Mahabalipuram Road), GST Road (NH45), Chennai Bypass Road, Inner Ring Road, and Rajiv Gandhi Salai. The Chennai–Bengaluru NH48 is also covered for breakdowns near the city outskirts.",
        },
      ],
      conclusion: "When your car needs towing, Fiixup's certified tow operators arrive in 30–60 minutes, use the right equipment for your vehicle type, and deliver it safely to any destination. Call +91 8197459732 for immediate towing anywhere in Bengaluru or Chennai.",
    },
    relatedSlugs: ["car-breakdown-service", "roadside-assistance-near-me", "car-battery-jumpstart-near-me"],
    faqs: [
      { q: "How much does car towing cost near me?", a: "Car towing within city limits starts from ₹499 for up to 10 km. Long-distance towing is ₹35/km beyond 10 km. Transparent quote provided before the truck moves." },
      { q: "How fast can a tow truck reach me?", a: "Typically 30–60 minutes within city limits. For highway breakdowns we aim for 45 minutes from the nearest available truck." },
      { q: "Is flatbed towing better for my car?", a: "Yes. Flatbed towing lifts all four wheels off the ground, preventing any drivetrain, transmission, or undercarriage damage. We recommend it for all AWD, automatic, EV, and luxury cars." },
      { q: "Where will you tow my car?", a: "To any destination you choose — nearest workshop, Fiixup partner workshop, or your home." },
      { q: "Do you tow accident-damaged cars?", a: "Yes. We handle accident recovery and towing 24/7 and can coordinate with your insurance company for cashless towing where applicable." },
      { q: "Can you tow a Tata Nexon EV or Ola S1?", a: "Yes. We use flatbed towing for all EVs to protect the battery pack and regenerative braking system." },
    ],
    metaTitle: "Car Towing Service Near Me | 24/7 Flatbed Towing — Fiixup",
    metaDescription: "Need car towing in Bengaluru or Chennai? 24/7 flatbed tow truck for breakdowns, accidents & flat tyres. Arrives in 30–60 min. Starting ₹499. Call +91 8197459732.",
    metaKeywords: "car towing service near me, tow truck near me, flatbed towing near me, 24 hour towing Bengaluru, emergency towing Chennai, car breakdown towing, accident towing near me, highway towing service, vehicle towing near me, tow truck Bengaluru, car tow Chennai",
  },

  {
    slug: "bike-towing-service-near-me",
    title: "Bike Towing Service Near Me | 24/7 Two-Wheeler Towing",
    shortTitle: "Bike Towing Service",
    category: "towing",
    icon: "Truck",
    tagline: "Bike breakdown? Our two-wheeler carrier reaches you fast, anytime.",
    description:
      "Fiixup provides 24/7 bike and scooter towing service using dedicated two-wheeler carriers. We tow all bike brands — Honda, Bajaj, Royal Enfield, TVS, KTM, Yamaha, Hero, Suzuki, and all scooters including electric models. Starting from ₹299.",
    price: "₹299",
    duration: "30–60 min arrival",
    features: [
      "Dedicated two-wheeler carriers for all bikes & scooters",
      "Safe loading & securing — no damage guaranteed",
      "All bike brands including Royal Enfield, KTM & electrics",
      "City, highway & expressway coverage",
      "Tow to workshop or your chosen location",
      "24/7 — no extra night or weekend charge",
      "Live technician tracking after booking",
    ],
    faqs: [
      { q: "How much does bike towing cost near me?", a: "Bike towing within city limits starts from ₹299. Long-distance towing is charged per kilometre with a transparent quote upfront." },
      { q: "Do you tow heavy bikes like Royal Enfield and KTM?", a: "Yes. Our two-wheeler carriers handle all bike types including heavy motorcycles like Royal Enfield, KTM Adventure, and Kawasaki." },
      { q: "Do you tow electric scooters?", a: "Yes. We tow Ola S1, Ather 450X, TVS iQube, Bajaj Chetak, and all electric two-wheelers with care to avoid battery damage." },
      { q: "How fast can you reach me for bike towing?", a: "Typically within 30–60 minutes in city areas. For highway breakdowns, we dispatch the nearest available carrier immediately." },
    ],
    metaTitle: "Bike Towing Service Near Me | 24/7 Two-Wheeler Towing",
    metaDescription: "Bike breakdown? 24/7 doorstep bike towing for all brands — Royal Enfield, Bajaj, KTM, scooters & EVs. Arrives in 30–60 min. Starting ₹299. Call now.",
    metaKeywords: "bike towing service near me, two wheeler towing near me, motorcycle towing near me, bike breakdown towing, scooter towing near me, bike tow near me, bike towing near me 24 hours, two wheeler tow truck near me, Royal Enfield towing service, KTM towing near me, bike carrier near me",
  },

  // ══ BATTERY ════════════════════════════════════════════════════════════════

  {
    slug: "car-battery-jumpstart-near-me",
    title: "Car Battery Jump Start Near Me | 24/7 Emergency Jump Start",
    shortTitle: "Car Jump Start",
    category: "battery",
    icon: "Battery",
    tagline: "Dead car battery? We jump start it at your location in 30 minutes.",
    description:
      "Fiixup provides 24/7 doorstep car battery jump start service across Bengaluru, Chennai, Hyderabad, and Mumbai. Whether your car won't start in your apartment parking, at the office, or on the roadside — our technician arrives with professional jump start equipment and safely restores your vehicle. We also test your battery health after the jump start. All car brands. No extra night or weekend charge. Starting from ₹399.",
    price: "₹399",
    duration: "30–60 min",
    features: [
      "Professional jump start with surge-protected equipment",
      "Battery health test & voltage check after jump",
      "Alternator output check",
      "Battery terminal cleaning & tightening",
      "All car makes & models supported",
      "Immediate battery replacement if needed",
      "24/7 — no extra charge for nights or weekends",
    ],
    pricing: {
      rows: [
        { label: "Car Battery Jump Start",              priceFrom: 399, highlight: true },
        { label: "Battery Health Test (standalone)",    priceFrom: 149 },
        { label: "Car Battery Replacement + Fitting",   priceFrom: 1999, note: "battery brand may vary" },
        { label: "Alternator Check",                    priceFrom: 249 },
        { label: "Battery Terminal Cleaning",           priceFrom: 149 },
      ] as PricingRow[],
      competitors: [
        { name: "Local Mechanic (night call)", price: "₹800–₹1,500", arrivalTime: "1–3 hours",      warranty: "None",    doorstep: true  },
        { name: "Battery Shop (day only)",     price: "₹500–₹1,000", arrivalTime: "You go to them", warranty: "None",    doorstep: false },
        { name: "Fiixup",                      price: "From ₹399",   arrivalTime: "30–60 minutes",  warranty: "30 days", doorstep: true  },
      ],
      disclaimer: "24/7 availability with no extra charge for night or weekend call-outs.",
    },
    benefits: [
      { icon: "Clock",  title: "30-Minute Arrival",    body: "Nearest technician dispatched immediately to your GPS location — day or night." },
      { icon: "Shield", title: "Safe for Modern Cars", body: "We use professional booster packs, not basic cables, protecting your car's ECU and electronics." },
      { icon: "Zap",    title: "Instant Diagnosis",    body: "We test battery health, alternator output, and starting system to find the root cause." },
      { icon: "Award",  title: "24/7 No Surcharge",    body: "Midnight or 5am — same price. No emergency call-out fee. No night or weekend surcharge." },
    ],
    carBrands: CAR_BRANDS_RICH,
    testimonials: [
      { name: "Anand S.",    location: "Whitefield, Bengaluru",  vehicle: "Hyundai Creta 2021",   rating: 5, review: "Called at 11pm, technician arrived in 35 minutes. Jumped the battery, tested it, told me it was on its last legs and replaced it on the spot. Fantastic service.", date: "March 2026", verified: true },
      { name: "Meera K.",    location: "Adyar, Chennai",         vehicle: "Maruti Swift Dzire",   rating: 5, review: "Car refused to start in the office parking. Fiixup arrived, jump started and tested the battery — all while I finished my meeting. Very professional.", date: "April 2026", verified: true },
      { name: "Rajesh Iyer", location: "JP Nagar, Bengaluru",    vehicle: "Toyota Innova Crysta", rating: 5, review: "Third time using Fiixup for different issues. Always reliable. The battery health test after the jump is a great touch — saved me from being stranded again.", date: "January 2026", verified: true },
    ],
    guide: {
      title: "Car Battery Dead? Complete Guide to Jump Starting & Battery Replacement",
      intro: "A dead car battery is one of the most common and frustrating vehicle emergencies in India — striking without warning, often at the worst moment. This guide covers why batteries die, how to safely jump start a car, the risk of doing it wrong on modern cars, and how to know when your battery needs replacement.",
      sections: [
        {
          heading: "Why Car Batteries Die: The 7 Most Common Reasons",
          body: "Battery age is the primary cause — most car batteries last 3–5 years in Indian conditions, shorter in extreme heat cities like Chennai and Hyderabad. Leaving interior lights or accessories on with engine off drains the battery completely. Short trips in heavy city traffic do not give the alternator enough running time to recharge after starting. Extreme heat accelerates internal chemical reactions, degrading battery plates faster. Parasitic drain from a faulty electronic module pulling power when the car is off. Corroded or loose battery terminals increasing resistance and reducing charging. A failing alternator that fails to charge while the engine runs.",
          tips: [
            "A battery unused for 2+ weeks will likely be slow or dead on return.",
            "A battery warning light means the alternator may not be charging — address immediately.",
            "Check battery terminals annually for corrosion — white or blue deposits require cleaning.",
          ],
        },
        {
          heading: "The Correct Order to Connect Jumper Cables",
          body: "The order of cable connection is critical — wrong order causes sparks near the battery, blown fuses, or ECU damage. Step 1: RED cable to POSITIVE (+) terminal of DEAD battery. Step 2: RED cable to POSITIVE (+) terminal of GOOD battery. Step 3: BLACK cable to NEGATIVE (–) terminal of GOOD battery. Step 4: BLACK cable to UNPAINTED METAL on the dead car's engine — not the dead battery's negative terminal. Start the working car, wait 3–5 minutes, then attempt to start the dead car. Disconnect cables in exact reverse order after successful start.",
          tips: [
            "NEVER connect cables in wrong order — it can blow fuses or damage the ECU.",
            "Do not jump start a visibly swollen, cracked, or leaking battery.",
            "After a successful jump start, drive 20–30 minutes to allow the alternator to recharge the battery.",
          ],
        },
        {
          heading: "Modern Cars and Jump Start Risks",
          body: "Cars manufactured after 2015 — Hyundai Creta, Kia Seltos, Tata Nexon, Maruti Baleno, and virtually all modern Indian cars — have multiple ECUs, ADAS systems, and sensitive sensors. A voltage spike from improperly connected cables can damage these systems and cost ₹10,000–₹50,000 or more to repair. This is why Fiixup uses professional lithium booster packs that deliver regulated, spike-free current. Never use basic jumper cables on modern cars with complex electronics.",
        },
        {
          heading: "When to Replace Your Car Battery: Warning Signs",
          body: "Replace your battery if it is 3+ years old AND you notice any of these: engine cranks slowly (laboured, sluggish crank), battery warning light on dashboard, you have needed a jump start more than once in 3 months, headlights are noticeably dimmer at idle, battery terminals have white or blue corrosion deposits, or the battery case is visibly swollen — replace immediately, swollen battery is unsafe.",
        },
      ],
      conclusion: "With Fiixup's 24/7 doorstep jump start service in Bengaluru and Chennai, help arrives in 30–60 minutes — day or night, weekday or holiday. We jump start, test, and advise on battery health so you know exactly what to do next. Call +91 8197459732 now.",
    },
    relatedSlugs: ["car-battery-replacement-at-home", "car-breakdown-service", "roadside-assistance-near-me"],
    faqs: [
      { q: "How much does a car jump start service cost near me?", a: "Car battery jump start service starts from ₹399. If the battery needs replacement, we quote the battery price separately before fitting." },
      { q: "How do I know if my car battery is dead?", a: "Signs: the engine clicks but won't crank, headlights are very dim, the dashboard doesn't light up, or the car is completely silent when you turn the key." },
      { q: "Will a jump start fix my car permanently?", a: "A jump start gets you moving. If your battery is old or has a dead cell, it will drain again. Our technician tests battery health after the jump and advises honestly if replacement is needed." },
      { q: "Can you replace my car battery at home after the jump start?", a: "Yes. We carry replacement batteries for most popular car models and can fit them at your location immediately after the jump start." },
      { q: "Is jump start service available at night?", a: "Yes. Our service is available 24 hours a day, 7 days a week including nights, weekends, and public holidays — with no extra night surcharge." },
      { q: "Is it safe to jump start a modern car with sensitive electronics?", a: "Yes, when done correctly. Fiixup technicians use professional-grade lithium booster packs — not basic cables — delivering regulated current without voltage spikes that could damage ECUs." },
    ],
    metaTitle: "Car Battery Jump Start Near Me | 24/7 Emergency Service — Fiixup",
    metaDescription: "Dead car battery in Bengaluru or Chennai? Emergency jump start at your location. 30–60 min arrival. All car brands. Starting ₹399. Call +91 8197459732.",
    metaKeywords: "car battery jump start near me, car jump start near me, battery boost near me, jump start service near me, car battery dead near me, battery jump start 24 hours, emergency jump start near me, car won't start Bengaluru, battery jumpstart service Chennai, car battery service near me",
  },

  {
    slug: "bike-battery-jumpstart-near-me",
    title: "Bike Battery Jump Start Near Me | 24/7 Service",
    shortTitle: "Bike Jump Start",
    category: "battery",
    icon: "Battery",
    tagline: "Bike battery dead? Jump start at your location in under 30 minutes.",
    description:
      "Fiixup provides 24/7 doorstep bike and scooter battery jump start service for all two-wheeler brands. Our technician arrives with professional portable jump start equipment, safely starts your bike, and tests battery health. If the battery is beyond recovery, we carry replacement units for most popular models. No extra charge for night call-outs. Starting from ₹299.",
    price: "₹299",
    duration: "20–45 min",
    features: [
      "Safe doorstep bike jump start",
      "Battery voltage & health test",
      "Charging system (regulator/rectifier) check",
      "Battery terminal cleaning",
      "Immediate battery replacement if required",
      "All bike & scooter brands supported",
      "24/7 — including nights & weekends",
    ],
    faqs: [
      { q: "How much does bike jump start service cost near me?", a: "Bike battery jump start starts from ₹299. Battery replacement, if needed, is charged separately and quoted before fitting." },
      { q: "My bike's self-start isn't working — can you help?", a: "Yes. Most self-start failures are due to a weak or dead battery. Our technician jump starts the bike and tests the full electrical system to find the root cause." },
      { q: "How do I know if my bike battery is dead or another issue?", a: "If the self-start clicks once or is silent, the battery is likely dead. If it cranks slowly, the battery is weak. If it cranks fine but doesn't start, it's likely fuel or spark — our mechanic diagnoses all three on-site." },
    ],
    metaTitle: "Bike Battery Jump Start Near Me | 24/7 Service | Fiixup",
    metaDescription: "Bike battery dead? 24/7 doorstep jump start service for all brands — Activa, Royal Enfield, Pulsar, KTM & more. Arrives in 30 min. Starting ₹299. Call now.",
    metaKeywords: "bike battery jump start near me, bike jump start near me, two wheeler battery jump start, scooter jump start near me, bike battery dead near me, bike battery boost near me, motorcycle jump start near me, bike self start not working near me, bike jump start service near me",
  },

  {
    slug: "car-battery-replacement-at-home",
    title: "Car Battery Replacement at Home | Doorstep Service",
    shortTitle: "Car Battery Replacement",
    category: "battery",
    icon: "Battery",
    tagline: "New car battery fitted at your home or office in under an hour.",
    description:
      "Fiixup's doorstep car battery replacement service sends a certified technician with a replacement battery matched to your car's specification. Our technician tests your existing battery first, confirms replacement is needed, fits the new battery, clears any ECU adaptation warnings, and safely disposes of the old unit. All car brands. Starting from ₹1,999 (battery inclusive).",
    price: "₹1,999",
    duration: "30–60 min",
    features: [
      "Battery health test before replacement decision",
      "OEM or brand-matched battery supplied & fitted",
      "Old battery safely removed & disposed",
      "Battery terminal cleaning & corrosion treatment",
      "ECU reset & adaptation if required",
      "All car brands & models supported",
      "30-day battery warranty",
    ],
    faqs: [
      { q: "How much does car battery replacement cost at home?", a: "Car battery replacement starts from ₹1,999 (battery + fitting included). Price varies by battery brand and car model. Full quote before fitting." },
      { q: "How long does a car battery last?", a: "Typically 3–5 years in normal conditions. Indian summer heat and frequent short trips reduce battery life." },
      { q: "Do you carry batteries for luxury cars like BMW and Mercedes?", a: "Yes. We carry AGM and EFB batteries for BMW, Mercedes-Benz, Audi, and other premium cars including ECU adaptation service." },
      { q: "Will replacing the battery reset my car settings?", a: "Some cars reset radio presets after battery replacement. Our technician performs ECU re-adaptation to minimise any lost settings where possible." },
    ],
    metaTitle: "Car Battery Replacement at Home | Doorstep Service | Fiixup",
    metaDescription: "Get your car battery replaced at home. Doorstep service with OEM battery supply & fitting. All car brands. 30-day warranty. Starting ₹1,999. Book now.",
    metaKeywords: "car battery replacement at home, car battery replacement near me, doorstep car battery service, car battery change near me, mobile car battery replacement, car battery fitting at home, car battery near me, car battery replacement cost, new car battery at home, car battery change service near me",
  },

  {
    slug: "bike-battery-replacement-at-home",
    title: "Bike Battery Replacement at Home | Doorstep Service",
    shortTitle: "Bike Battery Replacement",
    category: "battery",
    icon: "Battery",
    tagline: "New bike battery fitted at your location — fresh start, no hassle.",
    description:
      "Fiixup's doorstep bike battery replacement service brings a certified technician with a replacement battery for your specific two-wheeler model. We carry batteries for Honda, Bajaj, TVS, Royal Enfield, Yamaha, KTM, Hero, and all popular scooters. Our technician tests your existing battery first using a professional load tester before replacing. Starting from ₹799 (battery inclusive).",
    price: "₹799",
    duration: "20–40 min",
    features: [
      "Battery load test before replacement",
      "Correct battery for your bike model supplied & fitted",
      "Old battery safely removed & disposed",
      "Terminal cleaning & anti-corrosion treatment",
      "Charging system check after fitting",
      "All bike & scooter brands supported",
      "30-day battery warranty",
    ],
    faqs: [
      { q: "How much does bike battery replacement cost at home?", a: "Bike battery replacement starts from ₹799 (battery + fitting included). Price varies by battery size and brand. Full quote before fitting." },
      { q: "How do I know if my bike battery needs replacement?", a: "Slow or no self-start, dim headlights even after a recent jump start, battery that won't hold charge overnight, or a battery over 2 years old in a hot city like Chennai or Hyderabad." },
      { q: "How long does a bike battery last?", a: "Typically 2–3 years in Indian climatic conditions. Heat-intensive cities reduce battery life faster." },
    ],
    metaTitle: "Bike Battery Replacement at Home | Doorstep Service | Fiixup",
    metaDescription: "Bike battery dead or weak? Doorstep bike battery replacement for all brands. Supply & fit at your location. 30-day warranty. Starting ₹799. Book now.",
    metaKeywords: "bike battery replacement at home, bike battery replacement near me, two wheeler battery replacement, scooter battery replacement near me, doorstep bike battery service, motorcycle battery replacement near me, bike battery change near me, bike battery replacement cost, mobile bike battery service, new bike battery near me",
  },

  // ══ PUNCTURE ═══════════════════════════════════════════════════════════════

  {
    slug: "car-puncture-repair-near-me",
    title: "Car Puncture Repair Near Me | 24/7 Tyre Repair Service",
    shortTitle: "Car Puncture Repair",
    category: "puncture",
    icon: "ShieldAlert",
    tagline: "Flat car tyre? We come to your location and fix it in 20 minutes.",
    description:
      "Fiixup's 24/7 car puncture repair and tyre service comes to your exact location — on the road, in your parking lot, at home, or on the highway. Our technician arrives with portable tyre-changing equipment and puncture repair kits. We handle tubeless and tube-type tyre punctures, tyre bursts, slow leaks, and flat tyre replacement for all car models. Starting from ₹199.",
    price: "₹199",
    duration: "20–40 min",
    features: [
      "Tubeless tyre puncture repair (plug & patch)",
      "Tube-type tyre puncture repair",
      "Spare tyre fitting & torque check",
      "Tyre pressure check & inflation",
      "Tyre burst assessment & replacement advice",
      "Valve repair & replacement",
      "All car models supported",
    ],
    pricing: {
      rows: [
        { label: "Tubeless Tyre Puncture Repair",            priceFrom: 199, highlight: true },
        { label: "Tube-Type Tyre Puncture Repair",           priceFrom: 249 },
        { label: "Spare Tyre Fitting (you have spare)",       priceFrom: 149 },
        { label: "Valve Replacement",                         priceFrom: 99  },
        { label: "Tyre Pressure Check & Inflation (all 4)",   priceFrom: 99  },
        { label: "Tyre Replacement (supply + fit, per tyre)", priceFrom: 999, note: "brand-dependent" },
      ] as PricingRow[],
      competitors: [
        { name: "Roadside Puncture Wala",  price: "₹150–₹400",  arrivalTime: "You push to them",  warranty: "None",     doorstep: false },
        { name: "Tyre Shop",               price: "₹200–₹500",  arrivalTime: "Shop hours only",   warranty: "3 months", doorstep: false },
        { name: "Fiixup",                  price: "From ₹199",  arrivalTime: "20–40 minutes",     warranty: "30 days",  doorstep: true  },
      ],
      disclaimer: "Puncture repair includes labour only. Tyre and valve costs quoted separately.",
    },
    benefits: [
      { icon: "Clock",  title: "20-Minute Fix",      body: "Most car punctures are repaired in under 20 minutes at your location — no pushing required." },
      { icon: "MapPin", title: "Comes to You",       body: "On the road, in your parking, on the highway — we come to your exact location." },
      { icon: "Zap",    title: "24/7 No Extra Cost", body: "Midnight flat tyre? Our price at 2am is identical to our daytime price." },
      { icon: "Shield", title: "Permanent Fix",      body: "We use plug-and-patch repair for a permanent seal — not just a quick plug that can fail again." },
    ],
    carBrands: CAR_BRANDS_RICH,
    testimonials: [
      { name: "Arjun K.",   location: "Koramangala, Bengaluru", vehicle: "Honda City 2022", rating: 5, review: "Flat tyre at midnight in my apartment parking. Fiixup was there in 25 minutes. Fixed the tubeless tyre, checked all 4 pressures. Great service at an odd hour.", date: "February 2026", verified: true },
      { name: "Lakshmi S.", location: "Velachery, Chennai",     vehicle: "Maruti Baleno",   rating: 5, review: "Nail puncture on the highway near Perungudi. Called Fiixup, they arrived while I was still safe with the car. Professional, quick fix.", date: "March 2026", verified: true },
    ],
    guide: {
      title: "Car Tyre Puncture in Bengaluru & Chennai: Complete Guide",
      intro: "Tyre punctures are the most common roadside emergency for car drivers in India. Bengaluru's notorious potholes and construction debris, and Chennai's monsoon flooding debris make punctures even more frequent. This guide covers how to detect a puncture, what to do when it happens, and why doorstep puncture repair is the safest option.",
      sections: [
        {
          heading: "Tubeless vs Tube Tyre Punctures: What's the Difference?",
          body: "Most modern Indian cars come with tubeless tyres as standard. A tubeless tyre forms an airtight seal between the tyre bead and wheel rim, with no inner tube. When punctured by a nail or screw, tubeless tyres lose air gradually — often giving 10–30 minutes to reach safety or call for help. Tube-type tyres have an inner tube that holds the air. When punctured, the tube can deflate rapidly — sometimes explosively — causing immediate loss of control risk. The repair process differs: tubeless punctures use a mushroom plug-and-patch method, while tube-type repairs require removing the tyre and replacing or patching the tube.",
          tips: [
            "Always insist on a plug-and-patch repair for tubeless tyres — a plug-only repair is temporary.",
            "A sidewall puncture cannot be safely repaired — the tyre must be replaced.",
          ],
        },
        {
          heading: "How to Detect a Slow Puncture Before It Strands You",
          body: "A slow puncture is dangerous because it gives false confidence. Warning signs: the car pulls to one side on straight roads, one tyre consistently reads lower pressure during fortnightly checks, increased road vibration from one corner of the car, or the tyre visually appears slightly flatter. Check tyre pressure fortnightly — a 5+ PSI drop in one tyre between checks indicates a slow leak. Our technicians find slow punctures by spray-testing or submerging the tyre to detect the exact leak point.",
        },
        {
          heading: "Tyre Puncture Hotspots in Bengaluru",
          body: "Certain Bengaluru areas are notorious for tyre punctures. Whitefield and KR Puram have significant construction activity with metal debris on roads. Bannerghatta Road near junctions has particularly bad pothole damage. BTM Layout and Jayanagar have deep potholes causing sidewall damage. The ORR near Tin Factory frequently has road debris from industrial vehicles. Night driving in these areas carries highest risk.",
        },
        {
          heading: "What to Do When You Get a Flat Tyre While Driving",
          body: "If you feel sudden loss of control, vibration, or the car pulling hard to one side: Do NOT brake suddenly — this can cause a spin. Grip the steering wheel firmly, ease off the accelerator gradually, steer toward the shoulder or emergency lane. Once slowed to under 20 km/h, gently brake to a stop. Switch on hazard lights immediately. On a highway, do not attempt to change the tyre yourself — call Fiixup for safe roadside assistance.",
        },
      ],
      conclusion: "In Bengaluru and Chennai where road conditions make punctures a near-monthly occurrence for many drivers, having Fiixup saved is the smartest preparation. 24/7 doorstep puncture repair means you never push your car to a shop. Call +91 8197459732 the moment you notice a flat.",
    },
    relatedSlugs: ["bike-puncture-repair-near-me", "tyre-replacement-at-home", "car-breakdown-service"],
    faqs: [
      { q: "How much does car puncture repair cost near me?", a: "Car tyre puncture repair starts from ₹199 for tubeless and ₹249 for tube-type repairs. Tyre replacement, if needed, is quoted separately." },
      { q: "Is there a 24-hour puncture repair near me?", a: "Yes. Fiixup is available 24/7 — your car puncture is fixed at your location day or night with no extra night surcharge." },
      { q: "Can you repair a tyre burst on the highway?", a: "If the tyre is repairable (nail puncture, small cut on tread), we fix it on the spot. Blowout or sidewall damage requires tyre replacement — we can supply and fit." },
      { q: "My tyre has a slow puncture — can you find and fix it?", a: "Yes. We spray-test or submerge the tyre to locate even tiny slow leaks, then repair using a plug-and-patch kit for a permanent fix." },
      { q: "Can you change my spare tyre at my location?", a: "Yes. Our mechanic fits your spare, checks pressure, and torques all wheel nuts to specification." },
    ],
    metaTitle: "Car Puncture Repair Near Me | 24/7 Tyre Repair — Fiixup",
    metaDescription: "Flat car tyre in Bengaluru or Chennai? 24/7 doorstep puncture repair at your location. All car models. Tubeless & tube-type. Starting ₹199. Call +91 8197459732.",
    metaKeywords: "car puncture repair near me, flat tyre repair near me, tyre puncture repair near me, car tyre repair Bengaluru, puncture shop near me open now, 24 hour puncture repair, doorstep puncture repair, car flat tyre service Chennai, tyre repair near me, tubeless tyre puncture repair near me",
  },

  {
    slug: "bike-puncture-repair-near-me",
    title: "Bike Puncture Repair Near Me | 24/7 Two-Wheeler Tyre Repair",
    shortTitle: "Bike Puncture Repair",
    category: "puncture",
    icon: "ShieldAlert",
    tagline: "Bike tyre flat? We come to you anytime — no pushing required.",
    description:
      "Fiixup's 24/7 doorstep bike puncture repair service is your nearest open puncture shop — without the shop. Whether you're stuck with a flat tyre at midnight, in a parking lot, or on the highway, our technician comes to your exact location with tube and tubeless puncture repair tools. We fix punctures for all bikes and scooters. Starting from ₹99.",
    price: "₹99",
    duration: "15–30 min",
    features: [
      "Tubeless tyre puncture repair (plug method)",
      "Tube-type tyre puncture repair",
      "Valve repair & replacement",
      "Tyre pressure check & inflation",
      "Tyre assessment — replace or repair advice",
      "All bike & scooter brands supported",
      "24/7 — no extra charge for night repairs",
    ],
    faqs: [
      { q: "How much does bike puncture repair cost near me?", a: "Bike tyre puncture repair starts from ₹99 for tubeless and ₹149 for tube-type repairs." },
      { q: "Is there a puncture shop near me open at night?", a: "Fiixup is available 24/7 for bike puncture repair. We come to your exact location — no shop search needed." },
      { q: "Can you repair scooter tyres like Honda Activa and TVS Jupiter?", a: "Yes. We repair tubeless and tube-type tyres for all scooters including Honda Activa, TVS Jupiter, Suzuki Access, and Yamaha Fascino." },
      { q: "My bike tyre burst on the highway — what should I do?", a: "Do not brake suddenly. Ease off throttle, grip handlebars firmly, steer to the shoulder. Switch on hazard lights and call Fiixup." },
    ],
    metaTitle: "Bike Puncture Repair Near Me | 24/7 Tyre Repair | Fiixup",
    metaDescription: "Bike tyre flat? 24/7 doorstep puncture repair at your location. All bikes & scooters. Tubeless & tube-type. Starting ₹99. Call now.",
    metaKeywords: "bike puncture repair near me, two wheeler puncture repair near me, bike tyre puncture near me, scooter puncture repair near me, puncture shop near me 24 hours, bike flat tyre repair near me, doorstep bike puncture repair, motorcycle puncture repair near me, bike tyre repair near me, bike puncture repair at home",
  },

  {
    slug: "tyre-replacement-at-home",
    title: "Tyre Replacement at Home | Doorstep Tyre Fitting Service",
    shortTitle: "Tyre Replacement",
    category: "puncture",
    icon: "Settings",
    tagline: "New tyre supplied and fitted at your location — no workshop visit.",
    description:
      "Fiixup's doorstep tyre replacement service supplies and fits new tyres for bikes and cars at your home, office, or roadside. Our technicians carry tyre-changing equipment and stock a range of popular tyre brands and sizes. Whether your tyre is irreparably punctured, worn beyond safe limits, or you need a new set — we bring the tyre to you and complete the fitting and balancing on-site. Starting from ₹499.",
    price: "₹499",
    duration: "30–90 min",
    features: [
      "Tyre supply & doorstep fitting",
      "Wheel balancing after fitting",
      "Old tyre removal & responsible disposal",
      "Tyre pressure set to manufacturer spec",
      "Wheel nut torque check",
      "All bike & car tyre sizes available",
      "Popular brands — MRF, CEAT, Apollo, Bridgestone, Michelin",
    ],
    faqs: [
      { q: "Can you supply and fit a tyre at my home?", a: "Yes. We stock common tyre sizes for bikes and cars. For less common sizes, we source them within 2–4 hours and schedule the fitting." },
      { q: "How much does tyre replacement cost?", a: "Tyre replacement starts from ₹499 per tyre (fitting only, if you provide the tyre). Supply + fitting depends on the tyre brand and size — quoted transparently before work starts." },
      { q: "Which tyre brands do you supply?", a: "We supply MRF, CEAT, Apollo, Bridgestone, JK Tyre, and Michelin. Brand recommendations based on your vehicle type and usage." },
      { q: "Do you do wheel balancing at home?", a: "We perform static wheel balancing at the doorstep after tyre fitting. Dynamic balancing can be scheduled at our partner workshop." },
    ],
    metaTitle: "Tyre Replacement at Home | Doorstep Tyre Fitting | Fiixup",
    metaDescription: "New tyre supplied & fitted at your doorstep. Bikes & cars. MRF, CEAT, Apollo & more. Includes balancing. Starting ₹499. Book now.",
    metaKeywords: "tyre replacement at home, doorstep tyre fitting, tyre change at home, mobile tyre fitting near me, tyre replacement near me, car tyre change near me, bike tyre replacement at home, tyre fitting at home, new tyre at home, doorstep tyre change, tyre supply and fit near me, wheel balancing at home",
  },

  // ══ ROADSIDE ═══════════════════════════════════════════════════════════════

  {
    slug: "roadside-assistance-near-me",
    title: "Roadside Assistance Near Me | 24/7 Emergency Vehicle Help",
    shortTitle: "Roadside Assistance",
    category: "roadside",
    icon: "MapPin",
    tagline: "Broken down? One call brings help to your exact location in 30 minutes.",
    description:
      "Fiixup's 24/7 emergency roadside assistance service covers breakdown repair, battery jump start, tyre puncture, towing, and on-site mechanical fixes for both bikes and cars across Bengaluru, Chennai, Hyderabad, and Mumbai. Our certified technician is dispatched immediately to your GPS location. We fix most breakdowns on the spot. Transparent pricing, live technician tracking. Available 365 days including holidays. Starting from ₹299.",
    price: "₹299",
    duration: "30–60 min arrival",
    features: [
      "Emergency breakdown repair on the spot",
      "Battery jump start & replacement",
      "Tyre puncture repair & spare fitting",
      "Towing arranged if repair not possible",
      "Fuel delivery for vehicles that ran out of petrol",
      "Covers city roads, highways & expressways",
      "24/7 — 365 days including all public holidays",
    ],
    faqs: [
      { q: "What does roadside assistance near me include?", a: "Our roadside assistance covers jump start, puncture repair, on-site breakdown repair, towing, spare tyre fitting, and minor mechanical fixes — all at your location." },
      { q: "How fast does roadside assistance arrive?", a: "Typically within 30–60 minutes in city areas. For highway breakdowns we dispatch the nearest available technician immediately." },
      { q: "Is roadside assistance available on highways and expressways?", a: "Yes. We cover all major national highways, outer ring roads, and expressways around our operating cities." },
      { q: "Is roadside assistance available on public holidays?", a: "Yes. Fiixup operates 24/7, 365 days a year — including Diwali, Pongal, Holi, Republic Day, and all other holidays." },
      { q: "Can I get roadside assistance for both my bike and car?", a: "Yes. Our roadside assistance covers all two-wheelers and four-wheelers — from Honda Activa scooters to Tata SUVs and Royal Enfield motorcycles." },
    ],
    metaTitle: "Roadside Assistance Near Me | 24/7 Emergency Help — Fiixup",
    metaDescription: "Broken down in Bengaluru or Chennai? 24/7 roadside assistance for bikes & cars. Jump start, puncture, towing & on-site repair. Arrives in 30 min. Starting ₹299.",
    metaKeywords: "roadside assistance near me, emergency roadside assistance Bengaluru, 24 hour roadside assistance Chennai, roadside help near me, car breakdown assistance near me, vehicle breakdown service near me, emergency car help near me, roadside recovery near me, car broke down near me, breakdown service near me",
  },

  {
    slug: "car-breakdown-service",
    title: "Car Breakdown Service Near Me | 24/7 Emergency Repair",
    shortTitle: "Car Breakdown Service",
    category: "roadside",
    icon: "ShieldAlert",
    tagline: "Car broken down? Our mechanic reaches you in 30 minutes, day or night.",
    description:
      "Fiixup's 24/7 car breakdown service dispatches a certified mobile mechanic to your location immediately — whether you've stalled in traffic, broken down on a highway, or your car simply won't start. Our technician carries tools and common parts to diagnose and fix most car breakdowns on the spot. If the repair requires a workshop, we arrange safe towing and stay with you. All car brands. Starting from ₹299.",
    price: "₹299",
    duration: "30–90 min",
    features: [
      "Emergency on-site breakdown diagnosis & repair",
      "Battery jump start & replacement",
      "Overheating — coolant top-up & diagnosis",
      "Tyre puncture repair & spare fitting",
      "Fuel system issue diagnosis",
      "Towing arranged if needed",
      "All car brands & highway coverage",
    ],
    faqs: [
      { q: "My car just stopped in the middle of the road — what should I do?", a: "Steer safely to the side, switch on hazard lights, and call Fiixup immediately. Do not leave the car in a moving lane." },
      { q: "Can you fix a car breakdown on the highway?", a: "Yes. We cover all major highways and expressways. Park in the emergency lane, switch on hazard lights, and call us." },
      { q: "My car is overheating — should I call you?", a: "Yes. Pull over immediately and switch off the engine. Do not open the radiator cap while hot. Call Fiixup — overheating causes severe engine damage if driven further." },
      { q: "Is car breakdown service available at night?", a: "Yes. Our service is available 24/7 with no extra charge for night call-outs including late nights, early mornings, and weekends." },
    ],
    metaTitle: "Car Breakdown Service Near Me | 24/7 Emergency Repair",
    metaDescription: "Car broken down? 24/7 emergency car breakdown service. Mobile mechanic at your location — highway or city. All brands. Starting ₹299. Call now.",
    metaKeywords: "car breakdown service near me, car broke down near me, emergency car repair near me, car breakdown near me, car won't start near me, mobile car mechanic near me, 24 hour car mechanic near me, car stalled near me, car breakdown help near me, emergency mechanic near me, car broken down on highway",
  },

  // ══ MOBILE MECHANIC ════════════════════════════════════════════════════════

  {
    slug: "mobile-mechanic-near-me",
    title: "Mobile Mechanic Near Me | Doorstep Car & Bike Repair",
    shortTitle: "Mobile Mechanic",
    category: "mechanic",
    icon: "Wrench",
    tagline: "A certified mechanic at your door — faster and cheaper than a garage.",
    description:
      "Fiixup's on-demand mobile mechanic service sends a certified vehicle technician to your home, office, apartment, or roadside for car and bike repair. Our mobile mechanics carry professional-grade tools, OBD2 diagnostic equipment, and common spare parts. Whether you need an oil change, brake service, electrical repair, engine diagnostics, AC service, or a tyre change — we complete most jobs at your location in one visit. Available 24/7 in Bengaluru and Chennai. Starting from ₹299.",
    price: "₹299",
    duration: "30 min–3 hrs",
    features: [
      "Certified & background-verified mechanics",
      "Fully equipped service van — tools & common parts",
      "OBD2 diagnostic scanner for cars",
      "Oil change, brake, AC, electrical & more",
      "Live mechanic tracking after booking",
      "Transparent quote before work starts",
      "30-day warranty on all repairs",
    ],
    pricing: {
      rows: [
        { label: "Mechanic Call-Out + Diagnosis",         priceFrom: 299, highlight: true },
        { label: "Oil Change (bike)",                     priceFrom: 399 },
        { label: "Oil Change (car)",                      priceFrom: 599 },
        { label: "Brake Pad Replacement (per axle, car)", priceFrom: 799 },
        { label: "Engine Diagnostics (OBD2 scan)",        priceFrom: 399 },
        { label: "Electrical Fault Diagnosis",            priceFrom: 399 },
        { label: "Full Car Service",                      priceFrom: 1999 },
      ] as PricingRow[],
      competitors: DEFAULT_COMPETITORS,
      disclaimer: "All prices quoted before work starts. No work begins without your approval.",
    },
    benefits: [
      { icon: "Award",  title: "Certified & Verified",  body: "Every Fiixup mechanic is trained, certified, and background-verified. See their profile before they arrive." },
      { icon: "Tag",    title: "Often Cheaper",          body: "Lower overhead than garages means competitive pricing — plus you save towing fees and your time." },
      { icon: "Shield", title: "30-Day Warranty",        body: "Every repair comes with a 30-day warranty. Issue recurs? We fix it free." },
      { icon: "Award",  title: "Full Transparency",      body: "All work done in front of you. Ask questions, see parts, verify work — no black box." },
    ],
    carBrands: CAR_BRANDS_RICH,
    bikeBrands: BIKE_BRANDS_RICH,
    testimonials: [
      { name: "Rahul G.", location: "Bellandur, Bengaluru", vehicle: "Volkswagen Polo",  rating: 5, review: "Booked a mobile mechanic for my Polo's rattling issue. The mechanic arrived with an OBD2 scanner, diagnosed a loose heat shield in 10 minutes, and fixed it in 20. Excellent.", date: "March 2026", verified: true },
      { name: "Priya D.", location: "Perambur, Chennai",    vehicle: "Honda Activa",     rating: 5, review: "Full bike service done in the building parking. Professional, clean, and cheaper than the nearby garage. Will book again.", date: "April 2026", verified: true },
    ],
    guide: {
      title: "Mobile Mechanic vs Garage: Why Doorstep Repairs Win Every Time",
      intro: "The traditional model of taking your car or bike to a garage is broken in Indian cities. Traffic adds 45–90 minutes to any garage trip. Queues mean you lose half a day. And without being there to supervise, you cannot verify what work was done. Mobile mechanics eliminate every single one of these problems.",
      sections: [
        {
          heading: "Mobile Mechanic vs Traditional Garage: The Complete Comparison",
          body: "Time: A traditional garage visit in Bengaluru or Chennai costs 1–4 hours minimum including travel, queuing, and waiting. A Fiixup mobile mechanic is at your door in 30–60 minutes and completes most jobs while you continue your day. Cost: Garages have high overheads — rent, electricity, staff — embedded in their labour charges. Mobile mechanics have lower overheads and typically charge 15–25% less. Quality: Fiixup mechanics are certified with a 30-day warranty. Transparency: In a garage, you cannot see what is being done to your vehicle. With a mobile mechanic, all work is done in front of you. Convenience: No transport arrangement, no time off work needed.",
          tips: [
            "For complex jobs like full engine rebuilds, a specialist workshop is better — mobile mechanics excel at maintenance and common repairs.",
            "Ask for a digital receipt listing all parts used and work done — Fiixup provides this as standard.",
          ],
        },
        {
          heading: "What Can a Mobile Mechanic Do at Your Doorstep?",
          body: "Modern mobile mechanics handle the vast majority of common vehicle maintenance and repair. All fluid services (oil change, brake fluid flush, coolant service). Battery services (jump start, battery replacement, alternator check). Brake service (pad replacement, disc inspection, hydraulic bleeding). Tyre services (puncture repair, tyre replacement). Electrical diagnosis and repair using OBD2 scanner. AC service (refrigerant check, compressor inspection). Engine diagnosis and minor repairs. Chain and suspension service for bikes. Full periodic services. Jobs requiring a workshop include full engine rebuilds, major transmission work, structural bodywork, and paint — everything else is typically possible at your doorstep.",
        },
        {
          heading: "How to Choose a Reliable Mobile Mechanic Service",
          body: "Verified mechanics with certified training. Transparent pricing before work begins. Warranty on repairs. Digital invoice and parts documentation. Customer reviews with 4.5+ rating and substantial volume. Genuine or OEM-grade parts. 24/7 availability. Fiixup meets all of these criteria and publishes the mechanic's profile including name, photo, rating, and experience before they arrive.",
        },
      ],
      conclusion: "Mobile mechanic services have transformed vehicle ownership in Indian cities. With Fiixup, you get a certified mechanic at your door in 30–60 minutes — anywhere in Bengaluru or Chennai — with full transparency, a 30-day warranty, and pricing often lower than a garage. Book at fiixup.in or call +91 8197459732.",
    },
    relatedSlugs: ["car-service-at-home", "bike-service-at-home", "car-engine-diagnostics"],
    faqs: [
      { q: "Is a mobile mechanic reliable?", a: "Yes. Fiixup's mobile mechanics are certified, background-verified, and carry professional-grade tools. Every repair comes with a 30-day warranty." },
      { q: "Is a mobile mechanic cheaper than a garage?", a: "Usually yes. Mobile mechanics have lower overhead costs. You also save towing fees and time. All prices are quoted transparently before work starts." },
      { q: "What jobs can a mobile mechanic do?", a: "Most common repairs: oil change, brake service, battery replacement, AC re-gas, puncture repair, chain service, electrical diagnosis, engine diagnostics, and full servicing." },
      { q: "Can I see my mechanic's profile before they arrive?", a: "Yes. After booking you receive your assigned mechanic's name, photo, experience level, and customer rating." },
      { q: "How do I book a mobile mechanic near me?", a: "Book via fiixup.in, call +91 8197459732, or WhatsApp us. We confirm within minutes and share a live ETA." },
    ],
    metaTitle: "Mobile Mechanic Near Me | Doorstep Car & Bike Repair — Fiixup",
    metaDescription: "Book a certified mobile mechanic in Bengaluru or Chennai. Doorstep car & bike repair at home or office. 30-day warranty. Cheaper than a garage. Starting ₹299. Book now.",
    metaKeywords: "mobile mechanic near me, doorstep mechanic Bengaluru, mechanic at home Chennai, on demand mechanic near me, mobile car mechanic near me, mobile bike mechanic near me, home mechanic near me, mechanic near me, on site mechanic near me, car mechanic near me, bike mechanic near me",
  },

];

export default services;

// ── Typed helper functions ────────────────────────────────────────────────────

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(
  category: ServiceData["category"]
): ServiceData[] {
  return services.filter((s) => s.category === category);
}

// Pre-filtered exports used throughout the app
export const bikeServices     = getServicesByCategory("bike");
export const carServices      = getServicesByCategory("car");
export const towingServices   = getServicesByCategory("towing");
export const batteryServices  = getServicesByCategory("battery");
export const punctureServices = getServicesByCategory("puncture");
export const roadsideServices = getServicesByCategory("roadside");
export const mechanicServices = getServicesByCategory("mechanic");

// All services in SEO priority order (used in sitemap, generateStaticParams)
export const allServicesOrdered: ServiceData[] = [
  ...bikeServices,
  ...carServices,
  ...towingServices,
  ...batteryServices,
  ...punctureServices,
  ...roadsideServices,
  ...mechanicServices,
];
