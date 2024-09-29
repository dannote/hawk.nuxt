import HawkCatcher from '@hawk.so/javascript'
import type { HawkModuleConfig } from '../types'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

/**
 * Returns the global object depending on the environment
 */
function getGlobal(): typeof globalThis {
  return typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
      ? global
      : typeof self !== 'undefined'
        ? self
        : {} as typeof globalThis
}

/**
 * Returns the release ID from the global context
 * This variable is injected by the @hawk.so/vite-plugin
 */
function getReleaseId(): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const global = getGlobal() as any

  return global.HAWK_RELEASE
}

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const hawkConfig = runtimeConfig.public.hawk as HawkModuleConfig

  const hawkInstance = new HawkCatcher({
    token: hawkConfig.token,
    vue: nuxtApp.vueApp,
    release: getReleaseId(),
  })

  /**
   * @todo use NuxtApp to extract useful information:
   * - current route
   * - is SSR
   * - Vue Component
   * - SSR Request headers ?
   */

  /**
   * Add Hawk instance to the global context
   */
  nuxtApp.$hawk = hawkInstance
})
