// lib/data/faqs.ts — All FAQ data (global + per-city)
import type { FAQCategory } from "@/lib/models/faq.model";

// ── Global FAQ page ──────────────────────────────────────────────────────────
export const globalFAQs: FAQCategory[] = [
  {
    category: "General",
    faqs: [
      { q: "What is Fiixup?", a: "Fiixup is a 24/7 doorstep car and bike repair service operating across major Indian cities. Our certified technicians come to your home, office, or wherever your vehicle is." },
      { q: "Which cities do you operate in?", a: "We operate in Bengaluru, Chennai, Hyderabad, and Mumbai — with more cities coming soon!" },
      { q: "How quickly can a technician arrive?", a: "Our technicians typically arrive within 30–60 minutes. For emergency breakdowns, we prioritise arrival within 30 minutes." },
      { q: "What are your service hours?", a: "We are available 24/7, 365 days a year including public holidays and weekends." },
    ],
  },
  {
    category: "Booking & Pricing",
    faqs: [
      { q: "How do I book a service?", a: "You can book via our website contact form, call your city's number, or WhatsApp us. We'll confirm your booking within minutes." },
      { q: "Is there a visit charge?", a: "We charge a minimal visit fee which is waived if you proceed with the service. No hidden charges — pricing is shared upfront." },
      { q: "Do you provide a quote before starting?", a: "Yes, our technician diagnoses the issue and provides a transparent quote before starting any repair." },
      { q: "What payment methods do you accept?", a: "We accept UPI (GPay, PhonePe, Paytm), cash, debit/credit cards, and net banking." },
    ],
  },
  {
    category: "Car Services",
    faqs: [
      { q: "Which car brands do you service?", a: "All popular brands — Maruti, Hyundai, Honda, Tata, Toyota, Kia, MG, Mahindra, Volkswagen, Skoda, and more." },
      { q: "Do you carry spare parts?", a: "Yes, our service vans are stocked with common parts. For rare parts, we source them same-day." },
      { q: "Can you do major engine repairs at my doorstep?", a: "We handle most repairs at your doorstep. For very major overhauls, we may need to tow the vehicle to our workshop." },
    ],
  },
  {
    category: "Bike Services",
    faqs: [
      { q: "Which bike brands do you service?", a: "All popular brands — Honda, Bajaj, TVS, Royal Enfield, Yamaha, Suzuki, Hero, KTM, and more." },
      { q: "Do you service scooters?", a: "Yes — Honda Activa, TVS Jupiter, Suzuki Access, Yamaha Fascino, and all other scooters." },
      { q: "How often should I service my bike?", a: "Every 3,000–5,000 km or every 3 months, whichever comes first." },
    ],
  },
  {
    category: "Quality & Warranty",
    faqs: [
      { q: "Is there a warranty on repairs?", a: "Yes — all repairs come with a 30-day service warranty. If the same issue recurs within 30 days, we fix it free of charge." },
      { q: "Do you use genuine parts?", a: "Yes, we use OEM or high-quality aftermarket parts for all repairs." },
      { q: "Are your technicians certified?", a: "Yes — all Fiixup technicians are certified, background-verified, and trained for both cars and bikes." },
    ],
  },
];

// ── Per-city FAQs ─────────────────────────────────────────────────────────────
export const cityFAQs: Record<string, FAQCategory[]> = {

  bengaluru: [
    {
      category: "Service in Bengaluru",
      faqs: [
        { q: "Which areas in Bengaluru do you cover?", a: "All areas including Koramangala, Whitefield, Indiranagar, HSR Layout, Marathahalli, Electronic City, Jayanagar, Rajajinagar, Hebbal, Yeshwanthpur, and more." },
        { q: "How fast can you reach me in Bengaluru?", a: "Within 30–60 minutes anywhere in Bengaluru. For Outer Ring Road or highway emergencies, we dispatch the nearest technician immediately." },
        { q: "Do you cover Bengaluru's Electronic City and Whitefield IT parks?", a: "Yes — we have dedicated coverage for Electronic City, Whitefield, and all major IT corridors. Same-day and scheduled service available." },
        { q: "Is your Bengaluru service available on Karnataka public holidays?", a: "Yes, 24/7, 365 days including all Karnataka and national public holidays." },
      ],
    },
    {
      category: "Car Services in Bengaluru",
      faqs: [
        { q: "Which car brands do you service in Bengaluru?", a: "All popular brands — Maruti, Hyundai, Tata, Honda, Toyota, Kia, MG, Mahindra, Volkswagen, Skoda, and more." },
        { q: "Do you provide emergency service on Bengaluru's ORR or NH44?", a: "Yes! We cover Outer Ring Road, NH44, Hosur Road, and all Bengaluru expressways 24/7." },
        { q: "Can Bengaluru's potholed roads damage my car's suspension?", a: "Absolutely — Bengaluru's roads are hard on suspensions and tyres. We specialise in pothole damage repair including struts, shock absorbers, alignment, and wheel balancing." },
      ],
    },
    {
      category: "Bike Services in Bengaluru",
      faqs: [
        { q: "Which bike brands do you service in Bengaluru?", a: "Honda, Bajaj, TVS, Royal Enfield, Yamaha, Hero, KTM, Suzuki, and all other popular two-wheelers." },
        { q: "Do you service Royal Enfield bikes in Bengaluru?", a: "Yes! Royal Enfield is hugely popular in Bengaluru and our technicians are specially trained for Bullet, Classic, Meteor, Himalayan, and Thunderbird models." },
        { q: "Can I get a bike service at my Bengaluru office?", a: "Yes — doorstep service includes office premises across Bengaluru's IT parks and business districts." },
      ],
    },
  ],

  chennai: [
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

  hyderabad: [
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

  mumbai: [
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
};

export function getCityFAQs(slug: string): FAQCategory[] {
  return cityFAQs[slug] ?? [];
}

/** Flatten all FAQs in a category list to a single array — useful for FAQPage schema */
export function flattenFAQs(categories: FAQCategory[]): { q: string; a: string }[] {
  return categories.flatMap((c) => c.faqs);
}
