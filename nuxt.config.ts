// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    config: {
      plugins: [require("@tailwindcss/forms")],
    },
  },
  app: {
    
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/apexcharts/dist/apexcharts.css' }
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js', body: true },
        { src: 'https://cdn.jsdelivr.net/npm/apexcharts', body: true },
        { src: 'https://js.stripe.com/v3/', body: true }
      ]
    }
  }
});
