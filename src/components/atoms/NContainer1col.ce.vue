<script setup lang="ts">
import { alignItemsOptions } from '@/styles'
import type { AlignItems } from '@/styles'

const props = withDefaults(
  defineProps<{
    gap?: GapOptions
    aline?: AlignItems
  }>(),
  {
    gap: 2,
    aline: 'stretch',
  },
)

const gapOptions = {
  0: 'gap-0',
  0.5: 'gap-0.5',
  1: 'gap-1',
  2: 'gap-2',
  4: 'gap-4',
  8: 'gap-8',
  12: 'gap-12',
}

type GapOptions = keyof typeof gapOptions

const variant: string[] = [gapOptions[props.gap], alignItemsOptions[props.aline]]
</script>

<template>
  <div class="flex flex-col" :class="variant">
    <slot />
  </div>
</template>

<style>
@import url('@/assets/css/main.css');
</style>
