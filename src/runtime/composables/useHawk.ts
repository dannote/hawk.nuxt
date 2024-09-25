import {
  useNuxtApp,
} from '#imports'

export default function useHawk() {
  const { $hawk } = useNuxtApp()

  function send(message: string | Error) {
    $hawk.send(message)
  }

  return {
    send,
  }
}
