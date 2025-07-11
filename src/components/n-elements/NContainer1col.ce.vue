<script setup lang="ts">
import { alignItemsMap, gapMap } from '@/styles'
import type { AlignItems, Gap } from '@/styles'

const props = withDefaults(
  defineProps<{
    gap?: Gap
    aline?: AlignItems
  }>(),
  {
    gap: '2',
    aline: 'stretch',
  },
)

const variant: string[] = [gapMap[props.gap], alignItemsMap[props.aline]]
</script>

<template>
  <div class="flex flex-col" :class="variant">
    <slot />
  </div>
</template>

<style>
@import url('@/assets/css/main.css');
</style>
