<script setup lang="ts">
import { useVariantStyle } from '@/styles'
import type { Variant, Color } from '@/types'

withDefaults(
  defineProps<{
    heightFull?: boolean
    variant?: Variant
    color?: Color
  }>(),
  {
    color: 'white',
  },
)

const { getCardStyles } = useVariantStyle()
</script>

<template>
  <div
    class="flex flex-col gap-4 rounded border-2 px-6 py-4"
    :class="[{ 'h-full': heightFull === true }, ...getCardStyles(color, variant)]"
  >
    <slot />
  </div>
</template>

<style>
@import url(@/assets/css/main.css);
</style>
