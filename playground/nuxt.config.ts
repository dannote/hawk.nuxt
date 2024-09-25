export default defineNuxtConfig({
  modules: ['../src/module'],
  hawk: {
    token: 'eyJpbnRlZ3JhdGlvbklkIjoiY2QzZDViNzktYWMxMC00OTA2LTkzNWQtYzBhMjk3MDA2MjNmIiwic2VjcmV0IjoiNDY4ZjM3NWMtZmQ0Ny00NjkwLWFmMTItODdlNzNiNjEzMzQ1In0=',
  },
  // runtimeConfig: {
  //   public: {
  //     hawk: 111,
  //   },
  // },
  devtools: { enabled: true },
})
