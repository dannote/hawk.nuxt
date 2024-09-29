import { defineNuxtModule, addPlugin, createResolver, updateRuntimeConfig, useRuntimeConfig, addImportsDir } from '@nuxt/kit'
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
