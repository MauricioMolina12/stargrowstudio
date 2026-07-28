export type SearchCategory =
  | 'Servicios'
  | 'Casos de éxito'
  | 'Insights'
  | 'Tecnologías';

export type SearchIndexItem = {
  _id: string;
  title: string;
  description: string;
  slug: string;
  path: string;
  category: SearchCategory;
  iconName?: string;
  keywords: string[];
};

export type SearchIndex = {
  services: SearchIndexItem[];
  projects: SearchIndexItem[];
  insights: SearchIndexItem[];
  techs: { techList: string[] }[];
};