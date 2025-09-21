export type CallAction = {
  label: string;
  actionKey: string; 
};

export interface Services {
  icon?: string;
  service?: string;
  title: { main: string; second: string };
  subtitle: string;
  image?: string;
  images?: string[];
  alt: string;
  list?: string[],
  callAction?: CallAction[];
  techs?: {name: string; image: string}[];
  projects?: {image: string; title: string; description: string}[]; 
}

