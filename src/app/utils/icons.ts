//Patron Icon Registry / Icon Map

import {
  MonitorSmartphone,
  Code,
  Smartphone,
  Server,
  LayoutTemplate,
  Share2,
  Sliders,
  Wrench,
} from "lucide-react";

//Esto es shorthand de JavaScript
export const ICONS = {
  MonitorSmartphone,
  Code,
  Smartphone,
  Server,
  LayoutTemplate,
  Share2,
  Sliders,
  Wrench,
} as const; // el as const asegura que las propiedades son de solo lectura - ejemplo: "readonly MonitorSmartphone: typeof MonitorSmartphone;"

export type IconName = keyof typeof ICONS;
