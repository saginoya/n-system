<script setup lang="ts">
defineProps<{
  mark?: string
}>()
</script>

<template>
  <div class="flex gap-1 border-l-2 border-l-info bg-gray-50 p-2">
    <div>{{ mark || '※' }}</div>
    <div>
      <slot />
    </div>
  </div>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
