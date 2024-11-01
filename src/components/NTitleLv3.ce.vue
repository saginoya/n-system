<script setup lang="ts">
defineProps<{
  note?: string
}>()
</script>

<template>
  <h3 class="flex flex-wrap items-center gap-2">
    <span>
      <slot />
    </span>
    <span v-if="note" class="text-base font-normal">
      {{ note }}
    </span>
  </h3>
</template>

<style>
@import url(../assets/css/main.css);
</style>
