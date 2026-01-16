import { IconName } from "../utils/icons";

export interface Category {
    _id: string;
    title: string;
    slug: string;
    description: string;
    icon?: IconName;
    images?: string[];
    parent: { _ref: string } | null;
    order: number;
    badge?: string;
}