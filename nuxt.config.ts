export default defineNuxtConfig({
  ssr: true,
  css: ["~/styles/global.css", "~/styles/custom-properties.css"],
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Star Grow Studio",
      meta: [{ name: "description", content: "Star grow studio es una agencia de desarrollo, diseño y marketing digital" }],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/logo.png",
        },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap",
        },
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
