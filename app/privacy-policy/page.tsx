import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy | Fiixup",
  description:
    "How Fiixup uses necessary storage, Google Analytics and consent preferences on fiixup.in.",
  alternates: { canonical: "https://fiixup.in/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <article className="container mx-auto max-w-4xl px-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
            Fiixup
          </p>
          <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
            Privacy & Cookie Policy
          </h1>
          <p className="mt-3 text-sm text-slate-500">Last updated: 17 June 2026</p>

          <div className="mt-8 space-y-8 text-[15px] leading-7 text-slate-700">
            <section>
              <h2 className="text-xl font-extrabold text-slate-950">What we collect</h2>
              <p className="mt-2">
                When analytics consent is granted, Fiixup uses Google Analytics 4
                to understand page views, approximate active engagement time,
                scroll milestones, traffic source and interactions such as phone,
                WhatsApp, service-card and booking-button clicks. Form field values,
                customer phone numbers and message text are not intentionally sent
                to Google Analytics.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-950">Cookie categories</h2>
              <p className="mt-2">
                <strong>Necessary:</strong> storage required for basic operation and
                remembering your consent preference. <strong>Analytics:</strong>{" "}
                optional measurement used to improve navigation, content and
                services. <strong>Advertising:</strong> optional advertising
                measurement or personalization; it remains inactive unless relevant
                advertising tags are installed and permission is granted.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-950">Changing your choice</h2>
              <p className="mt-2">
                Reopen Cookie settings from the website footer at any time. Revoking
                consent stops future optional measurement on that browser. You can
                also clear site data through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-950">Lead and booking information</h2>
              <p className="mt-2">
                Information submitted through a booking or callback form is used to
                respond to your request, coordinate service and maintain operational
                records. It is handled separately from Google Analytics.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-950">Contact</h2>
              <p className="mt-2">
                For privacy questions, contact Fiixup through the contact details
                published on this website.
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
