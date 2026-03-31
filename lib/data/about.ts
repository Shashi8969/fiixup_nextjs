import { Award, Users, Clock, ThumbsUp } from "lucide-react";

const mvvItems = [
  { Icon: Award,  title: "Our Mission", text: "To make vehicle maintenance convenient, transparent, and accessible for every vehicle owner across India." },
  { Icon: Users,  title: "Our Vision",  text: "To become India's leading doorstep auto service provider, setting new standards for quality and convenience." },
  { Icon: ThumbsUp, title: "Our Values", text: "Honesty, quality, customer-first approach, and continuous innovation in everything we do." },
];

const differentiators = [
  { title: "Certified Excellence",   text: "All technicians are certified with extensive training in both traditional and modern vehicle systems." },
  { title: "True 24/7 Service",      text: "Not just support — actual repair services round the clock, including nights and holidays." },
  { title: "Transparent Pricing",    text: "Detailed estimates before work begins. No hidden charges, no surprises — just honest pricing." },
  { title: "Genuine Parts",          text: "We use only authentic parts from trusted suppliers, backed by manufacturer warranties." },
  { title: "Complete City Coverage", text: "Every corner of Bengaluru, Chennai, Hyderabad and Mumbai — we're always nearby." },
  { title: "Digital Convenience",    text: "Easy online booking, digital service history, and cashless payments." },
];

export const aboutContent = {
  title: "India's Trusted Doorstep Auto Repair Service",
  description1: "Fiixup brings the workshop to your doorstep. We're India's growing 24/7 mobile auto repair service for both cars and bikes — operating across Bengaluru, Chennai, Hyderabad, and Mumbai, with more cities coming soon.",
  description2: "No more wasting hours in traffic to reach a garage. Our certified technicians arrive at your location with professional-grade tools, genuine parts, and the expertise to get your vehicle back on the road — fast.",
  imageAlt: "Fiixup certified technician performing doorstep car repair",
  sections: {
    howItWorks: "How Fiixup Works"
  }
};

export const stats = [
  { icon: Users,    value: "10,000+", label: "Happy Customers"       },
  { icon: Clock,    value: "24/7",    label: "Always Available"       },
  { icon: ThumbsUp, value: "98%",     label: "Customer Satisfaction"  },
  { icon: Award,    value: "4",       label: "Cities & Growing"       },
];

export const highlights = [
  { heading: "24/7 Doorstep Service",    text: "We come to you anytime — at your home, office, or roadside. Emergency breakdown at midnight? We're just a call away." },
  { heading: "Certified Technicians",    text: "Every Fiixup technician is trained, certified, and has a minimum of 3 years of hands-on experience in car and bike repair." },
  { heading: "Transparent Pricing",      text: "We provide detailed estimates before starting any work. No hidden charges, no surprises — just honest, upfront pricing." },
  { heading: "30-Day Repair Warranty",   text: "All repairs come with a 30-day service warranty. If the same issue recurs, we fix it free — no questions asked." },
];

export const steps = [
  { n: "1", title: "Book in 60 Seconds",  desc: "Call, WhatsApp, or fill the form. Pick your time and location." },
  { n: "2", title: "We Dispatch Fast",     desc: "We confirm and dispatch the nearest certified technician to you." },
  { n: "3", title: "Repair at Your Door",  desc: "Technician arrives with all tools & parts. You watch — full transparency." },
  { n: "4", title: "Back on the Road",     desc: "Service done with a 30-day warranty. Digital receipt provided." },
];

export { mvvItems, differentiators };