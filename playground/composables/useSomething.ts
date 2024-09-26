/**
 * Example of manual sending messages to the Hawk from some composable
 */
export function useSomething() {
  const hawk = useHawk()

  function testManualSendingFromComposable(message: string | Error) {
    hawk.send(message)
  }

  return {
    testManualSendingFromComposable,
  }
};
