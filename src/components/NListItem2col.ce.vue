<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <li class="grid grid-cols-1 border-b p-4 sm:grid-cols-4 md:grid-cols-6">
    <div class="font-bold">
      <slot name="header"></slot>
    </div>
    <div class="sm:col-span-3 md:col-span-5">
      <slot />
    </div>
  </li>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
