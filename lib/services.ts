// lib/data/services.ts
//
// SEO STRATEGY:
//  • Service priority: Bike → Car → Towing → Battery → Puncture → Roadside → Mechanic
//  • metaTitle: primary keyword first, under 60 characters
//  • metaDescription: 140–160 chars, includes action verb + keyword + geo hint
//  • metaKeywords: 8–12 high-traffic "near me" + symptom + transactional terms
//  • description: natural keyword density, no stuffing, 80–120 words
//  • FAQs: mirror real Google "People Also Ask" queries for featured snippet capture
//  • Slugs: match exact high-volume search phrases (/services/bike-service-at-home etc.)
//
import type { ServiceData } from "./models/service.model";
import {
  Wrench, Car, Gauge, Droplet, Wind, Battery,
  Settings, Shield, Bike, Zap, Cog, CircuitBoard,
  Truck, AlertTriangle, MapPin, LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Wrench, Car, Gauge, Droplet, Wind, Battery,
  Settings, Shield, Bike, Zap, Cog, CircuitBoard,
  Truck, AlertTriangle, MapPin,
};

const services: ServiceData[] = [

  // ══════════════════════════════════════════════════════════════════════════
  // BIKE SERVICES  (highest traffic priority)
  // ══════════════════════════════════════════════════════════════════════════

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
    faqs: [
      {
        q: "How much does a doorstep bike service cost?",
        a: "A basic doorstep bike service starts from ₹349. Full service with oil change, chain, air filter, and spark plug starts from ₹599. You get a detailed quote before work begins — no hidden charges.",
      },
      {
        q: "How often should I get my bike serviced?",
        a: "Every 3,000–5,000 km or every 3 months, whichever comes first. For heavy city or delivery use, service every 2,500 km.",
      },
      {
        q: "Do you service Royal Enfield, KTM, and other premium bikes?",
        a: "Yes. We service all popular brands including Royal Enfield (Bullet, Classic, Meteor, Himalayan), KTM (Duke, Adventure, RC), Yamaha R15, and all others.",
      },
      {
        q: "Can I book same-day doorstep bike service?",
        a: "Yes. Same-day doorstep bike service slots are available across all our operating cities. Book on our website or call your city's helpline.",
      },
      {
        q: "Is the service available inside gated societies and apartments?",
        a: "Yes. Share the gate entry details when booking and our technician handles the rest. We service bikes inside apartment complexes, housing societies, and office campuses.",
      },
    ],
    metaTitle: "Bike Service at Home | Doorstep Two-Wheeler Servicing",
    metaDescription:
      "Get complete bike servicing at your doorstep. Certified mechanics for Honda, Bajaj, Royal Enfield, TVS, KTM & all brands. 24/7 available. Starting ₹349. Book now.",
    metaKeywords:
      "bike service at home, doorstep bike service, two wheeler service near me, mobile bike mechanic, bike servicing at home, motorcycle service near me, scooter service at home, bike mechanic near me, two wheeler servicing near me, bike general service, doorstep two wheeler service, home bike service",
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
    faqs: [
      {
        q: "How much does a bike oil change cost at home?",
        a: "Bike oil change starts from ₹249 including labour. Oil filter replacement is charged separately if required. Full pricing is confirmed before work begins.",
      },
      {
        q: "How often should I change my bike's engine oil?",
        a: "Every 2,000–3,000 km for mineral oil, or every 5,000–6,000 km for semi-synthetic or fully synthetic oil. Check your owner's manual for your specific model.",
      },
      {
        q: "What oil grades do you carry?",
        a: "We carry 10W-30, 10W-40, 15W-50, and 20W-50 grades suitable for all Indian bike and scooter models.",
      },
      {
        q: "Can you change oil for Royal Enfield and KTM bikes?",
        a: "Yes. We carry manufacturer-recommended oil grades for Royal Enfield (15W-50), KTM (10W-40), and all premium bike models.",
      },
    ],
    metaTitle: "Bike Oil Change at Home | Doorstep Engine Oil Service",
    metaDescription:
      "Doorstep bike oil change by certified mechanics. All brands — Activa, Pulsar, Royal Enfield, KTM, Yamaha. Done in 30 min. Starting ₹249. Book now.",
    metaKeywords:
      "bike oil change at home, doorstep bike oil change, two wheeler oil change near me, motorcycle oil change at home, bike engine oil change near me, scooter oil change at home, bike oil service near me, two wheeler oil service, bike oil change cost, mobile bike oil change",
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
      {
        q: "What are signs my bike engine needs repair?",
        a: "Knocking or tapping sounds, excessive smoke from exhaust, sudden power loss, abnormal vibrations, engine overheating, or oil leaking onto the ground are all warning signs. Don't delay — call Fiixup.",
      },
      {
        q: "Can you repair scooter engines too?",
        a: "Yes. We repair engines for all scooters — Honda Activa, TVS Jupiter, Suzuki Access, Yamaha Fascino, Bajaj Chetak, and more.",
      },
      {
        q: "My bike engine is making a knocking noise — is it serious?",
        a: "Yes. Knocking usually signals low oil, worn piston rings, or a loose component. Don't ride further — call our mechanic for an immediate on-site diagnosis.",
      },
      {
        q: "How long does bike engine repair take?",
        a: "Minor repairs (carb cleaning, valve adjustment) take 1–2 hours on-site. Major engine work may require a follow-up or workshop visit which we arrange for you.",
      },
    ],
    metaTitle: "Bike Engine Repair at Doorstep | All Brands | Fiixup",
    metaDescription:
      "Bike engine knocking or losing power? Get expert doorstep engine repair for all brands — Royal Enfield, Bajaj, Honda, KTM. 24/7 service. Starting ₹599.",
    metaKeywords:
      "bike engine repair near me, motorcycle engine repair at home, two wheeler engine repair, doorstep bike engine repair, bike engine knocking repair, scooter engine repair near me, Royal Enfield engine repair, bike engine overhaul near me, mobile bike engine mechanic, motorcycle engine service near me",
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
      {
        q: "How do I know if my bike brakes need replacement?",
        a: "Squealing or grinding sounds, reduced stopping power, brake lever or pedal going all the way down, or visible wear on brake pads are clear signs. Don't wait — book immediately.",
      },
      {
        q: "Do you service hydraulic disc brakes?",
        a: "Yes. We bleed hydraulic disc brakes, top up brake fluid, and replace pads for all disc brake-equipped bikes and scooters.",
      },
      {
        q: "Can clutch issues be fixed at home?",
        a: "Cable-related clutch issues (adjustment, cable replacement) are fixed on the spot in under an hour. Clutch plate replacement is also possible at your doorstep for most bike models.",
      },
      {
        q: "How much does bike brake pad replacement cost?",
        a: "Brake pad replacement starts from ₹199 per axle excluding parts. The technician quotes the full cost including parts before starting work.",
      },
    ],
    metaTitle: "Bike Brake & Clutch Repair at Doorstep | Fiixup",
    metaDescription:
      "Spongy brakes or stiff clutch? Doorstep bike brake pad replacement & clutch repair. All brands. Safe, fast & affordable. Starting ₹399. Book now.",
    metaKeywords:
      "bike brake repair near me, bike brake pad replacement at home, two wheeler brake service, clutch repair near me, bike disc brake repair, motorcycle brake service near me, bike clutch adjustment near me, doorstep brake repair, bike brake pad replacement cost, scooter brake service near me",
  },

  {
    slug: "bike-electrical-repair",
    title: "Bike Electrical Repair at Doorstep | Battery, Lights & Wiring",
    shortTitle: "Bike Electrical Repair",
    category: "bike",
    icon: "Zap",
    tagline: "Battery, lights, wiring — all electrical issues fixed at your location.",
    description:
      "Fiixup provides complete bike electrical repair at your doorstep — from dead batteries and faulty wiring to broken headlights, indicator problems, and starter motor failures. Our certified technicians carry multi-meters, battery testers, and electrical parts for all popular two-wheeler brands. Most electrical issues — dead self-start, dim headlight, non-functioning horn, or short circuits — are diagnosed and fixed on the spot without needing a garage visit. Available 24/7 across Bengaluru, Chennai, Hyderabad, and Mumbai. Starting from ₹299.",
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
      {
        q: "My bike won't start — can you fix it at home?",
        a: "Yes. Most no-start issues are electrical — dead battery, faulty starter motor, or a blown fuse — and are resolved at your doorstep within an hour.",
      },
      {
        q: "Do you carry batteries for all bike brands?",
        a: "We carry batteries for Honda, Bajaj, TVS, Yamaha, Royal Enfield, KTM, Hero, and most popular bike models.",
      },
      {
        q: "My bike's self-start is not working but kickstart works — what's the issue?",
        a: "This usually points to a weak battery, a faulty starter motor, or a bad relay. Our mechanic tests all three on the spot and fixes the root cause.",
      },
      {
        q: "How much does bike electrical repair cost?",
        a: "Electrical diagnosis starts from ₹99. Repairs like battery replacement, headlight fix, or wiring repair are priced separately based on parts required — all quoted before work starts.",
      },
    ],
    metaTitle: "Bike Electrical Repair at Doorstep | Battery & Wiring Fix",
    metaDescription:
      "Bike battery dead or lights not working? Doorstep bike electrical repair — battery, wiring, self-start & more. All brands. 24/7. Starting ₹299.",
    metaKeywords:
      "bike electrical repair near me, bike battery replacement at home, two wheeler electrical repair, bike self start not working, bike headlight repair near me, motorcycle electrical repair near me, bike wiring repair, bike battery dead repair near me, doorstep bike electrical service, bike battery jumpstart near me",
  },

  {
    slug: "bike-suspension-tyre-service",
    title: "Bike Suspension & Tyre Service at Doorstep",
    shortTitle: "Suspension & Tyres",
    category: "bike",
    icon: "Settings",
    tagline: "Rough ride or wobbly wheels? Fixed at your location.",
    description:
      "Fiixup provides doorstep bike suspension inspection, fork oil change, shock absorber replacement, and tyre service for all motorcycle and scooter models. India's roads — especially in Bengaluru, Mumbai, and Hyderabad — are hard on bike suspension. If you feel excessive bouncing, hear clunking over bumps, or notice your bike pulling to one side, our mobile mechanic comes to you with tools and parts to restore ride quality on the spot. Tyre replacement and tubeless repair also available. Starting from ₹399.",
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
      {
        q: "How do I know if my bike suspension needs repair?",
        a: "Signs include excessive bouncing, clunking sounds over bumps, oil leaking from forks, uneven tyre wear, or the bike feeling unstable at speed.",
      },
      {
        q: "Can you replace bike tyres at my doorstep?",
        a: "Yes. We carry tyre-changing equipment and stock tyres for popular bike and scooter models. We fit and balance the tyre at your location.",
      },
      {
        q: "How often should front fork oil be changed?",
        a: "Every 10,000–15,000 km or if you notice oil leaking from the forks or the front feels spongy.",
      },
    ],
    metaTitle: "Bike Suspension & Tyre Service at Doorstep | Fiixup",
    metaDescription:
      "Rough ride or wobbly wheels? Doorstep bike suspension repair & tyre service. Fork oil, shock absorbers, tyre replacement. All brands. Starting ₹399.",
    metaKeywords:
      "bike suspension repair near me, motorcycle suspension service at home, bike shock absorber replacement, bike tyre replacement near me, doorstep bike tyre service, two wheeler suspension repair, bike fork oil change at home, motorcycle tyre fitting near me, bike tyre change at home, scooter suspension repair near me",
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
      {
        q: "How do I know if my bike chain needs replacement?",
        a: "A stretched chain sags more than 2–3 cm at mid-point, skips gears, makes a slapping sound, or shows rusting and tight links. Our mechanic measures it accurately on-site.",
      },
      {
        q: "How much does bike chain replacement cost?",
        a: "Chain cleaning and lubrication starts from ₹199. Full chain and sprocket kit replacement starts from ₹699 including parts, depending on the bike model.",
      },
      {
        q: "How often should I lubricate my bike chain?",
        a: "Every 500–700 km in dry conditions. More frequently after rain or if riding in dusty environments like construction zones.",
      },
    ],
    metaTitle: "Bike Chain & Sprocket Service at Doorstep | Fiixup",
    metaDescription:
      "Loose or rusted bike chain? Doorstep chain cleaning, lubrication & sprocket replacement. All brands. Fast & affordable. Starting ₹199. Book now.",
    metaKeywords:
      "bike chain replacement near me, motorcycle chain service at home, bike chain lubrication near me, two wheeler chain sprocket replacement, bike chain adjustment near me, doorstep bike chain service, bike chain kit replacement near me, motorcycle chain repair near me, scooter chain service near me, bike chain cost",
  },

  {
    slug: "bike-regular-maintenance-plan",
    title: "Scheduled Bike Maintenance Plan | Doorstep Service",
    shortTitle: "Bike Maintenance Plan",
    category: "bike",
    icon: "Shield",
    tagline: "Keep your bike in peak condition with a scheduled doorstep maintenance plan.",
    description:
      "Fiixup's scheduled bike maintenance plan delivers regular two-wheeler servicing to your home or office on a timetable that suits you — monthly, quarterly, or kilometre-based. Regular maintenance prevents breakdowns, improves fuel efficiency by up to 15%, and extends your bike's lifespan significantly. Our technicians track your bike's service history and send WhatsApp reminders before the next service is due. All popular bike brands covered. Starting from ₹449 per visit.",
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
      {
        q: "Can I set up a recurring bike maintenance schedule?",
        a: "Yes. We offer monthly, quarterly, and kilometre-based maintenance plans. We track your bike's history and remind you when service is due.",
      },
      {
        q: "Does regular maintenance improve fuel efficiency?",
        a: "Yes. A well-maintained bike typically delivers 10–15% better fuel efficiency than a neglected one due to proper oil viscosity, clean air filter, and correct tyre pressure.",
      },
      {
        q: "Can I pause or cancel my maintenance plan?",
        a: "Yes. There are no lock-in contracts. You can pause, reschedule, or cancel at any time with 24 hours' notice.",
      },
    ],
    metaTitle: "Scheduled Bike Maintenance Plan | Doorstep Service",
    metaDescription:
      "Regular bike maintenance at your doorstep. Monthly & km-based plans. All brands. Reminders included. Prevent breakdowns. Starting ₹449.",
    metaKeywords:
      "bike maintenance plan near me, scheduled bike service at home, two wheeler maintenance package, motorcycle maintenance plan, doorstep bike maintenance, bike service subscription, regular bike servicing near me, bike upkeep service near me, preventive bike maintenance, two wheeler annual maintenance contract",
  },


  // ══════════════════════════════════════════════════════════════════════════
  // CAR SERVICES
  // ══════════════════════════════════════════════════════════════════════════

  {
    slug: "car-service-at-home",
    title: "Car Service at Home | Doorstep Car Servicing",
    shortTitle: "Car General Service",
    category: "car",
    icon: "Car",
    tagline: "Complete car servicing at your home or office — skip the garage queue.",
    description:
      "Fiixup's doorstep car service brings certified mechanics to your home, office, or parking lot for complete four-wheeler servicing without the garage wait. We handle all makes and models — Maruti Suzuki, Hyundai, Tata, Honda, Toyota, Kia, MG, Mahindra, Volkswagen, Skoda, Renault, and more. Our mobile car service van carries all oils, filters, and common parts to complete a full periodic service on the spot. Engine oil change, filter replacement, fluid top-ups, brake inspection, and full health check — all done at your location. Starting from ₹999.",
    price: "₹999",
    duration: "1–3 hrs",
    features: [
      "Engine oil drain & refill (correct grade)",
      "Oil, air & cabin air filter replacement",
      "All fluid levels checked & topped up",
      "Brake system inspection",
      "Tyre pressure & tread depth check",
      "Battery health test",
      "Full vehicle health report provided",
    ],
    faqs: [
      {
        q: "How much does a doorstep car service cost?",
        a: "Basic car service starts from ₹999. Full comprehensive service ranges from ₹1,999–₹4,999 depending on make, model, and age. Full pricing is given before work starts.",
      },
      {
        q: "Which car brands do you service at home?",
        a: "All popular brands — Maruti, Hyundai, Tata, Honda, Toyota, Kia, MG, Mahindra, Volkswagen, Skoda, Renault, Nissan, and more.",
      },
      {
        q: "Do you use genuine parts?",
        a: "Yes. We use OEM-grade or high-quality aftermarket parts. Genuine brand parts can be sourced on request.",
      },
      {
        q: "Is there a warranty on the service?",
        a: "Yes. All car servicing comes with a 30-day warranty. If any covered issue recurs within 30 days, we fix it free of charge.",
      },
      {
        q: "Can I book same-day doorstep car service?",
        a: "Yes. Same-day slots are available in Bengaluru, Chennai, Hyderabad, and Mumbai. Book on the website or call your city helpline.",
      },
    ],
    metaTitle: "Car Service at Home | Doorstep Car Servicing | Fiixup",
    metaDescription:
      "Complete car servicing at your home or office. Certified mechanics for Maruti, Hyundai, Tata, Toyota & all brands. Starting ₹999. Book now.",
    metaKeywords:
      "car service at home, doorstep car service, car servicing near me, mobile car service, car mechanic at home, doorstep car servicing, car service near me, home car service, car repair at home, mobile car mechanic near me, car general service at home, doorstep car repair",
  },

  {
    slug: "car-oil-change-at-home",
    title: "Car Oil Change at Home | Doorstep Engine Oil Service",
    shortTitle: "Car Oil Change",
    category: "car",
    icon: "Droplet",
    tagline: "Fresh engine oil in 45 minutes — we come to your home or office.",
    description:
      "Fiixup's doorstep car oil change service sends a certified mechanic to your location with the manufacturer-recommended engine oil grade for your car model. Engine oil change is the single most important maintenance task for a healthy car engine — dirty oil leads to increased wear, overheating, and costly engine damage. We carry 5W-30, 5W-40, 10W-40, and 15W-40 grades for all Indian car models, drain the old oil, replace the oil filter, and top up all related fluids in under an hour. Starting from ₹599.",
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
      {
        q: "How often should I change my car oil?",
        a: "Every 5,000–7,500 km for mineral oil, or every 8,000–10,000 km for synthetic oil. Always follow your car manufacturer's recommendation.",
      },
      {
        q: "Which oil grade is right for my car?",
        a: "Most modern Indian petrol cars use 5W-30 or 5W-40. Diesel cars typically use 15W-40. Our technician confirms the correct grade for your exact car before filling.",
      },
      {
        q: "How much does a doorstep car oil change cost?",
        a: "Starting from ₹599 including labour. Oil filter is charged separately. Full pricing confirmed before work starts.",
      },
      {
        q: "Can you do car oil change in an apartment basement parking?",
        a: "Yes. We carry spill-free drain pans and waste oil bags. The job is done cleanly with zero residue left in your parking space.",
      },
    ],
    metaTitle: "Car Oil Change at Home | Doorstep Engine Oil Service",
    metaDescription:
      "Get your car oil changed at home or office. Fast doorstep engine oil service for all car models. Correct oil grade guaranteed. Starting ₹599. Book now.",
    metaKeywords:
      "car oil change at home, doorstep car oil change, engine oil change near me, mobile car oil change, car engine oil service near me, oil change at home near me, doorstep engine oil change, car oil change cost, car oil change near me, home engine oil service, oil change and filter replacement near me",
  },

  {
    slug: "car-brake-service",
    title: "Car Brake Service & Brake Pad Replacement at Home",
    shortTitle: "Car Brake Service",
    category: "car",
    icon: "Car",
    tagline: "Safe brakes save lives — professional brake service at your doorstep.",
    description:
      "Fiixup provides complete doorstep car brake inspection, brake pad replacement, disc rotor check, and brake fluid flush for all car makes and models. Worn brakes are one of the most dangerous vehicle conditions on Indian roads — squealing sounds, a spongy pedal, or increased stopping distance are signs to act immediately. Our certified technicians arrive with brake pads, shoes, and brake fluid for your specific car model and complete the full brake service at your home or office without any garage visit. Starting from ₹799.",
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
      {
        q: "How do I know if my car brakes need servicing?",
        a: "Squealing or grinding sounds when braking, a spongy or low brake pedal, the car pulling to one side when braking, or longer stopping distances are all warning signs.",
      },
      {
        q: "How much does car brake pad replacement cost?",
        a: "Brake pad replacement starts from ₹799 per axle including labour. Parts are charged based on your car model and pad quality — quoted before work begins.",
      },
      {
        q: "How long does a doorstep brake service take?",
        a: "Typically 1–2 hours for a full front and rear brake service at your location.",
      },
      {
        q: "Do you use original brake pads?",
        a: "We use OEM-grade or high-quality aftermarket brake pads matched to your car's specification. Genuine OEM parts can be sourced on request.",
      },
    ],
    metaTitle: "Car Brake Service & Pad Replacement at Home | Fiixup",
    metaDescription:
      "Car brakes squealing or spongy? Expert doorstep brake pad replacement & brake service. All car models. 24/7 available. Starting ₹799. Book now.",
    metaKeywords:
      "car brake service near me, brake pad replacement at home, car brake repair near me, doorstep brake service, car brake pad replacement cost, car brake check near me, mobile car brake repair, disc brake service near me, car brake fluid change, brake repair near me, car brake inspection at home",
  },

  {
    slug: "car-ac-service-repair",
    title: "Car AC Service & Repair at Doorstep | Gas Recharge",
    shortTitle: "Car AC Service",
    category: "car",
    icon: "Wind",
    tagline: "AC not cooling? Gas recharge & full AC repair done at your location.",
    description:
      "Fiixup's doorstep car AC service and repair covers gas (refrigerant) recharge, compressor health check, condenser and evaporator inspection, cabin air filter replacement, and cooling performance testing — all at your home or office. AC not cooling is the most commonly searched car problem in India during summer, and Fiixup is the fastest solution. Our technicians carry R-134a and R-1234yf refrigerant for all car models and complete most AC re-gassing and repairs in under 90 minutes. Available 24/7. Starting from ₹899.",
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
      {
        q: "Why is my car AC not cooling?",
        a: "The most common causes are low refrigerant gas, a leaking AC system, a faulty compressor, or a dirty condenser. Our technician diagnoses the exact cause at your location.",
      },
      {
        q: "How much does car AC gas recharge cost?",
        a: "AC gas recharge starts from ₹899. If additional parts like the compressor or condenser need replacement, those are quoted separately before work begins.",
      },
      {
        q: "How often should car AC gas be recharged?",
        a: "In ideal conditions, car AC gas lasts 3–5 years. If cooling starts to reduce before that, there may be a slow refrigerant leak that needs fixing.",
      },
      {
        q: "Do you carry refrigerant gas for all car models?",
        a: "Yes. We carry R-134a for most cars manufactured before 2017 and R-1234yf for newer models. We confirm compatibility before service.",
      },
    ],
    metaTitle: "Car AC Service & Gas Recharge at Home | Fiixup",
    metaDescription:
      "Car AC not cooling? Doorstep AC service, gas recharge & repair for all car models. 24/7 available. Starting ₹899. Book now.",
    metaKeywords:
      "car AC service near me, car AC repair at home, car AC gas recharge near me, car AC not cooling repair, AC service near me, doorstep AC repair, car air conditioning service near me, car AC gas refill near me, mobile AC repair car, car AC check near me, car AC compressor repair near me",
  },

  {
    slug: "car-engine-diagnostics",
    title: "Car Engine Diagnostics at Home | OBD2 Scan & Check Engine Light",
    shortTitle: "Engine Diagnostics",
    category: "car",
    icon: "Gauge",
    tagline: "Check engine light on? We scan & diagnose at your location.",
    description:
      "Fiixup's doorstep car engine diagnostic service uses professional-grade OBD2 scanners to read fault codes, identify sensor failures, and detect performance issues — all at your location. A check engine light or MIL warning should never be ignored: it could indicate anything from a loose fuel cap to a serious engine or emission system fault. Our certified technicians provide a transparent diagnostic report and fix most issues on the spot. Honest diagnosis, no guesswork, no unnecessary upselling. Starting from ₹399.",
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
      {
        q: "What does the check engine light mean?",
        a: "It can indicate anything from a loose fuel cap (minor) to an oxygen sensor failure, catalytic converter issue, or engine misfire (serious). Our OBD2 scan tells you the exact code and meaning.",
      },
      {
        q: "Can I drive with the check engine light on?",
        a: "If the light is solid (not flashing), it's usually safe for short distances. A flashing check engine light means stop driving immediately and call us — it indicates active engine damage.",
      },
      {
        q: "Do you fix the issue after diagnosing?",
        a: "Yes. Most common issues — sensor replacements, loose connections, minor repairs — are fixed on the spot. Complex repairs are quoted and scheduled.",
      },
      {
        q: "Will the check engine light go away after fixing?",
        a: "Yes. After fixing the root cause, our technician clears the fault codes with the OBD2 scanner and verifies the light has gone off.",
      },
    ],
    metaTitle: "Car Engine Diagnostics at Home | OBD2 Scan | Fiixup",
    metaDescription:
      "Check engine light on? Expert OBD2 car engine diagnostics at your doorstep. Honest report. All car models. Starting ₹399. Book now.",
    metaKeywords:
      "car engine diagnostics near me, OBD2 scan near me, check engine light repair near me, car diagnostic service at home, car fault code reading near me, mobile car diagnostics, car computer scan near me, engine diagnostic test at home, car warning light check near me, car engine check near me",
  },

  {
    slug: "car-general-repair",
    title: "Car Repair at Home | Doorstep Car Mechanic Service",
    shortTitle: "Car General Repair",
    category: "car",
    icon: "Wrench",
    tagline: "Expert car repair at your doorstep — no garage visit needed.",
    description:
      "Fiixup's doorstep car repair service covers everything from minor fixes to major mechanical repairs at your home, office, or roadside location. Our certified mobile car mechanics handle engine work, suspension repair, steering issues, electrical faults, clutch service, and more for all car brands. We carry a fully stocked service van with common parts so most repairs are completed in one visit. Honest quotes before work starts. 30-day warranty on all repairs. Starting from ₹499.",
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
      {
        q: "Can you handle all types of car repairs at home?",
        a: "We handle most repairs on-site including engine, electrical, brakes, suspension, and more. For major overhauls (full engine rebuild, gearbox replacement) we arrange towing to our partner workshop.",
      },
      {
        q: "Do you carry spare parts?",
        a: "Yes. Our service vans are stocked with common parts. For rare or model-specific parts we source them same-day.",
      },
      {
        q: "How much does car repair at home cost?",
        a: "Starting from ₹499 for minor repairs. All costs — labour and parts — are itemised and quoted before any work begins.",
      },
      {
        q: "Which car brands do you support?",
        a: "All popular brands — Maruti, Hyundai, Tata, Honda, Toyota, Kia, MG, Mahindra, Volkswagen, Skoda, Renault, Nissan, and more. Select luxury models also supported.",
      },
    ],
    metaTitle: "Car Repair at Home | Doorstep Car Mechanic | Fiixup",
    metaDescription:
      "Expert car repair at your home or office. Mobile car mechanic for all brands — Maruti, Hyundai, Tata & more. 30-day warranty. Starting ₹499. Book now.",
    metaKeywords:
      "car repair at home, doorstep car mechanic, mobile car mechanic near me, car mechanic at home near me, car repair near me, home car repair service, car mechanic near me, doorstep car repair service, mobile mechanic near me, on demand car mechanic, car repair service near me, car general repair at home",
  },


  // ══════════════════════════════════════════════════════════════════════════
  // TOWING SERVICES
  // ══════════════════════════════════════════════════════════════════════════

  {
    slug: "car-towing-service-near-me",
    title: "Car Towing Service Near Me | 24/7 Flatbed Towing",
    shortTitle: "Car Towing Service",
    category: "towing",
    icon: "Truck",
    tagline: "Stuck on the road? Our tow truck reaches you in 30–60 minutes, 24/7.",
    description:
      "Fiixup provides 24/7 flatbed and crane car towing service across Bengaluru, Chennai, Hyderabad, and Mumbai. Whether your car broke down on the highway, was involved in an accident, has a dead engine, or is simply immovable — our tow trucks are dispatched immediately and reach you in 30–60 minutes. We use flatbed tow trucks for all-wheel-drive, low-clearance, and luxury cars to prevent any drivetrain damage during transport. Transparent pricing before any movement — no hidden charges. Starting from ₹499.",
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
    faqs: [
      {
        q: "How much does car towing cost near me?",
        a: "Car towing within city limits starts from ₹499. Highway and long-distance towing is charged per kilometre. A transparent quote is provided before the truck moves.",
      },
      {
        q: "How fast can a tow truck reach me?",
        a: "Typically 30–60 minutes within city limits. For highway breakdowns we aim for 45 minutes from the nearest available truck.",
      },
      {
        q: "Is flatbed towing better for my car?",
        a: "Yes. Flatbed towing lifts all four wheels off the ground, preventing any drivetrain, transmission, or undercarriage damage. We recommend it for all AWD, 4WD, automatic, and luxury cars.",
      },
      {
        q: "Where will you tow my car?",
        a: "To any destination you choose — nearest workshop, Fiixup partner workshop, or your home. We tow to wherever is most convenient for you.",
      },
      {
        q: "Do you tow accident-damaged cars?",
        a: "Yes. We handle accident recovery and towing 24/7 and can coordinate with your insurance company for cashless towing where applicable.",
      },
    ],
    metaTitle: "Car Towing Service Near Me | 24/7 Flatbed Towing | Fiixup",
    metaDescription:
      "Need car towing near you? 24/7 flatbed tow truck service for breakdowns, accidents & flat tyres. Arrives in 30–60 min. Starting ₹499. Call now.",
    metaKeywords:
      "car towing service near me, tow truck near me, car towing near me, flatbed towing near me, 24 hour towing near me, emergency towing near me, car breakdown towing, accident towing near me, highway towing service, vehicle towing near me, towing service near me open now, car tow near me",
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
      {
        q: "How much does bike towing cost near me?",
        a: "Bike towing within city limits starts from ₹299. Long-distance and highway towing is charged per kilometre with a transparent quote upfront.",
      },
      {
        q: "Do you tow heavy bikes like Royal Enfield and KTM?",
        a: "Yes. Our two-wheeler carriers handle all bike types including heavy motorcycles like Royal Enfield, KTM Adventure, and Kawasaki.",
      },
      {
        q: "Do you tow electric scooters?",
        a: "Yes. We tow Ola S1, Ather 450X, TVS iQube, Bajaj Chetak, and all electric two-wheelers. We handle EVs with care to avoid damage to the battery pack.",
      },
      {
        q: "How fast can you reach me for bike towing?",
        a: "Typically within 30–60 minutes in city areas. For highway breakdowns, we dispatch the nearest available carrier immediately.",
      },
    ],
    metaTitle: "Bike Towing Service Near Me | 24/7 Two-Wheeler Towing",
    metaDescription:
      "Bike breakdown? 24/7 doorstep bike towing for all brands — Royal Enfield, Bajaj, KTM, scooters & EVs. Arrives in 30–60 min. Starting ₹299. Call now.",
    metaKeywords:
      "bike towing service near me, two wheeler towing near me, motorcycle towing near me, bike breakdown towing, scooter towing near me, bike tow near me, bike towing near me 24 hours, two wheeler tow truck near me, Royal Enfield towing service, KTM towing near me, bike carrier near me",
  },


  // ══════════════════════════════════════════════════════════════════════════
  // BATTERY & JUMP START SERVICES
  // ══════════════════════════════════════════════════════════════════════════

  {
    slug: "car-battery-jumpstart-near-me",
    title: "Car Battery Jump Start Near Me | 24/7 Emergency Jump Start",
    shortTitle: "Car Jump Start",
    category: "battery",
    icon: "Zap",
    tagline: "Dead car battery? We jump start it at your location in 30 minutes.",
    description:
      "Fiixup provides 24/7 doorstep car battery jump start service across Bengaluru, Chennai, Hyderabad, and Mumbai. Whether your car won't start in your apartment parking, at the office, or on the roadside — our technician arrives with professional jump start equipment and safely restores your vehicle within 30–60 minutes. We also test your battery health after the jump start and advise whether replacement is needed. All car brands and models supported. No extra night or weekend charge. Starting from ₹399.",
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
    faqs: [
      {
        q: "How much does a car jump start service cost near me?",
        a: "Car battery jump start service starts from ₹399. If the battery needs replacement, we quote the battery price separately before fitting.",
      },
      {
        q: "How do I know if my car battery is dead?",
        a: "Signs: the engine clicks but won't crank, headlights are very dim, the dashboard doesn't light up, or the car is completely silent when you turn the key.",
      },
      {
        q: "Will a jump start fix my car permanently?",
        a: "A jump start gets you moving. If your battery is old or has a dead cell, it will drain again soon. Our technician tests battery health after the jump and tells you honestly if replacement is needed.",
      },
      {
        q: "Can you replace my car battery at home after the jump start?",
        a: "Yes. We carry replacement batteries for most popular car models and can fit them at your location immediately after the jump start.",
      },
      {
        q: "Is jump start service available at night?",
        a: "Yes. Our jump start service is available 24 hours a day, 7 days a week including nights, weekends, and public holidays — with no extra night surcharge.",
      },
    ],
    metaTitle: "Car Battery Jump Start Near Me | 24/7 Emergency Service",
    metaDescription:
      "Dead car battery? Get emergency jump start at your location — home, office or roadside. 30–60 min arrival. All car brands. Starting ₹399. Call now.",
    metaKeywords:
      "car battery jump start near me, car jump start near me, battery boost near me, jump start service near me, car battery dead near me, battery jump start near me 24 hours, emergency jump start near me, car won't start near me, battery jumpstart service near me, car jump start service near me, jump starter near me, car battery service near me",
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
      {
        q: "How much does bike jump start service cost near me?",
        a: "Bike battery jump start starts from ₹299. Battery replacement, if needed, is charged separately and quoted before fitting.",
      },
      {
        q: "My bike's self-start isn't working — can you help?",
        a: "Yes. Most self-start failures are due to a weak or dead battery. Our technician jump starts the bike and tests the full electrical system to find the root cause.",
      },
      {
        q: "Can you jump start an electric scooter?",
        a: "Electric scooter battery systems are different from conventional bikes. We handle basic 12V accessory battery jump starts on some EV scooters — call us to confirm for your model.",
      },
      {
        q: "How do I know if my bike battery is dead or if it's another issue?",
        a: "If the self-start clicks once or is silent, the battery is likely dead. If it cranks slowly, the battery is weak. If it cranks fine but doesn't start, it's likely a fuel or spark issue — our mechanic diagnoses all three on-site.",
      },
    ],
    metaTitle: "Bike Battery Jump Start Near Me | 24/7 Service | Fiixup",
    metaDescription:
      "Bike battery dead? 24/7 doorstep jump start service for all brands — Activa, Royal Enfield, Pulsar, KTM & more. Arrives in 30 min. Starting ₹299. Call now.",
    metaKeywords:
      "bike battery jump start near me, bike jump start near me, two wheeler battery jump start, scooter jump start near me, bike battery dead near me, bike battery boost near me, motorcycle jump start near me, bike self start not working near me, bike jump start service near me, bike battery jumpstart near me 24 hours",
  },

  {
    slug: "car-battery-replacement-at-home",
    title: "Car Battery Replacement at Home | Doorstep Service",
    shortTitle: "Car Battery Replacement",
    category: "battery",
    icon: "Battery",
    tagline: "New car battery fitted at your home or office in under an hour.",
    description:
      "Fiixup's doorstep car battery replacement service sends a certified technician to your location with a replacement battery matched to your car's specification. A dead or weak battery is the leading cause of unexpected car breakdowns in India — particularly in cities like Bengaluru, Chennai, and Mumbai where extreme heat degrades batteries faster. Our technician tests your existing battery first, confirms replacement is needed, fits the new battery, clears any ECU adaptation warnings, and safely disposes of the old unit. All car brands. Starting from ₹1,999 (battery inclusive).",
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
      {
        q: "How much does car battery replacement cost at home?",
        a: "Car battery replacement starts from ₹1,999 (battery + fitting included). Price varies by battery brand and car model. Full quote before fitting.",
      },
      {
        q: "How long does a car battery last?",
        a: "Typically 3–5 years in normal conditions. Indian summer heat and frequent short trips reduce battery life. If your battery is 3+ years old and shows slow starts, book a health check.",
      },
      {
        q: "Do you carry batteries for luxury cars like BMW and Mercedes?",
        a: "Yes. We carry AGM and EFB batteries for BMW, Mercedes-Benz, Audi, and other premium cars. These cars require ECU adaptation after battery replacement — we handle that on-site.",
      },
      {
        q: "Will replacing the battery reset my car settings?",
        a: "Some cars reset radio presets and window positions after battery replacement. Our technician performs an ECU re-adaptation to minimise any lost settings where possible.",
      },
    ],
    metaTitle: "Car Battery Replacement at Home | Doorstep Service | Fiixup",
    metaDescription:
      "Get your car battery replaced at home. Doorstep service with OEM battery supply & fitting. All car brands. 30-day warranty. Starting ₹1,999. Book now.",
    metaKeywords:
      "car battery replacement at home, car battery replacement near me, doorstep car battery service, car battery change near me, mobile car battery replacement, car battery fitting at home, car battery near me, car battery replacement cost, new car battery at home, car battery change service near me",
  },

  {
    slug: "bike-battery-replacement-at-home",
    title: "Bike Battery Replacement at Home | Doorstep Service",
    shortTitle: "Bike Battery Replacement",
    category: "battery",
    icon: "Battery",
    tagline: "New bike battery fitted at your location — fresh start, no hassle.",
    description:
      "Fiixup's doorstep bike battery replacement service brings a certified technician with a replacement battery for your specific two-wheeler model. A failing battery causes self-start issues, dim headlights, and unexpected breakdowns. Our technician tests your existing battery first using a professional load tester, confirms it needs replacement, and fits the correct new battery for your bike or scooter brand. We carry batteries for Honda, Bajaj, TVS, Royal Enfield, Yamaha, KTM, Hero, and all popular scooters. Starting from ₹799 (battery inclusive).",
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
      {
        q: "How much does bike battery replacement cost at home?",
        a: "Bike battery replacement starts from ₹799 (battery + fitting included). Price varies by battery size and brand. Full quote before fitting.",
      },
      {
        q: "How do I know if my bike battery needs replacement?",
        a: "Slow or no self-start, dim headlights even after a recent jump start, battery that won't hold charge overnight, or a battery over 2 years old in a hot city like Chennai or Hyderabad.",
      },
      {
        q: "How long does a bike battery last?",
        a: "Typically 2–3 years in Indian climatic conditions. Heat-intensive cities reduce battery life faster.",
      },
    ],
    metaTitle: "Bike Battery Replacement at Home | Doorstep Service | Fiixup",
    metaDescription:
      "Bike battery dead or weak? Doorstep bike battery replacement for all brands. Supply & fit at your location. 30-day warranty. Starting ₹799. Book now.",
    metaKeywords:
      "bike battery replacement at home, bike battery replacement near me, two wheeler battery replacement, scooter battery replacement near me, doorstep bike battery service, motorcycle battery replacement near me, bike battery change near me, bike battery replacement cost, mobile bike battery service, new bike battery near me",
  },


  // ══════════════════════════════════════════════════════════════════════════
  // PUNCTURE REPAIR SERVICES
  // ══════════════════════════════════════════════════════════════════════════

  {
    slug: "car-puncture-repair-near-me",
    title: "Car Puncture Repair Near Me | 24/7 Tyre Repair Service",
    shortTitle: "Car Puncture Repair",
    category: "puncture",
    icon: "AlertTriangle",
    tagline: "Flat car tyre? We come to your location and fix it in 20 minutes.",
    description:
      "Fiixup's 24/7 car puncture repair and tyre service comes to your exact location — on the road, in your parking lot, at home, or on the highway. No need to search for an open puncture shop at midnight. Our technician arrives with portable tyre-changing equipment, puncture repair kits, and spare tyre fitting tools. We handle tubeless and tube-type tyre punctures, tyre bursts, slow leaks, and flat tyre replacement for all car models. Transparent pricing, no hidden charges. Starting from ₹199.",
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
    faqs: [
      {
        q: "How much does car puncture repair cost near me?",
        a: "Car tyre puncture repair starts from ₹199 for a standard tubeless repair. Tyre replacement (if needed) is quoted separately based on tyre brand and model.",
      },
      {
        q: "Is there a 24-hour puncture repair near me?",
        a: "Yes. Fiixup is available 24/7 — your car puncture is fixed at your location day or night with no extra night surcharge.",
      },
      {
        q: "Can you repair a tyre burst on the highway?",
        a: "If the tyre is repairable (nail puncture, small cut), we fix it on the spot. If the tyre is irreparably damaged from a blowout, we advise tyre replacement and can arrange it or tow you to safety.",
      },
      {
        q: "Can you change my spare tyre at my location?",
        a: "Yes. If you have a spare tyre in the boot, our mechanic fits it at your location, checks its pressure, and torques all wheel nuts to the correct specification.",
      },
      {
        q: "My tyre has a slow puncture — can you find and fix it?",
        a: "Yes. We submerge or spray-test the tyre to locate even tiny slow leaks, then repair them using a plug-and-patch kit for a permanent fix.",
      },
    ],
    metaTitle: "Car Puncture Repair Near Me | 24/7 Tyre Repair | Fiixup",
    metaDescription:
      "Flat car tyre? 24/7 doorstep puncture repair at your location. All car models. Tubeless & tube-type. No shop needed. Starting ₹199. Call now.",
    metaKeywords:
      "car puncture repair near me, flat tyre repair near me, tyre puncture repair near me, car tyre repair near me, puncture shop near me open now, 24 hour puncture repair near me, doorstep puncture repair, car flat tyre service near me, tyre repair near me, puncture repair at home, tubeless tyre puncture repair near me, car tyre puncture fix near me",
  },

  {
    slug: "bike-puncture-repair-near-me",
    title: "Bike Puncture Repair Near Me | 24/7 Two-Wheeler Tyre Repair",
    shortTitle: "Bike Puncture Repair",
    category: "puncture",
    icon: "AlertTriangle",
    tagline: "Bike tyre flat? We come to you anytime — no pushing required.",
    description:
      "Fiixup's 24/7 doorstep bike puncture repair service is your nearest open puncture shop — without the shop. Whether you're stuck with a flat tyre at midnight, in a parking lot, or on the highway, our technician comes to your exact location with tube and tubeless puncture repair tools. We fix punctures for all bikes and scooters — Honda Activa, TVS Jupiter, Royal Enfield, Bajaj Pulsar, KTM, Yamaha, Hero, and all others. No extra night charge. Starting from ₹99.",
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
      {
        q: "How much does bike puncture repair cost near me?",
        a: "Bike tyre puncture repair starts from ₹99 for tubeless and ₹149 for tube-type repairs. Tyre replacement is quoted separately if needed.",
      },
      {
        q: "Is there a puncture shop near me open at night?",
        a: "Fiixup is available 24/7 for bike puncture repair. Instead of searching for a shop open at 2am, call us and we come to your exact location.",
      },
      {
        q: "Can you repair scooter tyres like Honda Activa and TVS Jupiter?",
        a: "Yes. We repair tubeless and tube-type tyres for all scooters including Honda Activa, TVS Jupiter, Suzuki Access, Yamaha Fascino, and all others.",
      },
      {
        q: "My bike tyre burst on the highway — what should I do?",
        a: "Do not brake suddenly. Ease off the throttle, grip the handlebars firmly, and steer to the shoulder. Switch on hazard lights and call Fiixup. We tow or repair on the spot.",
      },
      {
        q: "Do you repair tyres inside apartments and gated communities?",
        a: "Yes. We enter your society with the technician's ID and fix the puncture in your basement or parking — no need to push the bike to a shop.",
      },
    ],
    metaTitle: "Bike Puncture Repair Near Me | 24/7 Tyre Repair | Fiixup",
    metaDescription:
      "Bike tyre flat? 24/7 doorstep puncture repair at your location. All bikes & scooters. Tubeless & tube-type. No shop needed. Starting ₹99. Call now.",
    metaKeywords:
      "bike puncture repair near me, two wheeler puncture repair near me, bike tyre puncture near me, scooter puncture repair near me, puncture shop near me 24 hours, bike flat tyre repair near me, doorstep bike puncture repair, motorcycle puncture repair near me, bike tyre repair near me, bike puncture repair at home, activa puncture repair near me, tubeless bike tyre repair near me",
  },

  {
    slug: "tyre-replacement-at-home",
    title: "Tyre Replacement at Home | Doorstep Tyre Fitting Service",
    shortTitle: "Tyre Replacement",
    category: "puncture",
    icon: "Settings",
    tagline: "New tyre supplied and fitted at your location — no workshop visit.",
    description:
      "Fiixup's doorstep tyre replacement service supplies and fits new tyres for bikes and cars at your home, office, or roadside location. Our technicians carry tyre-changing equipment and stock a range of popular tyre brands and sizes. Whether your tyre is irreparably punctured, worn beyond safe limits, or you need a new set fitted — we bring the tyre to you and complete the fitting and balancing on-site. All bike and car tyre sizes. Genuine brands. Transparent pricing. Starting from ₹499.",
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
      {
        q: "Can you supply and fit a tyre at my home?",
        a: "Yes. We stock common tyre sizes for bikes and cars. For less common sizes, we source them within 2–4 hours and schedule the fitting.",
      },
      {
        q: "How much does tyre replacement cost?",
        a: "Tyre replacement starts from ₹499 per tyre (fitting only, if you provide the tyre). Supply + fitting depends on the tyre brand and size — quoted transparently before work starts.",
      },
      {
        q: "Which tyre brands do you supply?",
        a: "We supply MRF, CEAT, Apollo, Bridgestone, JK Tyre, Michelin, and other popular brands. Brand recommendations are based on your vehicle type and usage.",
      },
      {
        q: "Do you do wheel balancing at home?",
        a: "We perform static wheel balancing at the doorstep after tyre fitting. For dynamic balancing (recommended for high-speed vehicles), we can schedule at our partner workshop.",
      },
    ],
    metaTitle: "Tyre Replacement at Home | Doorstep Tyre Fitting | Fiixup",
    metaDescription:
      "New tyre supplied & fitted at your doorstep. Bikes & cars. MRF, CEAT, Apollo & more. Includes balancing. Starting ₹499. Book now.",
    metaKeywords:
      "tyre replacement at home, doorstep tyre fitting, tyre change at home, mobile tyre fitting near me, tyre replacement near me, car tyre change near me, bike tyre replacement at home, tyre fitting at home, new tyre at home, doorstep tyre change, tyre supply and fit near me, wheel balancing at home",
  },


  // ══════════════════════════════════════════════════════════════════════════
  // ROADSIDE ASSISTANCE SERVICES
  // ══════════════════════════════════════════════════════════════════════════

  {
    slug: "roadside-assistance-near-me",
    title: "Roadside Assistance Near Me | 24/7 Emergency Vehicle Help",
    shortTitle: "Roadside Assistance",
    category: "roadside",
    icon: "MapPin",
    tagline: "Broken down? One call brings help to your exact location in 30 minutes.",
    description:
      "Fiixup's 24/7 emergency roadside assistance service covers breakdown repair, battery jump start, tyre puncture, towing, and on-site mechanical fixes for both bikes and cars across Bengaluru, Chennai, Hyderabad, and Mumbai. Whether you've stalled on a city road, a national highway, or an expressway — our certified technician is dispatched immediately to your GPS location. We fix most breakdowns on the spot without towing. Transparent pricing, live technician tracking, no hidden charges. Available every day of the year including holidays. Starting from ₹299.",
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
      {
        q: "What does roadside assistance near me include?",
        a: "Our roadside assistance covers jump start, puncture repair, on-site breakdown repair, towing, spare tyre fitting, and minor mechanical fixes — all at your location.",
      },
      {
        q: "How fast does roadside assistance arrive?",
        a: "Typically within 30–60 minutes in city areas. For highway breakdowns we dispatch the nearest available technician immediately.",
      },
      {
        q: "Is roadside assistance available on highways and expressways?",
        a: "Yes. We cover all major national highways, outer ring roads, and expressways in our operating cities — Bengaluru ORR, Mumbai–Pune Expressway, OMR Chennai, and Hyderabad ORR.",
      },
      {
        q: "Is roadside assistance available on public holidays?",
        a: "Yes. Fiixup operates 24/7, 365 days a year — including all national and state public holidays, festivals, and weekends.",
      },
      {
        q: "Can I get roadside assistance for both my bike and car?",
        a: "Yes. Our roadside assistance covers all two-wheelers and four-wheelers — from Honda Activa scooters to Tata SUVs and Royal Enfield motorcycles.",
      },
    ],
    metaTitle: "Roadside Assistance Near Me | 24/7 Emergency Help | Fiixup",
    metaDescription:
      "Broken down? 24/7 roadside assistance for bikes & cars. Jump start, puncture, towing & on-site repair. Arrives in 30 min. Starting ₹299. Call now.",
    metaKeywords:
      "roadside assistance near me, emergency roadside assistance near me, 24 hour roadside assistance near me, roadside help near me, car breakdown assistance near me, vehicle breakdown service near me, emergency car help near me, roadside recovery near me, car broke down near me, motorcycle breakdown assistance near me, roadside service near me, breakdown service near me",
  },

  {
    slug: "car-breakdown-service",
    title: "Car Breakdown Service Near Me | 24/7 Emergency Repair",
    shortTitle: "Car Breakdown Service",
    category: "roadside",
    icon: "AlertTriangle",
    tagline: "Car broken down? Our mechanic reaches you in 30 minutes, day or night.",
    description:
      "Fiixup's 24/7 car breakdown service dispatches a certified mobile mechanic to your location immediately — whether you've stalled in traffic, broken down on a highway, or your car simply won't start. Our technician carries tools and common parts to diagnose and fix most car breakdowns on the spot: dead battery, overheating, tyre puncture, engine misfire, starter failure, fuel system issues, and more. If the repair requires a workshop, we arrange safe towing and stay with you. All car brands. Starting from ₹299.",
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
      {
        q: "My car just stopped in the middle of the road — what should I do?",
        a: "Steer safely to the side, switch on hazard lights, and call Fiixup immediately. Do not leave the car in a moving lane. Our technician reaches you in 30–60 minutes.",
      },
      {
        q: "Can you fix a car breakdown on the highway?",
        a: "Yes. We cover all major highways and expressways. For highway breakdowns, park in the emergency lane, switch on hazard lights, and call us — we dispatch immediately.",
      },
      {
        q: "My car is overheating — should I call you?",
        a: "Yes. Pull over immediately and switch off the engine. Do not open the radiator cap while hot. Call Fiixup — overheating can cause severe engine damage if driven further.",
      },
      {
        q: "Is car breakdown service available at night?",
        a: "Yes. Our service is available 24/7 with no extra charge for night call-outs — including late nights, early mornings, and weekends.",
      },
    ],
    metaTitle: "Car Breakdown Service Near Me | 24/7 Emergency Repair",
    metaDescription:
      "Car broken down? 24/7 emergency car breakdown service. Mobile mechanic at your location — highway or city. All brands. Starting ₹299. Call now.",
    metaKeywords:
      "car breakdown service near me, car broke down near me, emergency car repair near me, car breakdown near me, car won't start near me, mobile car mechanic near me, 24 hour car mechanic near me, car stalled near me, car breakdown help near me, emergency mechanic near me, car broken down on highway, car breakdown assistance near me",
  },


  // ══════════════════════════════════════════════════════════════════════════
  // MOBILE MECHANIC SERVICES
  // ══════════════════════════════════════════════════════════════════════════

  {
    slug: "mobile-mechanic-near-me",
    title: "Mobile Mechanic Near Me | Doorstep Car & Bike Repair",
    shortTitle: "Mobile Mechanic",
    category: "mechanic",
    icon: "Wrench",
    tagline: "A certified mechanic at your door — faster and cheaper than a garage.",
    description:
      "Fiixup's on-demand mobile mechanic service sends a certified vehicle technician to your home, office, apartment, or roadside location for car and bike repair. Our mobile mechanics carry professional-grade tools, OBD2 diagnostic equipment, and common spare parts in a fully equipped service van. Whether you need an oil change, brake service, electrical repair, engine diagnostics, AC service, or a tyre change — we complete most jobs at your location in one visit. No garage queues, no transport stress, and at prices that are often lower than a traditional workshop. Available 24/7. Starting from ₹299.",
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
    faqs: [
      {
        q: "Is a mobile mechanic reliable?",
        a: "Yes. Fiixup's mobile mechanics are certified, background-verified, and carry professional-grade tools. Every repair comes with a 30-day warranty — the same or better than most garages.",
      },
      {
        q: "Is a mobile mechanic cheaper than a garage?",
        a: "Usually yes. Mobile mechanics have lower overhead costs and we price competitively. You also save towing fees and time. All prices are quoted transparently before work starts.",
      },
      {
        q: "What jobs can a mobile mechanic do?",
        a: "Most common repairs: oil change, brake service, battery replacement, AC re-gas, puncture repair, chain service, electrical diagnosis, engine diagnostics, and full servicing — all at your location.",
      },
      {
        q: "Can I see my mechanic's profile and rating before they arrive?",
        a: "Yes. After booking you receive your assigned mechanic's name, photo, experience, and real customer rating so you know who to expect.",
      },
      {
        q: "How do I book a mobile mechanic near me?",
        a: "Book via our website, call your city's helpline, or WhatsApp us. We confirm the booking within minutes and share a live ETA.",
      },
    ],
    metaTitle: "Mobile Mechanic Near Me | Doorstep Car & Bike Repair",
    metaDescription:
      "Book a certified mobile mechanic near you. Doorstep car & bike repair at home or office. 30-day warranty. Cheaper than a garage. Starting ₹299. Book now.",
    metaKeywords:
      "mobile mechanic near me, doorstep mechanic near me, mechanic at home near me, on demand mechanic near me, mobile car mechanic near me, mobile bike mechanic near me, home mechanic near me, mechanic near me, on site mechanic near me, car mechanic near me, bike mechanic near me, doorstep vehicle repair near me",
  },

];

export default services;

// ── Typed filter helpers ─────────────────────────────────────────────────────

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(
  category: ServiceData["category"]
): ServiceData[] {
  return services.filter((s) => s.category === category);
}

// Pre-filtered exports for common use (nav, landing pages, sitemap)
export const bikeServices    = getServicesByCategory("bike");
export const carServices     = getServicesByCategory("car");
export const towingServices  = getServicesByCategory("towing");
export const batteryServices = getServicesByCategory("battery");
export const punctureServices= getServicesByCategory("puncture");
export const roadsideServices= getServicesByCategory("roadside");
export const mechanicServices= getServicesByCategory("mechanic");

// All services in SEO priority order
export const allServicesOrdered: ServiceData[] = [
  ...bikeServices,
  ...carServices,
  ...towingServices,
  ...batteryServices,
  ...punctureServices,
  ...roadsideServices,
  ...mechanicServices,
];
