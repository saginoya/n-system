<script setup lang="ts">
defineProps<{
  mark?: string
}>()
</script>

<template>
  <div class="flex gap-0.5 text-sm md:justify-end">
    <div>{{ mark || '※' }}</div>
    <div>
      <slot />
    </div>
  </div>
</template>

<style>
@import url(../assets/css/main.css);
</style>
