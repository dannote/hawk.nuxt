<template>
  <div>
    Hawk Nuxt Module

    <div :class="$style.buttons">
      <button @click="triggerException">
        Trigger exception
      </button>

      <button @click="triggerServerError">
        Trigger server error
      </button>

      <TheButton
        text="Trigger exception from component"
        @activate="componentEventHandler"
      />

      <button @click="manuallyFromComposable">
        Manually send from useSomething() composable
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheButton from '~/components/UiButton.vue'

const something = useSomething()

function triggerException() {
  throw new Error('This is an exception')
}

async function triggerServerError() {
  await $fetch('/api/do-something')
}

function manuallyFromComposable() {
  something.testManualSendingFromComposable(new Error('Error sent manually from composable'))
}

function componentEventHandler() {
  return erererer.bb
}
</script>

<style module>
.buttons {
  display: flex;
  gap: 10px;

  margin-top: 30px;
}
</style>
