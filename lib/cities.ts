// lib/cities.ts — migrated from src/app/data/cities.ts
import { CityData } from './models/city.model';


const cities: CityData[] = [

  // ═══════════════════════════════════════
  //  BENGALURU
  // ═══════════════════════════════════════
  {
    slug: "bangalore",
    name: "Bangalore",
    state: "Karnataka",
    phone: "+91 81974 59732",
    whatsapp: "918197459732",
    email: "bangalore@fiixup.in",
    areas: [
  { 
    name: "Koramangala", 
    slug: "koramangala", 
    highlight: "Doorstep car & bike repair in Koramangala – fast service for startups and residents" 
  },
  { 
    name: "Whitefield", 
    slug: "whitefield", 
    highlight: "24/7 car breakdown & bike repair in Whitefield IT corridor – quick support near tech parks" 
  },
  { 
    name: "Indiranagar", 
    slug: "indiranagar", 
    highlight: "Premium doorstep auto care in Indiranagar – trusted car & bike service with quick response" 
  },
  { 
    name: "HSR Layout", 
    slug: "hsr-layout", 
    highlight: "Specialists for bike & car repair in HSR Layout – doorstep service at affordable rates" 
  },
  { 
    name: "Marathahalli", 
    slug: "marathahalli", 
    highlight: "Emergency car & bike repair in Marathahalli – pothole damage and breakdown support" 
  },
  { 
    name: "Electronic City", 
    slug: "electronic-city", 
    highlight: "24/7 doorstep car & bike repair in Electronic City – fast service for IT park employees" 
  },
  { 
    name: "Jayanagar", 
    slug: "jayanagar", 
    highlight: "Family car care in Jayanagar – reliable doorstep auto repair for daily commuters" 
  },
  { 
    name: "JP Nagar", 
    slug: "jp-nagar", 
    highlight: "Comprehensive car & bike service in JP Nagar – doorstep repair with expert mechanics" 
  },
  {
    name: "Rajajinagar",
    slug: "rajajinagar",
    highlight: "Trusted doorstep car & bike repair in Rajajinagar – quick and affordable auto service"
  },
  {
    name: "Banashankari",
    slug: "banashankari",
    highlight: "Doorstep car & bike repair in Banashankari – expert mechanics at your service"
  }
],

    heroTagline: "Serving Bangalore",
    metaTitle: "24/7 Doorstep Car & Bike Repair in Bangalore | Fiixup",
    metaDescription: "Professional car and bike repair at your doorstep in Bangalore. Certified technicians, honest pricing, 24/7 emergency service across Koramangala, Whitefield, Indiranagar & more.",
    metaKeywords: "car service Bangalore, bike repair Bangalore, doorstep mechanic Bangalore, 24/7 auto repair Bangalore",

    // About
    aboutHeading: "Why Bangalore Trusts Fiixup for Doorstep Auto Repair",
    aboutPara1: "Fiixup brings the workshop to your doorstep across Bangalore! We're the city's most trusted 24/7 mobile auto repair service for both cars and bikes. No more wasting hours in Bangalore's infamous traffic to reach a garage — our certified technicians come to you in Koramangala, Whitefield, Indiranagar, HSR Layout, or wherever you are.",
    aboutPara2: "We understand Bangalore's unique challenges — potholed roads that damage suspensions, monsoon flooding that affects electricals, and the city's busy schedules that leave no time for garage visits. Fiixup solves all of this with transparent pricing, honest diagnostics, and genuine parts — right at your doorstep.",
    aboutBullets: [
      { heading: "24/7 Across All of Bangalore", text: "From Hebbal to Electronic City, Rajajinagar to Whitefield — we cover every corner of Bangalore around the clock." },
      { heading: "Bangalore Road Damage Specialists", text: "Our technicians are experienced in suspension, tyre, and alignment issues caused by Bangalore's road conditions." },
      { heading: "Transparent Pricing in Bangalore", text: "No garage markup. No hidden charges. Detailed estimates before we start — trusted by 10,000+ Bangalore customers." },
    ],
    statsLabel: "Bangalore Coverage",

    // Services
    servicesSectionHeading: "Car & Bike Services at Your Doorstep in Bangalore",
    servicesSectionSubtext: "From routine oil changes in Koramangala to emergency engine repairs in Whitefield — our certified technicians handle it all across Bangalore.",
    carServicesHeading: "Car Services in Bangalore",
    bikeServicesHeading: "Bike Services in Bangalore",
    cityServiceHighlights: [
      { title: "Bangalore Pothole Damage Repair", description: "Suspension, wheel alignment, and tyre damage caused by Bangalore's roads — diagnosed and repaired at your doorstep." },
      { title: "Monsoon Electrical & Brake Check — Bangalore", description: "Bangalore's heavy rains affect brakes, wiring, and battery. Book a pre/post-monsoon health check today." },
    ],

    // Testimonials
    testimonialsHeading: "What Bangalore Customers Say About Fiixup",
    testimonialsSubtext: "Trusted by thousands of car and bike owners across Koramangala, Whitefield, Indiranagar, HSR Layout, and all of Bangalore.",
    testimonials: [
      { name: "Rajesh Kumar", rating: 5, text: "My car broke down on Outer Ring Road during peak traffic. Fiixup reached Marathahalli in 25 minutes flat and fixed it on the spot. Lifesaver!", date: "March 2026", vehicle: "Car Owner", area: "Marathahalli, Bangalore" },
      { name: "Priya Sharma", rating: 5, text: "Best bike service in Bangalore! They came to my office in Whitefield for regular servicing. Professional, on-time, and very reasonably priced.", date: "February 2026", vehicle: "Bike Owner", area: "Whitefield, Bangalore" },
      { name: "Arjun Reddy", rating: 5, text: "Called at 2 AM when my car wouldn't start in Indiranagar. Fiixup was there within 30 minutes. True 24/7 service — can't recommend enough!", date: "March 2026", vehicle: "Car Owner", area: "Indiranagar, Bangalore" },
      { name: "Sneha Patel", rating: 5, text: "Got my Activa serviced at my HSR Layout home. The technician was knowledgeable and explained everything clearly. Will use Fiixup every time!", date: "January 2026", vehicle: "Bike Owner", area: "HSR Layout, Bangalore" },
    ],

    faqCategories: [
      {
        category: "Service in Bangalore",
        faqs: [
          { q: "Which areas in Bangalore do you cover?", a: "We cover all areas including Koramangala, Whitefield, Indiranagar, HSR Layout, Marathahalli, Electronic City, Jayanagar, JP Nagar, Rajajinagar, Malleshwaram, Yeshwanthpur, and more." },
          { q: "How fast can you reach me in Bangalore?", a: "Our technicians arrive within 30–60 minutes anywhere in Bangalore. For ORR or Electronic City breakdowns, we dispatch the nearest available technician immediately." },
          { q: "Do you serve both North and South Bangalore?", a: "Yes — from Hebbal and Yelahanka in the north to Bannerghatta Road and Electronic City in the south, we cover all of Bangalore." },
          { q: "Is your Bangalore service available on weekends and holidays?", a: "Yes, 24/7, 365 days a year — including weekends, Kannada Rajyotsava, and all public holidays." },
        ],
      },
      {
        category: "Booking & Pricing — Bangalore",
        faqs: [
          { q: "How do I book a service in Bangalore?", a: "Call +91 81974 59732, WhatsApp us, or fill the contact form. Booking confirmed within minutes." },
          { q: "What is the visit charge for Bangalore?", a: "A minimal visit fee applies, waived when you proceed with the repair. No hidden charges — pricing shared upfront." },
          { q: "Do you accept UPI in Bangalore?", a: "Yes — GPay, PhonePe, Paytm, cash, and cards all accepted." },
        ],
      },
      {
        category: "Car Services in Bangalore",
        faqs: [
          { q: "Which car brands do you service in Bangalore?", a: "All popular brands — Maruti, Hyundai, Tata, Honda, Toyota, Kia, MG, Mahindra, Volkswagen, Skoda, Ford, and more." },
          { q: "Can you fix pothole damage to my car in Bangalore?", a: "Yes! Suspension damage, tyre punctures, wheel alignment — all repaired at your doorstep. Bangalore roads are our speciality." },
          { q: "Do you service electric vehicles in Bangalore?", a: "We service hybrid vehicles and handle basic EV maintenance. Full EV service coming soon to Bangalore." },
        ],
      },
      {
        category: "Bike Services in Bangalore",
        faqs: [
          { q: "Which bike brands do you service in Bangalore?", a: "Honda, Bajaj, TVS, Royal Enfield, Yamaha, Hero, Suzuki, KTM, and all other popular brands." },
          { q: "Can you service my Royal Enfield in Bangalore?", a: "Yes! RE servicing is one of our most popular services. We handle Bullet, Classic 350, Meteor, Himalayan — all models." },
          { q: "Do you service scooters in Bangalore?", a: "Yes — Activa, TVS Jupiter, Suzuki Access, Yamaha Fascino, and Ola S1 across all of Bangalore." },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════
  //  CHENNAI
  // ═══════════════════════════════════════
  {
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    phone: "+91 98400 00000",
    whatsapp: "919840000000",
    email: "chennai@fiixup.in",
    areas: ["Anna Nagar", "T. Nagar", "Velachery", "OMR", "Adyar"],
    heroTagline: "Serving Chennai",
    metaTitle: "24/7 Doorstep Car & Bike Repair in Chennai | Fiixup",
    metaDescription: "Professional car and bike repair at your doorstep in Chennai. Certified technicians, honest pricing, 24/7 emergency service across Anna Nagar, T. Nagar, Velachery & more.",
    metaKeywords: "car service Chennai, bike repair Chennai, doorstep mechanic Chennai, 24/7 auto repair Chennai",

    // About
    aboutHeading: "Why Chennai Vehicle Owners Choose Fiixup",
    aboutPara1: "Fiixup brings professional auto repair to your doorstep across Chennai! We're Chennai's trusted 24/7 mobile car and bike repair service — serving Anna Nagar, T. Nagar, Velachery, OMR, Adyar, and all areas citywide. No garage trips, no waiting — our certified technicians arrive at your location fast.",
    aboutPara2: "Chennai's coastal humidity, scorching heat, and heavy monsoon rains put unique stress on vehicles. Our technicians are specially trained to handle corrosion damage, AC failures, battery issues, and monsoon-related electrical faults — common problems for Chennai car and bike owners.",
    aboutBullets: [
      { heading: "24/7 Across All of Chennai", text: "From Anna Nagar to OMR, Tambaram to Ambattur — we cover every part of Chennai around the clock." },
      { heading: "Chennai Climate Specialists", text: "Coastal humidity causes faster corrosion. Our technicians proactively check and protect brakes, battery terminals, and wiring for Chennai conditions." },
      { heading: "Transparent Pricing in Chennai", text: "No hidden garage fees. Upfront estimates. Trusted by thousands of Chennai car and bike owners." },
    ],
    statsLabel: "Chennai Coverage",

    // Services
    servicesSectionHeading: "Car & Bike Services at Your Doorstep in Chennai",
    servicesSectionSubtext: "From AC gas recharge in T. Nagar to emergency breakdown on ECR — our technicians cover all of Chennai 24/7.",
    carServicesHeading: "Car Services in Chennai",
    bikeServicesHeading: "Bike Services in Chennai",
    cityServiceHighlights: [
      { title: "Chennai Heat — AC & Cooling Service", description: "Chennai's extreme heat demands peak AC performance. We recharge refrigerant gas and repair compressors at your doorstep across Chennai." },
      { title: "Coastal Corrosion Protection — Chennai", description: "Salt air from the Bay of Bengal accelerates rust on brakes, battery terminals, and exhausts. We inspect and protect your vehicle against Chennai's coastal climate." },
    ],

    // Testimonials
    testimonialsHeading: "What Chennai Customers Say About Fiixup",
    testimonialsSubtext: "Trusted by thousands of car and bike owners across Anna Nagar, T. Nagar, Velachery, OMR, Adyar, and all of Chennai.",
    testimonials: [
      { name: "Karthik Rajan", rating: 5, text: "My car AC stopped working in the Chennai heat. Fiixup reached my OMR office in 40 minutes and recharged the gas on the spot. Excellent service!", date: "March 2026", vehicle: "Car Owner", area: "OMR, Chennai" },
      { name: "Deepa Subramaniam", rating: 5, text: "Fiixup serviced my Activa at my home in Velachery. Very professional, cleaned the chain, changed oil, and checked the brakes. Highly recommend!", date: "February 2026", vehicle: "Bike Owner", area: "Velachery, Chennai" },
      { name: "Vikram Nair", rating: 5, text: "Battery died at 11 PM in Adyar. Fiixup arrived within 35 minutes with a replacement battery and got me back on the road. Amazing 24/7 service!", date: "March 2026", vehicle: "Car Owner", area: "Adyar, Chennai" },
      { name: "Meena Krishnan", rating: 5, text: "The TVS Apache service at my Anna Nagar home was perfect. Technician was polite, skilled, and the pricing was very fair. Will use again!", date: "January 2026", vehicle: "Bike Owner", area: "Anna Nagar, Chennai" },
    ],

    faqCategories: [
      {
        category: "Service in Chennai",
        faqs: [
          { q: "Which areas in Chennai do you cover?", a: "All areas including Anna Nagar, T. Nagar, Velachery, OMR, Adyar, Tambaram, Porur, Ambattur, Chromepet, Sholinganallur, and more." },
          { q: "How fast can you reach me in Chennai?", a: "Within 30–60 minutes anywhere in Chennai. For ECR or OMR emergencies, we dispatch the nearest technician immediately." },
          { q: "Does Chennai's coastal weather affect my vehicle?", a: "Yes — salty coastal air causes faster corrosion on brakes, battery terminals, and exhausts. We recommend more frequent checks for Chennai vehicles." },
          { q: "Is your Chennai service available 24/7?", a: "Yes, 24/7, 365 days including weekends and Tamil Nadu public holidays." },
        ],
      },
      {
        category: "Car Services in Chennai",
        faqs: [
          { q: "Which car brands do you service in Chennai?", a: "All popular brands — Maruti, Hyundai, Tata, Honda, Toyota, Kia, MG, Renault, Nissan, Volkswagen, and more." },
          { q: "Do you provide emergency service on ECR and OMR Chennai?", a: "Yes! We cover East Coast Road, Old Mahabalipuram Road, and all major Chennai highways for emergency breakdown." },
          { q: "Can you fix AC issues from Chennai's heat?", a: "AC service is our most requested service in Chennai. We carry refrigerant gas and AC parts for all major car models." },
        ],
      },
      {
        category: "Bike Services in Chennai",
        faqs: [
          { q: "Which bike brands do you service in Chennai?", a: "Honda, Bajaj, TVS, Royal Enfield, Yamaha, Hero, Suzuki, and all other popular two-wheelers." },
          { q: "Do you handle TVS bikes specifically?", a: "Yes! TVS is Chennai-based and we have deep expertise in all TVS models — Apache, Jupiter, Ntorq, Raider, and more." },
          { q: "My bike chain is rusting due to Chennai's humidity — can you fix it?", a: "Yes. We clean, lubricate, or replace chains and apply protective treatments specifically for Chennai's coastal climate." },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════
  //  HYDERABAD
  // ═══════════════════════════════════════
  {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    phone: "+91 90000 00000",
    whatsapp: "919000000000",
    email: "hyderabad@fiixup.in",
    areas: ["Banjara Hills", "Hitech City", "Gachibowli", "Madhapur", "Kondapur"],
    heroTagline: "Serving Hyderabad",
    metaTitle: "24/7 Doorstep Car & Bike Repair in Hyderabad | Fiixup",
    metaDescription: "Professional car and bike repair at your doorstep in Hyderabad. Certified technicians, honest pricing, 24/7 emergency service across Banjara Hills, Hitech City & more.",
    metaKeywords: "car service Hyderabad, bike repair Hyderabad, doorstep mechanic Hyderabad, 24/7 auto repair Hyderabad",

    // About
    aboutHeading: "Why Hyderabad Vehicle Owners Trust Fiixup",
    aboutPara1: "Fiixup delivers professional auto repair to your doorstep across Hyderabad! We are Hyderabad's reliable 24/7 mobile car and bike repair service — covering Banjara Hills, Hitech City, Gachibowli, Madhapur, Kondapur, Secunderabad, and all areas citywide. Skip the traffic, skip the garage wait.",
    aboutPara2: "Hyderabad's scorching summers (up to 45°C) and fast-growing IT corridor traffic put intense stress on vehicles. Our technicians understand Hyderabad-specific issues — overheating engines, battery drain from heat, and suspension wear from the city's roads — and fix them efficiently at your location.",
    aboutBullets: [
      { heading: "24/7 Across Hyderabad & Secunderabad", text: "Hitech City to LB Nagar, Kukatpally to Jubilee Hills — complete coverage across the twin cities, always." },
      { heading: "Hyderabad Summer Heat Specialists", text: "Extreme Hyderabad summers overheat engines, drain batteries, and stress cooling systems. We diagnose and fix these on the spot." },
      { heading: "Transparent Pricing in Hyderabad", text: "Upfront quotes, zero hidden charges. Trusted by thousands of Hyderabad's IT professionals and families." },
    ],
    statsLabel: "Hyderabad Coverage",

    // Services
    servicesSectionHeading: "Car & Bike Services at Your Doorstep in Hyderabad",
    servicesSectionSubtext: "From engine diagnostics in Hitech City to emergency battery service in Banjara Hills — Fiixup covers all of Hyderabad 24/7.",
    carServicesHeading: "Car Services in Hyderabad",
    bikeServicesHeading: "Bike Services in Hyderabad",
    cityServiceHighlights: [
      { title: "Hyderabad Summer Engine & Cooling Service", description: "Hyderabad's extreme heat causes engine overheating and coolant issues. We check radiators, coolant levels, and cooling systems at your doorstep." },
      { title: "ORR Emergency Breakdown — Hyderabad", description: "Broke down on Hyderabad's Outer Ring Road? Our rapid response team reaches you on ORR, NH44, and all major Hyderabad expressways." },
    ],

    // Testimonials
    testimonialsHeading: "What Hyderabad Customers Say About Fiixup",
    testimonialsSubtext: "Trusted by thousands of car and bike owners across Banjara Hills, Hitech City, Gachibowli, Kondapur, and all of Hyderabad.",
    testimonials: [
      { name: "Suresh Reddy", rating: 5, text: "Car overheated on the ORR during summer. Fiixup reached Gachibowli in 35 minutes and sorted the coolant issue on the spot. Outstanding service!", date: "March 2026", vehicle: "Car Owner", area: "Gachibowli, Hyderabad" },
      { name: "Lakshmi Prasad", rating: 5, text: "Got my KTM Duke serviced at my Hitech City apartment. The technician knew the bike inside out. Quick, clean, and professional!", date: "February 2026", vehicle: "Bike Owner", area: "Hitech City, Hyderabad" },
      { name: "Ravi Shankar", rating: 5, text: "Battery died at midnight in Banjara Hills. Fiixup arrived in 30 minutes with the right battery. Excellent 24/7 emergency service in Hyderabad!", date: "March 2026", vehicle: "Car Owner", area: "Banjara Hills, Hyderabad" },
      { name: "Anitha Rao", rating: 5, text: "My Activa servicing at my Kondapur home was hassle-free and affordable. Highly recommend Fiixup to all Hyderabad two-wheeler owners!", date: "January 2026", vehicle: "Bike Owner", area: "Kondapur, Hyderabad" },
    ],

    faqCategories: [
      {
        category: "Service in Hyderabad",
        faqs: [
          { q: "Which areas in Hyderabad do you cover?", a: "All areas — Banjara Hills, Hitech City, Gachibowli, Madhapur, Kondapur, Jubilee Hills, Kukatpally, Secunderabad, LB Nagar, and more." },
          { q: "Do you cover Secunderabad as well?", a: "Yes — we cover the entire twin-city area including Secunderabad, Trimulgherry, Malkajgiri, and Uppal." },
          { q: "How fast can you reach me in Hyderabad?", a: "Within 30–60 minutes. For ORR or NH44 emergencies, we dispatch the nearest technician immediately." },
          { q: "Is the service available on Telangana public holidays?", a: "Yes, 24/7, 365 days a year including all Telangana and national public holidays." },
        ],
      },
      {
        category: "Car Services in Hyderabad",
        faqs: [
          { q: "Which car brands do you service in Hyderabad?", a: "All popular brands — Maruti, Hyundai, Tata, Honda, Toyota, Kia, MG, Mahindra, and more." },
          { q: "Can you handle ORR breakdown emergencies?", a: "Yes! We provide 24/7 emergency roadside assistance on ORR, NH44, and all major Hyderabad expressways." },
          { q: "Do you service luxury and premium cars in Hyderabad?", a: "Yes, we service BMW, Mercedes, Audi, and Volvo for select services. Contact us to confirm for your model." },
        ],
      },
      {
        category: "Bike Services in Hyderabad",
        faqs: [
          { q: "Which bike brands do you service in Hyderabad?", a: "Honda, Bajaj, TVS, Royal Enfield, Yamaha, Hero, KTM, Suzuki, and all other popular two-wheelers." },
          { q: "Do you service KTM bikes in Hyderabad?", a: "Yes! KTM Duke and Adventure series are very popular in Hyderabad and our technicians are trained for all KTM models." },
          { q: "How often should I service my bike in Hyderabad's summer?", a: "Every 2,500–3,000 km during Hyderabad's extreme summer (40°C+) to prevent engine stress and coolant issues." },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════
  //  MUMBAI
  // ═══════════════════════════════════════
  {
    slug: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    phone: "+91 91000 00000",
    whatsapp: "919100000000",
    email: "mumbai@fiixup.in",
    areas: ["Andheri", "Bandra", "Powai", "Thane", "Navi Mumbai"],
    heroTagline: "Serving Mumbai",
    metaTitle: "24/7 Doorstep Car & Bike Repair in Mumbai | Fiixup",
    metaDescription: "Professional car and bike repair at your doorstep in Mumbai. Certified technicians, honest pricing, 24/7 emergency service across Andheri, Bandra, Powai & more.",
    metaKeywords: "car service Mumbai, bike repair Mumbai, doorstep mechanic Mumbai, 24/7 auto repair Mumbai",

    // About
    aboutHeading: "Why Mumbai Vehicle Owners Choose Fiixup",
    aboutPara1: "Fiixup brings professional auto repair to your doorstep across Mumbai! We are Mumbai's trusted 24/7 mobile car and bike service — covering Andheri, Bandra, Powai, Thane, Navi Mumbai, Borivali, Chembur, Worli, and all areas across the Mumbai Metropolitan Region.",
    aboutPara2: "Mumbai's heavy monsoons, waterlogged roads, and legendary traffic make vehicle maintenance both critical and challenging. Our technicians are experts in Mumbai-specific issues — monsoon electrical damage, waterlogged engines, brake corrosion, and pothole-related suspension wear — all fixed at your doorstep.",
    aboutBullets: [
      { heading: "24/7 Across Mumbai, Thane & Navi Mumbai", text: "Western suburbs to Eastern suburbs, Thane to Navi Mumbai — complete coverage across the entire MMR, always available." },
      { heading: "Mumbai Monsoon Specialists", text: "Waterlogged engine? Flooded electricals? Our technicians are trained for Mumbai's monsoon-related vehicle damage — don't start the engine, call us first!" },
      { heading: "Transparent Pricing in Mumbai", text: "Zero hidden garage fees. Honest upfront estimates. Trusted by thousands of Mumbai commuters, families, and delivery partners." },
    ],
    statsLabel: "Mumbai MMR Coverage",

    // Services
    servicesSectionHeading: "Car & Bike Services at Your Doorstep in Mumbai",
    servicesSectionSubtext: "From monsoon electrical repair in Andheri to emergency breakdown on the Expressway — Fiixup covers all of Mumbai 24/7.",
    carServicesHeading: "Car Services in Mumbai",
    bikeServicesHeading: "Bike Services in Mumbai",
    cityServiceHighlights: [
      { title: "Mumbai Monsoon Vehicle Rescue", description: "Waterlogged engine or flooded electricals? Do NOT start the car. Call Fiixup immediately — we drain, inspect, and repair monsoon damage across Mumbai." },
      { title: "Mumbai-Pune Expressway Emergency Breakdown", description: "Broke down on the Mumbai-Pune Expressway or NH48? Our rapid response team covers Mumbai's major highways 24/7." },
    ],

    // Testimonials
    testimonialsHeading: "What Mumbai Customers Say About Fiixup",
    testimonialsSubtext: "Trusted by thousands of car and bike owners across Andheri, Bandra, Powai, Thane, Navi Mumbai, and all of the MMR.",
    testimonials: [
      { name: "Rahul Mehta", rating: 5, text: "My car got waterlogged during Mumbai rains in Andheri. Called Fiixup at 9 PM — they arrived in 45 minutes, drained the engine, and saved it from total damage. Absolute lifesavers!", date: "March 2026", vehicle: "Car Owner", area: "Andheri, Mumbai" },
      { name: "Sneha Joshi", rating: 5, text: "Fiixup serviced my Activa at my Bandra home. They were on time, professional, and the price was very fair. Best doorstep bike service in Mumbai!", date: "February 2026", vehicle: "Bike Owner", area: "Bandra, Mumbai" },
      { name: "Amit Kulkarni", rating: 5, text: "Tyre burst on the Expressway near Powai. Fiixup reached me in 40 minutes with a replacement tyre. Emergency service that actually works in Mumbai!", date: "March 2026", vehicle: "Car Owner", area: "Powai, Mumbai" },
      { name: "Pooja Desai", rating: 5, text: "Got my delivery bike serviced in Navi Mumbai. Fiixup even offers fleet packages for delivery riders — very professional and affordable!", date: "January 2026", vehicle: "Bike Owner", area: "Navi Mumbai" },
    ],

    faqCategories: [
      {
        category: "Service in Mumbai",
        faqs: [
          { q: "Which areas in Mumbai do you cover?", a: "All of Mumbai including Andheri, Bandra, Powai, Borivali, Malad, Goregaon, Chembur, Kurla, Worli, Thane, Navi Mumbai, Kalyan, and Dombivli." },
          { q: "How quickly can you arrive given Mumbai's traffic?", a: "We factor in Mumbai's traffic and aim for 45–75 minutes. For WEH or Eastern Freeway breakdowns, we dispatch the nearest technician." },
          { q: "Do you cover Navi Mumbai and Thane?", a: "Yes — we cover the full Mumbai Metropolitan Region including Navi Mumbai, Thane, Kalyan, and Dombivli." },
          { q: "Is monsoon season a good time for vehicle service in Mumbai?", a: "Pre-monsoon is the best time. We strongly recommend a brake, tyre, wiper, and electrical check before the Mumbai rains hit." },
        ],
      },
      {
        category: "Car Services in Mumbai",
        faqs: [
          { q: "Which car brands do you service in Mumbai?", a: "All popular brands — Maruti, Hyundai, Tata, Honda, Toyota, Kia, MG, Mahindra, Volkswagen, and more." },
          { q: "Can you help if my car breaks down on the Mumbai-Pune Expressway?", a: "Yes — we cover the Mumbai-Pune Expressway and NH48. Call immediately for emergency roadside assistance." },
          { q: "Does Mumbai's monsoon damage car electricals?", a: "Yes — water ingress is very common in Mumbai. We check and waterproof electrical connections, fix wiring, and replace fuses affected by flooding." },
        ],
      },
      {
        category: "Bike Services in Mumbai",
        faqs: [
          { q: "Which bike brands do you service in Mumbai?", a: "Honda, Bajaj, TVS, Royal Enfield, Yamaha, Hero, Suzuki, KTM, and all other popular two-wheelers." },
          { q: "My bike got waterlogged in Mumbai rains — what should I do?", a: "Don't start the engine! Call Fiixup immediately. We drain the engine, check electricals, and assess damage to prevent engine seizure." },
          { q: "Do you service delivery bikes for Zomato/Swiggy riders in Mumbai?", a: "Yes! We offer priority doorstep service and bulk fleet packages for delivery partners in Mumbai." },
        ],
      },
    ],
  },
];

export default cities;

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug.toLowerCase());
}
// Add this to your lib/cities.ts
export function getAreaBySlug(citySlug: string, areaSlug: string) {
  const city = getCityBySlug(citySlug);
  if (!city) return null;
  
  const area = city.areas.find((a: any) => 
    typeof a === "string" ? a.toLowerCase().replace(/ /g, "-") === areaSlug : a.slug === areaSlug
  );

  return area ? { city, area } : null;
}