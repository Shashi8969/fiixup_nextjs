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
    slug: "bike-engine-repair",
    title: "Bike Engine Repair at Doorstep | All Brands",
    shortTitle: "Bike Engine Repair",
    category: "bike",
    icon: "Settings",
    tagline: "Knocking engine? Power loss? We diagnose & fix it on the spot.",
    description:
      "Fiixup's mobile bike engine repair service sends a certified two-wheeler mechanic to your location to diagnose and repair engine problems for all motorcycle and scooter brands. Whether you hear a knocking sound, notice power loss, see excessive smoke, feel vibrations, or experience oil leaks — our technicians carry diagnostic tools and common engine parts to fix most issues on the spot. We service all brands: Royal Enfield, Honda, Bajaj, TVS, KTM, Yamaha, Hero, and more. For major overhauls, we arrange towing to our partner workshop. Starting from ₹599.",
    price: "₹599",
    duration: "1–4 hrs",
    features: [
      "Engine noise & vibration diagnosis",
      "Piston, valve & gasket inspection",
      "Carburettor cleaning & tuning",
      "Fuel injection system service",
      "Oil leak detection & repair",
      "Overheating diagnosis & coolant service",
      "Performance tuning & power restoration",
    ],
    faqs: [
      { q: "What are signs my bike engine needs repair?", a: "Knocking or tapping sounds, excessive smoke from exhaust, sudden power loss, abnormal vibrations, engine overheating, or oil leaking onto the ground. Don't delay — call Fiixup." },
      { q: "Can you repair scooter engines too?", a: "Yes. We repair engines for all scooters — Honda Activa, TVS Jupiter, Suzuki Access, Yamaha Fascino, Bajaj Chetak, and more." },
      { q: "My bike engine is making a knocking noise — is it serious?", a: "Yes. Knocking usually signals low oil, worn piston rings, or a loose component. Don't ride further — call our mechanic for an immediate on-site diagnosis." },
      { q: "How long does bike engine repair take?", a: "Minor repairs (carb cleaning, valve adjustment) take 1–2 hours on-site. Major engine work may require a follow-up or workshop visit which we arrange." },
    ],
    metaTitle: "Bike Engine Repair at Doorstep | All Brands | Fiixup",
    metaDescription: "Bike engine knocking or losing power? Expert doorstep engine repair for all brands — Royal Enfield, Bajaj, Honda, KTM. 24/7 service. Starting ₹599.",
    metaKeywords: "bike engine repair near me, motorcycle engine repair at home, two wheeler engine repair, doorstep bike engine repair, bike engine knocking repair, scooter engine repair near me, Royal Enfield engine repair, bike engine overhaul near me, mobile bike engine mechanic, motorcycle engine service near me",
  },

  {
    slug: "bike-brake-clutch-repair",
    title: "Bike Brake & Clutch Repair at Doorstep",
    shortTitle: "Bike Brake & Clutch",
    category: "bike",
    icon: "Settings",
    tagline: "Spongy brakes or stiff clutch? Fixed safely at your doorstep.",
    description:
      "Fiixup's doorstep bike brake and clutch repair service keeps your two-wheeler safe and responsive. Worn brakes are a leading cause of bike accidents in India — our certified technicians inspect, adjust, and replace brake pads, shoes, discs, and clutch cables at your home or office. We handle drum brakes, hydraulic disc brakes, and all clutch types for every popular Indian bike and scooter brand. Starting from ₹399.",
    price: "₹399",
    duration: "1–2 hrs",
    features: [
      "Brake pad & shoe inspection & replacement",
      "Hydraulic disc brake bleeding & fluid top-up",
      "Drum brake adjustment & lining replacement",
      "Clutch cable adjustment & replacement",
      "Clutch plate wear inspection",
      "Brake lever & perch repair",
      "All bike & scooter brands supported",
    ],
    faqs: [
      { q: "How do I know if my bike brakes need replacement?", a: "Squealing or grinding sounds, reduced stopping power, brake lever or pedal going all the way down, or visible wear on brake pads are clear signs." },
      { q: "Do you service hydraulic disc brakes?", a: "Yes. We bleed hydraulic disc brakes, top up brake fluid, and replace pads for all disc brake-equipped bikes and scooters." },
      { q: "Can clutch issues be fixed at home?", a: "Cable-related clutch issues are fixed on the spot in under an hour. Clutch plate replacement is also possible at your doorstep for most bike models." },
      { q: "How much does bike brake pad replacement cost?", a: "Brake pad replacement starts from ₹199 per axle excluding parts. The technician quotes the full cost including parts before starting work." },
    ],
    metaTitle: "Bike Brake & Clutch Repair at Doorstep | Fiixup",
    metaDescription: "Spongy brakes or stiff clutch? Doorstep bike brake pad replacement & clutch repair. All brands. Safe, fast & affordable. Starting ₹399. Book now.",
    metaKeywords: "bike brake repair near me, bike brake pad replacement at home, two wheeler brake service, clutch repair near me, bike disc brake repair, motorcycle brake service near me, bike clutch adjustment near me, doorstep brake repair, bike brake pad replacement cost, scooter brake service near me",
  },

  {
    slug: "bike-electrical-repair",
    title: "Bike Electrical Repair at Doorstep | Battery, Lights & Wiring",
    shortTitle: "Bike Electrical Repair",
    category: "bike",
    icon: "Zap",
    tagline: "Battery, lights, wiring — all electrical issues fixed at your location.",
    description:
      "Fiixup provides complete bike electrical repair at your doorstep — from dead batteries and faulty wiring to broken headlights, indicator problems, and starter motor failures. Our certified technicians carry multi-meters, battery testers, and electrical parts for all popular two-wheeler brands. Most electrical issues are diagnosed and fixed on the spot. Available 24/7 across Bengaluru, Chennai, Hyderabad, and Mumbai. Starting from ₹299.",
    price: "₹299",
    duration: "30–90 min",
    features: [
      "Battery health test & replacement",
      "Self-start & starter motor repair",
      "Headlight, tail light & indicator repair",
      "Horn & switch repair",
      "Wiring short circuit diagnosis & repair",
      "Speedometer & instrument cluster fix",
      "Charging system (regulator/rectifier) check",
    ],
    faqs: [
      { q: "My bike won't start — can you fix it at home?", a: "Yes. Most no-start issues are electrical — dead battery, faulty starter motor, or a blown fuse — and are resolved at your doorstep within an hour." },
      { q: "Do you carry batteries for all bike brands?", a: "We carry batteries for Honda, Bajaj, TVS, Yamaha, Royal Enfield, KTM, Hero, and most popular bike models." },
      { q: "My bike's self-start is not working but kickstart works — what's the issue?", a: "This usually points to a weak battery, a faulty starter motor, or a bad relay. Our mechanic tests all three on the spot." },
      { q: "How much does bike electrical repair cost?", a: "Electrical diagnosis starts from ₹99. Repairs like battery replacement, headlight fix, or wiring repair are priced separately based on parts required." },
    ],
    metaTitle: "Bike Electrical Repair at Doorstep | Battery & Wiring Fix",
    metaDescription: "Bike battery dead or lights not working? Doorstep bike electrical repair — battery, wiring, self-start & more. All brands. 24/7. Starting ₹299.",
    metaKeywords: "bike electrical repair near me, bike battery replacement at home, two wheeler electrical repair, bike self start not working, bike headlight repair near me, motorcycle electrical repair near me, bike wiring repair, bike battery dead repair near me, doorstep bike electrical service, bike battery jumpstart near me",
  },

  {
    slug: "bike-suspension-tyre-service",
    title: "Bike Suspension & Tyre Service at Doorstep",
    shortTitle: "Suspension & Tyres",
    category: "bike",
    icon: "Settings",
    tagline: "Rough ride or wobbly wheels? Fixed at your location.",
    description:
      "Fiixup provides doorstep bike suspension inspection, fork oil change, shock absorber replacement, and tyre service for all motorcycle and scooter models. If you feel excessive bouncing, hear clunking over bumps, or notice your bike pulling to one side, our mobile mechanic comes to you with tools and parts to restore ride quality. Tyre replacement and tubeless repair also available. Starting from ₹399.",
    price: "₹399",
    duration: "1–3 hrs",
    features: [
      "Front fork inspection & oil change",
      "Rear shock absorber inspection & replacement",
      "Tyre inspection, rotation & pressure check",
      "Tubeless tyre puncture repair",
      "Tyre replacement (all brands available)",
      "Wheel balancing",
      "Pothole & road damage assessment",
    ],
    faqs: [
      { q: "How do I know if my bike suspension needs repair?", a: "Signs include excessive bouncing, clunking sounds over bumps, oil leaking from forks, uneven tyre wear, or the bike feeling unstable at speed." },
      { q: "Can you replace bike tyres at my doorstep?", a: "Yes. We carry tyre-changing equipment and stock tyres for popular bike and scooter models. We fit and balance at your location." },
      { q: "How often should front fork oil be changed?", a: "Every 10,000–15,000 km or if you notice oil leaking from the forks or the front feels spongy." },
    ],
    metaTitle: "Bike Suspension & Tyre Service at Doorstep | Fiixup",
    metaDescription: "Rough ride or wobbly wheels? Doorstep bike suspension repair & tyre service. Fork oil, shock absorbers, tyre replacement. All brands. Starting ₹399.",
    metaKeywords: "bike suspension repair near me, motorcycle suspension service at home, bike shock absorber replacement, bike tyre replacement near me, doorstep bike tyre service, two wheeler suspension repair, bike fork oil change at home, motorcycle tyre fitting near me, bike tyre change at home, scooter suspension repair near me",
  },

  {
    slug: "bike-chain-sprocket-service",
    title: "Bike Chain & Sprocket Service at Doorstep",
    shortTitle: "Chain & Sprocket",
    category: "bike",
    icon: "Settings",
    tagline: "Loose, rusted, or stretched chain? Replaced in minutes at your location.",
    description:
      "A worn or poorly lubricated chain is one of the most common causes of power loss, jerky acceleration, and dangerous riding. Fiixup's doorstep bike chain and sprocket service covers cleaning, lubrication, tension adjustment, and complete chain-sprocket kit replacement for all motorcycle and scooter brands. Starting from ₹199.",
    price: "₹199",
    duration: "30–60 min",
    features: [
      "Chain cleaning & degreasing",
      "Chain lubrication with quality chain lube",
      "Chain tension adjustment",
      "Chain wear measurement & advice",
      "Full chain & sprocket kit replacement",
      "Sprocket bolt torque check",
      "All bike & scooter brands covered",
    ],
    faqs: [
      { q: "How do I know if my bike chain needs replacement?", a: "A stretched chain sags more than 2–3 cm at mid-point, skips gears, makes a slapping sound, or shows rusting and tight links. Our mechanic measures it accurately." },
      { q: "How much does bike chain replacement cost?", a: "Chain cleaning and lubrication starts from ₹199. Full chain and sprocket kit replacement starts from ₹699 including parts, depending on the bike model." },
      { q: "How often should I lubricate my bike chain?", a: "Every 500–700 km in dry conditions. More frequently after rain or in dusty environments." },
    ],
    metaTitle: "Bike Chain & Sprocket Service at Doorstep | Fiixup",
    metaDescription: "Loose or rusted bike chain? Doorstep chain cleaning, lubrication & sprocket replacement. All brands. Fast & affordable. Starting ₹199. Book now.",
    metaKeywords: "bike chain replacement near me, motorcycle chain service at home, bike chain lubrication near me, two wheeler chain sprocket replacement, bike chain adjustment near me, doorstep bike chain service, bike chain kit replacement near me, motorcycle chain repair near me, scooter chain service near me, bike chain cost",
  },

  {
    slug: "bike-regular-maintenance-plan",
    title: "Scheduled Bike Maintenance Plan | Doorstep Service",
    shortTitle: "Bike Maintenance Plan",
    category: "bike",
    icon: "Shield",
    tagline: "Keep your bike in peak condition with a scheduled doorstep maintenance plan.",
    description:
      "Fiixup's scheduled bike maintenance plan delivers regular two-wheeler servicing to your home or office on a timetable that suits you — monthly, quarterly, or kilometre-based. Regular maintenance prevents breakdowns, improves fuel efficiency by up to 15%, and extends your bike's lifespan. Our technicians track your service history and send WhatsApp reminders. Starting from ₹449 per visit.",
    price: "₹449",
    duration: "1–2 hrs",
    features: [
      "Full bike health check & written report",
      "Engine oil & filter change",
      "Air filter service",
      "Chain, tyre & brake service",
      "Service history tracking",
      "WhatsApp reminders before next service",
      "Monthly, quarterly & km-based plans available",
    ],
    faqs: [
      { q: "Can I set up a recurring bike maintenance schedule?", a: "Yes. We offer monthly, quarterly, and kilometre-based maintenance plans. We track your bike's history and remind you when service is due." },
      { q: "Does regular maintenance improve fuel efficiency?", a: "Yes. A well-maintained bike typically delivers 10–15% better fuel efficiency due to proper oil viscosity, clean air filter, and correct tyre pressure." },
      { q: "Can I pause or cancel my maintenance plan?", a: "Yes. No lock-in contracts. You can pause, reschedule, or cancel at any time with 24 hours' notice." },
    ],
    metaTitle: "Scheduled Bike Maintenance Plan | Doorstep Service",
    metaDescription: "Regular bike maintenance at your doorstep. Monthly & km-based plans. All brands. Reminders included. Prevent breakdowns. Starting ₹449.",
    metaKeywords: "bike maintenance plan near me, scheduled bike service at home, two wheeler maintenance package, motorcycle maintenance plan, doorstep bike maintenance, bike service subscription, regular bike servicing near me, bike upkeep service near me, preventive bike maintenance, two wheeler annual maintenance contract",
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
    slug: "car-oil-change-at-home",
    title: "Car Oil Change at Home | Doorstep Engine Oil Service",
    shortTitle: "Car Oil Change",
    category: "car",
    icon: "Droplets",
    tagline: "Fresh engine oil in 45 minutes — we come to your home or office.",
    description:
      "Fiixup's doorstep car oil change service sends a certified mechanic to your location with the manufacturer-recommended engine oil grade for your car model. We carry 5W-30, 5W-40, 10W-40, and 15W-40 grades for all Indian car models, drain the old oil, replace the oil filter, and top up all related fluids in under an hour. Starting from ₹599.",
    price: "₹599",
    duration: "45–60 min",
    features: [
      "Engine oil drain & refill (manufacturer-recommended grade)",
      "Oil filter replacement",
      "Engine oil level verification after fill",
      "Coolant & brake fluid level check",
      "Synthetic, semi-synthetic & mineral oil options",
      "Waste oil disposal — zero mess left behind",
      "Next service reminder sticker fitted",
    ],
    faqs: [
      { q: "How often should I change my car oil?", a: "Every 5,000–7,500 km for mineral oil, or every 8,000–10,000 km for synthetic oil. Always follow your car manufacturer's recommendation." },
      { q: "Which oil grade is right for my car?", a: "Most modern Indian petrol cars use 5W-30 or 5W-40. Diesel cars typically use 15W-40. Our technician confirms the correct grade for your exact car before filling." },
      { q: "How much does a doorstep car oil change cost?", a: "Starting from ₹599 including labour. Oil and filter are charged separately. Full pricing confirmed before work starts." },
      { q: "Can you do car oil change in apartment basement parking?", a: "Yes. We carry spill-free drain pans and waste oil bags. Zero residue left in your parking space." },
    ],
    metaTitle: "Car Oil Change at Home | Doorstep Engine Oil Service",
    metaDescription: "Get your car oil changed at home or office. Fast doorstep engine oil service for all car models. Correct oil grade guaranteed. Starting ₹599. Book now.",
    metaKeywords: "car oil change at home, doorstep car oil change, engine oil change near me, mobile car oil change, car engine oil service near me, oil change at home near me, doorstep engine oil change, car oil change cost, car oil change near me, home engine oil service, oil change and filter replacement near me",
  },

  {
    slug: "car-brake-service",
    title: "Car Brake Service & Brake Pad Replacement at Home",
    shortTitle: "Car Brake Service",
    category: "car",
    icon: "Car",
    tagline: "Safe brakes save lives — professional brake service at your doorstep.",
    description:
      "Fiixup provides complete doorstep car brake inspection, brake pad replacement, disc rotor check, and brake fluid flush for all car makes and models. Our certified technicians arrive with brake pads, shoes, and brake fluid for your specific car model and complete the full brake service at your home or office. Starting from ₹799.",
    price: "₹799",
    duration: "1–2 hrs",
    features: [
      "Full brake system inspection (front & rear)",
      "Brake pad & disc replacement",
      "Drum brake shoe inspection & replacement",
      "Brake fluid flush & refill",
      "ABS sensor inspection",
      "Brake calliper cleaning & lubrication",
      "Post-service brake performance test",
    ],
    faqs: [
      { q: "How do I know if my car brakes need servicing?", a: "Squealing or grinding sounds when braking, a spongy or low brake pedal, the car pulling to one side, or longer stopping distances are warning signs." },
      { q: "How much does car brake pad replacement cost?", a: "Brake pad replacement starts from ₹799 per axle including labour. Parts are charged based on your car model — quoted before work begins." },
      { q: "How long does a doorstep brake service take?", a: "Typically 1–2 hours for a full front and rear brake service at your location." },
      { q: "Do you use original brake pads?", a: "We use OEM-grade or high-quality aftermarket brake pads matched to your car's specification. Genuine OEM parts can be sourced on request." },
    ],
    metaTitle: "Car Brake Service & Pad Replacement at Home | Fiixup",
    metaDescription: "Car brakes squealing or spongy? Expert doorstep brake pad replacement & brake service. All car models. 24/7 available. Starting ₹799. Book now.",
    metaKeywords: "car brake service near me, brake pad replacement at home, car brake repair near me, doorstep brake service, car brake pad replacement cost, car brake check near me, mobile car brake repair, disc brake service near me, car brake fluid change, brake repair near me, car brake inspection at home",
  },

  {
    slug: "car-ac-service-repair",
    title: "Car AC Service & Repair at Doorstep | Gas Recharge",
    shortTitle: "Car AC Service",
    category: "car",
    icon: "Wind",
    tagline: "AC not cooling? Gas recharge & full AC repair done at your location.",
    description:
      "Fiixup's doorstep car AC service and repair covers gas (refrigerant) recharge, compressor health check, condenser and evaporator inspection, cabin air filter replacement, and cooling performance testing — all at your home or office. Our technicians carry R-134a and R-1234yf refrigerant for all car models and complete most AC re-gassing and repairs in under 90 minutes. Starting from ₹899.",
    price: "₹899",
    duration: "1–2 hrs",
    features: [
      "AC refrigerant gas recharge (R-134a / R-1234yf)",
      "Compressor health & pressure check",
      "Condenser & evaporator inspection",
      "AC leak detection & repair",
      "Cabin air filter cleaning or replacement",
      "AC cooling performance test",
      "Blower & vent inspection",
    ],
    faqs: [
      { q: "Why is my car AC not cooling?", a: "The most common causes are low refrigerant gas, a leaking AC system, a faulty compressor, or a dirty condenser. Our technician diagnoses the exact cause at your location." },
      { q: "How much does car AC gas recharge cost?", a: "AC gas recharge starts from ₹899. If additional parts like the compressor or condenser need replacement, those are quoted separately before work begins." },
      { q: "How often should car AC gas be recharged?", a: "In ideal conditions, car AC gas lasts 3–5 years. If cooling reduces before that, there may be a slow refrigerant leak that needs fixing." },
      { q: "Do you carry refrigerant gas for all car models?", a: "Yes. We carry R-134a for most cars manufactured before 2017 and R-1234yf for newer models. We confirm compatibility before service." },
    ],
    metaTitle: "Car AC Service & Gas Recharge at Home | Fiixup",
    metaDescription: "Car AC not cooling? Doorstep AC service, gas recharge & repair for all car models. 24/7 available. Starting ₹899. Book now.",
    metaKeywords: "car AC service near me, car AC repair at home, car AC gas recharge near me, car AC not cooling repair, AC service near me, doorstep AC repair, car air conditioning service near me, car AC gas refill near me, mobile AC repair car, car AC check near me, car AC compressor repair near me",
  },

  {
    slug: "car-engine-diagnostics",
    title: "Car Engine Diagnostics at Home | OBD2 Scan & Check Engine Light",
    shortTitle: "Engine Diagnostics",
    category: "car",
    icon: "Search",
    tagline: "Check engine light on? We scan & diagnose at your location.",
    description:
      "Fiixup's doorstep car engine diagnostic service uses professional-grade OBD2 scanners to read fault codes, identify sensor failures, and detect performance issues — all at your location. A check engine light should never be ignored. Our certified technicians provide a transparent diagnostic report and fix most issues on the spot. Honest diagnosis, no guesswork, no unnecessary upselling. Starting from ₹399.",
    price: "₹399",
    duration: "30–60 min",
    features: [
      "Professional OBD2 computer scan",
      "Full fault code reading & explanation",
      "Engine, transmission & ABS system check",
      "Emission system diagnosis",
      "Fuel system & oxygen sensor check",
      "Written diagnostic report provided",
      "On-spot repair where possible",
    ],
    faqs: [
      { q: "What does the check engine light mean?", a: "It can indicate anything from a loose fuel cap (minor) to an oxygen sensor failure, catalytic converter issue, or engine misfire (serious). Our OBD2 scan tells you the exact code and meaning." },
      { q: "Can I drive with the check engine light on?", a: "If the light is solid (not flashing), it's usually safe for short distances. A flashing check engine light means stop driving immediately — it indicates active engine damage." },
      { q: "Do you fix the issue after diagnosing?", a: "Yes. Most common issues — sensor replacements, loose connections, minor repairs — are fixed on the spot. Complex repairs are quoted and scheduled." },
      { q: "Will the check engine light go away after fixing?", a: "Yes. After fixing the root cause, our technician clears the fault codes with the OBD2 scanner and verifies the light has gone off." },
    ],
    metaTitle: "Car Engine Diagnostics at Home | OBD2 Scan | Fiixup",
    metaDescription: "Check engine light on? Expert OBD2 car engine diagnostics at your doorstep. Honest report. All car models. Starting ₹399. Book now.",
    metaKeywords: "car engine diagnostics near me, OBD2 scan near me, check engine light repair near me, car diagnostic service at home, car fault code reading near me, mobile car diagnostics, car computer scan near me, engine diagnostic test at home, car warning light check near me, car engine check near me",
  },

  {
    slug: "car-general-repair",
    title: "Car Repair at Home | Doorstep Car Mechanic Service",
    shortTitle: "Car General Repair",
    category: "car",
    icon: "Wrench",
    tagline: "Expert car repair at your doorstep — no garage visit needed.",
    description:
      "Fiixup's doorstep car repair service covers everything from minor fixes to major mechanical repairs at your home, office, or roadside. Our certified mobile car mechanics handle engine work, suspension repair, steering issues, electrical faults, clutch service, and more for all car brands. We carry a fully stocked service van with common parts. Honest quotes before work starts. 30-day warranty on all repairs. Starting from ₹499.",
    price: "₹499",
    duration: "1–4 hrs",
    features: [
      "Engine, suspension & steering repair",
      "Clutch & gearbox inspection",
      "Electrical fault diagnosis & repair",
      "Exhaust & emission system service",
      "Cooling system & radiator repair",
      "Genuine & OEM spare parts used",
      "30-day service warranty",
    ],
    faqs: [
      { q: "Can you handle all types of car repairs at home?", a: "We handle most repairs on-site including engine, electrical, brakes, suspension, and more. For major overhauls we arrange towing to our partner workshop." },
      { q: "Do you carry spare parts?", a: "Yes. Our service vans are stocked with common parts. For rare or model-specific parts we source them same-day." },
      { q: "How much does car repair at home cost?", a: "Starting from ₹499 for minor repairs. All costs — labour and parts — are itemised and quoted before any work begins." },
      { q: "Which car brands do you support?", a: "All popular brands — Maruti, Hyundai, Tata, Honda, Toyota, Kia, MG, Mahindra, Volkswagen, Skoda, Renault, Nissan, and more." },
    ],
    metaTitle: "Car Repair at Home | Doorstep Car Mechanic | Fiixup",
    metaDescription: "Expert car repair at your home or office. Mobile car mechanic for all brands — Maruti, Hyundai, Tata & more. 30-day warranty. Starting ₹499. Book now.",
    metaKeywords: "car repair at home, doorstep car mechanic, mobile car mechanic near me, car mechanic at home near me, car repair near me, home car repair service, car mechanic near me, doorstep car repair service, mobile mechanic near me, on demand car mechanic, car repair service near me, car general repair at home",
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
