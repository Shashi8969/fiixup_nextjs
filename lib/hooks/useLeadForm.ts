"use client";

import { useCallback, useState } from "react";
import { submitLead, type LeadPayload } from "@/lib/send-lead";

type UseLeadFormOptions = {
  /** How long the success/error banner stays visible before auto-clearing (ms). */
  resetAfterMs?: number;
  /** Fallback success copy if the API doesn't return one. */
  fallbackSuccessMessage?: string;
};

export function useLeadForm({
  resetAfterMs = 5000,
  fallbackSuccessMessage = "Booking request received. Our team will contact you shortly.",
}: UseLeadFormOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const reset = useCallback(() => {
    setIsSuccess(false);
    setShowError(false);
    setSuccessMessage("");
  }, []);

  const submit = useCallback(
    async (input: FormData | LeadPayload, formType: string) => {
      setLoading(true);
      setShowError(false);

      const requestTime = new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });

      if (input instanceof FormData) {
        input.set("form_type", formType);
        input.set("request_time", requestTime);
      }

      const payload =
        input instanceof FormData
          ? input
          : { ...input, form_type: formType, request_time: requestTime };

      try {
        const result = (await submitLead(payload)) as { success_message?: string };
        setSuccessMessage(result?.success_message || fallbackSuccessMessage);
        setIsSuccess(true);
        setTimeout(reset, resetAfterMs);
        return { ok: true as const };
      } catch (error) {
        setShowError(true);
        setTimeout(() => setShowError(false), resetAfterMs);
        return { ok: false as const, error };
      } finally {
        setLoading(false);
      }
    },
    [fallbackSuccessMessage, resetAfterMs, reset]
  );

  return { loading, isSuccess, successMessage, showError, submit, reset };
}