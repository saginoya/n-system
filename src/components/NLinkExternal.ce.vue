<script setup lang="ts">
import IconOpenInNew from './icons/IconOpenInNew.vue'

defineProps<{
  href: string
}>()
</script>

<template>
  <a
    class="inline-block rounded-full px-3 py-1 hover:bg-black/20 focus:bg-black/20"
    :href
    target="_blank"
  >
    <span class="flex items-center gap-1">
      <slot />
      <IconOpenInNew />
    </span>
  </a>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
