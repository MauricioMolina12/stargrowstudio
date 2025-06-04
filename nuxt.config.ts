// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/styles/global.css", "~/styles/custom-properties.css"],
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  app: {
    head: {
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
