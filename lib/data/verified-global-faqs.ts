import type { FAQCategory } from "@/lib/models/faq.model";

/**
 * Small, verified fallback knowledge base.
 *
 * The live FAQ source of truth is Supabase `faq_library`. This file is used only
 * when the CMS FAQ query is unavailable, so chatbot/search fallbacks do not
 * reintroduce old promises, fixed prices, fake credentials, or no-garage claims.
 */
export const verifiedGlobalFAQs: FAQCategory[] = [
  {
    category: "Booking & Service",
    faqs: [
      {
        q: "How quickly can Fiixup reach me after I book?",
        a: "Fiixup uses a 20-Min Quick Arrival promise after booking confirmation for eligible doorstep and roadside requests. Exceptional traffic, weather, distance, building or parking access, and technician availability can affect arrival. The promise refers to reaching the vehicle, not completing every repair in 20 minutes.",
      },
      {
        q: "Can Fiixup work at my home, office or apartment parking area?",
        a: "Many inspections, maintenance tasks and repairs can be handled at a safe parking location when the property permits service work. Jobs needing workshop equipment are better coordinated through a partner garage rather than forced into a doorstep visit.",
      },
      {
        q: "Does Fiixup provide pickup and drop for car service?",
        a: "Yes. When a car job needs workshop equipment, Fiixup can coordinate inspection or collection, service through a partner garage, and return of the vehicle. Free pickup and drop is available on eligible car-service bookings and should be confirmed at booking.",
      },
      {
        q: "What information should I share when booking?",
        a: "Share the vehicle make and model, exact location, the symptom or service due, whether the vehicle can be driven safely, and any parking or security access instructions. For scheduled maintenance, the odometer reading and last service information are also useful.",
      },
    ],
  },
  {
    category: "Pricing & Parts",
    faqs: [
      {
        q: "Are the prices shown on Fiixup the final price?",
        a: "Prices shown on Fiixup are starting or indicative prices for the standard service scope. Final charges can vary with the vehicle, location, labour, parts or fluids, access, towing or pickup distance, multiple punctures, and additional faults or repairs found during inspection. Extra paid work should be explained before approval.",
      },
      {
        q: "Why can the actual repair price be different from the website price?",
        a: "The website price represents a starting or standard scope. One puncture and two punctures are different jobs; a battery no-start may also involve a charging fault; and routine service may reveal worn parts. Additional labour, parts, fluids, distance or approved repairs can change the final amount.",
      },
      {
        q: "Will Fiixup do extra work without telling me the price?",
        a: "Additional paid work should be explained before it is carried out. If inspection changes the original scope, Fiixup should explain the issue and expected additional charge so the customer can approve the next step.",
      },
      {
        q: "How can I check whether a replacement part or fluid is correct for my vehicle?",
        a: "Ask for the specification or part details that apply to the exact vehicle model. For maintenance items such as engine oil, filters and fluids, the manufacturer schedule or owner manual is the primary reference.",
      },
    ],
  },
  {
    category: "Diagnosis & Repairs",
    faqs: [
      {
        q: "Do I need to know which part has failed before booking?",
        a: "No. Describe what the vehicle is doing, such as slow cranking, a warning light, overheating, brake noise, vibration, loss of power or a leak. Diagnosis should identify the likely cause before parts are recommended.",
      },
      {
        q: "Can every car or bike repair be completed at the doorstep?",
        a: "No. Routine maintenance, diagnosis and many repairs can be mobile. Major engine or transmission work, machining, structural accident repair, alignment and other equipment-heavy jobs require a suitably equipped workshop or partner garage.",
      },
      {
        q: "What warranty does Fiixup provide?",
        a: "Fiixup provides a 30-day warranty on eligible repairs. The exact coverage depends on the specific work and parts involved and should be confirmed for the booking.",
      },
    ],
  },
  {
    category: "Roadside Safety",
    faqs: [
      {
        q: "When should I stop driving and request recovery?",
        a: "Stop driving when brakes or steering are unsafe, the engine is severely overheating, there is major fluid loss, a wheel or tyre is badly damaged, the vehicle has serious accident damage, or continued driving could create more damage or danger.",
      },
      {
        q: "What location details help during a roadside call?",
        a: "Send a map pin, nearest landmark and, on divided roads, the direction of travel or carriageway. Also explain whether the vehicle is on the main road, a service lane, parking area or inside a property.",
      },
    ],
  },
  {
    category: "Battery & Starting",
    faqs: [
      {
        q: "Does a car that will not start always need a new battery?",
        a: "No. A no-start can be caused by a discharged battery, poor terminal connection, charging-system fault, starter circuit or another electrical problem. Testing is better than replacing the battery by assumption.",
      },
      {
        q: "What is the difference between a jump-start and battery replacement?",
        a: "A jump-start can provide temporary starting power to a discharged battery when appropriate. Replacement is considered when the battery cannot hold charge or fails testing. Recurring discharge can also indicate a charging or electrical fault that needs diagnosis.",
      },
    ],
  },
  {
    category: "Tyres & Towing",
    faqs: [
      {
        q: "When is a puncture suitable for roadside or doorstep repair?",
        a: "Some tread-area punctures may be repairable when the tyre and damage meet safe repair criteria. Sidewall cuts, major tyre damage, damaged wheels or repeated pressure loss need a different assessment and may require replacement or recovery.",
      },
      {
        q: "Can I choose where my vehicle is towed?",
        a: "Yes. Confirm the destination before dispatch where possible, such as your chosen workshop or dealership. The destination helps determine distance, access requirements and the expected recovery charge.",
      },
    ],
  },
  {
    category: "Coverage",
    faqs: [
      {
        q: "Which cities does Fiixup currently cover?",
        a: "Fiixup service pages currently cover Bengaluru, Chennai, Hyderabad and Mumbai. Availability can vary by exact locality, service type and current technician or recovery capacity, so confirm the current service window when booking.",
      },
      {
        q: "Does Fiixup have a physical workshop in every locality shown on the website?",
        a: "No. Locality pages describe service areas for doorstep and roadside support. They should not be interpreted as a separate Fiixup storefront or workshop in every neighbourhood.",
      },
    ],
  },
];
