export type Plan = {
    category: string;
    name: string;
    tier: string;
    priceOld?: string;
    priceNew: string;
    description: string;
    features: {
        included: string[];
        excluded: string[];
    };
};