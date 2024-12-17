<script setup lang="ts">
defineProps<{
  title: string
  required?: boolean
}>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex gap-2 font-bold">
      <span v-if="required" class="inline-block rounded-full bg-warning px-2 text-white">必須</span>
      <span v-else class="inline-block rounded-full bg-gray-300 px-2 text-white">任意</span>
      <span>{{ title }}</span>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<style>
@import url(../../assets/css/main.css);
</style>
