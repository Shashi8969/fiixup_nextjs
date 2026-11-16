import { ImageResponse } from "next/og";

export const alt = "Contact Fiixup. Car and bike care. Call, WhatsApp, or plan a service.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ContactSocialImage() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "48px 64px", background: "#f3f6fc", color: "#16253a", fontFamily: "sans-serif" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #cedaeb", paddingBottom: 24 }}><div style={{ display: "flex", fontSize: 43, fontWeight: 700, letterSpacing: -2 }}>fiixup<span style={{ color: "#d84640" }}>.</span></div><span style={{ color: "#62748f", fontSize: 17 }}>CAR & BIKE CARE / CONTACT</span></div>
    <div style={{ display: "flex", flexDirection: "column", fontSize: 77, letterSpacing: -4, lineHeight: 1.08, fontWeight: 700 }}><span>Contact Fiixup.</span><span style={{ color: "#245bd6" }}>Let’s get you moving.</span></div>
    <div style={{ display: "flex", justifyContent: "space-between", color: "#526c94", fontSize: 18, paddingTop: 24, borderTop: "1px solid #cedaeb" }}><span>Call · WhatsApp · Plan a service</span><span>Bengaluru · Mumbai · Hyderabad · Chennai</span></div>
  </div>, size);
}
