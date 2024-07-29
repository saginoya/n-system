<script setup lang="ts">
defineProps<{
  heightFull?: boolean
}>()
</script>

<template>
  <div
    class="flex flex-col gap-4 rounded bg-white px-6 py-4"
    :class="{ 'h-full': heightFull === true }"
  >
    <slot />
  </div>
</template>

<style>
@import url(../assets/css/main.css);
</style>
