// Owner-supplied facts. This data is isolated from the existing About page.
export const services = [
  { title: "Car repair & diagnostics", href: "/services/car", text: "Starting faults, mechanical and electrical checks, brakes, AC concerns, and suitable repairs." },
  { title: "Bike & scooter care", href: "/services/bike", text: "Starting issues, oil changes, brake checks, inspections, and applicable two-wheeler repairs." },
  { title: "Battery & jump-start support", href: "/services/battery", text: "Battery and connection checks, suitable starting assistance, and replacement support." },
  { title: "Punctures & tyre assistance", href: "/services/puncture", text: "Tyre assessment, suitable puncture repairs, and spare-wheel assistance." },
  { title: "Towing & recovery", href: "/services/towing", text: "Recovery arrangements matched to the vehicle, its condition, access, and destination." },
  { title: "Maintenance & inspections", href: "/services/mechanic", text: "Selected maintenance and mechanical assessments, with workshop support where needed." },
] as const;

export const priorities = [
  { title: "More consistent service quality", text: "Keeping diagnosis, explanations, repair decisions, and follow-up at the centre of the service experience." },
  { title: "Stronger local coverage", text: "Improving support in the places we serve, with coverage backed by technician availability and practical service capacity." },
  { title: "Better support for technicians", text: "Helping the people doing the work with clearer service information, coordination, and communication." },
  { title: "Technology that makes things easier", text: "Making it simpler to request assistance, share useful vehicle information, and understand the next step." },
] as const;

export const cities = [
  { name: "Bengaluru", alternate: "Bangalore · Our starting point", href: "/bangalore" },
  { name: "Mumbai", alternate: "Doorstep & roadside assistance", href: "/mumbai" },
  { name: "Hyderabad", alternate: "Doorstep & roadside assistance", href: "/hyderabad" },
  { name: "Chennai", alternate: "Doorstep & roadside assistance", href: "/chennai" },
] as const;

export const faqs = [
  { question: "When did Fiixup and Quick Mechanic start?", answer: "Quick Mechanic, our garage in HSR Layout, Bengaluru, was established in 2000. We started Fiixup as a separate company in 2020 for doorstep car and bike repair and 24/7 roadside assistance. The two dates refer to two separate businesses." },
  { question: "Why do both businesses use the same phone number?", answer: "We use 8197459732 for both Quick Mechanic and Fiixup, including the Quick Mechanic Google Business Profile. When you contact us, share whether you need doorstep assistance, roadside help, or support related to the garage." },
  { question: "Can every repair be completed at my location?", answer: "Suitable checks and repairs can happen on-site, but major dismantling, lifting equipment, specialist tools, or extended testing may require workshop support. The technician assesses the vehicle, safety, and access before explaining an appropriate next step." },
  { question: "How quickly can a mechanic arrive?", answer: "An arrival estimate is confirmed after reviewing your location, service requirement, technician availability, traffic, weather, and access. There is no fixed arrival promise for every request. Fiixup provides 24/7 roadside assistance, with suitable support confirmed for the specific location and job." },
  { question: "How are service charges confirmed?", answer: "Published starting prices apply to the indicated service scope. Final charges can depend on parts, labour, location, after-hours timing, recovery requirements, and other agreed work. Applicable charges and additional paid work should be explained before you approve them." },
  { question: "Does every service have the same warranty?", answer: "Warranty support depends on the particular repair, replacement part, and applicable terms. Inspections, jump-starts, repairs, and parts do not automatically have identical coverage. Confirm the relevant warranty terms for your selected service." },
  { question: "Is there a Fiixup garage in every service area?", answer: "Our Quick Mechanic garage is in HSR Layout, Bengaluru. Fiixup’s city and locality pages describe doorstep and roadside coverage, rather than a walk-in garage or branch in every neighbourhood. Availability varies by locality, vehicle, service, and available technician resources." },
  { question: "How do I request help for my car or bike?", answer: "Use the Fiixup website or call +91 8197459732. Share your vehicle model, location, and symptoms. We support cars, motorcycles, and scooters in selected locations across Bengaluru, Mumbai, Hyderabad, and Chennai. You can also contact support@fiixup.in." },
] as const;