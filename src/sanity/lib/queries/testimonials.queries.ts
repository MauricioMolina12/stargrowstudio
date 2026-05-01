export const TESTIMONIALS_QUERY = `
*[_type == "testimonial" && status == "approved"]
| order(_createdAt desc) {
  _id,
  name,
  role,
  company,
  content,
  photo {
    asset->{
      url
    }
  }
}
`;
