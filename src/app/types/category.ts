export interface Category {
    title: string;
    slug: string;
    description: string;
    icon?: string;
    images?: string[];
    parentCategory: string;
    order: number;
    badge?: string;
}