<script setup lang="ts">
import { useURL } from '@/utils/useURL'

defineProps<{
  href: string
}>()

const { samePathname } = useURL()
</script>

<template>
  <a
    class="inline-block rounded-full px-3 py-1 hover:bg-black/20 focus:bg-black/20"
    :class="{ 'bg-black/30': samePathname(href) }"
    :href
  >
    <slot />
  </a>
</template>

<style scoped>
@import url(@/assets/css/main.css);
</style>
