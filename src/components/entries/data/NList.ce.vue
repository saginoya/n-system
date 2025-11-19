<script setup lang="ts">
defineProps<{
  heightLimit?: boolean
}>()
</script>

<template>
  <ul
    class="flex flex-col border-b border-t-2"
    :class="{ 'max-h-80  overflow-y-auto': heightLimit }"
  >
    <slot />
  </ul>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
