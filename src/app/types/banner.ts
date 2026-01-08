export type CallAction = {
  label: string;
  actionKey: string;
};

export interface BannerTypes {
  icon?: string;
  tag?: string;
  title: { main: string; second?: string, optional?: string };
  subtitle?: string;
  image?: string;
  images?: string[];
  alt?: string;
  list?: string[],
  callAction?: CallAction;
  techs?: { name: string; image: string }[];
  projects?: { image: string; title: string; description: string }[];
  animationTitle?: boolean;
  bgColor?: string
  locations?: string[]
}

