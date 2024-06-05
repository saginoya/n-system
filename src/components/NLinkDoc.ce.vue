<script setup lang="ts">
import IconFileOpen from '@/components/icons/IconFileOpen.vue'

defineProps<{
  href: string
}>()
</script>

<template>
  <a class="inline-block rounded px-2" :href target="_blank">
    <span class="flex items-center gap-1">
      <slot />
      <IconFileOpen />
    </span>
  </a>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
