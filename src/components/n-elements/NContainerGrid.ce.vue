<script setup lang="ts">
import { cn } from '@/lib/cn'
import { gapMap, type Gap } from '@/styles'

withDefaults(
  defineProps<{
    cols: Cols
    gap?: Gap
  }>(),
  {
    gap: '2',
  },
)

const colsMap = {
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
  '4': 'grid-cols-2 md:grid-cols-4',
  '5': 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5',
  '6': 'grid-cols-3 md:grid-cols-6',
}

type Cols = keyof typeof colsMap
</script>

<template>
  <div :class="cn('grid', colsMap[cols], gapMap[gap])">
    <slot />
  </div>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
