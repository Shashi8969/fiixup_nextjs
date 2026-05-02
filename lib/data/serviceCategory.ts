// lib/data/serviceCategory.ts
import { Car, Bike, Truck, Battery, ShipWheel, Wrench, ShieldCheck, Clock, IndianRupee } from "lucide-react";
import { 
  carServices, bikeServices, towingServices, 
  batteryServices, punctureServices, roadsideServices, mechanicServices 
} from "../services";

export const serviceCategories = [
  {
    slug: "car",
    link: "services/car",
    title: "Car Services",
    tagline: "Professional Doorstep Car Repair & Maintenance in India",
    description: "Expert mechanics at your home or office. From general service to complex engine diagnostics, we handle it all with genuine parts and transparent pricing.",
    data: carServices,
    icon: Car,
    color: "blue",
    bgColor: "bg-white",
    // --- SEO Metadata ---
    metaTitle: "Doorstep Car Service & Repair | Professional Mechanics",
    metaDescription: "Get certified car mechanics at your doorstep. We offer car general service, oil changes, brake repairs, and diagnostics for all major brands. Book online 24/7.",
    keywords: "car service near me, doorstep car repair, car mechanic home visit, car oil change at home",
    
    // --- Why Choose Us (ServiceBenefits) ---[cite: 13]
    benefits: [
      { icon: "ShieldCheck", title: "OEM Spare Parts", body: "We use only 100% genuine parts for all car repairs to ensure longevity." },
      { icon: "Wrench", title: "Certified Mechanics", body: "Our technicians are trained to handle premium and luxury car brands." },
      { icon: "IndianRupee", title: "Upfront Pricing", body: "No hidden costs. Get a detailed estimate before we start any work." },
      { icon: "Clock", title: "90-Min Arrival", body: "Emergency or scheduled, our team reaches you within 90 minutes." }
    ],

    // --- Pricing Summary (PricingTable) ---[cite: 12]
    pricingSummary: {
      rows: [
        { label: "Basic Health Checkup", priceFrom: 499, highlight: false },
        { label: "Standard Car Service", priceFrom: 1999, note: "Includes oil change & filter", highlight: true },
        { label: "Brake Pad Replacement", priceFrom: 1200 },
        { label: "AC Gas Top-up", priceFrom: 899 }
      ],
      competitors: [
        { name: "Fiixup", price: "Starting ₹499", arrivalTime: "30-60 mins", doorstep: true },
        { name: "Local Garage", price: "Variable", arrivalTime: "N/A", doorstep: false },
        { name: "Authorized Center", price: "Premium", arrivalTime: "2-3 Days", doorstep: false }
      ],
      disclaimer: "Prices vary based on car segment (Hatchback/Sedan/SUV)."
    },

    // --- Brand Coverage (BrandsGrid) ---[cite: 9]
    brands: [
      { name: "Maruti Suzuki", models: ["Swift", "Baleno", "Alto", "Vitara Brezza"] },
      { name: "Hyundai", models: ["i20", "Creta", "Verna", "Venue"] },
      { name: "Tata Motors", models: ["Nexon", "Punch", "Harrier", "Tiago"] },
      { name: "Mahindra", models: ["XUV700", "Scorpio", "Thar", "Bolero"] },
      { name: "Honda", models: ["City", "Amaze", "Civic"] }
    ],

    // --- Long Form Content (CompleteGuide) - 1000+ Words Structure ---
    guide: {
      title: "The Comprehensive Guide to Modern Doorstep Car Maintenance",
      intro: "In today's fast-paced world, finding time to take your car to a service center is a luxury many don't have. Fiixup brings the entire garage to your doorstep, ensuring your vehicle stays in peak condition without disrupting your schedule.",
      sections: [
        {
          heading: "Understanding the Importance of Regular Car Servicing",
          body: "Routine maintenance is the heartbeat of your vehicle. Neglecting oil changes or brake inspections can lead to catastrophic engine failure or safety risks. A well-maintained car offers better fuel efficiency, a smoother ride, and a significantly higher resale value. \n\n Our doorstep car service involves a 50-point checklist covering the engine, transmission, electrical systems, and underbody components. By catching small issues early—like a minor coolant leak or worn-out spark plugs—you save thousands in potential repair bills.",
          tips: ["Check tire pressure weekly", "Never ignore the 'Check Engine' light"]
        },
        {
          heading: "Doorstep vs. Traditional Service Centers: A Comparison",
          body: "Traditional service centers often require you to drop your car off for the entire day, leaving you stranded. Furthermore, you rarely get to see what happens under the hood. \n\n With Fiixup's doorstep service, you get total transparency. You can watch our mechanics work, verify the genuine parts being installed, and get your car back in under 2 hours. This model eliminates overhead costs associated with large showrooms, allowing us to pass those savings directly to you.",
          tips: ["Watch the oil being drained to ensure total replacement"]
        }
        // ... Additional 5-8 sections to reach 1000+ words
      ],
      conclusion: "Proper car care is an investment, not an expense. With Fiixup, you get the reliability of an authorized center with the convenience of a home visit."
    },

    // --- FAQ Data ---
    faqs: [
      { question: "Is doorstep car service as good as a workshop?", answer: "Yes, our mobile service units carry professional tools and diagnostic scanners to perform 90% of car repairs at your location." },
      { question: "Do you use genuine oil and filters?", answer: "We use only OEM-recommended lubricants like Castrol or Shell and genuine filters to protect your warranty." }
    ]
  },
  {
    slug: "towing",
    link: "services/towing",
    title: "Towing Services",
    tagline: "24/7 Fast & Reliable Vehicle Recovery Services",
    description: "Stuck in the middle of nowhere? Our flatbed and crane towing trucks are available 24/7 to recover your car or bike safely.",
    data: towingServices,
    icon: Truck,
    color: "amber",
    bgColor: "bg-white",
    metaTitle: "24/7 Car & Bike Towing Service | Flatbed Towing Near Me",
    metaDescription: "Reliable 24/7 towing services for cars and bikes. Flatbed towing, crane recovery, and long-distance vehicle transport. Arriving in 30 minutes.",
    benefits: [
      { icon: "Clock", title: "30-Min Arrival", body: "We have a fleet spread across the city to ensure rapid response." },
      { icon: "ShieldCheck", title: "Safe Transport", body: "Damaged vehicle recovery using modern flatbed technology." }
    ],
    pricingSummary: {
      rows: [
        { label: "Standard Towing (up to 5km)", priceFrom: 1200, highlight: true },
        { label: "Outstation/Long Distance", priceFrom: 2500, note: "Per km rates apply" }
      ],
      competitors: [
        { name: "Fiixup", price: "Flat ₹1200", arrivalTime: "30 mins", doorstep: true }
      ],
      disclaimer: "Night charges may apply between 11 PM and 6 AM."
    },
    guide: {
      title: "What to Do When Your Vehicle Breaks Down: A Safety Guide",
      intro: "A breakdown on a busy highway can be stressful. Knowing who to call and how to stay safe is critical.",
      sections: [
        {
          heading: "Safety First: Immediate Steps",
          body: "Move your vehicle to the shoulder if possible. Turn on hazard lights. Use a reflective triangle. Once safe, call Fiixup for 24/7 towing. Our dispatchers will track your location via GPS and send the nearest tow truck immediately.",
          tips: ["Always stay inside the car if on a high-speed highway"]
        }
      ],
      conclusion: "Reliable towing is just a call away. Save our number for emergencies."
    },
    faqs: [
      { question: "Do you offer flatbed towing?", answer: "Yes, we specialize in flatbed towing for luxury cars and damaged vehicles to prevent further wear." }
    ]
  },
  {
    slug: "bike",
    link: "services/bike",
    title: "Bike Services",
    tagline: "Professional Two-Wheeler Service & Repair at Your Doorstep",
    description: "Complete bike maintenance from oil changes to engine tuning. We service all major brands including Hero, Honda, Royal Enfield, and TVS at your home.",
    data: bikeServices,
    icon: Bike,
    color: "red",
    bgColor: "bg-gray-50",
    metaTitle: "Doorstep Bike Service & Repair | Certified Mechanics | Fiixup",
    metaDescription: "Get certified bike mechanics at your doorstep. We offer general service, engine tuning, and brake repairs for all bikes and scooters. Book 24/7.",
    benefits: [
      { icon: "Wrench", title: "Expert Tuning", body: "Our mechanics specialize in high-performance and commuter bikes alike." },
      { icon: "ShieldCheck", title: "Genuine Spares", body: "We use only brand-authorized engine oils and replacement parts." },
      { icon: "Clock", title: "90-Min Service", body: "Complete standard servicing done right in front of your eyes in 90 minutes." }
    ],
    pricingSummary: {
      rows: [
        { label: "General Bike Service", priceFrom: 799, highlight: true },
        { label: "Engine Oil Change", priceFrom: 350 },
        { label: "Chain Cleaning & Lubing", priceFrom: 199 }
      ],
      competitors: [
        { name: "Fiixup", price: "Starting ₹799", arrivalTime: "30-60 mins", doorstep: true },
        { name: "Local Mechanic", price: "Variable", arrivalTime: "N/A", doorstep: false }
      ],
      disclaimer: "Final pricing depends on bike CC and oil grade chosen."
    },
    brands: [
      { name: "Royal Enfield", models: ["Classic 350", "Bullet", "Himalayan"] },
      { name: "Hero", models: ["Splendor Plus", "HF Deluxe", "Glamour"] },
      { name: "Honda", models: ["Activa 6G", "Shine", "Unicorn"] },
      { name: "TVS", models: ["Jupiter", "Apache RTR", "Ntorq"] }
    ],
    guide: {
      title: "The Ultimate Guide to Maintaining Your Two-Wheeler's Longevity",
      intro: "A bike is more than just a vehicle; it's a lifeline for daily commuting. Maintaining it shouldn't require a whole day at a crowded service center.",
      sections: [
        {
          heading: "Why Regular Engine Oil Changes are Non-Negotiable",
          body: "Engine oil is the lifeblood of your motorcycle. In Indian riding conditions—heavy traffic and high heat—oil degrades quickly. We recommend changing it every 2,500km to 3,000km to prevent internal friction and overheating.",
          tips: ["Always check oil levels when the engine is cool", "Use synthetic oil for high-performance bikes"]
        },
        {
          heading: "Doorstep Bike Service: Transparency and Trust",
          body: "The biggest issue with local garages is the 'hidden' replacement of parts. At Fiixup, we perform the service at your home. You see the oil being poured and the filters being replaced in real-time.",
          tips: ["Ask the mechanic to show you the old spark plug before replacement"]
        }
      ],
      conclusion: "Keep your ride smooth and safe with Fiixup’s doorstep bike expertise."
    },
    faqs: [
      { question: "Do you service electric scooters?", answer: "Yes, we provide specialized maintenance for major EV brands like Ola and Ather." }
    ]
  },
  {
    slug: "battery",
    link: "services/battery",
    title: "Battery Services",
    tagline: "Instant Vehicle Battery Jumpstart & Replacement",
    description: "Dead battery? Don't get stranded. Our technicians provide jumpstart services and doorstep battery replacement within 30-60 minutes.",
    data: batteryServices,
    icon: Battery,
    color: "green",
    bgColor: "bg-gray-50",
    metaTitle: "Doorstep Car Battery Replacement & Jumpstart Service | Fiixup",
    metaDescription: "Instant car battery jumpstart and replacement services at home. We stock Exide, Amaron, and more. 30-minute arrival guaranteed.",
    benefits: [
      { icon: "Clock", title: "30-Min Arrival", body: "Our rapid response team is equipped to get you moving instantly." },
      { icon: "ShieldCheck", title: "Warranty Support", body: "New batteries come with full manufacturer warranty and paper work." }
    ],
    pricingSummary: {
      rows: [
        { label: "Battery Jumpstart", priceFrom: 499, highlight: true },
        { label: "Battery Health Report", priceFrom: 199 },
        { label: "New Battery Installation", priceFrom: 0, note: "Free with battery purchase" }
      ],
      competitors: [
        { name: "Fiixup", price: "₹499 Jumpstart", arrivalTime: "30 mins", doorstep: true }
      ],
      disclaimer: "New battery prices depend on the AH rating and brand."
    },
    brands: [
      { name: "Exide", models: ["Mileage", "Matrix", "Eko"] },
      { name: "Amaron", models: ["Flo", "Go", "Black"] },
      { name: "Tata Green", models: ["Silver", "Platinum"] }
    ],
    guide: {
      title: "How to Extend Your Vehicle's Battery Life and Avoid Breakdowns",
      intro: "A dead battery is the most common reason for vehicle breakdowns in urban environments. Understanding battery health can save you from being stranded.",
      sections: [
        {
          heading: "Signs Your Battery is Dying",
          body: "If your engine cranks slowly, your headlights look dim, or you see a 'battery' light on your dashboard, your battery is likely failing. Environmental heat in India accelerates the evaporation of battery fluid, leading to internal damage.",
          tips: ["Clean terminal corrosion with baking soda and water", "Turn off lights before starting the engine"]
        }
      ],
      conclusion: "For a quick jumpstart or a fresh battery, Fiixup is just a call away."
    },
    faqs: [
      { question: "How long does a car battery last?", answer: "Typically 3-5 years, but heavy heat and infrequent driving can shorten it to 2 years." }
    ]
  },
  {
    slug: "puncture",
    link: "services/puncture",
    title: "Puncture Services",
    tagline: "24/7 Doorstep Flat Tyre Repair for Cars & Bikes",
    description: "Don't struggle with a jack in the heat. Our mobile puncture units fix flat tyres and tubeless punctures at your location instantly.",
    data: punctureServices,
    icon: ShipWheel,
    color: "orange",
    bgColor: "bg-white",
    metaTitle: "Doorstep Puncture Repair Near Me | 24/7 Flat Tyre Fix | Fiixup",
    metaDescription: "Professional doorstep puncture repair for cars and bikes. 24/7 service. We fix tubeless punctures and replace spare tyres on-site.",
    benefits: [
      { icon: "Clock", title: "Express Arrival", body: "We reach you in 30 minutes to ensure you're not stuck on the road." },
      { icon: "ShieldCheck", title: "High-Quality Plugs", body: "We use industrial-grade rubber plugs for long-lasting tubeless repairs." }
    ],
    pricingSummary: {
      rows: [
        { label: "Bike Puncture Fix", priceFrom: 199 },
        { label: "Car Puncture Fix", priceFrom: 349, highlight: true },
        { label: "Stepney Replacement", priceFrom: 299 }
      ],
      competitors: [
        { name: "Fiixup", price: "₹349", arrivalTime: "30 mins", doorstep: true }
      ],
      disclaimer: "Additional charges for multiple punctures in a single tyre."
    },
    brands: [
      { name: "MRF", models: ["Zapper", "Perfinza"] },
      { name: "CEAT", models: ["SecuraDrive", "Gripp"] },
      { name: "Apollo", models: ["Alnac 4G", "Amazer"] },
      { name: "Bridgestone", models: ["Sturdo", "Ecopia"] }
    ],
    guide: {
      title: "Tyre Maintenance 101: Preventing Dangerous Blowouts",
      intro: "Tyres are the only contact point between your vehicle and the road. A minor puncture, if ignored, can lead to a dangerous blowout at high speeds.",
      sections: [
        {
          heading: "Why You Should Never Drive on a Flat Tyre",
          body: "Driving even a few hundred meters on a flat tyre can destroy the sidewall, making a simple repair impossible and forcing an expensive replacement. Our mobile service brings professional-grade tyre tools to you, saving your expensive tyres.",
          tips: ["Check tyre tread depth using the 'coin test'", "Rotate your tyres every 10,000km"]
        }
      ],
      conclusion: "Stay safe on the road. Call Fiixup for instant puncture assistance."
    },
    faqs: [
      { question: "Can you fix tube-type punctures?", answer: "Yes, we carry replacement tubes for bikes and can perform patches on-site." },
      { question: "Do you offer tyre replacement?", answer: "Yes, we can replace your tyre with a new one from our stock or install your spare." },
      { question: "Is it safe to repair a puncture on the highway?", answer: "Yes, our technicians are trained to perform safe roadside repairs. We also provide safety cones and reflective gear to ensure your safety during the service." },
      { question: "What if I have multiple punctures?", answer: "We can handle multiple punctures, but additional charges may apply based on the severity and location of the damage." }
    ]
  },
  {
    slug: "mechanic",
    link: "services/mechanic",
    title: "Mechanic Services",
    tagline: "Expert General Mechanics for All Vehicle Troubleshooting",
    description: "General repairs, engine noise diagnostics, suspension work, and electrical troubleshooting performed by senior master technicians.",
    data: mechanicServices,
    icon: Wrench,
    color: "teal",
    bgColor: "bg-white",
    metaTitle: "Hire Expert Doorstep Mechanics | Vehicle Diagnostics | Fiixup",
    metaDescription: "Professional master mechanics for complex vehicle repairs. Engine diagnostics, suspension work, and brake repairs at your doorstep.",
    benefits: [
      { icon: "Wrench", title: "Master Technicians", body: "All mechanics have 10+ years of experience in multi-brand workshops." },
      { icon: "IndianRupee", title: "Savings up to 40%", body: "Get workshop-quality repairs without the high dealer labor costs." }
    ],
    pricingSummary: {
      rows: [
        { label: "General Diagnosis", priceFrom: 299, highlight: true },
        { label: "Suspension Overhaul", priceFrom: 2500 },
        { label: "Clutch Cable Replacement", priceFrom: 450 }
      ],
      competitors: [
        { name: "Fiixup", price: "Starting ₹299", arrivalTime: "Scheduled", doorstep: true }
      ],
      disclaimer: "Labor charges only. Parts are billed at actual MRP."
    },
    brands: [
      { name: "Volkswagen", models: ["Polo", "Vento", "Taigun"] },
      { name: "Skoda", models: ["Rapid", "Slavia", "Kushaq"] },
      { name: "Toyota", models: ["Innova", "Fortuner", "Glanza"] }
    ],
    guide: {
      title: "Decoding Dashboard Lights: When to Call a Professional Mechanic",
      intro: "Your vehicle's dashboard is its way of communicating health. Ignoring these warnings can lead to catastrophic mechanical failure.",
      sections: [
        {
          heading: "The Science of Vehicle Diagnostics",
          body: "Modern vehicles are computers on wheels. Our mechanics use OBD-II scanners to pull error codes directly from your vehicle's ECU. This eliminates guesswork and ensures we fix the root cause of the problem.",
          tips: ["Never clear an error code without fixing the underlying issue", "Check your coolant levels if the temp gauge rises"]
        }
      ],
      conclusion: "Don't let minor noises become major repairs. Book a master mechanic today."
    },
    faqs: [
      { question: "Do you provide a warranty on repairs?", answer: "Yes, all major mechanical repairs come with a 30-day/1000km labor warranty." }
    ]
  },
  {
    slug: "roadside",
    link: "services/roadside",
    title: "Roadside Assistance",
    tagline: "Comprehensive Roadside Assistance for All Vehicle Emergencies",
    description: "From lockouts to fuel delivery, our roadside assistance team is equipped to handle all emergencies and get you back on the road quickly.",
    data: roadsideServices,
    icon: ShieldCheck,
    color: "purple",
    bgColor: "bg-gray-50",
    metaTitle: "24/7 Roadside Assistance Near Me | Emergency Vehicle Help | Fiixup",
    metaDescription: "Comprehensive roadside assistance for cars and bikes. Lockout service, fuel delivery, jumpstarts, and on-site repairs. Available 24/7 with quick response.",
    benefits: [
      { icon: "Clock", title: "Rapid Response", body: "Our team is trained to reach you within 30 minutes for any roadside emergency." },
      { icon: "ShieldCheck", title: "All-in-One Service", body: "From lockouts to fuel delivery, we handle all common roadside issues." },
      { icon: "Wrench", title: "On-Site Repairs", body: "Minor issues like flat tyres or dead batteries can often be fixed on the spot." },
    ],
    pricingSummary: {
      rows: [
        { label: "Lockout Service", priceFrom: 999, highlight: true },
        { label: "Fuel Delivery", priceFrom: 499 },
        { label: "On-Site Repair", priceFrom: 299 },
      ],
      competitors: [
        { name: "Fiixup", price: "Starting ₹299", arrivalTime: "30 mins", doorstep: true },
        { name: "Roadside Club", price: "Variable", arrivalTime: "N/A", doorstep: false },
      ],
      disclaimer: "Prices may vary based on location and time of day."
    },  
    brands: [
      { name: "All Brands", models: ["We service all car and bike brands for roadside assistance"] }
    ],
    guide: {
      title: "What to Do During a Roadside Emergency: A Safety Guide",
      intro: "A roadside emergency can be a frightening experience. Knowing how to stay safe and who to call can make all the difference.",
      sections: [
        {
          heading: "Immediate Safety Measures",
          body: "If you experience a breakdown, first ensure your safety. Move your vehicle to the shoulder, turn on hazard lights, and use reflective triangles if you have them. Stay inside your vehicle if you're on a busy highway. Once safe, call Fiixup for 24/7 roadside assistance. Our team will track your location and dispatch help immediately.",
          tips: ["Keep a roadside emergency kit in your car", "Always have our number saved for quick access"]
        }
      ],
      conclusion: "With Fiixup's comprehensive roadside assistance, help is just a call away. Stay safe on the road."
    },
    faqs: [
      { question: "Do you offer roadside assistance for electric vehicles?", answer: "Yes, we provide specialized roadside services for EVs, including mobile charging and towing to the nearest charging station." },
      { question: "Is your roadside assistance available in remote areas?", answer: "We have a wide network of technicians across the country, but availability may vary in extremely remote locations. We recommend checking our service coverage map for details." },
      { question: "Can I request a specific technician for roadside assistance?", answer: "While we cannot guarantee a specific technician, our dispatch system ensures that the most qualified and nearest technician is sent to assist you." },
      { question: "What payment methods do you accept for roadside assistance?", answer: "We accept all major credit/debit cards, UPI, and cash payments for our roadside services." },
      { question: "Do you provide roadside assistance for commercial vehicles?", answer: "Currently, our roadside assistance services are focused on passenger cars and bikes. We do not offer services for commercial vehicles at this time." },
      { question: "Is there a subscription option for roadside assistance?", answer: "We currently offer our roadside assistance on a pay-per-use basis. However, we are exploring subscription models for frequent users in the future." },
      { question: "What should I do if I am in an accident?", answer: "If you are involved in an accident, first ensure your safety and the safety of others. Call emergency services if there are injuries. For vehicle recovery and assistance, contact Fiixup's roadside assistance team, and we will dispatch help to your location." }
    ] 
  }
  // ... Add Battery, Puncture, and Mechanic categories with similar deep content
]; 
