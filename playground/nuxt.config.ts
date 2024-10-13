import type { HawkJavaScriptEvent } from '@hawk.so/javascript'

export default defineNuxtConfig({
  modules: ['../src/module'],

  hawk: {
    token: process.env.HAWK_TOKEN,
    catcherOptions: {
      context: {
        appName: 'Hawk Nuxt Playground',
      },
      beforeSend: (event: HawkJavaScriptEvent) => {
        event.context.appVersion = '1.0.0'

        return event
      },
    },
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-10-07',
})
