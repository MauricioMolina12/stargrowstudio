export type CallAction = {
  label: string;
  actionKey: string; 
};

export interface BannerInterface {
  icon?: string;
  service?: string;
  title: { main: string; second: string };
  subtitle: string;
  image: string;
  alt: string;
  callAction?: CallAction[];
}

