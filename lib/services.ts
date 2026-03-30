// lib/services.ts — migrated from src/app/data/services.ts


export interface ServiceData {
  slug: string;           // URL → /services/car-brake-service
  title: string;          // Page H1
  shortTitle: string;     // Card title
  category: 'car' | 'bike';
  icon: string;
  tagline: string;        // One-liner under H1
  description: string;    // Long paragraph for SEO
  price: string;          // Starting price shown on card
  duration: string;       // Estimated time
  features: string[];     // Bullet points on detail page
  faqs: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

const services: ServiceData[] = [
  // ── CAR SERVICES ──
  {
    slug: 'car-breakdown-assistance',
    title: 'Car Breakdown Assistance — 24/7 Roadside Help',
    shortTitle: 'Breakdown Assistance',
    category: 'car',
    icon: 'AlertTriangle',
    tagline: 'Stranded on the road? Our mechanics come to you.',
    description:
      'Fiixup provides emergency car breakdown assistance anytime, anywhere. Whether your car won’t start, overheats, or stalls suddenly, our certified mechanics arrive quickly with tools and parts to get you back on the road.',
    price: '₹299',
    duration: '30–90 min',
    features: [
      'Emergency roadside repair',
      'Jump-start & battery replacement',
      'Minor mechanical fixes on the spot',
      'Towing arranged if required',
      'All car makes & models supported',
    ],
    faqs: [
      { q: 'Do you provide towing?', a: 'Yes, towing service is available if the car cannot be repaired on the spot.' },
      { q: 'How fast can you arrive?', a: 'Typically within 30–60 minutes depending on location.' },
      { q: 'Is service available at night?', a: 'Yes, 24/7 roadside assistance is available.' },
    ],
    metaTitle: 'Car Breakdown Assistance | 24/7 Roadside Help',
    metaDescription: 'Emergency car breakdown service. Roadside repair, jump-start, towing, battery replacement. Certified car mechanics available 24/7.',
    metaKeywords: 'car breakdown service, roadside assistance, car mechanic, towing service, emergency car repair',
  },
  {
    slug: 'puncture-repair',
    title: 'Flat Tyre & Puncture Repair Service',
    shortTitle: 'Puncture Repair',
    category: 'car',
    icon: 'Tire',
    tagline: 'Flat tyre? We fix it at your location.',
    description:
      'Fiixup offers quick puncture repair and flat tyre replacement at your doorstep or roadside. Our mechanics carry portable tyre equipment to patch punctures, replace tyres, and balance wheels on the spot.',
    price: '₹199',
    duration: '30–60 min',
    features: [
      'Tyre puncture patching',
      'Portable tyre replacement',
      'Wheel balancing',
      'Spare tyre fitting',
      'All car & bike tyres supported',
    ],
    faqs: [
      { q: 'Can you replace tyres at home?', a: 'Yes, we carry portable tyre-changing equipment for doorstep replacement.' },
      { q: 'Do you fix bike tyres too?', a: 'Yes, puncture repair is available for both cars and bikes.' },
      { q: 'Is service available on highways?', a: 'Yes, roadside puncture repair is available anywhere.' },
    ],
    metaTitle: 'Flat Tyre & Puncture Repair | Doorstep & Roadside',
    metaDescription: 'Flat tyre or puncture? Get quick repair or replacement at your location. Car & bike tyres supported. 24/7 service.',
    metaKeywords: 'puncture repair, flat tyre service, tyre replacement, roadside tyre repair, bike puncture repair',
  },
  {
    slug: 'towing-service',
    title: 'Emergency Vehicle Towing Service',
    shortTitle: 'Towing Service',
    category: 'car',
    icon: 'Truck',
    tagline: 'Reliable towing when your vehicle can’t move.',
    description:
      'Fiixup provides professional towing service for cars and bikes. Whether after a breakdown, accident, or dead battery, our towing partners safely transport your vehicle to the nearest workshop or your preferred location.',
    price: '₹499',
    duration: 'Varies',
    features: [
      'Flatbed towing for cars',
      'Bike towing available',
      'Accident recovery',
      'Breakdown towing',
      '24/7 availability',
    ],
    faqs: [
      { q: 'Do you tow bikes too?', a: 'Yes, towing is available for both cars and bikes.' },
      { q: 'Is towing available at night?', a: 'Yes, 24/7 towing service is available.' },
      { q: 'Where will you tow my vehicle?', a: 'We tow to the nearest workshop or your preferred destination.' },
    ],
    metaTitle: 'Emergency Vehicle Towing Service | 24/7 Available',
    metaDescription: 'Reliable towing service for cars & bikes. Breakdown towing, accident recovery, flatbed transport. Available 24/7.',
    metaKeywords: 'towing service, car towing, bike towing, breakdown towing, accident recovery',
  },
  {
    slug: 'car-mechanic-service',
    title: 'Certified Car Mechanic — Doorstep & Roadside',
    shortTitle: 'Car Mechanic',
    category: 'car',
    icon: 'Wrench',
    tagline: 'Expert car mechanics available anytime, anywhere.',
    description:
      'Fiixup connects you with certified car mechanics for all repair needs. From minor fixes to major repairs, our mechanics handle brakes, batteries, engines, and more — all at your location.',
    price: '₹399',
    duration: '30–120 min',
    features: [
      'General car repair',
      'Brake & clutch service',
      'Battery & electrical fixes',
      'Engine diagnostics',
      'All brands supported',
    ],
    faqs: [
      { q: 'Do you repair all car brands?', a: 'Yes, we support all popular car makes and models.' },
      { q: 'Is doorstep service available?', a: 'Yes, mechanics come to your home, office, or roadside.' },
      { q: 'Do you provide warranty?', a: 'Yes, all repairs come with a service warranty.' },
    ],
    metaTitle: 'Car Mechanic Service | Doorstep & Roadside',
    metaDescription: 'Certified car mechanics for all repairs. Brake, battery, engine, puncture, breakdown service. Doorstep & roadside help available.',
    metaKeywords: 'car mechanic, mobile mechanic, car repair service, doorstep car repair, roadside car mechanic',
  },
  {
    slug: 'car-general-repair',
    title: 'Car General Repair — Doorstep Service',
    shortTitle: 'General Car Repairs',
    category: 'car',
    icon: 'Wrench',
    tagline: 'Comprehensive car diagnostics & repair at your doorstep.',
    description:
      'Fiixup offers professional car general repair services at your doorstep across Bangalore. Our certified technicians handle everything from minor fixes to complex engine repairs for all car makes and models — Maruti, Hyundai, Honda, Tata, Toyota, and more. No garage visits needed.',
    price: '₹499',
    duration: '1–3 hrs',
    features: [
      'Full vehicle health check',
      'Engine, suspension & steering inspection',
      'All car makes & models covered',
      'Genuine & OEM parts used',
      'Doorstep service across Bangalore',
      '30-day service warranty',
    ],
    faqs: [
      { q: 'How quickly can a technician arrive?', a: 'Our technicians typically arrive within 30–60 minutes anywhere.' },
      { q: 'Do you carry spare parts?', a: 'Yes, our service vans are stocked with common parts. For rare parts, we source them same-day.' },
      { q: 'Is there a warranty on repairs?', a: 'Yes, all repairs come with a 30-day service warranty.' },
    ],
    metaTitle: 'Car General Repair at Doorstep | Fiixup',
    metaDescription: 'Professional car repair at your doorstep. Certified mechanics for all car makes. 24/7 available. Book now — starting ₹499.',
    metaKeywords: 'car repair Bangalore, doorstep car repair, car general service Bangalore, mobile mechanic Bangalore',
  },
  {
    slug: 'car-brake-service',
    title: 'Car Brake Service & Repair',
    shortTitle: 'Brake Service',
    category: 'car',
    icon: 'Car',
    tagline: 'Safe brakes save lives. Get yours checked at your doorstep.',
    description:
      'Fiixup provides complete car brake inspection, brake pad replacement, and rotor resurfacing at your doorstep. Worn brakes are dangerous — our certified technicians diagnose and fix brake issues for all car models quickly and affordably without you visiting a garage.',
    price: '₹799',
    duration: '1–2 hrs',
    features: [
      'Full brake system inspection',
      'Brake pad & disc replacement',
      'Brake fluid flush & refill',
      'ABS sensor check',
      'All car models supported',
      'Doorstep service',
    ],
    faqs: [
      { q: 'How do I know if my brakes need servicing?', a: 'Squealing sounds, longer stopping distance, or a spongy brake pedal are common signs.' },
      { q: 'How long does brake pad replacement take?', a: 'Typically 1–2 hours at your doorstep.' },
      { q: 'Do you use original brake pads?', a: 'Yes, we use OEM or high-quality aftermarket pads suited to your car model.' },
    ],
    metaTitle: 'Car Brake Service & Repair at Doorstep | Fiixup',
    metaDescription: 'Expert car brake pad replacement, disc inspection & brake fluid change at your doorstep. 24/7 service. Starting ₹799.',
    metaKeywords: 'car brake service Bangalore, brake pad replacement Bangalore, doorstep brake repair Bangalore',
  },
  {
    slug: 'car-oil-change',
    title: 'Doorstep Car Oil Change Service',
    shortTitle: 'Oil Changes',
    category: 'car',
    icon: 'Droplet',
    tagline: 'Fresh oil, healthy engine — done at your home or office.',
    description:
      'Fiixup offers fast and affordable doorstep car oil change services. Regular oil changes are the single most important maintenance task for your car\'s engine. Our technicians bring the right grade of engine oil for your vehicle and complete the job in under an hour.',
    price: '₹599',
    duration: '45–60 min',
    features: [
      'Engine oil drain & refill',
      'Oil filter replacement',
      'All fluid levels checked & topped up',
      'Correct oil grade for your model',
      'Synthetic, semi-synthetic & mineral options',
      'Service reminder sticker fitted',
    ],
    faqs: [
      { q: 'How often should I change my car oil?', a: 'Every 5,000–10,000 km depending on your car model and oil type.' },
      { q: 'What oil grades do you carry?', a: 'We carry 5W-30, 5W-40, 10W-40, and 15W-40 — suitable for most Indian car models.' },
      { q: 'Can I book same-day oil change?', a: 'Yes! We offer same-day doorstep oil change across Bangalore.' },
    ],
    metaTitle: 'Doorstep Car Oil Change | Fiixup — Starting ₹599',
    metaDescription: 'Get your car oil changed at home or office. Fast, affordable doorstep engine oil service. All car models. Book in 60 seconds.',
    metaKeywords: 'car oil change Bangalore, doorstep oil change Bangalore, engine oil service Bangalore, mobile oil change',
  },
  {
    slug: 'car-engine-diagnostics',
    title: 'Car Engine Diagnostics at Doorstep',
    shortTitle: 'Engine Diagnostics',
    category: 'car',
    icon: 'Gauge',
    tagline: 'Check engine light on? We diagnose it at your location.',
    description:
      'Fiixup uses advanced OBD2 diagnostic tools to identify engine faults, error codes, and performance issues right at your doorstep. Our certified technicians provide honest, transparent diagnostics reports and fix the issue on the spot whenever possible.',
    price: '₹399',
    duration: '30–60 min',
    features: [
      'OBD2 computer scan & error code reading',
      'Engine health report provided',
      'Fuel system & sensor checks',
      'Emission system diagnosis',
      'On-spot repairs where possible',
      'Transparent pricing — no hidden charges',
    ],
    faqs: [
      { q: 'What does the check engine light mean?', a: 'It can indicate anything from a loose fuel cap to a serious engine fault. Our scan tells you exactly.' },
      { q: 'Do you fix the issue after diagnosing?', a: 'Yes, most common issues are fixed on the spot. Complex repairs may need a follow-up visit.' },
      { q: 'How accurate is the diagnosis?', a: 'We use professional-grade OBD2 scanners compatible with all modern cars.' },
    ],
    metaTitle: 'Car Engine Diagnostics at Doorstep | Fiixup',
    metaDescription: 'Check engine light on? Get professional OBD2 car engine diagnostics at your doorstep. Honest report. Starting ₹399.',
    metaKeywords: 'car engine diagnostics Bangalore, OBD2 scan Bangalore, check engine light Bangalore, car computer scan',
  },
  {
    slug: 'car-ac-service',
    title: 'Car AC Service & Repair at Doorstep',
    shortTitle: 'AC Service',
    category: 'car',
    icon: 'Wind',
    tagline: 'Cool cabin, hot Bangalore — keep your AC in top shape.',
    description:
      'Fiixup provides complete car AC service, gas recharge, and repair at your doorstep. From AC not cooling to compressor issues, our technicians diagnose and fix all car air conditioning problems for all makes and models without you needing to visit a garage.',
    price: '₹899',
    duration: '1–2 hrs',
    features: [
      'AC gas (refrigerant) recharge',
      'Compressor health check',
      'Condenser & evaporator inspection',
      'Cabin air filter replacement',
      'AC cooling performance test',
      'All car models supported',
    ],
    faqs: [
      { q: 'Why is my car AC not cooling?', a: 'Low refrigerant gas, a faulty compressor, or a blocked condenser are the most common causes.' },
      { q: 'How long does AC gas recharge take?', a: 'About 45–60 minutes at your location.' },
      { q: 'What refrigerant gas do you use?', a: 'We use R-134a for older cars and R-1234yf for newer models as required.' },
    ],
    metaTitle: 'Car AC Service & Repair at Doorstep | Fiixup',
    metaDescription: 'Car AC not cooling? Get doorstep AC service, gas recharge & repair. All models. 24/7 available. Starting ₹899.',
    metaKeywords: 'car AC service Bangalore, car AC repair Bangalore, AC gas recharge Bangalore, doorstep AC service',
  },
  {
    slug: 'car-battery-electrical',
    title: 'Car Battery Replacement & Electrical Repair',
    shortTitle: 'Battery & Electrical',
    category: 'car',
    icon: 'Battery',
    tagline: 'Dead battery or electrical fault? We come to you — 24/7.',
    description:
      'Fiixup offers doorstep car battery replacement, electrical fault diagnosis, and wiring repair services across Bangalore. Whether your car won\'t start, headlights are flickering, or you have a dead battery — our certified technicians arrive at your location within the hour.',
    price: '₹299',
    duration: '30–90 min',
    features: [
      'Battery health test & replacement',
      'Jump-start service',
      'Alternator & starter motor check',
      'Fuse & relay inspection',
      'Headlight & indicator repair',
      'All car makes supported',
    ],
    faqs: [
      { q: 'Can you replace my battery at my home?', a: 'Yes! We carry batteries for most popular car models and replace them on the spot.' },
      { q: 'How long does a car battery last?', a: 'Typically 3–5 years depending on usage and climate conditions.' },
      { q: 'Do you provide jump-start service?', a: 'Yes, we provide emergency jump-start service 24/7 across Bangalore.' },
    ],
    metaTitle: 'Car Battery Replacement & Electrical Repair | Fiixup',
    metaDescription: 'Dead car battery? Get doorstep battery replacement & electrical repair 24/7. All models. Emergency jump-start available.',
    metaKeywords: 'car battery replacement Bangalore, car electrical repair Bangalore, jump start Bangalore, dead battery service',
  },

  // ── BIKE SERVICES ──
  {
    slug: 'bike-general-service',
    title: 'Bike General Service at Doorstep',
    shortTitle: 'Bike General Service',
    category: 'bike',
    icon: 'Bike',
    tagline: 'Complete two-wheeler servicing at your home or office.',
    description:
      'Fiixup provides complete doorstep bike servicing including chain cleaning, engine oil change, air filter cleaning, brake adjustment, and full tune-up. We service all popular bike brands — Honda, Bajaj, TVS, Royal Enfield, Yamaha, Suzuki, and more.',
    price: '₹349',
    duration: '1–2 hrs',
    features: [
      'Engine oil drain & refill',
      'Air filter cleaning / replacement',
      'Chain cleaning, lubrication & adjustment',
      'Brake adjustment & inspection',
      'Tyre pressure check',
      'All bike brands supported',
    ],
    faqs: [
      { q: 'How often should I service my bike?', a: 'Every 3,000–5,000 km or every 3 months, whichever comes first.' },
      { q: 'Do you service Royal Enfield bikes?', a: 'Yes, we service all Royal Enfield models including Bullet, Classic, Meteor, and Himalayan.' },
      { q: 'Can I book a same-day bike service?', a: 'Yes, same-day doorstep bike service is available across Bangalore.' },
    ],
    metaTitle: 'Doorstep Bike Service | All Brands | Fiixup',
    metaDescription: 'Complete bike servicing at your doorstep. All brands — Honda, Bajaj, Royal Enfield, TVS, Yamaha. Starting ₹349. Book now.',
    metaKeywords: 'bike service Bangalore, doorstep bike service, two wheeler service Bangalore, motorcycle service Bangalore',
  },
  {
    slug: 'bike-engine-repair',
    title: 'Bike Engine Repair at Doorstep',
    shortTitle: 'Engine Repair',
    category: 'bike',
    icon: 'Cog',
    tagline: 'Expert motorcycle engine repair without the garage hassle.',
    description:
      'Fiixup offers expert doorstep bike engine repair. From knocking sounds and power loss to overheating and oil leaks, our certified technicians diagnose and repair two-wheeler engine problems for all motorcycle and scooter brands across Bangalore.',
    price: '₹599',
    duration: '2–4 hrs',
    features: [
      'Engine noise & vibration diagnosis',
      'Piston, valve & gasket inspection',
      'Carburettor cleaning & tuning',
      'Fuel injection service',
      'Oil leak repair',
      'Performance tuning',
    ],
    faqs: [
      { q: 'What are signs my bike engine needs repair?', a: 'Knocking sounds, excessive smoke, power loss, or unusual vibrations are key warning signs.' },
      { q: 'Can you repair scooters too?', a: 'Yes, we repair engines for all scooters including Activa, Dio, Access, and Ntorq.' },
      { q: 'How long does bike engine repair take?', a: 'Minor repairs take 2–3 hours. Major overhauls may require a follow-up appointment.' },
    ],
    metaTitle: 'Bike Engine Repair at Doorstep | Fiixup',
    metaDescription: 'Expert bike engine repair at your doorstep. All brands including Royal Enfield, Bajaj, Honda. 24/7 service. Starting ₹599.',
    metaKeywords: 'bike engine repair Bangalore, motorcycle engine service Bangalore, two wheeler engine repair, doorstep bike repair',
  },
  {
    slug: 'bike-electrical-repair',
    title: 'Bike Electrical Repair at Doorstep',
    shortTitle: 'Electrical Works',
    category: 'bike',
    icon: 'Zap',
    tagline: 'Battery, wiring, lights — fixed at your location.',
    description:
      'Fiixup provides complete bike electrical repair services at your doorstep. Whether it\'s a dead battery, faulty wiring, broken headlight, or indicator problems — our technicians carry all the tools and parts needed to fix electrical issues for all two-wheeler brands on the spot.',
    price: '₹299',
    duration: '30–90 min',
    features: [
      'Battery test & replacement',
      'Headlight & tail light repair',
      'Indicator & horn repair',
      'Wiring short circuit diagnosis',
      'Speedometer & instrument cluster',
      'Starter motor & self-start repair',
    ],
    faqs: [
      { q: 'My bike won\'t start — can you fix it at my home?', a: 'Yes, most starting issues are electrical and can be fixed at your doorstep within an hour.' },
      { q: 'Do you carry batteries for all bike brands?', a: 'We carry batteries for Honda, Bajaj, TVS, Yamaha, Royal Enfield, and most popular models.' },
      { q: 'Is same-day repair available?', a: 'Yes, same-day doorstep electrical repair is available 24/7 across Bangalore.' },
    ],
    metaTitle: 'Bike Electrical Repair at Doorstep | Fiixup',
    metaDescription: 'Bike battery dead? Headlight not working? Get doorstep bike electrical repair. All brands. 24/7 service. Starting ₹299.',
    metaKeywords: 'bike electrical repair Bangalore, two wheeler battery replacement, bike wiring repair Bangalore',
  },
  {
    slug: 'bike-brake-clutch',
    title: 'Bike Brake & Clutch Repair',
    shortTitle: 'Brake & Clutch',
    category: 'bike',
    icon: 'Settings',
    tagline: 'Spongy brakes or stiff clutch? Fixed at your doorstep.',
    description:
      'Fiixup provides doorstep bike brake pad replacement, disc brake service, and clutch adjustment & repair across Bangalore. Worn brakes on a bike are extremely dangerous — our certified technicians restore your stopping power quickly and affordably at your home or office.',
    price: '₹399',
    duration: '1–2 hrs',
    features: [
      'Brake pad & shoe replacement',
      'Disc brake inspection & bleeding',
      'Drum brake adjustment',
      'Clutch cable adjustment & replacement',
      'Clutch plate inspection',
      'All bike models supported',
    ],
    faqs: [
      { q: 'How do I know if my bike brakes need replacement?', a: 'If you hear grinding sounds, feel reduced stopping power, or notice the lever going to the handlebar.' },
      { q: 'Do you adjust hydraulic disc brakes?', a: 'Yes, we service both hydraulic disc brakes and cable-operated drum brakes.' },
      { q: 'Can clutch issues be fixed at home?', a: 'Cable-related clutch issues are usually fixed on the spot. Clutch plate replacement is also possible at your doorstep.' },
    ],
    metaTitle: 'Bike Brake & Clutch Repair at Doorstep | Fiixup',
    metaDescription: 'Bike brake pad replacement & clutch repair at your doorstep. All brands. Safe, fast & affordable. Starting ₹399.',
    metaKeywords: 'bike brake service Bangalore, clutch repair Bangalore, bike brake pad replacement, two wheeler brake repair',
  },
  {
    slug: 'bike-parts-replacement',
    title: 'Bike Parts Replacement Service',
    shortTitle: 'Parts Replacement',
    category: 'bike',
    icon: 'CircuitBoard',
    tagline: 'Genuine & aftermarket parts fitted at your doorstep.',
    description:
      'Fiixup offers doorstep bike parts replacement using genuine OEM and quality aftermarket parts. From tyres and chains to mirrors, levers, and body panels — our technicians source and fit parts for all popular two-wheeler brands quickly at your location.',
    price: '₹199',
    duration: 'Varies',
    features: [
      'Tyre replacement & balancing',
      'Chain & sprocket replacement',
      'Mirror, lever & handle replacements',
      'Seat & body panel fitment',
      'Genuine & OEM parts used',
      'All popular bike brands covered',
    ],
    faqs: [
      { q: 'Do you source parts for rare bike models?', a: 'Yes, we can source parts for most models within 24 hours and schedule a doorstep fitting.' },
      { q: 'Are the parts you use genuine?', a: 'We use genuine OEM parts whenever available, or high-quality aftermarket alternatives.' },
      { q: 'Can you replace tyres at my home?', a: 'Yes, we carry portable tyre-changing equipment for doorstep tyre replacement.' },
    ],
    metaTitle: 'Bike Parts Replacement at Doorstep | Fiixup',
    metaDescription: 'Doorstep bike parts replacement. Tyres, chains, mirrors & more. Genuine OEM parts. All brands. Book now — starting ₹199.',
    metaKeywords: 'bike parts replacement Bangalore, two wheeler spare parts Bangalore, bike tyre replacement Bangalore',
  },
  {
    slug: 'bike-regular-maintenance',
    title: 'Bike Regular Maintenance Service',
    shortTitle: 'Regular Maintenance',
    category: 'bike',
    icon: 'Shield',
    tagline: 'Keep your bike running like new with scheduled maintenance.',
    description:
      'Fiixup offers scheduled bike maintenance plans to keep your two-wheeler in peak condition. Regular maintenance prevents costly breakdowns, improves fuel efficiency, and extends the life of your bike. Our technicians come to your home or office on a schedule that suits you.',
    price: '₹449',
    duration: '1–2 hrs',
    features: [
      'Full bike inspection & health report',
      'Engine oil & filter change',
      'Air filter service',
      'Chain & tyre service',
      'Brake & clutch check',
      'Scheduled service reminders',
    ],
    faqs: [
      { q: 'Can I set up a recurring maintenance schedule?', a: 'Yes! We offer monthly, quarterly, and kilometre-based maintenance plans.' },
      { q: 'Do you send reminders when my bike is due for service?', a: 'Yes, we send SMS/WhatsApp reminders before your next scheduled service.' },
      { q: 'Does regular maintenance improve fuel efficiency?', a: 'Yes, a well-maintained bike can improve fuel efficiency by 10–15%.' },
    ],
    metaTitle: 'Scheduled Bike Maintenance at Doorstep | Fiixup',
    metaDescription: 'Keep your bike in top shape with regular doorstep maintenance. Monthly & quarterly plans available. Starting ₹449.',
    metaKeywords: 'bike maintenance Bangalore, scheduled bike service Bangalore, two wheeler maintenance plan Bangalore',
  },
];

export default services;

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}

export const carServices = services.filter((s) => s.category === 'car');
export const bikeServices = services.filter((s) => s.category === 'bike');
