import HawkCatcher from '@hawk.so/nodejs'
import type { H3Event } from 'h3'
import { defineNitroPlugin } from 'nitropack/runtime'
import type { NuxtIntegrationData, NuxtIntegrationAddons } from '@hawk.so/javascript'
import type { Json } from '@hawk.so/types'
import type { HawkModuleConfig } from '../types'
import { useRuntimeConfig } from '#imports'

/**
 * Returns the release ID from the global context
 * This variable is injected by the @hawk.so/vite-plugin
 */
function getReleaseId(): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (global as any).HAWK_RELEASE
}

/**
 * Collect useful request info to send along with the error
 */
function spoilServerAddons(event?: H3Event | null): NuxtIntegrationData {
  const addons = {} as NuxtIntegrationAddons

  if (event) {
    const req = event.node?.req

    if (req) {
      addons['Props'] = {
        method: req.method,
        url: req.url,
        ip: req.socket?.remoteAddress,
        headers: {
          'user-agent': req.headers['user-agent'],
          'referer': req.headers.referer,
        },
      }
    }

    addons['Route'].fullPath = event.path
  }

  return { nuxt: addons }
}

export default defineNitroPlugin((nitroApp) => {
  const runtimeConfig = useRuntimeConfig()
  const hawkConfig = runtimeConfig.public.hawk as HawkModuleConfig

  HawkCatcher.init(Object.assign({}, hawkConfig.catcherOptions, {
    token: hawkConfig.token,
    release: getReleaseId(),
  }, {
    beforeSend: null,
  }))

  /**
   * Catch unhandled exceptions from Nitro request lifecycle
   */
  nitroApp.hooks.hook('error', (error, { event }) => {
    try {
      HawkCatcher.send(error, spoilServerAddons(event) as Json)
    }
    catch (error) {
      console.warn('Hawk nuxt unable to capture error. Report this error to maintainers: https://github.com/codex-team/hawk.nuxt/issues/new', error)
    }
  })

  /**
   * Fallback handlers for totally uncaught errors
   */
  process.on('unhandledRejection', (reason) => {
    HawkCatcher.send(reason instanceof Error ? reason : new Error(String(reason)), spoilServerAddons() as Json)
  })

  process.on('uncaughtException', (err) => {
    HawkCatcher.send(err, spoilServerAddons() as Json)
  })
})
