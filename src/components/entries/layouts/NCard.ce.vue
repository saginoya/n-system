<script setup lang="ts">
import { cn } from '@/lib/cn'
import { variantConceptMap, type Variant, gapMap, type Gap } from '@/styles'
import type { Color } from '@/types'

withDefaults(
  defineProps<{
    heightFull?: boolean
    variant?: Variant
    color?: Color
    gap?: Gap
  }>(),
  {
    variant: 'text',
    color: 'white',
    gap: '4',
  },
)
</script>

<template>
  <div
    :class="
      cn(
        'flex flex-col rounded border-2 px-3 py-2 md:px-6 md:py-4',
        gapMap[gap],
        variantConceptMap[variant](color),
        { 'h-full': heightFull === true },
        { 'text-inherit': variant === 'outlined' },
      )
    "
  >
    <slot />
  </div>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
