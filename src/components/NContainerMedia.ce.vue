<script setup lang="ts">
import NImage from '@/components/NImage.ce.vue'
import NSheet from '@/components/NSheet.ce.vue'

defineProps<{
  width: number
  height: number
  src: string
  alt: string
  caption?: string
  cover?: boolean
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
    <div class="flex flex-col gap-4 md:col-span-2">
      <slot />
    </div>
    <n-sheet color="gray" class="text-center md:col-span-1">
      <n-image :width :height :src :alt :caption :cover></n-image>
    </n-sheet>
  </div>
</template>

<style scoped>
@import url(../assets/css/main.css);
</style>
