import type { Metadata } from "next";
import LegalDocument from "@/app/components/shared/legal/LegalDocument";
import { TERMS_CONDITIONS } from "@/app/components/shared/legal/termsConditionsContent";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Star Grow Studio",
  description:
    "Términos y condiciones de uso del sitio de Star Grow Studio S.A.S.: servicios, cotizaciones, propiedad intelectual y responsabilidad.",
};

export default function TermsConditionsPage() {
  return <LegalDocument doc={TERMS_CONDITIONS} />;
}
