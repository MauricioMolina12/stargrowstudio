import { ElementType } from "react";

export type cardGrid = {
  title: string;
  icon: {
    component: ElementType;
    color: string;
  };
  description?: string;
  items?: string[];
  slug?: string;
};
