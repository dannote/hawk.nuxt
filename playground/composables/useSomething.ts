export function useSomething() {
  const hawk = useHawk()

  function send(message: string | Error) {
    hawk.send(message)
  }

  return {
    send,
  }
};
