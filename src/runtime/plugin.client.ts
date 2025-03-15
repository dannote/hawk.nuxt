import HawkCatcher, { type NuxtIntegrationData, type NuxtIntegrationAddons } from '@hawk.so/javascript'
import type { HawkModuleConfig } from '../types'
import beforeSend from '#build/hawk-before-send.mjs'
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

  const hawkInstance = new HawkCatcher(Object.assign({}, hawkConfig.catcherOptions, {
    token: hawkConfig.token,
    vue: nuxtApp.vueApp,
    release: getReleaseId(),
    disableVueErrorHandler: true,
  }, {
    beforeSend,
  }))

  /**
   * @todo use NuxtApp to extract useful information:
   * - is SSR
   * - SSR Request headers ?
   */

  nuxtApp.hook('vue:error', (error: unknown, instance, info) => {
    try {
      const addons = spoilAddons(nuxtApp, info, instance)

      hawkInstance.captureError(error as Error, addons)
    }
    catch (error) {
      console.warn('Hawk nuxt unable to capture error. Report this error to maintainers: https://github.com/codex-team/hawk.nuxt/issues/new', error)
    }
  })

  nuxtApp.hook('app:error', (error) => {
    try {
      const addons = spoilAddons(nuxtApp, 'App startup error')

      hawkInstance.captureError(error as Error, addons)
    }
    catch (error) {
      console.warn('Hawk nuxt unable to capture error. Report this error to maintainers: https://github.com/codex-team/hawk.nuxt/issues/new', error)
    }
  })

  /**
   * Add Hawk instance to the global context
   */
  nuxtApp.$hawk = hawkInstance
})

/**
 * Extracts useful information from the Vue component instance and Nuxt app
 * @param nuxtApp - Nuxt app instance
 * @param info - Error source info (3rd argument of the vue:error hook)
 * @param componentInstance - Vue component public instance
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function spoilAddons(nuxtApp: any, info: string, componentInstance?: any): NuxtIntegrationData {
  const addons = {} as NuxtIntegrationAddons

  /**
   * Extract the component name
   */
  if (componentInstance) {
    if (componentInstance.$options !== undefined) {
      addons['Component'] = `<${componentInstance.$options.__name || componentInstance.$options.name || componentInstance.$options._componentTag || 'Anonymous'}>`
    }

    /**
     * Fill props
     */
    if (Object.keys(componentInstance.$props).length) {
      addons['Props'] = componentInstance.$props
    }
  }

  /**
   * Extract the current route
   */
  if (nuxtApp.$route) {
    addons['Route'] = {
      path: nuxtApp.$route.path,
      fullPath: nuxtApp.$route.fullPath,
    }

    if (nuxtApp.$route.name) {
      addons['Route'].name = nuxtApp.$route.name
    }

    if (nuxtApp.$route.redirectedFrom) {
      addons['Route'].redirectedFrom = nuxtApp.$route.redirectedFrom
    }
  }

  /**
   * Error source type
   */
  addons['Source'] = getRuntimeErrorSourceByCode(info)

  return {
    nuxt: addons,
  }
}

/**
 * In production, the error code is a link with reference to doc.
 * This method returns the error message by the code extracted from the link
 *
 * @param code - Error source info (3rd argument of the vue:error hook)
 * https://vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured
 */
function getRuntimeErrorSourceByCode(code: string): string {
  if (!code.includes('https://vuejs.org/error-reference/#runtime-')) {
    return code
  }

  const codeParts = code.split('https://vuejs.org/error-reference/#runtime-')
  const errorCode = codeParts[codeParts.length - 1]

  const errorCodeMap = new Map([
    ['0', 'setup function'],
    ['1', 'render function'],
    ['2', 'watcher getter'],
    ['3', 'watcher callback'],
    ['4', 'watcher cleanup function'],
    ['5', 'native event handler'],
    ['6', 'component event handler'],
    ['7', 'vnode hook'],
    ['8', 'directive hook'],
    ['9', 'transition hook'],
    ['10', 'app errorHandler'],
    ['11', 'app warnHandler'],
    ['12', 'ref function'],
    ['13', 'async component loader'],
    ['14', 'scheduler flush'],
    ['15', 'component update'],
    ['16', 'app unmount cleanup function'],
    ['sp', 'serverPrefetch hook'],
    ['bc', 'beforeCreate hook'],
    ['c', 'created hook'],
    ['bm', 'beforeMount hook'],
    ['m', 'mounted hook'],
    ['bu', 'beforeUpdate hook'],
    ['u', 'updated'],
    ['bum', 'beforeUnmount hook'],
    ['um', 'unmounted hook'],
    ['a', 'activated hook'],
    ['da', 'deactivated hook'],
    ['ec', 'errorCaptured hook'],
    ['rtc', 'renderTracked hook'],
    ['rtg', 'renderTriggered hook'],
  ])

  return errorCodeMap.get(errorCode) || code
}
