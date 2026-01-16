export const CATEGORIES = `
*[_type == "category"]{
    _id,
    title,
    slug,
    description,
    icon,
    images,
    parent,
    order,
    badge
}
`;
