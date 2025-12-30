export const HOME_BANNER = `
*[_type == "banner" && "home" in locations][0]{
  name,
  subtitle,
  title{
    main,
    second
  },
  image,
  images,
  list,
  callAction,
  bgColor,
  type
}
`;

export const HOME_SERVICES = `
*[_type == "banner" && "service" in locations]{
  name,
  subtitle,
  title{
    main,
    second
  },
  image,
  images,
  list,
  callAction,
  bgColor,
  type
}
`;
