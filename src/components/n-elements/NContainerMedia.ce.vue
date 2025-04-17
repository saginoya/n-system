<script setup lang="ts">
import NImage from '@/components/n-elements/NImage.ce.vue'
import NSheet from '@/components/n-elements/NSheet.ce.vue'
import NChip from '@/components/n-elements/NChip.ce.vue'

defineProps<{
  width: number
  height: number
  src: string
  alt: string
  caption?: string
  cover?: boolean
  left?: boolean
  pdf?: string
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
    <div class="flex flex-col gap-4 md:col-span-2">
      <slot />
    </div>
    <NSheet color="gray" class="text-center md:col-span-1" :class="{ 'order-first': left }">
      <NImage :width :height :src :alt :caption :cover></NImage>
      <NChip v-if="pdf" :href="pdf" type="pdf" color="info">PDFファイル</NChip>
    </NSheet>
  </div>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
