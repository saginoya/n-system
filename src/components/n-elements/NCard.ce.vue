<script setup lang="ts">
import { cn } from '@/lib/cn'
import { variantConceptMap, Variant } from '@/styles'
import type { Color } from '@/types'

withDefaults(
  defineProps<{
    heightFull?: boolean
    variant?: Variant
    color?: Color
  }>(),
  {
    variant: 'text',
    color: 'white',
  },
)
</script>

<template>
  <div
    class="flex flex-col gap-4 rounded border-2 px-6 py-4"
    :class="
      cn({ 'h-full': heightFull === true }, variantConceptMap[variant](color), {
        'text-inherit': variant === 'outlined',
      })
    "
  >
    <slot />
  </div>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
