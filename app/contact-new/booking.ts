export type BookingSelection = { city?: string; locality?: string; service?: string; timing?: string };
export const BOOKING_SELECTION_EVENT = "fiixup-contact-new-selection";
export function openBooking(selection: BookingSelection = {}) {
  window.dispatchEvent(new CustomEvent(BOOKING_SELECTION_EVENT, { detail: selection }));
  const heading = document.getElementById("contact-booking-title");
  heading?.focus({ preventScroll: true });
  heading?.scrollIntoView({ block: "start", behavior: "instant" });
}
