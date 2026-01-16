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

export const ICONS = {
  MonitorSmartphone,
  Code,
  Smartphone,
  Server,
  LayoutTemplate,
  Share2,
  Sliders,
  Wrench,
} as const;

export type IconName = keyof typeof ICONS;
