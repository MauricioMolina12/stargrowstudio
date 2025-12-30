export const ACTIVE_EMPLOYEES = `
*[_type == "employee" && isActive]{
  fullName,
  alias,
  department,
  avatar,
  bio,
  email,
  job,
  isActive,
  order
}
`;
