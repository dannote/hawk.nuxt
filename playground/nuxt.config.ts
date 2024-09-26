export default defineNuxtConfig({
  modules: ['../src/module'],
  hawk: {
    token: process.env.HAWK_TOKEN_CLIENT,
  },
  devtools: { enabled: true },
})
