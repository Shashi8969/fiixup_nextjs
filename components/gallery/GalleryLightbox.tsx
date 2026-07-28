"use client";

import { useEffect, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/lib/gallery";

type Props = {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function GalleryLightbox({ images, index, onClose, onNavigate }: Props) {
  const image = images[index];

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goPrev, goNext]);

  if (!image) return null;

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed inset-0 z-[101] flex flex-col items-center justify-center p-4 outline-none"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">{image.title || "Gallery image"}</Dialog.Title>

          <Dialog.Close asChild>
            <button
              aria-label="Close"
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </Dialog.Close>

          {images.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                onClick={goPrev}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 sm:left-4"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                aria-label="Next image"
                onClick={goNext}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 sm:right-4"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="relative flex h-[75vh] w-full max-w-5xl items-center justify-center">
            <Image
              key={image.id}
              src={image.imageUrl}
              alt={image.altText || image.title || "Fiixup completed job photo"}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="animate-fade-in-up object-contain"
              priority
            />
          </div>

          {(image.title || image.description) && (
            <div className="mt-4 max-w-2xl text-center px-4">
              {image.title && <p className="font-semibold text-white">{image.title}</p>}
              {image.description && <p className="mt-1 text-sm text-white/60">{image.description}</p>}
            </div>
          )}

          <p className="mt-2 text-xs text-white/40">{index + 1} / {images.length}</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
