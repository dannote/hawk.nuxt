import { defineNuxtModule, addPlugin, createResolver, updateRuntimeConfig, useRuntimeConfig, addImportsDir } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Hawk Integration token
   */
  token: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@hawk.so/nuxt',
    configKey: 'hawk',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(config, _nuxt) {
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
  },
})
