import { ICONS, IconName } from "@/app/utils/icons";

type Props = {
  icon?: string;
};

export function Icon({ icon }: Props) {
  if (!icon) return null;

  const Icon = ICONS[icon as IconName];

  if (!Icon) return null;

  return <Icon size={32} />;
}
