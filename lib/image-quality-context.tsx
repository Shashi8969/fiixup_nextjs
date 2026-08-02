"use client";
// lib/image-quality-context.tsx
// Site-wide Next/Image `quality` value, admin-controlled via the "Image
// Quality" setting (site_settings key: image_quality_mode). Provided once
// in the root layout (which already fetches getPublicSiteSettings() on
// every request) and read by CmsImage — no extra fetch per image.

import { createContext, useContext, type ReactNode } from "react";

const DEFAULT_QUALITY = 75;

const ImageQualityContext = createContext<number>(DEFAULT_QUALITY);

export function ImageQualityProvider({
  quality,
  children,
}: {
  quality: number;
  children: ReactNode;
}) {
  return (
    <ImageQualityContext.Provider value={quality || DEFAULT_QUALITY}>
      {children}
    </ImageQualityContext.Provider>
  );
}

export function useImageQuality(): number {
  return useContext(ImageQualityContext);
}
