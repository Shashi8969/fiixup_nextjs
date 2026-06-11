import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { socials } from "@/lib/data/site";
import { MAIN_PHONE, MAIN_PHONE_DISPLAY, MAIN_EMAIL } from "@/lib/constants";
import { getFooterNavigationGroups } from "@/lib/navigation";
import { FooterNavigationColumns } from "@/components/FooterNavigationColumns";
import type { PublicSiteSettings } from "@/lib/site-settings";

type FooterProps = {
  siteSettings?: PublicSiteSettings;
  validPaths?: string[];
};

export async function Footer({ siteSettings, validPaths }: FooterProps = {}) {
  const year = new Date().getFullYear();
  const footerLinks = await getFooterNavigationGroups();
  const mainPhone = siteSettings?.mainPhone || MAIN_PHONE;
  const mainPhoneDisplay = siteSettings?.mainPhoneDisplay || MAIN_PHONE_DISPLAY;
  const mainEmail = siteSettings?.mainEmail || MAIN_EMAIL;
  const footerDescription = siteSettings?.footerDescription ||
    "India\'s 24/7 doorstep car & bike repair service. Certified technicians at your home or office.";
  const serviceAreaText = siteSettings?.serviceAreaText || "Available 24/7 · Bengaluru · Chennai · Hyderabad · Mumbai";

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
                style={{ width: 'auto' }}
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
                <a
                  href={`mailto:${mainEmail}`}
                  className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  {mainEmail}
                </a>
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
        <FooterNavigationColumns footerLinks={footerLinks} validPaths={validPaths} />
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-400">
          <p>&copy; {year} Fiixup. All rights reserved. | Doorstep Auto Repair Across India</p>
          <p>{serviceAreaText}</p>
        </div>
      </div>
    </footer>
  );
}
