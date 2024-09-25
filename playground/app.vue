<template>
  <div>
    Hawk Nuxt Module

    <div :class="$style.buttons">
      <button @click="triggerException">
        Trigger exception
      </button>

      <button @click="manuallyFromComposable">
        Manually send from useSomething() composable
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const something = useSomething()

function triggerException() {
  throw new Error('This is an exception')
}

function manuallyFromComposable() {
  something.send(new Error('Error sent manually from composable'))
}
</script>

<style module>
.buttons {
  display: flex;
  gap: 10px;

  margin-top: 30px;
}
</style>
