import { IconName, ICONS } from "../icons";

export default function resolveIcon(icon?: IconName): React.ReactNode {
  if (!icon) return null;

  const IconComponent = ICONS[icon];
  return <IconComponent size={24} />;
}