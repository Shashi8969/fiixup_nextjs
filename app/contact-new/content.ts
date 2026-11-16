export const cities = [
  { name: "Bengaluru", slug: "bangalore", note: "Bangalore, Karnataka" },
  { name: "Mumbai", slug: "mumbai", note: "Maharashtra" },
  { name: "Hyderabad", slug: "hyderabad", note: "Telangana" },
  { name: "Chennai", slug: "chennai", note: "Tamil Nadu" },
] as const;

export const serviceOptions = [
  "Starting / battery assistance", "Puncture / tyre assistance",
  "Repair / diagnosis", "Maintenance / service", "Towing / recovery", "Help me choose",
] as const;

// A transparent, local service picker. These rules do not diagnose a vehicle.
export const symptoms = [
  { label: "Vehicle won't start", service: "Starting / battery assistance", explanation: "Starting problems can have different causes. Battery, connection, and other relevant checks help decide the next step." },
  { label: "Flat or damaged tyre", service: "Puncture / tyre assistance", explanation: "Tyre condition and the damage determine whether a puncture repair or spare-wheel assistance is suitable." },
  { label: "A fault or warning light", service: "Repair / diagnosis", explanation: "Tell the team what you noticed. Some faults need further testing or workshop equipment." },
  { label: "Service is due", service: "Maintenance / service", explanation: "Share your vehicle model and the maintenance you need. We will confirm what can be arranged at your location." },
  { label: "Need to move the vehicle", service: "Towing / recovery", explanation: "The vehicle's condition, pickup access, and destination help the team assess a suitable recovery arrangement." },
] as const;

export const faqs = [
  { question: "How do I contact Fiixup for urgent roadside help?", answer: "Call Fiixup or message us on WhatsApp with your vehicle model, actual location, and the problem. Fiixup provides 24/7 roadside assistance in supported locations. Suitable assistance and an arrival estimate are confirmed for the request." },
  { question: "Which cities can I request a mechanic in?", answer: "Fiixup supports selected locations across Bengaluru (Bangalore), Mumbai, Hyderabad, and Chennai. Coverage depends on the locality, vehicle, required work, and available technician resources. Share your locality when you contact us." },
  { question: "What information should I share when booking?", answer: "Your name, contact number, vehicle type and model, city, locality, and what you noticed. You do not need to diagnose the failed part yourself. A nearby landmark or parking-access detail can also help when arrangements are discussed." },
  { question: "Is there a fixed mechanic arrival time?", answer: "No. An arrival estimate depends on location, traffic, access, the service requirement, and technician availability. The team confirms an estimate after reviewing your request." },
  { question: "Does submitting a request confirm a booking or price?", answer: "A request starts the conversation. The team confirms availability, suitable assistance, and applicable charges. Parts, additional labour, after-hours charges, and other extra paid work should be explained before approval. No online payment is collected by this form. A received enquiry is not a confirmed technician dispatch." },
  { question: "Can I contact you about an existing booking?", answer: "Yes. Call, WhatsApp, or email Fiixup with your booking reference, if you have one, and the contact number used for the request. Explain whether you need a status update, a change, or help after the service." },
  { question: "Is Fiixup the same business as Quick Mechanic?", answer: "Quick Mechanic is our garage in HSR Layout, Bengaluru, established in 2000. Fiixup is the separate company we started in 2020 for doorstep car and bike repair and 24/7 roadside assistance. Both businesses use 8197459732, including the Quick Mechanic Google Business Profile." },
] as const;
