export default defineNuxtConfig({
  modules: ['../src/module'],
  hawk: {
    tokenClient: process.env.HAWK_TOKEN_CLIENT,
  },
  devtools: { enabled: true },
})
