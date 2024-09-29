export default defineNuxtConfig({
  // sourcemap: {
  //   client: 'hidden',
  //   server: 'hidden',
  // },
  // vite: {
  //   build: {
  //     sourcemap: 'inline',
  //   },
  // },
  modules: ['../src/module'],
  hawk: {
    token: process.env.HAWK_TOKEN,
  },
  devtools: { enabled: true },
})
