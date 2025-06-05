export default defineNuxtConfig({
  css: ["~/styles/global.css", "~/styles/custom-properties.css"],
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Star Grow Studio",
      meta: [{ name: "description", content: "Tu descripción del sitio" }],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: 'logo.png'
        }
      ],
      script: [
        {
          src: "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js",
          type: "module",
        },
        {
          src: "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js",
          nomodule: true,
        },
      ],
    },
  },
});
