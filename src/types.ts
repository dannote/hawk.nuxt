import type { HawkInitialSettings } from '@hawk.so/javascript'

/**
 * Nuxt module configuration
 */
export interface HawkModuleConfig {
  /**
   * Hawk Integration token
   */
  token: string

  catcherOptions?: Omit<HawkInitialSettings, 'token' | 'vue' | 'release'>
}
