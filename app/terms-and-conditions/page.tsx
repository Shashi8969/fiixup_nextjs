import type { Metadata } from "next";
import type { ReactNode } from "react";
// This project already defines SITE_URL and MAIN_PHONE in lib/constants.ts (per your SEO setup) —
// update the import path below if yours differs.
import { MAIN_PHONE, SITE_URL } from "@/lib/constants";
import TableOfContents from "./TableOfContents";

// ---------------------------------------------------------------------------
// Editable policy values — change these here rather than hunting through JSX.
// ---------------------------------------------------------------------------
const EFFECTIVE_DATE = "6 August 2026";
const SUPPORT_EMAIL = "support@fiixup.in"; // confirm this inbox is monitored
const GRIEVANCE_OFFICER_NAME = "";
const JURISDICTION_CITY = "Bengaluru, Karnataka";
const NIGHT_HOURS = "9:00 PM – 6:00 AM";
const NO_SHOW_WINDOW = "15 minutes";
const REFUND_WINDOW = "5–7 business days";
const WARRANTY_DAYS = 7; // doorstep-repair norm runs 7–15 days; adjust to match your actual policy

export const metadata: Metadata = {
  title: "Terms & Conditions | Fiixup",
  description:
    "Read the official Terms & Conditions for Fiixup doorstep vehicle repair services, including pricing, cancellation policies, warranty coverage, and user guidelines.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

const TOC_ITEMS = [
  { id: "company", label: "About Fiixup" },
  { id: "definitions", label: "Definitions" },
  { id: "eligibility", label: "Eligibility" },
  { id: "services", label: "Our Services" },
  { id: "booking", label: "Booking & Payment" },
  { id: "pricing", label: "Pricing & Extra Charges" },
  { id: "cancellation", label: "Cancellation & Refunds" },
  { id: "dispatch", label: "Mechanic Dispatch" },
  { id: "warranty", label: "Warranty & Liability" },
  { id: "responsibilities", label: "Your Responsibilities" },
  { id: "conduct", label: "Acceptable Use" },
  { id: "third-party-payments", label: "Third-Party Payments" },
  { id: "limitation", label: "Limitation of Liability" },
  { id: "force-majeure", label: "Force Majeure" },
  { id: "ip", label: "Intellectual Property" },
  { id: "privacy", label: "Privacy" },
  { id: "grievance", label: "Grievance Redressal" },
  { id: "law", label: "Governing Law" },
  { id: "changes", label: "Changes to These Terms" },
  { id: "contact", label: "Contact Us" },
];

function Section({
  id,
  num,
  title,
  children,
}: {
  id: string;
  num: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-8 scroll-mt-28 border-t border-slate-100 pt-8">
      <h2 className="mb-4 flex items-baseline gap-3 text-2xl font-bold text-[#1C3F88]">
        <span className="text-base font-semibold text-[#D3252A]">
          {String(num).padStart(2, "0")}
        </span>
        {title}
      </h2>
      <div className="space-y-4 text-[15px] leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <main className="bg-[#F8FAFC]">
      {/* Hero */}
      <div className="relative overflow-hidden border-b-4 border-[#D3252A] bg-gradient-to-br from-[#1C3F88] to-[#0F2452] px-6 py-16 text-center text-white sm:py-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">
          Fiixup
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Terms &amp; Conditions
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-blue-100">
          Effective {EFFECTIVE_DATE} · Applies to fiixup.in, the Fiixup app, and every doorstep
          service booked through Fiixup
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-12 lg:grid-cols-[220px_1fr]">
        <TableOfContents items={TOC_ITEMS} />

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="mb-8 text-[15px] leading-relaxed text-slate-600">
            Welcome to Fiixup (&ldquo;Fiixup&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
            &ldquo;our&rdquo;), providing doorstep car and bike repair, maintenance, and
            roadside-assistance services in Bangalore, Chennai, Hyderabad, and Mumbai
            (&ldquo;Service Areas&rdquo;) through the website fiixup.in and the Fiixup app
            (together, the &ldquo;Platform&rdquo;). By browsing the Platform or booking a
            Service, you (&ldquo;Customer&rdquo;, &ldquo;you&rdquo;) agree to these Terms &amp;
            Conditions (&ldquo;Terms&rdquo;). Please read them before booking — if you do not
            agree, please do not use the Platform.
          </p>

          {/* Highlight box */}
          <div className="mb-10 rounded-lg border-l-4 border-[#D3252A] bg-red-50 p-5 sm:p-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#D3252A]">
              Key policies at a glance
            </p>
            <ul className="space-y-2 text-[15px] text-slate-700">
              <li className="flex gap-2">
                <span aria-hidden className="text-[#D3252A]">
                  ●
                </span>
                <span>
                  <strong>Cancel after dispatch or arrival</strong> and the booking charge is{" "}
                  <strong>non-refundable</strong> — the mechanic&apos;s travel and slot are
                  already committed.
                </span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden className="text-[#D3252A]">
                  ●
                </span>
                <span>
                  <strong>Extra charges apply</strong> for night-time service ({NIGHT_HOURS}),
                  rain or adverse weather, and locations far from our city hubs.
                </span>
              </li>
            </ul>
          </div>

          <Section id="company" num={1} title="About Fiixup">
            <p>
              Fiixup is a doorstep vehicle service platform operating at fiixup.in and through the
              Fiixup app.{" "}
              <em>
                
              </em>{" "}
              currently operates Fiixup and is referred to as &ldquo;Fiixup&rdquo;,
              &ldquo;we&rdquo;, or &ldquo;us&rdquo; in these Terms.
            </p>
          </Section>

          <Section id="definitions" num={2} title="Definitions">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>&ldquo;Booking&rdquo;</strong> means a service request placed through the
                Fiixup website, app, or phone support.
              </li>
              <li>
                <strong>&ldquo;Booking Charge&rdquo;</strong> means the visiting, inspection, or
                advance charge collected to confirm a Mechanic&apos;s slot for a Booking.
              </li>
              <li>
                <strong>&ldquo;Mechanic&rdquo; / &ldquo;Partner&rdquo;</strong> means the trained
                technician or garage professional assigned to carry out a Service.
              </li>
              <li>
                <strong>&ldquo;Service&rdquo;</strong> means the repair, maintenance, inspection,
                or roadside-assistance work requested by the Customer.
              </li>
              <li>
                <strong>&ldquo;Dispatch&rdquo;</strong> means the point at which a Mechanic is
                assigned to a Booking and begins travelling to the Customer&apos;s location.
              </li>
            </ul>
          </Section>

          <Section id="eligibility" num={3} title="Eligibility">
            <p>
              You must be at least 18 years old and capable of entering into a legally binding
              contract under the Indian Contract Act, 1872 to book a Service on Fiixup. By making
              a Booking, you confirm this is the case.
            </p>
          </Section>

          <Section id="services" num={4} title="Our Services">
            <p>
              Fiixup arranges doorstep car and bike repair, servicing, and roadside assistance,
              carried out directly by Fiixup or through its network of trained and verified
              mechanic partners, currently across Bangalore, Chennai, Hyderabad, and Mumbai.
              Service availability, scope, and pricing may vary by city and locality, and Fiixup
              may add, modify, or discontinue services or coverage areas at its discretion.
            </p>
          </Section>

          <Section id="booking" num={5} title="Booking & Payment">
            <ul className="list-disc space-y-2 pl-5">
              <li>Bookings can be made through the Fiixup website, app, or by phone.</li>
              <li>
                A Booking Charge may be collected at the time of booking to confirm your
                Mechanic&apos;s slot, and is typically adjusted against your final bill unless
                stated otherwise — see Section 7 for the cancellation policy that applies to it.
              </li>
              <li>
                For any work beyond the original request, the Mechanic shares an estimate for
                your approval first — you pay only for the work you approve.
              </li>
              <li>
                Payment can be made via the methods shown at checkout or by the Mechanic on-site
                (UPI, card, cash, or wallet, as available).
              </li>
            </ul>
          </Section>

          <Section id="pricing" num={6} title="Pricing & Extra Charges">
            <p>
              Prices shown on the Platform are indicative and based on the information provided
              at booking. Your final invoice may vary depending on the vehicle&apos;s actual
              condition and the parts or labour required. Spare parts are billed at MRP or the
              estimate shared by the Mechanic; genuine or OEM-equivalent parts are used unless
              otherwise agreed.
            </p>
            <p>In addition to standard service and parts charges, the following extra charges may apply:</p>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-slate-700">Night service</p>
                <p>
                  Bookings serviced during night hours ({NIGHT_HOURS}) attract an additional
                  night-service charge.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-700">Rain / adverse weather</p>
                <p>
                  Services carried out during rain or adverse weather may attract an additional
                  charge for the extra time, safety precautions, and equipment required.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-700">Locations far from city hubs</p>
                <p>
                  Locations outside a Mechanic&apos;s normal service radius, or far from
                  Fiixup&apos;s operating hubs in a city, attract an additional distance/travel
                  charge, shown at booking wherever possible.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-700">Other variable charges</p>
                <p>
                  Emergency or express requests, additional parts found during inspection, and
                  work outside the original scope are quoted separately and carried out only
                  with your approval.
                </p>
              </div>
            </div>
            <p className="rounded-md bg-slate-50 p-3 text-sm text-slate-500">
              Fiixup makes reasonable efforts to flag extra charges before confirming a Booking
              or before work begins. Some conditions — sudden rain, on-ground accessibility — may
              only become clear once the Mechanic is at your location.
            </p>
          </Section>

          <Section id="cancellation" num={7} title="Cancellation & Refunds">
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-slate-700">Before dispatch</p>
                <p>
                  Cancel any time before a Mechanic is dispatched, and your Booking Charge is
                  refunded in full.
                </p>
              </div>
              <div className="rounded-md border border-red-100 bg-red-50/60 p-4">
                <p className="font-semibold text-[#D3252A]">After dispatch or on arrival</p>
                <p>
                  Once a Mechanic has been dispatched toward your location, or has arrived,{" "}
                  <strong>the Booking Charge is non-refundable</strong> — even if you cancel,
                  decide not to proceed, or the Service isn&apos;t completed for reasons within
                  your control. This reflects the travel time, fuel, and slot already committed
                  on your behalf.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-700">If you&apos;re not available on arrival</p>
                <p>
                  If no one is reachable at the location within {NO_SHOW_WINDOW} of the
                  Mechanic&apos;s arrival, it is treated as a cancellation after arrival, and the
                  Booking Charge is not refunded.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-700">If Fiixup cancels</p>
                <p>
                  If Fiixup or the assigned Mechanic is unable to fulfil a Booking, your full
                  Booking Charge is refunded.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-700">Rescheduling</p>
                <p>
                  Reschedule free of charge any time before dispatch, subject to availability.
                  Requests after dispatch or arrival are treated as a cancellation above.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-700">Refund timeline</p>
                <p>Refunds are processed to your original payment method within {REFUND_WINDOW}.</p>
              </div>
            </div>
          </Section>

          <Section id="dispatch" num={8} title="Mechanic Dispatch & On-Site Service">
            <ul className="list-disc space-y-2 pl-5">
              <li>Once confirmed, a Mechanic is dispatched within the estimated window shown in the app.</li>
              <li>Please have someone authorised available to grant the Mechanic access and verify the work.</li>
              <li>You may verify a Mechanic&apos;s identity through the app or support line before granting access.</li>
              <li>Any additional issues found during inspection are flagged to you before extra work or charges apply.</li>
            </ul>
          </Section>

          <Section id="warranty" num={9} title="Service Warranty & Liability">
            <p>
              Fiixup provides a {WARRANTY_DAYS}-day workmanship warranty from the date of service,
              covering defects directly arising from the work performed. It does not cover:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Pre-existing issues unrelated to the Service performed;</li>
              <li>Normal wear and tear;</li>
              <li>Damage from misuse, accidents, or third-party work carried out after the Service; or</li>
              <li>Parts or components not supplied or fitted by Fiixup.</li>
            </ul>
            <p>Raise any warranty claim through the app or support channels along with your invoice details.</p>
          </Section>

          <Section id="responsibilities" num={10} title="Your Responsibilities">
            <ul className="list-disc space-y-2 pl-5">
              <li>Provide accurate vehicle, location, and contact details at booking.</li>
              <li>Be present, or have an authorised person present, during the scheduled window.</li>
              <li>Provide safe, reasonable access to the vehicle.</li>
              <li>Disclose known pre-existing issues, prior repairs, or non-standard modifications.</li>
              <li>Approve additional work or charges before the Mechanic proceeds.</li>
            </ul>
          </Section>

          <Section id="conduct" num={11} title="Acceptable Use">
            <p>
              Don&apos;t submit false booking information, interfere with the Platform&apos;s
              normal operation, or behave abusively toward Fiixup staff or Mechanics. Fiixup may
              refuse or cancel Bookings that violate these Terms.
            </p>
          </Section>

          <Section id="third-party-payments" num={12} title="Third-Party Payments">
            <p>
              Payments made through third-party gateways or wallets are governed by that
              provider&apos;s own terms and privacy policy. Fiixup is not responsible for the
              availability, security, or performance of third-party payment services.
            </p>
          </Section>

          <Section id="limitation" num={13} title="Limitation of Liability">
            <p>
              To the maximum extent permitted by law, Fiixup&apos;s total liability arising from
              a Booking is limited to the amount you paid for that Service. Fiixup is not liable
              for indirect or consequential loss, including loss of use of the vehicle, arising
              from delays, weather, third-party actions, or pre-existing vehicle conditions
              beyond Fiixup&apos;s reasonable control.
            </p>
          </Section>

          <Section id="force-majeure" num={14} title="Force Majeure">
            <p>
              Fiixup is not responsible for delay or failure to perform a Service caused by
              events beyond its reasonable control, including natural disasters, extreme weather,
              strikes, or government restrictions.
            </p>
          </Section>

          <Section id="ip" num={15} title="Intellectual Property">
            <p>
              The Fiixup name, logo, and all content on the Platform belong to Fiixup and may not
              be copied or used without prior written permission.
            </p>
          </Section>

          <Section id="privacy" num={16} title="Privacy">
            <p>
              Information you share while booking or using Fiixup is handled under our Privacy
              Policy. By using Fiixup, you consent to the collection and use of your information
              as described there.
            </p>
          </Section>

          <Section id="grievance" num={17} title="Grievance Redressal">
            <p>
              In line with the Consumer Protection (E-Commerce) Rules, 2020, Fiixup has appointed
              a Grievance Officer to address Customer complaints:
            </p>
            <p className="rounded-md bg-slate-50 p-4">
              {GRIEVANCE_OFFICER_NAME}
              <br />
              Email: {SUPPORT_EMAIL}
              <br />
              Phone: {MAIN_PHONE}
            </p>
            <p>Complaints are acknowledged within 48 hours and resolved within 30 days of receipt.</p>
          </Section>

          <Section id="law" num={18} title="Governing Law & Jurisdiction">
            <p>
              These Terms are governed by the laws of India. Disputes arising from these Terms or
              your use of Fiixup&apos;s Services are subject to the exclusive jurisdiction of the
              courts of {JURISDICTION_CITY}.
            </p>
          </Section>

          <Section id="changes" num={19} title="Changes to These Terms">
            <p>
              Fiixup may update these Terms to reflect changes in its Services or legal
              requirements. Updates are posted on this page with a revised effective date;
              continued use after changes means you accept the updated Terms.
            </p>
          </Section>

          <Section id="contact" num={20} title="Contact Us">
            <p>Questions about these Terms? Reach us at:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Website: fiixup.in</li>
              <li>Email: {SUPPORT_EMAIL}</li>
              <li>Phone: {MAIN_PHONE}</li>
            </ul>
          </Section>
        </div>
      </div>

      <p className="pb-12 text-center text-xs text-slate-400">© 2026 Fiixup. All rights reserved.</p>
    </main>
  );
}
