import { defineNuxtModule, addPlugin, createResolver, updateRuntimeConfig, useRuntimeConfig, addImportsDir, addTemplate } from '@nuxt/kit'
import hawkVitePlugin from '@hawk.so/vite-plugin'
import type { HawkModuleConfig } from './types'

export default defineNuxtModule<HawkModuleConfig>({
  meta: {
    name: '@hawk.so/nuxt',
    configKey: 'hawk',
  },
  defaults: {},
  setup(config, nuxt) {
    const resolver = createResolver(import.meta.url)
    const runtimeConfig = useRuntimeConfig()

    /**
     * Since we can't pass functions via the nuxt.config.js, we need to create a template
     * @see https://nuxt.com/docs/guide/going-further/runtime-config#serialization
     * @see https://nuxt.com/docs/guide/going-further/modules#adding-templatesvirtual-files
     */
    addTemplate({
      filename: 'hawk-before-send.mjs',
      getContents: () => {
        if (config.catcherOptions?.beforeSend) {
          return `export default ${config.catcherOptions.beforeSend.toString()}`
        }
        else {
          return `export default (event) => event`
        }
      },
    })

    /**
     * Add runtimeConfig.public.hawk
     */
    if (runtimeConfig.public !== undefined) {
      runtimeConfig.public['hawk'] = config
    }
    else {
      runtimeConfig.public = {
        hawk: config,
      }
    }

    updateRuntimeConfig(runtimeConfig)

    addPlugin({
      src: resolver.resolve('./runtime/plugin.client'),
      mode: 'client',
    })

    addImportsDir(resolver.resolve('./runtime/composables'))

    /**
     * Add @hawk.so/vite-plugin for source maps sending
     */
    nuxt.hook('vite:extendConfig', (viteConfig) => {
      viteConfig.plugins = viteConfig.plugins || []

      viteConfig.plugins.push(
        hawkVitePlugin({
          token: config.token,
        }),
      )
    })
  },
})
