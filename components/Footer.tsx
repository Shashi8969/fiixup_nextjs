import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ShieldAlert } from "lucide-react";
import { socials } from "@/lib/data/site";
import { MAIN_PHONE, MAIN_PHONE_DISPLAY, MAIN_EMAIL } from "@/lib/constants";
import { getFooterNavigationGroups } from "@/lib/navigation";
import { FooterNavigationColumns } from "@/components/FooterNavigationColumns";
import type { PublicSiteSettings } from "@/lib/site-settings";
import { CookieSettingsButton } from "@/components/analytics/CookieConsent";

type FooterProps = {
  siteSettings?: PublicSiteSettings;
};

export async function Footer({ siteSettings }: FooterProps = {}) {
  const year = new Date().getFullYear();
  const footerLinks = await getFooterNavigationGroups();
  const mainPhone = siteSettings?.mainPhone || MAIN_PHONE;
  const mainPhoneDisplay = siteSettings?.mainPhoneDisplay || MAIN_PHONE_DISPLAY;
  const mainEmail = siteSettings?.mainEmail || MAIN_EMAIL;
  const footerDescription = siteSettings?.footerDescription ||
    "India\'s 24/7 doorstep car & bike repair service. Certified technicians at your home or office.";
  const serviceAreaText = siteSettings?.serviceAreaText || "Available 24/7 · Bengaluru · Chennai · Hyderabad · Mumbai";
  const emergencyPhone = siteSettings?.emergencyPhone;
  const addressLine = siteSettings?.addressStreet
    ? [
        siteSettings.addressStreet,
        [siteSettings.addressLocality, siteSettings.addressRegion, siteSettings.addressPostalCode]
          .filter(Boolean)
          .join(", "),
      ]
        .filter(Boolean)
        .join(", ")
    : null;

  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Top */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <Image
                src="/assets/logo.webp"
                alt="Fiixup"
                width={120}
                height={40}
                className="h-10 w-auto mb-3 brightness-0 invert"
                style={{ width: 'auto', height: 'auto' }}
              />
              <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                {footerDescription}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
              <div className="space-y-2 text-sm">
                <a
                  href={`tel:${mainPhone}`}
                  className="flex items-center gap-2 text-white font-semibold hover:text-blue-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  {mainPhoneDisplay}
                </a>
                {emergencyPhone && (
                  <a
                    href={`tel:${emergencyPhone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                  >
                    <ShieldAlert className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    {emergencyPhone} <span className="text-gray-500">(24/7 Emergency)</span>
                  </a>
                )}
                <a
                  href={`mailto:${mainEmail}`}
                  className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  {mainEmail}
                </a>
                {addressLine && (
                  <p className="flex items-start gap-2 text-gray-400">
                    <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>{addressLine}</span>
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                {socials.map(({ href, label, Icon, hover }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className={`w-9 h-9 rounded-lg bg-gray-800 ${hover} flex items-center justify-center transition-colors`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="container mx-auto px-4 py-10">
        <FooterNavigationColumns footerLinks={footerLinks} />
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-400">
          <p>&copy; {year} Fiixup. All rights reserved. | Doorstep Auto Repair Across India</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <p>{serviceAreaText}</p>
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy & Cookies
            </Link>
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
