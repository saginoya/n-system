<script setup lang="ts">
const props = defineProps<{
  decoration: 'border' | undefined
}>()

const decorationBorder = (): boolean => {
  return props.decoration === 'border'
}
</script>

<template>
  <h2
    class="text-center text-2xl sm:text-left"
    :class="{ 'sm:border-l-4 sm:border-l-current sm:pl-4': decorationBorder() }"
  >
    <slot />
  </h2>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
