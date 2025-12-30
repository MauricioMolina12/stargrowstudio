import {
  MonitorSmartphone,
  Code,
  Smartphone,
  Server,
} from "lucide-react";

export const ICONS = {
  MonitorSmartphone,
  Code,
  Smartphone,
  Server,
} as const;

export type IconName = keyof typeof ICONS;
