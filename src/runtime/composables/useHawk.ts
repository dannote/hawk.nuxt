import type Catcher from '@hawk.so/javascript'
import {
  useNuxtApp,
} from '#imports'

export default function useHawk() {
  const { $hawk } = useNuxtApp()

  const hawkInstance = $hawk as Catcher

  function send(message: string | Error) {
    hawkInstance.send(message)
  }

  return {
    send,
  }
}
