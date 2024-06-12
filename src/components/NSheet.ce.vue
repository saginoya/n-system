<script setup lang="ts">
defineProps<{
  color?: 'gray'
}>()
</script>

<template>
  <div
    class="flex h-full flex-col items-center justify-center gap-4 p-4"
    :class="{ 'bg-gray-50': color === 'gray' }"
  >
    <slot />
  </div>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
