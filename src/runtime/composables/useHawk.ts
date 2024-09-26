import type Catcher from '@hawk.so/javascript'
import {
  useNuxtApp,
} from '#imports'

/**
 * Composable for working with errors tracker
 */
export default function useHawk() {
  const { $hawk } = useNuxtApp()

  /**
   * Current hawk instance
   */
  const hawkInstance = $hawk as Catcher

  /**
   * Method for manual sending errors and logs
   *
   * @param message - text or error to track
   */
  function send(message: string | Error) {
    hawkInstance.send(message)
  }

  return {
    send,
  }
}
