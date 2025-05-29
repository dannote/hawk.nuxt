<template>
  <button
    @click="emit('activate')"
  >
    {{ text }} {{ myComputedProperty }}
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  activate: []
  stop: []
}>()

const props = defineProps<{
  text: string
}>()

const myComputedProperty = computed(() => props.text.length)
</script>
