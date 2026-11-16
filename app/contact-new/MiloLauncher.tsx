"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ASSISTANT_NAME } from "@/lib/chat/shared";
import styles from "./contact-new.module.css";

// Reuse the existing global assistant. No second chat panel, model, or API.
export default function MiloLauncher() {
  const [notice, setNotice] = useState("");
  function openAssistant() {
    const launcher = document.querySelector<HTMLButtonElement>(
      `button[aria-label="Chat with ${ASSISTANT_NAME}, the Fiixup assistant"]`,
    );
    if (launcher) { launcher.click(); setNotice(""); return; }
    if (document.querySelector('button[aria-label="Close assistant"]')) return;
    setNotice("Milo is still loading. Please try again shortly, or call our team.");
  }
  return <div><button type="button" className={styles.lightButton} onClick={openAssistant}>Ask {ASSISTANT_NAME} <ArrowUpRight size={18} aria-hidden="true" /></button><p className={styles.assistantNotice} role="status">{notice}</p></div>;
}
