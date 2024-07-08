<script setup lang="ts">
defineProps<{
  header?: string
}>()
</script>

<template>
  <li class="grid grid-cols-1 border-b p-2 sm:grid-cols-4 md:grid-cols-6 md:p-4">
    <div class="font-bold">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="sm:col-span-3 md:col-span-5">
      <slot />
    </div>
  </li>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
