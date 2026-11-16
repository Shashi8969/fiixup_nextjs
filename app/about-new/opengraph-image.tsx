import { ImageResponse } from "next/og";

export const alt = "Fiixup. Workshop roots. Doorstep care. Quick Mechanic established 2000; Fiixup established 2020.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function AboutSocialImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#f7f9fd", color: "#172438", padding: "50px 65px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #cbd6e7", paddingBottom: 25 }}><div style={{ display: "flex", fontSize: 43, fontWeight: 700, letterSpacing: -2 }}>fiixup<span style={{ color: "#d5413d" }}>.</span></div><span style={{ fontSize: 17, color: "#596575" }}>ABOUT FIIXUP / SINCE 2020</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 85, fontWeight: 700, letterSpacing: -4, lineHeight: 1.06 }}><span>Workshop roots.</span><span style={{ color: "#245bd6" }}>Doorstep care.</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #cbd6e7", paddingTop: 25, fontSize: 18, color: "#596575" }}><span>Quick Mechanic garage · Est. 2000</span><span>Fiixup · Est. 2020 · 24/7 roadside assistance</span></div>
    </div>, size,
  );
}