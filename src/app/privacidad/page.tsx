import type { Metadata } from "next";
import LegalDocument from "@/app/components/shared/legal/LegalDocument";
import { PRIVACY_POLICY } from "@/app/components/shared/legal/privacyPolicyContent";

export const metadata: Metadata = {
  title: "Política de Privacidad | Star Grow Studio",
  description:
    "Política de privacidad y tratamiento de datos personales de Star Grow Studio S.A.S.: información que recopilamos, finalidades, derechos de los titulares y contacto.",
};

export default function PrivacyPolicyPage() {
  return <LegalDocument doc={PRIVACY_POLICY} />;
}
