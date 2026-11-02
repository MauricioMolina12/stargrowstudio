"use client";

import { useConsent } from "./ConsentProvider";

type Props = {
  label: string;
  className?: string;
};

/**
 * Enlace/botón para reabrir el centro de preferencias de cookies (CookieYes).
 * Se usa en el footer ("Configuración de cookies") y donde se necesite.
 */
export default function RevisitConsentButton({ label, className = "" }: Props) {
  const { openSettings } = useConsent();
  return (
    <button type="button" onClick={openSettings} className={className}>
      {label}
    </button>
  );
}
