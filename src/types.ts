import type { HawkInitialSettings } from '@hawk.so/javascript'

/**
 * Nuxt module configuration
 */
export interface HawkModuleConfig {
  /**
   * Hawk Integration token
   */
  token: string

  /**
   * Any additional options supported by Hawk JavaScript Catcher
   * @see https://github.com/codex-team/hawk.javascript?tab=readme-ov-file#usage
   */
  catcherOptions?: Omit<HawkInitialSettings, 'token' | 'vue' | 'release'>
}
