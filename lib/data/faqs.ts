// lib/data/faqs.ts — All FAQ data (global + per-city)
//
// SEO STRATEGY:
//  • Targets high-traffic "near me", symptom-based, price-intent & question-based queries
//  • Service priority: Bike → Car → Towing → Puncture → Jump Start → Doorstep / Mobile Mechanic
//  • City FAQs embed local landmarks, roads & pain-points for geo-ranking
//  • Questions mirror exact Google search phrases (long-tail + People Also Ask)
//  • Answers contain natural LSI keywords without stuffing
//
import type { FAQCategory } from "@/lib/models/faq.model";

// ── Global FAQ page ──────────────────────────────────────────────────────────
export const globalFAQs: FAQCategory[] = [

  // ─── GENERAL ────────────────────────────────────────────────────────────────
  {
    category: "General",
    faqs: [
      {
        q: "What is Fiixup?",
        a: "Fiixup is a 24/7 doorstep vehicle repair and roadside assistance service for bikes, scooters, and cars across major Indian cities. Our certified mobile mechanics come to your home, office, or breakdown spot — no towing required for most jobs.",
      },
      {
        q: "Which cities does Fiixup operate in?",
        a: "We currently operate in Bengaluru, Chennai, Hyderabad, and Mumbai — with more cities launching soon. Enter your pincode on our booking page to confirm instant coverage.",
      },
      {
        q: "Is Fiixup available near me?",
        a: "If you're in Bengaluru, Chennai, Hyderabad, or Mumbai, we are already near you. Our technicians are spread across all major zones in each city for the fastest possible response.",
      },
      {
        q: "What services does Fiixup provide?",
        a: "Fiixup provides: doorstep bike & scooter repair, doorstep car repair, towing service (flatbed & crane), tyre puncture repair, battery jump start, mobile mechanic on-call, general servicing, AC repair, oil change, brake service, suspension repair, and 24/7 emergency roadside assistance — all at your location.",
      },
      {
        q: "What are your service hours?",
        a: "We are available 24 hours a day, 7 days a week, 365 days a year — including public holidays, weekends, and festival seasons like Diwali, Eid, and Christmas.",
      },
      {
        q: "How quickly can a technician arrive?",
        a: "Our technicians typically arrive within 30–60 minutes. For emergency breakdowns we prioritise dispatch within 30 minutes — often faster during off-peak hours.",
      },
      {
        q: "Do I need to take my vehicle to a garage?",
        a: "No. That is the whole point of Fiixup. Our fully equipped service vans bring the workshop to you — at home, at the office, on the roadside, or in a parking lot.",
      },
      {
        q: "How do I book a Fiixup service?",
        a: "You can book via our website, call your city's helpline, or WhatsApp us. We confirm your booking within minutes and share a live ETA for the technician.",
      },
      {
        q: "Is there a call-out or visit fee?",
        a: "We charge a minimal call-out fee which is waived when you proceed with the service. All pricing is shared upfront — no hidden charges, ever.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept UPI (GPay, PhonePe, Paytm), cash, debit/credit cards, and net banking. Payment is collected only after the job is completed and you are satisfied.",
      },
      {
        q: "Is there a warranty on repairs?",
        a: "Yes. All repairs carry a 30-day service warranty. If the same issue recurs within 30 days, we return and fix it free of charge — no questions asked.",
      },
      {
        q: "Do you use genuine spare parts?",
        a: "Yes. We use OEM-grade or high-quality aftermarket parts for every repair. For premium bikes and cars we can source brand-authorised parts on request.",
      },
      {
        q: "Are your technicians certified?",
        a: "All Fiixup technicians are certified, background-verified, and trained for both two-wheelers and four-wheelers. You can see the technician's profile and rating before they arrive.",
      },
    ],
  },

  // ─── BIKE & SCOOTER REPAIR (highest priority) ────────────────────────────────
  {
    category: "Bike & Scooter Repair",
    faqs: [
      {
        q: "Which bike brands does Fiixup service?",
        a: "We service all popular brands — Honda, Bajaj, TVS, Royal Enfield, Yamaha, Hero, KTM, Suzuki, Kawasaki, Jawa, Revolt EV, and more. If you ride it in India, we service it.",
      },
      {
        q: "Do you service scooters?",
        a: "Yes. We service Honda Activa, TVS Jupiter, Suzuki Access, Yamaha Fascino, Hero Pleasure, Aprilia SR, Ola Electric S1, Ather 450X, Bajaj Chetak, and all other petrol and electric scooters.",
      },
      {
        q: "Can I get a doorstep bike service near me?",
        a: "Yes. Our mobile bike mechanic comes to your home, office, or any location in the city. No need to push your bike to a garage or wait in a queue.",
      },
      {
        q: "How much does a bike service cost at home?",
        a: "A basic doorstep bike service starts from ₹299. Full servicing including oil change, air filter, spark plug, and chain lubrication typically ranges from ₹599–₹1,499 depending on your bike model. You receive a quote before work begins — no surprises.",
      },
      {
        q: "How often should I service my bike?",
        a: "Every 3,000–5,000 km or every 3 months, whichever comes first. For heavy city usage or delivery riding, service every 2,500–3,000 km.",
      },
      {
        q: "My bike is not starting — what should I do?",
        a: "Don't panic. Call Fiixup immediately. Common causes are a dead battery, a flooded engine, a faulty spark plug, or a fuel delivery issue. Our mobile mechanic diagnoses and fixes it on the spot without towing in most cases.",
      },
      {
        q: "My bike engine is making a knocking noise — is it serious?",
        a: "Yes, a knocking engine should not be ignored. It usually signals low oil level, worn piston rings, a loose engine mount, or detonation from poor fuel. Call our mechanic immediately to prevent costly engine damage.",
      },
      {
        q: "My bike is overheating — what should I do?",
        a: "Pull over safely, switch off the engine, and call Fiixup. Overheating is commonly caused by low coolant (liquid-cooled bikes), a blocked radiator, a faulty thermostat, or a seized cooling fan. Do not ride further.",
      },
      {
        q: "Can you do Royal Enfield servicing at home?",
        a: "Yes. Royal Enfield — Bullet, Classic 350, Meteor 350, Himalayan, Hunter 350, Thunderbird, and Super Meteor — are some of our most serviced bikes. Our technicians are specially trained for RE single-cylinder and twin-cylinder engines.",
      },
      {
        q: "Do you service KTM bikes?",
        a: "Yes. KTM Duke 200, Duke 390, RC 390, Adventure 390, and all other KTM models are fully supported. Our mechanics are trained for KTM's high-performance engines and electronics.",
      },
      {
        q: "Can you repair electric bikes and scooters (EV)?",
        a: "Yes. We service Ola S1, Ather 450X, Bajaj Chetak, TVS iQube, Hero Vida, and other electric two-wheelers for tyre, brake, suspension, and electrical work. Battery-pack specific repairs are subject to model compatibility — call us to confirm.",
      },
      {
        q: "Do you service bikes at apartments and gated communities?",
        a: "Yes. We service vehicles inside gated communities, apartment parking lots, housing societies, and commercial complexes. Just share the gate entry detail and we handle the rest.",
      },
      {
        q: "Can you fix a bike chain at my location?",
        a: "Yes. We clean, lubricate, adjust, or replace the chain and sprocket at your doorstep. A chain replacement typically takes under 30 minutes on-site.",
      },
      {
        q: "Do you do bike brake pad replacement at home?",
        a: "Yes. Front and rear brake pad or shoe replacement is a standard doorstep job. We carry brake pads and shoes for all major bike and scooter models.",
      },
      {
        q: "Can you do a bike oil change at my doorstep?",
        a: "Yes. Engine oil change with or without filter replacement is available at your location in under 20 minutes. We use manufacturer-recommended oil grades for every bike model.",
      },
      {
        q: "Do you service delivery bikes for Zomato, Swiggy, and Blinkit riders?",
        a: "Yes! We offer priority doorstep service and bulk fleet packages for delivery partners. Minimum downtime is our goal — we come to your delivery zone so you lose as little time as possible.",
      },
    ],
  },

  // ─── CAR REPAIR & SERVICING ──────────────────────────────────────────────────
  {
    category: "Car Repair & Servicing",
    faqs: [
      {
        q: "Which car brands does Fiixup service?",
        a: "All popular brands — Maruti Suzuki, Hyundai, Tata, Honda, Toyota, Kia, MG, Mahindra, Volkswagen, Skoda, Renault, Nissan, Ford, and more.",
      },
      {
        q: "Can I get a doorstep car service near me?",
        a: "Yes. Our mobile car mechanic arrives at your home or office fully equipped to handle servicing, OBD diagnostics, oil changes, brake work, AC repair, battery replacement, and more — no garage visit needed.",
      },
      {
        q: "How much does a doorstep car service cost?",
        a: "A basic car service (oil change, filter, top-ups, inspection) starts from ₹999. Comprehensive servicing ranges from ₹1,999–₹4,999 depending on make and model. Full pricing is shared before work begins.",
      },
      {
        q: "My car is not starting — what do I do?",
        a: "Call Fiixup immediately. The most common causes are a dead battery, a faulty starter motor, or an immobiliser issue. Our technician arrives within 30–60 minutes for on-the-spot diagnosis and repair.",
      },
      {
        q: "My car's check engine light is on — is it serious?",
        a: "It could be minor (a loose fuel cap) or serious (sensor failure, engine misfire, catalytic converter issue). Do not ignore it. Our mobile mechanic brings an OBD2 scanner, reads fault codes on the spot, and advises the exact fix.",
      },
      {
        q: "My car AC is not cooling — can you fix it at home?",
        a: "Yes. AC not cooling is our most requested car repair. We carry R134a refrigerant gas and AC components for all major car models. Most AC re-gassing and leak repairs are done at your location in under an hour.",
      },
      {
        q: "Can you do major engine repairs at my doorstep?",
        a: "We handle most repairs on-site. For very involved overhauls (full engine rebuild, gearbox replacement), we arrange towing to our partner workshop and stay with you through the entire process.",
      },
      {
        q: "Do you carry spare parts in the service van?",
        a: "Yes. Our vans are stocked with common parts — oil filters, air filters, spark plugs, brake pads, belts, and fuses. For rare or model-specific parts we source them same-day.",
      },
      {
        q: "Can you do a car oil change at my home?",
        a: "Yes. Engine oil change with oil filter is a standard doorstep job completed in 30–45 minutes. We use manufacturer-recommended oil grades for every car model.",
      },
      {
        q: "Do you service luxury cars like BMW, Mercedes, and Audi?",
        a: "Yes. We service select premium and luxury models for oil changes, brake work, tyre fitting, battery replacement, and AC service. Contact us to confirm availability for your specific model.",
      },
      {
        q: "Can you fix suspension and alignment issues at my doorstep?",
        a: "We carry out suspension inspection, shock absorber replacement, and basic alignment checks at your location. Full wheel alignment and balancing requiring a lift can be arranged at our partner workshop.",
      },
    ],
  },

  // ─── TOWING SERVICE ──────────────────────────────────────────────────────────
  {
    category: "Towing Service",
    faqs: [
      {
        q: "Does Fiixup provide towing service near me?",
        a: "Yes. We provide 24/7 flatbed and crane towing for bikes and cars across Bengaluru, Chennai, Hyderabad, and Mumbai. Call us and a tow truck is dispatched immediately.",
      },
      {
        q: "How much does car towing cost?",
        a: "Car towing starts from ₹499 for local towing within city limits. Highway and long-distance towing is charged per kilometre. You receive a transparent quote before the tow truck moves.",
      },
      {
        q: "How much does bike towing cost?",
        a: "Bike towing starts from ₹299 within city limits. Long-distance towing is quoted per kilometre — all pricing is shared upfront with no hidden fees.",
      },
      {
        q: "What types of tow trucks does Fiixup use?",
        a: "We use flatbed tow trucks for cars and SUVs (safest for AWD and low-clearance vehicles), crane/wheel-lift trucks for standard cars, and dedicated two-wheeler carriers for bikes and scooters.",
      },
      {
        q: "Is flatbed towing safe for my car?",
        a: "Yes. Flatbed towing is the safest method as all four wheels are off the ground, preventing any drivetrain or undercarriage damage. We recommend flatbed for automatic, AWD, 4WD, and luxury cars.",
      },
      {
        q: "Can you tow my vehicle after an accident?",
        a: "Yes. We provide accident recovery and emergency towing 24/7. Our team handles the vehicle with care and can coordinate with your insurance provider for cashless towing where applicable.",
      },
      {
        q: "Can you tow my vehicle on the highway?",
        a: "Yes. We cover all major city expressways and national highways in our operating cities. For highway breakdowns, call immediately and we dispatch the nearest available truck.",
      },
      {
        q: "How long does it take for a tow truck to arrive?",
        a: "Typically 30–60 minutes within city limits. For highway breakdowns we aim to get the nearest available truck to you within 45 minutes.",
      },
      {
        q: "Do you tow bikes and scooters too?",
        a: "Yes. We tow all two-wheelers — motorcycles, scooters, electric scooters, and heavy bikes like Royal Enfield and KTM — using dedicated two-wheeler carriers to prevent damage during transport.",
      },
      {
        q: "Can you tow a flooded or waterlogged vehicle?",
        a: "Yes. Do not attempt to start a waterlogged engine as it risks catastrophic engine damage. Call Fiixup immediately and we tow it safely for assessment and drying.",
      },
    ],
  },

  // ─── PUNCTURE REPAIR ─────────────────────────────────────────────────────────
  {
    category: "Tyre Puncture Repair",
    faqs: [
      {
        q: "Is there a puncture shop near me open 24 hours?",
        a: "Yes — Fiixup is your 24/7 puncture repair service. Instead of looking for an open shop at midnight, call us and our mechanic comes to your exact location — on the road, in a parking lot, or at home.",
      },
      {
        q: "How much does puncture repair cost for a bike?",
        a: "Bike puncture repair (tube or tubeless) starts from ₹99–₹199 for a standard repair. If the tyre needs replacement we quote the part cost separately before proceeding.",
      },
      {
        q: "How much does puncture repair cost for a car?",
        a: "Car tyre puncture repair starts from ₹199–₹399 depending on tyre type. Most tubeless car tyre punctures are repaired on the spot within 20 minutes.",
      },
      {
        q: "Can you repair tubeless tyre punctures?",
        a: "Yes. We repair tubeless tyres (both bike and car) using the plug method or internal patch method depending on puncture size and location. Most repairs are done in 15–20 minutes on-site.",
      },
      {
        q: "My tyre burst on the highway — what should I do?",
        a: "Do not brake suddenly. Grip the steering firmly, ease off the accelerator, and steer to the shoulder. Switch on hazard lights and call Fiixup immediately. We tow or repair on the spot depending on the damage.",
      },
      {
        q: "Can you change my spare tyre at my location?",
        a: "Yes. If you have a spare tyre in the boot our mechanic fits it at your location. We also check the spare's pressure and torque all wheel nuts to the correct specification.",
      },
      {
        q: "Do you provide doorstep tyre replacement?",
        a: "Yes. If the puncture is unrepairable or the tyre is worn out we can supply and fit a replacement tyre at your doorstep. Tyre brands and pricing are confirmed before fitting.",
      },
      {
        q: "Can you repair a bike puncture at night?",
        a: "Yes. Fiixup is available 24/7 for bike and car puncture repair — including late nights, early mornings, and weekends. No extra charge for night call-outs.",
      },
      {
        q: "What causes repeated tyre punctures?",
        a: "Common causes include under-inflated tyres (more sidewall contact with road debris), worn tyre tread, a slow valve leak, or a nail stuck in the tyre that wasn't fully removed. Our mechanic inspects the full tyre and valve to prevent recurrence.",
      },
    ],
  },

  // ─── JUMP START SERVICE ──────────────────────────────────────────────────────
  {
    category: "Battery Jump Start",
    faqs: [
      {
        q: "Can you jump start my car near me?",
        a: "Yes. Fiixup provides 24/7 battery jump start service for cars and bikes at your location — home, office, parking lot, or roadside. Our technician arrives with professional jump start equipment within 30–60 minutes.",
      },
      {
        q: "How much does a jump start service cost?",
        a: "Battery jump start starts from ₹299 for bikes and ₹399 for cars. If the battery needs replacement we quote the battery cost separately before fitting.",
      },
      {
        q: "My car battery is dead — can you fix it at home?",
        a: "Yes. We jump start your vehicle on the spot. If the battery is beyond recovery (dead cell or very old) we carry replacement batteries for most popular car models and fit them at your location.",
      },
      {
        q: "How do I know if my car battery is dead or if it's another problem?",
        a: "Signs of a dead battery: the engine clicks but doesn't crank, headlights are very dim, the dashboard flickers, or the car is completely silent when you turn the key. Our mechanic brings a battery load tester to confirm the exact fault.",
      },
      {
        q: "Can you jump start a bike or scooter?",
        a: "Yes. We jump start all bikes and scooters with 12V battery systems — Honda Activa, Royal Enfield, KTM, Yamaha, Bajaj, TVS, and all others.",
      },
      {
        q: "What causes a car battery to die suddenly?",
        a: "Common causes: leaving headlights or accessories on overnight, an ageing battery (3–4 years+), short city drives that don't allow full recharging, a faulty alternator, or extreme heat. Our technician inspects and advises on the root cause after the jump start.",
      },
      {
        q: "Will a jump start fix my battery permanently?",
        a: "A jump start gets you moving, but if the battery has a failed cell or is old it will drain again. Our technician tests battery health after jump starting and advises whether a replacement is needed.",
      },
      {
        q: "Can I get a battery replacement done at home?",
        a: "Yes. We stock replacement batteries for popular car and bike models. Battery testing, old battery removal, new battery fitting, and terminal cleaning are all done at your location.",
      },
    ],
  },

  // ─── DOORSTEP & MOBILE MECHANIC ──────────────────────────────────────────────
  {
    category: "Doorstep Service & Mobile Mechanic",
    faqs: [
      {
        q: "What is a mobile mechanic service?",
        a: "A mobile mechanic is a certified technician who comes to your location — home, office, parking lot, or roadside — with a fully equipped van to diagnose and repair your vehicle. Fiixup's mobile mechanics deliver the same quality as a garage, with zero travel hassle for you.",
      },
      {
        q: "Is doorstep vehicle service reliable?",
        a: "Absolutely. Fiixup's technicians are certified, background-verified, and carry professional-grade tools and genuine parts. Every repair comes with a 30-day warranty — the same or better than most garages.",
      },
      {
        q: "What repairs can be done at my doorstep?",
        a: "Most common repairs: oil change, brake service, battery replacement, AC re-gassing, tyre puncture repair, chain and sprocket replacement, spark plug change, clutch adjustment, suspension inspection, electrical diagnostics, and full periodic servicing — all at your location.",
      },
      {
        q: "Can I schedule a bike or car service in advance?",
        a: "Yes. Book a scheduled doorstep service at any time that suits you — early morning, afternoon, or evening. Same-day slots are usually available in all our operating cities.",
      },
      {
        q: "Is the doorstep service available for apartments and gated societies?",
        a: "Yes. We service vehicles inside gated communities, apartment parking lots, and housing societies. Share the gate entry details when booking and we handle the rest.",
      },
      {
        q: "Can a mobile mechanic handle electrical and diagnostic problems?",
        a: "Yes. Our technicians carry OBD2 diagnostic scanners for cars and multi-meters for electrical fault tracing. Most sensor replacements, fuse issues, and wiring faults are resolved at your doorstep.",
      },
      {
        q: "Do you provide roadside assistance if I break down mid-trip?",
        a: "Yes. Call Fiixup from wherever you break down — on a highway, a main road, or inside the city. Our nearest technician is dispatched immediately with tools, parts, and towing capacity if needed.",
      },
      {
        q: "Can I track my mechanic after booking?",
        a: "Yes. After booking confirmation you receive a live tracking link so you can see exactly where your technician is and get an accurate, real-time arrival estimate.",
      },
    ],
  },

  // ─── QUALITY, SAFETY & WARRANTY ─────────────────────────────────────────────
  {
    category: "Quality, Safety & Warranty",
    faqs: [
      {
        q: "Is there a warranty on Fiixup repairs?",
        a: "Yes. All repairs come with a 30-day service warranty. If the same issue recurs within 30 days we return and fix it free of charge.",
      },
      {
        q: "What if the technician damages my vehicle?",
        a: "All our technicians are insured. In the rare event of accidental damage during service, Fiixup takes full responsibility and covers the cost of repair.",
      },
      {
        q: "How do I know the repair quote is fair?",
        a: "We provide a transparent, itemised quote — labour and parts listed separately — before starting any work. We never add surprise charges after the job.",
      },
      {
        q: "Can I see ratings for my assigned technician?",
        a: "Yes. Every Fiixup technician has a verified rating based on real customer reviews. You can view the assigned technician's profile, experience, and rating before they arrive.",
      },
    ],
  },
];

// ── Per-city FAQs ─────────────────────────────────────────────────────────────
export const cityFAQs: Record<string, FAQCategory[]> = {

  // ════════════════════════════════════════════════════════════════════════════
  // BENGALURU
  // ════════════════════════════════════════════════════════════════════════════
  bengaluru: [
    {
      category: "Bike Repair in Bengaluru",
      faqs: [
        {
          q: "Where can I get a doorstep bike service in Bengaluru?",
          a: "Fiixup provides 24/7 doorstep bike service across all of Bengaluru — Koramangala, Whitefield, Indiranagar, HSR Layout, Marathahalli, Electronic City, Jayanagar, Rajajinagar, Hebbal, Yeshwanthpur, JP Nagar, BTM Layout, Sarjapur Road, and every other zone.",
        },
        {
          q: "Is there a mobile bike mechanic near me in Bengaluru?",
          a: "Yes. Fiixup's mobile bike mechanics are stationed across all Bengaluru zones. Call or WhatsApp and we confirm your technician's live ETA within minutes.",
        },
        {
          q: "How much does a doorstep bike service cost in Bengaluru?",
          a: "Basic bike servicing starts from ₹299. Full service with oil change, filter, chain, and spark plug starts from ₹599. You get a detailed quote before work begins — no hidden charges.",
        },
        {
          q: "Do you service Royal Enfield bikes in Bengaluru?",
          a: "Yes. Royal Enfield is hugely popular in Bengaluru. Our technicians are specially trained for Bullet, Classic 350, Meteor 350, Himalayan, Hunter 350, and Super Meteor models.",
        },
        {
          q: "Do you service KTM bikes in Bengaluru?",
          a: "Yes. KTM Duke 200, Duke 390, RC 390, and Adventure 390 are popular in Bengaluru and our technicians are fully trained for KTM servicing and diagnostics.",
        },
        {
          q: "Can I get my bike serviced at my office in Bengaluru's IT parks?",
          a: "Yes. Doorstep bike service is available at Electronic City, Whitefield, Manyata Tech Park, Embassy Tech Village, RMZ, Bagmane Tech Park, and all Bengaluru IT corridors. Book during office hours and collect your bike fully serviced.",
        },
        {
          q: "My bike won't start in Bengaluru — can you help immediately?",
          a: "Yes. Call Fiixup and a technician reaches you within 30–60 minutes anywhere in Bengaluru, 24 hours a day. We diagnose and fix most starting issues on the spot.",
        },
        {
          q: "Do Bengaluru's roads damage bike tyres and suspension?",
          a: "Absolutely. Bengaluru's potholes — especially on ORR, Sarjapur Road, and Old Airport Road — are punishing on tyres and suspension. We specialise in pothole damage repair: tyre punctures, tube replacement, fork alignment, and shock absorbers.",
        },
        {
          q: "Can you service electric scooters like Ola S1 and Ather in Bengaluru?",
          a: "Yes. We service Ola S1, Ather 450X, TVS iQube, Bajaj Chetak, and Hero Vida for tyre, brake, suspension, and electrical work across all Bengaluru zones.",
        },
        {
          q: "Do you service delivery bikes in Bengaluru?",
          a: "Yes. We offer priority doorstep service and fleet packages for Zomato, Swiggy, Blinkit, and Dunzo delivery partners across Bengaluru.",
        },
      ],
    },
    {
      category: "Car Repair in Bengaluru",
      faqs: [
        {
          q: "Which car brands does Fiixup service in Bengaluru?",
          a: "All popular brands — Maruti, Hyundai, Tata, Honda, Toyota, Kia, MG, Mahindra, Volkswagen, Skoda, and more.",
        },
        {
          q: "Can Bengaluru's potholes damage my car's suspension?",
          a: "Yes. Bengaluru's roads cause strut damage, shock absorber failure, wheel misalignment, and rim bending. We specialise in pothole damage repair — alignment, wheel balancing, struts, and shock absorbers — at your doorstep.",
        },
        {
          q: "My car AC is not cooling in Bengaluru summer — can you fix it at home?",
          a: "Yes. AC re-gassing, compressor checks, and refrigerant leak repair are done at your location. Our vans carry R134a refrigerant for all major car models.",
        },
        {
          q: "Do you provide doorstep car service in Whitefield and Electronic City?",
          a: "Yes. We have dedicated coverage in Whitefield and Electronic City — same-day and scheduled service available for residents and office-goers.",
        },
        {
          q: "Can you fix a car that broke down on Bengaluru's ORR or NH44?",
          a: "Yes. We provide 24/7 emergency roadside assistance and towing on Outer Ring Road, NH44, Hosur Road, and all Bengaluru expressways.",
        },
      ],
    },
    {
      category: "Towing Service in Bengaluru",
      faqs: [
        {
          q: "Is there a towing service near me in Bengaluru?",
          a: "Yes. Fiixup provides 24/7 flatbed towing for bikes and cars across all Bengaluru zones — including Outer Ring Road, NH44, Hosur Road, Tumkur Road, and Bellary Road.",
        },
        {
          q: "How much does towing cost in Bengaluru?",
          a: "Car towing within Bengaluru city limits starts from ₹499. Bike towing starts from ₹299. Highway towing is charged per kilometre — transparent pricing before any movement.",
        },
        {
          q: "Do you provide accident towing in Bengaluru?",
          a: "Yes. We provide emergency accident recovery and towing 24/7 across Bengaluru. Our team handles the vehicle carefully and can coordinate with your insurance for cashless towing.",
        },
        {
          q: "Can you tow from Bengaluru's ORR or highway at night?",
          a: "Yes. We operate 24/7 with no extra charge for night towing. Our dispatchers are always on call and tow trucks are on standby across the city.",
        },
      ],
    },
    {
      category: "Puncture & Jump Start in Bengaluru",
      faqs: [
        {
          q: "Is there a 24-hour puncture repair service near me in Bengaluru?",
          a: "Yes. Fiixup is your 24/7 puncture repair service in Bengaluru. We come to your exact location — no hunting for an open shop at midnight.",
        },
        {
          q: "My bike tyre is flat in Bengaluru — how fast can you reach me?",
          a: "Typically within 30–60 minutes anywhere in Bengaluru. We repair tube and tubeless tyres on-site for both bikes and cars.",
        },
        {
          q: "Can you jump start my car in Bengaluru at night?",
          a: "Yes. Battery jump start is available 24/7 throughout Bengaluru with no extra charge for night or weekend call-outs.",
        },
        {
          q: "Is Bengaluru's heat bad for car and bike batteries?",
          a: "Yes. Bengaluru's summer heat accelerates battery degradation. Battery failure is the single most common breakdown reason in the city. If your battery is over 2 years old, book a health check proactively.",
        },
      ],
    },
    {
      category: "Roadside Assistance in Bengaluru",
      faqs: [
        {
          q: "Is there roadside assistance near me in Bengaluru?",
          a: "Yes. Fiixup provides 24/7 emergency roadside assistance across all Bengaluru zones — city roads, ORR, NH corridors, and all IT park belts.",
        },
        {
          q: "Is Fiixup available on Karnataka public holidays in Bengaluru?",
          a: "Yes, 24/7, 365 days — including all Karnataka state holidays and national public holidays.",
        },
        {
          q: "What areas does Fiixup cover in Bengaluru?",
          a: "All areas — Koramangala, Indiranagar, HSR Layout, Whitefield, Marathahalli, Electronic City, Hebbal, Yeshwanthpur, Rajajinagar, JP Nagar, Jayanagar, BTM Layout, Bannerghatta Road, Sarjapur Road, Yelahanka, Bellary Road, and more.",
        },
      ],
    },
  ],

  // ════════════════════════════════════════════════════════════════════════════
  // CHENNAI
  // ════════════════════════════════════════════════════════════════════════════
  chennai: [
    {
      category: "Bike Repair in Chennai",
      faqs: [
        {
          q: "Where can I get a doorstep bike service in Chennai?",
          a: "Fiixup covers all of Chennai — Anna Nagar, T. Nagar, Velachery, OMR, Adyar, Tambaram, Porur, Ambattur, Chromepet, Sholinganallur, Perungudi, Nungambakkam, Mylapore, and beyond.",
        },
        {
          q: "Is there a mobile bike mechanic near me in Chennai?",
          a: "Yes. Fiixup's mobile bike mechanics are available 24/7 across all Chennai zones — just call or WhatsApp for a confirmed ETA.",
        },
        {
          q: "Do you handle TVS bikes specifically in Chennai?",
          a: "Yes! TVS is Chennai-born and we have deep expertise in all TVS models — Apache RTR 160/200, Jupiter, Ntorq 125, Raider 125, Ronin 225, and Star City. Our technicians are trained specifically for TVS engineering.",
        },
        {
          q: "My bike chain is rusting due to Chennai humidity — can you fix it?",
          a: "Yes. Chennai's coastal humidity accelerates chain rust. We clean, lubricate, or replace chains and apply protective coatings specifically suited for Chennai's salt-laden climate.",
        },
        {
          q: "Can I get my bike serviced near OMR or ECR in Chennai?",
          a: "Yes. Full doorstep bike service is available along OMR, ECR, and all tech corridors in Chennai. Many IT professionals on OMR book their bike service during office hours.",
        },
        {
          q: "Does Chennai's coastal air damage my bike faster?",
          a: "Yes. Salty coastal air causes faster corrosion on exhaust pipes, brake components, battery terminals, and chains. We recommend servicing every 2,500 km for Chennai bikes to stay ahead of corrosion.",
        },
        {
          q: "Do you service delivery bikes in Chennai?",
          a: "Yes. We offer priority service and fleet packages for delivery riders (Zomato, Swiggy, Blinkit) across Chennai with fast turnaround to minimise downtime.",
        },
      ],
    },
    {
      category: "Car Repair in Chennai",
      faqs: [
        {
          q: "Which car brands does Fiixup service in Chennai?",
          a: "All popular brands — Maruti, Hyundai, Tata, Honda, Toyota, Kia, MG, Renault, Nissan, Volkswagen, and more. Hyundai and Renault are especially popular in Chennai and our technicians are deeply familiar with both.",
        },
        {
          q: "Can you fix car AC issues caused by Chennai heat?",
          a: "AC service is our most requested car job in Chennai. We carry R134a refrigerant gas and AC components for all major models. Most AC re-gassing and leak repairs are done at your location in under an hour.",
        },
        {
          q: "Does Chennai's coastal weather damage car brakes and battery?",
          a: "Yes. Salty air corrodes brake discs, callipers, and battery terminals faster in Chennai than in inland cities. We recommend bi-annual brake and battery checks for Chennai vehicles.",
        },
        {
          q: "Do you provide doorstep car service on OMR Chennai?",
          a: "Yes. Full doorstep car service is available along the entire OMR stretch — from Perungudi and Sholinganallur to Kelambakkam and beyond.",
        },
        {
          q: "Can you fix electrical problems caused by Chennai flooding?",
          a: "Yes. Monsoon flooding and heavy rain can damage car electricals. We inspect wiring, check the ECU, clean corroded terminals, and replace water-damaged fuses at your location.",
        },
      ],
    },
    {
      category: "Towing Service in Chennai",
      faqs: [
        {
          q: "Is there a towing service near me in Chennai?",
          a: "Yes. Fiixup provides 24/7 flatbed and crane towing for bikes and cars across Chennai, including ECR, OMR, GST Road, and all major Chennai highways.",
        },
        {
          q: "How much does towing cost in Chennai?",
          a: "Car towing within Chennai city starts from ₹499. Bike towing starts from ₹299. ECR and OMR highway towing is priced per kilometre — transparent quote before any movement.",
        },
        {
          q: "Do you provide emergency towing on ECR and OMR in Chennai?",
          a: "Yes. We cover East Coast Road, Old Mahabalipuram Road, GST Road, NH32, and NH48 for emergency breakdown towing and roadside assistance 24/7.",
        },
        {
          q: "Can you tow a bike from anywhere in Chennai?",
          a: "Yes. We provide two-wheeler towing across all Chennai zones and surrounding highways using dedicated bike carriers to prevent any transport damage.",
        },
      ],
    },
    {
      category: "Puncture & Jump Start in Chennai",
      faqs: [
        {
          q: "Is there a 24-hour puncture repair service near me in Chennai?",
          a: "Yes. Fiixup is available 24/7 for bike and car puncture repair across all Chennai zones — no garage visit needed, we come to you.",
        },
        {
          q: "Can you jump start my car in Chennai during summer?",
          a: "Yes. Our battery jump start service is available 24/7 across Chennai. Chennai's extreme summer heat is very hard on batteries — if yours is 2+ years old, ask for a health check after the jump start.",
        },
        {
          q: "My bike tyre is flat near ECR or OMR — can you help?",
          a: "Yes. We cover ECR and OMR for puncture repair and roadside assistance. Call and we dispatch the nearest technician to your exact location immediately.",
        },
        {
          q: "Can you jump start a bike in Chennai?",
          a: "Yes. We jump start all bikes and scooters — Honda Activa, TVS Jupiter, Royal Enfield, Yamaha, Bajaj, and more — across all Chennai zones, 24/7.",
        },
      ],
    },
    {
      category: "Roadside Assistance in Chennai",
      faqs: [
        {
          q: "Is there roadside assistance near me in Chennai?",
          a: "Yes. Fiixup's 24/7 roadside assistance covers all Chennai city zones and major highways — ECR, OMR, GST Road, NH32, NH48, and beyond.",
        },
        {
          q: "Is Fiixup available on Tamil Nadu public holidays in Chennai?",
          a: "Yes, 24/7, 365 days — including all Tamil Nadu state holidays and national public holidays.",
        },
        {
          q: "What areas does Fiixup cover in Chennai?",
          a: "All areas — Anna Nagar, T. Nagar, Velachery, OMR, Adyar, Tambaram, Porur, Ambattur, Chromepet, Sholinganallur, Perungudi, Nungambakkam, Mylapore, Egmore, Teynampet, Alwarpet, Avadi, and more.",
        },
      ],
    },
  ],

  // ════════════════════════════════════════════════════════════════════════════
  // HYDERABAD
  // ════════════════════════════════════════════════════════════════════════════
  hyderabad: [
    {
      category: "Bike Repair in Hyderabad",
      faqs: [
        {
          q: "Where can I get doorstep bike service in Hyderabad?",
          a: "Fiixup covers all of Hyderabad and Secunderabad — Banjara Hills, Hitech City, Gachibowli, Madhapur, Kondapur, Jubilee Hills, Kukatpally, Secunderabad, LB Nagar, Uppal, Malkajgiri, Dilsukhnagar, Miyapur, and more.",
        },
        {
          q: "Is there a mobile bike mechanic near me in Hyderabad?",
          a: "Yes. Fiixup's mobile bike mechanics operate 24/7 across Hyderabad and Secunderabad. Call or WhatsApp for a live ETA.",
        },
        {
          q: "Do you service KTM bikes in Hyderabad?",
          a: "Yes! KTM Duke 200, Duke 390, RC 390, and Adventure 390 are very popular in Hyderabad. Our technicians are specifically trained for KTM's high-performance engines and electronics.",
        },
        {
          q: "How often should I service my bike in Hyderabad's summer?",
          a: "Every 2,500–3,000 km during Hyderabad's extreme summer (40°C+) to prevent engine stress, overheating, and coolant issues. Don't skip the coolant check during peak heat months.",
        },
        {
          q: "Can I get my bike serviced at Hitech City or Gachibowli?",
          a: "Yes. Doorstep bike service is available at all Hitech City, Gachibowli, Madhapur, Kondapur, and HITEC campus areas. Book during office hours and collect your serviced bike at the end of the day.",
        },
        {
          q: "Can Hyderabad's summer heat damage my bike battery?",
          a: "Yes. Extreme heat (40°C+) is the fastest way to kill a two-wheeler battery. If your bike is struggling to start on hot afternoons, call us for a doorstep battery test and replacement.",
        },
        {
          q: "Do you service delivery bikes in Hyderabad?",
          a: "Yes. We offer priority service and fleet packages for Zomato, Swiggy, and Blinkit delivery riders across Hyderabad with fast turnaround to minimise downtime.",
        },
        {
          q: "Do you service bikes in Secunderabad?",
          a: "Yes. We cover the entire twin-city area including Secunderabad, Trimulgherry, Malkajgiri, Uppal, and Alwal for doorstep bike service and emergency assistance.",
        },
      ],
    },
    {
      category: "Car Repair in Hyderabad",
      faqs: [
        {
          q: "Which car brands does Fiixup service in Hyderabad?",
          a: "All popular brands — Maruti, Hyundai, Tata, Honda, Toyota, Kia, MG, Mahindra, and more. We also service select luxury cars like BMW, Mercedes-Benz, Audi, and Volvo for specific services.",
        },
        {
          q: "Do you service luxury and premium cars in Hyderabad?",
          a: "Yes. We service BMW, Mercedes-Benz, Audi, and Volvo for oil changes, brake work, tyre service, battery replacement, and AC maintenance. Contact us to confirm availability for your specific model.",
        },
        {
          q: "Can you fix car AC in Hyderabad's extreme summer heat?",
          a: "Yes. AC service is our top car request in Hyderabad every summer. We carry refrigerant and AC parts for all major models. Most jobs are completed at your location within an hour.",
        },
        {
          q: "Do you cover Secunderabad for doorstep car service?",
          a: "Yes. We cover the entire twin-city area including Secunderabad, Trimulgherry, Malkajgiri, Uppal, and surrounding areas.",
        },
        {
          q: "Can you fix a breakdown on Hyderabad's ORR or NH44?",
          a: "Yes. We provide 24/7 emergency roadside assistance and towing on Hyderabad's Outer Ring Road, NH44, and all major expressways.",
        },
      ],
    },
    {
      category: "Towing Service in Hyderabad",
      faqs: [
        {
          q: "Is there a towing service near me in Hyderabad?",
          a: "Yes. Fiixup provides 24/7 flatbed and crane towing for bikes and cars across Hyderabad, Secunderabad, and all ORR and NH44 corridors.",
        },
        {
          q: "How much does towing cost in Hyderabad?",
          a: "Car towing within Hyderabad city starts from ₹499. Bike towing starts from ₹299. ORR and highway towing is quoted per kilometre — fully transparent before the truck moves.",
        },
        {
          q: "Do you provide emergency towing on ORR and NH44 in Hyderabad?",
          a: "Yes. We provide 24/7 emergency roadside assistance and towing on Hyderabad's Outer Ring Road, NH44, and all expressways including the Shamshabad airport road.",
        },
        {
          q: "Can you tow from Hyderabad airport or Shamshabad?",
          a: "Yes. We cover NH44 including the Shamshabad stretch, Rajiv Gandhi International Airport road, and all access corridors 24/7.",
        },
      ],
    },
    {
      category: "Puncture & Jump Start in Hyderabad",
      faqs: [
        {
          q: "Is there a 24-hour puncture shop near me in Hyderabad?",
          a: "Yes. Fiixup is your 24/7 puncture repair service in Hyderabad. We come to your exact location — no hunting for an open shop at night.",
        },
        {
          q: "Can you jump start my car in Hyderabad?",
          a: "Yes. Battery jump start is available 24/7 across Hyderabad and Secunderabad. We also carry replacement batteries for most popular car and bike models.",
        },
        {
          q: "My bike tyre is flat near Gachibowli or ORR — can you help?",
          a: "Yes. We cover Gachibowli, Nanakramguda, ORR, and surrounding areas for puncture repair. Call and we dispatch the nearest technician immediately.",
        },
        {
          q: "Can you jump start a bike in Hyderabad?",
          a: "Yes. We jump start all two-wheelers — Honda, Bajaj, TVS, Royal Enfield, KTM, Yamaha, and more — anywhere in Hyderabad and Secunderabad.",
        },
      ],
    },
    {
      category: "Roadside Assistance in Hyderabad",
      faqs: [
        {
          q: "Is there roadside assistance near me in Hyderabad?",
          a: "Yes. Fiixup's 24/7 roadside assistance covers all Hyderabad and Secunderabad zones plus ORR and NH corridors.",
        },
        {
          q: "Is Fiixup available on Telangana public holidays in Hyderabad?",
          a: "Yes, 24/7, 365 days — including all Telangana state holidays and national public holidays.",
        },
        {
          q: "What areas does Fiixup cover in Hyderabad?",
          a: "All areas — Banjara Hills, Jubilee Hills, Hitech City, Gachibowli, Madhapur, Kondapur, Kukatpally, Secunderabad, Begumpet, Ameerpet, LB Nagar, Uppal, Dilsukhnagar, Miyapur, Alwal, and more.",
        },
      ],
    },
  ],

  // ════════════════════════════════════════════════════════════════════════════
  // MUMBAI
  // ════════════════════════════════════════════════════════════════════════════
  mumbai: [
    {
      category: "Bike Repair in Mumbai",
      faqs: [
        {
          q: "Where can I get a doorstep bike service in Mumbai?",
          a: "Fiixup covers all of the Mumbai Metropolitan Region — Andheri, Bandra, Powai, Borivali, Malad, Goregaon, Chembur, Kurla, Worli, Thane, Navi Mumbai (Vashi, Kharghar, Belapur), Kalyan, and Dombivli.",
        },
        {
          q: "Is there a mobile bike mechanic near me in Mumbai?",
          a: "Yes. Fiixup's mobile bike mechanics operate 24/7 across all Mumbai zones. Call or WhatsApp for a live ETA — we factor in Mumbai's traffic when calculating arrival time.",
        },
        {
          q: "My bike got waterlogged in Mumbai rains — what should I do?",
          a: "Do not start the engine. Starting a water-logged engine causes hydrostatic lock and catastrophic engine damage. Call Fiixup immediately. We drain the engine, inspect electricals, and assess all damage before any attempt to restart.",
        },
        {
          q: "Does Mumbai's monsoon rust my bike chain and brakes?",
          a: "Yes. Mumbai's heavy monsoon accelerates rust on chains, sprockets, brake discs, and exposed metal parts. We recommend a post-monsoon service every year — chain, brakes, tyres, and full electrical inspection.",
        },
        {
          q: "Do you service delivery bikes for Zomato, Swiggy, and Blinkit in Mumbai?",
          a: "Yes! We offer priority doorstep bike service and bulk fleet packages for delivery partners across Mumbai. Fast turnaround is our priority so you lose minimum delivery time.",
        },
        {
          q: "Can I get my bike serviced at my Mumbai office?",
          a: "Yes. Doorstep bike service is available at BKC, Andheri MIDC, Powai, Thane, and Navi Mumbai commercial zones during office hours.",
        },
        {
          q: "Can Fiixup reach me in Navi Mumbai or Thane for bike service?",
          a: "Yes. We cover Navi Mumbai (Vashi, Belapur, Kharghar, Airoli) and Thane city for doorstep bike service and emergency roadside assistance.",
        },
        {
          q: "Do you service electric scooters like Ola S1 in Mumbai?",
          a: "Yes. We service Ola S1, Ather 450X, TVS iQube, Bajaj Chetak, and other electric scooters for tyre, brake, suspension, and non-battery electrical work across Mumbai.",
        },
      ],
    },
    {
      category: "Car Repair in Mumbai",
      faqs: [
        {
          q: "Which car brands does Fiixup service in Mumbai?",
          a: "All popular brands — Maruti, Hyundai, Tata, Honda, Toyota, Kia, MG, Mahindra, Volkswagen, and more.",
        },
        {
          q: "Does Mumbai's monsoon damage car electricals?",
          a: "Yes. Water ingress into the car interior and engine bay is very common during Mumbai flooding. We check and waterproof electrical connections, inspect the ECU, replace water-damaged fuses and relays, and dry out interior wiring.",
        },
        {
          q: "My car broke down after driving through a flooded road in Mumbai — what should I do?",
          a: "Do not re-start the engine. Switch off immediately and call Fiixup. Water entering the engine through the air intake causes hydrostatic lock — a catastrophic failure that costs lakhs in repairs. We assess the damage before any attempt to restart.",
        },
        {
          q: "Can you do pre-monsoon car servicing in Mumbai?",
          a: "Yes. Pre-monsoon is the best time for a comprehensive check — brakes, tyres, wipers, windshield seals, underbody corrosion, and electrical inspection. Book your pre-monsoon check before the rains hit.",
        },
        {
          q: "Do you cover Navi Mumbai and Thane for doorstep car service?",
          a: "Yes. We cover the full Mumbai Metropolitan Region including Navi Mumbai (Vashi, Kharghar, Belapur), Thane, Kalyan, and Dombivli.",
        },
        {
          q: "How do you deal with Mumbai's traffic when arriving for a service?",
          a: "We factor Mumbai's traffic patterns into our dispatch — assigning the closest available technician to you, not the nearest in straight-line distance. Our aim is 45–75 minutes for city zones and 60–90 minutes during peak traffic.",
        },
      ],
    },
    {
      category: "Towing Service in Mumbai",
      faqs: [
        {
          q: "Is there a towing service near me in Mumbai?",
          a: "Yes. Fiixup provides 24/7 flatbed and crane towing for bikes and cars across Mumbai, Thane, and Navi Mumbai — including all expressways and coastal roads.",
        },
        {
          q: "How much does towing cost in Mumbai?",
          a: "Car towing within Mumbai city starts from ₹599 (slightly higher due to toll costs and expressway access). Bike towing starts from ₹399. All pricing is quoted before the truck moves.",
        },
        {
          q: "Can you tow from the Mumbai–Pune Expressway?",
          a: "Yes. We cover the Mumbai–Pune Expressway and NH48. Call immediately for emergency roadside assistance and towing from any point on the expressway.",
        },
        {
          q: "Do you provide towing on the Eastern and Western Express Highway in Mumbai?",
          a: "Yes. We cover WEH (Western Express Highway), Eastern Express Highway, Eastern Freeway, and all Mumbai elevated corridors for breakdown towing 24/7.",
        },
        {
          q: "Can you tow a flooded or waterlogged car in Mumbai?",
          a: "Yes. We provide specialised waterlogged vehicle recovery during and after Mumbai's monsoon season. Do not try to start the engine — call us first for a safe recovery.",
        },
        {
          q: "Can you tow a bike in Mumbai?",
          a: "Yes. We tow all two-wheelers across Mumbai, Thane, and Navi Mumbai using dedicated bike carriers to prevent any transport damage.",
        },
      ],
    },
    {
      category: "Puncture & Jump Start in Mumbai",
      faqs: [
        {
          q: "Is there a 24-hour puncture repair service near me in Mumbai?",
          a: "Yes. Fiixup is your 24/7 puncture shop in Mumbai. We come to your road, parking lot, or home — no searching for an open shop at night.",
        },
        {
          q: "Mumbai roads cause a lot of tyre damage — how fast can you reach me?",
          a: "We aim for 45–75 minutes anywhere in Mumbai city, factoring in traffic. For Thane and Navi Mumbai, 60–90 minutes. We repair tube and tubeless tyres for both bikes and cars on-site.",
        },
        {
          q: "Can you jump start my car in Mumbai during monsoon season?",
          a: "Yes. Battery jump start is available 24/7 across Mumbai. Monsoon humidity accelerates terminal corrosion and battery drain — if your battery is 2+ years old, ask for a health check when we arrive.",
        },
        {
          q: "Can you jump start a bike in Mumbai?",
          a: "Yes. We jump start all bikes and scooters — Honda Activa, Royal Enfield, Bajaj, TVS, KTM, Yamaha, and more — anywhere in Mumbai, Thane, and Navi Mumbai.",
        },
        {
          q: "What if I get a flat tyre on the Bandra–Worli Sea Link or Mumbai expressways?",
          a: "Pull over to the emergency lane immediately and switch on hazard lights. Do not change the tyre on the bridge or expressway. Call Fiixup — we dispatch a tow truck or emergency response immediately for expressway breakdowns.",
        },
      ],
    },
    {
      category: "Roadside Assistance in Mumbai",
      faqs: [
        {
          q: "Is there roadside assistance near me in Mumbai?",
          a: "Yes. Fiixup provides 24/7 emergency roadside assistance across all Mumbai zones — city roads, expressways, coastal roads, and the full Mumbai Metropolitan Region.",
        },
        {
          q: "Is Fiixup fully operational during Mumbai monsoon season?",
          a: "Yes, 24/7, 365 days. We are fully operational during Mumbai's monsoon — in fact, breakdown and towing demand peaks during the rains and we scale up capacity accordingly.",
        },
        {
          q: "What areas does Fiixup cover in Mumbai?",
          a: "All areas — Andheri, Bandra, Powai, Borivali, Malad, Goregaon, Chembur, Kurla, Worli, Dadar, Matunga, BKC, Lower Parel, Thane, Navi Mumbai (Vashi, Kharghar, Belapur), Kalyan, Dombivli, and more.",
        },
      ],
    },
  ],
};

// ── Utility functions ─────────────────────────────────────────────────────────

export function getCityFAQs(slug: string): FAQCategory[] {
  return cityFAQs[slug] ?? [];
}

/** Flatten all FAQs in a category list to a flat array — for FAQPage JSON-LD schema */
export function flattenFAQs(categories: FAQCategory[]): { q: string; a: string }[] {
  return categories.flatMap((c) => c.faqs);
}

/** Merge city FAQs first, then global FAQs — useful for city landing pages */
export function getMergedFAQs(slug: string): FAQCategory[] {
  return [...getCityFAQs(slug), ...globalFAQs];
}
